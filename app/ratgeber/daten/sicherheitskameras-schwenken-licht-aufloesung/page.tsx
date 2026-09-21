import Link from "next/link";
import { DataReportLinks, ReportMethod } from "@/components/data-report/DataReportBlocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { securityCameraFeatureReport as report } from "@/lib/data-report/additional-insights";
import { createDataReportStructuredData } from "@/lib/data-report/structured-data";
import { createPageMetadata } from "@/lib/metadata";

const PATH = "/ratgeber/daten/sicherheitskameras-schwenken-licht-aufloesung/";
const title = "Sicherheitskameras mit Schwenken, Licht und 4K im Datencheck";
const description = `${report.total} geprüfte Sicherheitskameras nach Schwenkfunktion, integriertem Licht, Einsatzort und Auflösung ausgewertet. Mit sichtbarer Verkleinerung der Auswahl bei kombinierten Anforderungen.`;

export const metadata = createPageMetadata({ title, description, path: PATH, kind: "article", modifiedTime: "2026-09-21" });

const number = (value: number, digits = 0) => value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const euro = (value: number) => value.toLocaleString("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Page() {
  return <main className="data-report-page camera-feature-page">
    <JsonLd data={createDataReportStructuredData({ path: PATH, title, description, datasetName: "PassendPlanen Auswertung von Sicherheitskamera Funktionen", datasetDescription: `Auswertung von ${report.total} geprüften Sicherheitskameras nach Einsatzort, Schwenkfunktion, integriertem Licht, Auflösung und Verbindung.`, datasetSize: report.total, variables: ["Einsatzort", "Schwenkfunktion", "integriertes Licht", "Auflösung", "Verbindung", "Stromversorgung", "Angebotspreis"], updatedAt: "2026-09-21" })} />

    <header className="camera-feature-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Datenauswertungen", href: "/ratgeber/daten/" }, { label: "Kamerafunktionen" }]} />
      <div><p className="eyebrow">{report.total} Kameraprodukte mit vollständigen Funktionsdaten</p><h1>Schwenken, Licht und hohe Auflösung sind <em>drei getrennte Entscheidungen</em>.</h1><p>Eine bewegliche Kamera hat nicht automatisch ein integriertes Licht. Eine 4K Angabe sagt nichts über den Blickwinkel oder die Erkennung bei Nacht. Der aktuelle Katalog zeigt, wie schnell eine scheinbar große Auswahl schrumpft, wenn mehrere Anforderungen gleichzeitig gelten.</p></div>
    </header>

    <section className="camera-feature-matrix" aria-labelledby="camera-matrix-title">
      <div><p className="eyebrow">Vier Funktionsprofile</p><h2 id="camera-matrix-title">Die häufigste Kombination bleibt fest ausgerichtet und ohne Licht.</h2><p>Alle Produkte haben eindeutige Angaben zur Schwenkfunktion und zum integrierten Licht. Damit lassen sich die vier Profile ohne Annahmen bilden.</p></div>
      <div className="camera-feature-grid">
        {report.featureProfiles.map((profile) => <article key={profile.key}>
          <div aria-hidden="true"><span className={profile.panTilt ? "is-active" : ""}>Schwenken</span><span className={profile.integratedLight ? "is-active" : ""}>Licht</span></div>
          <strong>{profile.count}</strong><h3>{profile.label}</h3>
          <p>{profile.outdoor} für außen und {profile.indoor} für innen. Mittlerer Produktpreis {profile.count ? euro(profile.medianPriceEur) : "nicht berechenbar"}.</p>
        </article>)}
      </div>
    </section>

    <section className="data-report-section camera-placement-story" aria-labelledby="camera-placement-title">
      <div><p className="eyebrow">Innen und außen sind verschieden verteilt</p><h2 id="camera-placement-title">Integriertes Licht kommt in der Stichprobe nur bei Außenkameras vor.</h2><p>Das ist eine Beobachtung dieses Katalogs und keine technische Regel. Für eine Auswahl zählt zusätzlich, ob das Licht den gewünschten Bereich sinnvoll erreicht und am Standort erlaubt sowie nachbarschaftsverträglich eingesetzt werden kann.</p></div>
      <div>
        {report.placements.map((placement) => <article key={placement.key}><span>{placement.label}</span><strong>{placement.count} Produkte</strong><dl><div><dt>Schwenkbar</dt><dd>{placement.panTilt}</dd></div><div><dt>Mit Licht</dt><dd>{placement.integratedLight}</dd></div><div><dt>Mit 4K Angabe</dt><dd>{placement.resolution4k}</dd></div></dl></article>)}
      </div>
    </section>

    <section className="camera-filter-path" aria-labelledby="camera-filter-title">
      <div><p className="eyebrow">Eine konkrete Filterfolge</p><h2 id="camera-filter-title">Aus {report.total} Produkten wird bei vier kombinierten Anforderungen eines.</h2><p>Die Folge zeigt keine Empfehlung. Sie macht sichtbar, weshalb Funktionen nicht unabhängig voneinander gezählt werden dürfen.</p></div>
      <ol>
        <li><span>Gesamter Katalog</span><strong>{report.total}</strong><small>geprüfte Kameraprodukte</small></li>
        <li><span>Für außen</span><strong>{report.filterPath.outdoor}</strong><small>Einsatzort bestätigt</small></li>
        <li><span>Zusätzlich mit Licht</span><strong>{report.filterPath.outdoorWithLight}</strong><small>integrierte Beleuchtung</small></li>
        <li><span>Zusätzlich schwenkbar</span><strong>{report.filterPath.outdoorWithLightAndMovement}</strong><small>beide Funktionen kombiniert</small></li>
        <li><span>Zusätzlich 4K</span><strong>{report.filterPath.outdoorWithLightMovementAnd4k}</strong><small>alle vier Kriterien gemeinsam</small></li>
      </ol>
    </section>

    <section className="data-report-section camera-resolution-story" aria-labelledby="camera-resolution-title">
      <div className="data-report-heading"><p className="eyebrow">Auflösung im Sortiment</p><h2 id="camera-resolution-title">2K ist häufig. 3K bleibt die kleinste Gruppe.</h2><p>Die Einordnung folgt den normalisierten Händlerangaben. Auflösung allein beschreibt weder Bildwinkel noch Dynamikumfang, Kompression, Nachtsicht oder Erkennungsleistung.</p></div>
      <div className="camera-resolution-rows">
        {report.resolutions.map((resolution) => <article key={resolution.key}><strong>{resolution.label}</strong><span>{resolution.count} Produkte</span><div><i style={{ width: `${resolution.share}%` }} /></div><p>{resolution.wifi} mit WLAN, {resolution.poe} mit PoE und {resolution.cellular} mit Mobilfunk.</p></article>)}
      </div>
      <div className="data-callout"><strong>Warum 4K kein automatisches Qualitätsurteil ist</strong><p>Eine höhere Pixelzahl kann mehr Bilddetails liefern, erhöht aber häufig Speicherbedarf und Datenrate. Ob ein Gesicht oder Kennzeichen erkennbar wird, hängt zusätzlich von Entfernung, Licht, Objektiv, Blickwinkel und Bewegung ab.</p></div>
    </section>

    <section className="data-report-section camera-feature-boundary" aria-labelledby="camera-boundary-title"><div><p className="eyebrow">Was der Feed nicht beantwortet</p><h2 id="camera-boundary-title">Die Funktionsliste ersetzt keinen Standorttest.</h2></div><p>Die Daten sagen, ob Schwenken, Licht und eine Auflösungsklasse dokumentiert sind. Sie enthalten keine belastbare Reichweite bei Nacht, keine Bewertung der Gegenlichtsituation und keine Garantie für Funkempfang oder Erkennung. Auch Datenschutz und zulässiger Aufnahmebereich müssen am konkreten Standort geprüft werden.</p></section>

    <ReportMethod updated={report.updatedLabel}>
      <p>Ausgewertet wurden {report.total} geprüfte Sicherheitskameraprodukte von {report.brands} Marken. Einsatzort, Verbindung, Stromversorgung, Auflösung, Kamerazahl, Schwenkfunktion und integriertes Licht sind für alle Produkte normalisiert dokumentiert.</p>
      <p>Sets werden als ein Produkt gezählt, unabhängig von der enthaltenen Kamerazahl. Preise beziehen sich auf das vollständige Produkt oder Set und dürfen deshalb nicht als Preis je Kamera gelesen werden. Die kleine Stichprobe zeigt den aktuellen PassendPlanen Katalog und nicht den gesamten Markt.</p>
    </ReportMethod>

    <section className="data-report-section data-next-step"><div><p className="eyebrow">Anforderungen gemeinsam filtern</p><h2>Standort, Strom und Funktionen in einer Auswahl prüfen.</h2><p>Der Sicherheitskamera Finder verbindet den Einsatzort mit Verbindung, Stromversorgung, Auflösung, Schwenken, Licht und der benötigten Zahl an Bereichen.</p></div><Link className="button button--primary" href="/haus/sicherheit/sicherheitskamera-finder/">Kameras filtern →</Link></section>
    <DataReportLinks items={[
      { href: "/ratgeber/daten/sicherheitskameras-verbindung-strom-setgroesse/", label: "Verbindung und Setgröße", description: "WLAN, PoE, Mobilfunk und Kosten für vier Bereiche einordnen." },
      { href: "/ratgeber/sicherheitskameras/wie-viele-kameras-einfamilienhaus/", label: "Kamerazahl planen", description: "Blickwinkel und Grundstücksbereiche vor der Produktauswahl skizzieren." },
      { href: "/haus/sicherheit/sicherheitskamera-speicher-rechner/", label: "Speicherbedarf berechnen", description: "Bitrate, Aufnahmezeit und Aufbewahrung nachvollziehbar verbinden." },
    ]} />
  </main>;
}
