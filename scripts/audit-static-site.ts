import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { GUIDE_ENRICHMENTS } from "@/lib/guide-enrichments";
import { SITE } from "@/lib/site";

const OUT_DIR = path.resolve("out");
const SITE_URL = SITE.url.replace(/\/$/, "");

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

function firstMatch(html: string, pattern: RegExp) {
  return html.match(pattern)?.[1]?.trim() ?? "";
}

function pageFileForHref(href: string) {
  const normalized = href.endsWith("/") ? href : `${href}/`;
  return path.join(OUT_DIR, normalized.replace(/^\//, ""), "index.html");
}

const files = await walk(OUT_DIR);
const pageFiles = files.filter((file) => file.endsWith("index.html") && !file.includes(`${path.sep}_next${path.sep}`));
const fileSet = new Set(files.map((file) => path.resolve(file)));
const pages = await Promise.all(pageFiles.map(async (file) => {
  const html = await readFile(file, "utf8");
  const robots = [...html.matchAll(/<meta name="robots" content="([^"]*)"/g)].map((match) => match[1]);
  return {
    file,
    route: routeFromFile(file),
    html,
    title: firstMatch(html, /<title>([^<]+)<\/title>/),
    description: firstMatch(html, /<meta name="description" content="([^"]+)"/),
    canonical: firstMatch(html, /<link rel="canonical" href="([^"]+)"/),
    openGraphTitle: firstMatch(html, /<meta property="og:title" content="([^"]+)"/),
    openGraphDescription: firstMatch(html, /<meta property="og:description" content="([^"]+)"/),
    openGraphUrl: firstMatch(html, /<meta property="og:url" content="([^"]+)"/),
    twitterTitle: firstMatch(html, /<meta name="twitter:title" content="([^"]+)"/),
    twitterDescription: firstMatch(html, /<meta name="twitter:description" content="([^"]+)"/),
    h1Count: (html.match(/<h1\b/g) ?? []).length,
    noindex: robots.some((value) => value.includes("noindex")),
  };
}));

const errors: string[] = [];
const indexablePages = pages.filter((page) => !page.noindex);

for (const page of pages) {
  const normalizedHtml = page.html.replaceAll("&amp;", "&");
  if (!page.title) errors.push(`${page.route}: title fehlt`);
  if (!page.description && !page.noindex) errors.push(`${page.route}: Meta-Description fehlt`);
  if (page.h1Count !== 1) errors.push(`${page.route}: erwartet 1 H1, gefunden ${page.h1Count}`);
  const expectedUrl = `${SITE_URL}${page.route}`;
  if (!page.noindex && !page.canonical) errors.push(`${page.route}: Canonical fehlt`);
  else if (!page.noindex && page.canonical !== expectedUrl) errors.push(`${page.route}: Canonical ${page.canonical} statt ${expectedUrl}`);
  if (!page.openGraphTitle) errors.push(`${page.route}: og:title fehlt`);
  if (!page.openGraphDescription && !page.noindex) errors.push(`${page.route}: og:description fehlt`);
  const expectedSocialTitle = page.title.replace(/\s+\|\s+MachPlan$/, "");
  if (!page.noindex && page.openGraphTitle !== expectedSocialTitle) errors.push(`${page.route}: og:title weicht vom Seitentitel ab`);
  if (!page.noindex && page.openGraphDescription !== page.description) errors.push(`${page.route}: og:description weicht von der Meta-Description ab`);
  if (!page.noindex && !page.openGraphUrl) errors.push(`${page.route}: og:url fehlt`);
  else if (!page.noindex && page.openGraphUrl !== expectedUrl) errors.push(`${page.route}: og:url ${page.openGraphUrl} statt ${expectedUrl}`);
  if (!page.noindex && page.twitterTitle !== expectedSocialTitle) errors.push(`${page.route}: twitter:title fehlt oder weicht ab`);
  if (!page.noindex && page.twitterDescription !== page.description) errors.push(`${page.route}: twitter:description fehlt oder weicht ab`);
  if (!page.noindex && !page.html.includes('<meta name="author" content="Schayan Yousefian"')) errors.push(`${page.route}: Autoren-Metadatum fehlt`);
  if (!page.html.includes('<html lang="de"')) errors.push(`${page.route}: deutsche Seitensprache fehlt`);
  const jsonLdBlocks = [...page.html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map((match) => match[1]);
  for (const [index, json] of jsonLdBlocks.entries()) {
    try { JSON.parse(json); } catch { errors.push(`${page.route}: ungültiges JSON-LD in Block ${index + 1}`); }
  }
  if (page.html.includes('class="guide-page"')) {
    if (!page.html.includes('"@type":"Article"')) errors.push(`${page.route}: Article JSON-LD fehlt`);
    if (!page.html.includes('<time dateTime="')) errors.push(`${page.route}: maschinenlesbares Prüfdatum fehlt`);
    if (!page.html.includes("Kurzantwort")) errors.push(`${page.route}: sichtbare Kurzantwort fehlt`);
    if (!page.html.includes('rel="author"')) errors.push(`${page.route}: sichtbarer Autor fehlt`);
  }
  const enrichment = GUIDE_ENRICHMENTS[page.route];
  if (enrichment?.sources?.length) {
    if (!page.html.includes('class="guide-sources"')) errors.push(`${page.route}: sichtbarer Quellenblock fehlt`);
    if (!page.html.includes('"citation":[')) errors.push(`${page.route}: Quellen fehlen im Article JSON-LD`);
    for (const source of enrichment.sources) {
      if (!normalizedHtml.includes(source.href)) errors.push(`${page.route}: Quellenlink fehlt: ${source.href}`);
    }
  }
  if (enrichment?.example && !page.html.includes('class="guide-example"')) {
    errors.push(`${page.route}: sichtbares Rechenbeispiel fehlt`);
  }
  if (page.html.includes('class="planner-hero"') && !page.html.includes('"@type":"WebApplication"')) {
    errors.push(`${page.route}: WebApplication JSON-LD fehlt`);
  }
  if (page.html.includes('class="planner-hero"')) {
    if (!page.html.includes('class="section planner-faq"')) errors.push(`${page.route}: sichtbarer Rechner-FAQ-Bereich fehlt`);
    if (!page.html.includes('"@type":"FAQPage"')) errors.push(`${page.route}: FAQPage JSON-LD fehlt`);
    if (!page.html.includes('"featureList":[')) errors.push(`${page.route}: konkrete Rechnerfunktionen fehlen im WebApplication JSON-LD`);
  }
}

for (const route of Object.keys(GUIDE_ENRICHMENTS)) {
  if (!pages.some((page) => page.route === route)) errors.push(`${route}: Quellenkonfiguration ohne statische Seite`);
}

for (const field of ["title", "description"] as const) {
  const seen = new Map<string, string>();
  for (const page of indexablePages) {
    const value = page[field];
    if (!value) continue;
    const previous = seen.get(value);
    if (previous) errors.push(`${page.route}: ${field} doppelt mit ${previous}`);
    seen.set(value, page.route);
  }
}

const canonicalRoutes = new Map<string, string>();
for (const page of indexablePages) {
  const previous = canonicalRoutes.get(page.canonical);
  if (previous) errors.push(`${page.route}: Canonical doppelt mit ${previous}`);
  canonicalRoutes.set(page.canonical, page.route);
}

const ignoredPrefixes = ["/_next/", "/data/"];
const ignoredFiles = new Set(["/icon.svg", "/manifest.webmanifest", "/robots.txt", "/sitemap.xml"]);
for (const page of pages) {
  const hrefs = [...page.html.matchAll(/href="(\/[^"#?]*)/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (ignoredPrefixes.some((prefix) => href.startsWith(prefix)) || ignoredFiles.has(href)) continue;
    if (!fileSet.has(path.resolve(pageFileForHref(href)))) errors.push(`${page.route}: interner Link ohne statische Seite ${href}`);
  }
}

const sitemap = await readFile(path.join(OUT_DIR, "sitemap.xml"), "utf8");
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
for (const page of indexablePages) {
  if (!sitemapUrls.has(`${SITE_URL}${page.route}`)) {
    errors.push(`${page.route}: fehlt in sitemap.xml`);
  }
}
for (const page of pages.filter((candidate) => candidate.noindex)) {
  if (sitemapUrls.has(`${SITE_URL}${page.route}`)) errors.push(`${page.route}: noindex-Seite steht in sitemap.xml`);
}

const robotsTxt = await readFile(path.join(OUT_DIR, "robots.txt"), "utf8");
if (!robotsTxt.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) errors.push("robots.txt: Sitemap-Verweis fehlt oder ist falsch");
if (!robotsTxt.includes("User-Agent: *") || !robotsTxt.includes("Allow: /")) errors.push("robots.txt: öffentliche Crawler sind nicht allgemein zugelassen");
if (!robotsTxt.includes("Disallow: /data/")) errors.push("robots.txt: Produktdaten-Verzeichnis ist nicht ausgeschlossen");

const llmsTxt = await readFile(path.join(OUT_DIR, "llms.txt"), "utf8");
for (const requiredSection of ["# MachPlan", "## Wichtigste Einstiege", "## Rechner", "## Nutzungshinweise"]) {
  if (!llmsTxt.includes(requiredSection)) errors.push(`llms.txt: Abschnitt fehlt: ${requiredSection}`);
}
for (const planner of ["Gartenhaus-Planer", "Bewässerungsplaner", "Terrassendielen-Rechner", "Sichtschutz-Planer", "Gewächshaus-Planer", "Mähroboter-Flächencheck", "Carport-Planer", "Bodenbelag-Rechner", "Trockenbau-Rechner", "Luftentfeuchter-Rechner"]) {
  if (!llmsTxt.includes(planner)) errors.push(`llms.txt: Rechner fehlt: ${planner}`);
}

if (!process.env.NEXT_PUBLIC_LEGAL_EMAIL) {
  for (const route of ["/impressum/", "/datenschutz/"]) {
    const page = pages.find((candidate) => candidate.route === route);
    if (!page?.noindex) errors.push(`${route}: muss ohne Rechtskontakt noindex sein`);
    if (!page?.html.includes("Entwurf – Kontaktangabe noch unvollständig")) errors.push(`${route}: Entwurfshinweis fehlt`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  const sourcedGuides = Object.values(GUIDE_ENRICHMENTS).filter((entry) => entry.sources?.length).length;
  const guideExamples = Object.values(GUIDE_ENRICHMENTS).filter((entry) => entry.example).length;
  console.log(`Static site audit passed: ${pages.length} pages, ${indexablePages.length} indexable, ${sourcedGuides} sourced guides, ${guideExamples} worked examples, internal links valid.`);
}
