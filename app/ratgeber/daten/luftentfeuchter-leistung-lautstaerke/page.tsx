import Link from "next/link";
import { DataReportLinks, ReportBarList, ReportMethod, ReportMetricGrid } from "@/components/data-report/DataReportBlocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { dehumidifierDataReport as report } from "@/lib/data-report/catalog-insights";
import { createDataReportStructuredData } from "@/lib/data-report/structured-data";
import { createPageMetadata } from "@/lib/metadata";

const PATH = "/ratgeber/daten/luftentfeuchter-leistung-lautstaerke/";
const title = "42 Luftentfeuchter geprüft. Leistung, Lautstärke und Datenlücken";
const description = "42 geprüfte Luftentfeuchter nach Entfeuchtungsleistung, Geräusch, Stromaufnahme, Betriebstemperatur, Ablauf und Wäschemodus ausgewertet.";

export const metadata = createPageMetadata({ title, description, path: PATH, kind: "article", modifiedTime: "2026-09-16" });

const euro = (value: number) => value.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const number = (value: number, digits = 0) => value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export default function Page() {
  return <main className="data-report-page data-report-page--dehumidifier">
    <JsonLd data={createDataReportStructuredData({ path: PATH, title, description, datasetName: "PassendPlanen Auswertung geprüfter Luftentfeuchter", datasetDescription: `Auswertung von ${report.total} geprüften Luftentfeuchtern nach Leistung, Geräusch, Stromaufnahme, Betriebstemperatur und Ausstattung.`, datasetSize: report.total, variables: ["Entfeuchtungsleistung", "Geräusch", "Leistungsaufnahme", "Betriebstemperatur", "Dauerablauf", "Wäschemodus"], updatedAt: "2026-09-16" })} />
    <header className="data-report-hero data-report-hero--dehumidifier">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Datenauswertungen", href: "/ratgeber/daten/" }, { label: "Luftentfeuchter" }]} />
      <div className="data-report-hero-grid">
        <div><p className="eyebrow">Nicht jede Zahl steht im Datenblatt</p><h1>42 Luftentfeuchter geprüft. Die größte Erkenntnis sind die <em>Datenlücken</em>.</h1><p>Leistung, Geräusch und Stromaufnahme lassen sich nur vergleichen, wenn sie für genügend Geräte dokumentiert sind. Unsere Auswertung trennt deshalb verfügbare Messwerte von bloßen Produktversprechen.</p></div>
        <aside><strong>Nur 15 Geräuschwerte</strong><p>Eine Liste der leisesten 42 Geräte wäre mit diesen Daten nicht seriös. Wir zeigen stattdessen, wie groß die belastbare Teilstichprobe ist und welche Prüfung vor dem Kauf fehlt.</p></aside>
      </div>
    </header>

    <section className="data-report-section" aria-labelledby="dehumidifier-summary">
      <div className="data-report-heading"><p className="eyebrow">Was sicher gezählt werden kann</p><h2 id="dehumidifier-summary">Zwölf Marken, 42 geprüfte Modelle und 25 Modelle mit aktuellem Angebot.</h2><p>Die Produktprüfung bleibt auch dann im Katalog erhalten, wenn ein Angebot vorübergehend nicht verfügbar ist. Preise beziehen sich nur auf aktuell verfügbare Produkte.</p></div>
      <ReportMetricGrid ariaLabel="Kennzahlen der Luftentfeuchterauswertung" items={[
        { value: report.total.toLocaleString("de-DE"), label: "geprüfte Modelle", note: `${report.brands} Marken` },
        { value: report.available.toLocaleString("de-DE"), label: "aktuell mit Angebot", note: "Verfügbarkeit zum Datenstand" },
        { value: `${number(report.summary.medianExtractionLPerDay)} l/Tag`, label: "mittlere Nennleistung", note: `aus ${report.summary.extractionKnown} dokumentierten Werten` },
        { value: `${number(report.summary.medianNoiseDb)} dB`, label: "mittlerer Geräuschwert", note: `aus ${report.summary.noiseKnown} dokumentierten Werten` },
      ]} />
    </section>

    <section className="data-report-section dehumidifier-coverage" aria-labelledby="dehumidifier-coverage-title">
      <div><p className="eyebrow">Vollständigkeit vor Vergleich</p><h2 id="dehumidifier-coverage-title">Die wichtigsten Auswahlwerte sind unterschiedlich gut dokumentiert.</h2><p>Die Nennleistung ist bei zwei Dritteln der Modelle vorhanden. Beim Geräuschwert sinkt die Abdeckung auf gut ein Drittel. Leistungsaufnahme und niedrigste Betriebstemperatur fehlen noch häufiger.</p><p>Gerade für einen kalten Keller ist die Betriebstemperatur entscheidend. Nur drei dokumentierte Werte reichen nicht für eine belastbare Rangfolge aller Geräte.</p></div>
      <ReportBarList ariaLabel="Abdeckung technischer Angaben bei Luftentfeuchtern" maxValue={report.total} items={report.coverage.map((item) => ({ label: item.label, value: item.count, displayValue: `${item.count} von ${report.total}`, detail: `${number(item.share, 1)} Prozent dokumentiert` }))} />
    </section>

    <section className="data-report-section dehumidifier-bands" aria-labelledby="dehumidifier-bands-title">
      <div className="data-report-heading"><p className="eyebrow">Leistungsklassen innerhalb der Teilstichprobe</p><h2 id="dehumidifier-bands-title">Mehr Liter pro Tag lösen nicht automatisch das richtige Raumproblem.</h2><p>Die Gruppen beruhen ausschließlich auf den {report.summary.extractionKnown} Modellen mit dokumentierter Nennleistung. Messbedingungen können zwischen Herstellern abweichen und die reale Leistung fällt bei niedriger Temperatur häufig anders aus.</p></div>
      <div className="data-table-wrap"><table>
        <caption>Dokumentierte Entfeuchtungsleistung nach Größenklasse</caption>
        <thead><tr><th scope="col">Nennleistung</th><th scope="col">Modelle</th><th scope="col">Aktuell verfügbar</th><th scope="col">Mittlere Leistung</th><th scope="col">Geräusch dokumentiert</th><th scope="col">Mittlerer Angebotspreis</th></tr></thead>
        <tbody>{report.performanceBands.map((item) => <tr key={item.label}><th scope="row">{item.label}</th><td>{item.count}</td><td>{item.available}</td><td>{number(item.medianExtractionLPerDay, 1)} l/Tag</td><td>{item.noiseKnown} von {item.count}</td><td>{item.available > 0 ? euro(item.medianPriceEur) : "Kein aktuelles Angebot"}</td></tr>)}</tbody>
      </table></div>
      <div className="data-callout"><strong>Nennleistung braucht einen Prüfkontext</strong><p>Ein Wert in Litern pro Tag entsteht unter festgelegten Temperatur und Feuchtebedingungen. Für Keller, Schlafzimmer oder Wäschetrocknung zählt zusätzlich, wie das Gerät unter den tatsächlichen Bedingungen arbeitet.</p></div>
    </section>

    <section className="data-report-section dehumidifier-use-cases" aria-labelledby="dehumidifier-use-title">
      <div><p className="eyebrow">Zwei Räume, zwei Prioritäten</p><h2 id="dehumidifier-use-title">Die beste Kennzahl hängt vom Einsatzort ab.</h2></div>
      <div className="dehumidifier-use-grid">
        <article><span>Wohnraum und Schlafzimmer</span><h3>Geräusch und Regelung werden wichtiger</h3><p>Ein hoher Nennwert hilft wenig, wenn das Gerät wegen seiner Lautstärke selten läuft. Prüfe Betriebsstufen, Hygrostat und den Geräuschwert genau für den vorgesehenen Modus.</p><strong>{report.summary.noiseKnown} von {report.total} Geräten besitzen in der Stichprobe einen Geräuschwert.</strong></article>
        <article><span>Waschkeller und dauerhafte Feuchtelast</span><h3>Ablauf und Laufzeit entscheiden mit</h3><p>Ein Schlauchanschluss kann häufiges Leeren vermeiden. Er ersetzt keine Ursachenprüfung und benötigt ein sicheres Gefälle sowie einen geeigneten Ablauf.</p><strong>{report.featureCounts.continuousDrain} Geräte haben einen dokumentierten Dauerablauf.</strong></article>
        <article><span>Wäsche trocknen</span><h3>Der Modus ist häufiger als vollständige Leistungsdaten</h3><p>{report.featureCounts.laundryMode} Modelle sind mit einem Wäschemodus dokumentiert. Bei {report.featureCounts.laundryModeUnknown} Modellen bleibt die Eigenschaft unbekannt. Raumlüftung und Wäschemenge verändern die Laufzeit zusätzlich.</p></article>
        <article><span>Kalter Keller</span><h3>Die Mindesttemperatur darf nicht geraten werden</h3><p>Nur {report.coverage.find((item) => item.label === "Niedrigste Betriebstemperatur")?.count} Modelle besitzen einen dokumentierten Mindestwert. Für unbeheizte Räume muss deshalb das konkrete Datenblatt Vorrang vor jeder allgemeinen Produktempfehlung haben.</p></article>
      </div>
    </section>

    <section className="data-report-section dehumidifier-no-ranking" aria-labelledby="dehumidifier-no-ranking-title">
      <p className="eyebrow">Warum hier keine Bestenliste steht</p>
      <h2 id="dehumidifier-no-ranking-title">Unvollständige Vergleichswerte dürfen nicht mit Punkten kaschiert werden.</h2>
      <p>Ein Gerät ohne dokumentierten Geräuschwert ist nicht automatisch laut. Ein Modell ohne Leistungsaufnahme ist nicht automatisch ineffizient. Würden unbekannte Angaben mit null Punkten bewertet, entstünde eine scheinbar objektive Rangliste, die vor allem die Vollständigkeit der Händlerdaten misst.</p>
      <p>PassendPlanen verwendet fehlende Werte deshalb als offene Prüfaufgabe. Eine Empfehlung im Rechner setzt nur dort harte Grenzen, wo die notwendige Eigenschaft tatsächlich belegt ist.</p>
    </section>

    <ReportMethod updated={report.updatedLabel}>
      <p>Ausgewertet wurden {report.total} als geprüft markierte Luftentfeuchter aus dem PassendPlanen Katalog. Mehrere Angebote desselben Produkts zählen nur einmal. Der mittlere Angebotspreis verwendet pro Produkt das günstigste aktuell verfügbare Angebot und enthält keine unbekannten Lieferkosten.</p>
      <p>Technische Mittelwerte werden nur aus vorhandenen Angaben berechnet. Fehlende Werte gehen nicht als null ein. Nennleistung und Geräusch können unter unterschiedlichen Prüfbedingungen ermittelt worden sein und sind deshalb keine vollständige Labormessung unter identischen Bedingungen.</p>
      <p>Die Stichprobe bildet die freigeschalteten Händlerprogramme ab und ist nicht repräsentativ für den gesamten Markt. <Link href="/methodik/">Die PassendPlanen Methodik erklärt die Prüfung im Detail</Link>.</p>
    </ReportMethod>

    <section className="data-report-section data-next-step" aria-labelledby="dehumidifier-next-step">
      <div><p className="eyebrow">Vom Katalog zum Raum</p><h2 id="dehumidifier-next-step">Volumen, Temperatur und Nutzung gemeinsam einordnen.</h2><p>Der Luftentfeuchter Rechner verbindet Raumgröße, Feuchtebelastung, Temperatur, Ablauf, Geräusch und Wäschetrocknung. Wo Produktdaten fehlen, bleibt die Einschränkung sichtbar.</p></div>
      <Link className="button button--primary" href="/haus/raumklima/luftentfeuchter-rechner/">Gerätegröße berechnen →</Link>
    </section>
    <DataReportLinks items={[
      { href: "/ratgeber/luftentfeuchter-fuer-unbeheizten-keller/", label: "Luftentfeuchter im kalten Keller", description: "Temperatur und Funktionsprinzip vor der Auswahl prüfen." },
      { href: "/ratgeber/luftentfeuchter-kompressor-oder-adsorption/", label: "Kompressor oder Adsorption", description: "Die beiden Prinzipien nach Temperatur und Nutzung vergleichen." },
      { href: "/haus/raumklima/luftentfeuchter-stromverbrauch/", label: "Stromverbrauch einordnen", description: "Leistungsaufnahme, Laufzeit und Zielwert getrennt betrachten." },
    ]} />
  </main>;
}
