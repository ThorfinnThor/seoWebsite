import type { OfferBase } from "@/lib/catalog/types";
import { SecurityCameraProductSchema, type SecurityCameraProduct } from "@/lib/security-camera/types";
import { availability, delivery, isoDate, merchantDetails, parsePriceFromFields, productDisplayName, productIdentity, shortHash, slug, value } from "./garden-house-normalizer";
import { priceIssue } from "./price-normalizer";
import type { AffiliateCandidate, RawFeedRow } from "./types";

const CAMERA_PATTERN = /(?:überwachungs|sicherheits|außen|innen|outdoor|indoor|spotlight|floodlight|wall.?light|solo)?\s*(?:kamera|camera)|\beufycam\b|\bsolocam\b/i;
const EXCLUDED_PATTERN = /türklingel|doorbell|intercom|türgong|chime|homebase(?![^\n]{0,30}(?:kamera|camera))|smarthub(?![^\n]{0,30}(?:kamera|camera))|halterung|\bmount\b|ersatz|battery pack|solarpanel\s+(?:für|kompatibel)|solar panel\s+(?:for|für)|schutzglas|\bcover\b|gehäuse|\bcase\b|dummy/i;

export type SecurityCameraCandidate = AffiliateCandidate<SecurityCameraProduct>;

export function isSecurityCameraCandidate(row: RawFeedRow): boolean {
  const name = value(row, "product_name", "aw_product_name", "title") ?? "";
  return CAMERA_PATTERN.test(name) && !EXCLUDED_PATTERN.test(name);
}

export function parseSecurityCameraAttributes(text: string): Partial<SecurityCameraProduct> {
  const placement = /innenkamera|indoor(?:\s+cam|\s+kamera)|indoor cam/i.test(text) ? "indoor" : /außenkamera|aussenkamera|outdoor|solocam|spotlight|floodlight|wall.?light|\beufycam\b/i.test(text) ? "outdoor" : undefined;
  const connection = /\bpoe\b/i.test(text) ? "poe" : /\b4g\b|\blte\b|mobilfunk/i.test(text) ? "cellular" : /wlan|wi[ -]?fi/i.test(text) ? "wifi" : undefined;
  const power = /solar/i.test(text) ? "solar" : /akku|battery|kabellos/i.test(text) ? "battery" : /\bpoe\b/i.test(text) ? "poe" : /plug[ -]?in|kabelgebunden|festverdrahtet|wired/i.test(text) ? "mains" : undefined;
  const resolution = /\b4k\b/i.test(text) ? "4k" : /\b3k\b/i.test(text) ? "3k" : /\b2k\b/i.test(text) ? "2k" : /full[ -]?hd|1080p|\bhd\b/i.test(text) ? "hd" : undefined;
  const explicitCameraCount = text.match(/\b(\d{1,2})(?:er)?[ -]?(?:kamera(?:set)?|kameras|camera(?:s| set)?)/i)?.[1];
  const genericSetCount = text.match(/\b(\d{1,2})er[ -]?set\b/i)?.[1];
  const cameraCount = Math.min(20, Math.max(1, Number(explicitCameraCount ?? genericSetCount ?? 1)));
  return {
    placement,
    connection,
    power,
    resolution,
    cameraCount,
    panTilt: /schwenk|neige|pan[ -]?tilt|\bptz\b/i.test(text),
    integratedLight: /spotlight|floodlight|wall.?light|kamera mit licht|camera with light/i.test(text),
  };
}

export function normalizeSecurityCamera(row: RawFeedRow): SecurityCameraCandidate {
  const named = productDisplayName(row, "Unbenannte Sicherheitskamera");
  const name = named.name;
  const { merchantId, merchantName } = merchantDetails(row);
  const merchantProductId = value(row, "merchant_product_id", "aw_product_id") ?? shortHash(name);
  const identity = productIdentity(row, merchantId, merchantProductId);
  const text = [name, value(row, "description"), value(row, "specifications"), value(row, "merchant_category"), value(row, "product_short_description")].filter(Boolean).join(" ");
  const attributes = parseSecurityCameraAttributes(text);
  const sourceUpdatedAt = isoDate(value(row, "last_updated"));
  const candidateAttributes = { id: identity.id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, reviewed: false as const, dataQuality: "feed" as const, sourceUpdatedAt, ...attributes };
  const issues: string[] = [];
  if (!attributes.placement) issues.push("missing-placement");
  if (!attributes.connection) issues.push("missing-connection");
  if (!attributes.power) issues.push("missing-power-source");
  if (!attributes.resolution) issues.push("missing-resolution");
  if (named.opaque) issues.push("unhelpful-product-name");
  const productResult = SecurityCameraProductSchema.safeParse(candidateAttributes);
  if (!productResult.success) issues.push("incomplete-product-data");

  const affiliateUrl = value(row, "aw_deep_link");
  const merchantUrl = value(row, "merchant_deep_link");
  const currency = (value(row, "currency") ?? "EUR").toUpperCase();
  const priceEur = parsePriceFromFields(value(row, "search_price"), value(row, "base_price"), value(row, "store_price"), value(row, "price"));
  const stock = availability(row);
  if (!affiliateUrl?.startsWith("https://")) issues.push("missing-or-invalid-affiliate-link");
  if (merchantUrl && !merchantUrl.startsWith("https://")) issues.push("missing-or-invalid-merchant-link");
  if (currency !== "EUR") issues.push("non-eur-currency");
  const offerPriceIssue = priceIssue("security-camera", priceEur);
  if (offerPriceIssue) issues.push(offerPriceIssue);
  if (stock.ambiguous) issues.push("ambiguous-stock");
  const imageUrl = value(row, "large_image", "merchant_image_url");
  const offer: OfferBase | undefined = productResult.success && affiliateUrl?.startsWith("https://") && currency === "EUR" && priceEur && !offerPriceIssue ? {
    id: `offer:${slug(merchantId)}:${slug(merchantProductId)}`, productId: identity.id, merchantId, merchantName, merchantProductId, priceEur,
    ...delivery(value(row, "delivery_cost")), available: stock.available, affiliateUrl,
    ...(merchantUrl?.startsWith("https://") ? { merchantUrl } : {}),
    imageUrl: imageUrl?.startsWith("https://") ? imageUrl : undefined, updatedAt: sourceUpdatedAt, linkVerificationStatus: "unknown",
  } : undefined;
  return { id: identity.id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, candidateAttributes, product: productResult.success ? productResult.data : undefined, offer, merchantProductUrl: merchantUrl ?? affiliateUrl, imageUrl, issues };
}
