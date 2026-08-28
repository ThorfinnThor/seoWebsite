import { readFile } from "node:fs/promises";
import path from "node:path";

type ReviewProduct = { id: string; name?: string; offerCount?: number; minBasePriceEur?: number; issues?: string[] };
type ReviewQueue = { products?: ReviewProduct[] };
type Catalog = { products?: unknown[]; offers?: unknown[] };
type MerchantConfig = { merchants?: Array<{ name: string; applicationStatus: string; enabled: boolean; verticals: string[] }> };

async function json<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(path.resolve(file), "utf8")) as T;
}

const verticals = ["garden-house", "dehumidifier", "irrigation", "robot-mower", "flooring"] as const;
function isLikelyMatch(vertical: typeof verticals[number], product: ReviewProduct): boolean {
  if (vertical !== "garden-house") return true;
  const name = product.name ?? "";
  return /gartenhaus|gerätehaus|geraetehaus|gartenschuppen|geräteschuppen|geraeteschuppen|holzhaus|blockbohlenhaus/i.test(name)
    && !/fußboden|fussboden|bodenplatte|boden|floor/i.test(name);
}

function prioritize(vertical: typeof verticals[number], products: ReviewProduct[]): ReviewProduct[] {
  const relevant = products.filter((product) => isLikelyMatch(vertical, product));
  return relevant.sort((a, b) =>
    (a.issues?.length ?? 0) - (b.issues?.length ?? 0)
    || (b.offerCount ?? 0) - (a.offerCount ?? 0)
    || (a.minBasePriceEur ?? Number.POSITIVE_INFINITY) - (b.minBasePriceEur ?? Number.POSITIVE_INFINITY)
    || a.id.localeCompare(b.id),
  );
}
console.log("\nPassendPlanen Affiliate-Review\n");
for (const vertical of verticals) {
  const review = await json<ReviewQueue>(`data/review/${vertical}.json`);
  const catalog = await json<Catalog>(`public/data/${vertical}/catalog.json`);
  const products = review.products ?? [];
  const prioritized = prioritize(vertical, products);
  console.log(`${vertical}: ${products.length} Kandidaten, ${catalog.products?.length ?? 0} geprüfte Produkte, ${catalog.offers?.length ?? 0} öffentliche Angebote`);
  for (const product of prioritized.slice(0, 5)) console.log(`  - ${product.id}: ${product.name ?? "ohne Namen"} · ${product.offerCount ?? 0} Angebote · ${(product.issues ?? []).join(", ") || "keine Parser-Hinweise"}`);
  if (products.length > 5) console.log(`  … ${products.length - 5} weitere Kandidaten`);
}

const merchants = await json<MerchantConfig>("data/manual/merchants.json");
const statuses = new Map<string, number>();
for (const merchant of merchants.merchants ?? []) statuses.set(merchant.applicationStatus, (statuses.get(merchant.applicationStatus) ?? 0) + 1);
console.log(`\nAwin-Programme: ${[...statuses.entries()].map(([status, count]) => `${count} ${status}`).join(", ") || "keine"}`);
console.log("Freigabe-Regel: Vollständige Feed-Produkte mit gültigem Angebot werden automatisch als mixed veröffentlicht; Kandidaten mit Parser-Hinweisen benötigen weiterhin einen Override.\n");
