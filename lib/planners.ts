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
  title: string;
  category: string;
  shortCategory: string;
  description: string;
  homeDescription: string;
  href: string;
  icon: PlannerIconName;
  cta: string;
  outputs: readonly [string, string, string];
};

export const PLANNERS: readonly PlannerDirectoryItem[] = [
  {
    id: "garden-house",
    title: "Gartenhaus-Planer",
    category: "Garten · Lagerung",
    shortCategory: "Garten",
    description: "Mindestfläche, Türbreite, Stellfläche, Bodenoption und Budget zu einem klaren Auswahlrahmen verbinden.",
    homeDescription: "Für Fahrräder, Geräte, Rasenmäher, Werkbank und Regale.",
    href: "/garten/gartenhaus-planer/",
    icon: "garden-house",
    cta: "Gartenhaus planen",
    outputs: ["Mindestfläche für deine Nutzung", "Empfohlene Türbreite und Zugang", "Stellflächen-, Boden- und Budgetcheck"],
  },
  {
    id: "dehumidifier",
    title: "Luftentfeuchter-Rechner",
    category: "Haus · Raumklima",
    shortCategory: "Raumklima",
    description: "Raumvolumen, Feuchtebelastung, Temperatur, Ablauf und Geräusch für die Geräteauswahl einordnen.",
    homeDescription: "Raumvolumen, Feuchtebelastung, Temperatur und Geräusch einordnen.",
    href: "/haus/raumklima/luftentfeuchter-rechner/",
    icon: "dehumidifier",
    cta: "Gerätegröße berechnen",
    outputs: ["Berechnetes Raumvolumen", "Passende Entfeuchter-Leistungsklasse", "Temperatur-, Ablauf- und Geräuschcheck"],
  },
  {
    id: "irrigation",
    title: "Bewässerungsplaner",
    category: "Garten · Wasser",
    shortCategory: "Garten",
    description: "Materialstruktur und Steuerungszonen für Rasen, Beete und Hecken vorbereiten – ohne scheinpräzise Hydraulik.",
    homeDescription: "Materialstruktur für Rasen, Beete und Hecken vorbereiten.",
    href: "/garten/bewaesserungs-planer/",
    icon: "irrigation",
    cta: "Bewässerung planen",
    outputs: ["Tropfrohr- und Verteilstrecken", "Benötigte Komponentengruppen", "Steuerungszonen und offene Messwerte"],
  },
  {
    id: "terrace",
    title: "Terrassendielen-Rechner",
    category: "Garten · Terrasse",
    shortCategory: "Terrasse",
    description: "Dielenreihen, Laufmeter, Reserve, Lieferlängen und Unterkonstruktion zu einem Materialrahmen verbinden.",
    homeDescription: "Dielen, Verschnitt und Unterkonstruktion mengenmäßig vorbereiten.",
    href: "/garten/terrassen-dielen-rechner/",
    icon: "terrace",
    cta: "Terrassenbedarf berechnen",
    outputs: ["Dielenreihen und benötigte Laufmeter", "Volle Lieferdielen inklusive Reserve", "Reihen der Unterkonstruktion"],
  },
  {
    id: "privacy-screen",
    title: "Sichtschutz-Planer",
    category: "Garten · Zaun",
    shortCategory: "Sichtschutz",
    description: "Standardfelder, Tor-Module, Pfosten und Rasterabschluss für eine gerade Sichtschutzstrecke abschätzen.",
    homeDescription: "Systemfelder, Tore, Pfosten und Randanpassung für eine gerade Strecke.",
    href: "/garten/sichtschutz-planer/",
    icon: "privacy-screen",
    cta: "Sichtschutz planen",
    outputs: ["Anzahl der Sichtschutzfelder", "Tor- und Pfostenanzahl", "Restfeld und tatsächlicher Rasterabschluss"],
  },
  {
    id: "flooring",
    title: "Bodenbelag-Rechner",
    category: "Haus · Innenausbau",
    shortCategory: "Innenausbau",
    description: "Teilflächen, Verschnitt, Paketinhalt, Unterlage und Sockelleisten zu einem bestellbaren Materialrahmen verbinden.",
    homeDescription: "Fläche, Verschnitt, volle Pakete, Unterlage und Sockelleisten berechnen.",
    href: "/haus/boden/bodenbelag-rechner/",
    icon: "flooring",
    cta: "Bodenmaterial berechnen",
    outputs: ["Netto- und Bestellfläche", "Anzahl voller Materialpakete", "Unterlage und Sockelleisten"],
  },
  {
    id: "greenhouse",
    title: "Gewächshaus-Planer",
    category: "Garten · Anbau",
    shortCategory: "Gewächshaus",
    description: "Grundfläche, Beet- und Wegeaufteilung, Basisprofile und theoretisches Regenwasser als Planungsrahmen zusammenführen.",
    homeDescription: "Grundfläche, Beete, Wege, Basisprofile und Regenwasserrahmen planen.",
    href: "/garten/gewaechshaus-planer/",
    icon: "greenhouse",
    cta: "Gewächshaus planen",
    outputs: ["Grund- und nutzbare Beetfläche", "Beet- und Wegeaufteilung", "Basisprofile und Regenwasserpotenzial"],
  },
  {
    id: "robot-mower",
    title: "Mähroboter-Flächencheck",
    category: "Garten · Rasen",
    shortCategory: "Rasen",
    description: "Netto-Rasenfläche, Kapazitätsreserve, Steigung, Engstellen und Begrenzungsprinzip zu einem Auswahlrahmen verbinden.",
    homeDescription: "Nettofläche, Kapazitätsreserve, Engstellen, Steigung und Installation prüfen.",
    href: "/garten/maehroboter-rechner/",
    icon: "robot-mower",
    cta: "Mähbereich prüfen",
    outputs: ["Netto-Mähfläche mit Reserve", "Benötigte Kapazitätsklasse", "Engstellen-, Steigungs- und Installationscheck"],
  },
  {
    id: "carport",
    title: "Carport-Planer",
    category: "Garten · Stellplatz",
    shortCategory: "Stellplatz",
    description: "Fahrzeugmaße, Bewegungsraum, Stauraum, Zufahrt und Dachaufgaben zu lichten Zielmaßen verbinden.",
    homeDescription: "Lichten Stellraum, Bewegungsreserve, Stauraum und Dachwasser planen.",
    href: "/garten/carport-planer/",
    icon: "carport",
    cta: "Carport-Raum planen",
    outputs: ["Lichte Mindestbreite, -länge und -höhe", "Stell- und Bewegungsfläche", "Zufahrts-, Stauraum- und Dachwassercheck"],
  },
  {
    id: "drywall",
    title: "Trockenbauwand-Rechner",
    category: "Haus · Innenausbau",
    shortCategory: "Innenausbau",
    description: "Wandfläche, Öffnungen, Plattenlagen, Format und ungestörtes Profilraster zu einem Mengenrahmen verbinden.",
    homeDescription: "Platten, Lagen, Grundständer, Randprofile und Dämmfläche berechnen.",
    href: "/haus/innenausbau/trockenbau-rechner/",
    icon: "drywall",
    cta: "Trockenbau berechnen",
    outputs: ["Netto-Bekleidungsfläche", "Anzahl voller Platten", "Grundständer, Randprofile und Dämmfläche"],
  },
] as const;

export function getPlanner(id: PlannerId): PlannerDirectoryItem {
  const planner = PLANNERS.find((item) => item.id === id);

  if (!planner) {
    throw new Error(`Unknown planner: ${id}`);
  }

  return planner;
}
