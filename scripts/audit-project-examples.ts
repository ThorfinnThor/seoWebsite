import {
  PROJECT_EXAMPLES,
  PROJECT_EXAMPLE_DIRECTORIES,
} from "@/lib/project-examples";
import { SEO_TOPICS } from "@/lib/seo-topics";

const errors: string[] = [];

function wordCount(example: (typeof PROJECT_EXAMPLES)[number]) {
  return [
    example.title,
    example.intro,
    example.takeaway,
    ...example.sections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.bullets ?? [])]),
    ...(example.comparison ? [example.comparison.caption, ...example.comparison.columns, ...example.comparison.rows.flat()] : []),
    ...(example.checklist ?? []),
    ...(example.faqs ?? []).flatMap((faq) => [faq.question, faq.answer]),
    ...(example.relatedLinks ?? []).flatMap((link) => [link.label, link.description]),
    ...(example.example ? [
      example.example.title,
      example.example.intro,
      ...example.example.steps.flatMap((step) => [step.label, step.value]),
      example.example.result,
      example.example.note ?? "",
    ] : []),
    example.limitation ?? "",
  ].join(" ").trim().split(/\s+/).filter(Boolean).length;
}

function requireUnique(field: "slug" | "title" | "description" | "qualitySignature") {
  const seen = new Map<string, string>();
  for (const example of PROJECT_EXAMPLES) {
    const value = example[field];
    const previous = seen.get(value);
    if (previous) errors.push(`${example.slug}: ${field} doppelt mit ${previous}`);
    seen.set(value, example.slug);
  }
}

if (PROJECT_EXAMPLES.length !== 850) errors.push(`Erwartet 850 Projektbeispiele, gefunden ${PROJECT_EXAMPLES.length}`);
if (PROJECT_EXAMPLE_DIRECTORIES.length !== SEO_TOPICS.length) errors.push(`Erwartet ${SEO_TOPICS.length} Projektverzeichnisse, gefunden ${PROJECT_EXAMPLE_DIRECTORIES.length}`);

for (const directory of PROJECT_EXAMPLE_DIRECTORIES) {
  if (directory.examples.length !== 85) errors.push(`${directory.topicSlug}: erwartet 85 Profile, gefunden ${directory.examples.length}`);
  const variants = new Set(directory.examples.map((example) => example.variantSlug));
  const scales = new Set(directory.examples.map((example) => example.scaleSlug));
  if (variants.size !== 5) errors.push(`${directory.topicSlug}: erwartet 5 Nutzungsszenarien, gefunden ${variants.size}`);
  if (scales.size !== 17) errors.push(`${directory.topicSlug}: erwartet 17 Größenprofile, gefunden ${scales.size}`);
}

for (const field of ["slug", "title", "description", "qualitySignature"] as const) requireUnique(field);

for (const example of PROJECT_EXAMPLES) {
  const words = wordCount(example);
  if (words < 900) errors.push(`${example.slug}: nur ${words} Wörter statt mindestens 900`);
  if (example.description.length < 120 || example.description.length > 160) errors.push(`${example.slug}: Meta-Description hat ${example.description.length} Zeichen`);
  if (example.sections.length < 4) errors.push(`${example.slug}: weniger als vier eigenständige Abschnitte`);
  if ((example.checklist?.length ?? 0) < 7) errors.push(`${example.slug}: weniger als sieben Prüfschritte`);
  if ((example.faqs?.length ?? 0) < 4) errors.push(`${example.slug}: weniger als vier FAQ`);
  if ((example.sources?.length ?? 0) < 1) errors.push(`${example.slug}: keine überprüfbare Quelle`);
  if (!example.example || example.example.steps.length < 3) errors.push(`${example.slug}: Rechenkette fehlt`);
  if ((example.comparison?.rows.length ?? 0) < 4) errors.push(`${example.slug}: Vergleich beziehungsweise Gegenprobe fehlt`);
  if ((example.relatedLinks?.length ?? 0) < 4) errors.push(`${example.slug}: interne Weiterführung ist zu schwach`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  const counts = PROJECT_EXAMPLE_DIRECTORIES.map((directory) => `${directory.topicSlug}: ${directory.examples.length}`).join(", ");
  const words = PROJECT_EXAMPLES.map(wordCount);
  console.log(`Projektbeispiel-Audit bestanden: ${PROJECT_EXAMPLES.length} Profile, ${PROJECT_EXAMPLE_DIRECTORIES.length} Verzeichnisse, mindestens ${Math.min(...words)} Wörter. ${counts}.`);
}

