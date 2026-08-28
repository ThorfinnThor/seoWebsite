import type { OfferBase } from "@/lib/catalog/types";
import { IrrigationProductSchema, type IrrigationProduct } from "@/lib/irrigation/types";
import { availability, delivery, isoDate, merchantDetails, parsePriceFromFields, productDisplayName, productIdentity, shortHash, slug, value } from "./garden-house-normalizer";
import type { IrrigationCandidate, RawFeedRow } from "./types";

const CANDIDATE_PATTERN = /bewässer|bewaesser|tropf|regner|sprinkler|gartenschlauch|magnetventil|druckminder|bodenfeuchte|regensensor|bewässerungscomputer|bewaesserungscomputer/i;
const EXCLUDED_PATTERN = /dachfenster|wohndachfenster|fensterantrieb|rollladen|rolladen|roto\s+regensensor/i;

export function isIrrigationCandidate(row: RawFeedRow): boolean {
  const text = [value(row, "product_name"), value(row, "merchant_category"), value(row, "category_name"), value(row, "product_type"), value(row, "merchant_product_category_path"), value(row, "description")].filter(Boolean).join(" ");
  return CANDIDATE_PATTERN.test(text) && !EXCLUDED_PATTERN.test(text);
}

function decimal(raw?: string) { const parsed = raw ? Number(raw.replace(",", ".")) : NaN; return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined; }
function capture(text: string, pattern: RegExp) { return decimal(text.match(pattern)?.[1]); }

export function irrigationKind(text: string): IrrigationProduct["kind"] | undefined {
  if (/bewässerungscomputer|bewaesserungscomputer|steuergerät|steuergeraet|controller|timer/i.test(text)) return "controller";
  if (/magnetventil|bewässerungsventil|bewaesserungsventil/i.test(text)) return "valve";
  if (/druckminder|druckregler/i.test(text)) return "pressure-reducer";
  if (/filter/i.test(text)) return "filter";
  if (/regensensor|feuchtesensor|bodenfeuchte/i.test(text)) return "sensor";
  if (/tropfrohr|tropfschlauch|perlschlauch|dripline/i.test(text)) return "dripline";
  if (/regner|sprinkler/i.test(text)) return "sprinkler";
  if (/verbinder|kupplung|t-stück|t-stueck|anschlussstück|anschlussstueck/i.test(text)) return "connector";
  if (/bewässerungsrohr|bewaesserungsrohr|verlegerohr|gartenschlauch/i.test(text)) return "pipe";
  return undefined;
}

export function parseIrrigationAttributes(text: string): Partial<IrrigationProduct> {
  const kind = irrigationKind(text);
  const maxZones = capture(text, /\b(\d+)\s*(?:zonen|kreise|ausgänge|ausgaenge|wege)\b/i);
  const pipeDiameterMm = capture(text, /(?:ø|durchmesser|dn)?\s*(\d+(?:[.,]\d+)?)\s*mm\b/i);
  const driplineLengthM = kind === "dripline" || kind === "pipe" ? capture(text, /\b(\d+(?:[.,]\d+)?)\s*m(?:eter)?\b/i) : undefined;
  const systemId = text.match(/\b(?:system|serie|reihe)\s*[:\-]?\s*([a-z0-9][a-z0-9+._-]{1,30})/i)?.[1];
  return { kind, maxZones: maxZones ? Math.round(maxZones) : undefined, pipeDiameterMm, driplineLengthM, systemId, smartCompatible: /smart|app|wifi|wlan|bluetooth/i.test(text) || undefined };
}

export function normalizeIrrigation(row: RawFeedRow): IrrigationCandidate {
  const named = productDisplayName(row, "Unbenanntes Bewässerungsprodukt");
  const name = named.name;
  const { merchantId, merchantName } = merchantDetails(row);
  const merchantProductId = value(row, "merchant_product_id", "aw_product_id") ?? shortHash(name);
  const identity = productIdentity(row, merchantId, merchantProductId);
  const text = [name, value(row, "description"), value(row, "specifications"), value(row, "merchant_category")].filter(Boolean).join(" ");
  const attributes = parseIrrigationAttributes(text);
  const sourceUpdatedAt = isoDate(value(row, "last_updated"));
  const candidateAttributes = { id: identity.id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, reviewed: false as const, dataQuality: "feed" as const, sourceUpdatedAt, ...attributes };
  const issues: string[] = [];
  if (!attributes.kind) issues.push("missing-product-kind");
  if (named.opaque) issues.push("unhelpful-product-name");
  if (!attributes.systemId) issues.push("unconfirmed-system-compatibility");
  const productResult = IrrigationProductSchema.safeParse(candidateAttributes);
  if (!productResult.success) issues.push("incomplete-product-data");

  const affiliateUrl = value(row, "aw_deep_link");
  const merchantUrl = value(row, "merchant_deep_link");
  const currency = (value(row, "currency") ?? "EUR").toUpperCase();
  const priceEur = parsePriceFromFields(value(row, "search_price"), value(row, "base_price"), value(row, "store_price"), value(row, "price"));
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
