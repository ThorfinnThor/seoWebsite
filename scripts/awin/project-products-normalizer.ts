import type { OfferBase } from "@/lib/catalog/types";
import { ProjectProductSchema, type ProjectProduct, type ProjectProductKind, type ProjectVertical } from "@/lib/project-products/types";
import { availability, delivery, isoDate, merchantDetails, parsePriceFromFields, productDisplayName, productIdentity, shortHash, slug, value } from "./garden-house-normalizer";
import { priceIssue } from "./price-normalizer";
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
  const name = value(row, "product_name", "product_title", "title") ?? "";
  const vertical = projectVertical(name);
  if (!vertical) return false;
  if (vertical === "greenhouse" && /ersatzdocht|gewächshausheizung|gewaechshausheizung|paraffinheizung/i.test(name)) return false;
  if (vertical === "drywall" && (/säge|saege|bohrer|schleifer|bit|fräs|fraes|lochrandsenker|tauchsäge|werkzeug|detektor|messgerät|messgeraet/i.test(name) || !/gipskartonplatte|gipsfaserplatte|rigipsplatte|trockenbauplatte|cw[- ]?profil|uw[- ]?profil|trockenbauprofil|fugenspachtel|fugenband|mineralwolle|trennwandband|trockenbauwand/i.test(name))) return false;
  return true;
}

export function projectProductKind(vertical: ProjectVertical, text: string): ProjectProductKind {
  if (vertical === "carport") {
    if (/seitenwand|rückwand|rueckwand|frontelement|wand\s+für|wand\s+fuer|tür\s+für\s+carport|tuer\s+fuer\s+carport/i.test(text)) return "panel";
    if (/rinne|fallrohr|entwässer|entwaesser/i.test(text)) return "drainage";
    if (/dach|polycarbonat|blechdach/i.test(text) && !/carport/i.test(text)) return "roof";
    if (/pfosten|träger|traeger|balken/i.test(text)) return "post";
    if (/anker|fundament|pfostenträger|pfostentraeger/i.test(text)) return "foundation";
    if (/wallbox|steckdose|elektro/i.test(text)) return "electric";
    if (/bogen|verbinder|halter|winkel/i.test(text)) return "bracket";
    return "kit";
  }
  if (vertical === "greenhouse") {
    if (/ersatzplane/i.test(text)) return "shade";
    if (/lüftungsautomat|lueftungsautomat|fensteröffner|fensteroeffner|fensterantrieb|öffner für dachfenster|oeffner fuer dachfenster|dachfenster/i.test(text)) return "ventilation";
    if (/bewässer|bewaesser|tropf/i.test(text)) return "irrigation";
    if (/tisch|regal|bank/i.test(text)) return "bench";
    if (/schatt|frostschutz/i.test(text)) return "shade";
    if (/fundament|basisrahmen|sockel/i.test(text) && !/gewächshaus|gewaechshaus|folienhaus|greenhouse/i.test(text)) return "base";
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

function decimal(raw: string): number { return Number(raw.replace(",", ".")); }
function unitFactor(unit: string): number { return unit.toLowerCase() === "m" ? 1000 : unit.toLowerCase() === "cm" ? 10 : 1; }

function standaloneDimensionMm(name: string): number | undefined {
  const withoutCrossDimensions = name.replace(/\d+(?:[.,]\d+)?\s*[x×]\s*\d+(?:[.,]\d+)?(?:\s*[x×]\s*\d+(?:[.,]\d+)?)?\s*(?:mm|cm|m)\b/gi, " ");
  const match = withoutCrossDimensions.match(/\b(\d+(?:[.,]\d+)?)\s*(mm|cm|m)\b/i);
  if (!match) return undefined;
  const valueMm = decimal(match[1]) * unitFactor(match[2]);
  return valueMm >= 500 && valueMm <= 20_000 ? valueMm : undefined;
}

function dimensions(name: string): { valuesMm: number[]; unit: string } | undefined {
  const triple = name.match(/(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)\s*(mm|cm|m)\b/i);
  if (triple) return { valuesMm: [decimal(triple[1]), decimal(triple[2]), decimal(triple[3])].map((value) => value * unitFactor(triple[4])), unit: triple[4] };
  const pair = name.match(/(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)\s*(mm|cm|m)\b/i);
  if (pair) return { valuesMm: [decimal(pair[1]), decimal(pair[2])].map((value) => value * unitFactor(pair[3])), unit: pair[3] };
  return undefined;
}

export function parseProjectProductAttributes(vertical: ProjectVertical, kind: ProjectProductKind, name: string): Partial<ProjectProduct> {
  const parsed = dimensions(name);
  const pieces = name.match(/\b(\d+)\s*(?:st\.?|stück)\b/i)?.[1];
  const attributes: Partial<ProjectProduct> = { piecesPerPack: pieces ? Number(pieces) : undefined };

  if (vertical === "terrace" && kind === "decking") {
    if (parsed?.valuesMm.length === 3) {
      const sorted = [...parsed.valuesMm].sort((a, b) => a - b);
      attributes.boardThicknessMm = sorted[0];
      attributes.boardWidthMm = sorted[1];
      attributes.boardLengthMm = sorted[2];
    }
    else if (parsed?.valuesMm.length === 2 && parsed.unit.toLowerCase() === "mm" && Math.max(...parsed.valuesMm) < 500) {
      attributes.boardThicknessMm = Math.min(...parsed.valuesMm);
      attributes.boardWidthMm = Math.max(...parsed.valuesMm);
      attributes.boardLengthMm = standaloneDimensionMm(name);
    }
    attributes.material = /\bwpc\b/i.test(name) ? "wpc" : /douglasie|kiefer|lärche|laerche|bangkirai|cumaru|garapa|massaranduba|ip[eé]|bambus|holz/i.test(name) ? "wood" : /verbund|composite/i.test(name) ? "composite" : undefined;
  }

  if (vertical === "privacy-screen" && kind === "panel" && parsed?.valuesMm.length === 2) {
    const firstCm = parsed.valuesMm[0] / 10;
    const secondCm = parsed.valuesMm[1] / 10;
    const heightFirst = firstCm >= 60 && firstCm <= 250 && secondCm > 250;
    attributes.panelWidthCm = heightFirst ? secondCm : firstCm;
    attributes.panelHeightCm = heightFirst ? firstCm : secondCm;
  }

  if (vertical === "drywall" && kind === "board") {
    if (parsed?.valuesMm.length === 2) [attributes.boardLengthMm, attributes.boardWidthMm] = parsed.valuesMm;
    const thickness = [...name.matchAll(/\b(\d+(?:[.,]\d+)?)\s*mm\b/gi)].map((match) => decimal(match[1])).find((value) => value >= 5 && value <= 100);
    if (thickness) attributes.boardThicknessMm = thickness;
    attributes.boardType = /gkbi|feuchtraum|imprägniert|impraegniert/i.test(name) ? "moisture" : /gkf|rf\b|feuer|schallschutz/i.test(name) ? "fire-acoustic" : /gipsfaser|fermacell|rigidur/i.test(name) ? "gypsum-fiber" : "standard";
    attributes.moistureApproved = attributes.boardType === "moisture" || undefined;
    attributes.material = attributes.boardType === "gypsum-fiber" ? "gypsum-fiber" : "gypsum";
  }
  if (vertical === "drywall" && kind === "profile") {
    attributes.profileType = /\bcw\b/i.test(name) ? "cw" : /\buw\b/i.test(name) ? "uw" : "other";
    attributes.profileLengthMm = decimal(name.match(/\b(\d{4})\s*mm\b/i)?.[1] ?? "0") || undefined;
    attributes.profileWidthMm = decimal(name.match(/\b(\d{2,3})\s*x\s*\d{2,3}\s*mm\b/i)?.[1] ?? "0") || undefined;
  }

  if ((vertical === "greenhouse" || vertical === "carport") && kind === "kit" && parsed?.valuesMm.length === 2 && parsed.valuesMm.every((value) => value >= 1000)) {
    attributes.externalWidthM = parsed.valuesMm[0] / 1000;
    attributes.externalLengthM = parsed.valuesMm[1] / 1000;
    attributes.completeKit = true;
  }
  if (vertical === "greenhouse") {
    attributes.glazingType = /esg/i.test(name) && /hkp/i.test(name) ? "mixed" : /esg|glas/i.test(name) ? "glass" : /hkp|polycarbonat/i.test(name) ? "polycarbonate" : /folie/i.test(name) ? "foil" : undefined;
    const roofVents = name.match(/\b(\d+)\s*(?:dachfenster|lüftungsfenster|lueftungsfenster)\b/i)?.[1];
    if (roofVents) attributes.roofVentCount = Number(roofVents);
  }
  if (vertical === "carport" && kind === "kit") {
    attributes.vehicleCount = /doppel|double|2\s*(?:pkw|fahrzeug)/i.test(name) ? 2 : 1;
    attributes.roofType = /sattel|apex/i.test(name) ? "gable" : /pult/i.test(name) ? "mono-pitch" : /flach/i.test(name) ? "flat" : undefined;
    attributes.installationType = /anlehn|wand|attached/i.test(name) ? "attached" : undefined;
  }
  return Object.fromEntries(Object.entries(attributes).filter(([, value]) => value !== undefined));
}

export function normalizeProjectProduct(row: RawFeedRow): AffiliateCandidate<ProjectProduct> | undefined {
  const named = productDisplayName(row, "Unbenanntes Projektprodukt");
  const name = named.name;
  const { merchantId, merchantName } = merchantDetails(row);
  const merchantProductId = value(row, "merchant_product_id", "aw_product_id") ?? shortHash(name);
  const identity = productIdentity(row, merchantId, merchantProductId);
  const text = [name, value(row, "description"), value(row, "specifications"), value(row, "merchant_category")].filter(Boolean).join(" ");
  const vertical = projectVertical(name);
  if (!vertical) return undefined;
  // Feeds occasionally reuse a GTIN for variant rows. Keep the merchant's
  // product key in the identity so one malformed duplicate cannot overwrite
  // another product's project metadata during catalog assembly.
  const id = `project:${vertical}:${slug(merchantId)}:${slug(merchantProductId)}`;
  // Use the product name for the component kind as well. Descriptions often
  // list compatible accessories and would otherwise turn a complete kit into
  // a gutter, bracket or fastening item.
  const kind = projectProductKind(vertical, name);
  const sourceUpdatedAt = isoDate(value(row, "last_updated"));
  const candidateAttributes: Partial<ProjectProduct> = { id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, vertical, kind, reviewed: false, dataQuality: "feed", sourceUpdatedAt, ...parseProjectProductAttributes(vertical, kind, name) };
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
  const offerPriceIssue = priceIssue("project-products", priceEur);
  if (offerPriceIssue) issues.push(offerPriceIssue);
  if (stock.ambiguous) issues.push("ambiguous-stock");
  const imageUrl = value(row, "large_image", "merchant_image_url");
  const offer: OfferBase | undefined = productResult.success && affiliateUrl?.startsWith("https://") && currency === "EUR" && priceEur && !offerPriceIssue ? {
    id: `offer:${slug(merchantId)}:${slug(merchantProductId)}:${slug(vertical)}`, productId: id, merchantId, merchantName, merchantProductId, priceEur,
    ...delivery(value(row, "delivery_cost")), available: stock.available, affiliateUrl,
    ...(merchantUrl?.startsWith("https://") ? { merchantUrl } : {}),
    imageUrl: imageUrl?.startsWith("https://") ? imageUrl : undefined, updatedAt: sourceUpdatedAt, linkVerificationStatus: "unknown",
  } : undefined;
  return { id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, candidateAttributes, product: productResult.success ? productResult.data : undefined, offer, merchantProductUrl: merchantUrl ?? affiliateUrl, imageUrl, issues };
}
