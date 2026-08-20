import type { SeoGuide } from "@/lib/seo-guides";
import { GUIDE_SOURCE_LIBRARY, type GuideSource } from "@/lib/guide-enrichments";
import { SEO_TOPICS } from "@/lib/seo-topics";

type Scale = {
  slug: string;
  label: string;
  values: readonly number[];
};

type Variant = {
  slug: string;
  label: string;
  focus: string;
  factor: number;
  check: string;
};

type Calculation = {
  input: string;
  calculation: string;
  result: string;
  alternative: string;
  rows: Array<[string, string, string]>;
};

type ProjectCluster = {
  topicSlug: string;
  noun: string;
  directoryTitle: string;
  directoryDescription: string;
  measurement: string;
  interpretation: string;
  verification: string;
  limitation: string;
  scales: readonly Scale[];
  variants: readonly Variant[];
  sources: readonly GuideSource[];
  calculate: (scale: Scale, variant: Variant) => Calculation;
  titleSubject?: (scale: Scale, variant: Variant) => string;
};

export type ProjectExample = SeoGuide & {
  topicSlug: string;
  variantSlug: string;
  variantLabel: string;
  scaleSlug: string;
  qualitySignature: string;
};

export type ProjectExampleDirectory = {
  topicSlug: string;
  title: string;
  description: string;
  intro: string;
  examples: readonly ProjectExample[];
};

const de = (value: number, digits = 1) => value.toLocaleString("de-DE", {
  minimumFractionDigits: 0,
  maximumFractionDigits: digits,
});

const dimensions = (pairs: ReadonlyArray<readonly [number, number]>): Scale[] => pairs.map(([width, length]) => ({
  slug: `${String(width).replace(".", "-")}x${String(length).replace(".", "-")}-meter`,
  label: `${de(width, 2)} × ${de(length, 2)} Meter`,
  values: [width, length],
}));

const areas = (values: readonly number[]): Scale[] => values.map((area) => ({
  slug: `${area}-qm`,
  label: `${area} m²`,
  values: [area],
}));

const lengths = (values: readonly number[]): Scale[] => values.map((length) => ({
  slug: `${String(length).replace(".", "-")}-meter`,
  label: `${de(length)} Meter`,
  values: [length],
}));

const sharedDimensions = dimensions([
  [1.5, 2], [2, 2], [2, 2.5], [2, 3], [2.5, 2.5], [2.5, 3], [3, 3],
  [2.5, 4], [3, 3.5], [3, 4], [3, 5], [3.5, 4], [4, 4], [4, 5],
  [4, 6], [5, 5], [5, 6],
]);

const standardAreas = areas([10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100, 120, 150, 180, 200]);

function gardenHouseCalculation(scale: Scale, variant: Variant): Calculation {
  const [width, length] = scale.values;
  const outer = width * length;
  const innerWidth = Math.max(0, width - 0.16);
  const innerLength = Math.max(0, length - 0.16);
  const inner = innerWidth * innerLength;
  const occupied = inner * variant.factor;
  const free = inner - occupied;
  return {
    input: `${de(width)} m Außenbreite × ${de(length)} m Außenlänge = ${de(outer)} m² Außenfläche`,
    calculation: `Beispielhaftes Innenmaß ${de(innerWidth, 2)} × ${de(innerLength, 2)} m = ${de(inner)} m²; davon ${Math.round(variant.factor * 100)} % Funktions- und Stellfläche`,
    result: `${de(free)} m² bleiben rechnerisch als freie Zugangs- und Bewegungsfläche`,
    alternative: `Bei nur ${Math.round(Math.max(.35, variant.factor - .12) * 100)} % Belegung blieben ${de(inner * (1 - Math.max(.35, variant.factor - .12)))} m² frei`,
    rows: [
      ["Außenfläche", `${de(outer)} m²`, "Dachüberstand zusätzlich prüfen"],
      ["Beispiel-Innenfläche", `${de(inner)} m²`, "Echtes Produkt-Innenmaß einsetzen"],
      ["Belegte Funktionsfläche", `${de(occupied)} m²`, variant.focus],
      ["Freie Bewegungsfläche", `${de(free)} m²`, "Tür und Laufweg einzeichnen"],
    ],
  };
}

function mowerCalculation(scale: Scale, variant: Variant): Calculation {
  const [area] = scale.values;
  const target = Math.ceil(area * variant.factor / 50) * 50;
  const relaxed = Math.ceil(area * Math.max(1.2, variant.factor - .15) / 50) * 50;
  return {
    input: `${area} m² gemessene Netto-Rasenfläche`,
    calculation: `${area} m² × Kapazitätsfaktor ${de(variant.factor, 2)}; anschließend auf die nächste 50-m²-Klasse aufrunden`,
    result: `Modelle ab etwa ${target} m² Nennflächen-Rahmen prüfen`,
    alternative: `Bei vereinfachter Geometrie ergäbe derselbe Ansatz etwa ${relaxed} m²`,
    rows: [
      ["Netto-Rasenfläche", `${area} m²`, "Wege, Beete und Terrasse abziehen"],
      ["Szenariofaktor", `× ${de(variant.factor, 2)}`, variant.focus],
      ["Auswahlrahmen", `${target} m²`, "Keine Laufzeitgarantie"],
      ["Alternative", `${relaxed} m²`, "Nur bei tatsächlich einfacherer Fläche"],
    ],
  };
}

function terraceCalculation(scale: Scale, variant: Variant): Calculation {
  const [area] = scale.values;
  const orderArea = area * variant.factor;
  const boardWidth = variant.slug.includes("wpc") ? .14 : variant.slug.includes("thermoholz") ? .13 : .145;
  const runningMeters = orderArea / boardWidth;
  return {
    input: `${area} m² geometrische Terrassenfläche`,
    calculation: `${area} m² × Mengenfaktor ${de(variant.factor, 2)} = ${de(orderArea)} m²; geteilt durch ${de(boardWidth * 1000, 0)} mm Deckbreite`,
    result: `${de(orderArea)} m² Bestellrahmen beziehungsweise rund ${de(runningMeters, 0)} laufende Dielenmeter`,
    alternative: `Ohne den ausgewiesenen Zuschnitt wären es rechnerisch ${de(area / boardWidth, 0)} laufende Meter`,
    rows: [
      ["Nettofläche", `${area} m²`, "Geometrie vollständig messen"],
      ["Mengenfaktor", `× ${de(variant.factor, 2)}`, variant.focus],
      ["Bestellfläche", `${de(orderArea)} m²`, "Auf ganze Lieferlängen übertragen"],
      ["Dielen-Laufmeter", `${de(runningMeters, 0)} m`, "Fuge und reale Deckbreite prüfen"],
    ],
  };
}

function irrigationCalculation(scale: Scale, variant: Variant): Calculation {
  const [area] = scale.values;
  const litersPerEvent = variant.factor;
  const liters = area * litersPerEvent;
  const minutesAt15 = liters / 15;
  const timeBlocks = Math.max(1, Math.ceil(minutesAt15 / 45));
  return {
    input: `${area} m² zu versorgende Pflanz- oder Rasenfläche`,
    calculation: `${area} m² × ${de(litersPerEvent)} l/m² als transparentes Rechenereignis = ${de(liters, 0)} l; bei gemessenen 15 l/min`,
    result: `${de(minutesAt15, 0)} Minuten theoretische Abgabezeit; mindestens ${timeBlocks} ${timeBlocks === 1 ? "Zeitblock" : "Zeitblöcke"} von höchstens 45 Minuten einplanen`,
    alternative: `Bei 20 l/min verkürzt sich die reine Abgabezeit rechnerisch auf ${de(liters / 20, 0)} Minuten`,
    rows: [
      ["Planungsfläche", `${area} m²`, variant.focus],
      ["Beispiel-Abgabe", `${de(litersPerEvent)} l/m²`, "Kein allgemeiner Pflanzen-Sollwert"],
      ["Wassermenge", `${de(liters, 0)} l`, "Niederschlag und Boden berücksichtigen"],
      ["Zeit bei 15 l/min", `${de(minutesAt15, 0)} min`, `${timeBlocks} Zeitblöcke organisatorisch prüfen`],
    ],
  };
}

function greenhouseCalculation(scale: Scale, variant: Variant): Calculation {
  const [width, length] = scale.values;
  const total = width * length;
  const aisleWidth = variant.factor;
  const aisle = aisleWidth * length;
  const bed = total - aisle;
  return {
    input: `${de(width)} × ${de(length)} m Grundfläche = ${de(total)} m²`,
    calculation: `${de(total)} m² minus beispielhaft ${de(aisleWidth)} m × ${de(length)} m Mittelweg`,
    result: `Rund ${de(bed)} m² rechnerische Beet- und Stellfläche vor Profilen und Türbereich`,
    alternative: `Mit einem 10 cm schmaleren Weg wären es etwa ${de(total - (aisleWidth - .1) * length)} m²`,
    rows: [
      ["Grundfläche", `${de(total)} m²`, "Innenmaß des Systems verwenden"],
      ["Beispiel-Wegbreite", `${de(aisleWidth)} m`, variant.focus],
      ["Wegfläche", `${de(aisle)} m²`, "Tür und Wendestelle ergänzen"],
      ["Verbleibende Fläche", `${de(bed)} m²`, "Profile und Technik noch abziehen"],
    ],
  };
}

function privacyCalculation(scale: Scale, variant: Variant): Calculation {
  const [length] = scale.values;
  const moduleWidth = variant.factor;
  const elements = Math.ceil(length / moduleWidth);
  const posts = elements + 1 + (variant.slug.includes("tor") ? 1 : 0);
  const rest = elements * moduleWidth - length;
  return {
    input: `${de(length)} m gemessene Sichtschutzflucht`,
    calculation: `${de(length)} m ÷ ${de(moduleWidth, 2)} m angenommene Montagebreite = ${de(length / moduleWidth, 2)}; auf ganze Felder aufrunden`,
    result: `${elements} Felder und mindestens ${posts} Pfosten als Rasterrahmen; ${de(rest, 2)} m rechnerisches Restmaß`,
    alternative: `Mit 1,80-m-Feldern wären ${Math.ceil(length / 1.8)} Elemente vor Ecken und Toren nötig`,
    rows: [
      ["Gemessene Flucht", `${de(length)} m`, "Zwischen festen Endpunkten messen"],
      ["Montagebreite", `${de(moduleWidth, 2)} m`, variant.focus],
      ["Elemente", `${elements}`, "Restmaß bewusst verteilen"],
      ["Pfostenrahmen", `${posts}`, "Ecken, Tor und Endsystem ergänzen"],
    ],
  };
}

function carportCalculation(scale: Scale, variant: Variant): Calculation {
  const [vehicleWidth, vehicleLength] = scale.values;
  const sideAllowance = variant.factor;
  const lightWidth = vehicleWidth + sideAllowance * 2;
  const lightLength = vehicleLength + 1;
  const area = lightWidth * lightLength;
  return {
    input: `Fahrzeug ${de(vehicleWidth)} m breit und ${de(vehicleLength)} m lang`,
    calculation: `${de(vehicleWidth, 2)} m + 2 × ${de(sideAllowance, 2)} m seitlicher Bedienraum; Länge plus 1,00 m Funktionsreserve`,
    result: `Mindestens etwa ${de(lightWidth)} × ${de(lightLength)} m lichte Nutzungszone beziehungsweise ${de(area)} m²`,
    alternative: `Mit 10 cm weniger je Seite sinkt die lichte Breite auf ${de(lightWidth - .2)} m, die Alltagstauglichkeit muss dann praktisch geprüft werden`,
    rows: [
      ["Fahrzeugmaß", `${de(vehicleWidth)} × ${de(vehicleLength)} m`, "Spiegel und Anbauten erfassen"],
      ["Seitenraum je Seite", `${de(sideAllowance, 2)} m`, variant.focus],
      ["Lichte Zielbreite", `${de(lightWidth)} m`, "Pfosten und Wandanschluss beachten"],
      ["Lichte Ziellänge", `${de(lightLength)} m`, "Rangier- und Stauraum separat"],
    ],
  };
}

function flooringCalculation(scale: Scale, variant: Variant): Calculation {
  const [area] = scale.values;
  const orderArea = area * variant.factor;
  const packageArea = variant.slug.includes("vinyl") ? 2.05 : 2.2;
  const packages = Math.ceil(orderArea / packageArea);
  return {
    input: `${area} m² gemessene Netto-Raumfläche`,
    calculation: `${area} m² × Verschnittfaktor ${de(variant.factor, 2)} = ${de(orderArea)} m²; geteilt durch ${de(packageArea, 2)} m² je Beispielpaket`,
    result: `${packages} ganze Pakete beziehungsweise ${de(packages * packageArea)} m² Bestellmenge`,
    alternative: `Bei einem Produkt mit 2,50 m² je Paket wären ${Math.ceil(orderArea / 2.5)} Pakete nötig`,
    rows: [
      ["Netto-Raumfläche", `${area} m²`, "Teilflächen ohne Überlappung addieren"],
      ["Verschnittfaktor", `× ${de(variant.factor, 2)}`, variant.focus],
      ["Rechenmenge", `${de(orderArea)} m²`, "Vor Paketrundung"],
      ["Beispielpakete", `${packages}`, "Echten Paketinhalt einsetzen"],
    ],
  };
}

function drywallCalculation(scale: Scale, variant: Variant): Calculation {
  const [width, height] = scale.values;
  const wallArea = width * height;
  const layers = variant.factor;
  const boardArea = 1.25 * 2.6;
  const grossBoardArea = wallArea * 2 * layers * 1.1;
  const boards = Math.ceil(grossBoardArea / boardArea);
  return {
    input: `${de(width)} m Wandlänge × ${de(height)} m Wandhöhe = ${de(wallArea)} m² je Seite`,
    calculation: `${de(wallArea)} m² × 2 Seiten × ${layers} ${layers === 1 ? "Lage" : "Lagen"} × 1,10 Mengenfaktor`,
    result: `${de(grossBoardArea)} m² Plattenrahmen beziehungsweise etwa ${boards} Beispielplatten à 1,25 × 2,60 m`,
    alternative: `Ohne den 10-%-Mengenfaktor wären rechnerisch ${Math.ceil(wallArea * 2 * layers / boardArea)} Beispielplatten nötig`,
    rows: [
      ["Wandfläche je Seite", `${de(wallArea)} m²`, "Öffnungen separat dokumentieren"],
      ["Beplankung", `${layers} ${layers === 1 ? "Lage" : "Lagen"}`, variant.focus],
      ["Plattenrahmen", `${de(grossBoardArea)} m²`, "Systemformat und Fugenversatz prüfen"],
      ["Beispielplatten", `${boards}`, "Kein Verlegeplan"],
    ],
  };
}

function dehumidifierCalculation(scale: Scale, variant: Variant): Calculation {
  const [area] = scale.values;
  const height = variant.factor;
  const volume = area * height;
  const margin = variant.slug.includes("waesche") ? 1.5 : variant.slug.includes("keller") ? 1.4 : variant.slug.includes("bad") ? 1.35 : 1.25;
  const target = Math.ceil(volume * margin);
  return {
    input: `${area} m² Raumfläche × ${de(height)} m mittlere Deckenhöhe`,
    calculation: `${area} m² × ${de(height)} m = ${de(volume)} m³; Auswahlpuffer ${de(margin, 2)}`,
    result: `Geräte mit dokumentierter Eignung für mindestens etwa ${target} m³ unter vergleichbaren Bedingungen prüfen`,
    alternative: `Ohne Zusatzlast läge der reine Volumenwert bei ${de(volume)} m³; das ersetzt keine Feuchtediagnose`,
    rows: [
      ["Raumfläche", `${area} m²`, "Alle verbundenen Bereiche erfassen"],
      ["Raumvolumen", `${de(volume)} m³`, variant.focus],
      ["Auswahlpuffer", `× ${de(margin, 2)}`, "Nutzungsannahme offenlegen"],
      ["Volumenrahmen", `${target} m³`, "Leistung bei realer Temperatur prüfen"],
    ],
  };
}

const clusters: readonly ProjectCluster[] = [
  {
    topicSlug: "gartenhaus", noun: "Gartenhaus", directoryTitle: "Gartenhaus-Größen und Nutzungsprofile",
    directoryDescription: "85 konkrete Gartenhaus-Beispiele für deutsche Gärten: Außenmaß in realistische Innen-, Stell- und Bewegungsfläche übersetzen.",
    measurement: "Unterscheide Außenmaß, Sockelmaß und lichte Innenmaße. Zeichne Türöffnung, Regaltiefe und die Entnahmerichtung großer Gegenstände maßstäblich ein.",
    interpretation: "Die Rechnung zeigt, wie viel Fläche nach einem transparenten Belegungsansatz frei bleibt. Sie sagt nicht, dass jedes Haus mit demselben Nennmaß innen identisch groß ist.",
    verification: "Vergleiche das Ergebnis mit Maßzeichnung, Türlichte, Bodenlast, Dachüberstand, Fundamentplan und der am Standort geltenden Rechtslage.",
    limitation: "Das Beispiel ersetzt weder Produktmaßzeichnung noch Prüfung von Fundament, Statik, Grenzabstand oder Landes- und Ortsrecht.",
    scales: sharedDimensions,
    variants: [
      { slug: "geraete", label: "für Gartengeräte", focus: "Regale, lange Geräte und Rollweg", factor: .52, check: "Lange Geräte müssen entnommen werden können, ohne den Zugang leerzuräumen." },
      { slug: "fahrraeder", label: "für Fahrräder", focus: "Lenker, Türlichte und Rangiergasse", factor: .58, check: "Das breiteste Rad muss mit Lenker und Anbauten durch die lichte Tür passen." },
      { slug: "werkstatt", label: "mit Werkstatt", focus: "Werkbank, Bedienraum und Maschinen", factor: .66, check: "Werkbanktiefe und Bediengang müssen gleichzeitig frei bleiben." },
      { slug: "gartenmoebel", label: "für Gartenmöbel", focus: "Saisonlager, Stapelhöhe und Türweg", factor: .62, check: "Die größte Tischplatte bestimmt häufig Tür und freie Wendefläche." },
      { slug: "gemischt", label: "für gemischte Lagerung", focus: "getrennte Lagerzonen und täglicher Zugriff", factor: .7, check: "Häufig benötigte Dinge dürfen nicht hinter dem Saisonlager verschwinden." },
    ], sources: [GUIDE_SOURCE_LIBRARY.modelBuildingCode, GUIDE_SOURCE_LIBRARY.berlinBuildingCode], calculate: gardenHouseCalculation,
  },
  {
    topicSlug: "maehroboter", noun: "Mähroboter", directoryTitle: "Mähroboter nach Fläche und Gartentyp",
    directoryDescription: "85 Flächenprofile für deutsche Rasenflächen – von 100 bis 5.000 m² mit Geometrie-, Hang-, Passagen- und Zonenreserve.",
    measurement: "Ermittle ausschließlich die Netto-Rasenfläche und dokumentiere Steigung, engste Passage, getrennte Bereiche, hohe Hindernisdichte und den möglichen Platz der Ladestation.",
    interpretation: "Der Kapazitätsfaktor ist ein offengelegter PassendPlanen-Auswahlrahmen. Er bildet Planungserschwernisse ab, ist aber keine Zusage für tägliche Laufzeit oder vollständige Abdeckung.",
    verification: "Prüfe beim konkreten Modell Nennfläche, maximale Steigung, Mindestpassage, Navigation, erlaubte Zonen, Randabstände, Geräusch und Installationsanleitung gemeinsam.",
    limitation: "Herstellerwerte gelten unter definierten Bedingungen. Empfang, Traktion, Wachstum, Firmware und reale Mähzeit bleiben grundstücks- und modellabhängig.",
    scales: areas([100, 150, 200, 250, 300, 400, 500, 600, 750, 900, 1000, 1250, 1500, 2000, 2500, 3500, 5000]),
    variants: [
      { slug: "offen", label: "für eine offene Fläche", focus: "wenige Hindernisse und klare Außenkante", factor: 1.2, check: "Auch offene Flächen brauchen eine geeignete Rand- und Ladestationslösung." },
      { slug: "hindernisse", label: "mit vielen Hindernissen", focus: "Bäume, Beete und häufige Richtungswechsel", factor: 1.4, check: "Inseln und Baumscheiben müssen zur Navigation des Modells passen." },
      { slug: "passagen", label: "mit engen Passagen", focus: "schmale Verbindungen und Leitführung", factor: 1.5, check: "Die engste nutzbare Stelle ist mit der Hersteller-Mindestbreite zu vergleichen." },
      { slug: "hang", label: "für einen Hang", focus: "Steigung, Übergang und Traktion", factor: 1.45, check: "Maximalsteigung und Steigung an der Begrenzung sind nicht dieselbe Angabe." },
      { slug: "zonen", label: "für getrennte Zonen", focus: "Nebenflächen, Umsetzen und Verbindungswege", factor: 1.65, check: "Kläre, ob jede Fläche autonom erreichbar ist oder manuelles Umsetzen verlangt." },
    ], sources: [GUIDE_SOURCE_LIBRARY.mowerSlope, GUIDE_SOURCE_LIBRARY.mowerPassages, GUIDE_SOURCE_LIBRARY.mowerSecondaryArea], calculate: mowerCalculation,
  },
  {
    topicSlug: "terrasse", noun: "Terrasse", directoryTitle: "Terrassenflächen und Materialbeispiele",
    directoryDescription: "85 Bestellbeispiele für Terrassendielen in deutschen Projekten – Fläche, Material, Deckbreite und Zuschnitt getrennt rechnen.",
    measurement: "Zerlege die Terrasse in vollständige Rechtecke, dokumentiere Aussparungen und lege die Verlegerichtung fest. Nutze die reale Deckbreite aus Diele plus vorgesehener Fuge.",
    interpretation: "Bestellfläche und Dielen-Laufmeter sind eine Mengenbasis. Lieferlängen, Stoßanordnung und Zuschnittplan entscheiden, ob diese Menge tatsächlich reicht.",
    verification: "Prüfe Lieferformat, Fugen, Auflagerabstände, doppelte Unterkonstruktion an Stößen, Befestigung, Randabschlüsse, Gefälle und Untergrund als vollständiges System.",
    limitation: "Die Mengenrechnung ist keine konstruktive Freigabe. Herstellerangaben und fachgerechter Aufbau haben Vorrang vor pauschalen Raster- oder Verschnittwerten.",
    scales: standardAreas,
    variants: [
      { slug: "holz-gerade", label: "mit Holz, gerade verlegt", focus: "gerade Verlegung mit 8 % Mengenreserve", factor: 1.08, check: "Holzfeuchte, Sortierung und spätere Pflege gehören zur Materialentscheidung." },
      { slug: "wpc-gerade", label: "mit WPC, gerade verlegt", focus: "WPC-System mit 7 % Mengenreserve", factor: 1.07, check: "Temperaturausdehnung und ausschließlich freigegebene Clips sowie Abstände prüfen." },
      { slug: "holz-diagonal", label: "mit Holz, diagonal verlegt", focus: "diagonale Zuschnitte mit 15 % Mengenreserve", factor: 1.15, check: "Der reale Zuschnittplan kann die pauschale Reserve deutlich verändern." },
      { slug: "thermoholz", label: "mit Thermoholz", focus: "schmalere Deckbreite mit 10 % Mengenreserve", factor: 1.1, check: "Befestigung und Unterkonstruktion müssen für das konkrete Thermoholz freigegeben sein." },
      { slug: "wpc-verwinkelt", label: "mit WPC bei verwinkelter Form", focus: "Aussparungen und viele Stirnschnitte mit 14 % Mengenreserve", factor: 1.14, check: "Aussparungen einzeln in einen Verlege- und Zuschnittplan übertragen." },
    ], sources: [GUIDE_SOURCE_LIBRARY.terraceConstruction], calculate: terraceCalculation,
  },
  {
    topicSlug: "bewaesserung", noun: "Bewässerung", directoryTitle: "Bewässerungsflächen und Zonenbeispiele",
    directoryDescription: "85 nachvollziehbare Bewässerungsbeispiele für Rasen, Beete, Hecken und gemischte deutsche Gärten – mit Durchfluss statt Bauchgefühl.",
    measurement: "Miss den Durchfluss direkt am späteren Anschluss und den Fließdruck unter Entnahme. Teile Rasen, Beet, Hecke und Hochbeet nach unterschiedlicher Abgabe und Laufzeit.",
    interpretation: "Die Liter je Quadratmeter sind hier ausdrücklich eine Rechenannahme für ein Ereignis, kein allgemeiner Pflanzenbedarf. Boden, Wetter, Wurzeltiefe und Niederschlag verändern die reale Bewässerung.",
    verification: "Vergleiche die rechnerische Gesamtmenge mit gemessenem Anschluss, zulässiger Stranglänge, Druckregler, Filter, Rückflussschutz, Regnerüberdeckung und Steuerungslogik.",
    limitation: "Das Beispiel ersetzt keine hydraulische Auslegung, Pflanzenberatung oder Prüfung des Trinkwasserschutzes. Ohne reale Messung bleibt die Zonierung vorläufig.",
    scales: areas([50, 75, 100, 125, 150, 200, 250, 300, 400, 500, 600, 750, 900, 1100, 1300, 1600, 2000]),
    variants: [
      { slug: "rasen", label: "für Rasen", focus: "gleichmäßige Regnerüberdeckung als eigene Zone", factor: 15, check: "Regner müssen sich nach Systemvorgabe überdecken und dürfen Wege nicht unnötig bewässern." },
      { slug: "beete", label: "für Beete", focus: "bedarfsgerechte Tropf- oder Mikrobewässerung", factor: 10, check: "Pflanzen mit stark unterschiedlichem Bedarf werden nicht in dieselbe Laufzeit gezwungen." },
      { slug: "hecke", label: "für Hecken", focus: "linienförmige Abgabe entlang der Wurzelzone", factor: 8, check: "Stranglänge, Tropferabstand und Druckausgleich des konkreten Systems prüfen." },
      { slug: "gemischt", label: "für einen gemischten Garten", focus: "Rasen und Pflanzflächen in getrennten Zonen", factor: 12, check: "Regner und Tropfrohr brauchen in der Regel unterschiedliche Laufzeiten." },
      { slug: "hang", label: "für ein Grundstück mit Gefälle", focus: "Abflussrisiko und kürzere Bewässerungsintervalle", factor: 9, check: "Am Hang in Intervallen arbeiten und sichtbaren Oberflächenabfluss vermeiden." },
    ], sources: [GUIDE_SOURCE_LIBRARY.dvgwGarden, GUIDE_SOURCE_LIBRARY.rainwater], calculate: irrigationCalculation,
  },
  {
    topicSlug: "gewaechshaus", noun: "Gewächshaus", directoryTitle: "Gewächshaus-Größen und Kulturpläne",
    directoryDescription: "85 Gewächshausbeispiele: 17 Größen mit fünf Kultur- und Wegprofilen für deutsche Hobbygärten nachvollziehbar aufteilen.",
    measurement: "Arbeite mit dem realen Innenmaß. Zeichne Tür, durchgehenden Weg, erreichbare Beettiefe, hohe Kulturen, Regale, Wasserstelle und Lüftungsflächen ein.",
    interpretation: "Die verbleibende Beet- und Stellfläche ist eine geometrische Orientierung. Profile, Streben, Türschwenkbereich, Tische und Technik reduzieren sie im konkreten System.",
    verification: "Prüfe Fundament, Verankerung, Tür, Dachlüftung, Zuluft, Beschattung, Bewässerung, maximale Pflanzenhöhe und Wind- beziehungsweise Schneelasten am konkreten Standort.",
    limitation: "Die Flächenaufteilung ersetzt weder Kulturplan noch Statik, Fundament- oder Montagefreigabe. Pflanzabstände hängen von Sorte, Erziehung und Klima ab.",
    scales: sharedDimensions,
    variants: [
      { slug: "tomaten", label: "für Tomaten", focus: "80 cm Mittelweg und hohe Kulturen", factor: .8, check: "Tomatenhöhe, Bindesystem und Dachlüftung gemeinsam einzeichnen." },
      { slug: "gurken", label: "für Gurken", focus: "85 cm Weg und seitliche Rankflächen", factor: .85, check: "Rankhilfen dürfen Fensteröffner und Laufweg nicht blockieren." },
      { slug: "paprika", label: "für Paprika und Chili", focus: "75 cm Weg und gut erreichbare Topf- oder Beetflächen", factor: .75, check: "Beschattung und gleichmäßige Wasserversorgung vor dem Sommerbetrieb planen." },
      { slug: "gemischt", label: "für Mischkultur", focus: "90 cm Weg und getrennte Höhenzonen", factor: .9, check: "Hohe Kulturen dürfen niedrige Pflanzen und Lüftungswege nicht dauerhaft verschatten." },
      { slug: "anzucht", label: "für Anzucht und Regale", focus: "95 cm Bedienweg zwischen Tischen und Regalen", factor: .95, check: "Regaltiefe, Gießzugang und elektrische Betriebsmittel sicher planen." },
    ], sources: [GUIDE_SOURCE_LIBRARY.greenhouseSmall], calculate: greenhouseCalculation,
  },
  {
    topicSlug: "sichtschutz", noun: "Sichtschutz", directoryTitle: "Sichtschutz-Längen und Rasterbeispiele",
    directoryDescription: "85 Rasterbeispiele für deutsche Gärten – Elemente, Pfosten, Restfelder, Tor, Gefälle und Montagebreite transparent rechnen.",
    measurement: "Miss die Flucht zwischen festen Endpunkten, nicht entlang eines unklaren Geländeverlaufs. Markiere Ecken, Gefälle, Tor, Leitungen und unverrückbare Hindernisse.",
    interpretation: "Die Element- und Pfostenzahl ist ein Rasterrahmen. Pfostenbreite, Fugen, Halter, Eckausbildung und reale Montagebreite des Systems müssen anschließend eingesetzt werden.",
    verification: "Prüfe Grenzverlauf, zulässige Höhe, Windlast, Boden, Fundamente, Pfostenabstände, Korrosionsschutz, Torbeschläge und die Hersteller-Montagezeichnung.",
    limitation: "Die Rasterrechnung bemisst weder Windlast noch Pfosten oder Fundamente und entscheidet nicht über Grundstücksgrenze, Nachbarrecht oder örtlich zulässige Höhe.",
    scales: lengths([3, 4, 5, 6, 7.5, 9, 10, 12, 15, 18, 20, 22.5, 25, 30, 35, 40, 50]),
    variants: [
      { slug: "180-module", label: "mit 1,80-m-Elementen", focus: "1,80 m reale Montagebreite", factor: 1.8, check: "Nennbreite und Montagebreite inklusive Fugen und Halter nicht verwechseln." },
      { slug: "180-mit-tor", label: "mit 1,80-m-Elementen und Tor", focus: "1,80-m-Raster plus separates Torfeld", factor: 1.8, check: "Torlichte, Pfostenverstärkung und Öffnungsrichtung vor den Fundamenten festlegen." },
      { slug: "90-module", label: "mit schmalen 90-cm-Elementen", focus: "0,90 m Montagebreite für feinere Rasterung", factor: .9, check: "Mehr Felder bedeuten mehr Pfosten, Anschlüsse und mögliche Fundamentpunkte." },
      { slug: "gefaelle", label: "bei Gefälle", focus: "1,80-m-Felder mit sichtbarer Abstufung", factor: 1.8, check: "Höhensprünge und Bodenfreiheit für jedes Feld einzeln zeichnen." },
      { slug: "wpc", label: "mit WPC-System", focus: "1,75 m angenommene System-Montagebreite", factor: 1.75, check: "Ausdehnung, Profilfüllung und freigegebene Pfostenabstände des Systems beachten." },
    ], sources: [GUIDE_SOURCE_LIBRARY.modelBuildingCode], calculate: privacyCalculation,
  },
  {
    topicSlug: "carport", noun: "Carport", directoryTitle: "Carport-Maße nach Fahrzeug und Nutzung",
    directoryDescription: "85 Fahrzeugprofile für deutsche Stellplätze – lichte Breite, Länge, Türöffnung, Fahrräder, Wandnähe und Rangierraum konkret prüfen.",
    measurement: "Miss das reale Fahrzeug einschließlich Spiegeln, Dachaufbauten und Heckträger. Zeichne geöffnete Türen, Pfosten, Wand, Einfahrt und die ungünstigste Rangierlinie ein.",
    interpretation: "Die lichte Zielzone ist kein Außen- oder Dachmaß. Pfosten, Rinne, Dachüberstand und Tragwerk liegen außerhalb oder innerhalb unterschiedlicher Herstellerangaben.",
    verification: "Prüfe Maßzeichnung, lichte Höhe, Pfostenposition, Zufahrt, Entwässerung, Wind- und Schneelast, Fundamente, Brandschutzabstände und Genehmigung am Standort.",
    limitation: "Das Beispiel ersetzt keine Tragwerks-, Fundament-, Entwässerungs- oder Genehmigungsplanung. Maßgeblich sind Fahrzeug, vollständiges System und örtliche Regeln.",
    scales: dimensions([[1.7, 4], [1.75, 4.2], [1.8, 4.4], [1.82, 4.5], [1.85, 4.6], [1.88, 4.7], [1.9, 4.8], [1.92, 4.9], [1.95, 5], [1.98, 5.1], [2, 5.2], [2.02, 5.3], [2.05, 5.4], [2.08, 5.5], [2.1, 5.6], [2.15, 5.8], [2.2, 6]]),
    variants: [
      { slug: "kompakt", label: "für einen kompakten Stellplatz", focus: "55 cm Bedienraum je Fahrzeugseite", factor: .55, check: "Die engste Pfostenstelle muss bei geöffneten Spiegeln und Türen funktionieren." },
      { slug: "komfort", label: "mit komfortabler Türöffnung", focus: "75 cm Bedienraum je Fahrzeugseite", factor: .75, check: "Türöffnung praktisch mit Fahrer, Kindersitz oder Mobilitätshilfe testen." },
      { slug: "wandseite", label: "neben einer Wand", focus: "85 cm Bedienraum je Seite als Wand-Orientierung", factor: .85, check: "Eine Wandseite braucht oft mehr Tür- und Bewegungsraum als eine offene Seite." },
      { slug: "fahrraeder", label: "mit Fahrradzone", focus: "95 cm seitlicher Raum für abgestellte Fahrräder", factor: .95, check: "Fahrräder benötigen einen eigenen Entnahmeweg außerhalb der Fahrzeugtür." },
      { slug: "familie", label: "für Familiennutzung", focus: "90 cm Bedienraum je Seite für häufiges Ein- und Ausladen", factor: .9, check: "Kinder, Einkäufe und Kofferraum müssen ohne Konflikt mit Pfosten erreichbar bleiben." },
    ], sources: [GUIDE_SOURCE_LIBRARY.modelBuildingCode, GUIDE_SOURCE_LIBRARY.rainwaterManagement], calculate: carportCalculation,
    titleSubject: (scale, variant) => `Carport für ein ${scale.label} großes Fahrzeug ${variant.label}`,
  },
  {
    topicSlug: "bodenbelag", noun: "Bodenbelag", directoryTitle: "Bodenflächen, Verschnitt und Paketbeispiele",
    directoryDescription: "85 deutsche Raumbeispiele für Laminat und Vinyl – Nettofläche, Verlegerichtung, Verschnitt und Paketrundung sauber trennen.",
    measurement: "Zerlege L-Formen und verbundene Räume in eindeutige Teilflächen. Dokumentiere Nischen, feste Einbauten, Verlegerichtung und den Paketinhalt des gewählten Produkts.",
    interpretation: "Die Rechenmenge wird vor der Rundung auf ganze Pakete bestimmt. Ein Restpaket ist nicht automatisch Abfall, sondern kann für Reparatur und Musterabgleich sinnvoll sein.",
    verification: "Prüfe Restfeuchte, Ebenheit, Unterlage, Trittschall, Fußbodenheizungsfreigabe, Dehnfugen, Übergangsprofile, Sockelleisten und Lieferchargen als Gesamtsystem.",
    limitation: "Die Paketberechnung ist keine Verlegefreigabe. Untergrundprüfung, Herstellerangaben und vollständiger Bodenaufbau bleiben entscheidend.",
    scales: standardAreas,
    variants: [
      { slug: "laminat-gerade", label: "mit Laminat, gerade verlegt", focus: "8 % Verschnitt für einen einfachen Raum", factor: 1.08, check: "Dielenrichtung und erste beziehungsweise letzte Reihe vor dem Öffnen der Pakete planen." },
      { slug: "laminat-diagonal", label: "mit Laminat, diagonal verlegt", focus: "13 % Verschnitt für diagonale Zuschnitte", factor: 1.13, check: "Diagonalverlegung mit maßstäblichem Reihen- und Zuschnittplan absichern." },
      { slug: "vinyl-gerade", label: "mit Vinyl, gerade verlegt", focus: "7 % Verschnitt bei einfacher Geometrie", factor: 1.07, check: "Untergrund- und Temperaturfreigabe des konkreten Vinylsystems prüfen." },
      { slug: "mehrere-raeume", label: "über mehrere Räume", focus: "11 % Verschnitt für Übergänge und getrennte Zuschnitte", factor: 1.11, check: "Dehnfugen und durchgehende Verlegung zwischen Räumen müssen systemkonform sein." },
      { slug: "verwinkelt", label: "für einen verwinkelten Raum", focus: "15 % Verschnitt für Nischen und viele Endstücke", factor: 1.15, check: "Nischen einzeln messen; ein hoher Pauschalfaktor ersetzt keinen Verlegeplan." },
    ], sources: [GUIDE_SOURCE_LIBRARY.eplfFlooring, GUIDE_SOURCE_LIBRARY.mmfaFlooring], calculate: flooringCalculation,
  },
  {
    topicSlug: "trockenbau", noun: "Trockenbauwand", directoryTitle: "Trockenbauwand-Maße und Materialbeispiele",
    directoryDescription: "85 Wandprofile für deutsche Innenausbauprojekte – Fläche, Wandseiten, Plattenlagen, Formate und Öffnungen nachvollziehbar rechnen.",
    measurement: "Miss Wandlänge und -höhe an mehreren Stellen. Erfasse jede Tür, Installation und geplante Last mit Position; wähle erst danach einen vollständigen freigegebenen Systemaufbau.",
    interpretation: "Die Plattenzahl ist ein Mengenrahmen aus Beispielplatten. Plattenformat, Fugenversatz, Öffnungen, Anschlüsse und zulässige Wandhöhe bestimmen den echten Verlegeplan.",
    verification: "Prüfe Profile, Raster, Plattentyp, Lagen, Schraubenabstände, Dämmung, Türständer, Verstärkungen sowie Schall- und Brandschutz im vollständigen Systemnachweis.",
    limitation: "Die Mengenrechnung ersetzt keine Systemfreigabe oder Fachplanung für tragende, Schall-, Brand- und andere sicherheitsrelevante Anforderungen.",
    scales: dimensions([[2, 2.5], [2.5, 2.5], [3, 2.5], [3.5, 2.5], [4, 2.5], [4.5, 2.5], [5, 2.5], [5.5, 2.5], [6, 2.5], [3, 2.75], [4, 2.75], [5, 2.75], [6, 2.75], [3, 3], [4, 3], [5, 3], [6, 3]]),
    variants: [
      { slug: "einlagig", label: "einlagig beplankt", focus: "eine Plattenlage je Wandseite", factor: 1, check: "Wandhöhe, Lasten und geforderte Eigenschaften müssen zur einlagigen Systemvariante passen." },
      { slug: "doppellagig", label: "doppellagig beplankt", focus: "zwei Plattenlagen je Wandseite", factor: 2, check: "Fugenversatz und Befestigung jeder Lage nach Systemvorgabe ausführen." },
      { slug: "mit-tuer", label: "doppellagig mit Tür", focus: "zwei Lagen plus separate Türöffnung", factor: 2, check: "Türöffnung nicht nur abziehen; Türständer und Sturzprofile separat planen." },
      { slug: "schallschutz", label: "als Schallschutz-System", focus: "zwei Lagen als Mengenrahmen für einen geprüften Aufbau", factor: 2, check: "Schallschutz entsteht aus dem Gesamtsystem einschließlich Anschlüssen und Dämmung." },
      { slug: "installationen", label: "mit Installationen", focus: "zwei Lagen plus Installations- und Verstärkungszonen", factor: 2, check: "Leitungen und Lasten dürfen Profil, Dämmung und notwendige Verstärkungen nicht ungeplant verändern." },
    ], sources: [GUIDE_SOURCE_LIBRARY.knaufWalls, GUIDE_SOURCE_LIBRARY.gypsumOpenings, GUIDE_SOURCE_LIBRARY.rigipsCatalogs], calculate: drywallCalculation,
  },
  {
    topicSlug: "luftentfeuchter", noun: "Luftentfeuchter", directoryTitle: "Luftentfeuchter nach Raumgröße und Nutzung",
    directoryDescription: "85 Raumprofile für deutsche Wohnungen und Keller – Fläche in Volumen übersetzen und Temperatur, Nutzung, Ablauf sowie Geräusch getrennt prüfen.",
    measurement: "Berechne das verbundene Raumvolumen und protokolliere Temperatur sowie relative Feuchte über mehrere Tage. Notiere Nutzung, Lüftung, Wasseranfall und erkennbare Feuchtequellen.",
    interpretation: "Der Volumenrahmen ist ein transparenter Filter, keine bauphysikalische Leistungsberechnung. Liter-pro-Tag-Angaben sind nur bei den zugehörigen Temperatur- und Feuchtebedingungen vergleichbar.",
    verification: "Prüfe Einsatztemperatur, dokumentierte Flächen- oder Volumeneignung, Entfeuchtungsleistung unter passenden Bedingungen, Hygrostat, Geräusch, Leistungsaufnahme und sicheren Dauerablauf.",
    limitation: "Ein Entfeuchter beseitigt keine Leckage, Wärmebrücke oder andere bauliche Ursache. Anhaltende Feuchte und Schimmel benötigen fachliche Ursachenklärung.",
    scales: standardAreas,
    variants: [
      { slug: "wohnraum", label: "für einen Wohnraum", focus: "2,50 m Deckenhöhe und regelmäßige Nutzung", factor: 2.5, check: "Geräusch, Luftstrom und Zielwert müssen im Alltag akzeptabel sein." },
      { slug: "keller", label: "für einen kühlen Keller", focus: "2,30 m Höhe und temperaturabhängige Leistung", factor: 2.3, check: "Die minimale Betriebstemperatur und reale Leistungsdaten im kühlen Raum prüfen." },
      { slug: "waesche", label: "zum Wäschetrocknen", focus: "2,40 m Höhe und zusätzliche Feuchtelast", factor: 2.4, check: "Wäscheabstand, Luftzirkulation, Ablauf und Laufzeit gemeinsam planen." },
      { slug: "bad", label: "für ein Badezimmer", focus: "2,50 m Höhe und kurzfristige Feuchtespitzen", factor: 2.5, check: "Elektrische Schutzbereiche und Geräteeignung am Aufstellort fachgerecht prüfen." },
      { slug: "lagerraum", label: "für einen Lagerraum", focus: "2,70 m Höhe und empfindliches Lagergut", factor: 2.7, check: "Zulässige Feuchte für Lagergut und Oberflächen getrennt beurteilen." },
    ], sources: [GUIDE_SOURCE_LIBRARY.mold, GUIDE_SOURCE_LIBRARY.ventilation], calculate: dehumidifierCalculation,
  },
] as const;

function makeExample(cluster: ProjectCluster, scale: Scale, variant: Variant): ProjectExample {
  const topic = SEO_TOPICS.find((candidate) => candidate.slug === cluster.topicSlug);
  if (!topic) throw new Error(`Unbekannter SEO-Themenbereich: ${cluster.topicSlug}`);
  const calculation = cluster.calculate(scale, variant);
  const slug = `${cluster.topicSlug}-${scale.slug}-${variant.slug}`;
  const defaultSubject = `${cluster.noun} ${scale.label} ${variant.label}`;
  const title = `${cluster.titleSubject?.(scale, variant) ?? defaultSubject}: konkretes Rechenbeispiel`;
  const path = `/ratgeber/projekte/${cluster.topicSlug}/${slug}/`;
  return {
    topicSlug: cluster.topicSlug,
    variantSlug: variant.slug,
    variantLabel: variant.label,
    scaleSlug: scale.slug,
    qualitySignature: `${cluster.topicSlug}|${scale.values.join("x")}|${variant.slug}|${calculation.result}`,
    slug,
    title,
    description: `${defaultSubject} planen: Eingaben, Rechenweg, Ergebnis, Alternative, Checkliste und Grenzen für den deutschen Markt.`,
    heading: title,
    intro: `Dieses Projektprofil beantwortet eine konkrete Planungsfrage: Wie lässt sich ${cluster.noun.toLowerCase()} mit ${scale.label} ${variant.label} belastbar vorbereiten? Statt eine Produktgröße zu erraten, werden Eingabe, Rechenschritt, Ergebnis und die noch offenen Prüfungen getrennt gezeigt. Alle Einheiten und Annahmen sind sichtbar, damit du das Beispiel mit deinen eigenen Messwerten nachvollziehen kannst.`,
    takeaway: `${calculation.result}. Entscheidend ist anschließend die Prüfung am realen Standort und am vollständigen Datenblatt; die Zahl allein ist weder Kaufempfehlung noch technische Freigabe.`,
    plannerHref: topic.plannerHref,
    plannerLabel: topic.plannerLabel,
    sections: [
      {
        title: `Ausgangslage: ${scale.label} ${variant.label}`,
        paragraphs: [
          `${calculation.input}. Der besondere Schwerpunkt dieses Profils lautet: ${variant.focus}. Diese Kombination verändert nicht nur das Endergebnis, sondern auch die Reihenfolge der Prüfung. Deshalb wird sie als eigenes Projektszenario behandelt und nicht als austauschbares Keyword auf einer allgemeinen Übersichtsseite.`,
          `${cluster.measurement} Für dieses Profil gilt zusätzlich: ${variant.check} Halte Messdatum, Einheit und erkennbare Unsicherheiten fest. Schon kleine Abweichungen können sich nach Paket-, Element- oder Kapazitätsrundung deutlich auf die Auswahl auswirken.`,
        ],
      },
      {
        title: "Rechenweg ohne versteckte Annahmen",
        paragraphs: [
          `Der offen gelegte Rechenweg lautet: ${calculation.calculation}. Daraus folgt als Planungsrahmen: ${calculation.result}. Erst nach der vollständigen Rechnung wird auf eine sinnvolle Produkt-, Paket- oder Systemgröße gerundet. So bleibt erkennbar, welcher Anteil gemessen, welcher berechnet und welcher als Reserve ergänzt wurde.`,
          `${cluster.interpretation} Der Wert sollte deshalb nicht isoliert in eine Shop-Suche kopiert werden. Übertrage zuerst deine realen Maße, prüfe die ungünstigste Stelle und dokumentiere, warum der gewählte Puffer für genau dieses Projekt notwendig ist.`,
        ],
      },
      {
        title: "Alternative und Sensitivität des Ergebnisses",
        paragraphs: [
          `${calculation.alternative}. Dieser Gegenwert zeigt, wie empfindlich die Planung auf nur eine geänderte Annahme reagiert. Eine größere Zahl ist nicht automatisch sicherer: Überdimensionierung kann Platz, Anschaffung, Material, Energie oder Wartung unnötig erhöhen, während eine zu knappe Wahl Reserven an der falschen Stelle streicht.`,
          `Ändere deshalb immer nur einen Parameter und rechne danach vollständig neu. Vergleiche anschließend beide Varianten mit denselben Muss-Kriterien: verfügbare Fläche, Zugang, Betriebsbedingungen, Montage, Folgekosten und Wartung. Die Variante mit dem nachvollziehbaren Alltagsnutzen ist belastbarer als die Variante mit dem größten Werbewert.`,
        ],
      },
      {
        title: "So wird aus dem Rechenwert eine belastbare Auswahl",
        paragraphs: [
          `${cluster.verification} Speichere die verwendete technische Unterlage zusammen mit dem Rechenstand. Wenn Produktdaten nur als Marketingtext vorliegen oder die Prüfbedingungen fehlen, ist die betreffende Angabe noch kein belastbares Auswahlkriterium.`,
          `Prüfe zum Schluss das Zusammenspiel: Passt die ungünstigste Abmessung, bleibt Bedienung möglich, sind Montage und Wartung zugänglich und gelten die Annahmen auch unter realen deutschen Standortbedingungen? ${cluster.limitation} Diese offene Grenze ist Teil des Ergebnisses und kein Kleingedrucktes.`,
        ],
      },
    ],
    comparison: {
      caption: `${cluster.noun} ${scale.label}: Ergebnis und Gegenprobe`,
      columns: ["Prüfpunkt", "Dieses Profil", "Vor der Auswahl verifizieren"],
      rows: calculation.rows,
    },
    checklist: [
      `Ausgangswert dokumentieren: ${calculation.input}.`,
      `Szenario festhalten: ${variant.focus}.`,
      cluster.measurement,
      `Rechnung mit eigenen Werten wiederholen: ${calculation.calculation}.`,
      variant.check,
      cluster.verification,
      `Ergebnis und offene Grenzen mit Datum speichern: ${calculation.result}.`,
    ],
    faqs: [
      {
        question: `Ist ${calculation.result} eine verbindliche Empfehlung?`,
        answer: `Nein. Das Ergebnis ist ein nachvollziehbarer Planungsrahmen aus den sichtbaren Eingaben dieses Profils. Es hilft, unpassende Größen früh auszusortieren. Verbindlich werden Maße, Leistung, Aufbau oder Einsatzbereich erst durch die Unterlagen des konkreten Produkts, die Bedingungen am Standort und gegebenenfalls eine fachliche Prüfung.`,
      },
      {
        question: "Warum gibt es für jede Kombination eine eigene Seite?",
        answer: `Weil ${scale.label} und der Schwerpunkt „${variant.focus}“ gemeinsam einen anderen Rechenweg, andere Rundungen und andere Prüfgrenzen erzeugen. Die Seite soll keine allgemeine Suchphrase wiederholen, sondern eine konkrete Rechenreferenz liefern, die direkt mit den eigenen Messwerten verglichen werden kann.`,
      },
      {
        question: "Welche Eingabe verändert das Ergebnis am stärksten?",
        answer: `Meist wirkt die Kombination aus gemessener Basisgröße und dem ausdrücklich ausgewiesenen Szenariofaktor am stärksten. In diesem Profil lautet die Basis ${calculation.input}; der Schwerpunkt ist ${variant.focus}. Ändere diese Werte einzeln und führe die Rundung erst am Ende aus, damit der Einfluss sichtbar bleibt.`,
      },
      {
        question: "Was muss ich vor einer Bestellung noch kontrollieren?",
        answer: `${cluster.verification} Kontrolliere außerdem Lieferumfang, verfügbare Ersatz- und Ergänzungsteile, Montagebedingungen und Rückgabemöglichkeiten. ${variant.check} ${cluster.limitation}`,
      },
    ],
    sources: [...cluster.sources],
    example: {
      title: `Rechenkette für ${scale.label} ${variant.label}`,
      intro: "Die folgenden Werte gehören zusammen und dürfen nicht unabhängig voneinander als Produktempfehlung interpretiert werden.",
      steps: [
        { label: "Eingabe", value: calculation.input },
        { label: "Rechnung", value: calculation.calculation },
        { label: "Gegenprobe", value: calculation.alternative },
      ],
      result: calculation.result,
      note: `Szenario: ${variant.focus}. ${cluster.limitation}`,
    },
    limitation: cluster.limitation,
    relatedLinks: [
      { label: `${cluster.directoryTitle}`, href: `/ratgeber/projekte/${cluster.topicSlug}/`, description: `Alle 85 konkreten Beispiele zu ${cluster.noun.toLowerCase()} vergleichen.` },
      { label: `${topic.name}: Themen-Hub`, href: `/ratgeber/thema/${cluster.topicSlug}/`, description: "Grundlagen, Vergleiche und weiterführende Ratgeber dieses Themenbereichs." },
      { label: topic.plannerLabel, href: topic.plannerHref, description: "Eigene Werte eingeben und den individuellen Planungsrahmen berechnen." },
      { label: "Methodik von PassendPlanen", href: "/methodik/", description: "Nachlesen, wie Annahmen, Grenzen und Produktdaten behandelt werden." },
    ],
  } satisfies ProjectExample;
}

const BASE_PROJECT_EXAMPLES: readonly ProjectExample[] = clusters.flatMap((cluster) =>
  cluster.variants.flatMap((variant) => cluster.scales.map((scale) => makeExample(cluster, scale, variant))),
);

export const PROJECT_EXAMPLES: readonly ProjectExample[] = BASE_PROJECT_EXAMPLES.map((example) => {
  const alternateScale = BASE_PROJECT_EXAMPLES.find((candidate) =>
    candidate.topicSlug === example.topicSlug
    && candidate.variantSlug === example.variantSlug
    && candidate.scaleSlug !== example.scaleSlug,
  );
  const alternateVariant = BASE_PROJECT_EXAMPLES.find((candidate) =>
    candidate.topicSlug === example.topicSlug
    && candidate.scaleSlug === example.scaleSlug
    && candidate.variantSlug !== example.variantSlug,
  );
  const siblingLinks = [alternateScale, alternateVariant]
    .filter((candidate): candidate is ProjectExample => Boolean(candidate))
    .map((candidate) => ({
      label: candidate.title,
      href: `/ratgeber/projekte/${candidate.topicSlug}/${candidate.slug}/`,
      description: candidate.scaleSlug === example.scaleSlug
        ? "Dasselbe Ausgangsmaß mit einem anderen Nutzungsschwerpunkt durchrechnen."
        : "Denselben Nutzungsschwerpunkt mit einer anderen Ausgangsgröße vergleichen.",
    }));

  return {
    ...example,
    relatedLinks: [...(example.relatedLinks ?? []), ...siblingLinks],
  };
});

export const PROJECT_EXAMPLE_DIRECTORIES: readonly ProjectExampleDirectory[] = clusters.map((cluster) => {
  const examples = PROJECT_EXAMPLES.filter((example) => example.topicSlug === cluster.topicSlug);
  return {
    topicSlug: cluster.topicSlug,
    title: cluster.directoryTitle,
    description: cluster.directoryDescription,
    intro: `${cluster.directoryDescription} Jede Seite dokumentiert eine konkrete Eingabe, eine Rechnung, eine Gegenprobe und die vor dem Kauf oder Bau noch zu prüfenden Grenzen.`,
    examples,
  };
});

export function getProjectExample(topicSlug: string, slug: string) {
  return PROJECT_EXAMPLES.find((example) => example.topicSlug === topicSlug && example.slug === slug);
}

export function getProjectExampleDirectory(topicSlug: string) {
  return PROJECT_EXAMPLE_DIRECTORIES.find((directory) => directory.topicSlug === topicSlug);
}

export function getProjectExamplesForVariant(topicSlug: string, variantSlug: string) {
  return PROJECT_EXAMPLES.filter((example) => example.topicSlug === topicSlug && example.variantSlug === variantSlug);
}

export const PROJECT_EXAMPLE_COUNT = PROJECT_EXAMPLES.length;
