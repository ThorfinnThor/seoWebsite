import Link from "next/link";
import { SecurityCameraArticle } from "@/components/seo/SecurityCameraArticle";
import { createPageMetadata } from "@/lib/metadata";

const path = "/ratgeber/sicherheitskameras/wlan-oder-poe/";

export const metadata = createPageMetadata({
  title: "WLAN Kamera oder PoE Kamera für das Haus",
  description: "WLAN und PoE Kameras anhand von Verkabelung, Stromversorgung, Stabilität, Wartung und typischen Einbausituationen vergleichen.",
  path,
  kind: "article",
  modifiedTime: "2026-09-08",
});

const sources = [
  {
    href: "https://ethernetalliance.org/wp-content/uploads/2019/12/WP_EA_Overview8023bt_V2p1_FINAL.pdf",
    label: "Überblick zum Standard IEEE 802.3bt",
    publisher: "Ethernet Alliance",
    note: "Technischer Hintergrund zur gemeinsamen Übertragung von Daten und elektrischer Leistung über ein Netzwerkkabel.",
  },
  {
    href: "https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/cyber-sicherheitsempfehlungen.html",
    label: "Basistipps zur Sicherheit vernetzter Geräte",
    publisher: "Bundesamt für Sicherheit in der Informationstechnik",
    note: "Hinweise zu Aktualisierungen und Sicherheitseinstellungen bei vernetzten Geräten einschließlich Überwachungskameras.",
  },
] as const;

export default function Page() {
  return <SecurityCameraArticle
    title="WLAN Kamera oder PoE Kamera"
    intro="Beide Techniken können ein klares Bild liefern. Der praktische Unterschied liegt im Weg dorthin. WLAN spart die Datenleitung, PoE bündelt Daten und Strom in einem Kabel. Welche Lösung besser passt, zeigt sich am Gebäude und nicht auf der Verpackung."
    path={path}
    summary="WLAN passt häufig zu bestehenden Häusern mit guter Funkabdeckung und erreichbarer Stromversorgung. PoE ist besonders interessant, wenn Leitungen ohnehin geplant werden oder eine dauerhaft berechenbare Verbindung wichtig ist."
    wordCount={1080}
    sources={[...sources]}
  >
    <section className="camera-opening-question">
      <p className="eyebrow">Die entscheidende Frage</p>
      <h2>Kann an jedem Montagepunkt eine verlässliche Verbindung entstehen?</h2>
      <p>Ein starkes WLAN im Wohnzimmer sagt wenig über die Hausecke unter dem Dachüberstand. Außenwände, Metallteile, Wärmeschutzverglasung und die Entfernung zum Router können den Empfang deutlich verändern. Bei PoE liegt die Herausforderung an anderer Stelle. Das Netzwerkkabel muss vom Technikraum bis zur Kamera geführt und sauber gegen Feuchtigkeit, Zug und Beschädigung geschützt werden.</p>
      <p>Deshalb beginnt die Auswahl mit einer Begehung. Halte ein Smartphone an den vorgesehenen WLAN Standort und prüfe die Verbindung zu verschiedenen Tageszeiten. Für PoE zeichnest du den vollständigen Kabelweg ein. Mauerdurchführungen, Leerrohre und der Platz für Switch oder Rekorder gehören zur Rechnung.</p>
    </section>

    <section className="camera-situation-pair">
      <article>
        <span>Bestehendes Haus</span>
        <h2>Wenig Eingriff in die Bausubstanz</h2>
        <p>Wenn am Montageort bereits Strom liegt und das WLAN stabil ankommt, ist eine WLAN Kamera oft schnell eingebunden. Das gilt etwa für eine vorhandene Außenleuchte oder eine Steckdose im geschützten Bereich.</p>
      </article>
      <article>
        <span>Sanierung oder Neubau</span>
        <h2>Leitungen von Anfang an mitdenken</h2>
        <p>Offene Wände und vorhandene Leerrohre machen PoE deutlich attraktiver. Jede Kamera erhält eine feste Datenverbindung und ihre Versorgung aus dem Technikbereich.</p>
      </article>
    </section>

    <section>
      <h2>Der direkte Vergleich im Alltag</h2>
      <div className="camera-table-wrap">
        <table>
          <thead><tr><th scope="col">Prüfpunkt</th><th scope="col">WLAN</th><th scope="col">PoE</th></tr></thead>
          <tbody>
            <tr><th scope="row">Datenweg</th><td>Funk zwischen Kamera und Zugangspunkt</td><td>Festes Netzwerkkabel bis zum Switch oder Rekorder</td></tr>
            <tr><th scope="row">Strom</th><td>Je nach Modell Netzteil, Festanschluss, Akku oder Solar</td><td>In der Regel über dasselbe Netzwerkkabel</td></tr>
            <tr><th scope="row">Montage</th><td>Wenig Datenverkabelung, Funkprobe bleibt notwendig</td><td>Mehr Planung für Leitungswege und Durchführungen</td></tr>
            <tr><th scope="row">Stabilität</th><td>Abhängig von Reichweite, Störungen und Gebäudestruktur</td><td>Berechenbar, wenn Kabel und Netzwerkkomponenten passen</td></tr>
            <tr><th scope="row">Ausfall</th><td>Router und örtliche Stromversorgung sind relevant</td><td>Switch, Rekorder und zentrale Stromversorgung sind relevant</td></tr>
            <tr><th scope="row">Erweiterung</th><td>Ein weiterer Standort braucht Funk und Strom</td><td>Ein weiterer Standort braucht einen vollständigen Kabelweg und einen freien Anschluss</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="camera-case-study">
      <p className="eyebrow">Zwei reale Gebäudesituationen</p>
      <h2>Warum dieselbe Kameraentscheidung an zwei Häusern anders ausfällt</h2>
      <div>
        <article><h3>Altbau mit fertiger Fassade</h3><p>Die Einfahrt liegt nah am Router, am Vordach ist ein geschalteter Stromanschluss vorhanden. Hier kann WLAN sinnvoll sein. Vorher muss geklärt werden, ob der Lichtschalter dauerhaft überbrückt werden darf und ob der Empfang auch bei geschlossenen Rollläden stabil bleibt.</p></article>
        <article><h3>Sanierung mit offenem Dachkasten</h3><p>Vier Hausecken sind während der Arbeiten zugänglich. In diesem Fall lässt sich eine strukturierte Netzverkabelung ohne spätere sichtbare Kanäle vorbereiten. PoE schafft eine feste Grundlage und kann gemeinsam mit einer unterbrechungsfreien Stromversorgung geplant werden.</p></article>
      </div>
    </section>

    <section>
      <h2>Aufzeichnung und Netzwerk gehören in dieselbe Planung</h2>
      <p>Eine Kamera ist kein abgeschlossenes Einzelgerät. Prüfe, ob sie lokal auf einer Speicherkarte, auf einem Rekorder, in einem Netzwerkspeicher oder in einer Cloud aufzeichnet. Für eine dauerhafte Aufzeichnung entsteht mehr Datenverkehr als bei kurzen Ereignisclips. Mehrere hochauflösende WLAN Kameras können deshalb andere Anforderungen stellen als ein einzelnes Gerät am Eingang.</p>
      <p>Auch die Absicherung zählt. Das Bundesamt für Sicherheit in der Informationstechnik empfiehlt bei vernetzten Geräten einen Blick auf regelmäßige Aktualisierungen und Sicherheitseinstellungen. Ein eigenes Netz für Geräte des Smart Home kann sinnvoll sein. Standardkennwörter, nicht mehr unterstützte Kameras und offen erreichbare Fernzugänge passen zu keiner der beiden Verbindungstechniken.</p>
    </section>

    <section className="camera-buy-check">
      <h2>Diese fünf Nachweise sollten vor dem Kauf vorliegen</h2>
      <ol>
        <li>Ein Funkprotokoll am echten Standort oder ein vollständig gezeichneter Kabelweg</li>
        <li>Eine geklärte Stromversorgung für jede Kamera und alle zentralen Geräte</li>
        <li>Ausreichend Anschlüsse und Leistungsreserve am PoE Switch oder genügend WLAN Kapazität</li>
        <li>Ein konkreter Speicherort mit passender Kapazität und klarer Zugriffskontrolle</li>
        <li>Ein Herstellerplan für Sicherheitsupdates und eine verständliche Möglichkeit zur Aktualisierung</li>
      </ol>
      <p>Wenn einer dieser Punkte offen bleibt, hilft ein teureres Kameramodell nur selten. Der Engpass liegt dann in der Installation.</p>
    </section>

    <p className="camera-inline-link">Passende Modelle lassen sich im <Link href="/haus/sicherheit/sicherheitskamera-finder/">Sicherheitskamera Finder</Link> nach Verbindung und Stromversorgung filtern.</p>
  </SecurityCameraArticle>;
}
