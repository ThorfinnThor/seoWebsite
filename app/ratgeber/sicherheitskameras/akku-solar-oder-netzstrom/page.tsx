import Link from "next/link";
import { SecurityCameraArticle } from "@/components/seo/SecurityCameraArticle";
import { createPageMetadata } from "@/lib/metadata";

const path = "/ratgeber/sicherheitskameras/akku-solar-oder-netzstrom/";

export const metadata = createPageMetadata({
  title: "Sicherheitskamera mit Akku, Solar oder Netzstrom",
  description: "Akku, Solarpanel und Netzstrom für Sicherheitskameras anhand von Standort, Aufzeichnung, Wartung und Ausfallsicherheit vergleichen.",
  path,
  kind: "article",
  modifiedTime: "2026-09-08",
});

const sources = [
  {
    href: "https://www.bsi.bund.de/EN/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Internet-der-Dinge-Smart-leben/Smart-Home/smart-home_node.html",
    label: "Sicherer Umgang mit Geräten im Smart Home",
    publisher: "Bundesamt für Sicherheit in der Informationstechnik",
    note: "Grundlagen zu Datenspeicherung, Sicherheitsrisiken und einem getrennten Funknetz für vernetzte Geräte.",
  },
] as const;

export default function Page() {
  return <SecurityCameraArticle
    title="Sicherheitskamera mit Akku, Solar oder Netzstrom"
    intro="Die Stromversorgung bestimmt nicht nur die Montage. Sie beeinflusst, wie oft eine Kamera aufzeichnet, wie viel Pflege sie braucht und ob sie im entscheidenden Moment noch arbeitet. Ein abgelegener Standort verlangt deshalb eine andere Lösung als eine Haustür mit vorhandenem Stromanschluss."
    path={path}
    summary="Netzstrom ist für häufige Aufnahmen und schwer erreichbare Montageorte meist die berechenbarste Lösung. Akku schafft Freiheit bei der Position. Solar kann den Pflegeaufwand senken, ersetzt aber weder einen ausreichend großen Akku noch einen geeigneten Standort."
    wordCount={1040}
    sources={[...sources]}
  >
    <section className="camera-power-intro">
      <p className="eyebrow">Nicht nur eine Montagefrage</p>
      <h2>Der Energiebedarf entsteht durch Nutzung und Umgebung</h2>
      <p>Ein Datenblatt nennt oft eine mögliche Akkulaufzeit. Im Alltag verändert sich dieser Wert durch Bewegung vor der Kamera, Livezugriffe, Funkqualität, Nachtsicht, Beleuchtung und Temperatur. Eine Kamera an einer ruhigen Seitentür arbeitet anders als dieselbe Kamera an einer belebten Einfahrt. Häufige Ereignisse bedeuten mehr Aufnahmen und damit mehr Energieverbrauch.</p>
      <p>Plane deshalb nicht mit dem günstigsten Herstellerwert. Entscheidend ist, ob die Versorgung auch während einer dunklen Winterwoche, bei vielen Meldungen oder nach längerer Abwesenheit zuverlässig bleibt.</p>
    </section>

    <section className="camera-power-grid">
      <article>
        <span>Akku</span>
        <h2>Freie Position mit wiederkehrender Pflege</h2>
        <p>Ein Akkumodell lässt sich ohne neue Stromleitung montieren. Das ist bei Mietobjekten, Nebengebäuden und wechselnden Positionen hilfreich. Der Preis für diese Freiheit ist ein fester Ladeablauf. Eine schwer erreichbare Kamera wird schnell lästig, wenn die Laufzeit am Standort deutlich kürzer ausfällt als erwartet.</p>
        <strong>Passt gut bei moderaten Ereignissen und erreichbarer Montagehöhe</strong>
      </article>
      <article>
        <span>Solar</span>
        <h2>Ladehilfe mit Standortbedingungen</h2>
        <p>Ein Solarpanel lädt den Akku nach, solange Ausrichtung, Licht und Wetter mitspielen. Dachüberstände, Bäume und tiefe Wintersonne können den Ertrag begrenzen. Auch Schmutz auf dem Panel gehört zur Wartung. Solar ist daher eine Unterstützung für ein Akkusystem und keine Garantie für unbegrenzten Betrieb.</p>
        <strong>Passt gut an hellen Orten mit sinnvoll ausrichtbarem Panel</strong>
      </article>
      <article>
        <span>Netzstrom</span>
        <h2>Dauerhafte Versorgung mit Installationsaufwand</h2>
        <p>Eine feste Versorgung eignet sich für häufige Aufnahmen, integriertes Licht und schwer erreichbare Positionen. Vorhandene Außenleuchten sind nicht automatisch ein geeigneter Anschluss. Schaltung, Schutzart und Elektroinstallation müssen passen. Arbeiten am festen Stromnetz gehören in fachkundige Hände.</p>
        <strong>Passt gut bei hoher Nutzung und langfristig festem Standort</strong>
      </article>
    </section>

    <section className="camera-season-section">
      <div>
        <p className="eyebrow">Der Wintertest</p>
        <h2>Die schwächste Jahreszeit sollte die Planung bestimmen</h2>
      </div>
      <div className="camera-season-strip">
        <article><strong>Wenig Sonne</strong><p>Ein Panel liefert weniger Energie und liegt möglicherweise zeitweise im Schatten.</p></article>
        <article><strong>Kalte Akkus</strong><p>Niedrige Temperaturen können die nutzbare Kapazität und das Ladeverhalten beeinflussen.</p></article>
        <article><strong>Mehr Dunkelheit</strong><p>Nachtsicht und integriertes Licht laufen länger und benötigen zusätzliche Energie.</p></article>
        <article><strong>Schlechter Zugang</strong><p>Schnee und Nässe machen einen spontanen Akkuwechsel unangenehmer.</p></article>
      </div>
    </section>

    <section>
      <h2>Kontinuierliche Aufnahme verändert die Auswahl</h2>
      <p>Viele Akkukameras sind auf kurze Ereignisclips ausgelegt. Sie schlafen zwischen erkannten Bewegungen und sparen dadurch Energie. Wer ein dauerhaftes Bild, lange Vorlaufzeiten oder eine sehr schnelle Reaktion erwartet, sollte genau prüfen, ob das Modell diese Betriebsart unterstützt und wie es dabei versorgt wird.</p>
      <p>Netzstrom oder PoE sind für einen gleichmäßigen Betrieb meist besser kalkulierbar. Ein Akku kann dennoch sinnvoll sein, wenn nur relevante Bewegungen dokumentiert werden sollen. Wichtig ist eine ehrliche Einschätzung der Umgebung. Eine Straße, flatternde Pflanzen oder viele Tiere können deutlich mehr Ereignisse auslösen als ein ruhiger Gartenweg.</p>
    </section>

    <section className="camera-failure-grid">
      <div>
        <p className="eyebrow">Typische Fehlplanung</p>
        <h2>Das Solarpanel liegt fast immer im Schatten</h2>
        <p>Die Kamera funktioniert zunächst über den geladenen Akku. Nach einigen Wochen fällt jedoch auf, dass der tägliche Ertrag nicht ausreicht. Abhilfe schafft manchmal ein separates Panel mit längerem Kabel und besserer Ausrichtung. Vor dem Kauf muss geklärt sein, ob das System ein solches Panel unterstützt.</p>
      </div>
      <div>
        <p className="eyebrow">Typische Fehlplanung</p>
        <h2>Der Akku sitzt unter dem Dachfirst</h2>
        <p>Die Position liefert eine gute Übersicht, macht aber jeden Ladevorgang aufwendig. Ein erreichbarer Montageort mit etwas engerem Bild kann langfristig zuverlässiger sein. Alternativ ist eine feste Leitung an dieser Stelle oft die bessere Investition.</p>
      </div>
    </section>

    <section className="camera-buy-check">
      <h2>Sechs Angaben für eine belastbare Entscheidung</h2>
      <ol>
        <li>Die Zahl der erwarteten Bewegungsereignisse an einem normalen Tag</li>
        <li>Die gewünschte Aufnahme als Ereignisclip oder als längere Aufzeichnung</li>
        <li>Die direkte Sonne am möglichen Standort des Solarpanels</li>
        <li>Die Erreichbarkeit der Kamera für Laden, Reinigung und Neustart</li>
        <li>Die zulässige Betriebstemperatur von Kamera und Akku</li>
        <li>Eine sichere Installation der Stromleitung und aller Steckverbindungen</li>
      </ol>
      <p>Aus diesen Angaben entsteht eine realistische Versorgung. Die längste beworbene Akkulaufzeit allein reicht dafür nicht.</p>
    </section>

    <p className="camera-inline-link">Im <Link href="/haus/sicherheit/sicherheitskamera-finder/">Sicherheitskamera Finder</Link> kannst du Akku, Solar und Netzstrom gezielt als Pflichtkriterium auswählen.</p>
  </SecurityCameraArticle>;
}
