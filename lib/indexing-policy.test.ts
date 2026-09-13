import { describe, expect, it } from "vitest";
import { generateMetadata as projectMetadata } from "@/app/ratgeber/projekte/[topic]/[slug]/page";
import { generateMetadata as comparisonMetadata } from "@/app/ratgeber/vergleiche/[topic]/[slug]/page";
import { getDecisionGuide } from "@/lib/decision-guides";
import { evaluateProgrammaticGuideIndexing } from "@/lib/programmatic-indexing";

describe("indexing policy for programmatic detail pages", () => {
  it("keeps project profiles available but out of the index", async () => {
    const metadata = await projectMetadata({
      params: Promise.resolve({ topic: "maehroboter", slug: "maehroboter-100-qm-offen" }),
    });

    expect(metadata.robots).toEqual({ index: false, follow: true });
  });

  it("keeps generated direct comparisons available but out of the index", async () => {
    const metadata = await comparisonMetadata({
      params: Promise.resolve({ topic: "maehroboter", slug: "maehroboter-begrenzungskabel-oder-rtk-300-qm" }),
    });

    expect(metadata.robots).toEqual({ index: false, follow: true });
  });

  it("indexes the fully edited mower comparison", async () => {
    const metadata = await comparisonMetadata({
      params: Promise.resolve({ topic: "maehroboter", slug: "maehroboter-begrenzungskabel-oder-rtk-500-qm" }),
    });

    expect(metadata.robots).toBeUndefined();
  });

  it("records every passed quality check for the approved comparison", () => {
    const guide = getDecisionGuide("maehroboter", "maehroboter-begrenzungskabel-oder-rtk-500-qm");

    expect(guide?.indexingGate?.indexable).toBe(true);
    expect(guide?.indexingGate?.failedChecks).toEqual([]);
    expect(Object.values(guide?.indexingGate?.checks ?? {})).not.toContain(false);
  });

  it("does not index generated pages without an explicit editorial approval", () => {
    const guide = getDecisionGuide("maehroboter", "maehroboter-begrenzungskabel-oder-rtk-300-qm");

    expect(guide?.indexable).toBe(false);
    expect(guide?.indexingGate?.failedChecks).toContain("editorial-approval");
  });

  it("rejects an approval that names a different canonical URL", () => {
    const guide = getDecisionGuide("maehroboter", "maehroboter-begrenzungskabel-oder-rtk-500-qm");
    expect(guide).toBeDefined();
    if (!guide) return;

    const result = evaluateProgrammaticGuideIndexing(
      guide,
      guide.indexingApproval && { ...guide.indexingApproval, canonicalPath: "/falsche-url/" },
      `/ratgeber/vergleiche/${guide.topicSlug}/${guide.slug}/`,
    );

    expect(result.indexable).toBe(false);
    expect(result.failedChecks).toContain("canonical-path");
  });
});
