import type { OfferBase } from "@/lib/catalog/types";
import { ProjectProductSchema, type ProjectProduct, type ProjectProductKind, type ProjectVertical } from "@/lib/project-products/types";
import { availability, delivery, isoDate, merchantDetails, parsePriceFromFields, productDisplayName, productIdentity, shortHash, slug, value } from "./garden-house-normalizer";
import type { AffiliateCandidate, RawFeedRow } from "./types";

const PATTERNS: Array<{ vertical: ProjectVertical; pattern: RegExp }> = [
  { vertical: "carport", pattern: /carport|pkw[- ]?unterstand|stellplatzüberdachung|stellplatzueberdachung/i },
  { vertical: "greenhouse", pattern: /gewächshaus|gewaechshaus|folienhaus|greenhouse/i },
  { vertical: "terrace", pattern: /terrassendiele|terrassenholz|wpc[- ]?terrasse|terrassenlager|terrassenunterkonstruktion/i },
  { vertical: "privacy-screen", pattern: /sichtschutz|zaunelement|gartenzaun|sichtschutzzaun/i },
  { vertical: "drywall", pattern: /trockenbau|gipskarton|gipsfaser|cw[- ]?profil|uw[- ]?profil|fugenspachtel|trennwand/i },
];

export function projectVertical(text: string): ProjectVertical | undefined {
  return PATTERNS.find(({ pattern }) => pattern.test(text))?.vertical;
}

export function isProjectProductCandidate(row: RawFeedRow): boolean {
  // The product name is the only field reliable enough for cross-category
  // feeds. Category paths and descriptions often mention a project context
  // even when the item is an unrelated accessory (for example a gutter).
  return Boolean(projectVertical(value(row, "product_name", "product_title", "title") ?? ""));
}

function productKind(vertical: ProjectVertical, text: string): ProjectProductKind {
  if (vertical === "carport") {
    if (/rinne|fallrohr|entwässer|entwaesser/i.test(text)) return "drainage";
    if (/dach|polycarbonat|blechdach/i.test(text) && !/carport/i.test(text)) return "roof";
    if (/pfosten|träger|traeger|balken/i.test(text)) return "post";
    if (/anker|fundament|pfostenträger|pfostentraeger/i.test(text)) return "foundation";
    if (/wallbox|steckdose|elektro/i.test(text)) return "electric";
    return "kit";
  }
  if (vertical === "greenhouse") {
    if (/lüftungsautomat|lueftungsautomat|fensteröffner|fensteroeffner|fensterantrieb|öffner für dachfenster|oeffner fuer dachfenster/i.test(text)) return "ventilation";
    if (/bewässer|bewaesser|tropf/i.test(text)) return "irrigation";
    if (/tisch|regal|bank/i.test(text)) return "bench";
    if (/schatt|frostschutz/i.test(text)) return "shade";
    if (/fundament|basisrahmen|sockel/i.test(text)) return "base";
    return "kit";
  }
  if (vertical === "terrace") {
    if (/unterkonstruktion|terrassenlager|lagerholz/i.test(text)) return "substructure";
    if (/clip|schraub|befestiger/i.test(text)) return "fastening";
    if (/fundament|auflager|stelzlager/i.test(text)) return "foundation";
    if (/rand|abschluss|blende|profil/i.test(text)) return "bracket";
    return "decking";
  }
  if (vertical === "privacy-screen") {
    if (/pfosten|post/i.test(text)) return "post";
    if (/tor|pforte|beschlag/i.test(text)) return "gate";
    if (/anker|fundament|pfostenträger|pfostentraeger/i.test(text)) return "foundation";
    if (/kappe|abdeckung/i.test(text)) return "cap";
    if (/verbinder|halter|winkel|ausgleich/i.test(text)) return "bracket";
    return "panel";
  }
  if (/cw|uw|ständerprofil|staenderprofil|profil/i.test(text)) return "profile";
  if (/schraub|dübel|duebel|befest/i.test(text)) return "fastening";
  if (/spachtel|fugenband|bewehrung/i.test(text)) return "joint";
  if (/dämm|daemm|mineralwolle/i.test(text)) return "insulation";
  if (/dicht|anschluss|trennwandband/i.test(text)) return "sealing";
  return "board";
}

export function normalizeProjectProduct(row: RawFeedRow): AffiliateCandidate<ProjectProduct> | undefined {
  const named = productDisplayName(row, "Unbenanntes Projektprodukt");
  const name = named.name;
  const { merchantId, merchantName } = merchantDetails(row);
  const merchantProductId = value(row, "merchant_product_id", "aw_product_id") ?? shortHash(name);
  const identity = productIdentity(row, merchantId, merchantProductId);
  const text = [name, value(row, "description"), value(row, "specifications"), value(row, "merchant_category")].filter(Boolean).join(" ");
  const vertical = projectVertical(text);
  if (!vertical) return undefined;
  const kind = productKind(vertical, text);
  const sourceUpdatedAt = isoDate(value(row, "last_updated"));
  const candidateAttributes: Partial<ProjectProduct> = { id: identity.id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, vertical, kind, reviewed: false, dataQuality: "feed", sourceUpdatedAt };
  const issues: string[] = [];
  if (named.opaque) issues.push("unhelpful-product-name");
  const productResult = ProjectProductSchema.safeParse(candidateAttributes);
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
