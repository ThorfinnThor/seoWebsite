import type { SeoGuide } from "@/lib/seo-guides";

export type ProgrammaticIndexApproval = {
  reviewedAt: string;
  canonicalPath: string;
  primaryIntent: string;
  distinctValue: string;
  overlapReview: readonly string[];
};

export type ProgrammaticIndexingGate = {
  indexable: boolean;
  checks: Readonly<Record<string, boolean>>;
  failedChecks: readonly string[];
};

type ProgrammaticGuideCandidate = Pick<
  SeoGuide,
  "slug" | "title" | "description" | "heading" | "intro" | "takeaway" | "plannerHref" | "sections" | "comparison" | "checklist" | "faqs" | "sources" | "relatedLinks"
>;

function hasMeaningfulText(value: string | undefined, minimumLength: number) {
  return Boolean(value && value.trim().length >= minimumLength);
}

export function evaluateProgrammaticGuideIndexing(
  guide: ProgrammaticGuideCandidate,
  approval: ProgrammaticIndexApproval | undefined,
  canonicalPath: string,
): ProgrammaticIndexingGate {
  const checks = {
    "editorial-approval": Boolean(approval),
    "canonical-path": approval?.canonicalPath === canonicalPath,
    "review-date": Boolean(approval?.reviewedAt && /^\d{4}-\d{2}-\d{2}$/.test(approval.reviewedAt)),
    "primary-intent": hasMeaningfulText(approval?.primaryIntent, 40),
    "distinct-value": hasMeaningfulText(approval?.distinctValue, 60),
    "overlap-review": (approval?.overlapReview.length ?? 0) >= 2,
    "complete-metadata": [guide.title, guide.description, guide.heading, guide.intro, guide.takeaway, guide.plannerHref]
      .every((value) => hasMeaningfulText(value, 8)),
    "editorial-depth": guide.sections.length >= 7
      && guide.sections.every((section) => section.paragraphs.length >= 2),
    "decision-table": (guide.comparison?.rows.length ?? 0) >= 4,
    "purchase-checklist": (guide.checklist?.length ?? 0) >= 6,
    "reader-faq": (guide.faqs?.length ?? 0) >= 3,
    "verified-sources": (guide.sources?.length ?? 0) >= 2,
    "contextual-links": (guide.relatedLinks?.length ?? 0) >= 3,
  } as const;
  const failedChecks = Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);

  return {
    indexable: failedChecks.length === 0,
    checks,
    failedChecks,
  };
}
