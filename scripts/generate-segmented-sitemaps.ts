import { mkdir, readdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { SITEMAP_SEGMENTS, sitemapSegmentUrl } from "@/lib/sitemap-entries";

const outputDirectory = path.resolve("public/sitemaps");

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatDate(value: string | Date | undefined) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function renderSitemap(entries: (typeof SITEMAP_SEGMENTS)[number]["entries"]) {
  const urls = entries.map((entry) => [
    "  <url>",
    `    <loc>${escapeXml(entry.url)}</loc>`,
    ...(entry.lastModified ? [`    <lastmod>${formatDate(entry.lastModified)}</lastmod>`] : []),
    "  </url>",
  ].join("\n"));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

function renderSitemapIndex() {
  const sitemaps = SITEMAP_SEGMENTS.map((segment) => [
    "  <sitemap>",
    `    <loc>${escapeXml(sitemapSegmentUrl(segment))}</loc>`,
    "  </sitemap>",
  ].join("\n"));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemaps,
    "</sitemapindex>",
    "",
  ].join("\n");
}

await mkdir(outputDirectory, { recursive: true });

const expectedFiles = new Set([...SITEMAP_SEGMENTS.map((segment) => `${segment.id}.xml`), "index.xml"]);
for (const filename of await readdir(outputDirectory)) {
  if (filename.endsWith(".xml") && !expectedFiles.has(filename)) {
    await unlink(path.join(outputDirectory, filename));
  }
}

for (const segment of SITEMAP_SEGMENTS) {
  await writeFile(path.join(outputDirectory, `${segment.id}.xml`), renderSitemap(segment.entries), "utf8");
}

await writeFile(path.join(outputDirectory, "index.xml"), renderSitemapIndex(), "utf8");

console.log(`Generated ${SITEMAP_SEGMENTS.length} segmented sitemaps and one sitemap index.`);
