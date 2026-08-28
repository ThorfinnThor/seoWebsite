export type CatalogVertical =
  | "garden-house"
  | "dehumidifier"
  | "irrigation"
  | "robot-mower"
  | "flooring"
  | "project-products";

export const PRICE_LIMITS: Record<CatalogVertical, { min: number; max: number }> = {
  "garden-house": { min: 50, max: 100_000 },
  dehumidifier: { min: 20, max: 5_000 },
  irrigation: { min: 0.5, max: 10_000 },
  "robot-mower": { min: 100, max: 15_000 },
  flooring: { min: 1, max: 10_000 },
  "project-products": { min: 0.5, max: 100_000 },
};

/**
 * Parses both German and international feed prices. Awin commonly emits
 * fixed-point values with four decimal places; those digits must not be
 * mistaken for a thousands group.
 */
export function parsePrice(raw?: string): number | undefined {
  if (!raw) return undefined;
  const cleaned = raw.trim().replace(/\s/g, "").replace(/[^\d,.-]/g, "");
  if (!cleaned || !/\d/.test(cleaned) || (cleaned.match(/-/g) ?? []).length > 1) return undefined;

  const sign = cleaned.startsWith("-") ? -1 : 1;
  const unsigned = cleaned.replace(/-/g, "");
  const comma = unsigned.lastIndexOf(",");
  const dot = unsigned.lastIndexOf(".");
  let normalized: string;

  if (comma >= 0 && dot >= 0) {
    const decimalSeparator = comma > dot ? "," : ".";
    const thousandsSeparator = decimalSeparator === "," ? "." : ",";
    normalized = unsigned.split(thousandsSeparator).join("");
    if (decimalSeparator === ",") normalized = normalized.replace(/,/g, ".");
  } else {
    const separator = comma >= 0 ? "," : dot >= 0 ? "." : undefined;
    if (!separator) {
      normalized = unsigned;
    } else {
      const parts = unsigned.split(separator);
      const fraction = parts.at(-1) ?? "";
      const looksLikeGroupedThousands = parts.length > 2 && parts.slice(1).every((part) => part.length === 3);
      const oneAmbiguousThousandsGroup = parts.length === 2 && fraction.length === 3 && parts[0].length <= 3 && !/^0+$/.test(fraction);
      if (looksLikeGroupedThousands || oneAmbiguousThousandsGroup || fraction.length > 4) {
        normalized = parts.join("");
      } else {
        normalized = `${parts.slice(0, -1).join("")}.${fraction}`;
      }
    }
  }

  const price = Number(normalized) * sign;
  if (!Number.isFinite(price) || price <= 0) return undefined;
  return Math.round(price * 10_000) / 10_000;
}

export function parsePriceFromFields(...rawValues: Array<string | undefined>): number | undefined {
  for (const raw of rawValues) {
    const price = parsePrice(raw);
    if (price !== undefined) return price;
  }
  return undefined;
}

export function priceIssue(vertical: CatalogVertical, price?: number): "invalid-price" | "suspicious-price" | undefined {
  if (price === undefined || !Number.isFinite(price) || price <= 0) return "invalid-price";
  const limits = PRICE_LIMITS[vertical];
  return price < limits.min || price > limits.max ? "suspicious-price" : undefined;
}
