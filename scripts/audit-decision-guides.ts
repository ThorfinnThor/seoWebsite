import {
  DECISION_GUIDES,
  DECISION_GUIDE_DIRECTORIES,
} from "@/lib/decision-guides";
import { SEO_TOPICS } from "@/lib/seo-topics";

const errors: string[] = [];

function wordCount(guide: (typeof DECISION_GUIDES)[number]) {
  return [
    guide.title,
    guide.intro,
    guide.takeaway,
    ...guide.sections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.bullets ?? [])]),
    ...(guide.comparison ? [guide.comparison.caption, ...guide.comparison.columns, ...guide.comparison.rows.flat()] : []),
    ...(guide.checklist ?? []),
    ...(guide.faqs ?? []).flatMap((faq) => [faq.question, faq.answer]),
    ...(guide.relatedLinks ?? []).flatMap((link) => [link.label, link.description]),
    ...(guide.example ? [
      guide.example.title,
      guide.example.intro,
      ...guide.example.steps.flatMap((step) => [step.label, step.value]),
      guide.example.result,
      guide.example.note ?? "",
    ] : []),
    guide.limitation ?? "",
  ].join(" ").trim().split(/\s+/).filter(Boolean).length;
}

function requireUnique(field: "slug" | "title" | "description" | "qualitySignature") {
  const seen = new Map<string, string>();
  for (const guide of DECISION_GUIDES) {
    const value = guide[field];
    const previous = seen.get(value);
    if (previous) errors.push(`${guide.topicSlug}/${guide.slug}: ${field} doppelt mit ${previous}`);
    seen.set(value, `${guide.topicSlug}/${guide.slug}`);
  }
}

if (DECISION_GUIDES.length !== 1000) errors.push(`Erwartet 1.000 Direktvergleiche, gefunden ${DECISION_GUIDES.length}`);
if (DECISION_GUIDE_DIRECTORIES.length !== SEO_TOPICS.length) errors.push(`Erwartet ${SEO_TOPICS.length} Vergleichsverzeichnisse, gefunden ${DECISION_GUIDE_DIRECTORIES.length}`);

for (const directory of DECISION_GUIDE_DIRECTORIES) {
  if (directory.guides.length !== 100) errors.push(`${directory.topicSlug}: erwartet 100 Vergleiche, gefunden ${directory.guides.length}`);
  const pairs = new Set(directory.guides.map((guide) => guide.pairSlug));
  const contexts = new Set(directory.guides.map((guide) => guide.contextSlug));
  if (pairs.size !== 10) errors.push(`${directory.topicSlug}: erwartet 10 Optionspaare, gefunden ${pairs.size}`);
  if (contexts.size !== 10) errors.push(`${directory.topicSlug}: erwartet 10 Suchkontexte, gefunden ${contexts.size}`);
}

for (const field of ["slug", "title", "description", "qualitySignature"] as const) requireUnique(field);

for (const guide of DECISION_GUIDES) {
  const words = wordCount(guide);
  if (words < 1000) errors.push(`${guide.topicSlug}/${guide.slug}: nur ${words} Wörter statt mindestens 1.000`);
  if (guide.description.length < 120 || guide.description.length > 160) errors.push(`${guide.topicSlug}/${guide.slug}: Meta-Description hat ${guide.description.length} Zeichen`);
  if (guide.sections.length < 8) errors.push(`${guide.topicSlug}/${guide.slug}: weniger als acht eigenständige Abschnitte`);
  if ((guide.comparison?.rows.length ?? 0) !== 5) errors.push(`${guide.topicSlug}/${guide.slug}: Entscheidungsmatrix hat nicht genau fünf Kriterien`);
  if ((guide.checklist?.length ?? 0) < 9) errors.push(`${guide.topicSlug}/${guide.slug}: weniger als neun Prüfschritte`);
  if ((guide.faqs?.length ?? 0) < 5) errors.push(`${guide.topicSlug}/${guide.slug}: weniger als fünf FAQ`);
  if ((guide.sources?.length ?? 0) < 1) errors.push(`${guide.topicSlug}/${guide.slug}: keine überprüfbare Quelle`);
  if (!guide.example || guide.example.steps.length < 7) errors.push(`${guide.topicSlug}/${guide.slug}: gewichtete Gegenprobe fehlt`);
  if ((guide.relatedLinks?.length ?? 0) < 5) errors.push(`${guide.topicSlug}/${guide.slug}: interne Weiterführung ist zu schwach`);
  if (guide.scoreA < 1 || guide.scoreA > 5 || guide.scoreB < 1 || guide.scoreB > 5) errors.push(`${guide.topicSlug}/${guide.slug}: Orientierungswert außerhalb 1 bis 5`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  const words = DECISION_GUIDES.map(wordCount);
  const counts = DECISION_GUIDE_DIRECTORIES.map((directory) => `${directory.topicSlug}: ${directory.guides.length}`).join(", ");
  console.log(`Vergleichs-Audit bestanden: ${DECISION_GUIDES.length} Seiten, ${DECISION_GUIDE_DIRECTORIES.length} Verzeichnisse, mindestens ${Math.min(...words)} Wörter. ${counts}.`);
}
