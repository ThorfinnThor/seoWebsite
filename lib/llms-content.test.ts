import { describe, expect, it } from "vitest";
import { DATA_REPORTS } from "@/lib/data-report/registry";
import { GUIDE_DATA_INSIGHTS } from "@/lib/guide-data-insights";
import { SEO_TOPICS } from "@/lib/seo-topics";
import { buildLlmsFullTxt, buildLlmsTxt } from "@/lib/llms-content";

describe("LLM discovery files", () => {
  it("keeps the concise file valid and complete", () => {
    const content = buildLlmsTxt();
    expect(content.startsWith("# PassendPlanen\n\n> ")).toBe(true);
    expect(content).toContain("## Wichtigste Einstiege");
    expect(content).toContain("## Rechner");
    expect(content).toContain("## Nutzungshinweise");
    expect(content).toContain("/llms-full.txt");
    for (const topic of SEO_TOPICS) expect(content).toContain(topic.plannerHref);
    for (const report of DATA_REPORTS) expect(content).toContain(report.path);
  });

  it("keeps the expanded file focused on public canonical pages", () => {
    const content = buildLlmsFullTxt();
    for (const insight of GUIDE_DATA_INSIGHTS) expect(content).toContain(insight.path);
    expect(content).not.toContain("/ratgeber/projekte/");
    expect(content).not.toContain("/data/");
  });
});
