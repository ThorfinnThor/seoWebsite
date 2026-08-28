import { readFile } from "node:fs/promises";
import path from "node:path";
import type { LinkVerificationStatus, OfferBase, ProductBase, StaticCatalog } from "@/lib/catalog/types";
import { writeFilesAtomically } from "./write-atomic";

const CATALOG_FILES = ["garden-house", "dehumidifier", "irrigation", "robot-mower", "flooring", "project-products"].map((vertical) => `public/data/${vertical}/catalog.json`);
type Fetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export async function verifyOfferLink(offer: OfferBase, product: ProductBase, fetcher: Fetcher = fetch): Promise<LinkVerificationStatus> {
  const target = offer.affiliateUrl;
  try {
    const response = await fetcher(target, { method: "GET", redirect: "follow", headers: { "user-agent": "PassendPlanen-Linkcheck/1.0 (+https://www.passendplanen.de/)" }, signal: AbortSignal.timeout(12_000) });
    if (response.status === 404 || response.status === 410) return "not-found";
    if ([401, 403, 429].includes(response.status)) return "blocked";
    if (!response.ok) return "unknown";
    const finalUrl = response.url || target;
    if (offer.merchantUrl && response.url && !sameMerchantHost(finalUrl, offer.merchantUrl)) return "identity-mismatch";
    const contentType = response.headers.get("content-type") ?? "";
    const body = /html|text|json/i.test(contentType) ? (await response.text()).slice(0, 500_000).toLowerCase() : "";
    const haystack = `${finalUrl} ${body}`.toLowerCase();
    if (identityConfirmed(product, offer, haystack)) return "verified";
    return finalUrl !== target ? "redirect-ok" : "unknown";
  } catch (error) {
    return error instanceof Error && /abort|timeout|certificate|issuer/i.test(error.name + error.message + String((error as Error & { cause?: unknown }).cause ?? "")) ? "blocked" : "unknown";
  }
}

export function applyLinkVerification(offer: OfferBase, status: LinkVerificationStatus, checkedAt: string): OfferBase | undefined {
  if (status === "not-found" || status === "identity-mismatch") return undefined;
  return { ...offer, linkVerificationStatus: status, linkVerifiedAt: checkedAt };
}

function identityConfirmed(product: ProductBase, offer: OfferBase, haystack: string): boolean {
  const strongIds = [product.gtin, product.mpn, offer.merchantProductId].filter((value): value is string => Boolean(value && value.length >= 5));
  if (strongIds.some((value) => haystack.includes(value.toLowerCase()))) return true;
  const nameTokens = product.name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9äöüß]+/g, " ").split(/\s+/).filter((token) => token.length >= 5);
  return nameTokens.filter((token) => haystack.includes(token)).length >= Math.min(2, nameTokens.length);
}

function sameMerchantHost(actual: string, expected: string): boolean {
  const a = new URL(actual).hostname.replace(/^www\./, "");
  const b = new URL(expected).hostname.replace(/^www\./, "");
  return a === b || a.endsWith(`.${b}`) || b.endsWith(`.${a}`);
}

async function run(): Promise<void> {
  const write = process.argv.includes("--write");
  const limitArg = process.argv.find((argument) => argument.startsWith("--limit="));
  const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
  const files: Record<string, unknown> = {};
  const totals: Record<LinkVerificationStatus, number> = { verified: 0, "redirect-ok": 0, "identity-mismatch": 0, "not-found": 0, blocked: 0, unknown: 0 };
  const loaded: Array<{ file: string; catalog: StaticCatalog<ProductBase, OfferBase>; products: Map<string, ProductBase> }> = [];
  for (const file of CATALOG_FILES) {
    const absolute = path.join(process.cwd(), file);
    const catalog = JSON.parse(await readFile(absolute, "utf8")) as StaticCatalog<ProductBase, OfferBase>;
    loaded.push({ file, catalog, products: new Map(catalog.products.map((product) => [product.id, product])) });
  }
  const tasks = loaded.flatMap(({ file, catalog, products }) => catalog.offers.map((offer, index) => ({ file, index, offer, product: products.get(offer.productId) })).filter((task) => task.product)).slice(0, limit);
  const checkedAt = new Date().toISOString();
  const results = await concurrentMap(tasks, 8, async (task) => ({ key: `${task.file}:${task.index}`, status: await verifyOfferLink(task.offer, task.product!) }));
  const statusByKey = new Map(results.map((result) => [result.key, result.status]));
  for (const result of results) totals[result.status] += 1;
  for (const { file, catalog } of loaded) {
    const offers = catalog.offers.flatMap((offer, index) => {
      const status = statusByKey.get(`${file}:${index}`);
      return status ? [applyLinkVerification(offer, status, checkedAt)] : [offer];
    }).filter((offer): offer is OfferBase => Boolean(offer));
    if (write) {
      files[file] = { ...catalog, offers };
      const reportFile = file.replace(/catalog\.json$/, "feed-report.json");
      const report = JSON.parse(await readFile(path.join(process.cwd(), reportFile), "utf8")) as Record<string, unknown>;
      const linkVerification: Record<string, number> = {};
      for (const offer of offers) {
        const status = offer.linkVerificationStatus ?? "unknown";
        linkVerification[status] = (linkVerification[status] ?? 0) + 1;
      }
      files[reportFile] = { ...report, linkVerification: Object.fromEntries(Object.entries(linkVerification).sort(([a], [b]) => a.localeCompare(b))) };
    }
  }
  if (write && Object.keys(files).length) await writeFilesAtomically(files);
  const checked = tasks.length;
  const invalid = totals["identity-mismatch"] + totals["not-found"];
  if (checked > 0 && invalid / checked > 0.05) console.warn(`Warning: ${Math.round((invalid / checked) * 1000) / 10}% of checked offers have invalid targets.`);
  console.log(JSON.stringify({ checked, write, statuses: totals }, null, 2));
}

async function concurrentMap<T, R>(items: T[], concurrency: number, mapper: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextIndex = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await mapper(items[index]);
    }
  }));
  return results;
}

if (import.meta.url === `file://${process.argv[1]}`) run().catch((error) => { console.error(error); process.exitCode = 1; });
