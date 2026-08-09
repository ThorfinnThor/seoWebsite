import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("out");

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
    h1Count: (html.match(/<h1\b/g) ?? []).length,
    noindex: robots.some((value) => value.includes("noindex")),
  };
}));

const errors: string[] = [];
const indexablePages = pages.filter((page) => !page.noindex);

for (const page of pages) {
  if (!page.title) errors.push(`${page.route}: title fehlt`);
  if (!page.description && !page.noindex) errors.push(`${page.route}: Meta-Description fehlt`);
  if (page.h1Count !== 1) errors.push(`${page.route}: erwartet 1 H1, gefunden ${page.h1Count}`);
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
for (const page of indexablePages) {
  if (!sitemap.includes(`<loc>`) || !sitemap.includes(`${page.route}</loc>`)) {
    errors.push(`${page.route}: fehlt in sitemap.xml`);
  }
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
  console.log(`Static site audit passed: ${pages.length} pages, ${indexablePages.length} indexable, internal links valid.`);
}
