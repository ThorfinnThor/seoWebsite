import Link from "next/link";
import { DataReportLinks, ReportBarList, ReportMethod, ReportMetricGrid } from "@/components/data-report/DataReportBlocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { robotMowerDataReport as report } from "@/lib/data-report/catalog-insights";
import { createDataReportStructuredData } from "@/lib/data-report/structured-data";
import { createPageMetadata } from "@/lib/metadata";

const PATH = "/ratgeber/daten/maehroboter-navigation-flaechenleistung/";
const title = "15 Mähroboter im Datencheck. Navigation, Fläche und Engstellen";
const description = "15 geprüfte Mähroboter nach Navigation, Nennfläche, Steigung, Engstellen und Angebotspreis ausgewertet. Mit sichtbaren Datenlücken und Planungshinweisen.";

export const metadata = createPageMetadata({ title, description, path: PATH, kind: "article", modifiedTime: "2026-09-16" });

const euro = (value: number) => value.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const number = (value: number) => value.toLocaleString("de-DE");

export default function Page() {
  return <main className="data-report-page data-report-page--mower">
    <JsonLd data={createDataReportStructuredData({ path: PATH, title, description, datasetName: "PassendPlanen Auswertung geprüfter Mähroboter", datasetDescription: `Auswertung von ${report.total} geprüften Mährobotern nach Navigation, Flächenleistung, Steigung, Engstellen und Angebotspreis.`, datasetSize: report.total, variables: ["Navigationssystem", "Nennfläche", "maximale Steigung", "Mindestpassage", "Hinderniserkennung", "Angebotspreis"], updatedAt: "2026-09-16" })} />
    <header className="data-report-hero data-report-hero--mower">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Datenauswertungen", href: "/ratgeber/daten/" }, { label: "Mähroboter" }]} />
      <div className="data-report-hero-grid">
        <div><p className="eyebrow">15 geprüfte Mähroboter</p><h1>Die Navigation allein sagt noch nicht, ob ein Mähroboter <em>zum Grundstück</em> passt.</h1><p>Der Katalog enthält fünf Navigationsarten und Rasenleistungen von 100 bis 3.000 Quadratmetern. Für die praktische Auswahl sind Engstellen, Steigung und Empfang jedoch ebenso wichtig. Genau dort sind die Produktdaten unterschiedlich vollständig.</p></div>
        <aside><strong>Die wichtigste Beobachtung</strong><p>Kabellose Technik ist in der Stichprobe nicht automatisch für größere Flächen ausgelegt. Kamera, LiDAR, RTK und hybride Systeme decken sehr verschiedene Grundstücksgrößen ab.</p></aside>
      </div>
    </header>

    <section className="data-report-section" aria-labelledby="mower-overview">
      <div className="data-report-heading"><p className="eyebrow">Der Bestand in Zahlen</p><h2 id="mower-overview">Die Mitte liegt bei 800 Quadratmetern und 999 Euro.</h2><p>Der Median teilt die Stichprobe in zwei gleich große Hälften. Er beschreibt den vorhandenen Katalog und ist kein empfohlener Zielwert für einen bestimmten Garten.</p></div>
      <ReportMetricGrid ariaLabel="Kennzahlen der Mähroboterauswertung" items={[
        { value: number(report.total), label: "geprüfte Modelle", note: `${report.brands} Marken mit verfügbarem Angebot` },
        { value: `${number(report.summary.medianAreaM2)} m²`, label: "mittlere Nennfläche", note: "Herstellerwert ohne individuellen Reservefaktor" },
        { value: `${number(report.summary.medianSlopePercent)} %`, label: "mittlere maximale Steigung", note: "Grenzwert unter idealisierten Bedingungen" },
        { value: euro(report.summary.medianPriceEur), label: "mittlerer Angebotspreis", note: "Installation und Zubehör nicht eingerechnet" },
      ]} />
    </section>

    <section className="data-report-section mower-navigation" aria-labelledby="mower-navigation-title">
      <div><p className="eyebrow">Fünf technische Wege</p><h2 id="mower-navigation-title">Das Kabel stellt die größte Einzelgruppe. Vier kabellose Ansätze teilen sich den Rest.</h2><p>Fünf Modelle arbeiten mit Begrenzungskabel. Zehn Modelle navigieren mit Kamera, LiDAR, RTK oder einem hybriden Verfahren. Die Gruppen sind klein und unterschiedlich zusammengesetzt. Preisunterschiede dürfen deshalb nicht als allgemeine Kostenregel für eine Navigationstechnik gelesen werden.</p></div>
      <ReportBarList ariaLabel="Navigationsarten der geprüften Mähroboter" maxValue={report.total} items={report.navigation.map((item) => ({ label: item.label, value: item.count, displayValue: `${item.count} ${item.count === 1 ? "Modell" : "Modelle"}`, detail: `Mittlere Nennfläche ${number(item.medianAreaM2)} m², mittlerer Preis ${euro(item.medianPriceEur)}` }))} />
    </section>

    <section className="data-report-section" aria-labelledby="mower-navigation-table">
      <div className="data-report-heading"><p className="eyebrow">Nicht nur nach Funktechnik sortieren</p><h2 id="mower-navigation-table">Fläche und Gelände verschieben das Bild.</h2><p>Die Tabelle zeigt pro Navigationsgruppe die Mitte der dokumentierten Werte. Ein einzelnes RTK Modell ist keine ausreichende Basis für einen allgemeinen Vergleich mit den anderen Gruppen.</p></div>
      <div className="data-table-wrap"><table>
        <caption>Navigation, Nennfläche, Steigung, Engstellen und Preis</caption>
        <thead><tr><th scope="col">Navigation</th><th scope="col">Modelle</th><th scope="col">Nennfläche</th><th scope="col">Steigung</th><th scope="col">Engstelle bekannt</th><th scope="col">Angebotspreis</th></tr></thead>
        <tbody>{report.navigation.map((item) => <tr key={item.key}><th scope="row">{item.label}</th><td>{item.count}</td><td>{number(item.medianAreaM2)} m²</td><td>{number(item.medianSlopePercent)} %</td><td>{item.passageKnown} von {item.count}</td><td>{euro(item.medianPriceEur)}</td></tr>)}</tbody>
      </table></div>
      <div className="data-callout"><strong>Warum der Nennflächenwert Reserve braucht</strong><p>Eine offene, zusammenhängende Fläche ist leichter zu mähen als dieselbe Quadratmeterzahl mit Inseln, getrennten Zonen, engen Übergängen und starkem Wachstum. Der Rechner erhöht den benötigten Flächenrahmen deshalb anhand der tatsächlichen Gartensituation.</p></div>
    </section>

    <section className="data-report-section mower-area-bands" aria-labelledby="mower-area-title">
      <div className="data-report-heading"><p className="eyebrow">Drei Größenbereiche</p><h2 id="mower-area-title">Der Preis steigt nicht gleichmäßig mit der Nennfläche.</h2><p>Herstellerpositionierung, Navigation und Ausstattung wirken gleichzeitig auf den Preis. Die drei Gruppen zeigen deshalb nur, welche Produkte im aktuellen Bestand zusammenkommen.</p></div>
      <div className="mower-band-grid">{report.areaBands.map((item) => <article key={item.label}><p>{item.label}</p><strong>{euro(item.medianPriceEur)}</strong><span>mittlerer Angebotspreis</span><dl><div><dt>Modelle</dt><dd>{item.count}</dd></div><div><dt>Mittlere Nennfläche</dt><dd>{number(item.medianAreaM2)} m²</dd></div><div><dt>Mittlere Steigung</dt><dd>{number(item.medianSlopePercent)} %</dd></div></dl></article>)}</div>
    </section>

    <section className="data-report-section data-evidence-gap" aria-labelledby="mower-gaps">
      <div><p className="eyebrow">Wo der Vergleich belastbar endet</p><h2 id="mower-gaps">Engstellen sind nur bei sieben Modellen konkret beziffert.</h2></div>
      <div className="data-gap-grid">
        <article><strong>{report.coverage.ratedArea} von {report.total}</strong><h3>Nennfläche vorhanden</h3><p>Dieser Wert ist vollständig dokumentiert. Er bleibt trotzdem eine Herstellerangabe und keine Garantie für jeden Grundriss.</p></article>
        <article><strong>{report.coverage.passage} von {report.total}</strong><h3>Mindestpassage vorhanden</h3><p>Bei acht Modellen fehlt eine belastbare Zentimeterangabe. Ein fehlender Wert wird nicht als breite Passage ausgelegt.</p></article>
        <article><strong>{report.coverage.obstacleDetection} von {report.total}</strong><h3>Hinderniserkennung bewertet</h3><p>Vier Modelle bleiben in diesem Punkt unbekannt. Markenbegriffe ersetzen keine dokumentierte technische Eigenschaft.</p></article>
      </div>
    </section>

    <ReportMethod updated={report.updatedLabel}>
      <p>Ausgewertet wurden alle als geprüft markierten Mähroboter im öffentlichen PassendPlanen Katalog. Pro Modell zählt der günstigste verfügbare Angebotspreis. Zubehör, Installationskosten und mögliche Abonnements sind nicht enthalten.</p>
      <p>Nennfläche, Steigung und Mindestpassage stammen aus den dokumentierten Produktangaben. Die Werte wurden nicht durch eigene Fahrtests ermittelt. Fehlende Angaben bleiben unbekannt und werden nicht durch Annahmen ersetzt.</p>
      <p>Die Stichprobe bildet die freigeschalteten Händlerprogramme ab und nicht den gesamten Markt. <Link href="/methodik/">Die Prüfmethode im Detail ansehen</Link>.</p>
    </ReportMethod>

    <section className="data-report-section data-next-step" aria-labelledby="mower-next-step">
      <div><p className="eyebrow">Das Grundstück entscheidet</p><h2 id="mower-next-step">Nettofläche, Zonen und engste Passage gemeinsam prüfen.</h2><p>Der Flächencheck berechnet einen Kapazitätsrahmen aus mehreren Rasenflächen, Wachstum, Steigung, Hindernissen und getrennten Bereichen. Danach werden nur Modelle gezeigt, deren dokumentierte Werte zu den Pflichtkriterien passen.</p></div>
      <Link className="button button--primary" href="/garten/maehroboter-rechner/">Mähroboter prüfen →</Link>
    </section>
    <DataReportLinks items={[
      { href: "/garten/maehroboter-begrenzungskabel-kabellos/", label: "Kabel oder kabellose Navigation", description: "Grundstück und Installationsbedingungen technisch einordnen." },
      { href: "/garten/maehroboter-steigung-engstellen/", label: "Steigung und Engstellen", description: "Die kritischen Stellen vor dem Kauf vermessen." },
      { href: "/ratgeber/vergleiche/maehroboter/", label: "Konkrete Mähroboter Vergleiche", description: "Navigation für reale Grundstückssituationen abwägen." },
    ]} />
  </main>;
}
