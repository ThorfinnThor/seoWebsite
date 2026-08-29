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

/**
 * Keeps the editorial voice conversational without changing URLs or technical
 * compounds such as "Mähroboter-Rechner". The replacements only target
 * separator punctuation used in generated prose.
 */
export function editorializeText(text: string) {
  return text
    .replace(/Erst messen, dann vergleichen/gi, "Messen und vergleichen")
    .replace(/Erst harte Kriterien, dann Vergleich/gi, "Harte Kriterien im Vergleich")
    .replace(/erst notwendig, dann komfortabel/gi, "notwendig und komfortabel")
    .replace(/Plane zuerst Werkbanktiefe, Bediengang und Werkzeugzugriff\./gi, "Werkbanktiefe, Bediengang und Werkzeugzugriff bestimmen den Arbeitsraum.")
    .replace(/Berechne zuerst Reihen und Laufmeter, dann Zuschnitt und Verschnitt\./gi, "Reihen und Laufmeter ergeben den Mengenrahmen. Zuschnitt und Verschnitt kommen als eigene Prüfung hinzu.")
    .replace(/Wenig Wasserdruck: erst messen, dann Zonen verkleinern/gi, "Wenig Wasserdruck. Zonen passend zum Anschluss planen")
    .replace(/Plane zuerst ausreichend Dach- und Zuluftöffnungen, dann passende Öffner\./gi, "Ausreichende Dach- und Zuluftöffnungen schaffen die Grundlage für passende Öffner.")
    .replace(/Öffnung zuerst festlegen/gi, "Öffnung sinnvoll einordnen")
    .replace(/verteile verbleibende Sichtschutzfelder erst danach/gi, "verteile die verbleibenden Sichtschutzfelder auf die Reststrecke")
    .replace(/teile erst danach durch den Paketinhalt; aufgerundet wird am Ende/gi, "berücksichtige den Paketinhalt und runde die Bestellmenge auf ganze Pakete")
    .replace(/Lege Türsystem und Öffnungsmaß zuerst fest\. Ergänze/gi, "Türsystem und Öffnungsmaß geben den Rahmen vor. Ergänze")
    .replace(/werden zuerst festgelegt/gi, "geben den Ausgangspunkt vor")
    .replace(/\bnicht erst nach\b/gi, "bereits vor")
    .replace(/\banschließend\b/gi, "dabei")
    .replace(/\bdanach\b/gi, "dabei")
    .replace(/\berst\b/gi, "nur")
    .replace(/\s+[–—]\s+/g, ", ")
    .replace(/\s+-\s+/g, ", ")
    .replace(/:\s+/g, ". ")
    .replace(/;\s+/g, ". ")
    .replace(/\s+·\s+/g, ", ")
    .replace(/\.{2,}/g, ".")
    .replace(/(^|[.!?]\s+)([a-zäöü])/g, (_, prefix: string, letter: string) => `${prefix}${letter.toLocaleUpperCase("de-DE")}`)
    .replace(/\s{2,}/g, " ")
    .trim();
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

export function editorializeGuide<T extends GuideLike>(guide: T): T {
  return {
    ...guide,
    title: editorializeText(guide.title),
    description: editorializeText(guide.description),
    heading: editorializeText(guide.heading),
    intro: editorializeText(guide.intro),
    takeaway: editorializeText(guide.takeaway),
    plannerLabel: editorializeText(guide.plannerLabel),
    limitation: guide.limitation ? editorializeText(guide.limitation) : guide.limitation,
    sections: guide.sections.map((section) => ({
      ...section,
      title: editorializeText(section.title),
      paragraphs: section.paragraphs.map(editorializeText),
      bullets: section.bullets?.map(editorializeText),
    })),
    comparison: guide.comparison
      ? {
          ...guide.comparison,
          caption: editorializeText(guide.comparison.caption),
          columns: guide.comparison.columns.map(editorializeText),
          rows: guide.comparison.rows.map((row) => row.map(editorializeText)),
        }
      : guide.comparison,
    checklist: guide.checklist?.map(editorializeText),
    faqs: guide.faqs?.map((faq) => ({ question: editorializeText(faq.question), answer: editorializeText(faq.answer) })),
    relatedLinks: guide.relatedLinks?.map((link) => ({
      ...link,
      label: editorializeText(link.label),
      description: editorializeText(link.description),
    })),
    sources: guide.sources?.map((source) => ({
      ...source,
      label: editorializeText(source.label),
      note: editorializeText(source.note),
    })),
    example: guide.example
      ? {
          ...guide.example,
          title: editorializeText(guide.example.title),
          intro: editorializeText(guide.example.intro),
          steps: guide.example.steps.map((step) => ({ label: editorializeText(step.label), value: editorializeText(step.value) })),
          result: editorializeText(guide.example.result),
          note: guide.example.note ? editorializeText(guide.example.note) : guide.example.note,
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
