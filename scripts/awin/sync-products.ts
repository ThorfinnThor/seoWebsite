import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { GardenHouseCatalogSchema, GardenHouseOverrideSchema, GardenHouseProductSchema, type GardenHouseCatalog, type GardenHouseOffer, type GardenHouseProduct } from "@/lib/garden-house/types";
import { isGardenHouseCandidate, normalizeGardenHouse } from "./garden-house-normalizer";
import { streamFeedRows } from "./source";
import type { GardenHouseCandidate, ProductOverride } from "./types";
import { assertCatalogSafe } from "@/scripts/catalog/safeguards";
import { stableJson, writeFilesAtomically } from "@/scripts/catalog/write-atomic";

const OverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(GardenHouseOverrideSchema) });

interface FeedMetrics { sourceFeeds: number; successfulFeeds: number; failedFeeds: number; rows: number; candidateRows: number; }

function readJson<T>(file: string): Promise<T> { return readFile(path.join(process.cwd(), file), "utf8").then((text) => JSON.parse(text) as T); }

function withoutVolatileTimes(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(withoutVolatileTimes);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).filter(([key]) => !["generatedAt", "sourceUpdatedAt", "updatedAt"].includes(key)).map(([key, child]) => [key, withoutVolatileTimes(child)]));
  return value;
}

export function substantiveEqual(a: unknown, b: unknown): boolean {
  return stableJson(withoutVolatileTimes(a)) === stableJson(withoutVolatileTimes(b));
}

function applyOverride(product: GardenHouseProduct, override?: ProductOverride): GardenHouseProduct {
  if (!override) return product;
  const { id: _id, reviewNote: _note, ...publicOverride } = override;
  return GardenHouseProductSchema.parse({ ...product, ...publicOverride, id: product.id });
}

export function assembleGardenHouseCatalog(candidates: GardenHouseCandidate[], overrides: ProductOverride[], generatedAt: string): GardenHouseCatalog {
  const overrideMap = new Map(overrides.map((override) => [override.id, override]));
  const productMap = new Map<string, GardenHouseProduct>();
  const offerMap = new Map<string, GardenHouseOffer>();
  for (const candidate of candidates) {
    if (!candidate.product) continue;
    const product = applyOverride(candidate.product, overrideMap.get(candidate.id));
    const existing = productMap.get(product.id);
    if (!existing || product.sourceUpdatedAt && (!existing.sourceUpdatedAt || product.sourceUpdatedAt > existing.sourceUpdatedAt)) productMap.set(product.id, product);
    if (candidate.offer) offerMap.set(candidate.offer.id, candidate.offer);
  }
  const reviewedIds = new Set([...productMap.values()].filter((product) => product.reviewed && product.dataQuality !== "feed").map((product) => product.id));
  return GardenHouseCatalogSchema.parse({
    schemaVersion: 1,
    vertical: "garden-house",
    generatedAt,
    products: [...productMap.values()].filter((product) => reviewedIds.has(product.id)).sort((a, b) => a.id.localeCompare(b.id)),
    offers: [...offerMap.values()].filter((offer) => reviewedIds.has(offer.productId)).sort((a, b) => a.id.localeCompare(b.id)),
  });
}

function buildReviewQueue(candidates: GardenHouseCandidate[], catalog: GardenHouseCatalog, generatedAt: string) {
  const reviewed = new Set(catalog.products.map((product) => product.id));
  const grouped = new Map<string, GardenHouseCandidate[]>();
  for (const candidate of candidates) {
    if (!reviewed.has(candidate.id)) grouped.set(candidate.id, [...(grouped.get(candidate.id) ?? []), candidate]);
  }
  const products = [...grouped.entries()].map(([id, entries]) => {
    const offers = entries.flatMap((entry) => entry.offer ? [entry.offer] : []);
    const first = entries[0];
    return {
      id, name: first.name, brand: first.brand, gtin: first.gtin, mpn: first.mpn,
      candidateAttributes: first.candidateAttributes,
      offerCount: offers.length,
      minBasePriceEur: offers.length ? Math.min(...offers.map((offer) => offer.priceEur)) : undefined,
      merchants: [...new Set(offers.map((offer) => offer.merchantName))].sort(),
      imageUrl: first.imageUrl,
      merchantProductUrl: first.merchantProductUrl,
      issues: [...new Set(entries.flatMap((entry) => entry.issues))].sort(),
    };
  }).sort((a, b) => b.offerCount - a.offerCount || (a.minBasePriceEur ?? Infinity) - (b.minBasePriceEur ?? Infinity) || a.id.localeCompare(b.id));
  return { schemaVersion: 1, generatedAt, products };
}

function issueCounts(candidates: GardenHouseCandidate[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const issue of candidates.flatMap((candidate) => candidate.issues)) result[issue] = (result[issue] ?? 0) + 1;
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

async function run(): Promise<void> {
  const rawSecret = process.env.AWIN_FEED_URLS_JSON;
  if (!rawSecret) { console.log("Affiliate feed secret is not configured; nothing to sync."); return; }
  const urls = z.array(z.url().refine((url) => url.startsWith("https:"))).min(1).parse(JSON.parse(rawSecret));
  if (process.env.FEED_SYNC_SCHEDULED === "true") {
    const delayMs = (15 + Math.floor(Math.random() * 76)) * 1000;
    console.log(`Scheduled jitter: ${Math.round(delayMs / 1000)} seconds.`);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  const metrics: FeedMetrics = { sourceFeeds: urls.length, successfulFeeds: 0, failedFeeds: 0, rows: 0, candidateRows: 0 };
  const candidates: GardenHouseCandidate[] = [];
  for (const [index, url] of urls.entries()) {
    const source = `feed-${index + 1}`;
    let rows = 0;
    let sourceCandidates = 0;
    try {
      for await (const row of streamFeedRows(url)) {
        rows += 1;
        if (!isGardenHouseCandidate(row)) continue;
        sourceCandidates += 1;
        candidates.push(normalizeGardenHouse(row));
      }
      metrics.successfulFeeds += 1;
      metrics.rows += rows;
      metrics.candidateRows += sourceCandidates;
      console.log(`${source}: ${rows} rows, ${sourceCandidates} garden-house candidates.`);
    } catch (error) {
      metrics.failedFeeds += 1;
      console.error(`${source}: failed (${error instanceof Error ? error.message : "unknown error"}).`);
    }
  }
  if (metrics.successfulFeeds === 0) throw new Error("All configured feeds failed; existing catalog remains untouched");
  if (metrics.candidateRows === 0) throw new Error("No garden-house candidates found in any successful feed; existing catalog remains untouched");
  const previous = GardenHouseCatalogSchema.parse(await readJson("public/data/garden-house/catalog.json"));
  const overrideFile = OverrideFileSchema.parse(await readJson("data/overrides/garden-house.json"));
  const generatedAt = new Date().toISOString();
  let catalog = assembleGardenHouseCatalog(candidates, overrideFile.overrides as ProductOverride[], generatedAt);
  catalog = assertCatalogSafe(catalog, previous, urls);
  let review = buildReviewQueue(candidates, catalog, generatedAt);
  let report = {
    schemaVersion: 1, generatedAt, ...metrics,
    normalizedProducts: new Set(candidates.filter((candidate) => candidate.product).map((candidate) => candidate.id)).size,
    offers: candidates.filter((candidate) => candidate.offer).length,
    reviewedProducts: catalog.products.length,
    reviewQueue: review.products.length,
    candidateToProductRate: Math.round((new Set(candidates.filter((candidate) => candidate.product).map((candidate) => candidate.id)).size / metrics.candidateRows) * 1000) / 10,
    issues: issueCounts(candidates), merchants: {},
  };
  const previousReview = await readJson<unknown>("data/review/garden-house.json");
  const previousReport = await readJson<unknown>("public/data/garden-house/feed-report.json");
  if (substantiveEqual(catalog, previous)) catalog = previous;
  if (substantiveEqual(review, previousReview)) review = previousReview as typeof review;
  if (substantiveEqual(report, previousReport)) report = previousReport as typeof report;
  const previousManifest = await readJson<{ verticals?: Record<string, { catalog: string; generatedAt: string }> }>("public/data/manifest.json");
  const manifest = {
    schemaVersion: 1,
    generatedAt: catalog.generatedAt,
    verticals: { ...previousManifest.verticals, "garden-house": { catalog: "/data/garden-house/catalog.json", generatedAt: catalog.generatedAt } },
  };
  await writeFilesAtomically({
    "public/data/garden-house/catalog.json": catalog,
    "public/data/garden-house/feed-report.json": report,
    "public/data/manifest.json": manifest,
    "data/review/garden-house.json": review,
  });
  console.log(`Sync complete: ${catalog.products.length} reviewed products, ${catalog.offers.length} public offers, ${review.products.length} review candidates.`);
}

if (import.meta.url === `file://${process.argv[1]}`) run().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
