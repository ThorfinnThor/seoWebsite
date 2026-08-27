/**
 * Curated product building blocks for planners that do not yet have a live
 * merchant feed. These are intentionally not merchant offers: prices, stock
 * and affiliate URLs are only shown once a matching Awin feed is reviewed.
 */
export interface ReferenceProduct {
  id: string;
  category: string;
  name: string;
  description: string;
  planningNote: string;
  quantity?: string;
}

export const REFERENCE_PRODUCTS = {
  irrigation: [
    { id: "irrigation-controller", category: "Steuerung", name: "Bewässerungscomputer", description: "Controller mit der passenden Anzahl an Ventilausgängen für deine berechneten Zonen.", planningNote: "Systemspannung, Schutzart und Ventilkompatibilität prüfen." },
    { id: "irrigation-valves", category: "Ventile", name: "Zonenventile", description: "Magnetventile oder manuelle Absperrungen trennen Rasen-, Beet- und Heckenbereiche.", planningNote: "Durchfluss und Gewindegröße je Zone abgleichen." },
    { id: "irrigation-dripline", category: "Tropfbewässerung", name: "Tropfrohr und Tropfer", description: "Druckkompensiertes Tropfrohr für Beete und Hecken mit gleichmäßiger Wasserabgabe.", planningNote: "Verlegeabstand und maximal zulässige Stranglänge beachten." },
    { id: "irrigation-sprinklers", category: "Rasen", name: "Versenk- oder Getrieberegner", description: "Regnerkörper und Düsen für eine gleichmäßige Abdeckung der Rasenfläche.", planningNote: "Wurfweite, Sektoren und Überlappung erst nach Druckmessung festlegen." },
    { id: "irrigation-filter", category: "Wasseraufbereitung", name: "Filter und Druckminderer", description: "Schützt Ventile und Tropfer vor Schmutz und begrenzt den Arbeitsdruck.", planningNote: "Filterfeinheit und Nenndurchfluss an die Wasserquelle anpassen." },
    { id: "irrigation-pipe", category: "Leitungen", name: "Zuleitung, Verteiler und Fittings", description: "Hauptleitung, Abzweige, Endstücke und zugängliche Absperrungen für den Leitungsplan.", planningNote: "Rohrdimensionen nicht pauschal annehmen; Druckverlust berechnen." },
  ] satisfies ReferenceProduct[],
  terrace: [
    { id: "terrace-decking", category: "Belag", name: "Terrassendielen", description: "Dielenprofil in der gewählten Sichtbreite und Lieferlänge für den berechneten Laufmeterbedarf.", planningNote: "Material, Oberflächenprofil und Herstellerfuge festlegen." },
    { id: "terrace-substructure", category: "Unterkonstruktion", name: "Unterkonstruktionsprofile", description: "Tragprofile für die berechneten Auflagerlinien inklusive Rand- und Stoßdetails.", planningNote: "Querschnitt, Material und zulässige Spannweite prüfen." },
    { id: "terrace-screws", category: "Befestigung", name: "Terrassenschrauben oder Clips", description: "Sichtbare oder verdeckte Befestigung passend zu Profil und Unterkonstruktion.", planningNote: "Korrosionsklasse und Systemfreigabe des Belags beachten." },
    { id: "terrace-spacers", category: "Verlegung", name: "Fugen- und Abstandshalter", description: "Abstandshilfen halten die geplante Fuge über alle Reihen gleichmäßig.", planningNote: "Fuge nach Herstellerangabe und realer Feuchte wählen." },
    { id: "terrace-foundation", category: "Auflager", name: "Terrassenlager oder Fundamentpunkte", description: "Höhenverstellbare Lager, Platten oder Punktfundamente für einen tragfähigen Untergrund.", planningNote: "Last, Untergrund und Entwässerung vor der Bestellung prüfen." },
    { id: "terrace-edge", category: "Randabschluss", name: "Rand- und Abschlussprofile", description: "Profile und Blenden für offene Kanten, Stirnseiten und saubere Übergänge.", planningNote: "Sichtkanten und notwendige Hinterlüftung einplanen." },
  ] satisfies ReferenceProduct[],
  carport: [
    { id: "carport-kit", category: "Konstruktion", name: "Carport-Bausatz oder Tragwerk", description: "Grundsystem für die berechneten lichten Stellplatzmaße und die gewünschte Dachform.", planningNote: "Außenmaße, Statik, Schneelast und Genehmigung vergleichen." },
    { id: "carport-posts", category: "Tragwerk", name: "Pfosten, Träger und Verbinder", description: "Tragende Bauteile und zugelassene Verbinder für Fahrzeugbreite, Höhe und Dachlast.", planningNote: "Statik und Verankerung gehören zum konkreten System." },
    { id: "carport-anchors", category: "Fundament", name: "Pfostenträger und Anker", description: "Verankerungen für Punktfundamente oder eine vorhandene tragfähige Bodenplatte.", planningNote: "Korrosion, Randabstände und Betonqualität prüfen." },
    { id: "carport-roof", category: "Dach", name: "Dachdeckung und Anschlussprofile", description: "Dachhaut, Randprofile und Befestigung passend zur geplanten Dachform.", planningNote: "Gefälle, Windsog und Dachüberstand nicht aus Innenmaßen ableiten." },
    { id: "carport-drainage", category: "Entwässerung", name: "Rinne, Fallrohr und Ablauf", description: "Dachwasserführung für Speicher, Versickerung oder zugelassenen Anschluss.", planningNote: "Überlauf, Rückstau und Grundstücksgrenzen klären." },
    { id: "carport-electric", category: "Optionale Ausstattung", name: "Elektro- und Ladevorbereitung", description: "Leerrohr, Kabelschutz und Montagezubehör für Licht, Steckdose oder Wallbox.", planningNote: "Leitungsquerschnitt und Schutztechnik von Fachbetrieb planen lassen." },
  ] satisfies ReferenceProduct[],
  greenhouse: [
    { id: "greenhouse-kit", category: "Grundsystem", name: "Gewächshaus-Bausatz", description: "Rahmen, Verglasung und Türen passend zu den geplanten Außenmaßen und der Nutzung.", planningNote: "Fundamentmaß und reale Innenmaße des Herstellers vergleichen." },
    { id: "greenhouse-base", category: "Fundament", name: "Basisrahmen und Verankerung", description: "Basisprofile und Befestigung für den berechneten Umfang mit Längenreserve.", planningNote: "Untergrund, Windlast und lotrechte Verankerung prüfen." },
    { id: "greenhouse-vent", category: "Lüftung", name: "Dachfenster und automatische Öffner", description: "Fenster und Öffner für die geplante Anzahl sowie eine wirksame Querlüftung.", planningNote: "Öffnungsweg, Temperaturbereich und Systemkompatibilität beachten." },
    { id: "greenhouse-irrigation", category: "Bewässerung", name: "Bewässerungsset für Beete", description: "Tropfrohr, Verteiler und Speicheranschluss für die berechnete Anbaufläche.", planningNote: "Wasserqualität, Druck und saisonale Entleerung einplanen." },
    { id: "greenhouse-benches", category: "Innenausstattung", name: "Tische, Regale und Beeteinfassungen", description: "Arbeits- und Stellflächen für feste Beete oder die flexibel berechnete Restfläche.", planningNote: "Arbeitsbreiten, Türbereich und Traglast messen." },
    { id: "greenhouse-shade", category: "Klima", name: "Schattierung und Frostschutz", description: "Schattiergewebe, Thermovorhang oder Frostschutz je nach Nutzung und Standort.", planningNote: "Sonneneinstrahlung, Lüftung und sichere Elektroinstallation abstimmen." },
  ] satisfies ReferenceProduct[],
  privacy: [
    { id: "privacy-panels", category: "Sichtschutz", name: "Sichtschutzfelder", description: "Standardfelder in der gewählten Systembreite für die berechnete Bestellmenge.", planningNote: "Elementhöhe, Windangriffsfläche und Kürzbarkeit prüfen." },
    { id: "privacy-posts", category: "Pfosten", name: "End-, Zwischen- und Torpfosten", description: "Pfosten passend zum Raster, zu Ecken und den berechneten Verankerungspunkten.", planningNote: "Pfostentypen nicht mit einem Einheitsartikel ersetzen." },
    { id: "privacy-anchors", category: "Verankerung", name: "Pfostenträger oder Betonfundamente", description: "Fußplatten, Anker und Fundamentmaterial für Erdreich, Bestand oder tragfähige Platten.", planningNote: "Windlast, Randabstände und Frosttiefe beachten." },
    { id: "privacy-gate", category: "Zugang", name: "Tor- und Beschlagset", description: "Torflügel, Bänder, Schloss und Anschlag passend zur Anzahl der geplanten Module.", planningNote: "Lichte Durchgangsbreite und Öffnungsrichtung festlegen." },
    { id: "privacy-caps", category: "Abschluss", name: "Pfostenkappen und Abdeckungen", description: "Schutz- und Abschlusskappen für offene Pfosten sowie sichtbare Schnittkanten.", planningNote: "Systemprofil und Materialausdehnung berücksichtigen." },
    { id: "privacy-brackets", category: "Montage", name: "Verbinder und Ausgleichsprofile", description: "Eck-, End- und Ausgleichsteile für Gefälle, Toleranzen und den letzten Rasterabschluss.", planningNote: "Nur für das gewählte System freigegebene Teile einsetzen." },
  ] satisfies ReferenceProduct[],
  drywall: [
    { id: "drywall-boards", category: "Platten", name: "Gipskarton- oder Spezialplatten", description: "Plattenformat und -typ für die berechnete Bekleidungsfläche inklusive Zuschnittreserve.", planningNote: "Feuchte-, Brand- und Schallschutzklasse passend zum Aufbau wählen." },
    { id: "drywall-profiles", category: "Unterkonstruktion", name: "CW-/UW-Profile", description: "Ständer-, Boden- und Deckenprofile für das gewählte Achsraster und die Öffnungen.", planningNote: "Profilbreite, Blechstärke und Sturzdetails statisch prüfen." },
    { id: "drywall-screws", category: "Befestigung", name: "Platten- und Montagebefestiger", description: "Schrauben, Dübel und Befestiger passend zu Plattentyp, Untergrund und Lagenzahl.", planningNote: "Länge, Randabstände und Korrosionsschutz beachten." },
    { id: "drywall-joint", category: "Fugen", name: "Fugenspachtel und Bewehrungsstreifen", description: "Spachtel, Fugenband und Kantenschutz für Plattenstöße, Innen- und Außenecken.", planningNote: "Systemfreigabe und Trocknungszeiten einhalten." },
    { id: "drywall-insulation", category: "Hohlraum", name: "Mineralwolle oder zugelassene Dämmung", description: "Dämmstofffläche für den berechneten Hohlraum, sofern Dämmung aktiviert wurde.", planningNote: "Dicke, Rohdichte und Brandschutzkennwerte nicht pauschal wählen." },
    { id: "drywall-sealing", category: "Anschluss", name: "Dichtungs- und Anschlussmaterial", description: "Trennwandband, Anschlussdichtstoff und Installationszubehör für Boden, Decke und Öffnungen.", planningNote: "Schall-, Feuchte- und Bewegungsfugen im Detail planen." },
  ] satisfies ReferenceProduct[],
} as const;

export type ReferenceVertical = keyof typeof REFERENCE_PRODUCTS;

export function setReferenceQuantities(
  items: readonly ReferenceProduct[],
  quantities: Record<string, string>,
): ReferenceProduct[] {
  return items.map((item) => ({ ...item, quantity: quantities[item.id] ?? item.quantity }));
}
