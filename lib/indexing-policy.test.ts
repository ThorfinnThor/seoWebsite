import { describe, expect, it } from "vitest";
import { generateMetadata as projectMetadata } from "@/app/ratgeber/projekte/[topic]/[slug]/page";
import { generateMetadata as comparisonMetadata } from "@/app/ratgeber/vergleiche/[topic]/[slug]/page";
import { getDecisionGuide } from "@/lib/decision-guides";
import { getProjectExample } from "@/lib/project-examples";
import { evaluateProgrammaticGuideIndexing } from "@/lib/programmatic-indexing";

const newlyEditedComparisons = [
  ["trockenbau", "trockenbau-osb-gips-oder-zementbauplatte-badezimmer"],
  ["gartenhaus", "gartenhaus-metall-oder-wpc-kleines-budget"],
  ["bodenbelag", "bodenbelag-laminat-oder-klickvinyl-kinderzimmer"],
  ["gartenhaus", "gartenhaus-kunststoff-oder-wpc-kleiner-garten"],
  ["trockenbau", "trockenbau-feuchtraumplatte-oder-gipsfaser-kuechenschraenke"],
  ["bodenbelag", "bodenbelag-fertigparkett-oder-linoleum-langfristige-nutzung"],
] as const;

const newlyEditedProjects = [
  ["gartenhaus", "gartenhaus-3x3-meter-werkstatt"],
  ["gartenhaus", "gartenhaus-5x5-meter-gartenmoebel"],
] as const;

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

  it.each(newlyEditedComparisons)("indexes the individually reviewed comparison %s/%s", async (topic, slug) => {
    const guide = getDecisionGuide(topic, slug);
    const metadata = await comparisonMetadata({ params: Promise.resolve({ topic, slug }) });

    expect(guide?.indexable).toBe(true);
    expect(guide?.indexingGate?.failedChecks).toEqual([]);
    expect(guide?.indexingApproval?.canonicalPath).toBe(`/ratgeber/vergleiche/${topic}/${slug}/`);
    expect(metadata.robots).toBeUndefined();
    expect(metadata.alternates?.canonical).toBe(`/ratgeber/vergleiche/${topic}/${slug}/`);
    expect(metadata.openGraph).toMatchObject({ modifiedTime: guide?.indexingApproval?.reviewedAt });
  });

  it.each(newlyEditedProjects)("indexes the individually reviewed project %s/%s", async (topic, slug) => {
    const example = getProjectExample(topic, slug);
    const metadata = await projectMetadata({ params: Promise.resolve({ topic, slug }) });

    expect(example?.indexable).toBe(true);
    expect(example?.indexingGate?.failedChecks).toEqual([]);
    expect(example?.indexingApproval?.canonicalPath).toBe(`/ratgeber/projekte/${topic}/${slug}/`);
    expect(metadata.robots).toBeUndefined();
    expect(metadata.alternates?.canonical).toBe(`/ratgeber/projekte/${topic}/${slug}/`);
    expect(metadata.openGraph).toMatchObject({ modifiedTime: example?.indexingApproval?.reviewedAt });
  });

  it("does not reopen unreviewed siblings", async () => {
    const comparison = getDecisionGuide("gartenhaus", "gartenhaus-metall-oder-wpc-kleiner-garten");
    const project = getProjectExample("gartenhaus", "gartenhaus-3x3-meter-gartenmoebel");

    expect(comparison?.indexable).toBe(false);
    expect(project?.indexable).toBe(false);
    expect((await projectMetadata({ params: Promise.resolve({ topic: "gartenhaus", slug: "gartenhaus-3x3-meter-gartenmoebel" }) })).robots)
      .toEqual({ index: false, follow: true });
  });
});
