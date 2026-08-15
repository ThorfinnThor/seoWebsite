import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("out");
const strict = process.argv.includes("--strict");

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

function visibleWords(html: string) {
  const article = html.match(/<article class="guide-page">([\s\S]*?)<\/article>/)?.[1] ?? html;
  const text = article
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:[a-z]+|#\d+|#x[\da-f]+);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text ? text.split(" ").length : 0;
}

const files = (await walk(OUT_DIR)).filter((file) => file.endsWith("index.html") && !file.includes(`${path.sep}_next${path.sep}`));
const guides = await Promise.all(files.map(async (file) => {
  const html = await readFile(file, "utf8");
  return {
    route: routeFromFile(file),
    words: visibleWords(html),
    isGuide: html.includes('class="guide-page"'),
    hasComparison: html.includes('class="guide-comparison"'),
    hasChecklist: html.includes('class="guide-checklist"'),
    hasFaq: html.includes('class="guide-faq"') && html.includes('"@type":"FAQPage"'),
    hasRelated: html.includes('class="guide-related"'),
    hasExample: html.includes('class="guide-example"'),
    hasSources: html.includes('class="guide-sources"'),
  };
})).then((pages) => pages.filter((page) => page.isGuide));

const results = guides.map((guide) => {
  const enrichmentCount = [guide.hasComparison, guide.hasChecklist, guide.hasFaq, guide.hasRelated, guide.hasExample, guide.hasSources].filter(Boolean).length;
  const passesLongForm = guide.words >= 800;
  const passesRichFormat = guide.words >= 550 && enrichmentCount >= 4 && guide.hasFaq && guide.hasRelated;
  return { ...guide, enrichmentCount, passes: passesLongForm || passesRichFormat };
});

const failed = results.filter((result) => !result.passes).sort((a, b) => a.words - b.words);
const rich = results.filter((result) => result.passes);
console.log(`Content depth: ${rich.length}/${results.length} Ratgeber pass quality gate (800+ words or 550+ words with at least four meaningful content modules).`);
if (failed.length) {
  console.log("\nPages below target:");
  for (const page of failed) console.log(`- ${page.route}: ${page.words} words, ${page.enrichmentCount}/6 modules`);
}

if (strict && failed.length) process.exitCode = 1;
