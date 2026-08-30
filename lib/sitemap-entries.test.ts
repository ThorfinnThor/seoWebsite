import { describe, expect, it } from "vitest";
import { ALL_SITEMAP_ENTRIES, SITEMAP_SEGMENTS } from "@/lib/sitemap-entries";

describe("segmented sitemap inventory", () => {
  it("covers every indexable URL exactly once", () => {
    expect(ALL_SITEMAP_ENTRIES).toHaveLength(162);
    expect(new Set(ALL_SITEMAP_ENTRIES.map((entry) => entry.url)).size).toBe(ALL_SITEMAP_ENTRIES.length);
    expect(SITEMAP_SEGMENTS).toHaveLength(2);
  });

  it("keeps programmatic detail pages out of the indexable inventory", () => {
    const urls = ALL_SITEMAP_ENTRIES.map((entry) => entry.url);
    expect(urls.some((url) => url.includes("/ratgeber/projekte/") && /\/ratgeber\/projekte\/[^/]+\/[^/]+\/$/.test(url))).toBe(false);
    expect(urls.some((url) => url.includes("/ratgeber/vergleiche/") && /\/ratgeber\/vergleiche\/[^/]+\/[^/]+\/$/.test(url))).toBe(false);
  });

  it("uses only absolute canonical URLs and real modification dates", () => {
    for (const segment of SITEMAP_SEGMENTS) {
      for (const entry of segment.entries) {
        expect(entry.url).toMatch(/^https:\/\/www\.passendplanen\.de\/.+|^https:\/\/www\.passendplanen\.de\/$/);
        expect(entry.lastModified).toBeInstanceOf(Date);
        expect(Number.isNaN(new Date(entry.lastModified ?? "").valueOf())).toBe(false);
      }
    }
  });
});
