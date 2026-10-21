/**
 * Internal link graph audit against the static export in `out/`.
 *
 * Counts contextual inbound links (links inside <main>, excluding header and
 * footer navigation) for every sitemap URL, coming only from other indexable
 * pages. Reports orphans (0 inbound), weakly linked pages and contextual links
 * that point to noindex pages.
 *
 * Usage:
 *   npm run audit:links            # report, fail on sitemap orphans
 *   npm run audit:links -- --weak=3 # change weak threshold (default 3)
 *   npm run audit:links -- --verbose
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { ALL_SITEMAP_ENTRIES } from "@/lib/sitemap-entries";
import { SITE } from "@/lib/site";

const OUT_DIR = path.resolve("out");
const SITE_URL = SITE.url.replace(/\/$/, "");
const weakArg = process.argv.find((arg) => arg.startsWith("--weak="));
const WEAK_THRESHOLD = weakArg ? Number(weakArg.split("=")[1]) : 3;
const VERBOSE = process.argv.includes("--verbose");

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory);
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry);
    return (await stat(fullPath)).isDirectory() ? walk(fullPath) : [fullPath];
  }));
  return nested.flat();
}

function routeFromFile(file: string) {
  const relative = path.relative(OUT_DIR, file).replaceAll(path.sep, "/");
  return relative === "index.html" ? "/" : `/${relative.replace(/index\.html$/, "")}`;
}

function normalizeHref(href: string) {
  const clean = href.split(/[?#]/)[0];
  if (!clean.startsWith("/") || clean.startsWith("//")) return undefined;
  if (/\.[a-z0-9]+$/i.test(clean)) return undefined;
  return clean.endsWith("/") ? clean : `${clean}/`;
}

function mainContent(html: string) {
  const start = html.indexOf("<main");
  const end = html.lastIndexOf("</main>");
  return start >= 0 && end > start ? html.slice(start, end) : html;
}

const files = (await walk(OUT_DIR)).filter((file) => file.endsWith("index.html") && !file.includes(`${path.sep}_next${path.sep}`));
const pages = new Map<string, { noindex: boolean; contextualLinks: Set<string> }>();
for (const file of files) {
  const html = await readFile(file, "utf8");
  const noindex = [...html.matchAll(/<meta name="robots" content="([^"]*)"/g)].some((match) => match[1].includes("noindex"));
  const contextualLinks = new Set(
    [...mainContent(html).matchAll(/href="([^"]+)"/g)]
      .map((match) => normalizeHref(match[1].replace(SITE_URL, "")))
      .filter((href): href is string => Boolean(href)),
  );
  pages.set(routeFromFile(file), { noindex, contextualLinks });
}

const sitemapRoutes = ALL_SITEMAP_ENTRIES.map((entry) => entry.url.replace(SITE_URL, ""));
const inbound = new Map<string, Set<string>>(sitemapRoutes.map((route) => [route, new Set()]));
const noindexTargets = new Map<string, Set<string>>();

for (const [route, page] of pages) {
  if (page.noindex) continue;
  for (const target of page.contextualLinks) {
    if (target === route) continue;
    inbound.get(target)?.add(route);
    if (pages.get(target)?.noindex) {
      if (!noindexTargets.has(target)) noindexTargets.set(target, new Set());
      noindexTargets.get(target)!.add(route);
    }
  }
}

const errors: string[] = [];
for (const route of sitemapRoutes) {
  const page = pages.get(route);
  if (!page) errors.push(`${route}: in Sitemap, aber keine statische Seite`);
  else if (page.noindex) errors.push(`${route}: in Sitemap, aber noindex`);
}

const counts = sitemapRoutes.filter((route) => route !== "/").map((route) => ({ route, count: inbound.get(route)?.size ?? 0 }));
const orphans = counts.filter((item) => item.count === 0);
const weak = counts.filter((item) => item.count > 0 && item.count < WEAK_THRESHOLD);
const sorted = [...counts].sort((a, b) => a.count - b.count);
const median = sorted[Math.floor(sorted.length / 2)]?.count ?? 0;

console.log(`Internal link audit: ${pages.size} pages, ${sitemapRoutes.length} sitemap URLs.`);
console.log(`Contextual inbound links from indexable pages: median ${median}, orphans ${orphans.length}, weak (<${WEAK_THRESHOLD}) ${weak.length}.`);
if (orphans.length) console.log(`Orphans:\n${orphans.map((item) => `  ${item.route}`).join("\n")}`);
if (weak.length) console.log(`Weakly linked:\n${weak.map((item) => `  ${item.count}  ${item.route}`).join("\n")}`);
const noindexLinkCount = [...noindexTargets.values()].reduce((sum, sources) => sum + sources.size, 0);
console.log(`Contextual links from indexable pages to noindex pages: ${noindexLinkCount} links to ${noindexTargets.size} targets.`);
if (VERBOSE) {
  for (const [target, sources] of noindexTargets) console.log(`  ${target} <- ${[...sources].slice(0, 5).join(", ")}${sources.size > 5 ? ` (+${sources.size - 5})` : ""}`);
}

for (const item of orphans) errors.push(`${item.route}: Sitemap-URL ohne kontextuellen internen Link von einer indexierbaren Seite`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
