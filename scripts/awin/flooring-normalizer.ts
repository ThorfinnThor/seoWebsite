import type { OfferBase } from "@/lib/catalog/types";
import { FlooringProductSchema, type FlooringProduct } from "@/lib/flooring/types";
import { availability, delivery, isoDate, looksLikeInternalProductCode, parsePrice, productDisplayName, productIdentity, shortHash, slug, value } from "./garden-house-normalizer";
import type { AffiliateCandidate, RawFeedRow } from "./types";

const TYPE_PATTERN = /laminat|vinyl|lvt|rigid|parkett|parquet|bodenbelag|flooring/i;
const EXCLUDED_PATTERN = /wandpaneel|wandpaneele|dekorpaneel|dekorpaneele|wandschutz/i;
export type FlooringCandidate = AffiliateCandidate<FlooringProduct>;

export function isFlooringCandidate(row: RawFeedRow): boolean {
  const text = [value(row, "product_name"), value(row, "description"), value(row, "merchant_category"), value(row, "category_name"), value(row, "product_type"), value(row, "merchant_product_category_path")].filter(Boolean).join(" ");
  return TYPE_PATTERN.test(text) && !EXCLUDED_PATTERN.test(text);
}

function decimal(raw?: string) { const parsed = raw ? Number(raw.replace(",", ".")) : NaN; return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined; }
function capture(text: string, pattern: RegExp) { return decimal(text.match(pattern)?.[1]); }
function dimensionNumber(raw: string): number {
  // German product pages commonly write a 1,290 mm plank as "1.290 mm".
  // Treat a dot followed by exactly three digits as a thousands separator,
  // while preserving normal decimals such as 24.5 cm.
  const normalized = /^\d{1,3}\.\d{3}$/.test(raw) ? raw.replace(".", "") : raw.replace(",", ".");
  return Number(normalized);
}

export function parseFlooringAttributes(text: string): Partial<FlooringProduct> {
  const flooringType: FlooringProduct["flooringType"] = /parkett|parquet/i.test(text) ? "parquet-floating" : /vinyl|lvt|rigid/i.test(text) ? "vinyl-click" : "laminate";
  const glueIndex = text.search(/(?:klebe|adhesive)[- ]?vinyl|dryback|vollverkleb|zum kleben/i);
  const clickIndex = text.search(/klick|click|cpc|uniclic|automatic[- ]?click/i);
  const installation: FlooringProduct["installation"] = glueIndex >= 0 && (clickIndex < 0 || glueIndex < clickIndex) ? "glue" : clickIndex >= 0 ? "click" : "unknown";
  const packageCoverageM2 = capture(text, /(?:paketinhalt|paket|packung|karton)[\s\S]{0,100}?(\d+(?:[.,]\d+)?)\s*m(?:²|2)/i) ?? capture(text, /(\d+(?:[.,]\d+)?)\s*m(?:²|2)\s*(?:pro|je|per)\s*(?:paket|packung|karton)/i);
  const dimensions = text.match(/(\d{1,4}(?:[.,]\d+)?)\s*[x×]\s*(\d{1,4}(?:[.,]\d+)?)(?:\s*[x×]\s*(\d+(?:[.,]\d+)?))?\s*(mm|cm|m)/i);
  const dimensionFactor = dimensions?.[4]?.toLowerCase() === "m" ? 1000 : dimensions?.[4]?.toLowerCase() === "cm" ? 10 : 1;
  const plankLengthMm = dimensions ? dimensionNumber(dimensions[1]) * dimensionFactor : undefined;
  const plankWidthMm = dimensions ? dimensionNumber(dimensions[2]) * dimensionFactor : undefined;
  const thicknessMm = capture(text, /(?:st(?:ä|ae)rke|dicke)[^\d]{0,12}(\d+(?:[.,]\d+)?)\s*mm/i)
    ?? (dimensions?.[3] && dimensions[4]?.toLowerCase() === "mm" ? dimensionNumber(dimensions[3]) : undefined);
  const wearLayerMm = capture(text, /(?:nutzschicht|wear layer)[^\d]{0,12}(\d+(?:[.,]\d+)?)\s*mm/i);
  return {
    flooringType, installation, packageCoverageM2, plankLengthMm, plankWidthMm, thicknessMm, wearLayerMm,
    floorHeatingApproved: /fu(?:ß|ss)bodenheizung|fußbodenheizung|floor heating/i.test(text) || undefined,
    wetRoomApproved: /feuchtr(?:aum|äume|aeume)|nassr(?:aum|äume|aeume)|f(?:ü|ue)r\s+(?:bad|badezimmer)|wet\s*room|wasserfest|waterproof/i.test(text) || undefined,
  };
}

export function normalizeFlooring(row: RawFeedRow): FlooringCandidate {
  const named = productDisplayName(row, "Unbekannter Bodenbelag");
  const name = named.name;
  const merchantId = value(row, "merchant_id") ?? "unknown";
  const merchantName = value(row, "merchant_name") ?? "Unbekannter Händler";
  const merchantProductId = value(row, "merchant_product_id", "aw_product_id") ?? shortHash(name);
  const identity = productIdentity(row, merchantId, merchantProductId);
  const text = [name, value(row, "description"), value(row, "specifications"), value(row, "merchant_category"), value(row, "product_short_description")].filter(Boolean).join(" ");
  const attributes = parseFlooringAttributes(text);
  const sourceUpdatedAt = isoDate(value(row, "last_updated"));
  const candidateAttributes = { id: identity.id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, reviewed: false as const, dataQuality: "feed" as const, sourceUpdatedAt, ...attributes };
  const issues: string[] = [];
  if (!attributes.packageCoverageM2) issues.push("missing-package-coverage");
  if (!attributes.plankLengthMm || !attributes.plankWidthMm) issues.push("missing-plank-dimensions");
  if (attributes.installation === "unknown") issues.push("unknown-installation");
  if (looksLikeInternalProductCode(name) && !named.fallbackUsed) issues.push("unhelpful-product-name");
  const productResult = FlooringProductSchema.safeParse(candidateAttributes);
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
