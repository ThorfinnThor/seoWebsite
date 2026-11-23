import type { GuideSection } from "@/components/seo/GuidePage";
import type { GuideExample, GuideSource } from "@/lib/guide-enrichments";

type GuideLike = {
  title: string;
  description: string;
  heading: string;
  intro: string;
  takeaway: string;
  plannerLabel: string;
  sections: readonly GuideSection[];
  limitation?: string;
  sources?: readonly GuideSource[];
  example?: GuideExample;
  comparison?: {
    caption: string;
    columns: readonly string[];
    rows: readonly (readonly string[])[];
  };
  checklist?: readonly string[];
  faqs?: readonly { question: string; answer: string }[];
  relatedLinks?: readonly { label: string; href: string; description: string }[];
};

/** Abbreviations whose full stop does not end a sentence. */
const ABBREVIATION_BEFORE_STOP = /(?:\b(?:ca|bzw|inkl|exkl|zzgl|mind|max|min|ggf|evtl|usw|etc|vgl|Abs|Art|Nr|Abb|Kap|Std|Min|Mio|Tsd|DIN|z|u|d|o|i|B|h|a|s)|\d)\.$/;

/**
 * Generated guides assemble sentences from data fragments that may start with a
 * lowercase word. This only fixes the capital letter at a sentence start and
 * collapses double spaces. It never rewrites words or punctuation: changing
 * „danach“ or a colon mechanically produced wrong instructions in the past.
 */
export function capitalizeSentences(text: string) {
  const collapsed = text.replace(/\s{2,}/g, " ").trim();
  return collapsed.replace(/(^|[.!?]\s+)([a-zäöü])/g, (match, prefix: string, letter: string, offset: number) => {
    if (prefix && ABBREVIATION_BEFORE_STOP.test(collapsed.slice(0, offset + 1))) return match;
    return `${prefix}${letter.toLocaleUpperCase("de-DE")}`;
  });
}

export function lowercaseInitial(text: string) {
  return text.length === 0 ? text : `${text[0].toLocaleLowerCase("de-DE")}${text.slice(1)}`;
}

export function sentenceEnd(text: string) {
  const trimmed = text.trim();
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

export function scopedStatement(text: string, scope: string) {
  return `${sentenceEnd(text)} ${sentenceEnd(scope)}`;
}

export function capitalizeGuide<T extends GuideLike>(guide: T): T {
  return {
    ...guide,
    title: capitalizeSentences(guide.title),
    description: capitalizeSentences(guide.description),
    heading: capitalizeSentences(guide.heading),
    intro: capitalizeSentences(guide.intro),
    takeaway: capitalizeSentences(guide.takeaway),
    plannerLabel: capitalizeSentences(guide.plannerLabel),
    limitation: guide.limitation ? capitalizeSentences(guide.limitation) : guide.limitation,
    sections: guide.sections.map((section) => ({
      ...section,
      title: capitalizeSentences(section.title),
      paragraphs: section.paragraphs.map(capitalizeSentences),
      bullets: section.bullets?.map(capitalizeSentences),
    })),
    comparison: guide.comparison
      ? {
          ...guide.comparison,
          caption: capitalizeSentences(guide.comparison.caption),
          columns: guide.comparison.columns.map(capitalizeSentences),
          rows: guide.comparison.rows.map((row) => row.map(capitalizeSentences)),
        }
      : guide.comparison,
    checklist: guide.checklist?.map(capitalizeSentences),
    faqs: guide.faqs?.map((faq) => ({ question: capitalizeSentences(faq.question), answer: capitalizeSentences(faq.answer) })),
    relatedLinks: guide.relatedLinks?.map((link) => ({
      ...link,
      label: capitalizeSentences(link.label),
      description: capitalizeSentences(link.description),
    })),
    sources: guide.sources?.map((source) => ({
      ...source,
      label: capitalizeSentences(source.label),
      note: capitalizeSentences(source.note),
    })),
    example: guide.example
      ? {
          ...guide.example,
          title: capitalizeSentences(guide.example.title),
          intro: capitalizeSentences(guide.example.intro),
          steps: guide.example.steps.map((step) => ({ label: capitalizeSentences(step.label), value: capitalizeSentences(step.value) })),
          result: capitalizeSentences(guide.example.result),
          note: guide.example.note ? capitalizeSentences(guide.example.note) : guide.example.note,
        }
      : guide.example,
  } as T;
}

export function editorialVariant(key: string, count: number) {
  if (count <= 1) return 0;
  let hash = 0;
  for (const character of key) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return hash % count;
}
