import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import type { OfferBase, ProductBase, StaticCatalog } from "@/lib/catalog/types";
import { DehumidifierCatalogSchema, DehumidifierOverrideSchema, DehumidifierProductSchema, type DehumidifierCatalog, type DehumidifierOverride, type DehumidifierProduct } from "@/lib/dehumidifier/types";
import { GardenHouseCatalogSchema, GardenHouseOverrideSchema, GardenHouseProductSchema, type GardenHouseCatalog, type GardenHouseOffer, type GardenHouseProduct } from "@/lib/garden-house/types";
import { IrrigationCatalogSchema, IrrigationOverrideSchema, IrrigationProductSchema, type IrrigationCatalog, type IrrigationOverride, type IrrigationProduct } from "@/lib/irrigation/types";
import { assertCatalogPayloadSafe, assertCatalogSafe } from "@/scripts/catalog/safeguards";
import { stableJson, writeFilesAtomically } from "@/scripts/catalog/write-atomic";
import { isDehumidifierCandidate, normalizeDehumidifier } from "./dehumidifier-normalizer";
import { isGardenHouseCandidate, normalizeGardenHouse } from "./garden-house-normalizer";
import { isIrrigationCandidate, normalizeIrrigation } from "./irrigation-normalizer";
import { streamFeedRows } from "./source";
import type { AffiliateCandidate, DehumidifierCandidate, GardenHouseCandidate, IrrigationCandidate, ProductOverride } from "./types";

const HttpsUrl = z.url().refine((url) => url.startsWith("https:"));
const VerticalConfigSchema = z.object({
  "garden-house": z.array(HttpsUrl).default([]),
  dehumidifier: z.array(HttpsUrl).default([]),
  irrigation: z.array(HttpsUrl).default([]),
}).refine((config) => Object.values(config).some((urls) => urls.length > 0), "At least one feed URL is required");
const LegacyConfigSchema = z.array(HttpsUrl).min(1);
const GardenOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(GardenHouseOverrideSchema) });
const DehumidifierOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(DehumidifierOverrideSchema) });
const IrrigationOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(IrrigationOverrideSchema) });

type Vertical = "garden-house" | "dehumidifier" | "irrigation";
interface FeedMetrics { sourceFeeds: number; successfulFeeds: number; failedFeeds: number; rows: number; }
type FeedJob = { url: string; verticals: Set<Vertical> };

function readJson<T>(file: string): Promise<T> { return readFile(path.join(process.cwd(), file), "utf8").then((text) => JSON.parse(text) as T); }

function withoutVolatileTimes(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(withoutVolatileTimes);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).filter(([key]) => !["generatedAt", "sourceUpdatedAt", "updatedAt"].includes(key)).map(([key, child]) => [key, withoutVolatileTimes(child)]));
  return value;
}

export function substantiveEqual(a: unknown, b: unknown): boolean {
  return stableJson(withoutVolatileTimes(a)) === stableJson(withoutVolatileTimes(b));
}

function publicOverride<T extends ProductBase>(override: Partial<T> & { id: string; reviewNote?: string }) {
  const { id: _id, reviewNote: _note, ...values } = override;
  return values;
}

function applyGardenOverride(product: GardenHouseProduct, override?: ProductOverride): GardenHouseProduct {
  return override ? GardenHouseProductSchema.parse({ ...product, ...publicOverride(override), id: product.id }) : product;
}

function applyDehumidifierOverride(product: DehumidifierProduct, override?: DehumidifierOverride): DehumidifierProduct {
  return override ? DehumidifierProductSchema.parse({ ...product, ...publicOverride(override), id: product.id }) : product;
}

function applyIrrigationOverride(product: IrrigationProduct, override?: IrrigationOverride): IrrigationProduct {
  return override ? IrrigationProductSchema.parse({ ...product, ...publicOverride(override), id: product.id }) : product;
}

export function assembleGardenHouseCatalog(candidates: GardenHouseCandidate[], overrides: ProductOverride[], generatedAt: string): GardenHouseCatalog {
  const overrideMap = new Map(overrides.map((override) => [override.id, override]));
  const productMap = new Map<string, GardenHouseProduct>();
  const offerMap = new Map<string, GardenHouseOffer>();
  for (const candidate of candidates) {
    if (!candidate.product) continue;
    const product = applyGardenOverride(candidate.product, overrideMap.get(candidate.id));
    const existing = productMap.get(product.id);
    if (!existing || product.sourceUpdatedAt && (!existing.sourceUpdatedAt || product.sourceUpdatedAt > existing.sourceUpdatedAt)) productMap.set(product.id, product);
    if (candidate.offer) offerMap.set(candidate.offer.id, candidate.offer);
  }
  const reviewedIds = new Set([...productMap.values()].filter((product) => product.reviewed && product.dataQuality !== "feed").map((product) => product.id));
  return GardenHouseCatalogSchema.parse({ schemaVersion: 1, vertical: "garden-house", generatedAt, products: [...productMap.values()].filter((product) => reviewedIds.has(product.id)).sort((a, b) => a.id.localeCompare(b.id)), offers: [...offerMap.values()].filter((offer) => reviewedIds.has(offer.productId)).sort((a, b) => a.id.localeCompare(b.id)) });
}

export function assembleDehumidifierCatalog(candidates: DehumidifierCandidate[], overrides: DehumidifierOverride[], generatedAt: string): DehumidifierCatalog {
  const overrideMap = new Map(overrides.map((override) => [override.id, override]));
  const productMap = new Map<string, DehumidifierProduct>();
  const offerMap = new Map<string, OfferBase>();
  for (const candidate of candidates) {
    if (!candidate.product) continue;
    const product = applyDehumidifierOverride(candidate.product, overrideMap.get(candidate.id));
    const existing = productMap.get(product.id);
    if (!existing || product.sourceUpdatedAt && (!existing.sourceUpdatedAt || product.sourceUpdatedAt > existing.sourceUpdatedAt)) productMap.set(product.id, product);
    if (candidate.offer) offerMap.set(candidate.offer.id, candidate.offer);
  }
  const reviewedIds = new Set([...productMap.values()].filter((product) => product.reviewed && product.dataQuality !== "feed").map((product) => product.id));
  return DehumidifierCatalogSchema.parse({ schemaVersion: 1, vertical: "dehumidifier", generatedAt, products: [...productMap.values()].filter((product) => reviewedIds.has(product.id)).sort((a, b) => a.id.localeCompare(b.id)), offers: [...offerMap.values()].filter((offer) => reviewedIds.has(offer.productId)).sort((a, b) => a.id.localeCompare(b.id)) });
}

export function assembleIrrigationCatalog(candidates: IrrigationCandidate[], overrides: IrrigationOverride[], generatedAt: string): IrrigationCatalog {
  const overrideMap = new Map(overrides.map((override) => [override.id, override]));
  const productMap = new Map<string, IrrigationProduct>();
  const offerMap = new Map<string, OfferBase>();
  for (const candidate of candidates) {
    if (!candidate.product) continue;
    const product = applyIrrigationOverride(candidate.product, overrideMap.get(candidate.id));
    const existing = productMap.get(product.id);
    if (!existing || product.sourceUpdatedAt && (!existing.sourceUpdatedAt || product.sourceUpdatedAt > existing.sourceUpdatedAt)) productMap.set(product.id, product);
    if (candidate.offer) offerMap.set(candidate.offer.id, candidate.offer);
  }
  const reviewedIds = new Set([...productMap.values()].filter((product) => product.reviewed && product.dataQuality !== "feed").map((product) => product.id));
  return IrrigationCatalogSchema.parse({ schemaVersion: 1, vertical: "irrigation", generatedAt, products: [...productMap.values()].filter((product) => reviewedIds.has(product.id)).sort((a, b) => a.id.localeCompare(b.id)), offers: [...offerMap.values()].filter((offer) => reviewedIds.has(offer.productId)).sort((a, b) => a.id.localeCompare(b.id)) });
}

function buildReviewQueue<TProduct extends ProductBase>(candidates: AffiliateCandidate<TProduct>[], catalog: StaticCatalog<TProduct, OfferBase>, generatedAt: string) {
  const reviewed = new Set(catalog.products.map((product) => product.id));
  const grouped = new Map<string, AffiliateCandidate<TProduct>[]>();
  for (const candidate of candidates) if (!reviewed.has(candidate.id)) grouped.set(candidate.id, [...(grouped.get(candidate.id) ?? []), candidate]);
  const products = [...grouped.entries()].map(([id, entries]) => {
    const offers = entries.flatMap((entry) => entry.offer ? [entry.offer] : []);
    const first = entries[0];
    return { id, name: first.name, brand: first.brand, gtin: first.gtin, mpn: first.mpn, candidateAttributes: first.candidateAttributes, offerCount: offers.length, minBasePriceEur: offers.length ? Math.min(...offers.map((offer) => offer.priceEur)) : undefined, merchants: [...new Set(offers.map((offer) => offer.merchantName))].sort(), imageUrl: first.imageUrl, merchantProductUrl: first.merchantProductUrl, issues: [...new Set(entries.flatMap((entry) => entry.issues))].sort() };
  }).sort((a, b) => b.offerCount - a.offerCount || (a.minBasePriceEur ?? Infinity) - (b.minBasePriceEur ?? Infinity) || a.id.localeCompare(b.id));
  return { schemaVersion: 1, generatedAt, products };
}

function issueCounts<TProduct extends ProductBase>(candidates: AffiliateCandidate<TProduct>[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const issue of candidates.flatMap((candidate) => candidate.issues)) result[issue] = (result[issue] ?? 0) + 1;
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

function buildReport<TProduct extends ProductBase>(candidates: AffiliateCandidate<TProduct>[], metrics: FeedMetrics, catalog: StaticCatalog<TProduct, OfferBase>, reviewCount: number, generatedAt: string) {
  const normalizedProducts = new Set(candidates.filter((candidate) => candidate.product).map((candidate) => candidate.id)).size;
  return { schemaVersion: 1, generatedAt, ...metrics, candidateRows: candidates.length, normalizedProducts, offers: candidates.filter((candidate) => candidate.offer).length, reviewedProducts: catalog.products.length, reviewQueue: reviewCount, candidateToProductRate: candidates.length ? Math.round((normalizedProducts / candidates.length) * 1000) / 10 : 0, issues: issueCounts(candidates), merchants: {} };
}

export function parseFeedJobs(raw: string): FeedJob[] {
  const value = JSON.parse(raw) as unknown;
  const legacy = LegacyConfigSchema.safeParse(value);
  if (legacy.success) return legacy.data.map((url) => ({ url, verticals: new Set<Vertical>(["garden-house", "dehumidifier", "irrigation"]) }));
  const grouped = VerticalConfigSchema.parse(value);
  const jobs = new Map<string, Set<Vertical>>();
  for (const [vertical, urls] of Object.entries(grouped) as Array<[Vertical, string[]]>) for (const url of urls) jobs.set(url, new Set([...(jobs.get(url) ?? []), vertical]));
  return [...jobs.entries()].map(([url, verticals]) => ({ url, verticals }));
}

async function run(): Promise<void> {
  const rawSecret = process.env.AWIN_FEED_URLS_JSON;
  if (!rawSecret) { console.log("Affiliate feed secret is not configured; nothing to sync."); return; }
  const jobs = parseFeedJobs(rawSecret);
  if (process.env.FEED_SYNC_SCHEDULED === "true") {
    const delayMs = (15 + Math.floor(Math.random() * 76)) * 1000;
    console.log(`Scheduled jitter: ${Math.round(delayMs / 1000)} seconds.`);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  const metrics: FeedMetrics = { sourceFeeds: jobs.length, successfulFeeds: 0, failedFeeds: 0, rows: 0 };
  const gardenHouseCandidates: GardenHouseCandidate[] = [];
  const dehumidifierCandidates: DehumidifierCandidate[] = [];
  const irrigationCandidates: IrrigationCandidate[] = [];
  for (const [index, job] of jobs.entries()) {
    let rows = 0;
    try {
      for await (const row of streamFeedRows(job.url)) {
        rows += 1;
        if (job.verticals.has("garden-house") && isGardenHouseCandidate(row)) gardenHouseCandidates.push(normalizeGardenHouse(row));
        if (job.verticals.has("dehumidifier") && isDehumidifierCandidate(row)) dehumidifierCandidates.push(normalizeDehumidifier(row));
        if (job.verticals.has("irrigation") && isIrrigationCandidate(row)) irrigationCandidates.push(normalizeIrrigation(row));
      }
      metrics.successfulFeeds += 1;
      metrics.rows += rows;
      console.log(`feed-${index + 1}: ${rows} rows.`);
    } catch (error) {
      metrics.failedFeeds += 1;
      console.error(`feed-${index + 1}: failed (${error instanceof Error ? error.message : "unknown error"}).`);
    }
  }
  if (metrics.successfulFeeds === 0) throw new Error("All configured feeds failed; existing catalogs remain untouched");
  if (gardenHouseCandidates.length + dehumidifierCandidates.length + irrigationCandidates.length === 0) throw new Error("No supported product candidates found; existing catalogs remain untouched");

  const generatedAt = new Date().toISOString();
  const secretUrls = jobs.map((job) => job.url);
  const files: Record<string, unknown> = {};
  const manifest = await readJson<{ schemaVersion: 1; generatedAt: string; verticals: Record<string, { catalog: string; generatedAt: string }> }>("public/data/manifest.json");

  if (gardenHouseCandidates.length) {
    const previous = GardenHouseCatalogSchema.parse(await readJson("public/data/garden-house/catalog.json"));
    const overrides = GardenOverrideFileSchema.parse(await readJson("data/overrides/garden-house.json")).overrides as ProductOverride[];
    let catalog = assertCatalogSafe(assembleGardenHouseCatalog(gardenHouseCandidates, overrides, generatedAt), previous, secretUrls);
    let review = buildReviewQueue(gardenHouseCandidates, catalog, generatedAt);
    let report = buildReport(gardenHouseCandidates, metrics, catalog, review.products.length, generatedAt);
    if (substantiveEqual(catalog, previous)) catalog = previous;
    const oldReview = await readJson<unknown>("data/review/garden-house.json"); if (substantiveEqual(review, oldReview)) review = oldReview as typeof review;
    const oldReport = await readJson<unknown>("public/data/garden-house/feed-report.json"); if (substantiveEqual(report, oldReport)) report = oldReport as typeof report;
    files["public/data/garden-house/catalog.json"] = catalog; files["data/review/garden-house.json"] = review; files["public/data/garden-house/feed-report.json"] = report;
    manifest.verticals["garden-house"] = { catalog: "/data/garden-house/catalog.json", generatedAt: catalog.generatedAt };
  }
  if (dehumidifierCandidates.length) {
    const previous = DehumidifierCatalogSchema.parse(await readJson("public/data/dehumidifier/catalog.json"));
    const overrides = DehumidifierOverrideFileSchema.parse(await readJson("data/overrides/dehumidifier.json")).overrides as DehumidifierOverride[];
    let catalog = assertCatalogPayloadSafe(assembleDehumidifierCatalog(dehumidifierCandidates, overrides, generatedAt), previous, secretUrls);
    let review = buildReviewQueue(dehumidifierCandidates, catalog, generatedAt);
    let report = buildReport(dehumidifierCandidates, metrics, catalog, review.products.length, generatedAt);
    if (substantiveEqual(catalog, previous)) catalog = previous;
    const oldReview = await readJson<unknown>("data/review/dehumidifier.json"); if (substantiveEqual(review, oldReview)) review = oldReview as typeof review;
    const oldReport = await readJson<unknown>("public/data/dehumidifier/feed-report.json"); if (substantiveEqual(report, oldReport)) report = oldReport as typeof report;
    files["public/data/dehumidifier/catalog.json"] = catalog; files["data/review/dehumidifier.json"] = review; files["public/data/dehumidifier/feed-report.json"] = report;
    manifest.verticals.dehumidifier = { catalog: "/data/dehumidifier/catalog.json", generatedAt: catalog.generatedAt };
  }
  if (irrigationCandidates.length) {
    const previous = IrrigationCatalogSchema.parse(await readJson("public/data/irrigation/catalog.json"));
    const overrides = IrrigationOverrideFileSchema.parse(await readJson("data/overrides/irrigation.json")).overrides as IrrigationOverride[];
    let catalog = assertCatalogPayloadSafe(assembleIrrigationCatalog(irrigationCandidates, overrides, generatedAt), previous, secretUrls);
    let review = buildReviewQueue(irrigationCandidates, catalog, generatedAt);
    let report = buildReport(irrigationCandidates, metrics, catalog, review.products.length, generatedAt);
    if (substantiveEqual(catalog, previous)) catalog = previous;
    const oldReview = await readJson<unknown>("data/review/irrigation.json"); if (substantiveEqual(review, oldReview)) review = oldReview as typeof review;
    const oldReport = await readJson<unknown>("public/data/irrigation/feed-report.json"); if (substantiveEqual(report, oldReport)) report = oldReport as typeof report;
    files["public/data/irrigation/catalog.json"] = catalog; files["data/review/irrigation.json"] = review; files["public/data/irrigation/feed-report.json"] = report;
    manifest.verticals.irrigation = { catalog: "/data/irrigation/catalog.json", generatedAt: catalog.generatedAt };
  }
  manifest.generatedAt = generatedAt;
  files["public/data/manifest.json"] = manifest;
  await writeFilesAtomically(files);
  console.log(`Sync complete: ${gardenHouseCandidates.length} garden-house, ${dehumidifierCandidates.length} dehumidifier and ${irrigationCandidates.length} irrigation candidates processed.`);
}

if (import.meta.url === `file://${process.argv[1]}`) run().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
