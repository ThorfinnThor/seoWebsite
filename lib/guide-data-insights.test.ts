import { describe, expect, it } from "vitest";
import { DATA_REPORTS } from "@/lib/data-report/registry";
import { GUIDE_DATA_INSIGHTS, getGuideDataInsight } from "@/lib/guide-data-insights";
import { getSeoGuide } from "@/lib/seo-guides";

describe("guide data insights", () => {
  it("adds one data module to each of the ten topic clusters", () => {
    expect(GUIDE_DATA_INSIGHTS).toHaveLength(10);
    expect(new Set(GUIDE_DATA_INSIGHTS.map((insight) => insight.topic)).size).toBe(10);
  });

  it("targets existing guides and existing full reports", () => {
    const reportPaths = new Set(DATA_REPORTS.map((report) => report.path));
    for (const insight of GUIDE_DATA_INSIGHTS) {
      const slug = insight.path.split("/").filter(Boolean).at(-1);
      expect(slug && getSeoGuide(slug)).toBeTruthy();
      expect(reportPaths.has(insight.reportHref as (typeof DATA_REPORTS)[number]["path"])).toBe(true);
      expect(getGuideDataInsight(insight.path)).toBe(insight);
    }
  });

  it("keeps every module traceable and substantial", () => {
    for (const insight of GUIDE_DATA_INSIGHTS) {
      expect(insight.metrics.length).toBeGreaterThanOrEqual(3);
      expect(insight.rows.length).toBeGreaterThanOrEqual(2);
      expect(insight.conclusion.length).toBeGreaterThan(90);
      expect(insight.caveat.length).toBeGreaterThan(70);
      expect(insight.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
