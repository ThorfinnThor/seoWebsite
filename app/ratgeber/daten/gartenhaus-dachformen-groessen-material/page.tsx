import Link from "next/link";
import { DataReportLinks, ReportBarList, ReportMethod } from "@/components/data-report/DataReportBlocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { gardenHouseRoofReport as report } from "@/lib/data-report/additional-insights";
import { createDataReportStructuredData } from "@/lib/data-report/structured-data";
import { createPageMetadata } from "@/lib/metadata";

const PATH = "/ratgeber/daten/gartenhaus-dachformen-groessen-material/";
const title = `Gartenhaus Dachformen bei ${report.classified} Modellen`;
const description = `${report.classified} Gartenhäuser mit dokumentierter Dachform nach Grundfläche und Material ausgewertet. Warum Flachdächer im Katalog dominieren und trotzdem kein pauschaler Sieger sind.`;

export const metadata = createPageMetadata({ title, description, path: PATH, kind: "article", publishedTime: "2026-11-01", modifiedTime: "2026-11-01" });

const number = (value: number, digits = 0) => value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const euro = (value: number) => value.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export default function Page() {
  const flat = report.types.find((type) => type.key === "flat")!;

  return <main className="data-report-page roof-report-page">
    <JsonLd data={createDataReportStructuredData({ path: PATH, title, description, datasetName: "PassendPlanen Auswertung der Gartenhaus Dachformen", datasetDescription: `Auswertung von ${report.classified} geprüften Gartenhäusern mit dokumentierter Dachform nach Grundfläche, Außenmaß, Material und Angebotspreis.`, datasetSize: report.classified, variables: ["Dachform", "Material", "Grundfläche", "Außenbreite", "Außentiefe", "Angebotspreis", "Datenabdeckung"], publishedAt: "2026-11-01", updatedAt: "2026-11-01" })} />

    <header className="data-report-hero roof-report-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Datenauswertungen", href: "/ratgeber/daten/" }, { label: "Gartenhaus Dachformen" }]} />
      <div className="data-report-hero-grid">
        <div><p className="eyebrow">Dachform bei {report.classified} von {report.total} Modellen erfasst</p><h1>Flachdächer dominieren den Katalog. Das ist noch keine <em>Empfehlung.</em></h1><p>Die Dachform beeinflusst Außenwirkung, Entwässerung und nutzbare Höhe. Im Produktkatalog hängt sie aber auffällig eng mit dem Material und der angebotenen Hausgröße zusammen. Genau diese Vermischung macht pauschale Ranglisten unzuverlässig.</p></div>
        <aside><strong>{flat.metalCount} von {flat.count} Flachdachhäusern bestehen aus Metall</strong><p>Der hohe Flachdachanteil beschreibt vor allem die Zusammensetzung unseres aktuellen Sortiments. Er beweist weder eine allgemeine Marktpräferenz noch einen technischen Vorteil gegenüber Pult oder Satteldach.</p></aside>
      </div>
    </header>

    <section className="data-report-section data-split-section" aria-labelledby="roof-share-title">
      <div><p className="eyebrow">Verteilung der dokumentierten Dachformen</p><h2 id="roof-share-title">Fast acht von zehn Treffern tragen ein Flachdach.</h2><p>Von {report.total} geprüften Häusern nennen {report.classified} eine auswertbare Dachform. Die Prozentwerte beziehen sich ausschließlich auf diese klassifizierte Teilmenge. Bei {report.missing} Modellen bleibt die Dachform im Feed offen.</p><p className="data-report-reading">Die Verteilung eignet sich zur Beschreibung des Katalogs. Für die konkrete Wahl zählen zusätzlich Bauhöhe, Entwässerungsrichtung, Schneelast, Dachdeckung und die örtliche Situation.</p></div>
      <ReportBarList ariaLabel="Anteile der Gartenhaus Dachformen" items={report.types.map((type) => ({ label: type.label, value: type.count, displayValue: `${type.count} Modelle`, detail: `${number(type.share, 1)} Prozent der Häuser mit dokumentierter Dachform` }))} />
    </section>

    <section className="data-report-section data-evidence-gap" aria-labelledby="roof-material-title">
      <div><p className="eyebrow">Material und Dachform gemeinsam lesen</p><h2 id="roof-material-title">Die Dachgruppen bestehen nicht aus vergleichbaren Häusern.</h2><p>Satteldach und Pultdach sind in dieser Stichprobe überwiegend Holzkonstruktionen. Beim Flachdach kehrt sich das Verhältnis um. Unterschiede bei Fläche und Preis dürfen deshalb nicht allein der Dachform zugeschrieben werden.</p></div>
      <div className="data-gap-grid">
        {report.types.map((type) => <article key={type.key}><strong>{type.count}</strong><h3>{type.label}</h3><p>{type.woodCount} Modelle aus Holz und {type.metalCount} aus Metall. Die mittlere Grundfläche liegt bei {number(type.medianAreaM2, 1)} Quadratmetern.</p></article>)}
      </div>
    </section>

    <section className="data-report-section" aria-labelledby="roof-size-title">
      <div className="data-report-heading"><p className="eyebrow">Dachformen nach Größenklasse</p><h2 id="roof-size-title">Große Flachdachhäuser prägen das Ergebnis.</h2><p>Die Größenklassen zeigen, wo die Dachformen im vorhandenen Sortiment auftauchen. Sie sagen nicht, welche Konstruktion für eine bestimmte Fläche technisch besser geeignet ist.</p></div>
      <div className="data-table-wrap"><table>
        <caption>Anzahl der Häuser je Grundfläche und dokumentierter Dachform</caption>
        <thead><tr><th scope="col">Grundfläche</th><th scope="col">Alle</th><th scope="col">Satteldach</th><th scope="col">Flachdach</th><th scope="col">Pultdach</th></tr></thead>
        <tbody>{report.sizeBands.map((band) => <tr key={band.label}><th scope="row">{band.label}</th><td>{band.total}</td><td>{band.gable}</td><td>{band.flat}</td><td>{band.pent}</td></tr>)}</tbody>
      </table></div>
      <div className="data-callout"><strong>Preise brauchen denselben Kontext</strong><p>Der mittlere Angebotspreis reicht von {euro(Math.min(...report.types.map((type) => type.medianPriceEur)))} bis {euro(Math.max(...report.types.map((type) => type.medianPriceEur)))}. Weil Material, Grundfläche und Lieferumfang gleichzeitig wechseln, ist das kein belastbarer Preisaufschlag einer Dachform.</p></div>
    </section>

    <section className="data-report-section data-evidence-gap" aria-labelledby="roof-limit-title">
      <div><p className="eyebrow">Was der Feed nicht entscheiden kann</p><h2 id="roof-limit-title">Für die Standortprüfung fehlen ausgerechnet die entscheidenden Höhen.</h2><p>Nur {report.heightKnown} von {report.total} geprüften Häusern enthalten eine auswertbare Gesamthöhe. Traufhöhe, Firsthöhe, Dachneigung und Entwässerungsseite liegen nicht konsistent vor. Eine rechtliche oder konstruktive Freigabe wäre auf dieser Grundlage unseriös.</p></div>
      <div className="data-gap-grid">
        <article><strong>01</strong><h3>Höhen am Produkt prüfen</h3><p>Gesamthöhe, Traufe und First gehören in den Lageplan. Die Bezeichnung der Dachform ersetzt diese Maße nicht.</p></article>
        <article><strong>02</strong><h3>Wasserführung einzeichnen</h3><p>Gefälle, Rinne und Fallrohr bestimmen, wohin Niederschlag gelangt. Das ist besonders nahe an Grenzen und Wegen relevant.</p></article>
        <article><strong>03</strong><h3>Standortregeln klären</h3><p>Abstände und zulässige Größen hängen vom Bundesland und vom konkreten Grundstück ab. Produktdaten können das nicht freigeben.</p></article>
      </div>
    </section>

    <ReportMethod updated={report.updatedLabel}>
      <p>Einbezogen wurden {report.total} redaktionell geprüfte Gartenhäuser. Bei {report.classified} Modellen ließ sich die Dachform als Sattel, Flach oder Pultdach einordnen. Größen und Materialien stammen aus den dokumentierten Produktangaben. Preise sind verfügbare Angebotspreise zum Datenstand.</p>
      <p>Die Stichprobe bildet das aktuelle PassendPlanen Sortiment ab und nicht den gesamten deutschen Markt. Material, Größe, Lieferumfang und Händlerstruktur unterscheiden sich zwischen den Dachgruppen. Deshalb zeigt die Auswertung Zusammenhänge, aber keine Ursache und keinen Testsieger.</p>
    </ReportMethod>

    <section className="data-report-section data-next-step"><div><p className="eyebrow">Dachform im Projekt prüfen</p><h2>Außenmaß, Nutzung und Standort zusammenbringen.</h2><p>Der Gartenhaus Planer grenzt die benötigte Grundfläche ein. Dachhöhe, Wasserführung und örtliche Vorgaben werden anschließend am konkreten Modell und Stellplatz geprüft.</p></div><Link className="button button--primary" href="/garten/gartenhaus-planer/">Gartenhaus planen →</Link></section>
    <DataReportLinks items={[
      { href: "/ratgeber/gartenhaus-pultdach-oder-satteldach/", label: "Pultdach oder Satteldach", description: "Nutzung, Entwässerung und Standort unabhängig von der Kataloghäufigkeit abwägen." },
      { href: "/ratgeber/daten/gartenhaus-aussenmasse-grundstuecksbreite/", label: "Außenmaße im Datencheck", description: "Kurze und lange Gebäudeseite für den verfügbaren Stellplatz prüfen." },
      { href: "/garten/gartenhaus-fundament/", label: "Fundament planen", description: "Baukörper, Untergrund und notwendige Arbeitsfläche zusammen betrachten." },
    ]} />
  </main>;
}
