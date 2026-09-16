import Link from "next/link";
import { DataReportLinks, ReportBarList, ReportMethod, ReportMetricGrid } from "@/components/data-report/DataReportBlocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { flooringDataReport as report } from "@/lib/data-report/catalog-insights";
import { createDataReportStructuredData } from "@/lib/data-report/structured-data";
import { createPageMetadata } from "@/lib/metadata";

const PATH = "/ratgeber/daten/bodenbelaege-fussbodenheizung-feuchtraum/";
const title = "101 Bodenbeläge im Datenvergleich. Heizung, Feuchtraum und Paketmenge";
const description = "101 geprüfte Bodenbeläge nach Materialart, Fußbodenheizungsfreigabe, Feuchtraumeignung, Paketinhalt und Materialbedarf für 20 Quadratmeter ausgewertet.";

export const metadata = createPageMetadata({ title, description, path: PATH, kind: "article", modifiedTime: "2026-09-16" });

const euro = (value: number) => value.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const number = (value: number, digits = 0) => value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export default function Page() {
  return <main className="data-report-page data-report-page--flooring">
    <JsonLd data={createDataReportStructuredData({ path: PATH, title, description, datasetName: "PassendPlanen Auswertung geprüfter Bodenbeläge", datasetDescription: `Auswertung von ${report.total} geprüften Bodenbelägen nach Belagsart, Freigaben, Paketinhalt und Angebotspreis.`, datasetSize: report.total, variables: ["Belagsart", "Paketinhalt", "Dicke", "Freigabe für Fußbodenheizung", "Feuchtraumeignung", "Angebotspreis"], updatedAt: "2026-09-16" })} />
    <header className="data-report-hero data-report-hero--flooring">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Datenauswertungen", href: "/ratgeber/daten/" }, { label: "Bodenbeläge" }]} />
      <div className="data-report-hero-grid">
        <div><p className="eyebrow">101 dokumentierte Bodenbeläge</p><h1>Fußbodenheizung ist häufig freigegeben. Beim <em>Feuchtraum</em> bleibt mehr offen.</h1><p>Wir haben Laminat, Klickvinyl und schwimmend verlegtes Fertigparkett nicht nach Werbeaussagen sortiert, sondern nach dokumentierten Eigenschaften. Das Ergebnis zeigt, wo eine Vorauswahl möglich ist und wo das konkrete Datenblatt entscheidet.</p></div>
        <aside><strong>Eine fehlende Freigabe ist kein Nein</strong><p>Wenn der Händler eine Eigenschaft nicht nennt, bleibt sie in dieser Auswertung unbekannt. Für den Einbau zählt ausschließlich die Freigabe des konkreten Produkts und des vollständigen Bodenaufbaus.</p></aside>
      </div>
    </header>

    <section className="data-report-section flooring-opening" aria-labelledby="flooring-opening-title">
      <div className="data-report-heading"><p className="eyebrow">Die erste Gegenprobe</p><h2 id="flooring-opening-title">Zwei Freigaben, zwei sehr unterschiedliche Datenlagen.</h2></div>
      <div className="flooring-approval-grid">
        <article><span>{report.floorHeatingApproved}</span><div><h3>Für Fußbodenheizung dokumentiert</h3><p>Bei {report.floorHeatingUnknown} Produkten fehlt eine eindeutige Angabe. Die Freigabe allein sagt noch nichts über Unterlage, Wärmedurchlasswiderstand oder zulässige Oberflächentemperatur.</p></div></article>
        <article><span>{report.wetRoomApproved}</span><div><h3>Für Feuchträume dokumentiert</h3><p>{report.wetRoomUnknown} Produkte bleiben unbekannt und ein Produkt ist ausdrücklich nicht freigegeben. Küche und Badezimmer benötigen trotzdem unterschiedliche Prüfungen.</p></div></article>
      </div>
    </section>

    <section className="data-report-section data-split-section" aria-labelledby="flooring-types">
      <div><p className="eyebrow">Drei Belagsgruppen</p><h2 id="flooring-types">Klickvinyl stellt fast die Hälfte der Stichprobe.</h2><p>Die aktuelle Auswahl enthält {report.types.find((item) => item.key === "vinyl-click")?.count} Klickvinylprodukte, {report.types.find((item) => item.key === "laminate")?.count} Laminatprodukte und {report.types.find((item) => item.key === "parquet-floating")?.count} Fertigparkettprodukte. Alle erfassten Modelle werden geklickt. Klebevinyl ist deshalb nicht Bestandteil dieser Analyse.</p><p>Das ist eine wichtige Grenze. Die Ergebnisse dürfen nicht auf jede Verlegeart übertragen werden.</p></div>
      <ReportBarList ariaLabel="Verteilung der Bodenbelagsarten" maxValue={report.total} items={report.types.map((item) => ({ label: item.label, value: item.count, displayValue: `${item.count} Produkte`, detail: `${number(item.share, 1)} Prozent der Stichprobe` }))} />
    </section>

    <section className="data-report-section" aria-labelledby="flooring-comparison">
      <div className="data-report-heading"><p className="eyebrow">Was die Produktdaten hergeben</p><h2 id="flooring-comparison">Dicke, Paketinhalt und Freigaben nebeneinander.</h2><p>Der Median beschreibt jeweils die Mitte der Produktgruppe. Bei den Freigaben wird nur ein ausdrücklich dokumentiertes Ja gezählt.</p></div>
      <div className="data-table-wrap"><table>
        <caption>Dokumentierte Eigenschaften nach Bodenbelagsart</caption>
        <thead><tr><th scope="col">Belagsart</th><th scope="col">Produkte</th><th scope="col">Mittlere Dicke</th><th scope="col">Paketinhalt</th><th scope="col">Heizung freigegeben</th><th scope="col">Feuchtraum freigegeben</th></tr></thead>
        <tbody>{report.types.map((item) => <tr key={item.key}><th scope="row">{item.label}</th><td>{item.count}</td><td>{number(item.medianThicknessMm, 1)} mm</td><td>{number(item.medianPackageCoverageM2, 2)} m²</td><td>{item.floorHeatingApproved} von {item.count}</td><td>{item.wetRoomApproved} von {item.count}</td></tr>)}</tbody>
      </table></div>
      <p className="data-report-reading">Bei Fertigparkett sind alle 19 Produkte als für Fußbodenheizung geeignet dokumentiert. Beim Feuchtraum besitzt dagegen nur ein Produkt eine eindeutige Freigabe und bei 18 fehlt die Angabe. Daraus folgt keine pauschale Ablehnung von Parkett. Es zeigt lediglich, dass diese Stichprobe für eine Feuchtraumentscheidung kaum belastbar ist.</p>
    </section>

    <section className="data-report-section flooring-scenario" aria-labelledby="flooring-scenario-title">
      <div className="flooring-scenario-intro"><p className="eyebrow">Ein Raum mit 20 Quadratmetern</p><h2 id="flooring-scenario-title">Zehn Prozent Reserve ergeben nicht automatisch genau 22 Quadratmeter Bestellung.</h2><p>Pakete werden vollständig gekauft. Für jedes Produkt haben wir deshalb berechnet, wie viele Pakete mindestens 22 Quadratmeter abdecken. Die Werte zeigen die Mitte der jeweiligen Produktgruppe und enthalten weder Unterlage noch Sockelleisten oder Lieferung.</p></div>
      <div className="flooring-scenario-grid">
        {report.types.map((item) => <article key={item.key}>
          <p className="eyebrow">{item.label}</p>
          <strong>{euro(item.scenario.medianMaterialCostEur)}</strong>
          <span>mittlerer Materialwert</span>
          <dl><div><dt>Mittlere Paketanzahl</dt><dd>{item.scenario.medianPackages}</dd></div><div><dt>Bestellte Fläche</dt><dd>{number(item.scenario.medianOrderedAreaM2, 1)} m²</dd></div><div><dt>Mittlere Hälfte der Werte</dt><dd>{euro(item.scenario.lowerMaterialCostEur)} bis {euro(item.scenario.upperMaterialCostEur)}</dd></div></dl>
        </article>)}
      </div>
      <div className="data-callout"><strong>Warum dies keine Preisprognose ist</strong><p>Die Rechnung kombiniert jedes konkrete Produkt mit seinem eigenen Paketinhalt und Angebotspreis. Raumform, Verlegerichtung, Chargenreserve und nicht belegte Flächen können die benötigte Paketanzahl verändern. Preise können sich nach dem Datenstand ändern.</p></div>
    </section>

    <section className="data-report-section flooring-decision" aria-labelledby="flooring-decision-title">
      <div><p className="eyebrow">Die Reihenfolge für eine belastbare Auswahl</p><h2 id="flooring-decision-title">Erst den Aufbau freigeben. Danach Pakete und Preis vergleichen.</h2></div>
      <ol>
        <li><span>1</span><div><strong>Raumnutzung klären</strong><p>Feuchte, stehendes Wasser, Reinigung und Temperaturwechsel bestimmen, welche Freigaben benötigt werden.</p></div></li>
        <li><span>2</span><div><strong>Untergrund und Heizung prüfen</strong><p>Restfeuchte, Ebenheit, Unterlage und Wärmedurchlasswiderstand gehören zum gesamten Aufbau.</p></div></li>
        <li><span>3</span><div><strong>Bestellmenge berechnen</strong><p>Nettofläche, Verlegerichtung, Reserve und Paketinhalt ergeben die Anzahl vollständiger Pakete.</p></div></li>
        <li><span>4</span><div><strong>Gesamtkosten vergleichen</strong><p>Unterlage, Leisten, Übergänge und Lieferung kommen zum reinen Bodenbelag hinzu.</p></div></li>
      </ol>
    </section>

    <ReportMethod updated={report.updatedLabel}>
      <p>Die Auswertung umfasst {report.total} geprüfte und aktuell verfügbare Bodenbeläge aus dem PassendPlanen Katalog. Händlerangaben wurden vereinheitlicht und den Gruppen Laminat, Klickvinyl und schwimmend verlegtes Fertigparkett zugeordnet.</p>
      <p>Für das Raumszenario wurden 20 Quadratmeter Nettofläche und zehn Prozent Reserve angenommen. Anschließend wurde jedes Produkt auf vollständige Pakete aufgerundet. Die Preisspannen zeigen das mittlere Viertel bis das obere mittlere Viertel der errechneten Materialwerte.</p>
      <p>Die Auswahl ist keine vollständige Marktstichprobe. Produktfreigaben müssen vor dem Kauf im aktuellen Herstellerdatenblatt bestätigt werden. <Link href="/methodik/">Mehr zur Prüfmethode</Link>.</p>
    </ReportMethod>

    <section className="data-report-section data-next-step" aria-labelledby="flooring-next-step">
      <div><p className="eyebrow">Dein Raum ist konkreter als die Stichprobe</p><h2 id="flooring-next-step">Pakete, Reserve und Sockelleisten passend berechnen.</h2><p>Der Bodenbelag Rechner verarbeitet mehrere Raumflächen, feste Abzüge, Verlegemuster, Paketinhalt, Unterlage und Sockelleisten. Produkte erscheinen nur, wenn die geforderten Freigaben dokumentiert sind.</p></div>
      <Link className="button button--primary" href="/haus/boden/bodenbelag-rechner/">Bodenbedarf berechnen →</Link>
    </section>
    <DataReportLinks items={[
      { href: "/ratgeber/bodenbelag-laminat-oder-vinyl/", label: "Laminat oder Vinyl", description: "Nutzung, Aufbau und Reparaturmöglichkeiten vergleichen." },
      { href: "/ratgeber/laminat-auf-fussbodenheizung/", label: "Laminat auf Fußbodenheizung", description: "Freigaben und Wärmedurchlasswiderstand im Aufbau prüfen." },
      { href: "/haus/boden/laminat-verschnitt-berechnen/", label: "Verschnitt nachvollziehen", description: "Reserve und volle Pakete für den Raum einordnen." },
    ]} />
  </main>;
}
