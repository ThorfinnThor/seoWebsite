import Link from "next/link";
import { DataReportLinks, ReportBarList, ReportMethod, ReportMetricGrid } from "@/components/data-report/DataReportBlocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { flooringThicknessReport as report } from "@/lib/data-report/additional-insights";
import { createDataReportStructuredData } from "@/lib/data-report/structured-data";
import { createPageMetadata } from "@/lib/metadata";

const PATH = "/ratgeber/daten/bodenbelag-aufbauhoehe-renovierung/";
const title = `Bodenbelag Aufbauhöhe bei ${report.total} Klickböden`;
const description = `${report.total} Laminat, Klickvinyl und Fertigparkett Produkte nach Stärke ausgewertet. Mit konkreter Prüfung für Türen, Übergänge und zusätzliche Unterlagen.`;

export const metadata = createPageMetadata({ title, description, path: PATH, kind: "article", publishedTime: "2026-11-01", modifiedTime: "2026-11-01" });

const number = (value: number, digits = 0) => value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export default function Page() {
  const slimThreshold = report.thresholds.find((item) => item.maximumMm === 8)!;
  const thickestBand = report.bands.at(-1)!;
  const thicknessRange = report.summary.maxThicknessMm - report.summary.minThicknessMm;

  return <main className="data-report-page flooring-thickness-page">
    <JsonLd data={createDataReportStructuredData({ path: PATH, title, description, datasetName: "PassendPlanen Auswertung der Bodenbelag Produktstärken", datasetDescription: `Auswertung von ${report.total} geprüften Klickböden nach Produktstärke, Bodenart und dokumentierter Freigabe für Fußbodenheizung.`, datasetSize: report.total, variables: ["Produktstärke", "Bodenart", "Verlegeart", "Fußbodenheizungsfreigabe", "Mindeststärke", "Medianstärke", "Maximalstärke"], publishedAt: "2026-11-01", updatedAt: "2026-11-01" })} />

    <header className="data-report-hero data-report-hero--flooring">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Datenauswertungen", href: "/ratgeber/daten/" }, { label: "Bodenbelag Aufbauhöhe" }]} />
      <div className="data-report-hero-grid">
        <div><p className="eyebrow">Produktstärke bei allen {report.total} Böden dokumentiert</p><h1>Zwischen dünnstem und stärkstem Boden liegen <em>{number(thicknessRange, 1)} Millimeter.</em></h1><p>Bei einer Renovierung können wenige Millimeter darüber entscheiden, ob eine Tür frei schwingt oder ein Übergang eine neue Kante bekommt. Die Produktstärke ist dafür der Anfang der Rechnung, nicht die gesamte Aufbauhöhe.</p></div>
        <aside><strong>{slimThreshold.count} von {report.total} Produkten sind höchstens 8 Millimeter stark</strong><p>Das vergrößert die Auswahl bei begrenzter Höhe. Unterlage, integrierte Dämmung, Ausgleich und vorhandene Klebereste müssen trotzdem separat geprüft werden.</p></aside>
      </div>
    </header>

    <section className="data-report-section" aria-labelledby="thickness-overview-title">
      <div className="data-report-heading"><p className="eyebrow">Stärken im aktuellen Sortiment</p><h2 id="thickness-overview-title">Acht Millimeter bilden die Mitte, nicht die Obergrenze.</h2><p>Alle ausgewerteten Produkte sind Klickböden. Dadurch vergleichen wir keine dünne Klebevariante mit schwimmend verlegten Systemen. Selbst innerhalb dieser einheitlichen Verlegeart reicht die Produktstärke von {number(report.summary.minThicknessMm, 1)} bis {number(report.summary.maxThicknessMm, 1)} Millimeter.</p></div>
      <ReportMetricGrid ariaLabel="Kennzahlen zur Stärke geprüfter Bodenbeläge" items={[
        { value: `${report.total}`, label: "vollständig erfasste Produkte", note: "Laminat, Klickvinyl und Fertigparkett" },
        { value: `${number(report.summary.medianThicknessMm, 1)} mm`, label: "mittlere Produktstärke", note: "Median der gesamten Stichprobe" },
        { value: `${slimThreshold.count}`, label: "Produkte bis 8 mm", note: `${number(slimThreshold.share, 1)} Prozent der Auswahl` },
        { value: `${thickestBand.count}`, label: "Produkte über 10 mm", note: `${number(thickestBand.share, 1)} Prozent der Auswahl` },
      ]} />
    </section>

    <section className="data-report-section data-split-section" aria-labelledby="thickness-bands-title">
      <div><p className="eyebrow">Vier Stärkebereiche</p><h2 id="thickness-bands-title">Die meisten Produkte liegen zwischen fünf und acht Millimetern.</h2><p>Die Klassen dienen der Höhenprüfung. Sie sind keine Qualitätsstufen. Ein stärkerer Boden ist nicht automatisch haltbarer und ein dünner Boden nicht automatisch für jeden Untergrund geeignet.</p><p className="data-report-reading">Für Türblätter und Übergänge zählt die höchste Stelle des fertigen Aufbaus. Einzelne Unebenheiten können wichtiger sein als der mittlere Messwert im Raum.</p></div>
      <ReportBarList ariaLabel="Verteilung der Produktstärken" items={report.bands.map((band) => ({ label: band.label, value: band.count, displayValue: `${band.count} Produkte`, detail: `${number(band.share, 1)} Prozent der Stichprobe` }))} />
    </section>

    <section className="data-report-section data-evidence-gap" aria-labelledby="flooring-type-title">
      <div><p className="eyebrow">Materialgruppen mit unterschiedlichem Schwerpunkt</p><h2 id="flooring-type-title">Klickvinyl bleibt im Median dünner als Laminat und Fertigparkett.</h2><p>Die Spanne innerhalb einer Materialgruppe bleibt relevant. Die Materialbezeichnung allein reicht deshalb nicht für die Höhenfreigabe.</p></div>
      <div className="data-table-wrap"><table>
        <caption>Produktstärke nach Bodenart in der geprüften Stichprobe</caption>
        <thead><tr><th scope="col">Bodenart</th><th scope="col">Produkte</th><th scope="col">Minimum</th><th scope="col">Median</th><th scope="col">Maximum</th><th scope="col">Heizungsfreigabe dokumentiert</th></tr></thead>
        <tbody>{report.types.map((type) => <tr key={type.key}><th scope="row">{type.label}</th><td>{type.count}</td><td>{number(type.minThicknessMm, 1)} mm</td><td>{number(type.medianThicknessMm, 1)} mm</td><td>{number(type.maxThicknessMm, 1)} mm</td><td>{type.floorHeatingKnown} von {type.count}</td></tr>)}</tbody>
      </table></div>
      <p className="data-report-reading">Fertigparkett erreicht in dieser Stichprobe einen Median von {number(report.types.find((type) => type.key === "parquet-floating")!.medianThicknessMm, 1)} Millimetern. Klickvinyl liegt bei {number(report.types.find((type) => type.key === "vinyl-click")!.medianThicknessMm, 1)} Millimetern. Dieser Unterschied kann einen Übergang verändern, sagt aber nichts über die Eignung des konkreten Untergrunds aus.</p>
    </section>

    <section className="data-report-section flooring-scenario" aria-labelledby="build-height-title">
      <div className="flooring-scenario-intro"><p className="eyebrow">Die echte Aufbauhöhe entsteht im Raum</p><h2 id="build-height-title">Drei Schichten müssen vor dem Kauf zusammenpassen.</h2><p>Unsere Produktdaten enthalten die Stärke des Bodenbelags. Für die fertige Höhe kommen je nach System weitere Schichten hinzu. Diese Werte gehören in dieselbe Rechnung, dürfen aber nicht pauschal angenommen werden.</p></div>
      <div className="flooring-scenario-grid">
        <article><strong>Produkt</strong><span>Dokumentierte Stärke des gewählten Bodens</span><p>In der Stichprobe zwischen {number(report.summary.minThicknessMm, 1)} und {number(report.summary.maxThicknessMm, 1)} Millimetern.</p></article>
        <article><strong>Unterlage</strong><span>Trittschall oder integrierte Dämmung</span><p>Vorhandene Kaschierung und zusätzliche Unterlage dürfen nicht versehentlich doppelt gerechnet werden.</p></article>
        <article><strong>Untergrund</strong><span>Ausgleich, Klebereste und Höhendifferenzen</span><p>Der höchste Punkt und notwendige Spachtelarbeiten entscheiden mit über die fertige Ebene.</p></article>
      </div>
      <div className="data-callout"><strong>Prüfrechnung für die Renovierung</strong><p>Verfügbare Höhe unter Türblatt oder Anschlussprofil abzüglich Unterlage und notwendigem Ausgleich ergibt die maximal mögliche Produktstärke. Eine Sicherheitsreserve gehört dazu, wenn der Untergrund nicht überall gleich hoch ist.</p></div>
    </section>

    <section className="data-report-section" aria-labelledby="measure-title">
      <div className="data-report-heading"><p className="eyebrow">Messen an den kritischen Stellen</p><h2 id="measure-title">Nicht die Raummitte entscheidet über die Freigabe.</h2><p>Türblätter, Zargen, Balkontüren und angrenzende Bodenflächen setzen unterschiedliche Grenzen. Drei Messpunkte vermeiden die häufigsten Überraschungen.</p></div>
      <div className="data-gap-grid">
        <article><strong>01</strong><h3>Türblatt und Zarge</h3><p>Freien Abstand an der engsten Stelle messen. Öffnungsbogen und mögliche Unebenheiten berücksichtigen.</p></article>
        <article><strong>02</strong><h3>Übergang zum Nebenraum</h3><p>Höhendifferenz zum vorhandenen Belag bestimmen und ein passendes Profil mit realem Ausgleichsbereich wählen.</p></article>
        <article><strong>03</strong><h3>Anschluss an feste Bauteile</h3><p>Balkontür, Einbaumöbel und Heizkörperanschlüsse können weniger Spielraum lassen als die normale Tür.</p></article>
      </div>
    </section>

    <ReportMethod updated={report.updatedLabel}>
      <p>Ausgewertet wurden {report.total} redaktionell geprüfte Bodenbeläge mit dokumentierter Produktstärke. Die Stichprobe enthält ausschließlich Klicksysteme aus Laminat, Klickvinyl und schwimmend verlegtem Fertigparkett. Gruppiert wurde nach der angegebenen Stärke des Produkts.</p>
      <p>Nicht enthalten sind pauschale Werte für Trittschall, Klebstoff, Spachtelmasse oder vorhandene Untergründe. Die Auswertung beschreibt deshalb Produktstärken und keine fertigen Systemhöhen. Herstellerfreigaben und die konkrete Einbausituation bleiben maßgeblich.</p>
    </ReportMethod>

    <section className="data-report-section data-next-step"><div><p className="eyebrow">Mit dem eigenen Raum weiterrechnen</p><h2>Fläche, Pakete und Aufbau getrennt prüfen.</h2><p>Der Bodenbelag Rechner ermittelt Materialmenge und volle Pakete. Die hier beschriebene Höhenprüfung ergänzt diese Mengenrechnung an Türen und Übergängen.</p></div><Link className="button button--primary" href="/haus/boden/bodenbelag-rechner/">Bodenbelag berechnen →</Link></section>
    <DataReportLinks items={[
      { href: "/ratgeber/daten/bodenbelag-formate-paketrundung/", label: "Formate und Paketrundung", description: "Dielenmaß und volle Kartons für die konkrete Bestellmenge einordnen." },
      { href: "/haus/boden/untergrund-trittschall/", label: "Untergrund und Trittschall", description: "Zusätzliche Schichten und Anforderungen vor der Verlegung prüfen." },
      { href: "/ratgeber/bodenbelag-laminat-oder-vinyl/", label: "Laminat oder Vinyl", description: "Nutzung, Feuchte und Pflege neben der Aufbauhöhe berücksichtigen." },
    ]} />
  </main>;
}
