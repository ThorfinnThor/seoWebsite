import { readFile } from "node:fs/promises";
import { z } from "zod";
import { extractFeedListUrl, filterFeedListEntries, parseFeedListRows, selectPreferredFeedEntries } from "./feed-list";
import { isDehumidifierCandidate } from "./dehumidifier-normalizer";
import { isIrrigationCandidate } from "./irrigation-normalizer";
import { isRobotMowerCandidate } from "./robot-mower-normalizer";
import { isSecurityCameraCandidate } from "./security-camera-normalizer";
import { isGardenHouseCandidate, value } from "./garden-house-normalizer";
import { streamFeedRows } from "./source";
import type { RawFeedRow } from "./types";

const InputSchema = z.object({
  advertiserId: z.coerce.number().int().positive(),
  brands: z.array(z.string().trim().min(1)).max(20),
});

const MerchantFileSchema = z.object({
  merchants: z.array(z.object({
    awinAdvertiserId: z.number().int().positive(),
    name: z.string().min(1),
    enabled: z.boolean(),
    verticals: z.array(z.string()),
  })),
});

function safeText(raw?: string, maxLength = 180) {
  return raw?.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength) || undefined;
}

function brand(row: RawFeedRow) {
  return safeText(value(row, "brand_name", "brand", "manufacturer"), 80) ?? "Unbekannt";
}

function productName(row: RawFeedRow) {
  return safeText(value(row, "product_name", "aw_product_name", "title")) ?? "Unbenanntes Produkt";
}

function category(row: RawFeedRow) {
  return safeText(value(row, "merchant_category", "category_name", "product_type", "merchant_product_category_path")) ?? "Ohne Kategorie";
}

function candidateVerticals(row: RawFeedRow) {
  const matches: string[] = [];
  if (isGardenHouseCandidate(row)) matches.push("garden-house");
  if (isDehumidifierCandidate(row)) matches.push("dehumidifier");
  if (isIrrigationCandidate(row)) matches.push("irrigation");
  if (isRobotMowerCandidate(row)) matches.push("robot-mower");
  if (isSecurityCameraCandidate(row)) matches.push("security-camera");
  return matches;
}

async function main() {
  const input = InputSchema.parse({
    advertiserId: process.env.AWIN_INSPECT_ADVERTISER_ID,
    brands: (process.env.AWIN_INSPECT_BRANDS ?? "").split(",").map((item) => item.trim()).filter(Boolean),
  });
  const rawFeedConfig = process.env.AWIN_FEED_URLS_JSON;
  if (!rawFeedConfig) throw new Error("AWIN_FEED_URLS_JSON is not configured");
  const feedListUrl = extractFeedListUrl(rawFeedConfig);
  if (!feedListUrl) throw new Error("Programme inspection requires the Awin feed-list configuration");

  const registry = MerchantFileSchema.parse(JSON.parse(await readFile("data/manual/merchants.json", "utf8")));
  const merchant = registry.merchants.find((item) => item.awinAdvertiserId === input.advertiserId);
  if (!merchant?.enabled) throw new Error("Advertiser must be enabled in the merchant registry before inspection");

  const feedListRows: RawFeedRow[] = [];
  for await (const row of streamFeedRows(feedListUrl)) feedListRows.push(row);
  const entries = selectPreferredFeedEntries(filterFeedListEntries(parseFeedListRows(feedListRows), new Set([String(input.advertiserId)])));
  if (!entries.length) throw new Error(`No joined German feed found for advertiser ${input.advertiserId}`);

  const wantedBrands = input.brands.map((item) => item.toLocaleLowerCase("de"));
  const brandCounts = new Map<string, number>();
  const candidateCounts = new Map<string, number>();
  const samples: Array<{ brand: string; name: string; category: string; candidates: string[] }> = [];
  let rows = 0;

  for (const entry of entries) {
    for await (const row of streamFeedRows(entry.url)) {
      rows += 1;
      const rowBrand = brand(row);
      brandCounts.set(rowBrand, (brandCounts.get(rowBrand) ?? 0) + 1);
      const candidates = candidateVerticals(row).filter((vertical) => merchant.verticals.includes(vertical));
      for (const vertical of candidates) candidateCounts.set(vertical, (candidateCounts.get(vertical) ?? 0) + 1);
      if (samples.length < 200 && wantedBrands.some((wanted) => rowBrand.toLocaleLowerCase("de").includes(wanted))) {
        samples.push({ brand: rowBrand, name: productName(row), category: category(row), candidates });
      }
    }
  }

  const topBrands = [...brandCounts.entries()].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0])).slice(0, 30);
  console.log(JSON.stringify({
    advertiserId: input.advertiserId,
    advertiserName: merchant.name,
    configuredVerticals: merchant.verticals,
    feedRows: rows,
    candidateCounts: Object.fromEntries([...candidateCounts.entries()].sort()),
    topBrands: Object.fromEntries(topBrands),
    requestedBrandSamples: samples,
    requestedBrandSamplesTruncated: samples.length === 200,
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
