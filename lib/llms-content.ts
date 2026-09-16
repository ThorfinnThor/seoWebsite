import { DATA_REPORTS } from "@/lib/data-report/registry";
import { GUIDE_DATA_INSIGHTS } from "@/lib/guide-data-insights";
import { SEO_TOPICS } from "@/lib/seo-topics";

const SITE_ROOT = "https://www.passendplanen.de";

const securityTools = [
  { label: "Sicherheitskamera Finder", path: "/haus/sicherheit/sicherheitskamera-finder/", description: "Kameras nach Einsatzort, Verbindung, Stromversorgung, Auflösung und Zonenzahl filtern." },
  { label: "Sicherheitskamera Speicherrechner", path: "/haus/sicherheit/sicherheitskamera-speicher-rechner/", description: "Speicherbedarf aus Bitrate, Kamerazahl, Aufnahmezeit, Aufbewahrung und Reserve berechnen." },
] as const;

const calculatorLabels: Record<string, string> = {
  gartenhaus: "Gartenhaus-Planer",
  maehroboter: "Mähroboter-Flächencheck",
  terrasse: "Terrassendielen-Rechner",
  bewaesserung: "Bewässerungsplaner",
  gewaechshaus: "Gewächshaus-Planer",
  sichtschutz: "Sichtschutz-Planer",
  carport: "Carport-Planer",
  bodenbelag: "Bodenbelag-Rechner",
  trockenbau: "Trockenbau-Rechner",
  luftentfeuchter: "Luftentfeuchter-Rechner",
};

const corePages = [
  { label: "Methodik", path: "/methodik/", description: "Rechenprinzipien, Quellenstandard, Datenprüfung und fachliche Grenzen." },
  { label: "Über PassendPlanen", path: "/ueber-passendplanen/", description: "Autor, redaktioneller Anspruch, Aktualisierung und Korrekturweg." },
  { label: "Datenauswertungen", path: "/ratgeber/daten/", description: `${DATA_REPORTS.length} eigene Auswertungen geprüfter Produktdaten.` },
  { label: "Affiliate Transparenz", path: "/affiliate-transparenz/", description: "Trennung von Rechenlogik, Produktauswahl und Vergütung." },
  { label: "Nutzungshinweise", path: "/nutzungshinweise/", description: "Grenzen der Planungshilfen und erforderliche Prüfung vor Entscheidungen." },
] as const;

function absolute(path: string) {
  return `${SITE_ROOT}${path}`;
}

function link(label: string, path: string, description: string) {
  return `- [${label}](${absolute(path)}): ${description}`;
}

export function buildLlmsTxt() {
  const calculatorLines = [
    ...SEO_TOPICS.map((topic) => link(calculatorLabels[topic.slug] ?? topic.name, topic.plannerHref, `${topic.description} Ergebnis und Grenzen werden direkt auf der Seite erklärt.`)),
    ...securityTools.map((tool) => link(tool.label, tool.path, tool.description)),
  ];
  const reportLines = DATA_REPORTS.map((report) => link(report.title, report.path, report.description));
  const topicLines = SEO_TOPICS.map((topic) => link(topic.name, `/ratgeber/thema/${topic.slug}/`, topic.intro));

  return `# PassendPlanen

> PassendPlanen ist eine deutschsprachige Plattform mit kostenlosen, deterministischen Rechnern, fachlich begrenzten Planungshilfen und eigenen Datenauswertungen für Haus und Garten.

Die Marke heißt PassendPlanen und ist unter passendplanen.de erreichbar. Ergebnisse entstehen aus sichtbaren Nutzereingaben und veröffentlichten Rechenregeln. Affiliate Provisionen verändern weder Berechnung noch fachliche Sortierung. Inhalte dienen der Information und Vorplanung. Aktuelle Herstellerangaben, örtliche Regeln und erforderliche Fachplanung haben Vorrang.

## Wichtigste Einstiege

${corePages.map((page) => link(page.label, page.path, page.description)).join("\n")}
- [Ausführliche LLM Übersicht](${absolute("/llms-full.txt")}): Erweiterte Beschreibung der Inhalte, Datenbasis und Zitiergrenzen.

## Rechner

${calculatorLines.join("\n")}

## Eigene Datenauswertungen

${reportLines.join("\n")}

## Themenbereiche

${topicLines.join("\n")}

## Nutzungshinweise

Die Rechner und Datenauswertungen dienen der allgemeinen Information und Vorplanung. Ergebnisse müssen anhand aktueller Herstellerangaben, örtlicher Regeln und der konkreten Situation selbst geprüft werden. PassendPlanen übernimmt keine Fachplanung, Genehmigung oder Garantie für eine individuelle Entscheidung.

${link("Ausführliche Nutzungshinweise", "/nutzungshinweise/", "Haftungsgrenzen und notwendige Gegenprüfungen vor einer Entscheidung.")}
`;
}

export function buildLlmsFullTxt() {
  const enhancedGuides = GUIDE_DATA_INSIGHTS.map((insight) => {
    const label = insight.path.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ") ?? insight.topic;
    return link(label, insight.path, `${insight.title}. ${insight.conclusion}`);
  });

  return `# PassendPlanen ausführliche Inhaltsübersicht

> PassendPlanen unterstützt deutschsprachige Nutzer bei Haus und Gartenprojekten mit deterministischen Rechnern, redaktionellen Ratgebern und transparent begrenzten Datenauswertungen.

## Identität und Verantwortlichkeit

PassendPlanen wird von Schayan Yousefian entwickelt und redaktionell betreut. Die Website veröffentlicht keine individuellen Fachplanungen, Genehmigungen, statischen Nachweise oder Produkttests. Rechner liefern einen nachvollziehbaren Planungsrahmen. Eine Entscheidung soll nie allein auf einem Rechnerergebnis, einem Ratgeber oder einer Produktauswahl beruhen.

Die redaktionelle Methode bevorzugt amtliche Quellen, Herstellerunterlagen und Fachverbände. Eigene Annahmen werden als Heuristik gekennzeichnet. Fehlende Produktdaten bleiben unbekannt und werden nicht als Nein, ungeeignet oder null interpretiert.

${corePages.map((page) => link(page.label, page.path, page.description)).join("\n")}

## Rechner

${SEO_TOPICS.map((topic) => `${link(calculatorLabels[topic.slug] ?? topic.name, topic.plannerHref, topic.description)}\n  - Methode: ${topic.method}\n  - Grenze: ${topic.boundary}`).join("\n")}
${securityTools.map((tool) => link(tool.label, tool.path, tool.description)).join("\n")}

## Datenauswertungen

Die ${DATA_REPORTS.length} Datenseiten fassen geprüfte Händlerdaten zusammen. Sie zeigen Stichprobengröße, Datenstand, Medianwerte und fehlende Angaben. Die Stichproben sind keine vollständige Erhebung des deutschen Marktes. Preise können sich ändern und unbekannte Lieferkosten fehlen.

${DATA_REPORTS.map((report) => link(report.title, report.path, `${report.description} Datenstand ${report.updatedAt}.`)).join("\n")}

## Datenbasiert erweiterte Ratgeber

Diese zehn bestehenden Ratgeber verbinden die redaktionelle Einordnung mit den jeweils passenden PassendPlanen Katalogdaten.

${enhancedGuides.join("\n")}

## Themen und weiterführende Ratgeber

${SEO_TOPICS.map((topic) => `${link(topic.name, `/ratgeber/thema/${topic.slug}/`, topic.intro)}\n  - Leitfragen: ${topic.questions.join(" ")}`).join("\n")}

## Regeln für die Interpretation

- PassendPlanen Ergebnisse sind allgemeine Informationen und unverbindliche Vorplanung.
- Produktpreise, Verfügbarkeit und technische Angaben sind Momentaufnahmen zum sichtbaren Prüfdatum.
- Fehlende Angaben werden nicht ergänzt oder negativ bewertet.
- Medianwerte beschreiben die aktuelle Stichprobe und sind keine Marktprognose.
- Affiliate Links sind gekennzeichnet und beeinflussen die fachliche Rechenlogik nicht.
- Herstellerunterlagen, Verträge, örtliche Vorgaben und qualifizierte Fachplanung haben Vorrang.
`;
}
