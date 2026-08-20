import { describe, expect, it } from "vitest";
import {
  DECISION_GUIDES,
  DECISION_GUIDE_DIRECTORIES,
  getDecisionGuide,
} from "@/lib/decision-guides";

describe("decision guide library", () => {
  it("builds exactly 1,000 contextual comparisons", () => {
    expect(DECISION_GUIDES).toHaveLength(1000);
    expect(DECISION_GUIDE_DIRECTORIES).toHaveLength(10);
    for (const directory of DECISION_GUIDE_DIRECTORIES) {
      expect(directory.guides).toHaveLength(100);
      expect(new Set(directory.guides.map((guide) => guide.pairSlug)).size).toBe(10);
      expect(new Set(directory.guides.map((guide) => guide.contextSlug)).size).toBe(10);
    }
  });

  it("keeps titles, metadata and decision signatures unique", () => {
    for (const field of ["slug", "title", "description", "qualitySignature"] as const) {
      expect(new Set(DECISION_GUIDES.map((guide) => guide[field])).size).toBe(DECISION_GUIDES.length);
    }
  });

  it("resolves a guide only inside its topic", () => {
    const guide = DECISION_GUIDES[0];
    expect(getDecisionGuide(guide.topicSlug, guide.slug)).toEqual(guide);
    expect(getDecisionGuide("anderes-thema", guide.slug)).toBeUndefined();
  });

  it("provides a complete decision model on every page", () => {
    for (const guide of DECISION_GUIDES) {
      expect(guide.sections).toHaveLength(8);
      expect(guide.comparison?.rows).toHaveLength(5);
      expect(guide.checklist?.length).toBeGreaterThanOrEqual(9);
      expect(guide.faqs?.length).toBeGreaterThanOrEqual(5);
      expect(guide.sources?.length).toBeGreaterThanOrEqual(1);
      expect(guide.example?.steps.length).toBeGreaterThanOrEqual(7);
      expect(guide.relatedLinks?.length).toBeGreaterThanOrEqual(7);
      expect(guide.scoreA).toBeGreaterThanOrEqual(1);
      expect(guide.scoreA).toBeLessThanOrEqual(5);
      expect(guide.scoreB).toBeGreaterThanOrEqual(1);
      expect(guide.scoreB).toBeLessThanOrEqual(5);
    }
  });

  it("connects every comparison to crawlable sibling decisions", () => {
    for (const guide of DECISION_GUIDES) {
      const siblingLinks = guide.relatedLinks?.filter((link) => link.href.includes("/ratgeber/vergleiche/") && link.href !== `/ratgeber/vergleiche/${guide.topicSlug}/`) ?? [];
      expect(siblingLinks).toHaveLength(2);
      expect(new Set(siblingLinks.map((link) => link.href)).size).toBe(2);
    }
  });

  it("changes the outcome when a real context changes the weights", () => {
    const gardenHouse = DECISION_GUIDE_DIRECTORIES.find((directory) => directory.topicSlug === "gartenhaus");
    const pair = gardenHouse?.guides.filter((guide) => guide.pairSlug === "holz-oder-metall") ?? [];
    expect(pair).toHaveLength(10);
    expect(new Set(pair.map((guide) => `${guide.scoreA.toFixed(2)}:${guide.scoreB.toFixed(2)}`)).size).toBeGreaterThan(3);
  });
});
