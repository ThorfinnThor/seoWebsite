import type { OfferBase, ProductBase, StaticCatalog } from "@/lib/catalog/types";
import { PRICE_LIMITS, type CatalogVertical } from "@/scripts/awin/price-normalizer";

const supportedVerticals = new Set<CatalogVertical>(Object.keys(PRICE_LIMITS) as CatalogVertical[]);

export interface CatalogPriceIssue {
  code: "suspicious-price" | "price-outlier";
  offerId: string;
  productId: string;
  detail: string;
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

export function catalogPriceIssues<TProduct extends ProductBase, TOffer extends OfferBase>(catalog: StaticCatalog<TProduct, TOffer>): CatalogPriceIssue[] {
  const issues: CatalogPriceIssue[] = [];
  if (supportedVerticals.has(catalog.vertical as CatalogVertical)) {
    const limits = PRICE_LIMITS[catalog.vertical as CatalogVertical];
    for (const offer of catalog.offers) {
      if (offer.priceEur < limits.min || offer.priceEur > limits.max) {
        issues.push({ code: "suspicious-price", offerId: offer.id, productId: offer.productId, detail: `${offer.priceEur} EUR outside ${limits.min}-${limits.max} EUR` });
      }
    }
  }

  const gtinByProduct = new Map(catalog.products.filter((product) => product.gtin).map((product) => [product.id, product.gtin as string]));
  const offersByGtin = new Map<string, TOffer[]>();
  for (const offer of catalog.offers) {
    const gtin = gtinByProduct.get(offer.productId);
    if (gtin) offersByGtin.set(gtin, [...(offersByGtin.get(gtin) ?? []), offer]);
  }
  for (const offers of offersByGtin.values()) {
    if (offers.length < 2) continue;
    const prices = offers.map((offer) => offer.priceEur);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (max / min <= 10) continue;
    if (offers.length === 2) {
      for (const offer of offers) issues.push({ code: "price-outlier", offerId: offer.id, productId: offer.productId, detail: `two-offer price spread ${min}-${max} EUR exceeds factor 10` });
      continue;
    }
    const center = median(prices);
    for (const offer of offers) {
      if (offer.priceEur > center * 10 || offer.priceEur < center / 10) {
        issues.push({ code: "price-outlier", offerId: offer.id, productId: offer.productId, detail: `${offer.priceEur} EUR differs from median ${center} EUR by factor > 10` });
      }
    }
  }
  return issues;
}

export function quarantineSuspiciousCatalogOffers<T extends StaticCatalog<ProductBase, OfferBase>>(catalog: T): T {
  const blocked = new Set(catalogPriceIssues(catalog).map((issue) => issue.offerId));
  return blocked.size ? { ...catalog, offers: catalog.offers.filter((offer) => !blocked.has(offer.id)) } : catalog;
}
