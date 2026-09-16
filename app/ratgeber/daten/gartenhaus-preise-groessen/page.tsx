import Link from "next/link";
import { DataReportLinks, ReportBarList, ReportMethod, ReportMetricGrid } from "@/components/data-report/DataReportBlocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { gardenHouseDataReport as report } from "@/lib/data-report/catalog-insights";
import { createDataReportStructuredData } from "@/lib/data-report/structured-data";
import { createPageMetadata } from "@/lib/metadata";

const PATH = "/ratgeber/daten/gartenhaus-preise-groessen/";
const title = "Gartenhauspreise und Größen. 333 Modelle im Datencheck";
const description = "333 geprüfte Gartenhäuser nach Grundfläche, Material, Dachform und Angebotspreis ausgewertet. Mit Größenklassen, Preisbereichen und offen ausgewiesenen Datenlücken.";

export const metadata = createPageMetadata({ title, description, path: PATH, kind: "article", modifiedTime: "2026-09-16" });

const euro = (value: number) => value.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const number = (value: number, digits = 0) => value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export default function Page() {
  const wood = report.materials.find((item) => item.key === "wood")!;
  const metal = report.materials.find((item) => item.key === "metal")!;

  return <main className="data-report-page data-report-page--garden-house">
    <JsonLd data={createDataReportStructuredData({ path: PATH, title, description, datasetName: "PassendPlanen Auswertung geprüfter Gartenhäuser", datasetDescription: `Auswertung von ${report.total} geprüften Gartenhäusern nach Grundfläche, Material, Dachform und Angebotspreis.`, datasetSize: report.total, variables: ["Grundfläche", "Material", "Dachform", "Angebotspreis", "Wandstärke"], updatedAt: "2026-09-16" })} />
    <header className="data-report-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Datenauswertungen", href: "/ratgeber/daten/" }, { label: "Gartenhäuser" }]} />
      <div className="data-report-hero-grid">
        <div><p className="eyebrow">PassendPlanen Datenauswertung</p><h1>Gartenhauspreise und Größen. <em>333 Modelle</em> im Datencheck.</h1><p>Der reine Preis sagt wenig aus, solange Grundfläche und Material nicht mitbetrachtet werden. Unsere Stichprobe zeigt zwei sehr unterschiedliche Sortimente und macht zugleich sichtbar, welche wichtigen Angaben in Händlerdaten häufig fehlen.</p></div>
        <aside><strong>Die wichtigste Einordnung</strong><p>Metallhäuser bilden in unserer Stichprobe meist eine größere und deutlich höherpreisige Produktgruppe. Daraus folgt kein allgemeiner Materialsieger. Die ausgewerteten Händler und Sortimente prägen das Ergebnis.</p></aside>
      </div>
    </header>

    <section className="data-report-section data-report-section--metrics" aria-labelledby="garden-overview">
      <div className="data-report-heading"><p className="eyebrow">Der Katalog in vier Zahlen</p><h2 id="garden-overview">Die typische Mitte liegt nicht beim kleinen Geräteschuppen.</h2></div>
      <ReportMetricGrid ariaLabel="Kennzahlen der Gartenhausauswertung" items={[
        { value: report.total.toLocaleString("de-DE"), label: "geprüfte Gartenhäuser", note: `${report.brands} Marken in der aktuellen Stichprobe` },
        { value: `${number(report.summary.medianAreaM2, 1)} m²`, label: "mittlere Grundfläche", note: "Median aller verfügbaren Modelle" },
        { value: euro(report.summary.medianPriceEur), label: "mittlerer Angebotspreis", note: "Produktpreis ohne unbekannte Lieferkosten" },
        { value: euro(report.summary.medianPricePerM2Eur), label: "mittlerer Preis je Quadratmeter", note: "Nur rechnerische Orientierung" },
      ]} />
      <p className="data-report-reading">Die Hälfte der erfassten Angebotspreise liegt zwischen {euro(report.summary.lowerPriceEur)} und {euro(report.summary.upperPriceEur)}. Diese Spanne ist aussagekräftiger als ein einzelner Durchschnitt, weil sehr kleine Gerätehäuser und große Gartenbauten gemeinsam im Katalog stehen.</p>
    </section>

    <section className="data-report-section data-split-section" aria-labelledby="garden-materials">
      <div>
        <p className="eyebrow">Material verändert die Stichprobe</p>
        <h2 id="garden-materials">Holz und Metall liegen nicht in derselben Größenklasse.</h2>
        <p>Von den {report.total} Modellen bestehen {metal.count} aus Metall und {wood.count} aus Holz. Kunststoff ist im aktuell geprüften Bestand nicht vertreten. Die Metallmodelle sind mit einer mittleren Grundfläche von {number(metal.medianAreaM2, 1)} Quadratmetern größer als die Holzhäuser mit {number(wood.medianAreaM2, 1)} Quadratmetern.</p>
        <p>Auch der Preis je Quadratmeter unterscheidet sich. In dieser Stichprobe liegt der Median bei Holz bei {euro(wood.medianPricePerM2Eur)} und bei Metall bei {euro(metal.medianPricePerM2Eur)}. Das darf nicht als allgemeiner Materialaufschlag gelesen werden. Markenmix, Baugröße und Lieferumfang sind unterschiedlich.</p>
      </div>
      <ReportBarList ariaLabel="Materialverteilung der Gartenhäuser" maxValue={report.total} items={report.materials.map((item) => ({ label: item.label, value: item.count, displayValue: `${item.count} Modelle`, detail: item.count > 0 ? `${number(item.share, 1)} Prozent der Stichprobe` : "Im aktuellen Katalog nicht vertreten" }))} />
    </section>

    <section className="data-report-section" aria-labelledby="garden-size-table">
      <div className="data-report-heading"><p className="eyebrow">Vier Größenklassen</p><h2 id="garden-size-table">Zwischen fünf und zwanzig Quadratmetern wächst der Preis besonders deutlich.</h2><p>Die Tabelle verwendet für jede Größenklasse den Median. Dadurch beeinflussen einzelne sehr teure oder sehr günstige Modelle das Bild weniger stark.</p></div>
      <div className="data-table-wrap"><table>
        <caption>Grundfläche und Angebotspreise nach Größenklasse</caption>
        <thead><tr><th scope="col">Größenklasse</th><th scope="col">Modelle</th><th scope="col">Mittlere Fläche</th><th scope="col">Mittlerer Preis</th><th scope="col">Preis je m²</th></tr></thead>
        <tbody>{report.sizes.map((item) => <tr key={item.label}><th scope="row">{item.label}</th><td>{item.count}</td><td>{number(item.medianAreaM2, 1)} m²</td><td>{euro(item.medianPriceEur)}</td><td>{euro(item.medianPricePerM2Eur)}</td></tr>)}</tbody>
      </table></div>
      <div className="data-callout"><strong>Was daraus für die Planung folgt</strong><p>Ein größeres Außenmaß bringt nicht automatisch denselben Nutzwert. Türlage, Innenhöhe, Dachschrägen, Wandaufbau und benötigte Bewegungsfläche müssen zum geplanten Inhalt passen. Die Grundfläche ist ein sinnvoller erster Filter, aber keine vollständige Kaufentscheidung.</p></div>
    </section>

    <section className="data-report-section data-split-section data-split-section--reverse" aria-labelledby="garden-roofs">
      <ReportBarList ariaLabel="Dachformen im Gartenhauskatalog" maxValue={report.total} items={report.roofs.map((item) => ({ label: item.label, value: item.count, displayValue: `${item.count} Modelle`, detail: `${number(item.share, 1)} Prozent` }))} />
      <div><p className="eyebrow">Dachform mit Lücke</p><h2 id="garden-roofs">Bei 87 Modellen bleibt die Dachform unklar.</h2><p>Das Flachdach ist mit {report.roofs.find((item) => item.label === "Flachdach")?.count} Modellen am häufigsten dokumentiert. Für 87 Produkte lässt sich die Dachform aus den geprüften Angaben jedoch nicht belastbar ableiten.</p><p>Diese Lücke ist praktisch relevant. Dachform und Dachneigung beeinflussen Innenhöhe, Entwässerung, Schneelast und häufig auch die zulässige Dacheindeckung. Ein fehlender Wert darf nicht durch eine Vermutung ersetzt werden.</p></div>
    </section>

    <section className="data-report-section data-evidence-gap" aria-labelledby="garden-gaps">
      <div><p className="eyebrow">Die auffälligste Erkenntnis</p><h2 id="garden-gaps">Preis und Außenmaß sind gut vergleichbar. Der Lieferumfang ist es oft nicht.</h2></div>
      <div className="data-gap-grid">
        <article><strong>{report.coverage.wallThickness} von {report.total}</strong><h3>Wandstärke dokumentiert</h3><p>Eine belastbare Gegenüberstellung der Wandstärken wäre mit dieser Abdeckung irreführend. Deshalb wird daraus keine Rangliste erzeugt.</p></article>
        <article><strong>{report.coverage.floorIncluded} von {report.total}</strong><h3>Bodenstatus eindeutig</h3><p>Aus Produktnamen allein lässt sich ein vollständiger Fußboden nicht sicher ableiten. Vor dem Kauf müssen Boden, Unterkonstruktion und Fundament separat geprüft werden.</p></article>
        <article><strong>{report.coverage.roofType} von {report.total}</strong><h3>Dachform bekannt</h3><p>Die Dachauswertung ist möglich, enthält aber einen sichtbaren unbekannten Anteil. Genau dieser Anteil bleibt in den Diagrammen erhalten.</p></article>
      </div>
    </section>

    <ReportMethod updated={report.updatedLabel}>
      <p>Ausgewertet wurden alle als geprüft markierten Gartenhäuser im öffentlichen PassendPlanen Katalog. Pro Produkt wurde der günstigste aktuell verfügbare Angebotspreis verwendet. Unbekannte Lieferkosten sind nicht eingerechnet. Grundfläche und Preis je Quadratmeter beruhen auf den dokumentierten Außenmaßen.</p>
      <p>Die Stichprobe umfasst die freigeschalteten Händlerprogramme von PassendPlanen und ist keine repräsentative Erhebung des gesamten Marktes. Fehlende Eigenschaften bleiben unbekannt. Sie werden weder als Nein noch als ungeeignet gewertet.</p>
      <p><Link href="/methodik/">Die allgemeine Prüfmethode ansehen</Link> und <Link href="/affiliate-transparenz/">die Finanzierung durch Affiliate Links nachvollziehen</Link>.</p>
    </ReportMethod>

    <section className="data-report-section data-next-step" aria-labelledby="garden-next-step">
      <div><p className="eyebrow">Aus Daten wird erst mit deinem Projekt eine Auswahl</p><h2 id="garden-next-step">Fläche, Zugang und Nutzung gemeinsam prüfen.</h2><p>Der Gartenhaus Planer berechnet aus Fahrrädern, Geräten, Werkbank und Regalen einen persönlichen Flächenrahmen. Anschließend kannst du die geprüften Modelle nach Außenmaß, Material, Dach und Budget filtern.</p></div>
      <Link className="button button--primary" href="/garten/gartenhaus-planer/">Gartenhaus planen →</Link>
    </section>
    <DataReportLinks items={[
      { href: "/ratgeber/gartenhaus-kosten-vergleich/", label: "Gartenhauskosten vollständig vergleichen", description: "Fundament, Lieferung und Aufbau neben dem Produktpreis berücksichtigen." },
      { href: "/ratgeber/gartenhaus-holz-oder-metall/", label: "Holz oder Metall", description: "Materialeigenschaften für die konkrete Nutzung einordnen." },
      { href: "/garten/gartenhaus-groesse/", label: "Gartenhausgröße berechnen", description: "Nutzfläche und Bewegungsreserve nachvollziehbar bestimmen." },
    ]} />
  </main>;
}
