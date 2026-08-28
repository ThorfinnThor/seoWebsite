import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import type { OfferBase, ProductBase, StaticCatalog } from "@/lib/catalog/types";
import { DehumidifierCatalogSchema, DehumidifierOverrideSchema, DehumidifierProductSchema, type DehumidifierCatalog, type DehumidifierOverride, type DehumidifierProduct } from "@/lib/dehumidifier/types";
import { GardenHouseCatalogSchema, GardenHouseOverrideSchema, GardenHouseProductSchema, type GardenHouseCatalog, type GardenHouseOffer, type GardenHouseProduct } from "@/lib/garden-house/types";
import { IrrigationCatalogSchema, IrrigationOverrideSchema, IrrigationProductSchema, type IrrigationCatalog, type IrrigationOverride, type IrrigationProduct } from "@/lib/irrigation/types";
import { FlooringCatalogSchema, FlooringOverrideSchema, FlooringProductSchema, type FlooringCatalog, type FlooringOverride, type FlooringProduct } from "@/lib/flooring/types";
import { ProjectCatalogSchema, ProjectOverrideSchema, ProjectProductSchema, type ProjectCatalog, type ProjectOverride, type ProjectProduct } from "@/lib/project-products/types";
import { RobotMowerCatalogSchema, RobotMowerOverrideSchema, RobotMowerProductSchema, type RobotMowerCatalog, type RobotMowerOverride, type RobotMowerProduct } from "@/lib/robot-mower/types";
import { assertCatalogPayloadSafe, assertCatalogSafe } from "@/scripts/catalog/safeguards";
import { quarantineSuspiciousCatalogOffers } from "@/scripts/catalog/price-safeguards";
import { stableJson, writeFilesAtomically } from "@/scripts/catalog/write-atomic";
import { isDehumidifierCandidate, normalizeDehumidifier } from "./dehumidifier-normalizer";
import { isGardenHouseCandidate, normalizeGardenHouse } from "./garden-house-normalizer";
import { isIrrigationCandidate, normalizeIrrigation } from "./irrigation-normalizer";
import { isFlooringCandidate, normalizeFlooring } from "./flooring-normalizer";
import { isRobotMowerCandidate, normalizeRobotMower } from "./robot-mower-normalizer";
import { isProjectProductCandidate, normalizeProjectProduct } from "./project-products-normalizer";
import { extractFeedListUrl, filterFeedListEntries, parseFeedListRows, selectPreferredFeedEntries } from "./feed-list";
import { streamFeedRows } from "./source";
import type { AffiliateCandidate, DehumidifierCandidate, FlooringCandidate, GardenHouseCandidate, IrrigationCandidate, ProductOverride, ProjectProductCandidate, RobotMowerCandidate } from "./types";

const HttpsUrl = z.url().refine((url) => url.startsWith("https:"));
const SupportedVerticalSchema = z.enum(["garden-house", "dehumidifier", "irrigation", "robot-mower", "flooring", "project-products"]);
const VerticalConfigSchema = z.object({
  "garden-house": z.array(HttpsUrl).default([]),
  dehumidifier: z.array(HttpsUrl).default([]),
  irrigation: z.array(HttpsUrl).default([]),
  "robot-mower": z.array(HttpsUrl).default([]),
  flooring: z.array(HttpsUrl).default([]),
  "project-products": z.array(HttpsUrl).default([]),
}).refine((config) => Object.values(config).some((urls) => urls.length > 0), "At least one feed URL is required");
const LegacyConfigSchema = z.array(HttpsUrl).min(1);
const GardenOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(GardenHouseOverrideSchema) });
const DehumidifierOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(DehumidifierOverrideSchema) });
const IrrigationOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(IrrigationOverrideSchema) });
const RobotMowerOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(RobotMowerOverrideSchema) });
const FlooringOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(FlooringOverrideSchema) });
const ProjectOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(ProjectOverrideSchema) });
const FeedMerchantRegistrySchema = z.object({ merchants: z.array(z.object({ awinAdvertiserId: z.number().int().positive(), enabled: z.boolean(), verticals: z.array(SupportedVerticalSchema).min(1) })) });

type Vertical = "garden-house" | "dehumidifier" | "irrigation" | "robot-mower" | "flooring" | "project-products";
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

function applyRobotMowerOverride(product: RobotMowerProduct, override?: RobotMowerOverride): RobotMowerProduct {
  return override ? RobotMowerProductSchema.parse({ ...product, ...publicOverride(override), id: product.id }) : product;
}

function applyFlooringOverride(product: FlooringProduct, override?: FlooringOverride): FlooringProduct {
  return override ? FlooringProductSchema.parse({ ...product, ...publicOverride(override), id: product.id }) : product;
}

function applyProjectOverride(product: ProjectProduct, override?: ProjectOverride): ProjectProduct {
  return override ? ProjectProductSchema.parse({ ...product, ...publicOverride(override), id: product.id }) : product;
}

const PROJECT_KIND_PRIORITY: Record<string, number> = {
  kit: 1, panel: 1, decking: 1, board: 1,
  profile: 2, substructure: 2, gate: 2, base: 2,
  post: 3, foundation: 3, roof: 3, ventilation: 3,
  fastening: 4, joint: 4, insulation: 4, sealing: 4,
  drainage: 5, electric: 5, bench: 5, shade: 5, bracket: 6, cap: 6, irrigation: 6,
};

function autoReviewCompleteFeedProduct<TProduct extends ProductBase>(product: TProduct, candidate: AffiliateCandidate<TProduct>, hasOverride: boolean): TProduct {
  return !hasOverride && candidate.offer && candidate.issues.length === 0
    ? { ...product, reviewed: true, dataQuality: "mixed" }
    : product;
}

export function assembleGardenHouseCatalog(candidates: GardenHouseCandidate[], overrides: ProductOverride[], generatedAt: string): GardenHouseCatalog {
  const overrideMap = new Map(overrides.map((override) => [override.id, override]));
  const productMap = new Map<string, GardenHouseProduct>();
  const offerMap = new Map<string, GardenHouseOffer>();
  for (const candidate of candidates) {
    if (!candidate.product) continue;
    const override = overrideMap.get(candidate.id);
    const product = autoReviewCompleteFeedProduct(applyGardenOverride(candidate.product, override), candidate, Boolean(override));
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
    const override = overrideMap.get(candidate.id);
    const product = autoReviewCompleteFeedProduct(applyDehumidifierOverride(candidate.product, override), candidate, Boolean(override));
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
    const override = overrideMap.get(candidate.id);
    const product = autoReviewCompleteFeedProduct(applyIrrigationOverride(candidate.product, override), candidate, Boolean(override));
    const existing = productMap.get(product.id);
    if (!existing || product.sourceUpdatedAt && (!existing.sourceUpdatedAt || product.sourceUpdatedAt > existing.sourceUpdatedAt)) productMap.set(product.id, product);
    if (candidate.offer) offerMap.set(candidate.offer.id, candidate.offer);
  }
  const reviewedIds = new Set([...productMap.values()].filter((product) => product.reviewed && product.dataQuality !== "feed").map((product) => product.id));
  return IrrigationCatalogSchema.parse({ schemaVersion: 1, vertical: "irrigation", generatedAt, products: [...productMap.values()].filter((product) => reviewedIds.has(product.id)).sort((a, b) => a.id.localeCompare(b.id)), offers: [...offerMap.values()].filter((offer) => reviewedIds.has(offer.productId)).sort((a, b) => a.id.localeCompare(b.id)) });
}

export function assembleRobotMowerCatalog(candidates: RobotMowerCandidate[], overrides: RobotMowerOverride[], generatedAt: string): RobotMowerCatalog {
  const overrideMap = new Map(overrides.map((override) => [override.id, override]));
  const productMap = new Map<string, RobotMowerProduct>();
  const offerMap = new Map<string, OfferBase>();
  for (const candidate of candidates) {
    if (!candidate.product) continue;
    const override = overrideMap.get(candidate.id);
    const product = autoReviewCompleteFeedProduct(applyRobotMowerOverride(candidate.product, override), candidate, Boolean(override));
    const existing = productMap.get(product.id);
    if (!existing || product.sourceUpdatedAt && (!existing.sourceUpdatedAt || product.sourceUpdatedAt > existing.sourceUpdatedAt)) productMap.set(product.id, product);
    if (candidate.offer) offerMap.set(candidate.offer.id, candidate.offer);
  }
  const reviewedIds = new Set([...productMap.values()].filter((product) => product.reviewed && product.dataQuality !== "feed").map((product) => product.id));
  return RobotMowerCatalogSchema.parse({ schemaVersion: 1, vertical: "robot-mower", generatedAt, products: [...productMap.values()].filter((product) => reviewedIds.has(product.id)).sort((a, b) => a.id.localeCompare(b.id)), offers: [...offerMap.values()].filter((offer) => reviewedIds.has(offer.productId)).sort((a, b) => a.id.localeCompare(b.id)) });
}

export function assembleFlooringCatalog(candidates: FlooringCandidate[], overrides: FlooringOverride[], generatedAt: string): FlooringCatalog {
  const overrideMap = new Map(overrides.map((override) => [override.id, override]));
  const productMap = new Map<string, FlooringProduct>();
  const offerMap = new Map<string, OfferBase>();
  for (const candidate of candidates) {
    if (!candidate.product) continue;
    const override = overrideMap.get(candidate.id);
    const product = autoReviewCompleteFeedProduct(applyFlooringOverride(candidate.product, override), candidate, Boolean(override));
    const existing = productMap.get(product.id);
    if (!existing || product.sourceUpdatedAt && (!existing.sourceUpdatedAt || product.sourceUpdatedAt > existing.sourceUpdatedAt)) productMap.set(product.id, product);
    if (candidate.offer) offerMap.set(candidate.offer.id, candidate.offer);
  }
  const reviewedIds = new Set([...productMap.values()].filter((product) => product.reviewed && product.dataQuality !== "feed").map((product) => product.id));
  return FlooringCatalogSchema.parse({ schemaVersion: 1, vertical: "flooring", generatedAt, products: [...productMap.values()].filter((product) => reviewedIds.has(product.id)).sort((a, b) => a.id.localeCompare(b.id)), offers: [...offerMap.values()].filter((offer) => reviewedIds.has(offer.productId)).sort((a, b) => a.id.localeCompare(b.id)) });
}

export function assembleProjectCatalog(candidates: ProjectProductCandidate[], overrides: ProjectOverride[], generatedAt: string): ProjectCatalog {
  const overrideMap = new Map(overrides.map((override) => [override.id, override]));
  const productMap = new Map<string, ProjectProduct>();
  const offerMap = new Map<string, OfferBase>();
  for (const candidate of candidates) {
    if (!candidate.product) continue;
    const override = overrideMap.get(candidate.id);
    const product = autoReviewCompleteFeedProduct(applyProjectOverride(candidate.product, override), candidate, Boolean(override));
    const existing = productMap.get(product.id);
    if (!existing || product.sourceUpdatedAt && (!existing.sourceUpdatedAt || product.sourceUpdatedAt > existing.sourceUpdatedAt)) productMap.set(product.id, product);
    if (candidate.offer) offerMap.set(candidate.offer.id, candidate.offer);
  }
  const published = [...productMap.values()].filter((product) => product.reviewed && product.dataQuality !== "feed").sort((a, b) => a.vertical.localeCompare(b.vertical) || (PROJECT_KIND_PRIORITY[a.kind] ?? 99) - (PROJECT_KIND_PRIORITY[b.kind] ?? 99) || a.kind.localeCompare(b.kind) || a.id.localeCompare(b.id));
  const counts = new Map<string, number>();
  const selected = published.filter((product) => {
    const count = counts.get(product.vertical) ?? 0;
    if (count >= 120) return false;
    counts.set(product.vertical, count + 1);
    return true;
  });
  const selectedIds = new Set(selected.map((product) => product.id));
  return ProjectCatalogSchema.parse({ schemaVersion: 1, vertical: "project-products", generatedAt, products: selected, offers: [...offerMap.values()].filter((offer) => selectedIds.has(offer.productId)).sort((a, b) => a.id.localeCompare(b.id)) });
}

export function reviewPriority(issues: string[], offerCount: number, minPrice?: number): number {
  const weights: Record<string, number> = { "semantic-kind-mismatch": 10_000, "suspicious-price": 9_000, "price-outlier": 9_000, "suspicious-dimension": 8_000, "suspicious-capacity": 8_000, "identity-mismatch": 7_000, "not-found": 7_000, "missing-or-invalid-affiliate-link": 6_000 };
  return Math.max(0, ...issues.map((issue) => weights[issue] ?? 100)) + offerCount * 10 + Math.min(999, Math.round((minPrice ?? 0) / 10));
}

export function buildReviewQueue<TProduct extends ProductBase>(candidates: AffiliateCandidate<TProduct>[], catalog: StaticCatalog<TProduct, OfferBase>, generatedAt: string) {
  const reviewed = new Set(catalog.products.map((product) => product.id));
  const grouped = new Map<string, AffiliateCandidate<TProduct>[]>();
  for (const candidate of candidates) if (!reviewed.has(candidate.id)) grouped.set(candidate.id, [...(grouped.get(candidate.id) ?? []), candidate]);
  const products = [...grouped.entries()].map(([id, entries]) => {
    const offers = entries.flatMap((entry) => entry.offer ? [entry.offer] : []);
    const first = entries[0];
    const minBasePriceEur = offers.length ? Math.min(...offers.map((offer) => offer.priceEur)) : undefined;
    const issues = [...new Set(entries.flatMap((entry) => entry.issues))].sort();
    const priority = reviewPriority(issues, offers.length, minBasePriceEur);
    return { id, name: first.name, brand: first.brand, gtin: first.gtin, mpn: first.mpn, candidateAttributes: first.candidateAttributes, offerCount: offers.length, minBasePriceEur, merchants: [...new Set(offers.map((offer) => offer.merchantName))].sort(), imageUrl: first.imageUrl, merchantProductUrl: first.merchantProductUrl, issues, priority, riskTier: priority >= 7000 ? "critical" : priority >= 1000 ? "high" : "normal" };
  }).sort((a, b) => b.priority - a.priority || b.offerCount - a.offerCount || (b.minBasePriceEur ?? 0) - (a.minBasePriceEur ?? 0) || a.id.localeCompare(b.id));
  return { schemaVersion: 1, generatedAt, products };
}

function issueCounts<TProduct extends ProductBase>(candidates: AffiliateCandidate<TProduct>[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const issue of candidates.flatMap((candidate) => candidate.issues)) result[issue] = (result[issue] ?? 0) + 1;
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

function buildReport<TProduct extends ProductBase>(candidates: AffiliateCandidate<TProduct>[], metrics: FeedMetrics, catalog: StaticCatalog<TProduct, OfferBase>, reviewCount: number, generatedAt: string) {
  const normalizedProducts = new Set(candidates.filter((candidate) => candidate.product).map((candidate) => candidate.id)).size;
  const offeredProducts = new Set(catalog.offers.map((offer) => offer.productId));
  const prices = catalog.offers.map((offer) => offer.priceEur).sort((a, b) => a - b);
  const medianPrice = prices.length ? (prices[Math.floor((prices.length - 1) / 2)] + prices[Math.ceil((prices.length - 1) / 2)]) / 2 : undefined;
  const linkStatuses: Record<string, number> = {};
  const merchants: Record<string, number> = {};
  for (const offer of catalog.offers) {
    const status = offer.linkVerificationStatus ?? "unknown";
    linkStatuses[status] = (linkStatuses[status] ?? 0) + 1;
    merchants[offer.merchantName] = (merchants[offer.merchantName] ?? 0) + 1;
  }
  const quarantineIssues = new Set(["semantic-kind-mismatch", "suspicious-price", "price-outlier", "suspicious-dimension", "suspicious-capacity", "identity-mismatch", "not-found"]);
  const quarantinedProducts = new Set(candidates.filter((candidate) => candidate.issues.some((issue) => quarantineIssues.has(issue))).map((candidate) => candidate.id)).size;
  return { schemaVersion: 1, generatedAt, ...metrics, candidateRows: candidates.length, normalizedProducts, offers: catalog.offers.length, reviewedProducts: catalog.products.length, publishedProducts: catalog.products.length, quarantinedProducts, productsWithoutOffers: catalog.products.filter((product) => !offeredProducts.has(product.id)).length, reviewQueue: reviewCount, candidateToProductRate: candidates.length ? Math.round((normalizedProducts / candidates.length) * 1000) / 10 : 0, priceStatsEur: prices.length ? { min: prices[0], median: medianPrice, max: prices.at(-1) } : null, linkVerification: Object.fromEntries(Object.entries(linkStatuses).sort(([a], [b]) => a.localeCompare(b))), issues: issueCounts(candidates), merchants: Object.fromEntries(Object.entries(merchants).sort(([a], [b]) => a.localeCompare(b))) };
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

async function resolveFeedJobs(raw: string): Promise<FeedJob[]> {
  const feedListUrl = extractFeedListUrl(raw);
  if (!feedListUrl) return parseFeedJobs(raw);
  const rows = [];
  for await (const row of streamFeedRows(feedListUrl)) rows.push(row);
  const feedEntries = parseFeedListRows(rows);
  const merchantRegistry = FeedMerchantRegistrySchema.parse(await readJson("data/manual/merchants.json"));
  const allowedAdvertiserIds = new Set(merchantRegistry.merchants.filter((merchant) => merchant.enabled).map((merchant) => String(merchant.awinAdvertiserId)));
  const entries = selectPreferredFeedEntries(filterFeedListEntries(feedEntries, allowedAdvertiserIds));
  if (!entries.length) throw new Error("Awin feed list contains no joined German product feeds");
  const verticalsByAdvertiser = new Map(merchantRegistry.merchants.map((merchant) => [String(merchant.awinAdvertiserId), merchant.verticals]));
  return entries.flatMap((entry) => {
    const verticals = entry.advertiserId ? verticalsByAdvertiser.get(entry.advertiserId) : undefined;
    return verticals?.length ? [{ url: entry.url, verticals: new Set<Vertical>(verticals) }] : [];
  });
}

async function run(): Promise<void> {
  const rawSecret = process.env.AWIN_FEED_URLS_JSON;
  if (!rawSecret) { console.log("Affiliate feed secret is not configured; nothing to sync."); return; }
  const jobs = await resolveFeedJobs(rawSecret);
  if (process.env.FEED_SYNC_SCHEDULED === "true") {
    const delayMs = (15 + Math.floor(Math.random() * 76)) * 1000;
    console.log(`Scheduled jitter: ${Math.round(delayMs / 1000)} seconds.`);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  const metrics: FeedMetrics = { sourceFeeds: jobs.length, successfulFeeds: 0, failedFeeds: 0, rows: 0 };
  const gardenHouseCandidates: GardenHouseCandidate[] = [];
  const dehumidifierCandidates: DehumidifierCandidate[] = [];
  const irrigationCandidates: IrrigationCandidate[] = [];
  const robotMowerCandidates: RobotMowerCandidate[] = [];
  const flooringCandidates: FlooringCandidate[] = [];
  const projectCandidates: ProjectProductCandidate[] = [];
  for (const [index, job] of jobs.entries()) {
    let rows = 0;
    try {
      for await (const row of streamFeedRows(job.url)) {
        rows += 1;
        if (job.verticals.has("garden-house") && isGardenHouseCandidate(row)) gardenHouseCandidates.push(normalizeGardenHouse(row));
        if (job.verticals.has("dehumidifier") && isDehumidifierCandidate(row)) dehumidifierCandidates.push(normalizeDehumidifier(row));
        if (job.verticals.has("irrigation") && isIrrigationCandidate(row)) irrigationCandidates.push(normalizeIrrigation(row));
        if (job.verticals.has("robot-mower") && isRobotMowerCandidate(row)) robotMowerCandidates.push(normalizeRobotMower(row));
        if (job.verticals.has("flooring") && isFlooringCandidate(row)) flooringCandidates.push(normalizeFlooring(row));
        if (job.verticals.has("project-products") && isProjectProductCandidate(row)) {
          const candidate = normalizeProjectProduct(row);
          if (candidate) projectCandidates.push(candidate);
        }
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
  if (gardenHouseCandidates.length + dehumidifierCandidates.length + irrigationCandidates.length + robotMowerCandidates.length + flooringCandidates.length + projectCandidates.length === 0) throw new Error("No supported product candidates found; existing catalogs remain untouched");

  const generatedAt = new Date().toISOString();
  const secretUrls = jobs.map((job) => job.url);
  const files: Record<string, unknown> = {};
  const manifest = await readJson<{ schemaVersion: 1; generatedAt: string; verticals: Record<string, { catalog: string; generatedAt: string }> }>("public/data/manifest.json");

  if (gardenHouseCandidates.length) {
    const previous = GardenHouseCatalogSchema.parse(await readJson("public/data/garden-house/catalog.json"));
    const overrides = GardenOverrideFileSchema.parse(await readJson("data/overrides/garden-house.json")).overrides as ProductOverride[];
    let catalog = assertCatalogSafe(quarantineSuspiciousCatalogOffers(assembleGardenHouseCatalog(gardenHouseCandidates, overrides, generatedAt)), previous, secretUrls);
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
    let catalog = assertCatalogPayloadSafe(quarantineSuspiciousCatalogOffers(assembleDehumidifierCatalog(dehumidifierCandidates, overrides, generatedAt)), previous, secretUrls);
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
    let catalog = assertCatalogPayloadSafe(quarantineSuspiciousCatalogOffers(assembleIrrigationCatalog(irrigationCandidates, overrides, generatedAt)), previous, secretUrls);
    let review = buildReviewQueue(irrigationCandidates, catalog, generatedAt);
    let report = buildReport(irrigationCandidates, metrics, catalog, review.products.length, generatedAt);
    if (substantiveEqual(catalog, previous)) catalog = previous;
    const oldReview = await readJson<unknown>("data/review/irrigation.json"); if (substantiveEqual(review, oldReview)) review = oldReview as typeof review;
    const oldReport = await readJson<unknown>("public/data/irrigation/feed-report.json"); if (substantiveEqual(report, oldReport)) report = oldReport as typeof report;
    files["public/data/irrigation/catalog.json"] = catalog; files["data/review/irrigation.json"] = review; files["public/data/irrigation/feed-report.json"] = report;
    manifest.verticals.irrigation = { catalog: "/data/irrigation/catalog.json", generatedAt: catalog.generatedAt };
  }
  if (robotMowerCandidates.length) {
    const previous = RobotMowerCatalogSchema.parse(await readJson("public/data/robot-mower/catalog.json"));
    const overrides = RobotMowerOverrideFileSchema.parse(await readJson("data/overrides/robot-mower.json")).overrides as RobotMowerOverride[];
    let catalog = assertCatalogPayloadSafe(quarantineSuspiciousCatalogOffers(assembleRobotMowerCatalog(robotMowerCandidates, overrides, generatedAt)), previous, secretUrls);
    let review = buildReviewQueue(robotMowerCandidates, catalog, generatedAt);
    let report = buildReport(robotMowerCandidates, metrics, catalog, review.products.length, generatedAt);
    if (substantiveEqual(catalog, previous)) catalog = previous;
    const oldReview = await readJson<unknown>("data/review/robot-mower.json"); if (substantiveEqual(review, oldReview)) review = oldReview as typeof review;
    const oldReport = await readJson<unknown>("public/data/robot-mower/feed-report.json"); if (substantiveEqual(report, oldReport)) report = oldReport as typeof report;
    files["public/data/robot-mower/catalog.json"] = catalog; files["data/review/robot-mower.json"] = review; files["public/data/robot-mower/feed-report.json"] = report;
    manifest.verticals["robot-mower"] = { catalog: "/data/robot-mower/catalog.json", generatedAt: catalog.generatedAt };
  }
  if (flooringCandidates.length) {
    const previous = FlooringCatalogSchema.parse(await readJson("public/data/flooring/catalog.json"));
    const overrides = FlooringOverrideFileSchema.parse(await readJson("data/overrides/flooring.json")).overrides as FlooringOverride[];
    let catalog = assertCatalogPayloadSafe(quarantineSuspiciousCatalogOffers(assembleFlooringCatalog(flooringCandidates, overrides, generatedAt)), previous, secretUrls);
    let review = buildReviewQueue(flooringCandidates, catalog, generatedAt);
    let report = buildReport(flooringCandidates, metrics, catalog, review.products.length, generatedAt);
    if (substantiveEqual(catalog, previous)) catalog = previous;
    const oldReview = await readJson<unknown>("data/review/flooring.json"); if (substantiveEqual(review, oldReview)) review = oldReview as typeof review;
    const oldReport = await readJson<unknown>("public/data/flooring/feed-report.json"); if (substantiveEqual(report, oldReport)) report = oldReport as typeof report;
    files["public/data/flooring/catalog.json"] = catalog; files["data/review/flooring.json"] = review; files["public/data/flooring/feed-report.json"] = report;
    manifest.verticals.flooring = { catalog: "/data/flooring/catalog.json", generatedAt: catalog.generatedAt };
  }
  if (projectCandidates.length) {
    const previous = ProjectCatalogSchema.parse(await readJson("public/data/project-products/catalog.json"));
    const overrides = ProjectOverrideFileSchema.parse(await readJson("data/overrides/project-products.json")).overrides as ProjectOverride[];
    const catalog = assertCatalogPayloadSafe(quarantineSuspiciousCatalogOffers(assembleProjectCatalog(projectCandidates, overrides, generatedAt)), previous, secretUrls);
    let review = buildReviewQueue(projectCandidates, catalog, generatedAt);
    let report = buildReport(projectCandidates, metrics, catalog, review.products.length, generatedAt);
    const oldReview = await readJson<unknown>("data/review/project-products.json"); if (substantiveEqual(review, oldReview)) review = oldReview as typeof review;
    const oldReport = await readJson<unknown>("public/data/project-products/feed-report.json"); if (substantiveEqual(report, oldReport)) report = oldReport as typeof report;
    files["public/data/project-products/catalog.json"] = catalog; files["data/review/project-products.json"] = review; files["public/data/project-products/feed-report.json"] = report;
    manifest.verticals["project-products"] = { catalog: "/data/project-products/catalog.json", generatedAt: catalog.generatedAt };
  }
  manifest.generatedAt = generatedAt;
  files["public/data/manifest.json"] = manifest;
  await writeFilesAtomically(files);
  console.log(`Sync complete: ${gardenHouseCandidates.length} garden-house, ${dehumidifierCandidates.length} dehumidifier, ${irrigationCandidates.length} irrigation, ${robotMowerCandidates.length} robot-mower, ${flooringCandidates.length} flooring and ${projectCandidates.length} project candidates processed.`);
}

if (import.meta.url === `file://${process.argv[1]}`) run().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
