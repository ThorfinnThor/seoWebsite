import { calculateCarportPlan } from "@/lib/carport/rules";
import type { CarportInput } from "@/lib/carport/types";
import { carportProjectReport, drywallProjectReport, terraceProjectReport } from "@/lib/data-report/project-catalog-insights";
import { calculateDrywallPlan } from "@/lib/drywall/rules";
import type { DrywallInput } from "@/lib/drywall/types";
import type { PlannerId } from "@/lib/planners";
import { calculateTerracePlan } from "@/lib/terrace/rules";
import type { TerraceInput } from "@/lib/terrace/types";

/**
 * Editorial explanation blocks shown below a calculator. Every number in the
 * worked examples is produced by the same rule function the calculator uses;
 * catalog figures come from the reviewed project catalog insights.
 */
export type PlannerGuideTable = {
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
};

export type PlannerGuideSection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  table?: PlannerGuideTable;
  links?: readonly { href: string; label: string }[];
};

export type PlannerGuideContent = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly PlannerGuideSection[];
  note: string;
};

const number = (value: number | undefined, digits = 2) =>
  value === undefined ? "k. A." : value.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: digits });
const euro = (value: number | undefined) =>
  value === undefined ? "k. A." : `${value.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
const roundEuro = (value: number | undefined) =>
  value === undefined ? "k. A." : `${Math.round(value).toLocaleString("de-DE")} €`;

/* Trockenbau: identical to the calculator's start values. */
export const DRYWALL_EXAMPLE_INPUT: DrywallInput = {
  wallLengthM: 5,
  wallHeightM: 2.5,
  openingsAreaM2: 2,
  openingCount: 1,
  claddingSides: 2,
  layersPerSide: 1,
  boardLengthM: 2.5,
  boardWidthM: 1.25,
  wastePercent: 10,
  studSpacingCm: 62.5,
  trackBarLengthM: 3,
  includeInsulation: true,
  moistureExposure: false,
  fireOrAcousticRequirement: false,
  installationsPlanned: false,
};
const drywall = calculateDrywallPlan(DRYWALL_EXAMPLE_INPUT);
const drywallDouble = calculateDrywallPlan({ ...DRYWALL_EXAMPLE_INPUT, layersPerSide: 2 });
const acousticBoards = drywallProjectReport.boardTypes.find((group) => group.key === "fire-acoustic");

/* Terrasse: identical to the calculator's start values. */
export const TERRACE_EXAMPLE_INPUT: TerraceInput = {
  terraceLengthM: 5,
  terraceWidthM: 4,
  layingDirection: "length",
  boardWidthMm: 145,
  boardGapMm: 5,
  boardLengthM: 3,
  wastePercent: 10,
  maxSupportSpacingCm: 40,
};
const terrace = calculateTerracePlan(TERRACE_EXAMPLE_INPUT);
const terraceLong = calculateTerracePlan({ ...TERRACE_EXAMPLE_INPUT, boardLengthM: 4 });
const terraceWood = terraceProjectReport.materials.find((group) => group.key === "wood");
const terraceWpc = terraceProjectReport.materials.find((group) => group.key === "wpc");

/* Carport: identical to the calculator's start values. */
export const CARPORT_EXAMPLE_INPUT: CarportInput = {
  vehicleCount: 1,
  vehicleLengthM: 4.8,
  vehicleWidthM: 1.9,
  vehicleHeightM: 1.75,
  sideClearanceCm: 60,
  frontClearanceCm: 60,
  rearClearanceCm: 80,
  verticalClearanceCm: 30,
  storageDepthM: 0,
  approach: "straight",
  roofType: "flat",
  installation: "freestanding",
  siteSlope: "level",
  drainage: "cistern",
  electricityPlanned: false,
  evCharging: false,
  pvPlanned: false,
};
const carport = calculateCarportPlan(CARPORT_EXAMPLE_INPUT);
const carportDouble = calculateCarportPlan({ ...CARPORT_EXAMPLE_INPUT, vehicleCount: 2 });
const singleKits = carportProjectReport.vehicleGroups.find((group) => group.vehicleCount === 1);
const doubleKits = carportProjectReport.vehicleGroups.find((group) => group.vehicleCount === 2);

export const PLANNER_GUIDES: Partial<Record<PlannerId, PlannerGuideContent>> = {
  drywall: {
    eyebrow: "Kalkulationshilfe Trockenbau",
    title: "So funktioniert die Kalkulation einer Trockenbauwand.",
    intro: "Eine Trockenbau-Kalkulation beginnt nicht beim Preis, sondern bei der Menge. Der Rechner trennt die Positionen, die sich aus Fläche und Raster sicher ableiten lassen, von denen, die nur das gewählte Wandsystem festlegt.",
    sections: [
      {
        title: "1. Fläche, Seiten, Lagen und Verschnitt",
        paragraphs: [
          "Wandlänge mal Wandhöhe ergibt die Bruttofläche einer Wandseite. Davon wird die Fläche von Türen und Fenstern abgezogen. Die Nettofläche wird mit der Zahl der bekleideten Seiten und der Plattenlagen je Seite multipliziert. Auf diese Bekleidungsfläche kommt eine Zuschnittreserve von 10 oder 15 Prozent.",
          `Im Startbeispiel des Rechners ist die Wand ${number(DRYWALL_EXAMPLE_INPUT.wallLengthM)} m lang und ${number(DRYWALL_EXAMPLE_INPUT.wallHeightM)} m hoch, eine Tür nimmt ${number(DRYWALL_EXAMPLE_INPUT.openingsAreaM2)} m² ein. Daraus entstehen ${number(drywall.netFaceAreaM2)} m² Nettofläche je Seite, beidseitig einlagig ${number(drywall.totalCladdingAreaM2)} m² Bekleidung und mit 10 Prozent Reserve ${number(drywall.purchaseAreaM2)} m² Bestellfläche.`,
        ],
      },
      {
        title: "2. Plattenbedarf auf volle Platten runden",
        paragraphs: [
          `Die Bestellfläche wird durch die Fläche einer Platte geteilt und immer aufgerundet. Bei ${number(DRYWALL_EXAMPLE_INPUT.boardLengthM)} × ${number(DRYWALL_EXAMPLE_INPUT.boardWidthM)} m hat eine Platte ${number(drywall.boardAreaM2, 3)} m². Für das Beispiel ergibt das ${drywall.boardCount} Platten. Mit zwei Lagen je Seite verdoppelt sich die Bekleidung auf ${number(drywallDouble.totalCladdingAreaM2)} m² und der Bedarf steigt auf ${drywallDouble.boardCount} Platten.`,
          "Ob Platten stehend oder liegend verlegt werden, wie Stöße versetzt werden und welche Reststücke wiederverwendbar sind, folgt dem Verlegeplan des Systems. Bei vielen Öffnungen kann eine Reserve von 15 Prozent realistischer sein, weil mehr Randzuschnitte entstehen.",
        ],
      },
      {
        title: "3. Ständerwerk aus CW- und UW-Profilen",
        paragraphs: [
          `CW-Profile bilden die senkrechten Ständer, UW-Profile laufen an Boden und Decke. Der Rechner setzt die Ständer im gewählten Achsabstand von 40, 50 oder 62,5 cm und ergänzt einen Endständer. Bei ${number(DRYWALL_EXAMPLE_INPUT.wallLengthM)} m Wandlänge und ${number(DRYWALL_EXAMPLE_INPUT.studSpacingCm, 1)} cm Raster entstehen ${drywall.baselineStudCount} Grundständer.`,
          `Für Boden und Decke rechnet der Rechner die doppelte Wandlänge plus 10 Prozent Reserve, im Beispiel ${number(drywall.trackLengthWithReserveM, 1)} m. Bei ${number(DRYWALL_EXAMPLE_INPUT.trackBarLengthM)} m langen Stäben sind das ${drywall.trackBarCount} UW-Profile. Türständer, Sturzprofile, Wandanschlüsse und Verstärkungen für Lasten kommen als eigene Positionen hinzu.`,
        ],
        links: [{ href: "/haus/innenausbau/trockenbau-profile-staenderwerk/", label: "CW- und UW-Profile im Detail" }],
      },
      {
        title: "4. Dämmung, Schrauben, Spachtel und Kleinmaterial",
        paragraphs: [
          `Wenn Dämmung aktiviert ist, nennt der Rechner die Hohlraumfläche einer Wandseite, im Beispiel ${number(drywall.insulationAreaM2)} m². Dicke und Rohdichte der Mineralwolle hängen vom Profil und vom geforderten Schall- oder Brandschutz ab.`,
          "Schnellbauschrauben, Dübel, Anschlussdichtung, Fugenspachtel, Bewehrungsstreifen und Kantenschutz rechnet der Rechner bewusst nicht pauschal aus Quadratmetern. Die richtigen Mengen und Abstände stehen im Verarbeitungsblatt des gewählten Systems. Plane diese Positionen trotzdem in der Kalkulation ein, damit die Materialliste vollständig ist.",
        ],
        bullets: [
          "Schraubenlänge und Abstand nach Plattentyp und Lagenzahl",
          "Dichtband an Boden, Decke und angrenzenden Wänden",
          "Spachtel und Fugenband für alle Stöße und Ecken",
          "Eckschutz an Außenecken und Öffnungen",
        ],
      },
      {
        title: "5. Kosten pro m² selbst kalkulieren",
        paragraphs: [
          "Für eine eigene Kostenschätzung multiplizierst du jede Position mit dem Preis deines Händlers. Platten mal Plattenpreis, CW- und UW-Stäbe mal Stabpreis, Dämmfläche mal Preis je Quadratmeter und eine Position für Kleinmaterial. Die Summe geteilt durch die Netto-Wandfläche ergibt deinen Materialpreis pro m² Wand.",
          `Zur Orientierung zeigt unser geprüfter Katalog mittlere Artikelpreise je Plattentyp. Die Werte stammen aus ${drywallProjectReport.boards.count} Platten mit Datenstand ${drywallProjectReport.updatedLabel}. Verkaufseinheiten unterscheiden sich, deshalb ist daraus kein verlässlicher Quadratmeterpreis ableitbar.`,
        ],
        table: {
          caption: "Mittlere Artikelpreise je Plattentyp im PassendPlanen-Katalog",
          columns: ["Plattentyp", "Produkte", "Mittlere Dicke", "Mittlerer Artikelpreis"],
          rows: drywallProjectReport.boardTypes.map((group) => [group.label, String(group.count), `${number(group.medianThicknessMm, 1)} mm`, euro(group.medianPriceEur)]),
        },
        links: [{ href: "/ratgeber/daten/trockenbauplatten-typen-dicken/", label: "Datenauswertung Trockenbauplatten" }],
      },
      {
        title: "6. Material selbst kaufen oder Handwerker beauftragen",
        paragraphs: [
          "Der Rechner kalkuliert Material, keine Arbeitszeit. Für einen Vergleich mit einem Angebot hilft es, wenn der Betrieb Material und Leistung getrennt ausweist. Dann lässt sich prüfen, ob Plattenlagen, Profilbreite, Dämmung und Spachtelstufe zu deiner Planung passen.",
          "Bei Schallschutz, Brandschutz, Feuchträumen, Lasten an der Wand oder Installationen im Hohlraum lohnt sich eine Fachplanung besonders. Diese Anforderungen verändern das System und damit Material und Aufwand.",
        ],
      },
      {
        title: "Schallschutz-Platten im Trockenbau",
        paragraphs: [
          `Brand- und Schallschutzplatten haben im Katalog die größte mittlere dokumentierte Dicke, sie liegt bei ${number(acousticBoards?.medianThicknessMm, 1)} mm. Eine solche Platte allein garantiert aber keinen Schallschutzwert. Entscheidend ist der geprüfte Gesamtaufbau aus Profilen, Dämmung, Plattenlagen und Anschlüssen.`,
          "Für den Rechner bedeutet das, die Lagenzahl und das Plattenformat des gewählten Schallschutzsystems einzutragen und die Option für Brand- oder Schallschutz zu aktivieren. Die Mengen bleiben dann nachvollziehbar, die akustische Leistung steht im Systemnachweis.",
        ],
        bullets: [
          "Doppelte Beplankung erhöht die Masse und die Plattenmenge",
          "Dämmung im Hohlraum gehört zum geprüften Aufbau",
          "Elastische, dichte Randanschlüsse verhindern Schallbrücken",
          "Gegenüberliegende Steckdosen und Leitungen schwächen die Wand",
        ],
        links: [
          { href: "/ratgeber/trockenbau-schallschutzwand/", label: "Trockenbau-Schallschutzwand planen" },
          { href: "/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/", label: "Einfach oder doppelt beplankt" },
        ],
      },
    ],
    note: "Alle Rechenwerte oben entstehen mit derselben Rechenlogik wie der Rechner und seinen Startwerten. Freigaben für Statik, Schall-, Brand- und Feuchteschutz gibt nur das vollständige Herstellersystem.",
  },
  terrace: {
    eyebrow: "So rechnet der Terrassendielen-Rechner",
    title: "Vom Terrassenmaß zur Dielenanzahl.",
    intro: "Der Dielenbedarf hängt an Reihen und Laufmetern, nicht nur an Quadratmetern. Erst Dielenbreite, Fuge und Lieferlänge machen aus der Fläche eine bestellbare Stückzahl.",
    sections: [
      {
        title: "1. Reihen aus Dielenbreite und Fuge",
        paragraphs: [
          `Die Breite quer zur Verlegerichtung wird durch das Verlegemaß aus Dielenbreite plus Fuge geteilt und aufgerundet. Im Startbeispiel mit ${number(TERRACE_EXAMPLE_INPUT.terraceLengthM)} × ${number(TERRACE_EXAMPLE_INPUT.terraceWidthM)} m, ${TERRACE_EXAMPLE_INPUT.boardWidthMm} mm Dielen und ${TERRACE_EXAMPLE_INPUT.boardGapMm} mm Fuge entstehen ${terrace.courseCount} Reihen.`,
          `Die letzte Reihe wird meist angepasst. Der Rechner zeigt dafür den Überstand, im Beispiel ${terrace.edgeAdjustmentMm} mm, damit Randzuschnitt und Abschlussprofil früh geplant werden.`,
        ],
      },
      {
        title: "2. Laufmeter, Verschnitt und Lieferlänge",
        paragraphs: [
          `Reihen mal Lauflänge ergeben die Laufmeter, im Beispiel ${number(terrace.deckingLinearM, 1)} m. Mit 10 Prozent Verschnitt werden daraus ${number(terrace.deckingLinearMWithWaste, 1)} m. Geteilt durch die Lieferlänge von ${number(TERRACE_EXAMPLE_INPUT.boardLengthM)} m ergibt das ${terrace.fullBoardsToBuy} Dielen.`,
          `Ist die Lieferlänge kürzer als die Terrasse, braucht jede Reihe Stöße, im Beispiel mindestens ${terrace.minimumJointsPerCourse} je Reihe. Mit ${number(4)} m langen Dielen wären es ${terraceLong.minimumJointsPerCourse} Stöße und ${terraceLong.fullBoardsToBuy} Dielen. Stöße brauchen immer eine passende Auflagerung.`,
        ],
        links: [{ href: "/garten/terrassendielen-verschnitt-fugen/", label: "Verschnitt und Fugen vertiefen" }],
      },
      {
        title: "3. Unterkonstruktion und Befestigungspunkte",
        paragraphs: [
          `Die Unterkonstruktion läuft quer zu den Dielen. Der Rechner teilt die Lauflänge durch den maximalen Auflagerabstand des Herstellers und ergänzt eine Endreihe. Mit ${TERRACE_EXAMPLE_INPUT.maxSupportSpacingCm} cm Abstand entstehen ${terrace.supportRowCount} Reihen und mit Reserve rund ${number(terrace.supportLinearMWithWaste, 1)} m Unterkonstruktion.`,
          `Jede Kreuzung aus Diele und Auflager ist ein Befestigungspunkt, im Beispiel ${terrace.fixingIntersections}. Ob dort Schrauben oder Clips sitzen und wie viele pro Punkt, legt das Befestigungssystem fest.`,
        ],
        links: [{ href: "/garten/terrasse-unterkonstruktion/", label: "Unterkonstruktion planen" }],
      },
      {
        title: "Dielenmaße aus dem geprüften Katalog",
        paragraphs: [
          `Die Startwerte des Rechners entsprechen typischen Katalogmaßen. Im PassendPlanen-Katalog mit ${terraceProjectReport.decking.count} Dielen liegt die mittlere Breite bei ${number(terraceProjectReport.decking.medianWidthMm, 0)} mm und die mittlere Länge bei ${number(terraceProjectReport.decking.medianLengthMm, 0)} mm. Trag immer die Maße deines konkreten Produkts ein.`,
        ],
        table: {
          caption: "Mittlere dokumentierte Dielenmaße nach Material",
          columns: ["Material", "Produkte", "Länge", "Breite", "Dicke"],
          rows: [terraceWood, terraceWpc].filter((group) => group !== undefined).map((group) => [group.label, String(group.count), `${number(group.medianLengthMm, 0)} mm`, `${number(group.medianWidthMm, 0)} mm`, `${number(group.medianThicknessMm, 1)} mm`]),
        },
        links: [
          { href: "/ratgeber/daten/terrassendielen-holz-wpc-abmessungen/", label: "Datenauswertung Holz und WPC" },
          { href: "/ratgeber/terrassendielen-wpc-oder-holz/", label: "WPC oder Holz vergleichen" },
        ],
      },
      {
        title: "Kosten der Terrasse vorbereiten",
        paragraphs: [
          "Mit Stückzahlen und Laufmetern lassen sich Angebote sauber vergleichen. Dielen, Unterkonstruktion, Befestigung, Lager und Randprofile werden einzeln mit dem Händlerpreis multipliziert. Ein pauschaler Quadratmeterpreis ist ohne gleiche Verkaufseinheiten nicht belastbar, das zeigt auch unsere Katalogauswertung.",
        ],
        links: [
          { href: "/garten/terrasse-kosten/", label: "Terrassen-Kosten planen" },
          { href: "/ratgeber/daten/terrasse-systemteile-preisvergleich/", label: "Systemteile im Preisvergleich" },
        ],
      },
    ],
    note: "Alle Beispielwerte entstehen mit derselben Rechenlogik wie der Rechner. Herstellerangaben zu Abständen, Fugen und Befestigung haben immer Vorrang.",
  },
  carport: {
    eyebrow: "So plant der Carport-Planer",
    title: "Vom Fahrzeugmaß zum lichten Carport-Maß.",
    intro: "Ein Carport passt, wenn zwischen Pfosten und unter dem Dach genug Raum bleibt. Der Planer rechnet deshalb vom Fahrzeug nach außen und trennt lichte Maße von den Außenmaßen eines Bausatzes.",
    sections: [
      {
        title: "1. Lichte Breite aus Fahrzeug und Türraum",
        paragraphs: [
          `Die lichte Breite ist die Fahrzeugbreite plus der seitliche Bewegungsraum an jedem Rand und zwischen den Fahrzeugen. Ein ${number(CARPORT_EXAMPLE_INPUT.vehicleWidthM)} m breites Auto mit je ${CARPORT_EXAMPLE_INPUT.sideClearanceCm} cm Türraum braucht ${number(carport.clearWidthM)} m. Für zwei gleiche Fahrzeuge im Doppelcarport sind es ${number(carportDouble.clearWidthM)} m.`,
        ],
      },
      {
        title: "2. Länge und Höhe mit Reserve",
        paragraphs: [
          `Zur Fahrzeuglänge kommen Reserven vorn und hinten sowie optional Stauraum. Im Beispiel ergibt ein ${number(CARPORT_EXAMPLE_INPUT.vehicleLengthM)} m langes Auto ${number(carport.clearLengthM)} m lichte Länge. Die lichte Höhe ist Fahrzeughöhe plus Höhenreserve, hier ${number(carport.clearHeightM)} m. Dachbox, Antenne und geöffnete Heckklappe gehören in diese Reserve.`,
          `Die Planungsfläche im Beispiel beträgt ${number(carport.coveredPlanningAreaM2)} m². Bei 10 mm Niederschlag fallen darauf rechnerisch ${carport.theoreticalRainwaterPer10MmL} Liter Wasser, die Rinne, Fallrohr und Ablaufziel aufnehmen müssen.`,
        ],
        links: [
          { href: "/garten/carport-groesse/", label: "Carport-Größe planen" },
          { href: "/garten/carport-dachentwaesserung/", label: "Dachentwässerung planen" },
        ],
      },
      {
        title: "Lichte Maße und Bausatzmaße vergleichen",
        paragraphs: [
          "Hersteller nennen meist Außenmaße oder Dachmaße. Pfosten, Kopfbänder, Rinne und Dachüberstand verringern den nutzbaren Raum. Vergleiche deshalb die lichten Zielmaße aus dem Planer mit der lichten Durchfahrtsbreite und dem Pfostenabstand im Datenblatt.",
          "Zur Einordnung zeigt unser geprüfter Katalog die mittleren dokumentierten Außenmaße und Angebotspreise der Bausätze. Ob Lieferung, Montage oder Fundament enthalten sind, unterscheidet sich je Angebot.",
        ],
        table: {
          caption: "Carport-Bausätze im PassendPlanen-Katalog",
          columns: ["Typ", "Bausätze", "Mittlere Außenbreite", "Mittlere Außenlänge", "Mittlerer Angebotspreis"],
          rows: [
            ...(singleKits ? [["Einzelcarport", String(singleKits.count), `${number(singleKits.medianWidthM)} m`, `${number(singleKits.medianLengthM)} m`, roundEuro(singleKits.medianPriceEur)]] : []),
            ...(doubleKits ? [["Doppelcarport", String(doubleKits.count), `${number(doubleKits.medianWidthM)} m`, `${number(doubleKits.medianLengthM)} m`, roundEuro(doubleKits.medianPriceEur)]] : []),
          ],
        },
        links: [
          { href: "/ratgeber/daten/carport-groessen-stellplaetze/", label: "Datenauswertung Carport-Größen" },
          { href: "/ratgeber/einzelcarport-oder-doppelcarport/", label: "Einzel- oder Doppelcarport" },
        ],
      },
      {
        title: "Was der Planer bewusst offen lässt",
        paragraphs: [
          "Pfostenraster, Fundamente, Statik, Wind- und Schneelast sowie Abstandsflächen und Genehmigung hängen vom konkreten System und Grundstück ab. Der Planer markiert diese Punkte, ersetzt aber keine Prüfung durch Hersteller, Fachbetrieb oder Bauamt.",
        ],
        links: [
          { href: "/garten/carport-fundament/", label: "Carport-Fundament einordnen" },
          { href: "/ratgeber/carport-holz-oder-aluminium/", label: "Carport aus Holz oder Aluminium" },
        ],
      },
    ],
    note: "Die Beispielwerte entstehen mit derselben Rechenlogik wie der Planer und seinen Startwerten. Katalogwerte sind Mediane geprüfter Angebote und keine Empfehlung für ein bestimmtes Modell.",
  },
};

export function getPlannerGuide(id: PlannerId) {
  return PLANNER_GUIDES[id];
}
