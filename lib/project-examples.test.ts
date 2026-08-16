import { describe, expect, it } from "vitest";
import {
  getProjectExample,
  PROJECT_EXAMPLES,
  PROJECT_EXAMPLE_DIRECTORIES,
} from "@/lib/project-examples";

describe("project example library", () => {
  it("builds 85 useful profiles for each of ten topics", () => {
    expect(PROJECT_EXAMPLES).toHaveLength(850);
    expect(PROJECT_EXAMPLE_DIRECTORIES).toHaveLength(10);
    for (const directory of PROJECT_EXAMPLE_DIRECTORIES) {
      expect(directory.examples).toHaveLength(85);
      expect(new Set(directory.examples.map((example) => example.variantSlug)).size).toBe(5);
      expect(new Set(directory.examples.map((example) => example.scaleSlug)).size).toBe(17);
    }
  });

  it("keeps every search result and canonical path unique", () => {
    for (const field of ["slug", "title", "description", "qualitySignature"] as const) {
      expect(new Set(PROJECT_EXAMPLES.map((example) => example[field])).size).toBe(PROJECT_EXAMPLES.length);
    }
  });

  it("resolves a profile only inside its topic", () => {
    const example = PROJECT_EXAMPLES[0];
    expect(getProjectExample(example.topicSlug, example.slug)).toEqual(example);
    expect(getProjectExample("falsches-thema", example.slug)).toBeUndefined();
  });

  it("requires calculation, evidence and onward navigation on every profile", () => {
    for (const example of PROJECT_EXAMPLES) {
      expect(example.example?.steps.length).toBeGreaterThanOrEqual(3);
      expect(example.sources?.length).toBeGreaterThanOrEqual(1);
      expect(example.comparison?.rows.length).toBeGreaterThanOrEqual(4);
      expect(example.checklist?.length).toBeGreaterThanOrEqual(7);
      expect(example.faqs?.length).toBeGreaterThanOrEqual(4);
      expect(example.relatedLinks?.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("keeps editorially reviewed calculations and labels consistent", () => {
    const greenhouse = getProjectExample("gewaechshaus", "gewaechshaus-1-5x2-meter-tomaten");
    expect(greenhouse?.example?.steps[1].value).toContain("0,8 m × 2 m");
    expect(greenhouse?.example?.result).toContain("1,4 m²");

    const privacy = getProjectExample("sichtschutz", "sichtschutz-50-meter-wpc");
    expect(privacy?.example?.steps[1].value).toContain("1,75 m");
    expect(privacy?.example?.result).toContain("0,75 m");

    const carport = getProjectExample("carport", "carport-1-95x5-meter-wandseite");
    expect(carport?.title).toContain("1,95 × 5 Meter großes Fahrzeug");
    expect(carport?.example?.steps[1].value).toContain("0,85 m");

    const irrigation = getProjectExample("bewaesserung", "bewaesserung-2000-qm-hang");
    expect(irrigation?.example?.result).toContain("Zeitblöcke");
    expect(irrigation?.example?.result).not.toContain("Zonen");
  });
});
