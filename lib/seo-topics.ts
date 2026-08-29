import type { SeoGuide } from "@/lib/seo-guides";

export type SeoTopic = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  intro: string;
  plannerHref: string;
  plannerLabel: string;
  method: string;
  questions: [string, string, string];
  boundary: string;
};

export const SEO_TOPICS: readonly SeoTopic[] = [
  {
    slug: "gartenhaus",
    name: "Gartenhaus planen",
    eyebrow: "Größe, Nutzung und Bauart",
    description: "Gartenhaus-Größe, Material, Dach, Boden, Kosten und konkrete Nutzungen vom Fahrradlager bis zur Werkstatt nachvollziehbar planen.",
    intro: "Ein Gartenhaus passt, wenn Lagergut, Zugang, Bewegungsfläche und Standort gemeinsam funktionieren. Die Ratgeber in diesem Themenbereich gehen vom echten Nutzungsprofil aus und trennen Innenmaß, Sockelmaß, Außenmaß und rechtlich relevante Randbedingungen.",
    plannerHref: "/garten/gartenhaus-planer/",
    plannerLabel: "Gartenhausgröße berechnen",
    method: "Miss vorhandene Gegenstände und die verfügbare Stellfläche. Zeichne Tür, Regale und Bewegungswege ein. Konkrete Häuser lassen sich mit dokumentierter Innenfläche und Mindest-Türbreite sinnvoll vergleichen.",
    questions: ["Wie viel Innenfläche braucht die konkrete Nutzung?", "Welche Tür- und Bewegungsbreite bleibt nach Regalen?", "Welche Fundament-, Last- und Rechtsfragen sind offen?"],
    boundary: "PassendPlanen bemisst weder Fundament noch Statik und entscheidet nicht über Genehmigungen oder Grenzabstände. Verbindlich sind Standortrecht und Unterlagen des vollständigen Bausystems.",
  },
  {
    slug: "maehroboter",
    name: "Mähroboter auswählen",
    eyebrow: "Fläche, Gelände und Navigation",
    description: "Mähroboter nach Nettofläche, Steigung, Engstellen, Zonen und Navigation auswählen – mit nachvollziehbarer Reserve statt pauschalem Testsieger.",
    intro: "Die Quadratmeterzahl ist nur der Anfang einer Mähroboter-Auswahl. Bäume, Passagen, getrennte Flächen, Hang, Ladestation und erlaubte Betriebszeiten bestimmen, ob ein Modell im realen Garten funktionieren kann.",
    plannerHref: "/garten/maehroboter-rechner/",
    plannerLabel: "Mähbereich prüfen",
    method: "Ermittle Netto-Rasenfläche und zeichne die schwierigsten Stellen ein. Harte Grenzen wie Steigung oder Mindestpassage werden vor Komfortmerkmalen geprüft. Eine Kapazitätsreserve erhält immer einen sichtbaren Grund.",
    questions: ["Wie groß ist die reine Rasenfläche?", "Wo liegen Steigung, Passage und Empfangsrisiken?", "Wie erreicht der Roboter jede Zone und die Ladestation?"],
    boundary: "Herstellerwerte gelten unter definierten Bedingungen. PassendPlanen kann Empfang, Traktion, Firmware oder Sicherheit am konkreten Grundstück nicht garantieren.",
  },
  {
    slug: "terrasse",
    name: "Terrasse und Dielen planen",
    eyebrow: "Material, Verlegung und Mengen",
    description: "Terrassendielen, Unterkonstruktion, Verlegerichtung, Verschnitt und Kosten als vollständigen Materialrahmen berechnen und vergleichen.",
    intro: "Terrassenfläche ist nicht gleich Bestellfläche. Deckbreite, Fuge, Lieferlänge, Verlegerichtung, Stöße und Randdetails verändern Dielenmenge und Unterkonstruktion – oft stärker als ein pauschaler Verschnittsatz.",
    plannerHref: "/garten/terrassen-dielen-rechner/",
    plannerLabel: "Terrassenmaterial berechnen",
    method: "Geometrie und Verlegerichtung bestimmen Reihen und Laufmeter. Daraus folgen Lieferlängen und Zuschnitt. Unterkonstruktion, Befestigung und Abschlüsse bleiben eigene Materialgruppen.",
    questions: ["Welche Deckbreite ergibt sich aus Diele und Fuge?", "Wo entstehen Stöße oder besondere Randzonen?", "Ist der vollständige Systemaufbau für Untergrund und Material freigegeben?"],
    boundary: "Die Mengenrechnung ersetzt keine statische, konstruktive oder handwerkliche Freigabe. Produktbezogene Auflager, Abstände und Befestigungen haben Vorrang.",
  },
  {
    slug: "bewaesserung",
    name: "Gartenbewässerung planen",
    eyebrow: "Durchfluss, Zonen und Pflanzen",
    description: "Rasen-, Beet-, Hecken- und Hochbeetbewässerung aus realem Durchfluss, Druck und Pflanzenbedarf in belastbare Zonen aufteilen.",
    intro: "Ein Bewässerungssystem wird nicht nach Schlauchlänge allein geplant. Pflanzenbereiche, Abgabemenge, Fließdruck, Leitungslänge und gleichzeitig aktive Verbraucher bestimmen, welche Zonen zuverlässig funktionieren.",
    plannerHref: "/garten/bewaesserungs-planer/",
    plannerLabel: "Bewässerungszonen planen",
    method: "Trenne Rasen, Beete und Hecken. Miss Durchfluss am späteren Anschluss und prüfe den Fließdruck. Verbraucher mit unterschiedlichen Laufzeiten werden nicht unbesehen in dieselbe Zone gelegt.",
    questions: ["Wie viel Wasser steht unter Betriebsbedingungen zur Verfügung?", "Welche Pflanzenbereiche benötigen getrennte Laufzeiten?", "Welche Filter-, Druck- und Rückflussschutzfragen sind offen?"],
    boundary: "Hydraulik, Trinkwasserschutz und lokale Regeln können eine Fachplanung erfordern. Ohne reale Anschlussmessung bleibt die Zonenzahl vorläufig.",
  },
  {
    slug: "gewaechshaus",
    name: "Gewächshaus planen",
    eyebrow: "Beete, Klima und Konstruktion",
    description: "Gewächshaus-Größe, Beetaufteilung, Pflanzen, Material, Fundament, Lüftung und automatische Fensteröffner gemeinsam planen.",
    intro: "Ein Gewächshaus sollte vom Kulturplan nach außen gedacht werden. Erreichbare Beete, Wege, Pflanzenhöhe und Luftführung bestimmen das Innenlayout; Konstruktion, Fundament und Standort sichern anschließend die Nutzung.",
    plannerHref: "/garten/gewaechshaus-planer/",
    plannerLabel: "Gewächshaus dimensionieren",
    method: "Zeichne Beete, Weg, Tür und hohe Kulturen in das reale Innenmaß. Plane Dachlüftung, Zuluft, Beschattung und Bewässerung als System, bevor Material oder Modell verglichen werden.",
    questions: ["Welche nutzbare Beetfläche bleibt neben dem Weg?", "Wie entstehen Zu- und Abluft sowie Beschattung?", "Welche Last-, Fundament- und Standortnachweise gelten?"],
    boundary: "Kulturabstände sind an Sorte und Klima anzupassen. Statik, Verankerung und rechtliche Fragen bleiben produkt- und standortabhängig.",
  },
  {
    slug: "sichtschutz",
    name: "Sichtschutz planen",
    eyebrow: "Raster, Tor und Wind",
    description: "Sichtschutz-Elemente, Pfosten, Restfelder, Gartentor, Gefälle und Fundamente aus der realen Strecke ableiten.",
    intro: "Sichtschutz wird aus einer gemessenen Flucht in ein Systemraster übersetzt. Pfosten, Fugen, Ecken und Tore gehören zur Länge; Wind, Boden und Höhe bestimmen, ob die gewählte Konstruktion am Standort tragfähig sein kann.",
    plannerHref: "/garten/sichtschutz-planer/",
    plannerLabel: "Sichtschutz aufteilen",
    method: "Markiere feste Endpunkte, Ecken, Gefälle und Tor. Rechne mit echten Montagebreiten statt Produkt-Nennmaßen. Das Restmaß wird vor Fundament und Zuschnitt bewusst verteilt.",
    questions: ["Wie lang ist die reale Flucht zwischen festen Punkten?", "Wie werden Restfeld, Tor und Ecken aufgeteilt?", "Welche Wind- und Fundamentanforderungen gelten für das System?"],
    boundary: "Die Rasterrechnung bemisst weder Windlast noch Pfosten oder Fundamente. Grenzverlauf und zulässige Höhe müssen lokal geprüft werden.",
  },
  {
    slug: "carport",
    name: "Carport planen",
    eyebrow: "Fahrzeug, Zufahrt und Dach",
    description: "Carport-Breite, Länge, Höhe, Rangierraum, Abstellraum und Entwässerung aus Fahrzeug und Grundstück ableiten.",
    intro: "Ein Carport wird nicht nach Dachmaß ausgewählt, sondern nach dem kleinsten lichten Querschnitt. Fahrzeug, Spiegel, Türen, Dachaufbauten, Pfosten und Rangierlinie müssen gleichzeitig funktionieren.",
    plannerHref: "/garten/carport-planer/",
    plannerLabel: "Carportmaße bestimmen",
    method: "Miss das konkrete Fahrzeug und zeichne Einfahrt, geöffnete Türen, Pfosten und Wasserweg. Außen- und Dachmaße werden erst nach dem notwendigen lichten Raum verglichen.",
    questions: ["Welche lichte Breite und Höhe braucht das Fahrzeug wirklich?", "Bleiben Türöffnung und Rangierweg zwischen Pfosten frei?", "Wohin werden Dachwasser und Schnee sicher geführt?"],
    boundary: "Tragwerk, Fundamente, Wind- und Schneelasten, Brandschutz, Entwässerung und Genehmigung benötigen standortbezogene Nachweise.",
  },
  {
    slug: "bodenbelag",
    name: "Bodenbelag planen",
    eyebrow: "Fläche, Untergrund und Pakete",
    description: "Laminat und Vinyl nach Raum, Untergrund, Nutzung, Verlegung, Verschnitt, Paketen und Sockelleisten planen und vergleichen.",
    intro: "Die richtige Bestellmenge entsteht erst nach der Systementscheidung. Untergrund, Feuchte, Heizung und Nutzung klären, ob ein Boden geeignet ist; Raumform, Dielenformat und Paketinhalt bestimmen danach die Menge.",
    plannerHref: "/haus/boden/bodenbelag-rechner/",
    plannerLabel: "Bodenmenge berechnen",
    method: "Zerlege den Raum in messbare Teilflächen und lege Verlegerichtung sowie Produktformat fest. Wende den begründeten Verschnitt vor der Rundung auf ganze Pakete an.",
    questions: ["Ist der Untergrund eben, trocken und für das System geeignet?", "Welche Zuschnitte entstehen aus Raumform und Richtung?", "Welche Unterlagen, Profile und Sockelleisten gehören zum Gesamtpreis?"],
    boundary: "Restfeuchte, Ebenheit und der vollständige Aufbau müssen nach Produkt- und Untergrundvorgaben geprüft werden. Die Rechnung ist keine Verlegefreigabe.",
  },
  {
    slug: "trockenbau",
    name: "Trockenbau planen",
    eyebrow: "Platten, Profile und Öffnungen",
    description: "Trockenbauwand, Plattenlagen, Ständerwerk, Türen, Verstärkungen und Schallschutz als vollständiges System planen.",
    intro: "Trockenbaumengen hängen nicht nur von Quadratmetern ab. Wandfunktion, Höhe, Öffnungen, Lasten, Plattenlagen und das freigegebene Profilraster bestimmen den Materialrahmen.",
    plannerHref: "/haus/innenausbau/trockenbau-rechner/",
    plannerLabel: "Trockenbaumaterial berechnen",
    method: "Erfasse Wand und Öffnungen. Wähle anschließend ein freigegebenes System und berechne Platten je Seite und Lage. Profile, Dämmung, Verstärkungen und Befestiger bleiben nachvollziehbare Positionen.",
    questions: ["Welche Funktion und Höhe muss die Wand erfüllen?", "Welche Türen, Installationen oder Lasten stören das Grundraster?", "Welcher geprüfte Systemaufbau deckt Schall- oder Brandschutz ab?"],
    boundary: "Sicherheitsrelevante, tragende, Schall- und Brandschutzdetails müssen dem vollständigen Systemnachweis und gegebenenfalls einer Fachplanung folgen.",
  },
  {
    slug: "luftentfeuchter",
    name: "Luftentfeuchter auswählen",
    eyebrow: "Raumvolumen, Temperatur und Feuchte",
    description: "Luftentfeuchter nach Raumvolumen, Temperatur, Feuchtelast, Technik, Geräusch, Ablauf und Stromverbrauch einordnen.",
    intro: "Liter pro Tag ist nur unter den zugehörigen Testbedingungen aussagekräftig. Raumvolumen, Temperatur, Feuchteverlauf und Ursache entscheiden, ob und wie ein Gerät sinnvoll eingesetzt werden kann.",
    plannerHref: "/haus/raumklima/luftentfeuchter-rechner/",
    plannerLabel: "Entfeuchterbedarf einordnen",
    method: "Berechne Raumvolumen und protokolliere Temperatur sowie relative Feuchte über mehrere Tage. Vergleiche Leistungsdaten bei ähnlichen Bedingungen und kalkuliere Strom aus realer Laufzeit.",
    questions: ["Welche Ursache erzeugt die Feuchtigkeit?", "Wie verändern Temperatur und Nutzung die reale Geräteleistung?", "Sind Ablauf, Geräusch und elektrische Aufstellung alltagstauglich?"],
    boundary: "Ein Entfeuchter beseitigt keine Leckage, Wärmebrücke oder andere bauliche Ursache. Schimmel und anhaltende Feuchte benötigen fachliche Ursachenklärung.",
  },
] as const;

export function getSeoTopic(slug: string) {
  return SEO_TOPICS.find((topic) => topic.slug === slug);
}

export function getSeoTopicForGuide(guide: Pick<SeoGuide, "plannerHref">) {
  return SEO_TOPICS.find((topic) => topic.plannerHref === guide.plannerHref);
}

export function getGuidesForTopic(guides: readonly SeoGuide[], topic: SeoTopic) {
  return guides.filter((guide) => guide.plannerHref === topic.plannerHref);
}
