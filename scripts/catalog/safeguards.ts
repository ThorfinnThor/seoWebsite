import { GardenHouseCatalogSchema, type GardenHouseCatalog } from "@/lib/garden-house/types";
import type { OfferBase, ProductBase, StaticCatalog } from "@/lib/catalog/types";
import { catalogPriceIssues } from "./price-safeguards";
import { irrigationSemanticIssues } from "./semantic-validation";
import { catalogDimensionIssues } from "./dimension-safeguards";

const MAX_CATALOG_BYTES = 2 * 1024 * 1024;

export function assertCatalogSafe(next: unknown, previous?: GardenHouseCatalog, configuredSecretUrls: string[] = []): GardenHouseCatalog {
  const catalog = GardenHouseCatalogSchema.parse(next);
  return assertCatalogPayloadSafe(catalog, previous, configuredSecretUrls);
}

export function assertCatalogPayloadSafe<T extends StaticCatalog<ProductBase, OfferBase>>(catalog: T, previous?: T, configuredSecretUrls: string[] = []): T {
  const serialized = JSON.stringify(catalog);
  if (Buffer.byteLength(serialized, "utf8") > MAX_CATALOG_BYTES) throw new Error("Catalog exceeds 2 MiB hard limit");
  for (const secret of configuredSecretUrls) {
    if (secret && serialized.includes(secret)) throw new Error("Generated catalog contains a configured feed URL");
  }
  if (/AWIN_FEED_URLS_JSON|(?:feed|password|api[_-]?key|token)=[^&"\s]+/i.test(serialized)) {
    throw new Error("Generated catalog contains secret-looking data");
  }
  const reviewed = catalog.products.filter((product) => product.reviewed).length;
  const previousReviewed = previous?.products.filter((product) => product.reviewed).length ?? 0;
  if (previousReviewed >= 10 && reviewed < previousReviewed * 0.8) throw new Error(`Reviewed products regressed from ${previousReviewed} to ${reviewed}`);
  const previousOffers = previous?.offers.length ?? 0;
  if (previousOffers >= 20 && catalog.offers.length < previousOffers * 0.6) throw new Error(`Offers regressed from ${previousOffers} to ${catalog.offers.length}`);
  const priceIssues = catalogPriceIssues(catalog);
  if (priceIssues.length) throw new Error(`Catalog contains ${priceIssues.length} suspicious price offer(s): ${priceIssues[0].offerId} (${priceIssues[0].detail})`);
  const dimensionIssues = catalogDimensionIssues(catalog);
  if (dimensionIssues.length) throw new Error(`Catalog contains ${dimensionIssues.length} suspicious dimension/capacity value(s): ${dimensionIssues[0].productId} (${dimensionIssues[0].detail})`);
  if (catalog.vertical === "irrigation") {
    const semanticMismatches = catalog.products.filter((product) => product.reviewed && "kind" in product && irrigationSemanticIssues(product as Parameters<typeof irrigationSemanticIssues>[0]).length > 0);
    if (semanticMismatches.length) throw new Error(`Reviewed irrigation products contain ${semanticMismatches.length} semantic mismatch(es): ${semanticMismatches[0].name}`);
  }
  return catalog;
}
