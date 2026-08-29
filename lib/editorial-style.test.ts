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
});
