import { createHash } from "node:crypto";
import type { GardenHouseCandidate, RawFeedRow } from "./types";

const CANDIDATE_PATTERN = /gartenhaus|gerätehaus|geraetehaus|gartenschuppen|geräteschuppen|geraeteschuppen|holzhaus|blockbohlenhaus/i;

export function value(row: RawFeedRow, ...keys: string[]): string | undefined {
  for (const key of keys) {
    const found = row[key] ?? row[Object.keys(row).find((rowKey) => rowKey.toLowerCase() === key.toLowerCase()) ?? ""];
    if (found?.trim()) return found.trim();
  }
  return undefined;
}

export function isGardenHouseCandidate(row: RawFeedRow): boolean {
  return CANDIDATE_PATTERN.test([
    value(row, "product_name"), value(row, "merchant_category"), value(row, "category_name"),
    value(row, "product_type"), value(row, "merchant_product_category_path"),
  ].filter(Boolean).join(" "));
}

export function parseDimensions(raw?: string): { widthCm: number; depthCm: number } | undefined {
  if (!raw) return undefined;
  const normalized = raw.toLowerCase().replace(/,/g, ".").replace(/×/g, "x");
  const matches = [...normalized.matchAll(/(\d+(?:\.\d+)?)\s*(mm|cm|m)?/g)];
  if (matches.length !== 2) return undefined;
  const explicitUnits = matches.map((match) => match[2]).filter(Boolean);
  const defaultUnit = explicitUnits.length === 1 ? explicitUnits[0] : explicitUnits.length === 2 && explicitUnits[0] === explicitUnits[1] ? explicitUnits[0] : undefined;
  const convert = (match: RegExpMatchArray): number | undefined => {
    const unit = match[2] ?? defaultUnit;
    if (!unit) return undefined;
    const numeric = Number(match[1]);
    return unit === "m" ? numeric * 100 : unit === "mm" ? numeric / 10 : numeric;
  };
  const widthCm = convert(matches[0]);
  const depthCm = convert(matches[1]);
  if (widthCm === undefined || depthCm === undefined || widthCm < 100 || depthCm < 100 || widthCm > 2000 || depthCm > 2000) return undefined;
  return { widthCm: Math.round(widthCm * 10) / 10, depthCm: Math.round(depthCm * 10) / 10 };
}

export function normalizeGtin(raw?: string): string | undefined {
  const digits = raw?.replace(/\D/g, "");
  return digits && digits.length >= 8 && digits.length <= 14 ? digits : undefined;
}

export function slug(raw: string): string { return raw.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60); }
export function shortHash(raw: string): string { return createHash("sha256").update(raw).digest("hex").slice(0, 12); }

export function productIdentity(row: RawFeedRow, merchantId: string, merchantProductId: string): { id: string; gtin?: string; mpn?: string; brand?: string } {
  const gtin = normalizeGtin(value(row, "product_GTIN", "ean", "gtin"));
  const brand = value(row, "brand_name", "brand");
  const mpn = value(row, "mpn", "model_number", "product_model");
  if (gtin) return { id: `gtin:${gtin}`, gtin, mpn, brand };
  if (brand && mpn) return { id: `mpn:${slug(brand)}:${slug(mpn)}`, mpn, brand };
  return { id: `merchant:${slug(merchantId)}:${slug(merchantProductId)}`, brand, mpn };
}

export function parsePrice(raw?: string): number | undefined {
  if (!raw) return undefined;
  const cleaned = raw.replace(/\s/g, "").replace(/\.(?=\d{3}(?:\D|$))/g, "").replace(",", ".").replace(/[^\d.-]/g, "");
  const price = Number(cleaned);
  return Number.isFinite(price) && price > 0 ? price : undefined;
}

function material(text: string): "wood" | "metal" | "plastic" | undefined {
  if (/holz|wood|blockbohle/i.test(text)) return "wood";
  if (/metall|stahl|aluminium|metal/i.test(text)) return "metal";
  if (/kunststoff|polypropylen|kunstharz|plastic|resin/i.test(text)) return "plastic";
  return undefined;
}

function roofType(text: string): "flat" | "pent" | "gable" | undefined {
  if (/pultdach|pent roof/i.test(text)) return "pent";
  if (/satteldach|gable/i.test(text)) return "gable";
  if (/flachdach|flat roof/i.test(text)) return "flat";
  return undefined;
}

export function availability(row: RawFeedRow): { available: boolean; ambiguous: boolean } {
  const statusValue = (raw?: string): boolean | undefined => {
    if (!raw?.trim()) return undefined;
    const normalized = raw.trim().toLowerCase();
    if (/out of stock|nicht verfügbar|nicht verfuegbar|ausverkauft|unavailable|false|^no$|^0$/.test(normalized)) return false;
    if (/in stock|auf lager|verfügbar|verfuegbar|available|true|^yes$/.test(normalized)) return true;
    if (/^\d+(?:[.,]\d+)?$/.test(normalized)) return Number(normalized.replace(",", ".")) > 0;
    return undefined;
  };
  const inStock = value(row, "in_stock");
  if (inStock) {
    const normalized = inStock.trim().toLowerCase();
    if (/out of stock|nicht verfügbar|nicht verfuegbar|ausverkauft|unavailable|false|^no$|^0$/.test(normalized)) return { available: false, ambiguous: false };
    if (statusValue(inStock) === true) return { available: true, ambiguous: false };
    // Awin's generic feed contract treats any non-empty in_stock value other
    // than 0 as in stock, even when an advertiser uses a custom text flag.
    return { available: true, ambiguous: false };
  }
  const explicitStatus = statusValue(value(row, "stock_status"));
  if (explicitStatus !== undefined) return { available: explicitStatus, ambiguous: false };
  const quantity = value(row, "stock_quantity");
  if (quantity && /^\d+(?:[.,]\d+)?$/.test(quantity.trim())) return { available: Number(quantity.replace(",", ".")) > 0, ambiguous: false };
  return { available: false, ambiguous: true };
}

export function delivery(raw?: string): { deliveryCostStatus: "known" | "free" | "unknown"; deliveryCostEur?: number } {
  if (!raw) return { deliveryCostStatus: "unknown" };
  if (/kostenlos|versandkostenfrei|free/i.test(raw) || /^\s*0(?:[,.]0+)?\s*(?:€|eur)?\s*$/i.test(raw)) return { deliveryCostStatus: "free", deliveryCostEur: 0 };
  const cost = parsePrice(raw);
  return cost === undefined ? { deliveryCostStatus: "unknown" } : { deliveryCostStatus: "known", deliveryCostEur: cost };
}

export function isoDate(raw?: string): string {
  const date = raw ? new Date(raw) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

export function normalizeGardenHouse(row: RawFeedRow): GardenHouseCandidate {
  const name = value(row, "product_name") ?? "Unbenanntes Gartenhaus";
  const merchantId = value(row, "merchant_id") ?? "unknown";
  const merchantName = value(row, "merchant_name") ?? "Unbekannter Händler";
  const merchantProductId = value(row, "merchant_product_id", "aw_product_id") ?? shortHash(name);
  const identity = productIdentity(row, merchantId, merchantProductId);
  const text = [name, value(row, "description"), value(row, "specifications"), value(row, "merchant_category")].filter(Boolean).join(" ");
  const dimensions = parseDimensions(value(row, "dimensions")) ?? parseDimensions(name);
  const productMaterial = material(text);
  const affiliateUrl = value(row, "aw_deep_link");
  const currency = (value(row, "currency") ?? "EUR").toUpperCase();
  const priceEur = parsePrice(value(row, "search_price"));
  const stock = availability(row);
  const issues: string[] = [];
  if (!dimensions) issues.push("missing-or-ambiguous-dimensions");
  if (!productMaterial) issues.push("missing-material");
  if (!affiliateUrl?.startsWith("https://")) issues.push("missing-or-invalid-affiliate-link");
  if (currency !== "EUR") issues.push("non-eur-currency");
  if (!priceEur) issues.push("invalid-price");
  if (stock.ambiguous) issues.push("ambiguous-stock");
  const sourceUpdatedAt = isoDate(value(row, "last_updated"));
  const candidateAttributes = {
    id: identity.id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn,
    reviewed: false as const, dataQuality: "feed" as const, sourceUpdatedAt,
    ...(dimensions ? { ...dimensions, footprintM2: Math.round((dimensions.widthCm * dimensions.depthCm) / 1000) / 10 } : {}),
    ...(productMaterial ? { material: productMaterial } : {}),
    roofType: roofType(text),
    floorIncluded: /boden (?:ist )?(?:im lieferumfang|enthalten)|inkl\.? boden/i.test(text) ? true : undefined,
    floorKitAvailable: /bodenset|boden separat|floor kit/i.test(text) ? true : undefined,
  };
  const product = dimensions && productMaterial ? candidateAttributes as GardenHouseCandidate["product"] : undefined;
  const deliveryInfo = delivery(value(row, "delivery_cost"));
  const imageUrl = value(row, "large_image", "merchant_image_url");
  const offer = product && affiliateUrl?.startsWith("https://") && currency === "EUR" && priceEur ? {
    id: `offer:${slug(merchantId)}:${slug(merchantProductId)}`,
    productId: identity.id,
    merchantId,
    merchantName,
    merchantProductId,
    priceEur,
    ...deliveryInfo,
    available: stock.available,
    affiliateUrl,
    imageUrl: imageUrl?.startsWith("https://") ? imageUrl : undefined,
    updatedAt: sourceUpdatedAt,
  } : undefined;
  return { id: identity.id, name, brand: identity.brand, gtin: identity.gtin, mpn: identity.mpn, candidateAttributes, product, offer, merchantProductUrl: affiliateUrl, imageUrl, issues };
}
