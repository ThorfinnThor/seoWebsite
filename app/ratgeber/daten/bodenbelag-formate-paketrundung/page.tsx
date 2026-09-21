import Link from "next/link";
import { DataReportLinks, ReportMethod } from "@/components/data-report/DataReportBlocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { flooringFormatReport as report } from "@/lib/data-report/additional-insights";
import { createDataReportStructuredData } from "@/lib/data-report/structured-data";
import { createPageMetadata } from "@/lib/metadata";

const PATH = "/ratgeber/daten/bodenbelag-formate-paketrundung/";
const title = `Bodenbelag Formate und Paketrundung bei ${report.total} Produkten`;
const description = `${report.total} Bodenbeläge nach Dielenlänge, Breite und Paketinhalt ausgewertet. Mit drei Flächenszenarien für Reserve, volle Pakete und verbleibenden Materialüberschuss.`;

export const metadata = createPageMetadata({ title, description, path: PATH, kind: "article", modifiedTime: "2026-09-21" });

const number = (value: number, digits = 0) => value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export default function Page() {
  const widest = report.widthBands.at(-1)!;

  return <main className="data-report-page flooring-format-page">
    <JsonLd data={createDataReportStructuredData({ path: PATH, title, description, datasetName: "PassendPlanen Auswertung von Bodenformaten und Paketrundung", datasetDescription: `Auswertung von ${report.total} geprüften Bodenbelägen nach Dielenformat, Paketinhalt und Materialüberschuss bei drei Beispielgrößen.`, datasetSize: report.total, variables: ["Dielenlänge", "Dielenbreite", "Dielenfläche", "Paketinhalt", "Paketanzahl", "Bestellfläche", "Materialüberschuss"], updatedAt: "2026-09-21" })} />

    <header className="data-report-hero flooring-format-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Datenauswertungen", href: "/ratgeber/daten/" }, { label: "Bodenformate" }]} />
      <div className="flooring-format-hero-layout">
        <div><p className="eyebrow">Formatdaten bei allen {report.total} Produkten</p><h1>Der Verschnitt ist geplant. Der <em>letzte volle Karton</em> kommt trotzdem hinzu.</h1><p>Dielenformat und Paketinhalt bestimmen zwei verschiedene Dinge. Das Format beeinflusst Fugenbild und Zuschnitt. Der Paketinhalt entscheidet, wie weit die tatsächliche Bestellmenge über dem berechneten Bedarf liegt.</p></div>
        <div className="flooring-format-swatch" aria-label={`${widest.count} Produkte sind breiter als 220 Millimeter`}><span>{widest.count}</span><strong>Produkte über 220 mm Breite</strong><small>{number(widest.share, 1)} Prozent der Stichprobe</small></div>
      </div>
    </header>

    <section className="data-report-section format-width-story" aria-labelledby="format-width-title">
      <div><p className="eyebrow">Breite im aktuellen Sortiment</p><h2 id="format-width-title">Breite Formate stellen fast die Hälfte der Produkte.</h2><p>Die Gruppen sind beschreibend und keine Qualitätsklassen. Eine breite Diele kann in einem ruhigen rechteckigen Raum gut wirken. In kleinen oder verwinkelten Bereichen können mehr Zuschnitte entstehen. Dafür reicht die Produktbreite allein noch nicht als Beleg.</p></div>
      <div className="format-width-bars">
        {report.widthBands.map((band) => <article key={band.label}><div><strong>{band.label}</strong><span>{band.count} Produkte</span></div><i style={{ width: `${band.share}%` }} /><p>Mittleres Format {number(band.medianLengthMm)} mal {number(band.medianWidthMm)} Millimeter. Paketinhalt im Median {number(band.medianPackageCoverageM2, 2)} Quadratmeter.</p></article>)}
      </div>
    </section>

    <section className="data-report-section format-type-section" aria-labelledby="format-type-title">
      <div className="data-report-heading"><p className="eyebrow">Nicht jedes Material nutzt dasselbe Raster</p><h2 id="format-type-title">Fertigparkett fällt in dieser Stichprobe schmaler und kürzer aus.</h2><p>Die Werte beschreiben die vorhandenen Produkte, nicht alle am Markt erhältlichen Formate. Besonders Klickvinyl deckt in unserem Katalog sehr unterschiedliche Breiten ab.</p></div>
      <div className="format-type-grid">
        {report.types.map((type) => <article key={type.key}>
          <span>{type.count} Produkte</span><h3>{type.label}</h3>
          <dl><div><dt>Mittlere Länge</dt><dd>{number(type.medianLengthMm)} mm</dd></div><div><dt>Mittlere Breite</dt><dd>{number(type.medianWidthMm)} mm</dd></div><div><dt>Fläche je Diele</dt><dd>{number(type.medianPlankAreaM2, 3)} m²</dd></div><div><dt>Paketinhalt</dt><dd>{number(type.medianPackageCoverageM2, 2)} m²</dd></div></dl>
        </article>)}
      </div>
    </section>

    <section className="data-report-section package-rounding-section" aria-labelledby="package-rounding-title">
      <div className="package-rounding-copy"><p className="eyebrow">Drei Flächen mit zehn Prozent Reserve</p><h2 id="package-rounding-title">Die Paketrundung schwankt und wird nicht proportional kleiner.</h2><p>Für jede Beispielgröße wurde zunächst eine Reserve von zehn Prozent aufgeschlagen. Anschließend wurde für jedes der {report.total} Produkte auf vollständige Pakete aufgerundet. Der gezeigte Überschuss entsteht zusätzlich zur eingeplanten Reserve.</p></div>
      <div className="package-rounding-list">
        {report.scenarios.map((scenario) => <article key={scenario.netAreaM2}>
          <div><span>Nettofläche</span><strong>{number(scenario.netAreaM2)} m²</strong></div>
          <div><span>Mit Reserve</span><strong>{number(scenario.purchaseAreaM2, 1)} m²</strong></div>
          <div><span>Mittlere Bestellung</span><strong>{number(scenario.medianOrderedAreaM2, 2)} m²</strong></div>
          <div><span>Zusätzlicher Paketüberschuss</span><strong>{number(scenario.medianPackageSurplusM2, 2)} m²</strong></div>
          <p>Bei {scenario.productsWithMoreThanOneM2Surplus} von {scenario.products} Produkten liegt allein die Paketrundung über einem weiteren Quadratmeter.</p>
        </article>)}
      </div>
    </section>

    <section className="data-report-section package-distinction" aria-labelledby="package-distinction-title">
      <div><p className="eyebrow">Zwei Reserven mit anderem Zweck</p><h2 id="package-distinction-title">Verschnitt und Paketüberschuss dürfen nicht doppelt erklärt werden.</h2></div>
      <div>
        <article><strong>Geplante Reserve</strong><p>Sie berücksichtigt Zuschnitte, Raumform und Verlegemuster. Im Beispiel sind es zehn Prozent. Für einen einfachen rechteckigen Raum kann ein anderer Wert sinnvoll sein als für viele Nischen oder eine diagonale Verlegung.</p></article>
        <article><strong>Technische Rundung</strong><p>Nach der Reserve wird auf ganze Pakete aufgerundet. Dieser Rest hängt allein von der Paketgröße und der bereits berechneten Bestellfläche ab. Er kann später als Austauschmaterial dienen.</p></article>
      </div>
    </section>

    <ReportMethod updated={report.updatedLabel}>
      <p>Einbezogen wurden {report.total} geprüfte Bodenbeläge, für die Dielenlänge, Dielenbreite und Paketinhalt vollständig vorliegen. Laminat, Klickvinyl und schwimmend verlegtes Fertigparkett werden getrennt ausgewiesen.</p>
      <p>Die Beispielszenarien verwenden einheitlich zehn Prozent Reserve, damit nur der Effekt unterschiedlicher Paketgrößen sichtbar wird. Sie ersetzen keine Verlegeplanung. Raumgeometrie, Verlegerichtung, Fehlstellen und Herstellerangaben können die benötigte Reserve verändern.</p>
    </ReportMethod>

    <section className="data-report-section data-next-step"><div><p className="eyebrow">Mit dem eigenen Raum weiterrechnen</p><h2>Raumflächen, Reserve und echte Paketgröße verbinden.</h2><p>Der Bodenbelag Rechner übernimmt mehrere Teilflächen, Abzüge, Verlegerichtung und den Paketinhalt des gewählten Produkts. So wird die Rundung für das konkrete Projekt sichtbar.</p></div><Link className="button button--primary" href="/haus/boden/bodenbelag-rechner/">Bodenmenge berechnen →</Link></section>
    <DataReportLinks items={[
      { href: "/ratgeber/daten/bodenbelaege-fussbodenheizung-feuchtraum/", label: "Freigaben und Materialkosten", description: "Heizung, Feuchtraum und Paketkosten im breiteren Datenvergleich." },
      { href: "/haus/boden/laminat-verschnitt-berechnen/", label: "Verschnitt nachvollziehen", description: "Raumform und Verlegerichtung vor der Paketrundung einordnen." },
      { href: "/ratgeber/bodenbelag-laminat-oder-vinyl/", label: "Laminat oder Vinyl", description: "Eignung und Aufbau vor dem Formatvergleich prüfen." },
    ]} />
  </main>;
}
