import { describe, expect, it } from "vitest";
import { ALL_SITEMAP_ENTRIES, SITEMAP_SEGMENTS } from "@/lib/sitemap-entries";

describe("segmented sitemap inventory", () => {
  it("covers every indexable URL exactly once", () => {
    expect(ALL_SITEMAP_ENTRIES).toHaveLength(2011);
    expect(new Set(ALL_SITEMAP_ENTRIES.map((entry) => entry.url)).size).toBe(ALL_SITEMAP_ENTRIES.length);
    expect(SITEMAP_SEGMENTS).toHaveLength(22);
  });

  it("keeps high-volume templates isolated by topic", () => {
    const projects = SITEMAP_SEGMENTS.filter((segment) => segment.id.startsWith("projektprofile-"));
    const comparisons = SITEMAP_SEGMENTS.filter((segment) => segment.id.startsWith("vergleiche-"));
    expect(projects).toHaveLength(10);
    expect(comparisons).toHaveLength(10);
    expect(projects.every((segment) => segment.entries.length === 85)).toBe(true);
    expect(comparisons.every((segment) => segment.entries.length === 100)).toBe(true);
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
