import Link from "next/link";
import { DataReportLinks, ReportBarList, ReportMethod, ReportMetricGrid } from "@/components/data-report/DataReportBlocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { securityCameraDataReport as report } from "@/lib/data-report/catalog-insights";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

const PATH = "/ratgeber/daten/sicherheitskameras-verbindung-strom-setgroesse/";
const title = "20 Sicherheitskameras im Datencheck. Verbindung, Strom und Setgröße";
const description = "20 geprüfte Sicherheitskameras nach WLAN, PoE, Mobilfunk, Stromversorgung, Auflösung und Kosten für vier Überwachungszonen ausgewertet.";

export const metadata = createPageMetadata({ title, description, path: PATH, kind: "article", modifiedTime: "2026-09-16" });

const euro = (value: number) => value.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export default function Page() {
  const outdoor = report.placement.find((item) => item.key === "outdoor")!;
  const wifi = report.connection.find((item) => item.key === "wifi")!;

  return <main className="data-report-page data-report-page--camera">
    <JsonLd data={[
      { "@context": "https://schema.org", "@type": "Article", headline: title, description, dateModified: "2026-09-16", datePublished: "2026-09-16", author: { "@type": "Person", name: "Schayan Yousefian", url: absoluteUrl("/ueber-passendplanen/") }, mainEntityOfPage: absoluteUrl(PATH) },
      { "@context": "https://schema.org", "@type": "Dataset", name: "PassendPlanen Auswertung geprüfter Sicherheitskameras", description: `Auswertung von ${report.total} geprüften Sicherheitskameras nach Verbindung, Stromversorgung, Kamerazahl, Auflösung und Angebotspreis.`, dateModified: "2026-09-16", creator: { "@type": "Organization", name: "PassendPlanen", url: absoluteUrl("/") }, variableMeasured: ["Einsatzort", "Verbindung", "Stromversorgung", "Auflösung", "Kamerazahl", "Angebotspreis"] },
    ]} />
    <header className="data-report-hero data-report-hero--camera">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Datenauswertungen", href: "/ratgeber/daten/" }, { label: "Sicherheitskameras" }]} />
      <div className="data-report-hero-grid">
        <div><p className="eyebrow">20 geprüfte Sicherheitskameras</p><h1>WLAN dominiert den Katalog. Die eigentliche Planung beginnt bei <em>Strom und Kamerazahl</em>.</h1><p>Eine Funkverbindung löst weder die Energieversorgung noch die Abdeckung mehrerer Grundstücksseiten. Wir haben deshalb nicht nur Anschlusstechnik gezählt, sondern auch berechnet, wie viele Produktsets für vier Überwachungszonen nötig wären.</p></div>
        <aside><strong>Vier Zonen sind vier Blickwinkel</strong><p>Die Beispielrechnung setzt eine Kamera pro Zone an. Sie ersetzt keine Begehung. Ein geeigneter Blickwinkel kann mehrere Bereiche erfassen, während verwinkelte Zugänge zusätzliche Kameras benötigen.</p></aside>
      </div>
    </header>

    <section className="data-report-section camera-data-opening" aria-labelledby="camera-data-overview">
      <div className="data-report-heading"><p className="eyebrow">Die Stichprobe</p><h2 id="camera-data-overview">Außenmodelle und WLAN prägen das Angebot deutlich.</h2></div>
      <ReportMetricGrid ariaLabel="Kennzahlen der Sicherheitskameraauswertung" items={[
        { value: `${report.total}`, label: "geprüfte Produkte", note: `${report.brands} Marken mit aktuellem Angebot` },
        { value: `${outdoor.count}`, label: "Produkte für außen", note: "Drei Produkte sind für innen erfasst" },
        { value: `${wifi.count}`, label: "Produkte mit WLAN", note: "PoE und Mobilfunk bilden kleine Gruppen" },
        { value: euro(report.medianPriceEur), label: "mittlerer Produktpreis", note: "Setgröße und Folgekosten unterscheiden sich" },
      ]} />
    </section>

    <section className="data-report-section camera-combination-section" aria-labelledby="camera-combinations">
      <div className="camera-combination-copy"><p className="eyebrow">Verbindung und Strom gehören zusammen</p><h2 id="camera-combinations">Im Katalog erscheinen fünf konkrete Kombinationen.</h2><p>WLAN bedeutet nur, dass die Daten per Funk übertragen werden. Sieben WLAN Produkte benötigen trotzdem einen Stromanschluss. Sieben weitere arbeiten mit Akku und drei mit Solarversorgung. PoE führt Daten und Energie über dasselbe Netzwerkkabel.</p><p>Das Mobilfunkmodell der Stichprobe nutzt Solarstrom. Daraus folgt keine allgemeine technische Kopplung. Es ist lediglich die Kombination des aktuell erfassten Produkts.</p></div>
      <ReportBarList ariaLabel="Kombinationen aus Verbindung und Stromversorgung" maxValue={report.total} items={report.combinations.map((item) => ({ label: item.label, value: item.count, displayValue: `${item.count} ${item.count === 1 ? "Produkt" : "Produkte"}` }))} />
    </section>

    <section className="data-report-section camera-four-zone" aria-labelledby="camera-four-zone-title">
      <div className="camera-four-zone-heading"><p className="eyebrow">Beispiel mit vier Überwachungszonen</p><h2 id="camera-four-zone-title">Die Packungsgröße verändert den rechnerischen Produktpreis stärker als ein einzelnes Preisschild vermuten lässt.</h2><p>Für jedes Produkt wird die Packungsgröße auf mindestens vier Kameras aufgerundet. Ein Einzelmodell wird viermal benötigt, ein Zweierset zweimal und ein Viererset einmal. Montage, Speicher, Abonnement, Verkabelung und Netzwerkgeräte bleiben außen vor.</p></div>
      <div className="camera-set-grid">{report.setSizes.map((item) => <article key={item.cameraCount}>
        <span>{item.cameraCount === 1 ? "Einzelkamera" : `${item.cameraCount} Kameras im Produkt`}</span>
        <strong>{euro(item.medianTotalEur)}</strong>
        <p>mittlerer Produktwert für vier Zonen</p>
        <dl><div><dt>Produkte im Katalog</dt><dd>{item.products}</dd></div><div><dt>Benötigte Käufe</dt><dd>{item.requiredSets}</dd></div><div><dt>Mittlere Hälfte</dt><dd>{euro(item.lowerTotalEur)} bis {euro(item.upperTotalEur)}</dd></div></dl>
      </article>)}</div>
      <div className="data-callout"><strong>Gleiche Kamerazahl bedeutet nicht gleiche Lösung</strong><p>Ein Produktset kann eine gemeinsame Basisstation, einen Recorder oder nur mehrere eigenständige Kameras enthalten. Cloudkosten und lokaler Speicher sind ebenfalls nicht im Kaufpreis abgebildet. Der Lieferumfang muss beim konkreten Angebot geprüft werden.</p></div>
    </section>

    <section className="data-report-section camera-resolution-section" aria-labelledby="camera-resolution-title">
      <div><p className="eyebrow">Auflösung in der Stichprobe</p><h2 id="camera-resolution-title">2K ist häufig. Ein Qualitätsurteil ergibt sich daraus nicht.</h2><p>Zwölf Produkte sind mit 2K dokumentiert, fünf mit 4K und drei mit HD. Die Pixelzahl allein beschreibt weder Nachtsicht noch Gegenlicht, Kompression, Erkennungsdistanz oder die Qualität bewegter Bilder.</p><p>Für die Speicherplanung wirkt eine höhere Bitrate unmittelbar. Ein 4K Etikett reicht jedoch nicht, um die tatsächliche Bitrate zu bestimmen.</p></div>
      <ReportBarList ariaLabel="Auflösungen der geprüften Sicherheitskameras" maxValue={report.total} items={report.resolution.map((item) => ({ label: item.label, value: item.count, displayValue: `${item.count} Produkte`, detail: item.count === 0 ? "In der aktuellen Stichprobe nicht vertreten" : undefined }))} />
    </section>

    <section className="data-report-section camera-data-questions" aria-labelledby="camera-questions-title">
      <div><p className="eyebrow">Was vor dem Preisvergleich feststehen sollte</p><h2 id="camera-questions-title">Vier Ortsfragen grenzen die Auswahl sinnvoller ein.</h2></div>
      <div className="camera-question-grid">
        <article><span>01</span><h3>Welche Bereiche müssen sichtbar sein</h3><p>Zufahrt, Haustür und Garten benötigen eigene Blickwinkel. Öffentlicher Raum sollte möglichst gar nicht erfasst werden.</p></article>
        <article><span>02</span><h3>Wo liegen Strom und Netzwerk</h3><p>Ein vorhandenes Kabel kann PoE attraktiv machen. Ohne Anschluss werden Akkuwechsel, Solarertrag und Funkqualität relevant.</p></article>
        <article><span>03</span><h3>Wie wird aufgezeichnet</h3><p>Lokaler Speicher, Recorder und Cloud unterscheiden sich bei Kosten, Ausfallsicherheit und Wartung.</p></article>
        <article><span>04</span><h3>Welche Details müssen erkennbar sein</h3><p>Entfernung, Licht, Bewegung und Bildwinkel sind für die nutzbare Aufnahme wichtiger als das Auflösungsetikett allein.</p></article>
      </div>
    </section>

    <ReportMethod updated={report.updatedLabel}>
      <p>Die Auswertung umfasst alle geprüften Sicherheitskameras im öffentlichen PassendPlanen Katalog. Pro Produkt wurde der günstigste verfügbare Angebotspreis verwendet. Die erfasste Kamerazahl entspricht dem dokumentierten Produktumfang.</p>
      <p>Für das Vier Zonen Szenario wurde die benötigte Zahl vollständiger Produkte aufgerundet. Es handelt sich um eine transparente Rechenannahme und nicht um eine Empfehlung für jedes Grundstück.</p>
      <p>Die Stichprobe bildet die verfügbaren Partnerangebote ab und nicht den gesamten Markt. Preise können sich ändern. Rechtliche Zulässigkeit, Montage und laufende Kosten werden nicht aus den Produktdaten abgeleitet. <Link href="/methodik/">Mehr zur Prüfmethode</Link>.</p>
    </ReportMethod>

    <section className="data-report-section data-next-step" aria-labelledby="camera-data-next-step">
      <div><p className="eyebrow">Vom Grundstück zum passenden Produkt</p><h2 id="camera-data-next-step">Einsatzort, Verbindung und Budget konkret filtern.</h2><p>Der Kamera Finder berücksichtigt Außen oder Innenbereich, gewünschte Verbindung, vorhandene Stromversorgung, Mindestauflösung und die Zahl der abzudeckenden Zonen.</p></div>
      <Link className="button button--primary" href="/haus/sicherheit/sicherheitskamera-finder/">Kamera Finder öffnen →</Link>
    </section>
    <DataReportLinks items={[
      { href: "/ratgeber/sicherheitskameras/wlan-oder-poe/", label: "WLAN oder PoE", description: "Verkabelung, Funkstrecke und Wartung am Standort abwägen." },
      { href: "/ratgeber/sicherheitskameras/akku-solar-oder-netzstrom/", label: "Akku, Solar oder Netzstrom", description: "Versorgung und laufenden Aufwand realistisch einordnen." },
      { href: "/haus/sicherheit/sicherheitskamera-speicher-rechner/", label: "Speicherbedarf berechnen", description: "Bitrate, Aufnahmezeit und Aufbewahrung zusammenführen." },
    ]} />
  </main>;
}
