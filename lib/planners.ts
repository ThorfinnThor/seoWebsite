export type PlannerIconName =
  | "garden-house"
  | "dehumidifier"
  | "irrigation"
  | "terrace"
  | "privacy-screen"
  | "flooring"
  | "greenhouse"
  | "robot-mower"
  | "carport"
  | "drywall";

export type PlannerId = PlannerIconName;

export type PlannerDirectoryItem = {
  id: PlannerId;
  area: "garden" | "house";
  title: string;
  category: string;
  shortCategory: string;
  description: string;
  homeDescription: string;
  href: string;
  icon: PlannerIconName;
  cta: string;
  outputs: readonly [string, string, string];
  faqs: readonly [
    { question: string; answer: string },
    { question: string; answer: string },
    { question: string; answer: string },
  ];
};

export const PLANNERS: readonly PlannerDirectoryItem[] = [
  {
    id: "garden-house",
    area: "garden",
    title: "Gartenhaus-Planer",
    category: "Garten · Lagerung",
    shortCategory: "Garten",
    description: "Mindestfläche, Türbreite, Stellfläche, Bodenoption und Budget zu einem klaren Auswahlrahmen verbinden.",
    homeDescription: "Für Fahrräder, Geräte, Rasenmäher, Werkbank und Regale.",
    href: "/garten/gartenhaus-planer/",
    icon: "garden-house",
    cta: "Gartenhaus planen",
    outputs: ["Mindestfläche für deine Nutzung", "Empfohlene Türbreite und Zugang", "Stellflächen-, Boden- und Budgetcheck"],
    faqs: [
      { question: "Wie berechnet PassendPlanen die Gartenhaus-Größe?", answer: "Der Planer addiert nachvollziehbare Flächenansätze für Fahrräder, Geräte, Rasenmäher, Werkbank und Regale, ergänzt Bewegungsreserve und rundet den Planungswert anschließend auf." },
      { question: "Prüft der Gartenhaus-Planer die Baugenehmigung?", answer: "Nein. Landesbauordnung, Bebauungsplan, Abstände, Kleingartenregeln und örtliche Vorgaben müssen für das konkrete Grundstück separat geprüft werden." },
      { question: "Warum werden noch nicht immer Produkte angezeigt?", answer: "Produkte erscheinen erst, wenn Außenmaße, Tür, Bodenoption, Verfügbarkeit und weitere Pflichtdaten geprüft wurden. Ein leerer Katalog ist besser als eine ungesicherte Empfehlung." },
    ],
  },
  {
    id: "dehumidifier",
    area: "house",
    title: "Luftentfeuchter-Rechner",
    category: "Haus · Raumklima",
    shortCategory: "Raumklima",
    description: "Raumvolumen, Feuchtebelastung, Temperatur, Ablauf und Geräusch für die Geräteauswahl einordnen.",
    homeDescription: "Raumvolumen, Feuchtebelastung, Temperatur und Geräusch einordnen.",
    href: "/haus/raumklima/luftentfeuchter-rechner/",
    icon: "dehumidifier",
    cta: "Gerätegröße berechnen",
    outputs: ["Berechnetes Raumvolumen", "Passende Entfeuchter-Leistungsklasse", "Temperatur-, Ablauf- und Geräuschcheck"],
    faqs: [
      { question: "Welche Angaben braucht der Luftentfeuchter-Rechner?", answer: "Benötigt werden Raumfläche und Höhe, Temperatur, Feuchtebelastung, Nutzung sowie Anforderungen an Ablauf, Geräusch und Wäschetrocknung." },
      { question: "Reicht die Liter-pro-Tag-Angabe für die Auswahl?", answer: "Nein. Die Nennleistung wird unter definierten Prüfbedingungen ermittelt. Raumtemperatur, reale Feuchtelast, Luftführung, Hygrostat und Laufzeit entscheiden mit." },
      { question: "Kann ein Luftentfeuchter Schimmelursachen lösen?", answer: "Ein Gerät kann die Luftfeuchte senken, beseitigt aber keine Leckage, Wärmebrücke oder andere bauliche Ursache. Sichtbarer Schimmel und Wasserschäden gehören fachlich bewertet." },
    ],
  },
  {
    id: "irrigation",
    area: "garden",
    title: "Bewässerungsplaner",
    category: "Garten · Wasser",
    shortCategory: "Garten",
    description: "Materialstruktur und Steuerungszonen für Rasen, Beete und Hecken vorbereiten – ohne scheinpräzise Hydraulik.",
    homeDescription: "Materialstruktur für Rasen, Beete und Hecken vorbereiten.",
    href: "/garten/bewaesserungs-planer/",
    icon: "irrigation",
    cta: "Bewässerung planen",
    outputs: ["Tropfrohr- und Verteilstrecken", "Benötigte Komponentengruppen", "Steuerungszonen und offene Messwerte"],
    faqs: [
      { question: "Was berechnet der Bewässerungsplaner genau?", answer: "Er erstellt aus Rasen-, Beet- und Heckenflächen eine erste Materialstruktur, Tropfrohrlänge, Komponentengruppen und eine Mindestzahl sinnvoll getrennter Zonen." },
      { question: "Warum nennt der Planer keine exakte Regnerzahl?", answer: "Regnerzahl und Leitungsaufteilung hängen von Fließdruck, Durchfluss, Rohrdimension, Druckverlust, Düsenbild und Überlappung ab. Ohne diese Messwerte wäre eine genaue Zahl irreführend." },
      { question: "Was muss vor dem Einkauf gemessen werden?", answer: "Mindestens Durchfluss und Fließdruck am vorgesehenen Anschluss sowie Längen, Höhenunterschiede und die Geometrie aller Bewässerungsbereiche." },
    ],
  },
  {
    id: "terrace",
    area: "garden",
    title: "Terrassendielen-Rechner",
    category: "Garten · Terrasse",
    shortCategory: "Terrasse",
    description: "Dielenreihen, Laufmeter, Reserve, Lieferlängen und Unterkonstruktion zu einem Materialrahmen verbinden.",
    homeDescription: "Dielen, Verschnitt und Unterkonstruktion mengenmäßig vorbereiten.",
    href: "/garten/terrassen-dielen-rechner/",
    icon: "terrace",
    cta: "Terrassenbedarf berechnen",
    outputs: ["Dielenreihen und benötigte Laufmeter", "Volle Lieferdielen inklusive Reserve", "Reihen der Unterkonstruktion"],
    faqs: [
      { question: "Wie berechnet der Rechner die Dielenmenge?", answer: "Aus Terrassenmaß, Verlegerichtung, echter Dielenbreite, Fuge und Lieferlänge entstehen Reihen, Laufmeter und volle Lieferdielen inklusive gewählter Reserve." },
      { question: "Ist die Unterkonstruktion vollständig enthalten?", answer: "Der Rechner schätzt Auflagerreihen und Laufmeter anhand des eingegebenen Herstellerabstands. Fundamente, doppelte Auflager an Stößen, Verbinder und Randdetails bleiben Teil des Aufbauplans." },
      { question: "Kann ich mit dem Ergebnis direkt bestellen?", answer: "Erst nach Abgleich mit Verlegeplan, Lieferlängen, Herstellerfreigaben und tatsächlichem Untergrund. Verwende das Ergebnis als prüfbare Mengengrundlage, nicht als Bauanweisung." },
    ],
  },
  {
    id: "privacy-screen",
    area: "garden",
    title: "Sichtschutz-Planer",
    category: "Garten · Zaun",
    shortCategory: "Sichtschutz",
    description: "Standardfelder, Tor-Module, Pfosten und Rasterabschluss für eine gerade Sichtschutzstrecke abschätzen.",
    homeDescription: "Systemfelder, Tore, Pfosten und Randanpassung für eine gerade Strecke.",
    href: "/garten/sichtschutz-planer/",
    icon: "privacy-screen",
    cta: "Sichtschutz planen",
    outputs: ["Anzahl der Sichtschutzfelder", "Tor- und Pfostenanzahl", "Restfeld und tatsächlicher Rasterabschluss"],
    faqs: [
      { question: "Welches Maß gehört in den Sichtschutz-Planer?", answer: "Verwende das echte Montage- oder Achsmaß des gewählten Systems. Die sichtbare Elementbreite allein reicht nicht, weil Pfosten und Fugen das Raster verändern." },
      { question: "Wie wird ein Gartentor berücksichtigt?", answer: "Toranzahl und Tor-Modulmaß gehen als eigener Abschnitt in die Gesamtstrecke ein. Aus der verbleibenden Strecke berechnet der Planer Standardfelder, Pfosten und eine mögliche Anpassung am letzten Feld." },
      { question: "Berechnet der Planer auch die Fundamente?", answer: "Nein. Windlast, Pfostenquerschnitt, Untergrund, Befestigung und Fundamentabmessung müssen zum konkreten System und Standort fachlich festgelegt werden." },
    ],
  },
  {
    id: "flooring",
    area: "house",
    title: "Bodenbelag-Rechner",
    category: "Haus · Innenausbau",
    shortCategory: "Innenausbau",
    description: "Teilflächen, Verschnitt, Paketinhalt, Unterlage und Sockelleisten zu einem bestellbaren Materialrahmen verbinden.",
    homeDescription: "Fläche, Verschnitt, volle Pakete, Unterlage und Sockelleisten berechnen.",
    href: "/haus/boden/bodenbelag-rechner/",
    icon: "flooring",
    cta: "Bodenmaterial berechnen",
    outputs: ["Netto- und Bestellfläche", "Anzahl voller Materialpakete", "Unterlage und Sockelleisten"],
    faqs: [
      { question: "Wie werden mehrere Räume berechnet?", answer: "Rechteckige Teilflächen werden addiert, feste Abzüge getrennt erfasst und anschließend mit der gewählten Verschnittreserve zur Bestellfläche zusammengeführt." },
      { question: "Warum rundet der Rechner auf volle Pakete auf?", answer: "Bodenbeläge werden paketweise verkauft. Die berechnete Bestellfläche wird deshalb durch den Paketinhalt geteilt und immer auf das nächste vollständige Paket aufgerundet." },
      { question: "Prüft der Rechner Untergrund und Fußbodenheizung?", answer: "Er erinnert an diese Punkte, erteilt aber keine Freigabe. Ebenheit, Restfeuchte, Unterlage, Wärmedurchlasswiderstand und Herstellerzulassung müssen zum Aufbau passen." },
    ],
  },
  {
    id: "greenhouse",
    area: "garden",
    title: "Gewächshaus-Planer",
    category: "Garten · Anbau",
    shortCategory: "Gewächshaus",
    description: "Grundfläche, Beet- und Wegeaufteilung, Basisprofile und theoretisches Regenwasser als Planungsrahmen zusammenführen.",
    homeDescription: "Grundfläche, Beete, Wege, Basisprofile und Regenwasserrahmen planen.",
    href: "/garten/gewaechshaus-planer/",
    icon: "greenhouse",
    cta: "Gewächshaus planen",
    outputs: ["Grund- und nutzbare Beetfläche", "Beet- und Wegeaufteilung", "Basisprofile und Regenwasserpotenzial"],
    faqs: [
      { question: "Warum plant PassendPlanen das Gewächshaus von innen?", answer: "Wege, erreichbare Beettiefen, Tür und Arbeitsfläche entscheiden über die Nutzung. Erst aus dieser Innenaufteilung ergibt sich ein sinnvoller Außenmaß-Rahmen." },
      { question: "Was bedeutet das berechnete Regenwasserpotenzial?", answer: "Es ist ein theoretischer Geometriewert aus Dachprojektion und zehn Millimetern Niederschlag. Rinnen-, Spritz-, Speicher- und Überlaufverluste sind nicht enthalten." },
      { question: "Dimensioniert der Planer Fundament und Lüftung?", answer: "Nein. Er macht offene Aufgaben sichtbar; Fundament, Verankerung, Wind- und Schneelast sowie Lüftungsöffnungen müssen am konkreten Gewächshaussystem geprüft werden." },
    ],
  },
  {
    id: "robot-mower",
    area: "garden",
    title: "Mähroboter-Flächencheck",
    category: "Garten · Rasen",
    shortCategory: "Rasen",
    description: "Netto-Rasenfläche, Kapazitätsreserve, Steigung, Engstellen und Begrenzungsprinzip zu einem Auswahlrahmen verbinden.",
    homeDescription: "Nettofläche, Kapazitätsreserve, Engstellen, Steigung und Installation prüfen.",
    href: "/garten/maehroboter-rechner/",
    icon: "robot-mower",
    cta: "Mähbereich prüfen",
    outputs: ["Netto-Mähfläche mit Reserve", "Benötigte Kapazitätsklasse", "Engstellen-, Steigungs- und Installationscheck"],
    faqs: [
      { question: "Welche Fläche zählt beim Mähroboter?", answer: "Es zählt die tatsächlich erreichbare Netto-Rasenfläche. Haus, Terrasse, Teich und feste Beete werden abgezogen; getrennte Flächen und Passagen werden zusätzlich bewertet." },
      { question: "Warum ist die empfohlene Nennfläche größer als der Rasen?", answer: "PassendPlanen ergänzt eine sichtbare Reserve für Gartenkomplexität, Wachstum, mehrere Zonen und getrennte Bereiche. So wird eine exakt passende Hersteller-Nennfläche nicht ungeprüft übernommen." },
      { question: "Kabel oder kabellose Navigation – was ist besser?", answer: "Das hängt von Gartenstruktur, Empfang, Bäumen und Gebäuden, späteren Änderungen und dem konkreten Gerät ab. Der Planer zeigt die standortbezogenen Prüfaufgaben beider Systeme." },
    ],
  },
  {
    id: "carport",
    area: "garden",
    title: "Carport-Planer",
    category: "Garten · Stellplatz",
    shortCategory: "Stellplatz",
    description: "Fahrzeugmaße, Bewegungsraum, Stauraum, Zufahrt und Dachaufgaben zu lichten Zielmaßen verbinden.",
    homeDescription: "Lichten Stellraum, Bewegungsreserve, Stauraum und Dachwasser planen.",
    href: "/garten/carport-planer/",
    icon: "carport",
    cta: "Carport-Raum planen",
    outputs: ["Lichte Mindestbreite, -länge und -höhe", "Stell- und Bewegungsfläche", "Zufahrts-, Stauraum- und Dachwassercheck"],
    faqs: [
      { question: "Berechnet der Carport-Planer Außenmaße?", answer: "Nein. Er berechnet lichte Zielmaße aus Fahrzeug, Tür- und Bewegungsraum, Höhenreserve und optionalem Stauraum. Pfosten und Tragwerk kommen später hinzu." },
      { question: "Wie wird die Zufahrt berücksichtigt?", answer: "Die Eingabe unterscheidet gerade Zufahrt, Richtungswechsel und ungeklärte Situationen. Schleppkurve, Torbreite und Rangierraum bleiben eine konkrete Prüfung vor Ort." },
      { question: "Was sagt der Dachwasserwert aus?", answer: "Er zeigt das theoretische Wasser einer bestimmten Niederschlagshöhe auf der Planungsfläche. Rinne, Fallrohr, Speicher, Überlauf und zulässige Ableitung werden dadurch nicht dimensioniert." },
    ],
  },
  {
    id: "drywall",
    area: "house",
    title: "Trockenbauwand-Rechner",
    category: "Haus · Innenausbau",
    shortCategory: "Innenausbau",
    description: "Wandfläche, Öffnungen, Plattenlagen, Format und ungestörtes Profilraster zu einem Mengenrahmen verbinden.",
    homeDescription: "Platten, Lagen, Grundständer, Randprofile und Dämmfläche berechnen.",
    href: "/haus/innenausbau/trockenbau-rechner/",
    icon: "drywall",
    cta: "Trockenbau berechnen",
    outputs: ["Netto-Bekleidungsfläche", "Anzahl voller Platten", "Grundständer, Randprofile und Dämmfläche"],
    faqs: [
      { question: "Wie werden Türen und Öffnungen abgezogen?", answer: "Ihre Fläche wird von der Brutto-Wandfläche abgezogen, bevor Seiten und Plattenlagen multipliziert werden. Zusätzliche Profile rund um Öffnungen werden separat ausgewiesen." },
      { question: "Was bedeutet ungestörtes Grundraster?", answer: "Es ist die rechnerische Ausgangszahl regelmäßig gesetzter Ständer. Ränder, Türen, Installationen, Lasten sowie Brand- oder Schallschutz können zusätzliche oder andere Profile verlangen." },
      { question: "Ist das Ergebnis eine vollständige Materialliste?", answer: "Nein. Es umfasst Platten, Grundständer, Randprofile und optionale Dämmfläche. Befestiger, Spachtel, Anschlussdetails und das freigegebene Gesamtsystem müssen ergänzt werden." },
    ],
  },
] as const;

export function getPlanner(id: PlannerId): PlannerDirectoryItem {
  const planner = PLANNERS.find((item) => item.id === id);

  if (!planner) {
    throw new Error(`Unknown planner: ${id}`);
  }

  return planner;
}
