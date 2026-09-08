import Link from "next/link";
import { SecurityCameraArticle } from "@/components/seo/SecurityCameraArticle";
import { createPageMetadata } from "@/lib/metadata";

const path = "/ratgeber/sicherheitskameras/wie-viele-kameras-einfamilienhaus/";

export const metadata = createPageMetadata({
  title: "Wie viele Kameras braucht ein Einfamilienhaus",
  description: "Die passende Zahl an Sicherheitskameras über Zugänge, Sichtlinien, tote Winkel und Grundstücksgrenzen bestimmen.",
  path,
  kind: "article",
  modifiedTime: "2026-09-08",
});

const sources = [
  {
    href: "https://www.datenschutzkonferenz-online.de/media/oh/20200903_oh_v%C3%BC_dsk.pdf",
    label: "Orientierungshilfe Videoüberwachung durch nicht öffentliche Stellen",
    publisher: "Datenschutzkonferenz",
    note: "Offizielle Einordnung zu Aufnahmebereich, Erforderlichkeit und den Grenzen privater Videoüberwachung.",
  },
] as const;

export default function Page() {
  return <SecurityCameraArticle
    title="Wie viele Kameras braucht ein Einfamilienhaus"
    intro="Die Wohnfläche verrät nicht, wie viele Kameras sinnvoll sind. Ein kleiner Eckbungalow kann mehr schwer einsehbare Zugänge haben als ein großes Reihenhaus. Zähle deshalb keine Quadratmeter, sondern getrennte Sichtaufgaben."
    path={path}
    summary="Für viele Einfamilienhäuser ergeben sich nach einer Begehung zwei bis vier sinnvolle Sichtbereiche. Das ist keine feste Vorgabe. Grundstücksform, Zugänge, Nebengebäude und der zulässige Bildausschnitt können die Zahl nach unten oder oben verändern."
    wordCount={1050}
    sources={[...sources]}
  >
    <section className="camera-count-principle">
      <span aria-hidden="true">1</span>
      <div>
        <p className="eyebrow">Eine Sichtaufgabe</p>
        <h2>Jede Kamera braucht einen klaren Grund</h2>
        <p>Eine Kamera sollte nicht einfach eine Hausseite zeigen. Formuliere, was in ihrem Bild erkennbar sein soll. Das kann die Person an der Haustür, der Zugang zur Kellertreppe oder das Tor zum Garten sein. Zwei nahe Bereiche lassen sich manchmal mit einem passenden Blickwinkel zusammenfassen. Ein weiter Winkel hilft jedoch wenig, wenn Personen am entscheidenden Punkt nur noch sehr klein erscheinen.</p>
      </div>
    </section>

    <section className="camera-route">
      <div>
        <p className="eyebrow">Begehung am Grundstück</p>
        <h2>Gehe den möglichen Weg einer fremden Person ab</h2>
        <p>Nimm einen Grundriss oder eine einfache Skizze mit. Markiere nur Orte, über die Haus, Garage oder geschützter Gartenbereich tatsächlich erreichbar sind. Danach prüfst du, welche dieser Wege schon durch Türen, Fenster, Beleuchtung und vorhandene Sicht geschützt werden.</p>
      </div>
      <ol>
        <li><strong>Haustür und Vorbereich</strong><p>Kann eine Person erkannt werden, ohne den öffentlichen Gehweg dauerhaft zu erfassen?</p></li>
        <li><strong>Seitlicher Zugang</strong><p>Gibt es einen schmalen Weg, ein Tor oder eine Kellertreppe außerhalb der Sicht vom Eingang?</p></li>
        <li><strong>Rückseite</strong><p>Sind Terrassentür oder leicht erreichbare Fenster von Hecken und Nebengebäuden verdeckt?</p></li>
        <li><strong>Garage und Nebengebäude</strong><p>Benötigen sie ein eigenes Bild oder liegen sie sinnvoll in einer bereits geplanten Sichtlinie?</p></li>
      </ol>
    </section>

    <section>
      <h2>Drei Häuser und drei unterschiedliche Ergebnisse</h2>
      <div className="camera-count-scenarios">
        <article>
          <span>Reihenhaus</span>
          <strong>Oft zwei Sichtbereiche</strong>
          <p>Ein klarer Zugang an der Vorderseite und eine Terrasse auf der Rückseite lassen sich häufig getrennt abdecken. Seitliche Wege entfallen. Die genaue Ausrichtung muss öffentliche Flächen und Nachbargrundstücke aussparen.</p>
        </article>
        <article>
          <span>Freistehendes Haus</span>
          <strong>Häufig drei oder vier Sichtbereiche</strong>
          <p>Neben Eingang und Rückseite kommen ein seitliches Tor, eine Garage oder eine verdeckte Kellertreppe hinzu. Eine Eckkamera kann zwei Wege überblicken, wenn Details an beiden Punkten ausreichend erkennbar bleiben.</p>
        </article>
        <article>
          <span>Großes Eckgrundstück</span>
          <strong>Nicht automatisch mehr Kameras</strong>
          <p>Die lange Grundstücksgrenze ist kein eigener Aufnahmegrund. Relevant bleiben konkrete Zugänge zum privaten Bereich. Eine weitere Kamera nur für einen öffentlichen Weg wäre technisch möglich, rechtlich aber regelmäßig nicht der richtige Ansatz.</p>
        </article>
      </div>
    </section>

    <section className="camera-formula">
      <p className="eyebrow">Eine einfache Planungsregel</p>
      <h2>Sichtaufgaben minus sinnvoll geteilte Blickwinkel</h2>
      <p>Notiere jeden relevanten Zugang als einzelne Aufgabe. Verbinde zwei Aufgaben nur dann, wenn eine Kamera an einem zulässigen Montagepunkt beide Bereiche mit brauchbarer Detailgröße erfasst. Ziehe keine Aufgabe ab, nur weil eine schwenkbare Kamera theoretisch dorthin fahren kann. Während sie in die eine Richtung blickt, fehlt das Bild in der anderen.</p>
      <div><span>4 relevante Zugänge</span><span aria-hidden="true">−</span><span>1 gemeinsam lösbarer Blick</span><span aria-hidden="true">=</span><strong>3 geplante Kameras</strong></div>
    </section>

    <section>
      <h2>Tote Winkel entstehen oft direkt unter der Kamera</h2>
      <p>Eine sehr hohe Montage erschwert Manipulation, kann aber Gesichter ungünstig von oben zeigen und einen Bereich an der Wand ausblenden. Prüfe das Bild deshalb nicht nur in einer Herstelleransicht. Eine provisorische Position und ein Test mit einer Person auf dem tatsächlichen Weg zeigen, ob Gesicht, Kleidung und Bewegungsrichtung ausreichend erkennbar sind.</p>
      <p>Weitwinkelobjektive erfassen viel Umgebung. Gleichzeitig verteilt sich die Bildauflösung auf eine größere Fläche. Für die reine Übersicht kann das passen. Wenn ein bestimmter Punkt klar erkennbar sein soll, ist ein engerer Bildausschnitt oder eine nähere Position häufig wertvoller als eine höhere Zahl auf der Auflösungsangabe.</p>
    </section>

    <section className="camera-buy-check">
      <h2>Der Plan ist fertig, wenn diese Fragen beantwortet sind</h2>
      <ol>
        <li>Jede Kamera hat eine benannte Sichtaufgabe und keinen bloßen Übersichtsauftrag</li>
        <li>Der gewünschte Detailgrad wurde mit einer Person am echten Zielpunkt geprüft</li>
        <li>Öffentliche Wege und fremde Grundstücke liegen nicht im geplanten Bild</li>
        <li>Strom, Funk oder Kabelweg sind für jeden einzelnen Montagepunkt geklärt</li>
        <li>Erreichbarkeit, Wetterschutz und möglicher Bewuchs wurden berücksichtigt</li>
      </ol>
      <p>So entsteht eine begründete Kamerazahl. Sie kann kleiner sein als erwartet, weil ein guter Standort zwei Aufgaben erfüllt. Sie kann auch größer sein, wenn verwinkelte Zugänge getrennte Bilder brauchen.</p>
    </section>

    <p className="camera-inline-link">Wenn die Zahl feststeht, kannst du im <Link href="/haus/sicherheit/sicherheitskamera-finder/">Sicherheitskamera Finder</Link> gezielt nach Einzelkameras und Sets filtern.</p>
  </SecurityCameraArticle>;
}
