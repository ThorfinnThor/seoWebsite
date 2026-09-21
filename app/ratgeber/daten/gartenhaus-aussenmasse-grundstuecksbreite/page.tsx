import Link from "next/link";
import { DataReportLinks, ReportMethod } from "@/components/data-report/DataReportBlocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { gardenHouseDimensionReport as report } from "@/lib/data-report/additional-insights";
import { createDataReportStructuredData } from "@/lib/data-report/structured-data";
import { createPageMetadata } from "@/lib/metadata";

const PATH = "/ratgeber/daten/gartenhaus-aussenmasse-grundstuecksbreite/";
const title = `Gartenhaus Außenmaße. Welche Grundstücksbreite ${report.total} Modelle brauchen`;
const description = `${report.total} geprüfte Gartenhäuser nach kurzer und langer Außenseite, Grundfläche und Baukörperform ausgewertet. Für eine realistische Vorauswahl bei begrenztem Platz.`;

export const metadata = createPageMetadata({ title, description, path: PATH, kind: "article", modifiedTime: "2026-09-21" });

const number = (value: number, digits = 0) => value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const euro = (value: number) => value.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export default function Page() {
  const elongated = report.shapes.find((shape) => shape.key === "elongated")!;

  return <main className="data-report-page dimension-report-page">
    <JsonLd data={createDataReportStructuredData({ path: PATH, title, description, datasetName: "PassendPlanen Auswertung der Gartenhaus Außenmaße", datasetDescription: `Auswertung von ${report.total} geprüften Gartenhäusern nach kurzer Außenseite, langer Außenseite, Grundfläche und Seitenverhältnis.`, datasetSize: report.total, variables: ["Außenbreite", "Außentiefe", "kurze Außenseite", "lange Außenseite", "Grundfläche", "Seitenverhältnis", "Angebotspreis"], updatedAt: "2026-09-21" })} />

    <header className="data-report-hero dimension-report-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Datenauswertungen", href: "/ratgeber/daten/" }, { label: "Gartenhaus Außenmaße" }]} />
      <div className="data-report-hero-grid">
        <div><p className="eyebrow">{report.total} vollständig erfasste Außenmaße</p><h1>Die Grundfläche passt. Doch passt auch die <em>schmale Seite</em> aufs Grundstück?</h1><p>Ein Gartenhaus mit zehn Quadratmetern kann fast quadratisch sein oder sich als langer Baukörper an einer Grundstücksseite entlangziehen. Für die Stellplatzsuche sind deshalb Breite und Tiefe oft hilfreicher als die Grundfläche allein.</p></div>
        <aside><strong>Mehr als jedes zweite Modell ist deutlich länglich</strong><p>{elongated.count} von {report.total} Häusern haben ein Seitenverhältnis über 1,60. Drehen kann den Baukörper besser ausrichten, aber weder Abstände noch Zugang oder Fundamentfläche verkleinern.</p></aside>
      </div>
    </header>

    <section className="data-report-section dimension-threshold-section" aria-labelledby="dimension-threshold-title">
      <div><p className="eyebrow">Die kurze Außenseite als erster Filter</p><h2 id="dimension-threshold-title">Zweieinhalb Meter öffnen deutlich mehr Auswahl als zwei Meter.</h2><p>Wir haben für jedes Modell die kürzere der beiden Außenseiten bestimmt. Das entspricht der günstigsten Orientierung, wenn das Haus um neunzig Grad gedreht werden darf. Freiflächen, Dachüberstände und örtliche Vorgaben sind darin noch nicht enthalten.</p></div>
      <div className="dimension-thresholds">
        {report.fitThresholds.map((item) => <article key={item.thresholdCm}>
          <span>Kurze Seite höchstens {item.thresholdCm} cm</span>
          <strong>{item.count}</strong>
          <p>{number(item.share, 1)} Prozent der Stichprobe</p>
          <small>Mittlere lange Seite {number(item.medianLongSideCm)} cm</small>
        </article>)}
      </div>
    </section>

    <section className="data-report-section dimension-band-section" aria-labelledby="dimension-band-title">
      <div className="data-report-heading"><p className="eyebrow">Vier Breitenklassen</p><h2 id="dimension-band-title">Mit der Breite wächst nicht nur die Fläche.</h2><p>Die Klassen beziehen sich auf die kürzere Außenseite. Preise beschreiben den Median der jeweils vorhandenen Angebote. Sie erlauben keine Aussage darüber, wie viel Boden, Dachdeckung oder Montage enthalten ist.</p></div>
      <div className="data-table-wrap"><table>
        <caption>Kurze und lange Außenseite mit Grundfläche und Angebotspreis</caption>
        <thead><tr><th scope="col">Kurze Außenseite</th><th scope="col">Modelle</th><th scope="col">Mittlere lange Seite</th><th scope="col">Mittlere Grundfläche</th><th scope="col">Mittlerer Preis</th></tr></thead>
        <tbody>{report.shortSideBands.map((band) => <tr key={band.label}><th scope="row">{band.label}</th><td>{band.count}</td><td>{number(band.medianLongSideCm)} cm</td><td>{number(band.medianAreaM2, 1)} m²</td><td>{euro(band.medianPriceEur)}</td></tr>)}</tbody>
      </table></div>
      <p className="data-report-reading">Die Gruppe bis 200 Zentimeter enthält nur {report.shortSideBands[0].count} Modelle. Ihre mittlere lange Seite beträgt dennoch {number(report.shortSideBands[0].medianLongSideCm)} Zentimeter. Schmal bedeutet in dieser Stichprobe also nicht automatisch klein oder quadratisch.</p>
    </section>

    <section className="data-report-section dimension-shape-section" aria-labelledby="dimension-shape-title">
      <div><p className="eyebrow">Der Baukörper verändert die Nutzung</p><h2 id="dimension-shape-title">Gleiche Fläche kann sich völlig anders anfühlen.</h2><p>Das Seitenverhältnis beschreibt nur die äußere Form. Es bewertet weder Türlage noch Regale oder Bewegungsfläche. Trotzdem hilft es dabei, ungeeignete Grundformen früh zu erkennen.</p></div>
      <div className="dimension-shape-grid">
        {report.shapes.map((shape) => <article key={shape.key}>
          <div className={`dimension-shape dimension-shape--${shape.key}`} aria-hidden="true" />
          <span>{shape.detail}</span><h3>{shape.label}</h3>
          <strong>{shape.count} Modelle</strong>
          <p>Mittlere Außenform {number(shape.medianShortSideCm)} mal {number(shape.medianLongSideCm)} Zentimeter. Die mittlere Grundfläche liegt bei {number(shape.medianAreaM2, 1)} Quadratmetern.</p>
        </article>)}
      </div>
    </section>

    <section className="data-report-section dimension-check" aria-labelledby="dimension-check-title">
      <div><p className="eyebrow">Vor dem Modellvergleich</p><h2 id="dimension-check-title">Die verfügbare Fläche braucht einen echten Lageplan.</h2></div>
      <ol>
        <li><strong>Grenzen eintragen</strong><span>Grundstücksgrenze, Gebäude, Wege und feste Pflanzen gehören in dieselbe Skizze.</span></li>
        <li><strong>Baukörper drehen</strong><span>Beide Orientierungen mit dem vollständigen Außenmaß prüfen. Eine Drehung kann Zugang und Türseite verändern.</span></li>
        <li><strong>Zusatzraum offenlassen</strong><span>Dachüberstand, Regenrinne, Montagezugang und rechtlich notwendige Abstände kommen zum Produktmaß hinzu.</span></li>
        <li><strong>Innenmaß gegenprüfen</strong><span>Ein passendes Außenmaß sagt noch nicht, ob Fahrräder, Geräte und Bewegungswege innen funktionieren.</span></li>
      </ol>
    </section>

    <ReportMethod updated={report.updatedLabel}>
      <p>Ausgewertet wurden {report.total} geprüfte Gartenhäuser mit vollständig dokumentierter Außenbreite und Außentiefe. Die kürzere und längere Seite wurden unabhängig von der im Feed verwendeten Bezeichnung bestimmt. Dadurch wird eine mögliche Drehung sichtbar.</p>
      <p>Die Auswertung umfasst die aktuell geprüften Händlerangebote von PassendPlanen und ist keine Vollerhebung des Marktes. Außenmaße enthalten nicht automatisch Dachüberstand, Fundament, Arbeitsraum oder vorgeschriebene Abstände. Solche Werte müssen am konkreten Produkt und Standort ergänzt werden.</p>
    </ReportMethod>

    <section className="data-report-section data-next-step"><div><p className="eyebrow">Mit Nutzung und Stellplatz weiterrechnen</p><h2>Außenmaß und benötigte Innenfläche zusammenbringen.</h2><p>Der Gartenhaus Planer verbindet die verfügbare Stellfläche mit Fahrrädern, Geräten, Regalen und Bewegungsraum. So bleibt nicht nur das Haus auf dem Grundstück, sondern auch die geplante Nutzung realistisch.</p></div><Link className="button button--primary" href="/garten/gartenhaus-planer/">Gartenhaus planen →</Link></section>
    <DataReportLinks items={[
      { href: "/ratgeber/daten/gartenhaus-preise-groessen/", label: "Preise und Größen im Datencheck", description: `Material, Dachform und Preisbereiche der ${report.total} Häuser einordnen.` },
      { href: "/garten/gartenhaus-groesse/", label: "Benötigte Innenfläche berechnen", description: "Lagergut und Bewegungsfläche in einen Größenrahmen übersetzen." },
      { href: "/garten/gartenhaus-fundament/", label: "Fundament planen", description: "Untergrund und Aufbau getrennt vom Außenmaß prüfen." },
    ]} />
  </main>;
}
