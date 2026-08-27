import type { OfferBase } from "@/lib/catalog/types";
import { RobotMowerProductSchema, type RobotMowerProduct } from "@/lib/robot-mower/types";
import { availability, delivery, isoDate, parsePrice, productDisplayName, productIdentity, shortHash, slug, value } from "./garden-house-normalizer";
import type { AffiliateCandidate, RawFeedRow } from "./types";

const CANDIDATE_PATTERN = /m(?:ä|ae)hroboter|rasenroboter|mowing robot|robot mower|rasenm(?:ä|ae)her|\bgoat\b/i;
const EXCLUDED_PATTERN = /winbot|deebot|fenster|saugroboter|geschenkpaket|bundle|paket/i;
export type RobotMowerCandidate = AffiliateCandidate<RobotMowerProduct>;

export function isRobotMowerCandidate(row: RawFeedRow): boolean {
  const text = [value(row, "product_name"), value(row, "description"), value(row, "merchant_category"), value(row, "category_name"), value(row, "product_type"), value(row, "merchant_product_category_path")].filter(Boolean).join(" ");
  return CANDIDATE_PATTERN.test(text) && !EXCLUDED_PATTERN.test(text) && (/\bgoat\b/i.test(value(row, "merchant_category") ?? "") || /m(?:ä|ae)h|rasen|mowing|lawn/i.test(text));
}

function decimal(raw?: string) {
  if (!raw) return undefined;
  const normalized = raw.replace(/\s/g, "");
  const germanNumber = normalized.includes(",")
    ? normalized.replace(/\./g, "").replace(",", ".")
    : /^\d{1,3}(?:\.\d{3})+$/.test(normalized) ? normalized.replace(/\./g, "") : normalized;
  const parsed = Number(germanNumber);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}
function firstDecimal(text: string, pattern: RegExp) { return decimal(text.match(pattern)?.[1]); }

export function parseRobotMowerAttributes(text: string): Partial<RobotMowerProduct> {
  const slopePercent = firstDecimal(text, /(?:neigung|steigung|hang|slope)[^\d%]{0,30}(\d+(?:[.,]\d+)?)\s*%/i) ?? firstDecimal(text, /(\d+(?:[.,]\d+)?)\s*%\s*\([^)]*°/i);
  const degreeSlope = firstDecimal(text, /(?:neigung|steigung|hang|slope)[^\d°]{0,30}(\d+(?:[.,]\d+)?)\s*°/i);
  const maxSlopePercent = slopePercent ?? (degreeSlope === undefined ? undefined : Math.round(Math.tan((degreeSlope * Math.PI) / 180) * 1000) / 10);
  const passageM = firstDecimal(text, /(\d+(?:[.,]\d+)?)\s*m\s*(?:passierbarkeit|durchfahrt|passage)/i) ?? firstDecimal(text, /(?:passierbarkeit|durchfahrt|passage)[^\d]{0,8}(\d+(?:[.,]\d+)?)\s*m/i);
  const passageCm = firstDecimal(text, /(\d+(?:[.,]\d+)?)\s*cm\s*(?:passierbarkeit|durchfahrt|passage)/i) ?? firstDecimal(text, /(?:passierbarkeit|durchfahrt|passage)[^\d]{0,8}(\d+(?:[.,]\d+)?)\s*cm/i);
  const ratedAreaM2 = firstDecimal(text, /(?:für|f(?:u|ü)r|bis zu|max(?:imal)?)[^\d]{0,20}(\d+(?:[.,]\d+)?)\s*m(?:²|2)(?!\s*\/\s*h)/i);
  const cutting = text.match(/(?:schnitth(?:ö|oe)he|cut(?:ting)? height)[^\d]{0,20}(\d+(?:[.,]\d+)?)\s*(?:-|bis|–)\s*(\d+(?:[.,]\d+)?)\s*cm/i) ?? text.match(/(\d+(?:[.,]\d+)?)\s*(?:-|bis|–)\s*(\d+(?:[.,]\d+)?)\s*cm\s*(?:schnitth(?:ö|oe)he|cut(?:ting)? height)/i);
  const minCutHeightCm = decimal(cutting?.[1]);
  const maxCutHeightCm = decimal(cutting?.[2]);
  const navigation = /rtk/i.test(text) && /lidar/i.test(text) ? "hybrid" : /rtk/i.test(text) ? "rtk" : /lidar/i.test(text) ? "lidar" : /kamera|camera|vision/i.test(text) ? "camera" : /begrenzungsdraht|grenzdraht|boundary wire/i.test(text) ? "wire" : "unknown";
  const minPassageCm = passageCm ?? (passageM === undefined ? undefined : passageM * 100);
  return {
    ratedAreaM2, maxSlopePercent, minPassageCm: minPassageCm === undefined ? undefined : Math.round(minPassageCm * 10) / 10,
    navigation, minCutHeightCm, maxCutHeightCm,
    waterProtection: text.match(/\bIP\s*[A-Z]?\s*\d{1,2}\b/i)?.[0]?.toUpperCase(),
    obstacleDetection: /hinderniserkennung|obstacle avoidance|kollisionsschutz/i.test(text) || undefined,
  };
}

export function normalizeRobotMower(row: RawFeedRow): RobotMowerCandidate {
  const named = productDisplayName(row, "Unbenannter Mähroboter");
  const name = named.name;
  const merchantId = value(row, "merchant_id") ?? "unknown";
  const merchantName = value(row, "merchant_name") ?? "Unbekannter Händler";
  const merchantProductId = value(row, "merchant_product_id", "aw_product_id") ?? shortHash(name);
  const identity = productIdentity(row, merchantId, merchantProductId);
  const text = [name, value(row, "description"), value(row, "specifications"), value(row, "merchant_category"), value(row, "product_short_description")].filter(Boolean).join(" ");
  const attributes = parseRobotMowerAttributes(text);
  const sourceUpdatedAt = isoDate(value(row, "last_updated"));
  const candidateAttributes = { id: identity.id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, reviewed: false as const, dataQuality: "feed" as const, sourceUpdatedAt, navigation: "unknown" as const, ...attributes };
  const issues: string[] = [];
  if (!attributes.ratedAreaM2) issues.push("missing-rated-area");
  if (named.opaque) issues.push("unhelpful-product-name");
  if (!attributes.maxSlopePercent) issues.push("missing-or-ambiguous-slope");
  if (!attributes.minPassageCm) issues.push("missing-passage-width");
  if (attributes.navigation === "unknown") issues.push("unknown-navigation");
  const productResult = RobotMowerProductSchema.safeParse(candidateAttributes);
  if (!productResult.success) issues.push("incomplete-product-data");
  const affiliateUrl = value(row, "aw_deep_link");
  const merchantUrl = value(row, "merchant_deep_link");
  const currency = (value(row, "currency") ?? "EUR").toUpperCase();
  const priceEur = parsePrice(value(row, "search_price"));
  const stock = availability(row);
  if (!affiliateUrl?.startsWith("https://")) issues.push("missing-or-invalid-affiliate-link");
  if (merchantUrl && !merchantUrl.startsWith("https://")) issues.push("missing-or-invalid-merchant-link");
  if (currency !== "EUR") issues.push("non-eur-currency");
  if (!priceEur) issues.push("invalid-price");
  if (stock.ambiguous) issues.push("ambiguous-stock");
  const imageUrl = value(row, "large_image", "merchant_image_url");
  const offer: OfferBase | undefined = productResult.success && affiliateUrl?.startsWith("https://") && currency === "EUR" && priceEur ? {
    id: `offer:${slug(merchantId)}:${slug(merchantProductId)}`, productId: identity.id, merchantId, merchantName, merchantProductId, priceEur,
    ...delivery(value(row, "delivery_cost")), available: stock.available, affiliateUrl,
    ...(merchantUrl?.startsWith("https://") ? { merchantUrl } : {}),
    imageUrl: imageUrl?.startsWith("https://") ? imageUrl : undefined, updatedAt: sourceUpdatedAt,
  } : undefined;
  return { id: identity.id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, candidateAttributes, product: productResult.success ? productResult.data : undefined, offer, merchantProductUrl: merchantUrl ?? affiliateUrl, imageUrl, issues };
}
