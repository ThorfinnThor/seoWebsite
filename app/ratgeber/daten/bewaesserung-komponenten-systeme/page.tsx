import Link from "next/link";
import { DataReportLinks, ReportBarList, ReportMethod, ReportMetricGrid } from "@/components/data-report/DataReportBlocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { irrigationDataReport as report } from "@/lib/data-report/catalog-insights";
import { createDataReportStructuredData } from "@/lib/data-report/structured-data";
import { createPageMetadata } from "@/lib/metadata";

const PATH = "/ratgeber/daten/bewaesserung-komponenten-systeme/";
const title = "84 Bewässerungsprodukte im Datencheck. Einzelteile und Systemplanung";
const description = "84 geprüfte Bewässerungsprodukte nach Bauteilart, Preis und dokumentierter Planungstiefe ausgewertet. Warum Produktzahl und Systemvollständigkeit nicht dasselbe sind.";

export const metadata = createPageMetadata({ title, description, path: PATH, kind: "article", modifiedTime: "2026-09-16" });

const euro = (value: number) => value.toLocaleString("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Page() {
  const distributionCore = report.kinds.filter((item) => ["pipe", "connector", "sprinkler", "dripline"].includes(item.key)).reduce((sum, item) => sum + item.count, 0);

  return <main className="data-report-page data-report-page--irrigation">
    <JsonLd data={createDataReportStructuredData({ path: PATH, title, description, datasetName: "PassendPlanen Auswertung geprüfter Bewässerungsprodukte", datasetDescription: `Auswertung von ${report.total} geprüften Bewässerungsprodukten nach Bauteilart, Angebotspreis und dokumentierter Planungstiefe.`, datasetSize: report.total, variables: ["Bauteilart", "Marke", "Angebotspreis", "Rohrdurchmesser", "Zonenanzahl", "Smart Kompatibilität", "benötigtes Zubehör"], updatedAt: "2026-09-16" })} />
    <header className="data-report-hero data-report-hero--irrigation">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Datenauswertungen", href: "/ratgeber/daten/" }, { label: "Bewässerung" }]} />
      <div className="data-report-hero-grid">
        <div><p className="eyebrow">84 geprüfte Bewässerungsprodukte</p><h1>Viele Einzelteile ergeben noch kein <em>geplantes Bewässerungssystem</em>.</h1><p>Rohre, Verbinder, Regner und Tropfbewässerung stellen mehr als vier Fünftel des aktuellen Katalogs. Das ist für die Produktsuche nützlich, beantwortet aber noch nicht, ob Durchfluss, Druck, Zonen und Anschlüsse zusammenpassen.</p></div>
        <aside><strong>Kein Warenkorb aus Durchschnittswerten</strong><p>Ein mittlerer Preis für Verbinder oder Rohre sagt wenig über ein vollständiges Projekt aus. Mengen, Durchmesser und kompatible Systeme müssen für den konkreten Garten bestimmt werden.</p></aside>
      </div>
    </header>

    <section className="data-report-section irrigation-inventory" aria-labelledby="irrigation-overview">
      <div className="data-report-heading"><p className="eyebrow">Was der Katalog abbildet</p><h2 id="irrigation-overview">Vier Bauteilgruppen stellen {distributionCore} von {report.total} Produkten.</h2><p>Die Verteilung macht sichtbar, weshalb die reine Produktzahl kein Maß für Planungstiefe ist. Ein System benötigt wenige Steuerungen, kann aber viele Leitungen, Verbinder und Auslässe enthalten.</p></div>
      <ReportMetricGrid ariaLabel="Kennzahlen der Bewässerungsauswertung" items={[
        { value: `${report.total}`, label: "geprüfte Produkte", note: "Alle mit verfügbarem Angebot" },
        { value: `${report.kinds.length}`, label: "Bauteilgruppen", note: "Von Rohr bis Filter" },
        { value: `${report.brandConcentration}`, label: "Produkte einer Marke", note: `Von insgesamt ${report.brands} Marken` },
        { value: euro(report.medianPriceEur), label: "mittlerer Artikelpreis", note: "Nicht als Systemkosten interpretieren" },
      ]} />
    </section>

    <section className="data-report-section irrigation-anatomy" aria-labelledby="irrigation-anatomy-title">
      <div><p className="eyebrow">Anatomie des Sortiments</p><h2 id="irrigation-anatomy-title">Leitung, Verbindung und Wasserabgabe stehen im Mittelpunkt.</h2><p>Rohre und Leitungen sind mit 22 Produkten die größte Gruppe. Je 20 Produkte entfallen auf Verbinder und Regner. Elf weitere gehören zur Tropfbewässerung.</p><p>Steuerungen, Ventile, Druckminderer und Filter sind zahlenmäßig kleiner. Ihre technische Bedeutung ist dadurch nicht geringer. Ein fehlender Druckminderer oder eine falsch dimensionierte Steuerung kann das ganze System beeinträchtigen.</p></div>
      <ReportBarList ariaLabel="Bauteilgruppen im Bewässerungskatalog" maxValue={report.total} items={report.kinds.map((item) => ({ label: item.label, value: item.count, displayValue: `${item.count} Produkte`, detail: `${item.share.toLocaleString("de-DE", { maximumFractionDigits: 1 })} Prozent der Stichprobe` }))} />
    </section>

    <section className="data-report-section irrigation-price-context" aria-labelledby="irrigation-prices-title">
      <div className="data-report-heading"><p className="eyebrow">Preise brauchen eine Einheit</p><h2 id="irrigation-prices-title">Ein Verbinder, eine Rohrrolle und eine Steuerung sind nicht direkt vergleichbar.</h2><p>Die mittleren Preise helfen innerhalb einer Bauteilgruppe bei der Orientierung. Zwischen den Gruppen unterscheiden sich Stückzahl, Länge, Funktionsumfang und Lieferumfang zu stark für eine gemeinsame Rangfolge.</p></div>
      <div className="data-table-wrap"><table>
        <caption>Bauteilgruppen und mittlere Angebotspreise</caption>
        <thead><tr><th scope="col">Bauteilgruppe</th><th scope="col">Produkte</th><th scope="col">Anteil</th><th scope="col">Mittlerer Artikelpreis</th><th scope="col">Für die Planung relevant</th></tr></thead>
        <tbody>{report.kinds.map((item) => <tr key={item.key}><th scope="row">{item.label}</th><td>{item.count}</td><td>{item.share.toLocaleString("de-DE", { maximumFractionDigits: 1 })} %</td><td>{euro(item.medianPriceEur)}</td><td>{item.key === "controller" ? "Zonen, Sensoren und Bedienung" : item.key === "pipe" || item.key === "dripline" ? "Länge, Durchmesser und Druckverlust" : item.key === "sprinkler" ? "Reichweite, Sektor und Durchfluss" : "Anschlussmaß und Systemkompatibilität"}</td></tr>)}</tbody>
      </table></div>
    </section>

    <section className="data-report-section irrigation-planning-gap" aria-labelledby="irrigation-gap-title">
      <div className="irrigation-gap-copy"><p className="eyebrow">Die entscheidende Datenlücke</p><h2 id="irrigation-gap-title">Der Katalog kann Produkte finden. Ein vollständiges System lässt sich daraus nicht automatisch zusammensetzen.</h2><p>Bei nur zwei Produkten ist eine maximale Zonenanzahl hinterlegt. Benötigtes Zubehör ist bei einem Produkt strukturiert dokumentiert. Neun Produkte sind ausdrücklich als smart kompatibel erfasst. Bei den übrigen 75 bleibt dieser Punkt unbekannt und gilt nicht automatisch als unvereinbar.</p></div>
      <div className="irrigation-coverage-list">
        <article><strong>{report.coverage.maxZones} von {report.total}</strong><div><h3>Zonenanzahl dokumentiert</h3><p>Eine Steuerung muss zu den tatsächlich gleichzeitig oder nacheinander betriebenen Bereichen passen.</p></div></article>
        <article><strong>{report.coverage.requiredAccessories} von {report.total}</strong><div><h3>Zubehör strukturiert erfasst</h3><p>Adapter, Endstücke, Verteiler und Druckregelung dürfen nicht aus einem Produktnamen geraten werden.</p></div></article>
        <article><strong>{report.coverage.smartCompatibleYes} von {report.total}</strong><div><h3>Smart Kompatibilität bestätigt</h3><p>Nur ein ausdrücklich dokumentiertes Ja wird gezählt. Unbekannt bleibt unbekannt.</p></div></article>
        <article><strong>{report.coverage.pipeDiameter} von {report.total}</strong><div><h3>Durchmesser vorhanden</h3><p>Selbst ein vorhandener Wert reicht ohne Anschlussstandard, Länge und Durchfluss nicht für die Systemfreigabe.</p></div></article>
      </div>
    </section>

    <section className="data-report-section irrigation-project-path" aria-labelledby="irrigation-project-title">
      <div><p className="eyebrow">Eine belastbare Projektlogik</p><h2 id="irrigation-project-title">Die Produktliste kommt nach dem Wassercheck.</h2><p>Eine sinnvolle Planung beginnt am Wasseranschluss und endet an jedem Auslass. Dazwischen bestimmen Fläche, Pflanzentyp, Zonen und Leitungsweg die benötigten Komponenten.</p></div>
      <ol>
        <li><span>Wasserquelle</span><p>Durchfluss und Fließdruck unter realen Bedingungen messen.</p></li>
        <li><span>Bedarf</span><p>Rasen, Beete und Hecken getrennt erfassen.</p></li>
        <li><span>Zonen</span><p>Verbraucher so gruppieren, dass die Wasserquelle nicht überfordert wird.</p></li>
        <li><span>Leitungsweg</span><p>Längen, Durchmesser, Abzweige und Druckverluste planen.</p></li>
        <li><span>Komponenten</span><p>Passende Teile innerhalb eines kompatiblen Systems auswählen.</p></li>
      </ol>
    </section>

    <ReportMethod updated={report.updatedLabel}>
      <p>Ausgewertet wurden alle geprüften Bewässerungsprodukte im öffentlichen PassendPlanen Katalog. Jedes Produkt wurde einer funktionalen Bauteilgruppe zugeordnet. Für Preisangaben zählt der günstigste verfügbare Angebotspreis.</p>
      <p>Die Analyse erzeugt bewusst keine automatische Kompatibilitätsmatrix. Produktnamen und unstrukturierte Beschreibungstexte reichen nicht aus, um Anschlüsse oder Systemfamilien sicher freizugeben. Solche Angaben müssen am konkreten Herstellerdatenblatt bestätigt werden.</p>
      <p>Die Stichprobe ist stark von einer Marke geprägt und nicht repräsentativ für den gesamten Markt. Lieferkosten und benötigte Mengen sind nicht im Artikelpreis enthalten. <Link href="/methodik/">Mehr zur Prüfmethode</Link>.</p>
    </ReportMethod>

    <section className="data-report-section data-next-step" aria-labelledby="irrigation-next-step">
      <div><p className="eyebrow">Vom Garten zum Komponentenplan</p><h2 id="irrigation-next-step">Flächen, Hecken und Wasserleistung gemeinsam berechnen.</h2><p>Der Bewässerungsplaner trennt Rasen, Beete und Hecken, schätzt Zonen und erstellt eine nachvollziehbare Komponentenstruktur. Die technische Freigabe der konkreten Teile bleibt anschließend beim aktuellen Herstellerdatenblatt.</p></div>
      <Link className="button button--primary" href="/garten/bewaesserungs-planer/">Bewässerung planen →</Link>
    </section>
    <DataReportLinks items={[
      { href: "/garten/bewaesserung-durchfluss-messen/", label: "Durchfluss richtig messen", description: "Die Wasserquelle als Grundlage der Planung prüfen." },
      { href: "/garten/bewaesserungscomputer-zonen/", label: "Bewässerungszonen bestimmen", description: "Verbraucher und verfügbare Wassermenge zusammenführen." },
      { href: "/garten/tropfbewaesserung-hecke/", label: "Tropfbewässerung für Hecken", description: "Länge, Reserve und Leitungsbedarf nachvollziehbar berechnen." },
    ]} />
  </main>;
}
