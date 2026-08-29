import { describe, expect, it } from "vitest";
import { DECISION_GUIDES } from "@/lib/decision-guides";
import { PROJECT_EXAMPLES } from "@/lib/project-examples";
import { SEO_GUIDES } from "@/lib/seo-guides";

type Guide = (typeof SEO_GUIDES)[number] | (typeof DECISION_GUIDES)[number] | (typeof PROJECT_EXAMPLES)[number];

function visibleText(guide: Guide) {
  const values: string[] = [];
  const visit = (value: unknown) => {
    if (typeof value === "string") values.push(value);
    else if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === "object") {
      Object.entries(value).forEach(([key, nested]) => {
        if (key !== "href" && key !== "slug" && key !== "topicSlug" && key !== "path") visit(nested);
      });
    }
  };
  visit(guide);
  return values;
}

describe("editorial guide output", () => {
  it("keeps visible guide prose free from separator punctuation", () => {
    const prose = [...SEO_GUIDES, ...DECISION_GUIDES, ...PROJECT_EXAMPLES].flatMap(visibleText);

    expect(prose.some((value) => /\s[–—]\s|\s-\s|:\s/.test(value))).toBe(false);
  });

  it("does not emit the stock comparison phrase", () => {
    const prose = [...SEO_GUIDES, ...DECISION_GUIDES, ...PROJECT_EXAMPLES].flatMap(visibleText).join(" ");

    expect(prose).not.toContain("Erst verstehen, was du brauchst");
    expect(prose).not.toContain("Dann Produkte vergleichen");
  });

  it("retains several editorial section layouts", () => {
    const layouts = new Set(
      [...SEO_GUIDES, ...DECISION_GUIDES, ...PROJECT_EXAMPLES].map((guide) => guide.sections.map((section) => section.title).join("|")),
    );

    expect(layouts.size).toBeGreaterThan(100);
  });

  it("does not let one paragraph dominate the generated corpus", () => {
    const paragraphs = [...SEO_GUIDES, ...DECISION_GUIDES, ...PROJECT_EXAMPLES].flatMap((guide) =>
      guide.sections.flatMap((section) => section.paragraphs.map((paragraph) => paragraph.replace(/\s+/g, " ").trim())),
    );
    const frequencies = new Map<string, number>();
    paragraphs.forEach((paragraph) => frequencies.set(paragraph, (frequencies.get(paragraph) ?? 0) + 1));
    const mostFrequent = Math.max(...frequencies.values());

    expect(paragraphs.length).toBeGreaterThan(20_000);
    expect(frequencies.size).toBeGreaterThan(8_000);
    expect(mostFrequent).toBeLessThan(100);
  });

  it("varies the generated page furniture as well as the body copy", () => {
    const generated = [...DECISION_GUIDES, ...PROJECT_EXAMPLES];
    const values = [
      ...generated.map((guide) => guide.intro),
      ...generated.map((guide) => guide.takeaway),
      ...generated.flatMap((guide) => guide.checklist ?? []),
      ...generated.map((guide) => guide.example?.intro ?? ""),
    ].map((value) => value.replace(/\s+/g, " ").trim());
    const frequencies = new Map<string, number>();
    values.forEach((value) => frequencies.set(value, (frequencies.get(value) ?? 0) + 1));

    expect(Math.max(...frequencies.values())).toBeLessThan(100);
  });
});
