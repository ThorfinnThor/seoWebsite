import type { OfferBase, ProductBase, StaticCatalog } from "@/lib/catalog/types";

export function quantile(values: readonly number[], position: number): number | undefined {
  const sorted = values.filter(Number.isFinite).toSorted((a, b) => a - b);
  if (sorted.length === 0) return undefined;

  const index = (sorted.length - 1) * position;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
}

export function median(values: readonly number[]): number | undefined {
  return quantile(values, 0.5);
}

export function percent(part: number, total: number): number {
  return total > 0 ? (part / total) * 100 : 0;
}

export function countDistinct(values: readonly (string | undefined)[]): number {
  return new Set(values.filter((value): value is string => Boolean(value))).size;
}

export function bestAvailablePriceByProduct<TProduct extends ProductBase, TOffer extends OfferBase>(
  catalog: StaticCatalog<TProduct, TOffer>,
): ReadonlyMap<string, number> {
  const prices = new Map<string, number>();
  for (const offer of catalog.offers) {
    if (!offer.available) continue;
    const current = prices.get(offer.productId);
    if (current === undefined || offer.priceEur < current) prices.set(offer.productId, offer.priceEur);
  }
  return prices;
}

export function formatReportDate(value: string): string {
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Berlin" }).format(new Date(value));
}

export function rounded(value: number | undefined, digits = 0): number {
  if (value === undefined) return 0;
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
