import { SecurityCameraStorageCalculator } from "@/components/calculator/SecurityCameraStorageCalculator";
import { GuidePage } from "@/components/seo/GuidePage";
import { createPageMetadata } from "@/lib/metadata";

const PATH = "/haus/sicherheit/sicherheitskamera-speicher-rechner/";

export const metadata = createPageMetadata({
  title: "Speicherbedarf für Sicherheitskameras berechnen",
  description: "Speicher für Sicherheitskameras aus Kamerazahl, durchschnittlicher Bitrate, Aufnahmezeit, Aufbewahrung und Reserve nachvollziehbar berechnen.",
  path: PATH,
  kind: "article",
  modifiedTime: "2026-09-16",
});

export default function Page() {
  return <GuidePage
    path={PATH}
    title="Wie viel Speicher brauchen deine Sicherheitskameras?"
    intro="Auflösung allein reicht für die Planung nicht aus. Entscheidend sind die durchschnittliche Bitrate, die tatsächliche Aufnahmezeit, die Zahl der Kameras und die gewünschte Aufbewahrung. Der Rechner macht diese Annahmen einzeln sichtbar."
    updated="September 2026"
    updatedAt="2026-09-16"
    breadcrumbs={[
      { label: "Start", href: "/" },
      { label: "Haus", href: "/haus/" },
      { label: "Sicherheitskameras", href: "/ratgeber/sicherheitskameras/" },
      { label: "Speicherbedarf berechnen" },
    ]}
    plannerHref="/haus/sicherheit/sicherheitskamera-finder/"
    plannerLabel="Passende Kameras filtern"
    calculator={<SecurityCameraStorageCalculator />}
    takeaway="Verwende nach Möglichkeit die gemessene oder im Kameraprofil konfigurierte durchschnittliche Bitrate. Multipliziere sie mit aktiver Aufnahmezeit, Aufbewahrung und Kamerazahl. Eine Reserve fängt Schwankungen auf, ersetzt aber nicht den Abgleich mit der nutzbaren Kapazität des Recorders."
    limitation="Die Berechnung dient der technischen Vorplanung und übernimmt keine Gewähr für eine bestimmte Aufbewahrungsdauer. Reale Bitraten, Ton, Ereignisvorlauf, Dateisystem, Redundanz und Gerätegrenzen können den nutzbaren Speicher verändern. Zulässigkeit und Dauer einer Speicherung müssen unabhängig davon geprüft werden."
    sections={[
      {
        title: "Warum die Bitrate wichtiger ist als die Auflösung",
        paragraphs: [
          "Zwei Kameras mit derselben Auflösung können sehr unterschiedliche Datenmengen erzeugen. Bildrate, Bewegung im Motiv, Beleuchtung, Kompression und das gewählte Aufnahmeprofil verändern die Bitrate deutlich. Genau deshalb fragt der Rechner nicht nur nach Full HD oder 4K.",
          "Die beste Eingabe ist der Durchschnittswert aus der Kamera oder dem Recorder. Fehlt dieser Wert, kann die Herstellerangabe für das konkret verwendete Profil als vorläufige Annahme dienen. Nach einigen typischen Tagen sollte die Rechnung mit dem realen Verbrauch abgeglichen werden.",
        ],
      },
      {
        title: "Was aktive Aufnahmezeit wirklich bedeutet",
        paragraphs: [
          "Bei durchgehender Aufnahme sind 24 Stunden je Tag richtig. Eine Ereignisaufnahme benötigt nur dann weniger Speicher, wenn die Kamera tatsächlich über einen kleineren Teil des Tages aufzeichnet. Die Zahl der erkannten Ereignisse allein sagt darüber wenig aus.",
          "Vorlauf und Nachlauf verlängern jeden Clip. Bewegte Bäume, Straßenverkehr, Tiere oder eine zu empfindliche Erkennung können den angenommenen Zeitwert schnell überschreiten. Miss deshalb nicht nur an einem ruhigen Tag.",
        ],
      },
      {
        title: "Wie die Rechnung aufgebaut ist",
        paragraphs: [
          "Ein Mbit pro Sekunde entspricht bei gleichbleibender Übertragung rund 0,45 Gigabyte pro Stunde. Der Rechner multipliziert diesen Wert mit der durchschnittlichen Bitrate, den aktiven Stunden, den Tagen und der Zahl der Kameras.",
          "Die zusätzliche Reserve bezieht sich auf die gesamte Datenmenge. Sie ist für Schwankungen gedacht. Eine Spiegelung von Laufwerken oder eine zweite Aufzeichnung muss separat geplant werden, weil dabei weitere vollständige Kopien entstehen können.",
        ],
      },
      {
        title: "Aufbewahrung und Überschreiben gehören zusammen",
        paragraphs: [
          "Viele Recorder löschen die ältesten Aufnahmen, sobald eine zeitliche oder räumliche Grenze erreicht ist. Sind sowohl Tage als auch eine maximale Speichergröße festgelegt, kann jede der beiden Grenzen das Überschreiben auslösen.",
          "Prüfe nach der Einrichtung, wie weit die älteste verfügbare Aufnahme tatsächlich zurückliegt. Dieser Praxistest zeigt, ob deine Annahme im Alltag trägt oder ob die Speichergröße, Bitrate oder Aufzeichnungsregel angepasst werden muss.",
        ],
      },
      {
        title: "Lokale Karte, Recorder oder Cloud",
        paragraphs: [
          "Eine Speicherkarte in der Kamera kann kurze Wege und eine unabhängige Aufzeichnung ermöglichen. Ein Recorder bündelt mehrere Kameras und erleichtert die gemeinsame Suche. Cloudspeicher folgt meist eigenen Tarifen, Laufzeiten und Übertragungsgrenzen.",
          "Der Rechner bestimmt nur die Videodatenmenge. Er entscheidet nicht, welcher Speicherort für Ausfallsicherheit, Zugriffsschutz und Datenschutz geeignet ist. Verschlüsselung, Benutzerrechte, Sicherung und Verhalten bei einem Netzausfall gehören in die Systemwahl.",
        ],
      },
      {
        title: "Die gesamte Datenrate nicht vergessen",
        paragraphs: [
          "Mehrere Kameras senden ihre Daten gleichzeitig an einen Recorder. Die Summe ihrer Bitraten muss deshalb zu Netzwerk, Funkstrecke, Recorder und gegebenenfalls Internetanschluss passen. Der Rechner weist diese Summe gesondert aus.",
          "Die angezeigte Datenrate ist kein vollständiger Netzwerkplan. Liveansicht, Fernzugriff, Softwareaktualisierungen und weitere Geräte erzeugen zusätzlichen Verkehr. Bei WLAN entscheidet außerdem die reale Funkqualität am Montageort.",
        ],
      },
      {
        title: "So wird aus der Schätzung ein belastbarer Wert",
        paragraphs: [
          "Beginne mit dem vorgesehenen Aufnahmeprofil und einer realistischen Aufbewahrung. Kontrolliere nach der Montage mehrere helle, dunkle, ruhige und bewegte Zeiträume. Die tatsächlich belegte Kapazität lässt sich nun mit dem Rechenergebnis vergleichen.",
          "Bleibt die Abweichung groß, ändere nicht vorschnell die Bildqualität. Prüfe Aufnahmezeit, Erkennungsbereiche, Vorlauf, Nachlauf und die angezeigte Durchschnittsbitrate. Die gewünschte Erkennbarkeit von Personen oder Details hat Vorrang vor einer möglichst kleinen Datei.",
        ],
      },
    ]}
    comparison={{
      caption: "Welche Eingabe welchen Teil der Planung verändert",
      columns: ["Eingabe", "Wirkung", "Gegenprobe"],
      rows: [
        ["Durchschnittliche Bitrate", "Bestimmt die Datenmenge pro Stunde", "Wert im verwendeten Kameraprofil oder Recorder prüfen"],
        ["Aktive Stunden", "Bildet Daueraufnahme oder Ereignisaufzeichnung ab", "Mehrere typische Tage messen"],
        ["Aufbewahrung", "Verlängert den benötigten Zeitraum", "Älteste verfügbare Aufnahme kontrollieren"],
        ["Kamerazahl", "Addiert Speicher und gesamte Datenrate", "Alle gleichzeitig aufzeichnenden Streams zählen"],
        ["Reserve", "Fängt begrenzte Schwankungen auf", "Nicht mit Redundanz oder einer zweiten Kopie verwechseln"],
      ],
    }}
    checklist={[
      "Das tatsächlich verwendete Aufnahmeprofil jeder Kamera notieren.",
      "Durchschnittliche Bitrate aus Kamera oder Recorder ablesen.",
      "Daueraufnahme und Ereignisaufnahme klar unterscheiden.",
      "Vorlauf und Nachlauf bei Ereignissen berücksichtigen.",
      "Gewünschte Aufbewahrung rechtlich und praktisch prüfen.",
      "Nutzbare statt nur beworbener Laufwerkskapazität vergleichen.",
      "Maximale Datenrate und Laufwerksfreigaben des Recorders abgleichen.",
      "Nach einigen typischen Tagen die älteste Aufnahme kontrollieren.",
    ]}
    example={{
      title: "Zwei Kameras mit zwei Mbit pro Sekunde",
      intro: "Beide Kameras zeichnen rund um die Uhr auf. Die Aufnahmen sollen 14 Tage verfügbar bleiben und die Planung enthält 15 Prozent Reserve.",
      steps: [
        { label: "Daten je Kamera und Stunde", value: "0,90 GB" },
        { label: "Daten je Kamera und Tag", value: "21,60 GB" },
        { label: "Zwei Kameras für 14 Tage", value: "604,80 GB" },
        { label: "Zusätzliche Reserve", value: "15 Prozent" },
        { label: "Planungswert", value: "695,52 GB" },
      ],
      result: "Der rechnerische Planungswert liegt bei rund 696 GB. Die nächste geeignete Speichergröße richtet sich zusätzlich nach nutzbarer Kapazität, Laufwerksfreigabe und gewünschter Ausfallsicherheit.",
      note: "Das Beispiel verwendet eine gleichbleibende durchschnittliche Bitrate. Reale Videostreams können schwanken.",
    }}
    sources={[
      {
        label: "Edge storage und Auswahl der Speicherkapazität",
        href: "https://www.axis.com/products/edge-storage",
        publisher: "Axis Communications",
        note: "Herstellerhinweise dazu, warum Bitrate und Aufbewahrungszeit die Speicherkapazität stärker bestimmen als eine Auflösungsangabe allein.",
      },
      {
        label: "Bitrate control for IP video",
        href: "https://whitepapers.axis.com/en-us/bitrate-control-for-ip-video",
        publisher: "Axis Communications",
        note: "Technische Einordnung von durchschnittlicher, maximaler und variabler Bitrate sowie deren Bedeutung für Speicher und Netzwerk.",
      },
      {
        label: "Recording settings in Surveillance Station",
        href: "https://kb.synology.com/en-uk/SurveillanceStation/help/SurveillanceStation/recording_settings_recording?version=9",
        publisher: "Synology",
        note: "Dokumentation zu Aufbewahrung nach Tagen, Speichergrenzen, Überschreiben sowie Vorlauf und Nachlauf bei Ereignissen.",
      },
    ]}
    faqs={[
      { question: "Welche Bitrate soll ich eintragen?", answer: "Nutze möglichst den Durchschnittswert des tatsächlich verwendeten Aufnahmeprofils. Eine maximale Bitrate kann für die Netzwerkprüfung wichtig sein, überschätzt aber häufig den dauerhaften Speicherverbrauch." },
      { question: "Kann ich die Bitrate aus der Auflösung ableiten?", answer: "Nur sehr grob. Bildrate, Kompression, Motiv, Licht und Bewegung können bei derselben Auflösung zu deutlich anderen Datenmengen führen. Hersteller oder Recorder liefern meist einen besseren Ausgangswert." },
      { question: "Wie schätze ich Ereignisaufnahmen?", answer: "Ermittle über mehrere typische Tage, wie viele Stunden tatsächlich gespeichert wurden. Beziehe Vorlauf und Nachlauf ein und prüfe auch Tage mit Wind, Verkehr oder häufigen Bewegungen." },
      { question: "Sind 15 Prozent Reserve immer genug?", answer: "Nein. Die Reserve ist nur eine frei gewählte Planungshilfe. Starke Bitratenschwankungen, Ton, zweite Streams, Spiegelung oder zusätzliche Kameras können mehr Kapazität verlangen." },
      { question: "Warum zeigt der Recorder weniger nutzbaren Speicher?", answer: "Herstellerangabe, Dateisystem, Systembereiche, Redundanz und unterschiedliche Einheiten können die sichtbare Kapazität verändern. Maßgeblich ist der im eingerichteten System nutzbare Wert." },
    ]}
    relatedLinks={[
      { label: "Sicherheitskamera Finder", href: "/haus/sicherheit/sicherheitskamera-finder/", description: "Kameras nach Einsatzort, Verbindung, Versorgung und benötigter Anzahl filtern." },
      { label: "Wie viele Kameras braucht das Haus", href: "/ratgeber/sicherheitskameras/wie-viele-kameras-einfamilienhaus/", description: "Zugänge und Sichtaufgaben einzeln erfassen, bevor die Kamerazahl feststeht." },
      { label: "WLAN oder PoE", href: "/ratgeber/sicherheitskameras/wlan-oder-poe/", description: "Funkstrecke und kabelgebundene Verbindung am konkreten Montageort vergleichen." },
      { label: "Private Videoüberwachung", href: "/ratgeber/sicherheitskameras/private-videoueberwachung-datenschutz/", description: "Bildbereich, Zweck, Information und Speicherdauer unabhängig von der Technik prüfen." },
      { label: "Alle Kamera Ratgeber", href: "/ratgeber/sicherheitskameras/", description: "Die vorhandenen Entscheidungen rund um Installation und Betrieb öffnen." },
    ]}
  />;
}
