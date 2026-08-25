import type { OfferBase } from "@/lib/catalog/types";
import { DehumidifierProductSchema, type DehumidifierProduct } from "@/lib/dehumidifier/types";
import { availability, delivery, isoDate, parsePrice, productDisplayName, productIdentity, shortHash, slug, value } from "./garden-house-normalizer";
import type { DehumidifierCandidate, RawFeedRow } from "./types";

const CANDIDATE_PATTERN = /luftentfeuchter|entfeuchter|dehumidifier|bautrockner|raumtrockner|kondensationstrockner/i;

export function isDehumidifierCandidate(row: RawFeedRow): boolean {
  return CANDIDATE_PATTERN.test([value(row, "product_name"), value(row, "merchant_category"), value(row, "category_name"), value(row, "product_type"), value(row, "merchant_product_category_path")].filter(Boolean).join(" "));
}

function decimal(raw?: string) { const parsed = raw ? Number(raw.replace(",", ".")) : NaN; return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined; }
function capture(text: string, pattern: RegExp) { return decimal(text.match(pattern)?.[1]); }

export function parseDehumidifierAttributes(text: string): Partial<DehumidifierProduct> {
  const maxRecommendedAreaM2 = capture(text, /(?:bis\s+zu|max(?:imal)?\.?|räume?\s+bis|f(?:ü|ue)r)\s*(\d+(?:[.,]\d+)?)\s*m(?:²|2)/i)
    ?? capture(text, /\b(\d+(?:[.,]\d+)?)\s*m(?:²|2)/i);
  const maxRecommendedVolumeM3 = capture(text, /(?:bis\s+zu|max(?:imal)?\.?|räume?\s+bis|f(?:ü|ue)r)\s*(\d+(?:[.,]\d+)?)\s*m(?:³|3)/i);
  const extractionLPerDay = capture(text, /\b(\d+(?:[.,]\d+)?)\s*(?:l|liter)\s*(?:\/|pro)?\s*(?:24\s*h|tag|day)\b/i);
  const noiseDb = capture(text, /\b(\d+(?:[.,]\d+)?)\s*dba?\b/i);
  const tankLiters = capture(text, /(?:tank|behälter|behaelter)\D{0,18}(\d+(?:[.,]\d+)?)\s*l\b/i);
  const powerW = capture(text, /\b(\d+(?:[.,]\d+)?)\s*w(?:att)?\b/i);
  const temperature = text.match(/(-?\d+(?:[.,]\d+)?)\s*(?:(?:°\s*)?c\s*)?(?:bis|[-–])\s*(-?\d+(?:[.,]\d+)?)\s*(?:°\s*)?c/i);
  const minOperatingTempC = temperature ? Number(temperature[1].replace(",", ".")) : undefined;
  const maxOperatingTempC = temperature ? Number(temperature[2].replace(",", ".")) : undefined;
  return {
    maxRecommendedAreaM2,
    maxRecommendedVolumeM3,
    extractionLPerDay,
    minOperatingTempC,
    maxOperatingTempC,
    continuousDrain: /dauerablauf|kontinuierliche[rs]?\s+ablauf|schlauchanschluss|continuous\s+drain/i.test(text),
    laundryMode: /wäsche|waesche|laundry/i.test(text) || undefined,
    noiseDb,
    tankLiters,
    powerW,
  };
}

export function normalizeDehumidifier(row: RawFeedRow): DehumidifierCandidate {
  const named = productDisplayName(row, "Unbenannter Luftentfeuchter");
  const name = named.name;
  const merchantId = value(row, "merchant_id") ?? "unknown";
  const merchantName = value(row, "merchant_name") ?? "Unbekannter Händler";
  const merchantProductId = value(row, "merchant_product_id", "aw_product_id") ?? shortHash(name);
  const identity = productIdentity(row, merchantId, merchantProductId);
  const text = [name, value(row, "description"), value(row, "specifications"), value(row, "merchant_category")].filter(Boolean).join(" ");
  const attributes = parseDehumidifierAttributes(text);
  const sourceUpdatedAt = isoDate(value(row, "last_updated"));
  const candidateAttributes = { id: identity.id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, reviewed: false as const, dataQuality: "feed" as const, sourceUpdatedAt, ...attributes };
  const issues: string[] = [];
  if (!attributes.maxRecommendedAreaM2 && !attributes.maxRecommendedVolumeM3 && !attributes.extractionLPerDay) issues.push("missing-capacity");
  if (named.opaque) issues.push("unhelpful-product-name");
  if (!/dauerablauf|schlauchanschluss|continuous\s+drain|tank|behälter|behaelter/i.test(text)) issues.push("unconfirmed-drainage");
  const productResult = DehumidifierProductSchema.safeParse(candidateAttributes);
  if (!productResult.success) issues.push("incomplete-product-data");

  const affiliateUrl = value(row, "aw_deep_link");
  const currency = (value(row, "currency") ?? "EUR").toUpperCase();
  const priceEur = parsePrice(value(row, "search_price"));
  const stock = availability(row);
  if (!affiliateUrl?.startsWith("https://")) issues.push("missing-or-invalid-affiliate-link");
  if (currency !== "EUR") issues.push("non-eur-currency");
  if (!priceEur) issues.push("invalid-price");
  if (stock.ambiguous) issues.push("ambiguous-stock");
  const imageUrl = value(row, "large_image", "merchant_image_url");
  const offer: OfferBase | undefined = productResult.success && affiliateUrl?.startsWith("https://") && currency === "EUR" && priceEur ? {
    id: `offer:${slug(merchantId)}:${slug(merchantProductId)}`, productId: identity.id, merchantId, merchantName, merchantProductId, priceEur,
    ...delivery(value(row, "delivery_cost")), available: stock.available, affiliateUrl,
    imageUrl: imageUrl?.startsWith("https://") ? imageUrl : undefined, updatedAt: sourceUpdatedAt,
  } : undefined;
  return { id: identity.id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, candidateAttributes, product: productResult.success ? productResult.data : undefined, offer, merchantProductUrl: affiliateUrl, imageUrl, issues };
}
