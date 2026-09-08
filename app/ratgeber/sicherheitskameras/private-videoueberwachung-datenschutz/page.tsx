import Link from "next/link";
import { SecurityCameraArticle } from "@/components/seo/SecurityCameraArticle";
import { createPageMetadata } from "@/lib/metadata";

const path = "/ratgeber/sicherheitskameras/private-videoueberwachung-datenschutz/";

export const metadata = createPageMetadata({
  title: "Private Videoüberwachung und Datenschutz am Haus",
  description: "Private Sicherheitskameras rechtlich vorsichtig planen. Bildbereich, Zweck, Erforderlichkeit, Hinweise, Ton und Speicherdauer im Überblick.",
  path,
  kind: "article",
  modifiedTime: "2026-09-08",
});

const sources = [
  {
    href: "https://www.datenschutzkonferenz-online.de/media/oh/20200903_oh_v%C3%BC_dsk.pdf",
    label: "Orientierungshilfe Videoüberwachung durch nicht öffentliche Stellen",
    publisher: "Datenschutzkonferenz",
    note: "Maßgebliche praktische Hinweise der deutschen Datenschutzaufsichtsbehörden zu Zulässigkeit, Aufnahmebereich, Transparenz und Löschung.",
  },
  {
    href: "https://www.gesetze-im-internet.de/bdsg_2018/__4.html",
    label: "Paragraf 4 des Bundesdatenschutzgesetzes",
    publisher: "Bundesministerium der Justiz und Bundesamt für Justiz",
    note: "Gesetzestext zur Videoüberwachung öffentlich zugänglicher Räume einschließlich Interessenabwägung, Kennzeichnung und Löschung.",
  },
  {
    href: "https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/cyber-sicherheitsempfehlungen.html",
    label: "Cyber Sicherheitsempfehlungen für vernetzte Geräte",
    publisher: "Bundesamt für Sicherheit in der Informationstechnik",
    note: "Hinweise zu Aktualisierungen und Sicherheitseinstellungen bei Geräten des Internet der Dinge.",
  },
] as const;

export default function Page() {
  return <SecurityCameraArticle
    title="Private Videoüberwachung und Datenschutz am Haus"
    intro="Eine Kamera am eigenen Gebäude darf nicht automatisch alles aufnehmen, was vom Montagepunkt sichtbar ist. Der zulässige Bildbereich, ein nachvollziehbarer Zweck und ein zurückhaltender Umgang mit Aufnahmen sind wichtiger als die technische Reichweite."
    path={path}
    summary="Die sicherste Planung bleibt grundsätzlich auf dem eigenen Grundstück. Öffentliche Wege und fremde Grundstücke sollten nicht erfasst werden. Jede Speicherung braucht einen konkreten Zweck, eine nachvollziehbare Dauer und einen geschützten Zugriff."
    wordCount={1160}
    sources={[...sources]}
  >
    <section className="camera-legal-principle">
      <p className="eyebrow">Die räumliche Grenze</p>
      <h2>Die Grundstücksgrenze begrenzt regelmäßig auch das Kamerabild</h2>
      <p>Die Datenschutzkonferenz beschreibt für Wohnbereiche eine klare Leitlinie. Privatpersonen dürfen den öffentlichen Raum grundsätzlich nicht mit überwachen. Auch Nachbargrundstücke, gemeinsam genutzte Zugänge und fremde Hauseingänge gehören nicht einfach in den Bildausschnitt. Das gilt nicht nur für die gespeicherte Aufnahme. Schon eine laufende Beobachtung kann die Rechte betroffener Personen berühren.</p>
      <div className="camera-boundary-sketch" aria-label="Schematische Darstellung des zulässigen Bildbereichs">
        <div><span>Eigene Tür</span><strong>Kamerabild möglichst eng auf den eigenen Zugang begrenzen</strong></div>
        <div><span>Grundstücksgrenze</span><strong>Öffentlichen Gehweg und fremde Flächen aussparen</strong></div>
      </div>
    </section>

    <section>
      <h2>Ein guter Zweck ist konkret und überprüfbar</h2>
      <p>Eine allgemeine Begründung wie mehr Sicherheit bleibt zu unbestimmt. Ein konkreter Anlass kann etwa der Schutz eines tatsächlich gefährdeten Eingangs sein. Danach folgt die Frage, ob eine Kamera erforderlich ist und ob eine mildere Maßnahme denselben Zweck erfüllt. Bessere Beleuchtung, ein stabileres Tor, ein Türspion oder ein Bewegungsmelder können je nach Situation weniger eingriffsintensiv sein.</p>
      <p>Der Zweck bestimmt auch den Bildausschnitt und die Nutzung. Soll nur gemeldet werden, dass jemand am eigenen Eingang steht, ist eine dauerhafte Aufzeichnung des gesamten Vorgartens schwerer zu begründen. Funktionen sollten deshalb nicht pauschal aktiviert werden, nur weil die Kamera sie anbietet.</p>
    </section>

    <section className="camera-record-grid">
      <article>
        <p className="eyebrow">Livebild</p>
        <h2>Beobachten ohne Speicherung</h2>
        <p>Auch ein reines Livebild kann personenbezogene Daten zeigen. Der fehlende Speicher macht einen zu weiten Bildbereich nicht automatisch zulässig.</p>
      </article>
      <article>
        <p className="eyebrow">Ereignisclip</p>
        <h2>Kurze Aufnahme nach Bewegung</h2>
        <p>Empfindlichkeit, Erfassungszone und Clipdauer sollten so eingestellt sein, dass nur der begründete Bereich erfasst wird.</p>
      </article>
      <article>
        <p className="eyebrow">Daueraufnahme</p>
        <h2>Lückenlose Speicherung</h2>
        <p>Der Eingriff ist größer und verlangt eine besonders belastbare Begründung. Eine bloße technische Möglichkeit reicht nicht.</p>
      </article>
    </section>

    <section>
      <h2>Hinweis und Information gehören vor den erfassten Bereich</h2>
      <p>Wer einen Bereich betritt, sollte erkennen können, dass dort eine Videoüberwachung stattfindet, bevor die Person erfasst wird. Ein Kamerasymbol allein beantwortet nicht alle Fragen. Verantwortliche Stelle, Zweck und ein Weg zu den weiteren Datenschutzinformationen müssen nachvollziehbar angegeben werden. Die konkrete Ausgestaltung hängt von der jeweiligen Situation ab.</p>
      <p>Eine versteckte Kamera löst dieses Problem nicht. Unsichtbarkeit kann den Eingriff verschärfen und schafft keine zusätzliche Rechtsgrundlage. Attrappen sind ebenfalls nicht harmlos, wenn sie bei anderen Personen einen ernsthaften Überwachungsdruck erzeugen. Neben dem Datenschutz können zivilrechtliche Ansprüche eine Rolle spielen.</p>
    </section>

    <section className="camera-storage-section">
      <div>
        <p className="eyebrow">Speicherung</p>
        <h2>So kurz wie der festgelegte Zweck es erlaubt</h2>
        <p>Aufnahmen dürfen nicht auf Vorrat gesammelt werden. Die Datenschutzkonferenz verlangt eine unverzügliche Löschung, wenn die Daten für den Zweck nicht mehr erforderlich sind oder schutzwürdige Interessen betroffener Personen entgegenstehen. Eine automatische Löschregel ist verlässlicher als die Absicht, alte Clips gelegentlich von Hand zu entfernen.</p>
      </div>
      <aside>
        <strong>Vor der Aktivierung festlegen</strong>
        <ul>
          <li>Welche Ereignisse eine Aufnahme auslösen</li>
          <li>Wer Aufnahmen ansehen darf</li>
          <li>Wo die Daten gespeichert werden</li>
          <li>Wann sie automatisch gelöscht werden</li>
          <li>Wie ein berechtigter Vorfall gesichert wird</li>
        </ul>
      </aside>
    </section>

    <section>
      <h2>Ton sollte nicht nebenbei mitlaufen</h2>
      <p>Viele Kameras besitzen ein Mikrofon und aktivieren Ton gemeinsam mit dem Bild. Gespräche können jedoch Informationen enthalten, die weit über den Sicherheitszweck hinausgehen. Prüfe deshalb gesondert, ob Ton wirklich notwendig und rechtlich zulässig ist. Wenn dafür kein tragfähiger Grund besteht, sollte die Funktion deaktiviert bleiben.</p>
      <p>Auch eine Gegensprechfunktion ist von einer ständigen Tonaufzeichnung zu unterscheiden. Einstellungen und Herstellerbeschreibung müssen erkennen lassen, wann das Mikrofon aktiv ist und ob Ton gespeichert wird.</p>
    </section>

    <section className="camera-legal-check">
      <h2>Prüfung direkt am fertigen Kamerabild</h2>
      <p>Die Planung auf Papier genügt nicht. Öffne nach der Montage das echte Livebild und gehe jede Kante ab. Datenschutzmasken können Bereiche technisch ausblenden. Verlasse dich dabei nicht auf eine grobe schwarze Fläche in der App. Prüfe bei Tag, bei Nacht und nach einem Neustart, ob die Maske erhalten bleibt und wirklich in der Aufnahme wirkt.</p>
      <ul>
        <li>Kein öffentlicher Gehweg im regulären Bild</li>
        <li>Keine Fenster, Türen oder Gärten anderer Personen</li>
        <li>Keine unnötige Aufnahme gemeinsam genutzter Flächen</li>
        <li>Hinweis sichtbar, bevor jemand den Bildbereich betritt</li>
        <li>Starke Zugangsdaten, aktuelle Software und begrenzte Benutzerrechte</li>
      </ul>
    </section>

    <section className="camera-legal-note">
      <strong>Rechtliche Einordnung</strong>
      <p>Dieser Ratgeber bietet allgemeine Informationen und keine Rechtsberatung. Ob eine konkrete Videoüberwachung zulässig ist, hängt vom Ort, Zweck, Bildbereich und den betroffenen Personen ab. Bei gemeinsam genutzten Flächen, Beschäftigten, Mietobjekten, wiederholten Vorfällen oder einem unvermeidbaren Blick auf öffentlichen Raum sollte die Situation vor der Inbetriebnahme fachkundig geprüft werden.</p>
    </section>

    <p className="camera-inline-link">Nach der rechtlichen und räumlichen Prüfung hilft der <Link href="/haus/sicherheit/sicherheitskamera-finder/">Sicherheitskamera Finder</Link> bei den technischen Pflichtkriterien.</p>
  </SecurityCameraArticle>;
}
