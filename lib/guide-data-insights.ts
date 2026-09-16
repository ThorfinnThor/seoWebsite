import {
  dehumidifierDataReport,
  flooringDataReport,
  gardenHouseDataReport,
  irrigationDataReport,
  robotMowerDataReport,
} from "@/lib/data-report/catalog-insights";
import {
  carportProjectReport,
  drywallProjectReport,
  greenhouseProjectReport,
  privacyProjectReport,
  terraceProjectReport,
} from "@/lib/data-report/project-catalog-insights";

export type GuideDataMetric = {
  value: string;
  label: string;
  note?: string;
};

export type GuideDataRow = {
  label: string;
  values: readonly string[];
  note?: string;
  magnitude?: number;
};

export type GuideDataInsight = {
  path: string;
  topic: string;
  layout: "bands" | "matrix" | "duel" | "mix" | "scenario" | "coverage";
  eyebrow: string;
  title: string;
  intro: string;
  metrics: readonly GuideDataMetric[];
  columns?: readonly string[];
  rows: readonly GuideDataRow[];
  conclusion: string;
  caveat: string;
  updatedAt: string;
  updatedLabel: string;
  reportHref: string;
  reportLabel: string;
};

const integer = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const money = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

function percent(part: number, total: number) {
  return total > 0 ? `${decimal.format((part / total) * 100)} %` : "0 %";
}

function dateOnly(value: string) {
  return value.slice(0, 10);
}

const gardenHouseBands = gardenHouseDataReport.sizes.map((band) => ({
  label: band.label,
  values: [integer.format(band.count), decimal.format(band.medianAreaM2) + " m²", money.format(band.medianPriceEur)],
  note: `Die mittlere Hälfte der Angebotspreise liegt zwischen ${money.format(band.lowerPriceEur)} und ${money.format(band.upperPriceEur)}.`,
}));

const mowerRows = robotMowerDataReport.navigation.map((group) => ({
  label: group.label,
  values: [integer.format(group.count), `${integer.format(group.medianAreaM2)} m²`, `${integer.format(group.medianSlopePercent)} %`, money.format(group.medianPriceEur)],
  note: group.passageKnown > 0
    ? `Für ${group.passageKnown} Modelle ist eine Mindestpassage dokumentiert. Der Median liegt bei ${integer.format(group.medianPassageCm)} cm.`
    : "Für diese Gruppe ist in der Stichprobe keine belastbare Mindestpassage dokumentiert.",
}));

const terraceRows = terraceProjectReport.materials.map((material) => ({
  label: material.label,
  values: [integer.format(material.count), `${integer.format(material.medianLengthMm)} mm`, `${integer.format(material.medianWidthMm)} mm`, decimal.format(material.medianThicknessMm) + " mm"],
  note: `Der mittlere Produktpreis beträgt ${money.format(material.medianPriceEur)}. Ein Preis je Quadratmeter lässt sich ohne Paketinhalt nicht daraus ableiten.`,
}));

const irrigationRows = irrigationDataReport.kinds.slice(0, 5).map((kind) => ({
  label: kind.label,
  values: [integer.format(kind.count), `${decimal.format(kind.share)} %`, money.format(kind.medianPriceEur)],
  magnitude: kind.share,
}));

const greenhouseRows = greenhouseProjectReport.glazing
  .filter((group) => group.key === "polycarbonate" || group.key === "glass")
  .map((group) => ({
    label: group.label,
    values: [integer.format(group.count), decimal.format(group.medianAreaM2) + " m²", money.format(group.medianPriceEur)],
    note: `Die mittlere Hälfte der dokumentierten Preise reicht von ${money.format(group.lowerPriceEur)} bis ${money.format(group.upperPriceEur)}.`,
  }));

const greenhouseKnownGlazing = greenhouseProjectReport.glazing
  .filter((group) => group.key !== "unknown")
  .reduce((sum, group) => sum + group.count, 0);

const privacyRows = privacyProjectReport.widthBands.map((band) => ({
  label: band.label,
  values: [integer.format(band.count), `${integer.format(band.medianWidthCm)} cm`, money.format(band.medianTenMeterCostEur)],
  note: `Rechnerisch auf ganze Elemente für zehn Meter aufgerundet. Median je laufendem Meter ${money.format(band.medianPricePerMeterEur)}.`,
}));

const carportRows = carportProjectReport.vehicleGroups.map((group) => ({
  label: group.vehicleCount === 1 ? "Ein Stellplatz" : "Zwei Stellplätze",
  values: [integer.format(group.count), `${decimal.format(group.medianWidthM)} × ${decimal.format(group.medianLengthM)} m`, decimal.format(group.medianFootprintM2) + " m²", money.format(group.medianPriceEur)],
  note: `Die mittlere Hälfte der Angebotspreise liegt zwischen ${money.format(group.lowerPriceEur)} und ${money.format(group.upperPriceEur)}.`,
}));

const flooringRows = flooringDataReport.types
  .filter((type) => type.key === "laminate" || type.key === "vinyl-click")
  .map((type) => ({
    label: type.label,
    values: [
      integer.format(type.count),
      `${type.floorHeatingApproved} von ${type.count}`,
      `${type.wetRoomApproved} von ${type.count}`,
      money.format(type.scenario.medianMaterialCostEur),
    ],
    note: `Das Rechenbeispiel bestellt mindestens 22 m² und rundet auf vollständige Pakete. Im Median werden ${decimal.format(type.scenario.medianOrderedAreaM2)} m² geliefert.`,
  }));

const drywallRows = [
  { label: "Plattentyp", count: drywallProjectReport.coverage.boardType, total: drywallProjectReport.total },
  { label: "Plattendicke", count: drywallProjectReport.coverage.boardThickness, total: drywallProjectReport.total },
  { label: "Vollständige Plattenmaße", count: drywallProjectReport.coverage.boardDimensions, total: drywallProjectReport.total },
  { label: "Feuchtraumfreigabe", count: drywallProjectReport.coverage.moistureApproval, total: drywallProjectReport.total },
  { label: "Brandklasse", count: drywallProjectReport.coverage.fireClass, total: drywallProjectReport.total },
].map((item) => ({
  label: item.label,
  values: [`${item.count} von ${item.total}`, percent(item.count, item.total)],
  magnitude: (item.count / item.total) * 100,
}));

const dehumidifierRows = dehumidifierDataReport.coverage.map((item) => ({
  label: item.label,
  values: [`${item.count} von ${dehumidifierDataReport.total}`, `${decimal.format(item.share)} %`],
  magnitude: item.share,
}));

export const GUIDE_DATA_INSIGHTS: readonly GuideDataInsight[] = [
  {
    path: "/ratgeber/gartenhaus-kosten-vergleich/",
    topic: "gartenhaus",
    layout: "bands",
    eyebrow: "Aus 333 geprüften Angeboten",
    title: "Die Größe verschiebt den Preisrahmen deutlich",
    intro: "Die Angebote wurden nach dokumentierter Grundfläche gruppiert. Dadurch wird sichtbar, welcher Preisrahmen innerhalb einer Größenklasse vorkommt, ohne einzelne Sonderangebote zum Marktpreis zu erklären.",
    metrics: [
      { value: integer.format(gardenHouseDataReport.total), label: "geprüfte Gartenhäuser" },
      { value: decimal.format(gardenHouseDataReport.summary.medianAreaM2) + " m²", label: "mittlere Grundfläche" },
      { value: money.format(gardenHouseDataReport.summary.medianPriceEur), label: "Median aller Angebote" },
    ],
    columns: ["Anzahl", "mittlere Fläche", "mittlerer Preis"],
    rows: gardenHouseBands,
    conclusion: "Ein Preisvergleich wird erst innerhalb einer ähnlichen Größenklasse sinnvoll. Boden, Lieferung, Fundament und Aufbau sind in diesen Produktpreisen nicht automatisch enthalten.",
    caveat: `Die Auswertung beschreibt ${gardenHouseDataReport.available} aktuell bepreiste Angebote aus dem PassendPlanen Katalog. Sie ist keine vollständige Marktübersicht.`,
    updatedAt: dateOnly(gardenHouseDataReport.generatedAt),
    updatedLabel: gardenHouseDataReport.updatedLabel,
    reportHref: "/ratgeber/daten/gartenhaus-preise-groessen/",
    reportLabel: "Vollständige Gartenhausauswertung öffnen",
  },
  {
    path: "/ratgeber/maehroboter-vergleich-kaufkriterien/",
    topic: "maehroboter",
    layout: "matrix",
    eyebrow: "15 Modelle im direkten Datenvergleich",
    title: "Navigation lässt sich nicht auf kabellos oder mit Kabel verkürzen",
    intro: "Flächenleistung, Steigung und dokumentierte Passagen unterscheiden sich innerhalb der Navigationsgruppen. Die Werte zeigen eine Vorauswahl, keine Garantie für ein bestimmtes Grundstück.",
    metrics: [
      { value: integer.format(robotMowerDataReport.total), label: "geprüfte Modelle" },
      { value: integer.format(robotMowerDataReport.brands), label: "Marken" },
      { value: `${robotMowerDataReport.summary.passageKnown} von ${robotMowerDataReport.total}`, label: "mit dokumentierter Mindestpassage" },
    ],
    columns: ["Modelle", "Fläche", "Steigung", "Preis"],
    rows: mowerRows,
    conclusion: "Die teuerste oder flächenstärkste Navigation ist nicht automatisch die beste. Engstellen, Baumbestand, freie Sicht zum Himmel und getrennte Flächen müssen gegen die konkrete Technik geprüft werden.",
    caveat: "Die Gruppen enthalten unterschiedlich viele Modelle. Medianwerte sind deshalb Orientierung und kein Rangplatz.",
    updatedAt: dateOnly(robotMowerDataReport.generatedAt),
    updatedLabel: robotMowerDataReport.updatedLabel,
    reportHref: "/ratgeber/daten/maehroboter-navigation-flaechenleistung/",
    reportLabel: "Alle Navigationsdaten ansehen",
  },
  {
    path: "/ratgeber/terrassendielen-wpc-oder-holz/",
    topic: "terrasse",
    layout: "duel",
    eyebrow: "80 Dielen nach Material getrennt",
    title: "Holz und WPC unterscheiden sich im Katalog vor allem bei den Lieferlängen",
    intro: "Die Abmessungen helfen bei Reihen, Stößen und Zuschnitt. Produktpreise sind dagegen nicht direkt vergleichbar, weil die Feeds keine einheitliche Paketfläche oder Laufmeterbasis liefern.",
    metrics: [
      { value: integer.format(terraceProjectReport.decking.count), label: "geprüfte Dielen" },
      { value: `${terraceProjectReport.coverage.boardDimensions} von ${terraceProjectReport.decking.count}`, label: "mit vollständigen Abmessungen" },
      { value: "0", label: "einheitliche Quadratmeterpreise", note: "Die erforderliche Mengenbasis fehlt." },
    ],
    columns: ["Produkte", "Länge", "Breite", "Stärke"],
    rows: terraceRows,
    conclusion: "Die längere Mediandiele bei WPC kann bei bestimmten Terrassenmaßen Stöße vermeiden. Ob daraus weniger Verschnitt entsteht, entscheidet erst die reale Länge in Verlegerichtung.",
    caveat: "Die Werte beschreiben Produktabmessungen. Tragfähigkeit, Auflagerabstand und Systemkompatibilität folgen den Unterlagen des gewählten Systems.",
    updatedAt: dateOnly(terraceProjectReport.generatedAt),
    updatedLabel: terraceProjectReport.updatedLabel,
    reportHref: "/ratgeber/daten/terrassendielen-holz-wpc-abmessungen/",
    reportLabel: "Abmessungen im Detail vergleichen",
  },
  {
    path: "/ratgeber/bewaesserung-tropfschlauch-oder-regner/",
    topic: "bewaesserung",
    layout: "mix",
    eyebrow: "84 Komponenten statt pauschaler Sets",
    title: "Das Sortiment zeigt Einzelteile, aber noch keine fertige Bewässerungsplanung",
    intro: "Regner und Tropfleitungen bilden nur einen Teil der verfügbaren Komponenten. Rohre, Verbinder, Druckregelung und Steuerung entscheiden mit darüber, ob aus ihnen eine funktionierende Zone wird.",
    metrics: [
      { value: integer.format(irrigationDataReport.total), label: "geprüfte Produkte" },
      { value: integer.format(irrigationDataReport.kinds.find((kind) => kind.key === "sprinkler")?.count ?? 0), label: "Regner" },
      { value: integer.format(irrigationDataReport.kinds.find((kind) => kind.key === "dripline")?.count ?? 0), label: "Produkte zur Tropfbewässerung" },
    ],
    columns: ["Produkte", "Sortimentsanteil", "mittlerer Produktpreis"],
    rows: irrigationRows,
    conclusion: "Die Produktzahl spricht weder für Regner noch für Tropfbewässerung. Sie zeigt, warum der Wasserbedarf der Fläche und der gemessene Anschluss vor dem Warenkorb geklärt werden müssen.",
    caveat: `Nur bei ${irrigationDataReport.coverage.requiredAccessories} Produkt ist notwendiges Zubehör strukturiert dokumentiert. Der Katalog kann daher keine vollständige Systemkompatibilität bestätigen.`,
    updatedAt: dateOnly(irrigationDataReport.generatedAt),
    updatedLabel: irrigationDataReport.updatedLabel,
    reportHref: "/ratgeber/daten/bewaesserung-komponenten-systeme/",
    reportLabel: "Komponenten und Datenlücken ansehen",
  },
  {
    path: "/ratgeber/gewaechshaus-glas-oder-polycarbonat/",
    topic: "gewaechshaus",
    layout: "duel",
    eyebrow: "91 Gewächshäuser im Materialvergleich",
    title: "Hohlkammerplatten sind häufiger, doch daraus entsteht kein Materialsieger",
    intro: "Die Stichprobe trennt Gewächshäuser mit Hohlkammerplatten und Glas. Grundfläche und Preis lassen sich vergleichen. Licht, Plattenstärke, Sicherheitsausführung und Wärmedurchgang sind nicht durchgängig strukturiert dokumentiert.",
    metrics: [
      { value: integer.format(greenhouseProjectReport.kits.count), label: "geprüfte Gewächshäuser" },
      { value: `${greenhouseKnownGlazing} von ${greenhouseProjectReport.kits.count}`, label: "mit dokumentierter Verglasungsart" },
      { value: `${greenhouseProjectReport.coverage.height} von ${greenhouseProjectReport.total}`, label: "mit dokumentierter Höhe" },
    ],
    columns: ["Modelle", "mittlere Fläche", "mittlerer Preis"],
    rows: greenhouseRows,
    conclusion: "Der Preisunterschied in dieser Stichprobe darf nicht allein dem Material zugerechnet werden. Ausstattung, Größe, Konstruktion und Produktserie wirken gleichzeitig auf den Angebotspreis.",
    caveat: "Die Auswertung vergleicht Angebotsdaten. Sie bewertet weder Lichtdurchlass noch Hagelfestigkeit oder Wärmedämmung einer konkreten Verglasung.",
    updatedAt: dateOnly(greenhouseProjectReport.generatedAt),
    updatedLabel: greenhouseProjectReport.updatedLabel,
    reportHref: "/ratgeber/daten/gewaechshaus-glas-hohlkammerplatten/",
    reportLabel: "Verglasungsstichprobe öffnen",
  },
  {
    path: "/ratgeber/sichtschutz-10-meter-berechnen/",
    topic: "sichtschutz",
    layout: "scenario",
    eyebrow: "Zehn Meter mit echten Elementbreiten gerechnet",
    title: "Breite und Höhe verändern die reine Elementsumme erheblich",
    intro: "Für jedes Produkt wurde berechnet, wie viele vollständige Elemente mindestens zehn Meter abdecken. Die Ergebnisse sind nach Elementbreite gruppiert und auf den jeweiligen Median verdichtet.",
    metrics: [
      { value: integer.format(privacyProjectReport.panels.count), label: "Elemente und Matten" },
      { value: `${integer.format(privacyProjectReport.panels.medianWidthCm)} cm`, label: "mittlere Elementbreite" },
      { value: money.format(privacyProjectReport.panels.medianTenMeterCostEur), label: "Median für zehn Meter", note: "Nur Elemente oder Matten" },
    ],
    columns: ["Produkte", "mittlere Breite", "reine Elementsumme"],
    rows: privacyRows,
    conclusion: "Schmale hohe Elemente fallen in dieser Stichprobe deutlich teurer aus als breite Matten. Die Gruppen bilden unterschiedliche Produkttypen ab und dürfen deshalb nicht als reiner Breitenrabatt gelesen werden.",
    caveat: "Pfosten, Halterungen, Fundamente, Tore, Fracht und Zuschnitt fehlen in der Summe. Eine dokumentierte Systemzuordnung liegt im Feed nicht vor.",
    updatedAt: dateOnly(privacyProjectReport.generatedAt),
    updatedLabel: privacyProjectReport.updatedLabel,
    reportHref: "/ratgeber/daten/sichtschutz-kosten-zehn-meter/",
    reportLabel: "Zehn Meter Auswertung öffnen",
  },
  {
    path: "/ratgeber/einzelcarport-oder-doppelcarport/",
    topic: "carport",
    layout: "duel",
    eyebrow: "69 Carport Bausätze ausgewertet",
    title: "Der zweite Stellplatz verändert mehr als nur die Breite",
    intro: "Einzelcarports und Doppelcarports wurden getrennt nach dokumentiertem Außenmaß, Grundfläche und Angebotspreis ausgewertet. Die lichte Durchfahrt bleibt eine eigene Prüfung.",
    metrics: [
      { value: integer.format(carportProjectReport.kits.count), label: "Carport Bausätze" },
      { value: integer.format(carportProjectReport.vehicleGroups[0].count), label: "für einen Stellplatz" },
      { value: integer.format(carportProjectReport.vehicleGroups[1].count), label: "für zwei Stellplätze" },
    ],
    columns: ["Modelle", "mittleres Außenmaß", "mittlere Grundfläche", "mittlerer Preis"],
    rows: carportRows,
    conclusion: "Die mittlere Grundfläche der Doppelcarports liegt nicht einfach beim Doppelten. Konstruktion und gemeinsame Durchfahrt verändern das Verhältnis. Für die Nutzung zählen trotzdem die Pfostenpositionen und lichten Maße.",
    caveat: `Bei keinem der ${carportProjectReport.total} Katalogprodukte sind lichte Breite und lichte Länge strukturiert vollständig hinterlegt. Außenmaße ersetzen diese Prüfung nicht.`,
    updatedAt: dateOnly(carportProjectReport.generatedAt),
    updatedLabel: carportProjectReport.updatedLabel,
    reportHref: "/ratgeber/daten/carport-groessen-stellplaetze/",
    reportLabel: "Carportgrößen im Detail ansehen",
  },
  {
    path: "/ratgeber/bodenbelag-laminat-oder-vinyl/",
    topic: "bodenbelag",
    layout: "matrix",
    eyebrow: "82 Laminat und Klickvinyl Angebote",
    title: "Freigaben und Paketrundung sind aussagekräftiger als der Paketpreis",
    intro: "Die Stichprobe verbindet dokumentierte Freigaben mit einer einheitlichen Bestellung von mindestens 22 Quadratmetern. Damit werden Laminat und Klickvinyl auf derselben Flächenbasis betrachtet.",
    metrics: [
      { value: integer.format(flooringDataReport.total), label: "Bodenbeläge insgesamt" },
      { value: `${flooringDataReport.floorHeatingApproved} von ${flooringDataReport.total}`, label: "für Fußbodenheizung dokumentiert" },
      { value: `${flooringDataReport.wetRoomApproved} von ${flooringDataReport.total}`, label: "für Feuchtraum dokumentiert" },
    ],
    columns: ["Produkte", "Fußbodenheizung", "Feuchtraum", "Median für 22 m²"],
    rows: flooringRows,
    conclusion: "Im 22 Quadratmeter Beispiel liegen die mittleren Materialkosten nah beieinander. Die Eignung für Raum und Untergrund muss daher vor einer Entscheidung nach dem Preis stehen.",
    caveat: "Das Beispiel enthält nur den Bodenbelag. Unterlage, Feuchteschutz, Profile, Sockelleisten, Verschnittannahmen außerhalb der Paketrundung und Untergrundarbeiten kommen hinzu.",
    updatedAt: dateOnly(flooringDataReport.generatedAt),
    updatedLabel: flooringDataReport.updatedLabel,
    reportHref: "/ratgeber/daten/bodenbelaege-fussbodenheizung-feuchtraum/",
    reportLabel: "Freigaben und Paketmengen prüfen",
  },
  {
    path: "/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/",
    topic: "trockenbau",
    layout: "coverage",
    eyebrow: "85 Trockenbauprodukte auf Datenqualität geprüft",
    title: "Der Produktfeed kann die Zahl der Plattenlagen nicht freigeben",
    intro: "Für eine einfache oder doppelte Beplankung braucht es ein vollständiges Wandsystem. Die Datenabdeckung zeigt, welche Angaben im Katalog für diese Entscheidung tatsächlich belastbar vorliegen.",
    metrics: [
      { value: integer.format(drywallProjectReport.boards.count), label: "geprüfte Platten" },
      { value: integer.format(drywallProjectReport.profiles.count), label: "geprüfte Profile" },
      { value: `${decimal.format(drywallProjectReport.boards.medianThicknessMm)} mm`, label: "mittlere dokumentierte Plattendicke" },
    ],
    columns: ["Dokumentiert", "Anteil am Gesamtkatalog"],
    rows: drywallRows,
    conclusion: "Die Produktbezeichnung reicht für eine Beplankungsentscheidung nicht. Wandhöhe, Profil, Achsabstand, Plattentyp, Befestigung und geforderte Schall oder Brandschutzleistung müssen aus einem gemeinsamen Systemnachweis stammen.",
    caveat: "Null dokumentierte Brandklassen bedeutet nicht, dass kein Produkt geeignet ist. Es bedeutet, dass der vorliegende strukturierte Feed dafür keinen belastbaren Nachweis liefert.",
    updatedAt: dateOnly(drywallProjectReport.generatedAt),
    updatedLabel: drywallProjectReport.updatedLabel,
    reportHref: "/ratgeber/daten/trockenbau-feuchtraum-brandschutz-datenluecken/",
    reportLabel: "Datenabdeckung vollständig ansehen",
  },
  {
    path: "/ratgeber/luftentfeuchter-kompressor-oder-adsorption/",
    topic: "luftentfeuchter",
    layout: "coverage",
    eyebrow: "42 Geräteangaben auf Vergleichbarkeit geprüft",
    title: "Gerade die Temperaturangabe fehlt für den Technikvergleich häufig",
    intro: "Die Entscheidung zwischen Kompressor und Adsorption hängt stark von der Raumtemperatur ab. Im aktuellen Katalog ist die niedrigste Betriebstemperatur jedoch nur bei wenigen Geräten strukturiert vorhanden.",
    metrics: [
      { value: integer.format(dehumidifierDataReport.total), label: "geprüfte Geräte" },
      { value: `${integer.format(dehumidifierDataReport.summary.medianExtractionLPerDay)} l`, label: "mittlere Nennleistung je Tag" },
      { value: `${integer.format(dehumidifierDataReport.summary.medianNoiseDb)} dB`, label: "mittlerer dokumentierter Geräuschwert" },
    ],
    columns: ["Dokumentiert", "Datenabdeckung"],
    rows: dehumidifierRows,
    conclusion: "Ein Technikvergleich allein nach Liter pro Tag wäre in dieser Stichprobe unvollständig. Für einen kalten Keller muss die Leistung bei niedriger Temperatur aus dem konkreten Datenblatt kommen.",
    caveat: "Fehlende Angaben werden nicht als Nichteignung gewertet. Nennleistung und Geräusch stammen zudem nicht zwingend aus identischen Prüfbedingungen.",
    updatedAt: dateOnly(dehumidifierDataReport.generatedAt),
    updatedLabel: dehumidifierDataReport.updatedLabel,
    reportHref: "/ratgeber/daten/luftentfeuchter-leistung-lautstaerke/",
    reportLabel: "Leistung und Datenabdeckung ansehen",
  },
] as const;

export function getGuideDataInsight(path: string) {
  return GUIDE_DATA_INSIGHTS.find((insight) => insight.path === path);
}
