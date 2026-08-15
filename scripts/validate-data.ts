import { readFile } from "node:fs/promises";
import { z } from "zod";
import { GardenHouseCatalogSchema, GardenHouseOverrideSchema, GardenHouseRulesSchema } from "@/lib/garden-house/types";
import { DehumidifierCatalogSchema, DehumidifierRulesSchema } from "@/lib/dehumidifier/types";
import { IrrigationCatalogSchema, IrrigationRulesSchema } from "@/lib/irrigation/types";
import { PLANNERS } from "@/lib/planners";
import { assertCatalogSafe } from "./catalog/safeguards";

const ManifestEntrySchema = z.object({ catalog: z.string().startsWith("/data/"), generatedAt: z.iso.datetime() });
const ManifestSchema = z.object({ schemaVersion: z.literal(1), generatedAt: z.iso.datetime(), verticals: z.object({ "garden-house": ManifestEntrySchema, dehumidifier: ManifestEntrySchema, irrigation: ManifestEntrySchema }) });
const OverridesSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(GardenHouseOverrideSchema) });
const knownPlannerIds = new Set(PLANNERS.map((planner) => planner.id));
const MerchantSchema = z.object({
  merchantId: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  network: z.literal("awin"),
  awinAdvertiserId: z.number().int().positive(),
  profileUrl: z.url().startsWith("https://ui.awin.com/merchant-profile/"),
  applicationPriority: z.number().int().positive(),
  applicationStatus: z.enum(["candidate", "applied", "active", "rejected", "paused"]),
  enabled: z.boolean(),
  verticals: z.array(z.string()),
  plannerIds: z.array(z.string()).min(1),
  country: z.literal("DE"),
}).superRefine((merchant, ctx) => {
  if (merchant.profileUrl !== `https://ui.awin.com/merchant-profile/${merchant.awinAdvertiserId}`) {
    ctx.addIssue({ code: "custom", path: ["profileUrl"], message: "Awin profile URL must match advertiser ID" });
  }
  if (merchant.enabled !== (merchant.applicationStatus === "active")) {
    ctx.addIssue({ code: "custom", path: ["enabled"], message: "Only active programmes may be enabled" });
  }
  for (const plannerId of merchant.plannerIds) {
    if (!knownPlannerIds.has(plannerId as never)) ctx.addIssue({ code: "custom", path: ["plannerIds"], message: `Unknown planner ID: ${plannerId}` });
  }
});
const MerchantsSchema = z.object({
  schemaVersion: z.literal(1),
  lastVerifiedAt: z.iso.date(),
  merchants: z.array(MerchantSchema).min(1),
}).superRefine(({ merchants }, ctx) => {
  for (const field of ["merchantId", "awinAdvertiserId", "applicationPriority"] as const) {
    const values = merchants.map((merchant) => merchant[field]);
    if (new Set(values).size !== values.length) ctx.addIssue({ code: "custom", path: ["merchants"], message: `Duplicate ${field}` });
  }
});
const ReviewSchema = z.object({ schemaVersion: z.literal(1), generatedAt: z.iso.datetime(), products: z.array(z.object({ id: z.string().min(1) }).passthrough()) });
const FeedReportSchema = z.object({ schemaVersion: z.literal(1), generatedAt: z.iso.datetime(), sourceFeeds: z.number().int().nonnegative(), successfulFeeds: z.number().int().nonnegative(), failedFeeds: z.number().int().nonnegative(), rows: z.number().int().nonnegative(), candidateRows: z.number().int().nonnegative(), normalizedProducts: z.number().int().nonnegative(), offers: z.number().int().nonnegative(), reviewedProducts: z.number().int().nonnegative(), reviewQueue: z.number().int().nonnegative(), issues: z.record(z.string(), z.number().int().nonnegative()), merchants: z.record(z.string(), z.unknown()) });

async function json(file: string): Promise<unknown> { return JSON.parse(await readFile(file, "utf8")); }

async function main() {
  const catalog = GardenHouseCatalogSchema.parse(await json("public/data/garden-house/catalog.json"));
  const dehumidifiers = DehumidifierCatalogSchema.parse(await json("public/data/dehumidifier/catalog.json"));
  const irrigation = IrrigationCatalogSchema.parse(await json("public/data/irrigation/catalog.json"));
  assertCatalogSafe(catalog);
  GardenHouseRulesSchema.parse(await json("data/manual/garden-house-rules.json"));
  DehumidifierRulesSchema.parse(await json("data/manual/dehumidifier-rules.json"));
  IrrigationRulesSchema.parse(await json("data/manual/irrigation-rules.json"));
  ManifestSchema.parse(await json("public/data/manifest.json"));
  OverridesSchema.parse(await json("data/overrides/garden-house.json"));
  const merchants = MerchantsSchema.parse(await json("data/manual/merchants.json"));
  ReviewSchema.parse(await json("data/review/garden-house.json"));
  ReviewSchema.parse(await json("data/review/dehumidifier.json"));
  ReviewSchema.parse(await json("data/review/irrigation.json"));
  FeedReportSchema.parse(await json("public/data/garden-house/feed-report.json"));
  FeedReportSchema.parse(await json("public/data/dehumidifier/feed-report.json"));
  FeedReportSchema.parse(await json("public/data/irrigation/feed-report.json"));
  z.object({ schemaVersion:z.literal(1),overrides:z.array(z.object({id:z.string().min(1)}).passthrough()) }).parse(await json("data/overrides/dehumidifier.json"));
  z.object({ schemaVersion:z.literal(1),overrides:z.array(z.object({id:z.string().min(1)}).passthrough()) }).parse(await json("data/overrides/irrigation.json"));
  console.log(`Validated catalogs: garden-house ${catalog.products.length}, dehumidifier ${dehumidifiers.products.length}, irrigation ${irrigation.products.length} products; ${merchants.merchants.length} Awin programmes registered.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
