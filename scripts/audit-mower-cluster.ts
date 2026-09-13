import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DECISION_GUIDES } from "@/lib/decision-guides";
import { PROJECT_EXAMPLES } from "@/lib/project-examples";
import { SEO_GUIDES } from "@/lib/seo-guides";
import { getGuidesForTopic, getSeoTopic } from "@/lib/seo-topics";
import { SITE } from "@/lib/site";

type AuditRow = {
  url: string;
  pageType: string;
  intent: string;
  keyword: string;
  uniqueValue: string;
  similarPages: string;
  overlap: "niedrig" | "mittel" | "hoch";
  recommendation: string;
  reason: string;
};

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const reportPath = resolve(projectRoot, "docs/seo/maehroboter-cluster-audit-2026-09-13.md");
const siteRoot = SITE.url.replace(/\/$/, "");
const topic = getSeoTopic("maehroboter");

if (!topic) throw new Error("Mähroboter Themenbereich fehlt.");

const url = (path: string) => `${siteRoot}${path}`;
const mowerGuides = getGuidesForTopic(SEO_GUIDES, topic);
const mowerProjects = PROJECT_EXAMPLES.filter((example) => example.topicSlug === "maehroboter");
const mowerComparisons = DECISION_GUIDES.filter((guide) => guide.topicSlug === "maehroboter");

function clean(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
}

function relatedPaths(links: readonly { href: string }[] | undefined, ownPath: string) {
  const paths = (links ?? [])
    .map((link) => link.href)
    .filter((href) => href !== ownPath && href.includes("maehroboter"))
    .slice(0, 3);
  return paths.length ? paths.join(", ") : "/ratgeber/thema/maehroboter/";
}

const rows: AuditRow[] = [
  {
    url: url("/ratgeber/maehroboter-ohne-begrenzungskabel/"),
    pageType: "Ratgeber, alte URL",
    intent: "Mähroboter ohne Begrenzungskabel mit kabelgebundener Navigation vergleichen",
    keyword: "Mähroboter ohne Begrenzungskabel",
    uniqueValue: "Kein ausreichender eigener Nutzen gegenüber dem ausführlicheren Kabel oder kabellos Ratgeber",
    similarPages: "/garten/maehroboter-begrenzungskabel-kabellos/",
    overlap: "hoch",
    recommendation: "Zusammengeführt und 301 weitergeleitet",
    reason: "Suchintention und Kernaussage waren nahezu identisch. Die stärkere Zielseite enthält nun auch RTK, Kamera, LiDAR und komplexe Gartensituationen.",
  },
  {
    url: url("/ratgeber/thema/maehroboter/"),
    pageType: "Themenhub",
    intent: "Alle Mähroboter Rechner, Ratgeber, Beispiele und Vergleiche überblicken",
    keyword: "Mähroboter Ratgeber",
    uniqueValue: "Zentraler Einstieg mit fachlicher Gliederung und direkten Wegen in jede Inhaltsebene",
    similarPages: "/garten/maehroboter-rechner/, /ratgeber/projekte/maehroboter/, /ratgeber/vergleiche/maehroboter/",
    overlap: "niedrig",
    recommendation: "Behalten",
    reason: "Der Hub erfüllt eine Navigationsabsicht und bündelt die wichtigsten Unterseiten ohne deren Detailfragen zu duplizieren.",
  },
  {
    url: url("/garten/maehroboter-rechner/"),
    pageType: "Rechner",
    intent: "Passende Mähroboter Klasse aus eigenen Gartendaten berechnen",
    keyword: "Mähroboter Rechner",
    uniqueValue: "Interaktive Eingabe für Nettofläche, Komplexität, Steigung, Engstellen und Navigation mit Produktergebnissen",
    similarPages: "/garten/maehroboter-flaeche-berechnen/, /ratgeber/thema/maehroboter/",
    overlap: "niedrig",
    recommendation: "Behalten",
    reason: "Die interaktive Berechnung ist nicht durch einen redaktionellen Ratgeber ersetzbar.",
  },
  {
    url: url("/garten/maehroboter-flaeche-berechnen/"),
    pageType: "Ratgeber",
    intent: "Netto Rasenfläche und sinnvolle Flächenreserve bestimmen",
    keyword: "Mähroboter Fläche berechnen",
    uniqueValue: "Messmethode für Teilflächen, Abzüge und Kapazitätsreserve",
    similarPages: "/garten/maehroboter-rechner/, /ratgeber/maehroboter-fuer-500-qm/",
    overlap: "niedrig",
    recommendation: "Behalten",
    reason: "Die Seite beantwortet die vorgelagerte Messfrage und nicht die vollständige Produktauswahl.",
  },
  {
    url: url("/garten/maehroboter-steigung-engstellen/"),
    pageType: "Ratgeber",
    intent: "Steigung und engste Passage eines Gartens korrekt messen",
    keyword: "Mähroboter Steigung und Engstellen",
    uniqueValue: "Konkrete Messanleitung für zwei harte technische Ausschlusskriterien",
    similarPages: "/ratgeber/maehroboter-fuer-hanglage/, /garten/maehroboter-rechner/",
    overlap: "mittel",
    recommendation: "Behalten",
    reason: "Die Messanleitung ist enger als die Produktauswahl für Hanglagen und hat einen eigenen Arbeitsschritt als Suchziel.",
  },
  {
    url: url("/garten/maehroboter-begrenzungskabel-kabellos/"),
    pageType: "Ratgeber",
    intent: "Begrenzungskabel und kabellose Navigationssysteme grundsätzlich vergleichen",
    keyword: "Mähroboter Begrenzungskabel oder kabellos",
    uniqueValue: "Systemvergleich für Kabel, RTK, Kamera, LiDAR, Installation, Standort und spätere Änderungen",
    similarPages: "/ratgeber/maehroboter-rtk-oder-lidar/, /ratgeber/vergleiche/maehroboter/maehroboter-begrenzungskabel-oder-rtk-500-qm/",
    overlap: "mittel",
    recommendation: "Behalten und als konsolidierte Zielseite verwenden",
    reason: "Sie deckt die allgemeine Systementscheidung ab. Spezifische Technikpaare und Gartensituationen bleiben davon unterscheidbar.",
  },
  {
    url: url("/ratgeber/projekte/maehroboter/"),
    pageType: "Beispielverzeichnis",
    intent: "Konkrete Mähroboter Rechenfälle nach Fläche und Gartensituation finden",
    keyword: "Mähroboter Rechenbeispiele",
    uniqueValue: "Filterbarer Zugang zu 85 transparenten Eingaben, Berechnungen und Gegenproben",
    similarPages: "/ratgeber/thema/maehroboter/, /ratgeber/vergleiche/maehroboter/",
    overlap: "niedrig",
    recommendation: "Behalten",
    reason: "Das Verzeichnis besitzt eine klare Navigationsfunktion und verhindert eine mechanische Vollverlinkung aller Fälle vom Hub.",
  },
  {
    url: url("/ratgeber/vergleiche/maehroboter/"),
    pageType: "Vergleichsverzeichnis",
    intent: "Mähroboter Navigationssysteme für konkrete Gartensituationen vergleichen",
    keyword: "Mähroboter Navigation Vergleich",
    uniqueValue: "Filterbarer Zugang zu 100 Paarungen mit identischer Bewertungsmethodik",
    similarPages: "/ratgeber/thema/maehroboter/, /garten/maehroboter-begrenzungskabel-kabellos/",
    overlap: "niedrig",
    recommendation: "Behalten",
    reason: "Das Verzeichnis bündelt Vergleichsabsichten und bildet keine einzelne Paarung oder Situation nach.",
  },
  ...mowerGuides.map((guide): AuditRow => {
    const ownPath = `/ratgeber/${guide.slug}/`;
    const overlap = ["maehroboter-fuer-500-qm", "maehroboter-fuer-hanglage", "maehroboter-rtk-oder-lidar"].includes(guide.slug)
      ? "mittel"
      : "niedrig";
    return {
      url: url(ownPath),
      pageType: "Ratgeber",
      intent: guide.heading,
      keyword: guide.title,
      uniqueValue: guide.takeaway,
      similarPages: relatedPaths(guide.relatedLinks, ownPath),
      overlap,
      recommendation: "Behalten",
      reason: overlap === "mittel"
        ? "Einzelne Begriffe überschneiden sich mit Messhilfen oder Rechenfällen, die Seite beantwortet jedoch eine eigenständige Auswahlfrage."
        : "Die Seite besitzt eine klar abgegrenzte Garten, Flächen oder Kaufentscheidung und führt kontextuell weiter.",
    };
  }),
  ...mowerProjects.map((example): AuditRow => {
    const ownPath = `/ratgeber/projekte/maehroboter/${example.slug}/`;
    return {
      url: url(ownPath),
      pageType: "Projektbeispiel",
      intent: `${example.scaleSlug.replace("-qm", " m²")} Rasen im Kontext ${example.variantLabel} nachvollziehbar berechnen`,
      keyword: example.title,
      uniqueValue: example.example?.result ?? example.directoryCard.result,
      similarPages: relatedPaths(example.relatedLinks, ownPath),
      overlap: "mittel",
      recommendation: "Behalten, noindex fortführen",
      reason: "Der konkrete Rechenweg ist für Nutzer eigenständig. Wegen der systematischen Varianten bleibt die Detail URL bis zu einer gesonderten redaktionellen Intent Prüfung außerhalb des Index.",
    };
  }),
  ...mowerComparisons.map((guide): AuditRow => {
    const ownPath = `/ratgeber/vergleiche/maehroboter/${guide.slug}/`;
    return {
      url: url(ownPath),
      pageType: "Direktvergleich",
      intent: `${guide.optionA} und ${guide.optionB} für ${guide.contextLabel} vergleichen`,
      keyword: guide.title,
      uniqueValue: guide.takeaway,
      similarPages: relatedPaths(guide.relatedLinks, ownPath),
      overlap: "mittel",
      recommendation: guide.indexable ? "Behalten und indexierbar" : "Behalten, noindex fortführen",
      reason: guide.indexable
        ? "Der Vergleich wurde eigenständig redaktionell geprüft, gegenüber benachbarten Intents abgegrenzt und besteht das vollständige Indexierungs Gate."
        : "Die Paarung und Situation sind als Entscheidungshilfe nutzbar. Ohne explizite redaktionelle Freigabe bleibt die programmatisch erzeugte Detail URL bewusst außerhalb des Index.",
    };
  }),
];

const activeRows = rows.filter((row) => !row.pageType.includes("alte URL"));
const highOverlapRows = rows.filter((row) => row.overlap === "hoch");
const noindexRows = rows.filter((row) => row.recommendation.includes("noindex"));

if (mowerGuides.length !== 12) throw new Error(`Erwartet 12 Mähroboter Ratgeber, gefunden ${mowerGuides.length}.`);
if (mowerProjects.length !== 85) throw new Error(`Erwartet 85 Mähroboter Projektbeispiele, gefunden ${mowerProjects.length}.`);
if (mowerComparisons.length !== 100) throw new Error(`Erwartet 100 Mähroboter Direktvergleiche, gefunden ${mowerComparisons.length}.`);
if (activeRows.length !== 204) throw new Error(`Erwartet 204 aktive Cluster URLs, gefunden ${activeRows.length}.`);
if (new Set(rows.map((row) => row.url)).size !== rows.length) throw new Error("Doppelte URL im Mähroboter Audit.");

const tableRows = rows.map((row) => `| ${clean(row.url)} | ${clean(row.pageType)} | ${clean(row.intent)} | ${clean(row.keyword)} | ${clean(row.uniqueValue)} | ${clean(row.similarPages)} | ${row.overlap} | ${clean(row.recommendation)} | ${clean(row.reason)} |`).join("\n");

const report = `# Mähroboter Cluster Audit

Stand 13. September 2026

## Ergebnis

Der vollständige Cluster umfasst nach der Konsolidierung ${activeRows.length} aktive Inhalts URLs. Hinzu kommt eine alte URL, die dauerhaft auf die stärkere Zielseite weitergeleitet wird. Jede aktive Detail URL wurde nach Seitentyp, Suchintention, eigenständigem Nutzen und Überschneidungsrisiko eingeordnet.

* ${mowerGuides.length} redaktionelle Ratgeber
* ${mowerProjects.length} Projektbeispiele
* ${mowerComparisons.length} Direktvergleiche
* 1 Themenhub, 1 Rechner, 3 vertiefende Planungsratgeber und 2 Verzeichnisse
* ${noindexRows.length} bewusst nicht indexierbare programmatic Detailseiten

## Hohe Überschneidung

${highOverlapRows.map((row) => `* ${row.url} wurde mit ${siteRoot}/garten/maehroboter-begrenzungskabel-kabellos/ zusammengeführt. Der eigenständige Inhalt zu RTK, Kamera, LiDAR und komplexen Gartensituationen befindet sich nun auf der Zielseite. Die alte URL liefert nach dem Deployment eine permanente 301 Weiterleitung.`).join("\n")}

Weitere aktive URLs mit hoher Überschneidung wurden nicht bestätigt. Flächenratgeber, Messanleitungen, konkrete Rechenfälle und kontextbezogene Paarvergleiche berühren sich sprachlich, erfüllen aber unterschiedliche Aufgaben.

## Indexierungsentscheidung

Die 85 Projektbeispiele und 99 nicht gesondert freigegebenen Direktvergleiche bleiben crawlbar und für Nutzer erreichbar, tragen jedoch weiterhin noindex, follow und fehlen in der Sitemap. Der redaktionell ausgearbeitete Vergleich für 500 m² mit Begrenzungskabel oder RTK besteht das explizite Indexierungs Gate und bleibt indexierbar.

Das Gate prüft eine dokumentierte redaktionelle Freigabe, den exakten Canonical Pfad, den eigenständigen Suchintent, die Abgrenzung gegenüber ähnlichen Seiten, vollständige Seitensignale, ausreichende inhaltliche Bausteine, Quellen und interne Links. Es verwendet keine Mindestwortzahl und keine maximale Seitenzahl.

## Entscheidung pro URL

| URL | Seitentyp | Primäre Suchintention | Hauptkeyword | Eigenständiger Nutzen | Ähnliche Seiten | Überschneidung | Empfehlung | Begründung |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${tableRows}

## Technische Folgen

* Die alte Ratgeber URL ist nicht mehr Teil der generierten Seiten oder Sitemap.
* Sämtliche internen Links verweisen auf die konsolidierte Zielseite.
* Die Zielseite besitzt weiterhin ein Self Canonical.
* Die alte URL wird mit HTTP 301 direkt auf die Zielseite geleitet.
* Neue Vergleichsseiten sind ohne bestandene, dokumentierte Qualitätsprüfung nicht indexierbar.
* Ausgewählte Rechenfälle und Vergleiche sind direkt vom Themenhub erreichbar.
`;

if (process.argv.includes("--write")) {
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, report, "utf8");
  console.log(`Mähroboter Cluster Audit geschrieben: ${reportPath}`);
} else {
  const existing = await readFile(reportPath, "utf8").catch(() => "");
  if (existing !== report) {
    console.error("Mähroboter Cluster Audit ist nicht aktuell. Führe npm run generate:seo:mower-report aus.");
    process.exitCode = 1;
  } else {
    console.log(`Mähroboter Cluster Audit aktuell: ${rows.length} URL Entscheidungen, ${activeRows.length} aktive URLs.`);
  }
}
