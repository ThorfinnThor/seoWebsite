import { appendFile, readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import type { OfferBase, ProductBase, StaticCatalog } from "@/lib/catalog/types";
import { DehumidifierCatalogSchema, DehumidifierOverrideSchema, DehumidifierProductSchema, type DehumidifierCatalog, type DehumidifierOverride, type DehumidifierProduct } from "@/lib/dehumidifier/types";
import { GardenHouseCatalogSchema, GardenHouseOverrideSchema, GardenHouseProductSchema, type GardenHouseCatalog, type GardenHouseOffer, type GardenHouseProduct } from "@/lib/garden-house/types";
import { IrrigationCatalogSchema, IrrigationOverrideSchema, IrrigationProductSchema, type IrrigationCatalog, type IrrigationOverride, type IrrigationProduct } from "@/lib/irrigation/types";
import { FlooringCatalogSchema, FlooringOverrideSchema, FlooringProductSchema, type FlooringCatalog, type FlooringOverride, type FlooringProduct } from "@/lib/flooring/types";
import { ProjectCatalogSchema, ProjectOverrideSchema, ProjectProductSchema, type ProjectCatalog, type ProjectOverride, type ProjectProduct } from "@/lib/project-products/types";
import { RobotMowerCatalogSchema, RobotMowerOverrideSchema, RobotMowerProductSchema, type RobotMowerCatalog, type RobotMowerOverride, type RobotMowerProduct } from "@/lib/robot-mower/types";
import { SecurityCameraCatalogSchema, SecurityCameraOverrideSchema, SecurityCameraProductSchema, type SecurityCameraCatalog, type SecurityCameraOverride, type SecurityCameraProduct } from "@/lib/security-camera/types";
import { AbsenceStateSchema, offerKey, retainMissingOffers, type AbsenceState, type FeedEvidence, type RetainedOffer } from "@/scripts/catalog/retention";
import { assertCatalogPayloadSafe } from "@/scripts/catalog/safeguards";
import { quarantineSuspiciousCatalogOffers } from "@/scripts/catalog/price-safeguards";
import { stableJson, writeFilesAtomically } from "@/scripts/catalog/write-atomic";
import { isDehumidifierCandidate, normalizeDehumidifier } from "./dehumidifier-normalizer";
import { isGardenHouseCandidate, merchantDetails, normalizeGardenHouse, value } from "./garden-house-normalizer";
import { isIrrigationCandidate, normalizeIrrigation } from "./irrigation-normalizer";
import { isFlooringCandidate, normalizeFlooring } from "./flooring-normalizer";
import { isRobotMowerCandidate, normalizeRobotMower } from "./robot-mower-normalizer";
import { isSecurityCameraCandidate, normalizeSecurityCamera } from "./security-camera-normalizer";
import { isProjectProductCandidate, normalizeProjectProduct } from "./project-products-normalizer";
import { extractFeedListUrl, filterFeedListEntries, parseFeedListRows, selectPreferredFeedEntries } from "./feed-list";
import { streamFeedRows } from "./source";
import type { AffiliateCandidate, DehumidifierCandidate, FlooringCandidate, GardenHouseCandidate, IrrigationCandidate, ProductOverride, ProjectProductCandidate, RobotMowerCandidate, SecurityCameraCandidate } from "./types";

const HttpsUrl = z.url().refine((url) => url.startsWith("https:"));
const SupportedVerticalSchema = z.enum(["garden-house", "dehumidifier", "irrigation", "robot-mower", "security-camera", "flooring", "project-products"]);
const VerticalConfigSchema = z.object({
  "garden-house": z.array(HttpsUrl).default([]),
  dehumidifier: z.array(HttpsUrl).default([]),
  irrigation: z.array(HttpsUrl).default([]),
  "robot-mower": z.array(HttpsUrl).default([]),
  "security-camera": z.array(HttpsUrl).default([]),
  flooring: z.array(HttpsUrl).default([]),
  "project-products": z.array(HttpsUrl).default([]),
}).refine((config) => Object.values(config).some((urls) => urls.length > 0), "At least one feed URL is required");
const LegacyConfigSchema = z.array(HttpsUrl).min(1);
const GardenOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(GardenHouseOverrideSchema) });
const DehumidifierOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(DehumidifierOverrideSchema) });
const IrrigationOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(IrrigationOverrideSchema) });
const RobotMowerOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(RobotMowerOverrideSchema) });
const SecurityCameraOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(SecurityCameraOverrideSchema) });
const FlooringOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(FlooringOverrideSchema) });
const ProjectOverrideFileSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(ProjectOverrideSchema) });
const FeedMerchantRegistrySchema = z.object({ merchants: z.array(z.object({ awinAdvertiserId: z.number().int().positive(), enabled: z.boolean(), verticals: z.array(SupportedVerticalSchema).min(1) })) });
const MerchantSwitchSchema = z.object({ merchants: z.array(z.object({ merchantId: z.string(), awinAdvertiserId: z.number().int(), enabled: z.boolean() })) });

type Vertical = "garden-house" | "dehumidifier" | "irrigation" | "robot-mower" | "security-camera" | "flooring" | "project-products";
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

function securityCameraPublicOverride(override: SecurityCameraOverride) {
  const { includedMerchantProductIds: _includedMerchantProductIds, ...productOverride } = override;
  return publicOverride(productOverride);
}

function applySecurityCameraOverride(product: SecurityCameraProduct, override?: SecurityCameraOverride): SecurityCameraProduct {
  return override ? SecurityCameraProductSchema.parse({ ...product, ...securityCameraPublicOverride(override), id: product.id }) : product;
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

function projectProductQuality(product: ProjectProduct): number {
  const present = (...values: unknown[]) => values.filter((value) => value !== undefined && value !== false).length;
  if (product.vertical === "terrace" && product.kind === "decking") return present(product.boardLengthMm, product.boardWidthMm, product.boardThicknessMm, product.material);
  if (product.vertical === "privacy-screen" && product.kind === "panel") return present(product.panelWidthCm, product.panelHeightCm, product.systemId, product.postSystemId);
  if (product.vertical === "greenhouse" && product.kind === "kit") return present(product.externalWidthM, product.externalLengthM, product.completeKit, product.glazingType, product.roofVentCount, product.doorWidthCm);
  if (product.vertical === "carport" && product.kind === "kit") return present(product.externalWidthM, product.externalLengthM, product.clearWidthM, product.clearLengthM, product.clearHeightM, product.vehicleCount, product.roofType);
  if (product.vertical === "drywall" && product.kind === "board") return present(product.boardLengthMm, product.boardWidthMm, product.boardThicknessMm, product.boardType, product.material);
  if (product.vertical === "drywall" && product.kind === "profile") return present(product.profileLengthMm, product.profileWidthMm, product.profileType);
  return present(product.piecesPerPack, product.widthCm, product.depthCm, product.lengthCm);
}

function takeProjectProductsRoundRobin(
  products: ProjectProduct[],
  merchantByProductId: ReadonlyMap<string, string>,
  limit: number,
  selectedIds: Set<string>,
): ProjectProduct[] {
  if (limit <= 0) return [];
  const groups = new Map<string, ProjectProduct[]>();
  for (const product of products) {
    if (selectedIds.has(product.id)) continue;
    const merchantId = merchantByProductId.get(product.id) ?? "unknown";
    const key = `${String(PROJECT_KIND_PRIORITY[product.kind] ?? 99).padStart(2, "0")}:${product.kind}:${merchantId}`;
    groups.set(key, [...(groups.get(key) ?? []), product]);
  }
  const keys = [...groups.keys()].sort();
  const selected: ProjectProduct[] = [];
  let index = 0;
  while (selected.length < limit && keys.some((key) => index < (groups.get(key)?.length ?? 0))) {
    for (const key of keys) {
      if (selected.length >= limit) break;
      const product = groups.get(key)?.[index];
      if (!product) continue;
      selected.push(product);
      selectedIds.add(product.id);
    }
    index += 1;
  }
  return selected;
}

function selectProjectProducts(
  published: ProjectProduct[],
  merchantByProductId: ReadonlyMap<string, string>,
  limitPerVertical = 120,
): ProjectProduct[] {
  const selected: ProjectProduct[] = [];
  const verticals = [...new Set(published.map((product) => product.vertical))].sort();

  for (const vertical of verticals) {
    const verticalProducts = published.filter((product) => product.vertical === vertical);
    const selectedIds = new Set<string>();
    const primary = verticalProducts.filter((product) => (PROJECT_KIND_PRIORITY[product.kind] ?? 99) === 1);
    const supplements = verticalProducts.filter((product) => (PROJECT_KIND_PRIORITY[product.kind] ?? 99) > 1);
    const primaryLimit = Math.min(80, limitPerVertical);
    const primarySelection = takeProjectProductsRoundRobin(primary, merchantByProductId, primaryLimit, selectedIds);
    const supplementSelection = takeProjectProductsRoundRobin(supplements, merchantByProductId, limitPerVertical - primarySelection.length, selectedIds);
    const remainingSelection = takeProjectProductsRoundRobin(verticalProducts, merchantByProductId, limitPerVertical - primarySelection.length - supplementSelection.length, selectedIds);
    selected.push(...primarySelection, ...supplementSelection, ...remainingSelection);
  }

  return selected;
}

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

export function assembleSecurityCameraCatalog(candidates: SecurityCameraCandidate[], overrides: SecurityCameraOverride[], generatedAt: string): SecurityCameraCatalog {
  const overrideMap = new Map(overrides.map((override) => [override.id, override]));
  const productMap = new Map<string, SecurityCameraProduct>();
  const offerMap = new Map<string, OfferBase>();
  for (const candidate of candidates) {
    const override = overrideMap.get(candidate.id);
    const completedProduct = candidate.product
      ? applySecurityCameraOverride(candidate.product, override)
      : override
        ? SecurityCameraProductSchema.safeParse({ ...candidate.candidateAttributes, ...securityCameraPublicOverride(override), id: candidate.id }).data
        : undefined;
    if (!completedProduct) continue;
    const product = autoReviewCompleteFeedProduct(completedProduct, candidate, Boolean(override));
    const existing = productMap.get(product.id);
    if (!existing || product.sourceUpdatedAt && (!existing.sourceUpdatedAt || product.sourceUpdatedAt > existing.sourceUpdatedAt)) productMap.set(product.id, product);
    const includedOfferIds = override?.includedMerchantProductIds;
    if (candidate.offer && (!includedOfferIds || includedOfferIds.includes(candidate.offer.merchantProductId))) offerMap.set(candidate.offer.id, candidate.offer);
  }
  const reviewedIds = new Set([...productMap.values()].filter((product) => product.reviewed && product.dataQuality !== "feed").map((product) => product.id));
  return SecurityCameraCatalogSchema.parse({ schemaVersion: 1, vertical: "security-camera", generatedAt, products: [...productMap.values()].filter((product) => reviewedIds.has(product.id)).sort((a, b) => a.id.localeCompare(b.id)), offers: [...offerMap.values()].filter((offer) => reviewedIds.has(offer.productId)).sort((a, b) => a.id.localeCompare(b.id)) });
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
  const published = [...productMap.values()].filter((product) => product.reviewed && product.dataQuality !== "feed").sort((a, b) => a.vertical.localeCompare(b.vertical) || (PROJECT_KIND_PRIORITY[a.kind] ?? 99) - (PROJECT_KIND_PRIORITY[b.kind] ?? 99) || projectProductQuality(b) - projectProductQuality(a) || a.kind.localeCompare(b.kind) || a.id.localeCompare(b.id));
  const merchantByProductId = new Map<string, string>();
  for (const offer of [...offerMap.values()].sort((a, b) => a.id.localeCompare(b.id))) {
    if (!merchantByProductId.has(offer.productId)) merchantByProductId.set(offer.productId, offer.merchantId);
  }
  const selected = selectProjectProducts(published, merchantByProductId);
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
  const eligible = filterFeedListEntries(feedEntries, allowedAdvertiserIds);
  const entries = selectPreferredFeedEntries(eligible);
  // Only the most recently updated feed of a merchant is read. Log the alternatives, so a suddenly
  // small catalog can be traced to a switched feed.
  for (const entry of entries) {
    const alternatives = eligible.filter((other) => other.advertiserId === entry.advertiserId);
    if (alternatives.length > 1) console.log(`merchant ${entry.advertiserId}: ${alternatives.length} feeds, reading ${entry.feedId ?? "?"} (${alternatives.map((other) => `${other.feedId ?? "?"}: ${other.productCount ?? "?"} products, ${other.lastUpdated ?? "no date"}`).join("; ")}).`);
  }
  if (!entries.length) throw new Error("Awin feed list contains no joined German product feeds");
  const verticalsByAdvertiser = new Map(merchantRegistry.merchants.map((merchant) => [String(merchant.awinAdvertiserId), merchant.verticals]));
  return entries.flatMap((entry) => {
    const verticals = entry.advertiserId ? verticalsByAdvertiser.get(entry.advertiserId) : undefined;
    return verticals?.length ? [{ url: entry.url, verticals: new Set<Vertical>(verticals) }] : [];
  });
}

const ABSENCE_FILE = "data/review/catalog-absences.json";
const VERTICALS = SupportedVerticalSchema.options;
interface CatalogManifest { schemaVersion: 1; generatedAt: string; verticals: Record<string, { catalog: string; generatedAt: string }> }
interface SyncContext { generatedAt: string; today: string; secretUrls: string[]; metrics: FeedMetrics; state: AbsenceState; evidence: FeedEvidence }
interface VerticalSync<TProduct extends ProductBase, TCatalog extends StaticCatalog<TProduct, OfferBase>, TOverride> {
  vertical: Vertical;
  schema: z.ZodType<TCatalog>;
  candidates: AffiliateCandidate<TProduct>[];
  loadOverrides: () => Promise<TOverride[]>;
  assemble: (candidates: AffiliateCandidate<TProduct>[], overrides: TOverride[], generatedAt: string) => TCatalog;
  applyOverride: (product: TProduct, override?: TOverride) => TProduct;
}
export interface VerticalOutcome {
  vertical: Vertical;
  files: Record<string, unknown>;
  catalogGeneratedAt?: string;
  absences?: AbsenceState["verticals"][string];
  regression?: string;
  retained: RetainedOffer[];
  dropped: RetainedOffer[];
  critical: boolean;
  /** Set if the catalog was left untouched. */
  error?: string;
}

async function readPublishedOfferKeys(): Promise<Set<string>> {
  const keys = new Set<string>();
  for (const vertical of VERTICALS) {
    const catalog = await readJson<{ offers: Array<{ merchantId: string; merchantProductId: string }> }>(`public/data/${vertical}/catalog.json`);
    for (const offer of catalog.offers) keys.add(offerKey(offer.merchantId, offer.merchantProductId));
  }
  return keys;
}

export async function syncVertical<TProduct extends ProductBase, TCatalog extends StaticCatalog<TProduct, OfferBase>, TOverride extends { id: string; reviewed?: boolean; dataQuality?: string }>(config: VerticalSync<TProduct, TCatalog, TOverride>, context: SyncContext): Promise<VerticalOutcome> {
  const { vertical, candidates } = config;
  try {
    const previous = config.schema.parse(await readJson(`public/data/${vertical}/catalog.json`));
    if (!candidates.length && !previous.products.length) return { vertical, files: {}, retained: [], dropped: [], critical: false };
    const overrides = await config.loadOverrides();
    const overrideMap = new Map(overrides.map((override) => [override.id, override]));
    const fresh = quarantineSuspiciousCatalogOffers(config.assemble(candidates, overrides, context.generatedAt));
    const retention = retainMissingOffers<TProduct, TCatalog>({
      next: fresh, previous, candidates, evidence: context.evidence, today: context.today,
      absences: context.state.verticals[vertical] ?? {},
      withheldProductIds: new Set(overrides.filter((override) => override.reviewed === false || override.dataQuality === "feed").map((override) => override.id)),
      refresh: (product) => config.applyOverride(product, overrideMap.get(product.id)),
    });
    let catalog = assertCatalogPayloadSafe(config.schema.parse(quarantineSuspiciousCatalogOffers(retention.catalog)), undefined, context.secretUrls);
    let review = buildReviewQueue(candidates, catalog, context.generatedAt);
    let report = buildReport(candidates, context.metrics, catalog, review.products.length, context.generatedAt);
    if (substantiveEqual(catalog, previous)) catalog = previous;
    const oldReview = await readJson<unknown>(`data/review/${vertical}.json`); if (substantiveEqual(review, oldReview)) review = oldReview as typeof review;
    const oldReport = await readJson<unknown>(`public/data/${vertical}/feed-report.json`); if (substantiveEqual(report, oldReport)) report = oldReport as typeof report;
    return {
      vertical,
      // Without candidates there is nothing to review; keep the last review queue and report.
      files: { [`public/data/${vertical}/catalog.json`]: catalog, ...(candidates.length ? { [`data/review/${vertical}.json`]: review, [`public/data/${vertical}/feed-report.json`]: report } : {}) },
      catalogGeneratedAt: catalog.generatedAt,
      absences: retention.absences, regression: retention.regression, retained: retention.retained, dropped: retention.dropped, critical: retention.critical,
    };
  } catch (error) {
    return { vertical, files: {}, retained: [], dropped: [], critical: true, error: error instanceof Error ? error.message : "unknown error" };
  }
}

/** One line per reason and merchant, so the cause is visible in the run log. */
export function summarizeOffers(offers: RetainedOffer[]): string[] {
  const groups = new Map<string, RetainedOffer[]>();
  for (const offer of offers) {
    const key = `${offer.merchantName}, ${offer.reason}`;
    groups.set(key, [...(groups.get(key) ?? []), offer]);
  }
  return [...groups.entries()].map(([key, entries]) => `${key}: ${entries.length} (${entries.slice(0, 5).map((entry) => `${entry.productName}, Tag ${entry.days}`).join("; ")}${entries.length > 5 ? "; …" : ""})`);
}

/** Never pass feed URLs in here: this ends up in public run logs. */
async function reportOutcomes(outcomes: VerticalOutcome[], metrics: FeedMetrics): Promise<void> {
  const lines: string[] = [];
  const annotate = (level: "error" | "warning", message: string) => console.log(`::${level}::${message.replace(/%/g, "%25").replace(/\r?\n/g, " ").slice(0, 1500)}`);
  for (const outcome of outcomes) {
    if (outcome.error) {
      annotate("error", `${outcome.vertical}: Katalog unverändert gelassen. ${outcome.error}`);
      lines.push(`- **${outcome.vertical}**: unverändert gelassen. ${outcome.error}`);
    } else if (outcome.regression) {
      const details = [...summarizeOffers(outcome.retained).map((line) => `behalten: ${line}`), ...summarizeOffers(outcome.dropped).map((line) => `entfernt: ${line}`)];
      annotate(outcome.critical ? "error" : "warning", `${outcome.vertical}: ${outcome.regression}. ${details.join(" | ")}`);
      lines.push(`- **${outcome.vertical}**: ${outcome.regression}`, ...details.map((line) => `  - ${line}`));
    }
  }
  if (metrics.failedFeeds) annotate("warning", `${metrics.failedFeeds} von ${metrics.sourceFeeds} Feeds konnten nicht gelesen werden.`);
  const critical = outcomes.filter((outcome) => outcome.critical).map((outcome) => outcome.vertical);
  if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `critical_catalogs=${critical.join(",")}\n`);
  if (process.env.GITHUB_STEP_SUMMARY && lines.length) await appendFile(process.env.GITHUB_STEP_SUMMARY, `### Kataloge mit Rückgang\n${lines.join("\n")}\n`);
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
  const securityCameraCandidates: SecurityCameraCandidate[] = [];
  const flooringCandidates: FlooringCandidate[] = [];
  const projectCandidates: ProjectProductCandidate[] = [];
  const publishedOfferKeys = await readPublishedOfferKeys();
  const rowsByMerchant = new Map<string, number>();
  const failedMerchants = new Set<string>();
  const seenOfferKeys = new Set<string>();
  for (const [index, job] of jobs.entries()) {
    let rows = 0;
    const jobMerchants = new Set<string>();
    try {
      for await (const row of streamFeedRows(job.url)) {
        rows += 1;
        const { merchantId } = merchantDetails(row);
        jobMerchants.add(merchantId);
        rowsByMerchant.set(merchantId, (rowsByMerchant.get(merchantId) ?? 0) + 1);
        const key = offerKey(merchantId, value(row, "merchant_product_id", "aw_product_id") ?? "");
        if (publishedOfferKeys.has(key)) seenOfferKeys.add(key);
        if (job.verticals.has("garden-house") && isGardenHouseCandidate(row)) gardenHouseCandidates.push(normalizeGardenHouse(row));
        if (job.verticals.has("dehumidifier") && isDehumidifierCandidate(row)) dehumidifierCandidates.push(normalizeDehumidifier(row));
        if (job.verticals.has("irrigation") && isIrrigationCandidate(row)) irrigationCandidates.push(normalizeIrrigation(row));
        if (job.verticals.has("robot-mower") && isRobotMowerCandidate(row)) robotMowerCandidates.push(normalizeRobotMower(row));
        if (job.verticals.has("security-camera") && isSecurityCameraCandidate(row)) securityCameraCandidates.push(normalizeSecurityCamera(row));
        if (job.verticals.has("flooring") && isFlooringCandidate(row)) flooringCandidates.push(normalizeFlooring(row));
        if (job.verticals.has("project-products") && isProjectProductCandidate(row)) {
          const candidate = normalizeProjectProduct(row);
          if (candidate) projectCandidates.push(candidate);
        }
      }
      metrics.successfulFeeds += 1;
      metrics.rows += rows;
      console.log(`feed-${index + 1}: ${rows} rows${jobMerchants.size === 1 ? ` (merchant ${[...jobMerchants][0]})` : ""}.`);
    } catch (error) {
      metrics.failedFeeds += 1;
      for (const merchantId of jobMerchants) failedMerchants.add(merchantId);
      console.error(`feed-${index + 1}: failed (${error instanceof Error ? error.message : "unknown error"}).`);
    }
  }
  if (metrics.successfulFeeds === 0) throw new Error("All configured feeds failed; existing catalogs remain untouched");
  if (gardenHouseCandidates.length + dehumidifierCandidates.length + irrigationCandidates.length + robotMowerCandidates.length + securityCameraCandidates.length + flooringCandidates.length + projectCandidates.length === 0) throw new Error("No supported product candidates found; existing catalogs remain untouched");

  const generatedAt = new Date().toISOString();
  const merchantRegistry = MerchantSwitchSchema.parse(await readJson("data/manual/merchants.json"));
  const state = AbsenceStateSchema.parse(await readJson(ABSENCE_FILE));
  const manifest = await readJson<CatalogManifest>("public/data/manifest.json");
  const context: SyncContext = {
    generatedAt,
    today: generatedAt.slice(0, 10),
    secretUrls: jobs.map((job) => job.url),
    metrics,
    state,
    evidence: {
      rowsByMerchant, failedMerchants, seenOfferKeys,
      disabledMerchants: new Set(merchantRegistry.merchants.filter((merchant) => !merchant.enabled).flatMap((merchant) => [merchant.merchantId, String(merchant.awinAdvertiserId)])),
    },
  };
  const overridesOf = async <TOverride>(vertical: Vertical, schema: z.ZodType<{ overrides: TOverride[] }>) => schema.parse(await readJson(`data/overrides/${vertical}.json`)).overrides;

  // Each catalog is synced on its own: one that cannot be updated must not stop the others.
  const outcomes = [
    await syncVertical({ vertical: "garden-house", schema: GardenHouseCatalogSchema, candidates: gardenHouseCandidates, loadOverrides: () => overridesOf("garden-house", GardenOverrideFileSchema) as Promise<ProductOverride[]>, assemble: assembleGardenHouseCatalog, applyOverride: applyGardenOverride }, context),
    await syncVertical({ vertical: "dehumidifier", schema: DehumidifierCatalogSchema, candidates: dehumidifierCandidates, loadOverrides: () => overridesOf("dehumidifier", DehumidifierOverrideFileSchema), assemble: assembleDehumidifierCatalog, applyOverride: applyDehumidifierOverride }, context),
    await syncVertical({ vertical: "irrigation", schema: IrrigationCatalogSchema, candidates: irrigationCandidates, loadOverrides: () => overridesOf("irrigation", IrrigationOverrideFileSchema), assemble: assembleIrrigationCatalog, applyOverride: applyIrrigationOverride }, context),
    await syncVertical({ vertical: "robot-mower", schema: RobotMowerCatalogSchema, candidates: robotMowerCandidates, loadOverrides: () => overridesOf("robot-mower", RobotMowerOverrideFileSchema), assemble: assembleRobotMowerCatalog, applyOverride: applyRobotMowerOverride }, context),
    await syncVertical({ vertical: "security-camera", schema: SecurityCameraCatalogSchema, candidates: securityCameraCandidates, loadOverrides: () => overridesOf("security-camera", SecurityCameraOverrideFileSchema), assemble: assembleSecurityCameraCatalog, applyOverride: applySecurityCameraOverride }, context),
    await syncVertical({ vertical: "flooring", schema: FlooringCatalogSchema, candidates: flooringCandidates, loadOverrides: () => overridesOf("flooring", FlooringOverrideFileSchema), assemble: assembleFlooringCatalog, applyOverride: applyFlooringOverride }, context),
    await syncVertical({ vertical: "project-products", schema: ProjectCatalogSchema, candidates: projectCandidates, loadOverrides: () => overridesOf("project-products", ProjectOverrideFileSchema), assemble: assembleProjectCatalog, applyOverride: applyProjectOverride }, context),
  ];

  const files: Record<string, unknown> = {};
  const absences: AbsenceState = { schemaVersion: 1, verticals: {} };
  for (const outcome of outcomes) {
    Object.assign(files, outcome.files);
    if (outcome.catalogGeneratedAt) manifest.verticals[outcome.vertical] = { catalog: `/data/${outcome.vertical}/catalog.json`, generatedAt: outcome.catalogGeneratedAt };
    const missing = outcome.absences ?? state.verticals[outcome.vertical] ?? {};
    if (Object.keys(missing).length) absences.verticals[outcome.vertical] = missing;
  }
  manifest.generatedAt = generatedAt;
  files["public/data/manifest.json"] = manifest;
  files[ABSENCE_FILE] = absences;
  await writeFilesAtomically(files);
  await reportOutcomes(outcomes, metrics);
  console.log(`Sync complete: ${gardenHouseCandidates.length} garden-house, ${dehumidifierCandidates.length} dehumidifier, ${irrigationCandidates.length} irrigation, ${robotMowerCandidates.length} robot-mower, ${securityCameraCandidates.length} security-camera, ${flooringCandidates.length} flooring and ${projectCandidates.length} project candidates processed.`);
}

if (import.meta.url === `file://${process.argv[1]}`) run().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
