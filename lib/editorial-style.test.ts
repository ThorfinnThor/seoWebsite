import { describe, expect, it } from "vitest";
import { DECISION_GUIDE_DIRECTORIES, DECISION_GUIDES } from "@/lib/decision-guides";
import { PROJECT_EXAMPLE_DIRECTORIES, PROJECT_EXAMPLES } from "@/lib/project-examples";
import { SEO_GUIDES_SCENARIOS } from "@/lib/seo-guides-scenarios";
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
    expect(prose).not.toMatch(/\b(?:erst|danach|anschließend|zuerst)\b/i);
  });

  it("keeps calculated results grammatically connected to their sentences", () => {
    const projectProse = PROJECT_EXAMPLES.flatMap(visibleText).join(" ");
    const scenarioProse = SEO_GUIDES.flatMap(visibleText).join(" ");

    expect(projectProse).not.toMatch(/(?:ergibt sich|Ergebnis lautet|Rechnung führt zu)\s+\d+(?:[,.]\d+)?\s*m²\s+bleiben/i);
    expect(projectProse).not.toMatch(/(?:ergibt sich|Daraus folgt)\s+(?:Modelle|Geräte).+?\bprüfen\b/i);
    expect(projectProse).not.toMatch(/wenn .{0,300}? und (?:Bei|Mit|Ohne)\b.{0,300}?nebeneinander notiert werden/i);
    expect(projectProse).not.toMatch(/\bwerden Für das Profil\b/);
    expect(scenarioProse).not.toMatch(/Die Rechnung lautet (?:Bei|Aus|Für|Mit)\b/);
    expect(scenarioProse).not.toMatch(/Daraus ergibt sich .{0,300}?\bbleiben\b/i);
    expect(scenarioProse).not.toMatch(/\. (?:Und muss|Ist ein offener Planungsrahmen)\b/);
    expect(scenarioProse).not.toMatch(/liegt bei (?:kleine Zonen|rund \d+ laufende Meter|min(?:destens)?.+nutzbare Breite)/i);
    expect(scenarioProse).not.toMatch(/Als Ergebnis ergibt sich/i);
    expect(scenarioProse).not.toMatch(/umfasst (?:rund [\d,]+ l\/min gemeinsamer Bedarf|kleine Zonen|ein zu verifizierender)/i);
    expect(scenarioProse).not.toMatch(/ergibt sich (?:[\d,]+ m² zu bewertende|[\d,]+ m separat aufzuteilende)/i);
    expect(scenarioProse).not.toMatch(/Nutzbar sind .{0,80}? nutzbare\b/i);
    expect(scenarioProse).not.toMatch(/Als Auswahlgrundlage gelten .{0,120}? als Auswahlgrundlage\b/i);
  });

  it("retains several editorial section layouts", () => {
    const layouts = new Set(
      [...SEO_GUIDES, ...DECISION_GUIDES, ...PROJECT_EXAMPLES].map((guide) => guide.sections.map((section) => section.title).join("|")),
    );

    expect(layouts.size).toBeGreaterThan(100);
  });

  it("gives generated guides individual section headings", () => {
    const headings = [...SEO_GUIDES, ...DECISION_GUIDES, ...PROJECT_EXAMPLES]
      .flatMap((guide) => guide.sections.map((section) => section.title));
    const frequencies = new Map<string, number>();
    headings.forEach((heading) => frequencies.set(heading, (frequencies.get(heading) ?? 0) + 1));

    expect(headings.length).toBeGreaterThan(11_000);
    expect(frequencies.size / headings.length).toBeGreaterThan(0.999);
    expect(Math.max(...frequencies.values())).toBeLessThanOrEqual(2);
  });

  it("keeps directory copy free from dash and colon styling", () => {
    const values = [...DECISION_GUIDE_DIRECTORIES, ...PROJECT_EXAMPLE_DIRECTORIES]
      .flatMap((directory) => [directory.title, directory.description]);

    expect(values.some((value) => /[-–—:]/.test(value))).toBe(false);
  });

  it("keeps project cards factual instead of manufacturing editorial variants", () => {
    const cardText = PROJECT_EXAMPLES
      .flatMap((example) => [example.directoryCard.title, example.directoryCard.result, example.directoryCard.alternative, example.directoryCard.check])
      .join(" ");

    expect(cardText).not.toContain("dient der Wert als Arbeitsrahmen");
    expect(cardText).not.toContain("Eine technische Freigabe für");
    expect(cardText).not.toContain("Nicht das Ausgangsmaß allein entscheidet");
    expect(cardText).not.toContain("Der ausgewiesene Rahmen berücksichtigt");

    for (const directory of PROJECT_EXAMPLE_DIRECTORIES) {
      const variants = new Set(directory.examples.map((example) => example.variantSlug));
      for (const variant of variants) {
        const cards = directory.examples.filter((example) => example.variantSlug === variant);

        expect(cards).toHaveLength(17);
        expect(new Set(cards.map((example) => example.directoryCard.title)).size).toBe(cards.length);
      }
    }
  });

  it("uses a genuinely different countercheck for open mower areas", () => {
    const examples = PROJECT_EXAMPLES.filter((example) => example.topicSlug === "maehroboter" && example.variantSlug === "offen");

    for (const example of examples) {
      const mainValue = example.directoryCard.result.match(/etwa (\d+) m²/)?.[1];
      const alternative = example.example?.steps.find((step) => step.label === "Gegenprobe")?.value.match(/etwa (\d+) m²/)?.[1];

      expect(mainValue).toBeDefined();
      expect(alternative).toBeDefined();
      expect(alternative).not.toBe(mainValue);
    }
  });

  it("uses a different module width for every privacy-screen countercheck", () => {
    const examples = PROJECT_EXAMPLES.filter((example) => example.topicSlug === "sichtschutz");

    for (const example of examples) {
      const mainWidth = example.comparison?.rows.find((row) => row[0] === "Montagebreite")?.[1];
      const alternativeWidth = example.example?.steps.find((step) => step.label === "Gegenprobe")?.value.match(/mit ([\d,]+ m) Montagebreite/i)?.[1];

      expect(mainWidth).toBeDefined();
      expect(alternativeWidth).toBeDefined();
      expect(alternativeWidth).not.toBe(mainWidth);
    }
  });

  it("subtracts the gate opening from privacy-screen runs", () => {
    const example = PROJECT_EXAMPLES.find((candidate) => candidate.slug === "sichtschutz-3-meter-180-mit-tor");

    expect(example).toBeDefined();
    expect(example?.comparison?.rows.find((row) => row[0] === "Angenommene Torlichte")?.[1]).toBe("1 m");
    expect(example?.comparison?.rows.find((row) => row[0] === "Verfügbare Zaunlänge")?.[1]).toBe("2 m");
    expect(example?.comparison?.rows.find((row) => row[0] === "Elemente")?.[1]).toBe("2");
    expect(example?.directoryCard.result).toContain("ein Torfeld");
  });

  it("does not let one paragraph dominate the indexable editorial guides", () => {
    const paragraphs = SEO_GUIDES.flatMap((guide) =>
      guide.sections.flatMap((section) => section.paragraphs.map((paragraph) => paragraph.replace(/\s+/g, " ").trim())),
    );
    const frequencies = new Map<string, number>();
    paragraphs.forEach((paragraph) => frequencies.set(paragraph, (frequencies.get(paragraph) ?? 0) + 1));
    const mostFrequent = Math.max(...frequencies.values());

    expect(paragraphs.length).toBeGreaterThan(400);
    expect(frequencies.size / paragraphs.length).toBeGreaterThan(0.95);
    expect(mostFrequent).toBeLessThanOrEqual(4);
  });

  it("gives every scenario guide individual editorial headings without the old templates", () => {
    const headings = SEO_GUIDES_SCENARIOS.flatMap((guide) => guide.sections.map((section) => section.title));
    const prose = SEO_GUIDES_SCENARIOS.flatMap(visibleText).join(" ");

    expect(SEO_GUIDES_SCENARIOS).toHaveLength(47);
    expect(headings).toHaveLength(188);
    expect(new Set(headings).size).toBe(headings.length);
    expect(prose).not.toMatch(/Was im Szenario|Wo das Szenario|Die Situation im Szenario|Was die Zahl im Szenario/);
    expect(prose).not.toContain("Im Szenario");
    expect(headings.join(" ")).not.toMatch(/Acht Hundert|Fünf Hundert|Hundert Fünfundzwanzig|Zweihundert Fünfzig/);

    for (const guide of SEO_GUIDES_SCENARIOS) {
      const optionA = guide.comparison?.rows.find((row) => row[0] === "Variante A")?.[1];
      const optionB = guide.comparison?.rows.find((row) => row[0] === "Variante B")?.[1];
      const editorialCopy = [
        ...guide.sections.flatMap((section) => section.paragraphs),
        ...(guide.checklist ?? []),
        ...(guide.faqs ?? []).map((faq) => faq.answer),
      ].join(" ");

      expect(optionA).toBeDefined();
      expect(optionB).toBeDefined();
      expect(editorialCopy).not.toContain(`${optionA}.`);
      expect(editorialCopy).not.toContain(`${optionB}.`);
      const bareOptionVerbs = [`„${optionA}“ gehört`, `„${optionB}“ wird`, `„${optionB}“ muss`];
      expect(bareOptionVerbs.some((fragment) =>
        editorialCopy.startsWith(fragment) || editorialCopy.includes(`. ${fragment}`),
      )).toBe(false);
      expect(guide.faqs?.some((faq) => /\bbei\b/i.test(faq.question))).toBe(false);
      const optionQuestion = guide.faqs?.[2]?.question ?? "";
      expect(optionQuestion.includes(optionA ?? "") && !optionQuestion.includes(`„${optionA}“`)).toBe(false);
      expect(optionQuestion.includes(optionB ?? "") && !optionQuestion.includes(`„${optionB}“`)).toBe(false);
    }
  });

  it("varies the generated page furniture as well as the body copy", () => {
    const generated = [...DECISION_GUIDES, ...PROJECT_EXAMPLES];
    const values = [
      ...generated.map((guide) => guide.intro),
      ...generated.map((guide) => guide.takeaway),
      ...generated.flatMap((guide) => guide.checklist ?? []),
      ...generated.map((guide) => guide.example?.intro ?? ""),
    ].map((value) => value.replace(/\s+/g, " ").trim());
    const frequencies = new Map<string, number>();
    values.forEach((value) => frequencies.set(value, (frequencies.get(value) ?? 0) + 1));

    expect(Math.max(...frequencies.values())).toBeLessThan(100);
  });
});
