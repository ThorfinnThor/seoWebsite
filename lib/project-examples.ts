import type { SeoGuide } from "@/lib/seo-guides";
import { GUIDE_SOURCE_LIBRARY, type GuideSource } from "@/lib/guide-enrichments";
import { editorializeGuide, editorializeText, sentenceEnd } from "@/lib/editorial-style";
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
  resultSentence: string;
  alternative: string;
  countercheck: string;
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
  application: string;
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
  directoryCard: {
    title: string;
    result: string;
    alternative: string;
    check: string;
    linkLabel: string;
  };
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
    calculation: `Das beispielhafte Innenmaß ${de(innerWidth, 2)} × ${de(innerLength, 2)} m ergibt ${de(inner)} m². Davon entfallen ${Math.round(variant.factor * 100)} % auf Funktions- und Stellfläche`,
    result: `eine rechnerisch freie Zugangs- und Bewegungsfläche von ${de(free)} m²`,
    resultSentence: `Rechnerisch bleibt eine freie Zugangs- und Bewegungsfläche von ${de(free)} m².`,
    alternative: `Bei nur ${Math.round(Math.max(.35, variant.factor - .12) * 100)} % Belegung blieben ${de(inner * (1 - Math.max(.35, variant.factor - .12)))} m² frei`,
    countercheck: `${de(inner * (1 - Math.max(.35, variant.factor - .12)))} m² frei bei ${Math.round(Math.max(.35, variant.factor - .12) * 100)} % Belegung`,
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
  const relaxedCandidate = Math.ceil(area * Math.max(1, variant.factor - .15) / 50) * 50;
  const relaxed = Math.max(Math.ceil(area / 50) * 50, Math.min(target - 50, relaxedCandidate));
  return {
    input: `${area} m² gemessene Netto-Rasenfläche`,
    calculation: `${area} m² werden mit dem Kapazitätsfaktor ${de(variant.factor, 2)} multipliziert. Der Wert wird auf die nächste 50-m²-Klasse aufgerundet`,
    result: `Modelle ab etwa ${target} m² Nennflächenrahmen prüfen`,
    resultSentence: `Für die Vorauswahl kommen Modelle ab etwa ${target} m² Nennflächenrahmen in Betracht.`,
    alternative: `Bei vereinfachter Geometrie ergäbe derselbe Ansatz etwa ${relaxed} m²`,
    countercheck: `etwa ${relaxed} m² bei vereinfachter Geometrie`,
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
    calculation: `${area} m² × Mengenfaktor ${de(variant.factor, 2)} ergeben ${de(orderArea)} m². Für die Laufmeter wird durch ${de(boardWidth * 1000, 0)} mm Deckbreite geteilt`,
    result: `${de(orderArea)} m² Bestellrahmen beziehungsweise rund ${de(runningMeters, 0)} laufende Dielenmeter`,
    resultSentence: `Der Bestellrahmen liegt bei ${de(orderArea)} m² beziehungsweise rund ${de(runningMeters, 0)} laufenden Dielenmetern.`,
    alternative: `Ohne den ausgewiesenen Zuschnitt wären es rechnerisch ${de(area / boardWidth, 0)} laufende Meter`,
    countercheck: `${de(area / boardWidth, 0)} laufende Meter ohne ausgewiesenen Zuschnitt`,
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
    calculation: `${area} m² × ${de(litersPerEvent)} l/m² ergeben im transparenten Rechenereignis ${de(liters, 0)} l. Die Zeitrechnung verwendet gemessene 15 l/min`,
    result: `${de(minutesAt15, 0)} Minuten theoretische Abgabezeit; mindestens ${timeBlocks} ${timeBlocks === 1 ? "Zeitblock" : "Zeitblöcke"} von höchstens 45 Minuten einplanen`,
    resultSentence: `Die theoretische Abgabezeit liegt bei ${de(minutesAt15, 0)} Minuten. Dafür sind mindestens ${timeBlocks} ${timeBlocks === 1 ? "Zeitblock" : "Zeitblöcke"} mit höchstens 45 Minuten einzuplanen.`,
    alternative: `Bei 20 l/min verkürzt sich die reine Abgabezeit rechnerisch auf ${de(liters / 20, 0)} Minuten`,
    countercheck: `${de(liters / 20, 0)} Minuten bei 20 l/min`,
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
    resultSentence: `Vor Profilen und Türbereich bleiben rechnerisch rund ${de(bed)} m² Beet- und Stellfläche.`,
    alternative: `Mit einem 10 cm schmaleren Weg wären es etwa ${de(total - (aisleWidth - .1) * length)} m²`,
    countercheck: `${de(total - (aisleWidth - .1) * length)} m² bei 10 cm schmalerem Weg`,
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
  const gateWidth = variant.slug.includes("tor") ? 1 : 0;
  const fenceLength = Math.max(0, length - gateWidth);
  const elements = Math.ceil(fenceLength / moduleWidth);
  const fields = elements + (gateWidth > 0 ? 1 : 0);
  const posts = fields + 1;
  const rest = elements * moduleWidth - fenceLength;
  const alternativeWidth = Math.abs(moduleWidth - 1.8) < .001 ? 1.75 : 1.8;
  const alternativeElements = Math.ceil(fenceLength / alternativeWidth);
  const alternativeRest = alternativeElements * alternativeWidth - fenceLength;
  const input = gateWidth > 0
    ? `${de(length)} m gemessene Sichtschutzflucht mit ${de(gateWidth, 2)} m angenommener Torlichte und ${de(fenceLength, 2)} m verfügbarer Zaunlänge`
    : `${de(length)} m gemessene Sichtschutzflucht`;
  const result = gateWidth > 0
    ? `${elements} Zaunelemente, ein Torfeld und mindestens ${posts} Pfosten als Rasterrahmen; ${de(rest, 2)} m rechnerisches Restmaß der Zaunelemente`
    : `${elements} Felder und mindestens ${posts} Pfosten als Rasterrahmen; ${de(rest, 2)} m rechnerisches Restmaß`;
  const resultSentence = gateWidth > 0
    ? `Nach Abzug von ${de(gateWidth, 2)} m Torlichte umfasst der Rasterrahmen ${elements} Zaunelemente, ein Torfeld und mindestens ${posts} Pfosten. Das rechnerische Restmaß der Zaunelemente beträgt ${de(rest, 2)} m.`
    : `Der Rasterrahmen umfasst ${elements} Felder und mindestens ${posts} Pfosten. Das rechnerische Restmaß beträgt ${de(rest, 2)} m.`;
  const alternative = gateWidth > 0
    ? `Nach Abzug von ${de(gateWidth, 2)} m Torlichte ergeben sich mit ${de(alternativeWidth, 2)} m Montagebreite ${alternativeElements} Zaunelemente und ${de(alternativeRest, 2)} m Restmaß`
    : `Mit ${de(alternativeWidth, 2)} m Montagebreite ergeben sich ${alternativeElements} Elemente und ${de(alternativeRest, 2)} m Restmaß vor Ecken und Toren`;
  return {
    input,
    calculation: `${de(fenceLength, 2)} m verfügbare Zaunlänge ÷ ${de(moduleWidth, 2)} m angenommene Montagebreite ergeben ${de(fenceLength / moduleWidth, 2)} Elemente. Die Elementzahl wird auf eine ganze Zahl aufgerundet`,
    result,
    resultSentence,
    alternative,
    countercheck: gateWidth > 0
      ? `${alternativeElements} Zaunelemente bei ${de(alternativeWidth, 2)} m Montagebreite plus ${de(gateWidth, 2)} m Tor`
      : `${alternativeElements} Elemente bei ${de(alternativeWidth, 2)} m Montagebreite`,
    rows: [
      ["Gemessene Flucht", `${de(length)} m`, "Zwischen festen Endpunkten messen"],
      ...(gateWidth > 0 ? [["Angenommene Torlichte", `${de(gateWidth, 2)} m`, "Reales Torsystem einsetzen"] as [string, string, string]] : []),
      ["Verfügbare Zaunlänge", `${de(fenceLength, 2)} m`, gateWidth > 0 ? "Gesamtflucht abzüglich Torlichte" : "Gesamte gemessene Flucht"],
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
    calculation: `${de(vehicleWidth, 2)} m Fahrzeugbreite werden um zweimal ${de(sideAllowance, 2)} m seitlichen Bedienraum ergänzt. Für die Länge kommt 1,00 m Funktionsreserve hinzu`,
    result: `Mindestens etwa ${de(lightWidth)} × ${de(lightLength)} m lichte Nutzungszone beziehungsweise ${de(area)} m²`,
    resultSentence: `Die lichte Nutzungszone sollte mindestens etwa ${de(lightWidth)} × ${de(lightLength)} m beziehungsweise ${de(area)} m² umfassen.`,
    alternative: `Mit 10 cm weniger je Seite sinkt die lichte Breite auf ${de(lightWidth - .2)} m, die Alltagstauglichkeit muss dann praktisch geprüft werden`,
    countercheck: `${de(lightWidth - .2)} m lichte Breite bei 10 cm weniger je Seite`,
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
    calculation: `${area} m² × Verschnittfaktor ${de(variant.factor, 2)} ergeben ${de(orderArea)} m². Für die Paketanzahl wird durch ${de(packageArea, 2)} m² je Beispielpaket geteilt`,
    result: `${packages} ganze Pakete beziehungsweise ${de(packages * packageArea)} m² Bestellmenge`,
    resultSentence: `Die Bestellmenge umfasst ${packages} ganze Pakete beziehungsweise ${de(packages * packageArea)} m².`,
    alternative: `Bei einem Produkt mit 2,50 m² je Paket wären ${Math.ceil(orderArea / 2.5)} Pakete nötig`,
    countercheck: `${Math.ceil(orderArea / 2.5)} Pakete bei 2,50 m² Paketinhalt`,
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
    resultSentence: `Der Plattenrahmen liegt bei ${de(grossBoardArea)} m² beziehungsweise etwa ${boards} Beispielplatten im Format 1,25 × 2,60 m.`,
    alternative: `Ohne den 10-%-Mengenfaktor wären rechnerisch ${Math.ceil(wallArea * 2 * layers / boardArea)} Beispielplatten nötig`,
    countercheck: `${Math.ceil(wallArea * 2 * layers / boardArea)} Beispielplatten ohne 10 % Mengenfaktor`,
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
    calculation: `${area} m² × ${de(height)} m ergeben ${de(volume)} m³ Raumvolumen. Der Auswahlpuffer beträgt ${de(margin, 2)}`,
    result: `Geräte mit dokumentierter Eignung für mindestens etwa ${target} m³ unter vergleichbaren Bedingungen prüfen`,
    resultSentence: `Für die Vorauswahl kommen Geräte mit dokumentierter Eignung für mindestens etwa ${target} m³ unter vergleichbaren Bedingungen in Betracht.`,
    alternative: `Ohne Zusatzlast läge der reine Volumenwert bei ${de(volume)} m³; das ersetzt keine Feuchtediagnose`,
    countercheck: `${de(volume)} m³ reines Raumvolumen ohne Zusatzlast`,
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
    topicSlug: "gartenhaus", noun: "Gartenhaus", directoryTitle: "Gartenhausgrößen für verschiedene Nutzungen",
    directoryDescription: "Die Beispiele übersetzen das Außenmaß in realistische Innenfläche, Stellfläche und Bewegungsraum für unterschiedliche Gartensituationen.",
    measurement: "Unterscheide Außenmaß, Sockelmaß und lichte Innenmaße. Zeichne Türöffnung, Regaltiefe und die Entnahmerichtung großer Gegenstände maßstäblich ein.",
    interpretation: "Die Rechnung zeigt, wie viel Fläche nach einem transparenten Belegungsansatz frei bleibt. Sie sagt nicht, dass jedes Haus mit demselben Nennmaß innen identisch groß ist.",
    verification: "Vergleiche das Ergebnis mit Maßzeichnung, Türlichte, Bodenlast, Dachüberstand, Fundamentplan und der am Standort geltenden Rechtslage.",
    limitation: "Das Beispiel ersetzt weder Produktmaßzeichnung noch Prüfung von Fundament, Statik, Grenzabstand oder Landes- und Ortsrecht.",
    application: "Übertrage die freie Fläche auf das reale Innenmaß, die Türlichte und den maßstäblichen Stellplan des konkreten Gartenhauses.",
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
    directoryDescription: "Die Flächenprofile reichen von 100 bis 5.000 Quadratmetern und berücksichtigen Gartenform, Hang, Passagen und getrennte Zonen.",
    measurement: "Ermittle ausschließlich die Netto-Rasenfläche und dokumentiere Steigung, engste Passage, getrennte Bereiche, hohe Hindernisdichte und den möglichen Platz der Ladestation.",
    interpretation: "Der Kapazitätsfaktor ist ein offengelegter PassendPlanen-Auswahlrahmen. Er bildet Planungserschwernisse ab, ist aber keine Zusage für tägliche Laufzeit oder vollständige Abdeckung.",
    verification: "Prüfe beim konkreten Modell Nennfläche, maximale Steigung, Mindestpassage, Navigation, erlaubte Zonen, Randabstände, Geräusch und Installationsanleitung gemeinsam.",
    limitation: "Herstellerwerte gelten unter definierten Bedingungen. Empfang, Traktion, Wachstum, Firmware und reale Mähzeit bleiben grundstücks- und modellabhängig.",
    application: "Vergleiche den Auswahlrahmen mit Nennfläche, erlaubter Mähzeit, Navigation, Passage und Steigung konkreter Geräte.",
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
    directoryDescription: "Die Bestellbeispiele verbinden Fläche, Material, Deckbreite und Zuschnitt zu einer nachvollziehbaren Projektmenge.",
    measurement: "Zerlege die Terrasse in vollständige Rechtecke, dokumentiere Aussparungen und lege die Verlegerichtung fest. Nutze die reale Deckbreite aus Diele plus vorgesehener Fuge.",
    interpretation: "Bestellfläche und Dielen-Laufmeter sind eine Mengenbasis. Lieferlängen, Stoßanordnung und Zuschnittplan entscheiden, ob diese Menge tatsächlich reicht.",
    verification: "Prüfe Lieferformat, Fugen, Auflagerabstände, doppelte Unterkonstruktion an Stößen, Befestigung, Randabschlüsse, Gefälle und Untergrund als vollständiges System.",
    limitation: "Die Mengenrechnung ist keine konstruktive Freigabe. Herstellerangaben und fachgerechter Aufbau haben Vorrang vor pauschalen Raster- oder Verschnittwerten.",
    application: "Runde die Menge auf lieferbare Dielenlängen und ergänze Unterkonstruktion, Befestigung, Randdetails sowie Stoßauflager separat.",
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
    directoryDescription: "Die Bewässerungsbeispiele für Rasen, Beete, Hecken und gemischte Gärten beginnen beim gemessenen Durchfluss des Anschlusses.",
    measurement: "Miss den Durchfluss direkt am späteren Anschluss und den Fließdruck unter Entnahme. Teile Rasen, Beet, Hecke und Hochbeet nach unterschiedlicher Abgabe und Laufzeit.",
    interpretation: "Die Liter je Quadratmeter sind hier ausdrücklich eine Rechenannahme für ein Ereignis, kein allgemeiner Pflanzenbedarf. Boden, Wetter, Wurzeltiefe und Niederschlag verändern die reale Bewässerung.",
    verification: "Vergleiche die rechnerische Gesamtmenge mit gemessenem Anschluss, zulässiger Stranglänge, Druckregler, Filter, Rückflussschutz, Regnerüberdeckung und Steuerungslogik.",
    limitation: "Das Beispiel ersetzt keine hydraulische Auslegung, Pflanzenberatung oder Prüfung des Trinkwasserschutzes. Ohne reale Messung bleibt die Zonierung vorläufig.",
    application: "Ordne den Zeitwert realen Ventilzonen zu und prüfe Durchfluss, Fließdruck, Leitungsweg sowie Abgabe jedes angeschlossenen Verbrauchers.",
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
    topicSlug: "gewaechshaus", noun: "Gewächshaus", directoryTitle: "Gewächshausgrößen und passende Kulturpläne",
    directoryDescription: "Siebzehn Größen treffen auf fünf Kulturprofile. Jedes Beispiel zeigt, wie Beetfläche, Wege und Arbeitshöhe zusammenwirken.",
    measurement: "Arbeite mit dem realen Innenmaß. Zeichne Tür, durchgehenden Weg, erreichbare Beettiefe, hohe Kulturen, Regale, Wasserstelle und Lüftungsflächen ein.",
    interpretation: "Die verbleibende Beet- und Stellfläche ist eine geometrische Orientierung. Profile, Streben, Türschwenkbereich, Tische und Technik reduzieren sie im konkreten System.",
    verification: "Prüfe Fundament, Verankerung, Tür, Dachlüftung, Zuluft, Beschattung, Bewässerung, maximale Pflanzenhöhe und Wind- beziehungsweise Schneelasten am konkreten Standort.",
    limitation: "Die Flächenaufteilung ersetzt weder Kulturplan noch Statik, Fundament- oder Montagefreigabe. Pflanzabstände hängen von Sorte, Erziehung und Klima ab.",
    application: "Vergleiche die verbleibende Beetfläche mit Innenmaß, Profilen, Türbereich, Lüftung, Arbeitshöhe und der geplanten Kulturführung.",
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
    topicSlug: "sichtschutz", noun: "Sichtschutz", directoryTitle: "Sichtschutzlängen und passende Feldaufteilung",
    directoryDescription: "Die Beispiele rechnen Elemente, Pfosten, Restfelder, Tore und Gefälle mit der tatsächlichen Montagebreite des Systems.",
    measurement: "Miss die Flucht zwischen festen Endpunkten, nicht entlang eines unklaren Geländeverlaufs. Markiere Ecken, Gefälle, Tor, Leitungen und unverrückbare Hindernisse.",
    interpretation: "Die Element- und Pfostenzahl ist ein Rasterrahmen. Pfostenbreite, Fugen, Halter, Eckausbildung und reale Montagebreite des Systems müssen anschließend eingesetzt werden.",
    verification: "Prüfe Grenzverlauf, zulässige Höhe, Windlast, Boden, Fundamente, Pfostenabstände, Korrosionsschutz, Torbeschläge und die Hersteller-Montagezeichnung.",
    limitation: "Die Rasterrechnung bemisst weder Windlast noch Pfosten oder Fundamente und entscheidet nicht über Grundstücksgrenze, Nachbarrecht oder örtlich zulässige Höhe.",
    application: "Übertrage Elementzahl und Restmaß auf die Montagebreite des gewählten Systems und plane Ecken, Enden, Tore sowie Pfosten gesondert.",
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
    topicSlug: "carport", noun: "Carport", directoryTitle: "Carportmaße passend zu Fahrzeug und Nutzung",
    directoryDescription: "Die Fahrzeugprofile verbinden lichte Breite und Länge mit Türöffnung, Fahrradzone, Wandabstand und Rangierraum.",
    measurement: "Miss das reale Fahrzeug einschließlich Spiegeln, Dachaufbauten und Heckträger. Zeichne geöffnete Türen, Pfosten, Wand, Einfahrt und die ungünstigste Rangierlinie ein.",
    interpretation: "Die lichte Zielzone ist kein Außen- oder Dachmaß. Pfosten, Rinne, Dachüberstand und Tragwerk liegen außerhalb oder innerhalb unterschiedlicher Herstellerangaben.",
    verification: "Prüfe Maßzeichnung, lichte Höhe, Pfostenposition, Zufahrt, Entwässerung, Wind- und Schneelast, Fundamente, Brandschutzabstände und Genehmigung am Standort.",
    limitation: "Das Beispiel ersetzt keine Tragwerks-, Fundament-, Entwässerungs- oder Genehmigungsplanung. Maßgeblich sind Fahrzeug, vollständiges System und örtliche Regeln.",
    application: "Prüfe die lichte Nutzungszone gegen Pfosten, Dachkante, Rinne, geöffnete Fahrzeugtüren und die tatsächliche Rangierlinie.",
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
    directoryDescription: "Die Raumbeispiele trennen Nettofläche, Verlegerichtung, Verschnitt und die Rundung auf vollständige Pakete.",
    measurement: "Zerlege L-Formen und verbundene Räume in eindeutige Teilflächen. Dokumentiere Nischen, feste Einbauten, Verlegerichtung und den Paketinhalt des gewählten Produkts.",
    interpretation: "Die Rechenmenge wird vor der Rundung auf ganze Pakete bestimmt. Ein Restpaket ist nicht automatisch Abfall, sondern kann für Reparatur und Musterabgleich sinnvoll sein.",
    verification: "Prüfe Restfeuchte, Ebenheit, Unterlage, Trittschall, Fußbodenheizungsfreigabe, Dehnfugen, Übergangsprofile, Sockelleisten und Lieferchargen als Gesamtsystem.",
    limitation: "Die Paketberechnung ist keine Verlegefreigabe. Untergrundprüfung, Herstellerangaben und vollständiger Bodenaufbau bleiben entscheidend.",
    application: "Runde die Bestellmenge mit dem echten Paketinhalt und ergänze Unterlage, Sockelleisten, Übergänge sowie Reparaturreserve getrennt.",
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
    topicSlug: "trockenbau", noun: "Trockenbauwand", directoryTitle: "Trockenbauwände mit nachvollziehbarer Materialmenge",
    directoryDescription: "Die Wandprofile verbinden Fläche, Wandseiten, Plattenlagen, Formate und Öffnungen zu einer prüfbaren Materialmenge.",
    measurement: "Miss Wandlänge und -höhe an mehreren Stellen. Erfasse jede Tür, Installation und geplante Last mit Position. Lege auf dieser Basis einen vollständigen freigegebenen Systemaufbau fest.",
    interpretation: "Die Plattenzahl ist ein Mengenrahmen aus Beispielplatten. Plattenformat, Fugenversatz, Öffnungen, Anschlüsse und zulässige Wandhöhe bestimmen den echten Verlegeplan.",
    verification: "Prüfe Profile, Raster, Plattentyp, Lagen, Schraubenabstände, Dämmung, Türständer, Verstärkungen sowie Schall- und Brandschutz im vollständigen Systemnachweis.",
    limitation: "Die Mengenrechnung ersetzt keine Systemfreigabe oder Fachplanung für tragende, Schall-, Brand- und andere sicherheitsrelevante Anforderungen.",
    application: "Übertrage den Plattenrahmen auf Format, Lagen, Fugenversatz und Zuschnittplan des vollständig freigegebenen Wandsystems.",
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
    directoryDescription: "Die Raumprofile übersetzen Fläche in Volumen und beziehen Temperatur, Nutzung, Ablauf und Geräusch in die Auswahl ein.",
    measurement: "Berechne das verbundene Raumvolumen und protokolliere Temperatur sowie relative Feuchte über mehrere Tage. Notiere Nutzung, Lüftung, Wasseranfall und erkennbare Feuchtequellen.",
    interpretation: "Der Volumenrahmen ist ein transparenter Filter, keine bauphysikalische Leistungsberechnung. Liter-pro-Tag-Angaben sind nur bei den zugehörigen Temperatur- und Feuchtebedingungen vergleichbar.",
    verification: "Prüfe Einsatztemperatur, dokumentierte Flächen- oder Volumeneignung, Entfeuchtungsleistung unter passenden Bedingungen, Hygrostat, Geräusch, Leistungsaufnahme und sicheren Dauerablauf.",
    limitation: "Ein Entfeuchter beseitigt keine Leckage, Wärmebrücke oder andere bauliche Ursache. Anhaltende Feuchte und Schimmel benötigen fachliche Ursachenklärung.",
    application: "Vergleiche den Volumenrahmen mit Leistung bei realer Temperatur, Hygrostat, Geräusch, Tank, Dauerablauf und dokumentierter Feuchtelast.",
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

function makeExample(
  cluster: ProjectCluster,
  scale: Scale,
  variant: Variant,
  clusterIndex: number,
  variantIndex: number,
  scaleIndex: number,
): ProjectExample {
  const topic = SEO_TOPICS.find((candidate) => candidate.slug === cluster.topicSlug);
  if (!topic) throw new Error(`Unbekannter SEO-Themenbereich: ${cluster.topicSlug}`);
  const calculation = cluster.calculate(scale, variant);
  const slug = `${cluster.topicSlug}-${scale.slug}-${variant.slug}`;
  const defaultSubject = `${cluster.noun} ${scale.label} ${variant.label}`;
  const profileLabel = `${scale.label} ${variant.label}`;
  const scopedMeasurement = `${sentenceEnd(cluster.measurement)} Für „${defaultSubject}“ wird die Messung mit dem dokumentierten Nutzungsschwerpunkt ausgewertet.`;
  const scopedInterpretation = `${sentenceEnd(cluster.interpretation)} Die Einordnung bezieht sich auf „${defaultSubject}“.`;
  const scopedVerification = `${sentenceEnd(cluster.verification)} Der Prüfumfang gilt für „${defaultSubject}“.`;
  const scopedLimitation = `${sentenceEnd(cluster.limitation)} Die fachliche Grenze bleibt bei „${defaultSubject}“ bestehen.`;
  const title = `${cluster.titleSubject?.(scale, variant) ?? defaultSubject}: konkretes Rechenbeispiel`;
  const path = `/ratgeber/projekte/${cluster.topicSlug}/${slug}/`;
  const voice = (scaleIndex + variantIndex * 2 + clusterIndex) % 3;
  const variedSections = voice === 0
    ? [
        { title: `${defaultSubject} im Alltag einordnen`, paragraphs: [`${calculation.input}. Der praktische Schwerpunkt lautet „${variant.focus}“. ${variant.check}`, `${scopedMeasurement} Eine Skizze mit Messdatum, Einheit und offenen Annahmen hält die Ausgangslage nachvollziehbar fest.`] },
        { title: `Rechenwert für ${defaultSubject}`, paragraphs: [`${sentenceEnd(calculation.calculation)} ${calculation.resultSentence} Der Wert ist ein Arbeitsrahmen und keine technische Freigabe.`, `${scopedInterpretation} ${cluster.application}`] },
        { title: `Gegenprobe für ${defaultSubject}`, paragraphs: [`${sentenceEnd(calculation.alternative)} In der Rechnung für ${defaultSubject} zeigt die Abweichung, wie empfindlich die Auswahl auf diese Annahme reagiert. Eine größere Lösung ist deshalb nicht automatisch vernünftiger.`, `Ändere nur eine Eingabe und vergleiche Platz, Zugang, Montage, Betrieb und Wartung mit dem neuen Ergebnis.`] },
        { title: `Technisch offene Punkte für ${defaultSubject}`, paragraphs: [`${scopedVerification} ${variant.check}`, `Die ungünstigste Stelle und der spätere Wartungsfall entscheiden über die Eignung. ${scopedLimitation}`] },
      ]
    : voice === 1
      ? [
          { title: `Wichtige Bedingungen für ${defaultSubject}`, paragraphs: [`${calculation.input}. Ausschlaggebend bleibt der Schwerpunkt „${variant.focus}“. ${variant.check}`, `${scopedMeasurement} Anschlüsse und freie Bereiche gehören ebenfalls in die Zeichnung.`] },
          { title: `Rechnung und Rundung für ${defaultSubject}`, paragraphs: [`${sentenceEnd(calculation.calculation)} ${calculation.resultSentence} Die Annahmen bleiben sichtbar und mit eigenen Werten wiederholbar.`, `${scopedInterpretation} ${cluster.application}`] },
          { title: `Alternative Rechnung für ${defaultSubject}`, paragraphs: [`${sentenceEnd(calculation.alternative)} Diese Alternative passt nur unter der genannten Bedingung. ${variant.check} ${scopedVerification}`, `Anschaffung, Vorbereitung, Montage, Nutzung und Reparatur gehören in einen gemeinsamen Vergleich. ${scopedLimitation}`] },
        ]
      : [
          { title: `Ausgangsmaß und Nutzung für ${defaultSubject}`, paragraphs: [`${calculation.input}. Der Schwerpunkt lautet „${variant.focus}“. ${variant.check}`, `${scopedMeasurement} Gemessene Werte und Schätzungen bleiben getrennt, damit die Beispielzahl nicht wie eine Zusage wirkt.`] },
          { title: `Auswahlrahmen für ${defaultSubject}`, paragraphs: [`${sentenceEnd(calculation.calculation)} ${calculation.resultSentence}`, `${scopedInterpretation} Die Rechnung beantwortet eine Vorplanungsfrage und keine Produktfreigabe.`] },
          { title: `Empfindliche Annahme in der Rechnung für ${defaultSubject}`, paragraphs: [`${sentenceEnd(calculation.alternative)} In der Rechnung für ${defaultSubject} wird daran sichtbar, welche Annahme Menge oder Auswahl verschiebt.`, `Beide Varianten werden mit denselben Anforderungen verglichen. Der Grund für den Puffer gehört sichtbar neben den Rechenwert.`] },
          { title: `Technische Grenzen für ${defaultSubject}`, paragraphs: [`${scopedVerification} ${variant.check}`, `Die spätere Bedienung gehört ebenfalls in die Prüfung. ${scopedLimitation}`] },
        ];
  const variedFaqs = voice === 0
    ? [
        { question: `Ist der Planungswert für ${scale.label} eine feste Empfehlung?`, answer: `Nein. Der Wert entsteht aus den sichtbaren Annahmen. ${scopedVerification}` },
        { question: `Welche Rolle spielt der Schwerpunkt „${variant.focus}“?`, answer: `${variant.check} Die Auswirkung lässt sich mit einer zweiten Rechnung prüfen. ${calculation.alternative}` },
        { question: `Was sollte vor der Bestellung verglichen werden?`, answer: `${scopedVerification} Vergleiche außerdem Lieferumfang, Montage, Wartung und Ersatzteile.` },
      ]
    : voice === 1
      ? [
          { question: `Wie wird der Wert für ${scale.label} berechnet?`, answer: `${sentenceEnd(calculation.calculation)} ${calculation.resultSentence} Der Rahmen muss mit dem konkreten Produkt und Standort abgeglichen werden.` },
          { question: `Lässt sich die Annahme auf andere Projekte übertragen?`, answer: `Das geht nur unter gleichbleibenden Voraussetzungen. ${scopedMeasurement} ${variant.check}` },
          { question: `Welche fachliche Grenze bleibt offen?`, answer: `${scopedVerification} ${scopedLimitation}` },
        ]
      : [
          { question: `Was zeigt dieses Beispiel für ${scale.label}?`, answer: `${calculation.input}. ${calculation.resultSentence} Die Rechnung bezieht den Schwerpunkt „${variant.focus}“ ein.` },
          { question: `Warum gehört eine Gegenprobe zur Rechnung?`, answer: `${sentenceEnd(calculation.alternative)} Damit wird sichtbar, wie empfindlich der Rahmen auf eine geänderte Annahme reagiert.` },
          { question: `Was muss am Standort geprüft werden?`, answer: `${scopedVerification} ${variant.check} ${scopedLimitation}` },
        ];
  const sectionsBeforeAdditions = [
    ...variedSections,
    ...(voice === 1
      ? [{
          title: `Unterlagen für ${defaultSubject} zusammenführen`,
          paragraphs: [
            `Speichere Messung, Rechenweg und Produktdaten gemeinsam. ${variant.check}`,
            `${scopedVerification} So bleibt nachvollziehbar, welche Annahme für ${scale.label} maßgeblich war.`,
          ],
        }]
      : []),
  ];
  const editorialAdditions = voice === 0
    ? [
        `Die Rechnung verwendet ${calculation.input}. Ein anderes Maß oder eine andere Nutzung verlangt eine vollständige neue Rechnung.`,
        `${sentenceEnd(calculation.alternative)} Die Abweichung zur Hauptrechnung zeigt, welche Annahme die Auswahl am stärksten verschiebt.`,
        `${scopedLimitation} ${variant.check}`,
        `Neben den reinen Maßangaben muss der Schwerpunkt „${variant.focus}“ im tatsächlichen Ablauf ausreichend berücksichtigt sein.`,
        `Vergleiche den für ${defaultSubject} ausgewiesenen Wert mit Lieferumfang, Montageweg und späterem Betrieb, bevor eine Systemgröße oder Paketanzahl feststeht.`,
        `Bewahre Hauptrechnung und Gegenprobe gemeinsam auf. So bleibt eine spätere Anpassung von Eingabe und Ergebnis nachvollziehbar.`,
        `Ein Foto, eine Skizze oder ein Messprotokoll ergänzt die Zahlen für ${defaultSubject} und beantwortet spätere Rückfragen zum Standort schneller.`,
      ]
    : voice === 1
      ? [
          `Der Planungswert für ${defaultSubject} beschreibt keine allgemeine Produktklasse. Ändern sich Maß, Zugang oder Nutzung, braucht der Rechenweg einen neuen Stand.`,
          `Für den späteren Ablauf zählt die Erreichbarkeit bei Reinigung, Nachjustierung und Reparatur. ${variant.check}`,
          `Bewahre Eingaben, Quelle und Rechenstand gemeinsam auf. ${scopedVerification}`,
          `Die Angabe ${calculation.input} beantwortet nur die erste Planungsfrage. Hinzu kommen die Bedingungen für Betrieb und Montage.`,
          `Ein Angebot für ${defaultSubject} passt nur, wenn der Schwerpunkt „${variant.focus}“ in den technischen Unterlagen abgedeckt ist. Eine fehlende Angabe gehört vor dem Kauf geklärt.`,
          `Der Planungswert neben der Gegenprobe macht sichtbar, wie viel Spielraum die Annahme wirklich lässt.`,
          `Messdatum und verwendete Einheit für ${defaultSubject} verhindern, dass alte Werte unbemerkt in eine neue Bestellung wandern.`,
        ]
      : [
          `Das Rechenbeispiel zu ${defaultSubject} macht eine Annahme sichtbar, die im Alltag leicht übersehen wird. Prüfe sie vor der Bestellung am eigenen Standort.`,
          `Die passende Größe ergibt sich nicht allein aus der Endzahl. Lieferumfang, Aufbau, Zugang und spätere Pflege gehören zur praktischen Prüfung.`,
          `${scopedLimitation} Veränderte Eingaben und ihre Auswirkungen werden in der nächsten Rechnung dokumentiert.`,
          `Der wichtigste Prüfpunkt liegt im Schwerpunkt „${variant.focus}“. Eine Maßangabe allein zeigt noch nicht, ob der geplante Ablauf funktioniert.`,
          `${calculation.resultSentence} Nutze diesen Wert als Ausgangspunkt für das Gespräch mit Händler oder Fachbetrieb. Die technische Unterlage muss die passende Leistung oder Menge erklären.`,
          `Wenn die eigene Eingabe von „${calculation.input}“ abweicht, beginnt der Vergleich mit den geänderten Werten neu. Eine einzelne Korrektur würde den Rechenweg verdecken.`,
          `Notiere für ${defaultSubject} auch die Entscheidung gegen naheliegende Alternativen. Diese Begründung hilft später bei geänderten Rahmenbedingungen oder Preisen.`,
        ];
  const finalSections = sectionsBeforeAdditions.map((section, index) => ({
    ...section,
    paragraphs: (index === sectionsBeforeAdditions.length - 1
      ? [...section.paragraphs, ...editorialAdditions]
      : section.paragraphs).reduce<string[][]>((groups, paragraph, paragraphIndex) => {
        if (paragraphIndex % 2 === 0) groups.push([paragraph]);
        else groups[groups.length - 1].push(paragraph);
        return groups;
      }, []).map((paragraphs) => paragraphs.join(" ")),
  }));
  const finalFaqs = variedFaqs.length >= 4
    ? variedFaqs
    : [...variedFaqs, { question: `Wie dokumentiere ich das Ergebnis für ${scale.label}?`, answer: `Halte Eingabe, Rechnung, Gegenprobe und offene Grenzen gemeinsam fest. ${scopedVerification}` }];
  const contextualFaqs = finalFaqs.map((faq) => ({
    ...faq,
    answer: sentenceEnd(faq.answer),
  }));
  const projectIntros = [
    `Das Maß ${scale.label} verbindet in diesem Beispiel die Eingabe mit dem Rechenweg und den noch offenen Standortfragen. Eigene Messwerte lassen sich direkt neben die Annahme zum Schwerpunkt „${variant.focus}“ stellen.`,
    `Dieses Beispiel ordnet „${profileLabel}“ als konkreten Planungsfall ein. Maß, Nutzung und technische Prüfung bleiben getrennt sichtbar, damit die Endzahl nicht für eine Produktzusage gehalten wird.`,
    `Der Planungsfall „${profileLabel}“ beginnt mit einer nachvollziehbaren Eingabe. Der Rechenweg zeigt, wie sich der Schwerpunkt „${variant.focus}“ auf Mengenrahmen oder Auswahl auswirkt.`,
    `Im Mittelpunkt stehen ${scale.label} und die Frage, wie der Schwerpunkt „${variant.focus}“ praktisch berücksichtigt wird. Die Rechnung lässt sich mit eigenen Daten wiederholen und macht offene Produktangaben sichtbar.`,
    `${scale.label} allein reichen für eine belastbare Auswahl nicht aus. Dieses Beispiel ergänzt den Nutzungsschwerpunkt, die Gegenprobe und die technischen Grenzen des konkreten Projekts.`,
    `Der Rechenfall „${profileLabel}“ zeigt nicht nur einen Endwert. Er verbindet Messung, Gegenrechnung und die Prüfung, ob das Ergebnis unter realen Bedingungen tragfähig bleibt.`,
  ];
  const projectIntro = projectIntros[(scaleIndex + variantIndex + clusterIndex) % projectIntros.length];
  const projectTakeaway = voice === 0
    ? `${calculation.resultSentence} ${variant.check}`
    : `${variant.check} ${calculation.resultSentence}`;
  const projectChecklist = voice === 0
    ? [
        `Messwerte für ${scale.label} festhalten. Die Rechnung verwendet „${calculation.input}“.`,
        `Den Nutzungsschwerpunkt „${variant.focus}“ dokumentieren.`,
        scopedMeasurement,
        `Den Rechenschritt mit eigenen Werten nachvollziehen. ${sentenceEnd(calculation.calculation)}`,
        `Eine Gegenprobe für ${defaultSubject} mit einer abweichenden Annahme berechnen.`,
        variant.check,
        scopedVerification,
        `Ergebnis und offene Grenzen speichern. ${calculation.resultSentence}`,
      ]
    : voice === 1
      ? [
          `Die Ausgangslage für ${scale.label} aufnehmen. Die Rechnung beginnt mit „${calculation.input}“.`,
          scopedMeasurement,
          `Rechenweg und Gegenprobe für ${defaultSubject} getrennt notieren. ${sentenceEnd(calculation.calculation)}`,
          `Die technische Bedingung abgleichen. ${variant.check}`,
          `Zugang, Montage und spätere Wartung für ${defaultSubject} mitplanen.`,
          scopedVerification,
          `Offene Annahmen mit Datum sichern. ${calculation.resultSentence}`,
        ]
      : [
          `Standort und Maß für ${scale.label} erfassen. Die Rechnung verwendet „${calculation.input}“.`,
          `Den praktischen Schwerpunkt „${variant.focus}“ prüfen.`,
          `Messung und Einheit mit Datum ergänzen. ${scopedMeasurement}`,
          `Die Rechnung an den eigenen Werten durchspielen. ${sentenceEnd(calculation.calculation)}`,
          `Eine alternative Annahme für ${defaultSubject} als Gegenprobe danebenlegen.`,
          variant.check,
          `${scopedVerification} Offene Angaben nicht stillschweigend ergänzen.`,
          `Den Planungsstand für später sichern. ${calculation.resultSentence}`,
        ];
  const projectExampleIntro = voice === 0
    ? `Die Rechenkette verbindet Eingabe, Ergebnis und Gegenprobe für ${scale.label}. Sie dient als Arbeitsblatt mit eigenen Werten.`
    : voice === 1
      ? `Die drei Rechenschritte gehören zusammen. Übertrage sie für ${scale.label} nur mit passenden Maßen und Einheiten.`
      : `An diesem Beispiel lässt sich nachvollziehen, wie der Planungsrahmen entsteht. Der Wert bleibt an den Schwerpunkt „${variant.focus}“ gebunden.`;
  const base = {
    topicSlug: cluster.topicSlug,
    variantSlug: variant.slug,
    variantLabel: variant.label,
    scaleSlug: scale.slug,
    qualitySignature: `${cluster.topicSlug}|${scale.values.join("x")}|${variant.slug}|${calculation.result}`,
    directoryCard: {
      title: editorializeText(cluster.titleSubject?.(scale, variant) ?? defaultSubject),
      result: editorializeText(calculation.result),
      alternative: editorializeText(calculation.countercheck),
      check: editorializeText(variant.check),
      linkLabel: "Rechnung ansehen",
    },
    slug,
    title,
    description: `${defaultSubject} planen: Eingaben, Rechenweg, Ergebnis, Alternative, Checkliste und Grenzen für den deutschen Markt.`,
    heading: title,
    intro: projectIntro,
    takeaway: projectTakeaway,
    plannerHref: topic.plannerHref,
    plannerLabel: topic.plannerLabel,
    sections: finalSections,
    comparison: {
      caption: `${cluster.noun} ${scale.label}: Ergebnis und Gegenprobe`,
      columns: ["Prüfpunkt", "Dieser Rechenfall", "Vor der Auswahl verifizieren"],
      rows: calculation.rows,
    },
    checklist: projectChecklist,
    faqs: contextualFaqs,
    sources: [...cluster.sources],
    example: {
      title: `Rechenkette für ${scale.label} ${variant.label}`,
      intro: projectExampleIntro,
      steps: [
        { label: "Eingabe", value: calculation.input },
        { label: "Rechnung", value: calculation.calculation },
        { label: "Gegenprobe", value: calculation.alternative },
      ],
      result: calculation.result,
      note: `Der Schwerpunkt liegt auf „${variant.focus}“. ${scopedLimitation}`,
    },
    limitation: scopedLimitation,
    relatedLinks: [
      { label: `${cluster.directoryTitle}`, href: `/ratgeber/projekte/${cluster.topicSlug}/`, description: `Alle 85 konkreten Beispiele im Bereich ${cluster.noun} vergleichen.` },
      { label: `${topic.name}: Themen-Hub`, href: `/ratgeber/thema/${cluster.topicSlug}/`, description: "Grundlagen, Vergleiche und weiterführende Ratgeber dieses Themenbereichs." },
      { label: topic.plannerLabel, href: topic.plannerHref, description: "Eigene Werte eingeben und den individuellen Planungsrahmen berechnen." },
      { label: "Methodik von PassendPlanen", href: "/methodik/", description: "Nachlesen, wie Annahmen, Grenzen und Produktdaten behandelt werden." },
    ],
  } satisfies ProjectExample;
  return base;
}

const BASE_PROJECT_EXAMPLES: readonly ProjectExample[] = clusters.flatMap((cluster, clusterIndex) =>
  cluster.variants.flatMap((variant, variantIndex) =>
    cluster.scales.map((scale, scaleIndex) => makeExample(cluster, scale, variant, clusterIndex, variantIndex, scaleIndex)),
  ),
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

  return editorializeGuide({
    ...example,
    relatedLinks: [...(example.relatedLinks ?? []), ...siblingLinks],
  });
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
