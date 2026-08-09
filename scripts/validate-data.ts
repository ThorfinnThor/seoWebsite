import { readFile } from "node:fs/promises";
import { z } from "zod";
import { GardenHouseCatalogSchema, GardenHouseOverrideSchema, GardenHouseRulesSchema } from "@/lib/garden-house/types";
import { assertCatalogSafe } from "./catalog/safeguards";

const ManifestSchema = z.object({ schemaVersion: z.literal(1), generatedAt: z.iso.datetime(), verticals: z.object({ "garden-house": z.object({ catalog: z.literal("/data/garden-house/catalog.json"), generatedAt: z.iso.datetime() }) }) });
const OverridesSchema = z.object({ schemaVersion: z.literal(1), overrides: z.array(GardenHouseOverrideSchema) });
const MerchantsSchema = z.object({ schemaVersion: z.literal(1), merchants: z.array(z.object({ merchantId: z.string(), name: z.string(), enabled: z.boolean(), verticals: z.array(z.string()), country: z.string() })) });
const ReviewSchema = z.object({ schemaVersion: z.literal(1), generatedAt: z.iso.datetime(), products: z.array(z.object({ id: z.string().min(1) }).passthrough()) });
const FeedReportSchema = z.object({ schemaVersion: z.literal(1), generatedAt: z.iso.datetime(), sourceFeeds: z.number().int().nonnegative(), successfulFeeds: z.number().int().nonnegative(), failedFeeds: z.number().int().nonnegative(), rows: z.number().int().nonnegative(), candidateRows: z.number().int().nonnegative(), normalizedProducts: z.number().int().nonnegative(), offers: z.number().int().nonnegative(), reviewedProducts: z.number().int().nonnegative(), reviewQueue: z.number().int().nonnegative(), issues: z.record(z.string(), z.number().int().nonnegative()), merchants: z.record(z.string(), z.unknown()) });

async function json(file: string): Promise<unknown> { return JSON.parse(await readFile(file, "utf8")); }

async function main() {
  const catalog = GardenHouseCatalogSchema.parse(await json("public/data/garden-house/catalog.json"));
  assertCatalogSafe(catalog);
  GardenHouseRulesSchema.parse(await json("data/manual/garden-house-rules.json"));
  ManifestSchema.parse(await json("public/data/manifest.json"));
  OverridesSchema.parse(await json("data/overrides/garden-house.json"));
  MerchantsSchema.parse(await json("data/manual/merchants.json"));
  ReviewSchema.parse(await json("data/review/garden-house.json"));
  FeedReportSchema.parse(await json("public/data/garden-house/feed-report.json"));
  console.log(`Validated garden-house catalog: ${catalog.products.length} products, ${catalog.offers.length} offers.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
