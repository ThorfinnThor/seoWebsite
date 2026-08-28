import type { OfferBase } from "@/lib/catalog/types";
import { IrrigationProductSchema, type IrrigationProduct } from "@/lib/irrigation/types";
import { availability, delivery, isoDate, merchantDetails, parsePriceFromFields, productDisplayName, productIdentity, shortHash, slug, value } from "./garden-house-normalizer";
import { priceIssue } from "./price-normalizer";
import type { IrrigationCandidate, RawFeedRow } from "./types";
import { IRRIGATION_KIND_ORDER, irrigationKindNamePattern, irrigationSemanticIssues, isKnownIrrigationFalsePositive } from "@/scripts/catalog/semantic-validation";

const STRONG_CANDIDATE_PATTERN = /bewässer|bewaesser|tropf|regner|sprinkler|gartenschlauch|micro-?drip|pipeline|magnetventil|druckminder|bodenfeuchte|regensensor|water\s*control/i;
const COMPONENT_NAME_PATTERN = /ventil|sensor|filter|rohr|schlauch|verbinder|kupplung|t-stück|t-stueck|l-stück|l-stueck|anschluss|timer|steuer|controller|basisgerät|basisgeraet/i;
const IRRIGATION_CATEGORY_PATTERN = /bewässer|bewaesser|gartenbewässer|gartenbewaesser|micro-?drip|sprinkler/i;
const EXCLUDED_PATTERN = /aquarium|aquaristik|teich|pool|solardusche|dachrinne|cleansystem|dachfenster|wohndachfenster|fensterantrieb|rollladen|rolladen|roto\s+regensensor|therm\s*block|kompressor|heißluft|heissluft|terrassendach|vordach|zisterne|regenwassertank|\berdtank\b|\bflachtank\b|\btank\b|tauchpumpe|gartenpumpe|hauswasserwerk|oberflächenbürste|oberflaechenbuerste|reinigungsbürste|reinigungsbuerste|hochdruckreiniger/i;

export function isIrrigationCandidate(row: RawFeedRow): boolean {
  const nameAndType = [value(row, "product_name"), value(row, "product_type")].filter(Boolean).join(" ");
  const category = [value(row, "merchant_category"), value(row, "category_name"), value(row, "merchant_product_category_path")].filter(Boolean).join(" ");
  const decisiveText = `${nameAndType} ${category}`;
  if (EXCLUDED_PATTERN.test(decisiveText) || isKnownIrrigationFalsePositive(nameAndType)) return false;
  return STRONG_CANDIDATE_PATTERN.test(nameAndType)
    || (IRRIGATION_CATEGORY_PATTERN.test(category) && COMPONENT_NAME_PATTERN.test(nameAndType));
}

function decimal(raw?: string) { const parsed = raw ? Number(raw.replace(",", ".")) : NaN; return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined; }
function capture(text: string, pattern: RegExp) { return decimal(text.match(pattern)?.[1]); }

export function irrigationKind(name: string): IrrigationProduct["kind"] | undefined {
  if (isKnownIrrigationFalsePositive(name)) return undefined;
  for (const kind of IRRIGATION_KIND_ORDER) if (irrigationKindNamePattern(kind).test(name)) return kind;
  return undefined;
}

export function parseIrrigationAttributes(name: string, sourceText = name): Partial<IrrigationProduct> {
  const kind = irrigationKind(name);
  const text = `${name} ${sourceText}`;
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
  const attributes = parseIrrigationAttributes(name, text);
  const sourceUpdatedAt = isoDate(value(row, "last_updated"));
  const candidateAttributes = { id: identity.id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, reviewed: false as const, dataQuality: "feed" as const, sourceUpdatedAt, ...attributes };
  const issues: string[] = [];
  if (!attributes.kind) issues.push("missing-product-kind");
  if (named.opaque) issues.push("unhelpful-product-name");
  if (!attributes.systemId) issues.push("unconfirmed-system-compatibility");
  const productResult = IrrigationProductSchema.safeParse(candidateAttributes);
  if (!productResult.success) issues.push("incomplete-product-data");
  const semanticIssues = productResult.success ? irrigationSemanticIssues(productResult.data) : [];
  issues.push(...semanticIssues);
  const publishableProduct = productResult.success && semanticIssues.length === 0 ? productResult.data : undefined;

  const affiliateUrl = value(row, "aw_deep_link");
  const merchantUrl = value(row, "merchant_deep_link");
  const currency = (value(row, "currency") ?? "EUR").toUpperCase();
  const priceEur = parsePriceFromFields(value(row, "search_price"), value(row, "base_price"), value(row, "store_price"), value(row, "price"));
  const stock = availability(row);
  if (!affiliateUrl?.startsWith("https://")) issues.push("missing-or-invalid-affiliate-link");
  if (merchantUrl && !merchantUrl.startsWith("https://")) issues.push("missing-or-invalid-merchant-link");
  if (currency !== "EUR") issues.push("non-eur-currency");
  const offerPriceIssue = priceIssue("irrigation", priceEur);
  if (offerPriceIssue) issues.push(offerPriceIssue);
  if (stock.ambiguous) issues.push("ambiguous-stock");
  const imageUrl = value(row, "large_image", "merchant_image_url");
  const offer: OfferBase | undefined = publishableProduct && affiliateUrl?.startsWith("https://") && currency === "EUR" && priceEur && !offerPriceIssue ? {
    id: `offer:${slug(merchantId)}:${slug(merchantProductId)}`, productId: identity.id, merchantId, merchantName, merchantProductId, priceEur,
    ...delivery(value(row, "delivery_cost")), available: stock.available, affiliateUrl,
    ...(merchantUrl?.startsWith("https://") ? { merchantUrl } : {}),
    imageUrl: imageUrl?.startsWith("https://") ? imageUrl : undefined, updatedAt: sourceUpdatedAt, linkVerificationStatus: "unknown",
  } : undefined;
  return { id: identity.id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, candidateAttributes, product: publishableProduct, offer, merchantProductUrl: merchantUrl ?? affiliateUrl, imageUrl, issues };
}
