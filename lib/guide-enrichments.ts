export interface GuideSource {
  label: string;
  href: string;
  publisher: string;
  note: string;
}

export interface GuideExample {
  title: string;
  intro: string;
  steps: Array<{ label: string; value: string }>;
  result: string;
  note?: string;
}

export interface GuideEnrichment {
  sources?: GuideSource[];
  example?: GuideExample;
}

const source = {
  berlinBuildingCode: {
    label: "§ 61 Bauordnung für Berlin – verfahrensfreie Bauvorhaben",
    href: "https://gesetze.berlin.de/bsbe/?query=DOKNR%3Ajlr-NNLBE00004835NN00000000190&source=PermaLink",
    publisher: "Land Berlin",
    note: "Amtliches Beispiel für landesrechtliche Größen- und Standortgrenzen; andere Bundesländer können abweichen.",
  },
  modelBuildingCode: {
    label: "Musterbauordnung und Auslegungshilfen",
    href: "https://www.bauministerkonferenz.de/verzeichnis.aspx?id=991&o=991",
    publisher: "Bauministerkonferenz",
    note: "Überblick über das Musterrecht; verbindlich bleibt die jeweils geltende Landes- und Ortsregelung.",
  },
  allotmentLaw: {
    label: "§ 3 Bundeskleingartengesetz – Kleingarten und Gartenlaube",
    href: "https://www.gesetze-im-internet.de/bkleingg/__3.html",
    publisher: "Bundesministerium der Justiz / Bundesamt für Justiz",
    note: "Amtliche Regelung für Lauben in Kleingartenanlagen; nicht pauschal auf private Hausgrundstücke übertragbar.",
  },
  rainwater: {
    label: "Tipps für eine nachhaltige Regenwassernutzung",
    href: "https://www.umweltbundesamt.de/umwelttipps-fuer-den-alltag/tipps-fuer-eine-nachhaltige-regenwassernutzung",
    publisher: "Umweltbundesamt",
    note: "Hinweise zu Gartennutzung, Dachmaterialien, Speicherung und sicherem Umgang mit Regenwasser.",
  },
  rainwaterManagement: {
    label: "Regenwasserbewirtschaftung",
    href: "https://www.umweltbundesamt.de/themen/wasser/wasser-bewirtschaften/regenwasserbewirtschaftung",
    publisher: "Umweltbundesamt",
    note: "Einordnung von Rückhalt, Versickerung, Nutzung und örtlich unterschiedlichen Anforderungen.",
  },
  dvgwGarden: {
    label: "Trinkwasser-Installation im Garten",
    href: "https://www.dvgw.de/themen/wasser/verbraucherinformationen/trinkwasser-installation/garten/",
    publisher: "DVGW",
    note: "Hinweise zu Außenentnahmestellen, Rückflussschutz und fachgerechter Absicherung von Bewässerungsanlagen.",
  },
  mold: {
    label: "Schimmel: Ursachen, Vorbeugung und gesundheitliche Einordnung",
    href: "https://www.umweltbundesamt.de/themen/gesundheit/umwelteinfluesse-auf-den-menschen/schimmel",
    publisher: "Umweltbundesamt",
    note: "Behördliche Einordnung von Feuchteursachen, Schimmelrisiken und notwendiger Ursachenbeseitigung.",
  },
  ventilation: {
    label: "Wie lüfte ich richtig? – Tipps zur Schimmelvermeidung",
    href: "https://www.umweltbundesamt.de/en/node/3086",
    publisher: "Umweltbundesamt",
    note: "Raum- und jahreszeitabhängige Lüftungshinweise, einschließlich besonderer Bedingungen in Kellern.",
  },
  knaufWalls: {
    label: "W11.de Metallständerwände – Systeme und Datenblätter",
    href: "https://knauf.com/de-DE/systeme/trockenbausysteme/w11-de-metallstaenderwaende",
    publisher: "Knauf",
    note: "Originale Systemvarianten und technische Unterlagen zu Profilen, Beplankungen und Wandaufbauten.",
  },
  gypsumOpenings: {
    label: "Merkblatt 8: Wandhöhen, Anschlüsse, Türen und Öffnungen",
    href: "https://www.gips.de/aktuelles/detail/merkblatt-wandhoehen-erweitert/",
    publisher: "Bundesverband der Gipsindustrie",
    note: "Fachliche Einordnung der zusätzlichen Planung bei großen Wandhöhen, Installationen und Öffnungen.",
  },
  rigipsCatalogs: {
    label: "Planen und Bauen – Trockenbau-Kataloge",
    href: "https://www.rigips.de/planen-und-bauen-kataloge",
    publisher: "Rigips",
    note: "Herstellerunterlagen für vollständige, aufeinander abgestimmte Trockenbausysteme.",
  },
  eplfFlooring: {
    label: "Technische Merkblätter zu Laminat, Verlegung und Unterlagen",
    href: "https://eplf.com/de/infomaterial-zu-laminat",
    publisher: "Verband der Europäischen Laminatbodenhersteller",
    note: "Fachverbandsunterlagen zu Untergrund, Unterlagen und fachgerechter Laminatverlegung.",
  },
  mmfaFlooring: {
    label: "Standards and references – Installation",
    href: "https://mmfa.eu/en/products/installation/standards/",
    publisher: "MMFA",
    note: "Normen- und Merkblattübersicht für modulare mehrschichtige Bodenbeläge und Fußbodenheizung.",
  },
} satisfies Record<string, GuideSource>;

export const GUIDE_ENRICHMENTS: Record<string, GuideEnrichment> = {
  "/garten/gartenhaus-groesse/": {
    sources: [source.modelBuildingCode, source.berlinBuildingCode, source.allotmentLaw],
    example: {
      title: "Zwei Fahrräder, Geräte und Rasenmäher",
      intro: "Die MachPlan-Heuristik addiert Nutzungsflächen und rundet erst nach der Bewegungsreserve auf.",
      steps: [
        { label: "Grundbewegungsfläche", value: "0,8 m²" },
        { label: "2 Fahrräder", value: "1,3 m²" },
        { label: "mittlere Gerätelagerung", value: "1,4 m²" },
        { label: "Rasenmäher und Regal", value: "1,4 m²" },
        { label: "Zwischensumme × 1,15", value: "5,635 m²" },
      ],
      result: "Auf den nächsten halben Quadratmeter gerundet: 6,0 m² Planungsfläche und mindestens 80 cm bekannte Türbreite.",
      note: "Das ist eine dokumentierte Lagerheuristik, keine Bau- oder Flächennorm.",
    },
  },
  "/garten/gartenhaus-fundament/": {
    sources: [source.modelBuildingCode, source.berlinBuildingCode],
  },
  "/garten/gartenhaus-fuer-fahrraeder/": {
    sources: [source.allotmentLaw, source.berlinBuildingCode],
  },
  "/garten/carport-groesse/": {
    sources: [source.modelBuildingCode, source.berlinBuildingCode],
  },
  "/garten/carport-fundament/": {
    sources: [source.modelBuildingCode, source.berlinBuildingCode],
  },
  "/garten/carport-dachentwaesserung/": {
    sources: [source.rainwaterManagement, source.rainwater],
    example: {
      title: "Theoretisches Wasser einer 18-m²-Dachfläche",
      intro: "Ein Millimeter Niederschlag auf einem Quadratmeter entspricht geometrisch einem Liter Wasser.",
      steps: [
        { label: "Dachprojektion", value: "18 m²" },
        { label: "Niederschlag", value: "10 mm" },
        { label: "Geometrische Rechnung", value: "18 × 10" },
      ],
      result: "Theoretischer Rahmen: 180 Liter vor Wind-, Spritz-, Rinnen- und Speicherverlusten.",
      note: "Der Wert dimensioniert weder Rinne noch Fallrohr, Speicher oder Versickerung.",
    },
  },
  "/garten/bewaesserung-durchfluss-messen/": {
    sources: [source.dvgwGarden],
    example: {
      title: "Eimertest mit zehn Litern",
      intro: "Gemessen wird direkt am später genutzten Anschluss bei stabilem Wasserstrahl.",
      steps: [
        { label: "Behältervolumen", value: "10 l" },
        { label: "Füllzeit", value: "30 s" },
        { label: "Rechnung", value: "10 × 60 ÷ 30" },
      ],
      result: "Gemessener Durchfluss: 20 l/min unter genau diesen Messbedingungen.",
      note: "Der Fließdruck muss während einer definierten Entnahme separat geprüft werden.",
    },
  },
  "/garten/tropfbewaesserung-hecke/": {
    sources: [source.dvgwGarden, source.rainwater],
    example: {
      title: "Tropfrohr für eine 20 Meter lange Hecke",
      intro: "Die aktuelle Materialheuristik ergänzt 15 Prozent für Verlegung und Anschlüsse.",
      steps: [
        { label: "gemessene Heckenlänge", value: "20 m" },
        { label: "Reservefaktor", value: "1,15" },
        { label: "Rechnung", value: "20 × 1,15" },
      ],
      result: "Erste Materialschätzung: 23 m Tropfrohr.",
      note: "Maximale Stranglänge, Tropferabstand, Druck und Laufzeit folgen dem konkreten System.",
    },
  },
  "/garten/rasenbewaesserung-planen/": {
    sources: [source.dvgwGarden, source.rainwater],
  },
  "/garten/bewaesserungscomputer-zonen/": {
    sources: [source.dvgwGarden, source.rainwater],
  },
  "/garten/gewaechshaus-fundament/": {
    sources: [source.modelBuildingCode, source.rainwaterManagement],
  },
  "/haus/raumklima/luftentfeuchter-keller/": {
    sources: [source.mold, source.ventilation],
  },
  "/haus/raumklima/luftentfeuchter-waesche/": {
    sources: [source.mold, source.ventilation],
  },
  "/haus/raumklima/luftentfeuchter-stromverbrauch/": {
    sources: [source.mold],
    example: {
      title: "Tageskosten bei gemessenen acht Betriebsstunden",
      intro: "Leistung wird zuerst in Kilowatt umgerechnet und dann mit Zeit und Arbeitspreis multipliziert.",
      steps: [
        { label: "Leistungsaufnahme", value: "300 W = 0,3 kW" },
        { label: "Betriebszeit", value: "8 h" },
        { label: "Arbeitspreis", value: "0,35 €/kWh" },
        { label: "Rechnung", value: "0,3 × 8 × 0,35" },
      ],
      result: "Rechnerischer Tageswert: 0,84 €.",
      note: "Entscheidend ist die reale Laufzeit; Hygrostat und Raumzustand verändern sie.",
    },
  },
  "/haus/innenausbau/trockenbau-platten-berechnen/": {
    sources: [source.knaufWalls, source.rigipsCatalogs],
    example: {
      title: "Fünf Meter Wand mit einer Türöffnung",
      intro: "Beispiel mit 2,60 m Höhe, 2 m² Öffnung, beidseitig einlagiger Beplankung und zehn Prozent Reserve.",
      steps: [
        { label: "Bruttofläche", value: "5 × 2,6 = 13,0 m²" },
        { label: "Nettofläche je Seite", value: "13,0 − 2,0 = 11,0 m²" },
        { label: "beide Seiten", value: "22,0 m²" },
        { label: "inklusive 10 % Reserve", value: "24,2 m²" },
        { label: "Plattenformat", value: "2,60 × 1,25 m = 3,25 m²" },
      ],
      result: "24,2 ÷ 3,25 ergibt aufgerundet 8 Platten.",
      note: "Öffnungsränder, Fugenversatz und zulässige Plattenanordnung müssen zusätzlich gezeichnet werden.",
    },
  },
  "/haus/innenausbau/trockenbau-profile-staenderwerk/": {
    sources: [source.knaufWalls, source.gypsumOpenings, source.rigipsCatalogs],
    example: {
      title: "Ungestörtes Grundraster einer fünf Meter langen Wand",
      intro: "Das Beispiel verwendet 62,5 cm Achsabstand und 3-m-Lieferstäbe für Boden und Decke.",
      steps: [
        { label: "Grundständer", value: "aufrunden(5 ÷ 0,625) + 1 = 9" },
        { label: "UW-Länge mit 10 % Reserve", value: "5 × 2 × 1,10 = 11,0 m" },
        { label: "3-m-Lieferstäbe", value: "aufrunden(11 ÷ 3)" },
      ],
      result: "Grundrahmen: 9 Ständerpositionen und 4 UW-Lieferstäbe.",
      note: "Tür-, Rand-, Anschluss- und Lastprofile sind darin noch nicht enthalten.",
    },
  },
  "/haus/innenausbau/trockenbau-tuer-oeffnungen/": {
    sources: [source.gypsumOpenings, source.knaufWalls, source.rigipsCatalogs],
  },
  "/haus/boden/laminat-verschnitt-berechnen/": {
    sources: [source.eplfFlooring, source.mmfaFlooring],
    example: {
      title: "20 m² Raum mit zehn Prozent Reserve",
      intro: "Der Paketinhalt beträgt im Beispiel 2,20 m².",
      steps: [
        { label: "Nettofläche", value: "5 × 4 = 20,0 m²" },
        { label: "inklusive 10 % Reserve", value: "22,0 m²" },
        { label: "Paketinhalt", value: "2,20 m²" },
        { label: "Rechnung", value: "22,0 ÷ 2,20" },
      ],
      result: "Bestellrahmen: 10 volle Pakete beziehungsweise 22,0 m².",
      note: "Bei diagonaler oder verwinkelter Verlegung kann ein höherer, gezeichneter Zuschnittbedarf entstehen.",
    },
  },
  "/haus/boden/untergrund-trittschall/": {
    sources: [source.eplfFlooring, source.mmfaFlooring],
  },
  "/haus/boden/sockelleisten-berechnen/": {
    sources: [source.eplfFlooring],
    example: {
      title: "Sockelleisten für einen Raum mit 5 × 4 Metern",
      intro: "Eine 90 cm breite Tür bleibt ohne Sockelleiste; anschließend kommen zehn Prozent Längenreserve hinzu.",
      steps: [
        { label: "Raumumfang", value: "2 × (5 + 4) = 18,0 m" },
        { label: "abzüglich Türöffnung", value: "17,1 m" },
        { label: "inklusive 10 % Reserve", value: "18,81 m" },
        { label: "Lieferlänge", value: "2,40 m" },
      ],
      result: "18,81 ÷ 2,40 ergibt aufgerundet 8 Lieferstäbe.",
      note: "Ecken, Endkappen, Verbinder und ein gewünschtes Stoßbild werden separat gezählt.",
    },
  },
};
