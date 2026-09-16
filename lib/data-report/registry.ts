export const DATA_REPORTS = [
  {
    slug: "gartenhaus-preise-groessen",
    topic: "gartenhaus",
    eyebrow: "Gartenhäuser im Datencheck",
    title: "Was Größe, Material und Preis im aktuellen Gartenhauskatalog zeigen",
    description: "Eine datenbasierte Einordnung von Grundflächen, Materialien, Dachformen und Angebotspreisen mit offen ausgewiesenen Datenlücken.",
    path: "/ratgeber/daten/gartenhaus-preise-groessen/",
    updatedAt: "2026-09-16",
  },
  {
    slug: "bodenbelaege-fussbodenheizung-feuchtraum",
    topic: "bodenbelag",
    eyebrow: "Bodenbeläge im Datencheck",
    title: "Fußbodenheizung, Feuchtraum und Paketmengen im Datenvergleich",
    description: "Laminat, Klickvinyl und Fertigparkett nach dokumentierten Freigaben, Paketgrößen und einer konkreten Materialrechnung vergleichen.",
    path: "/ratgeber/daten/bodenbelaege-fussbodenheizung-feuchtraum/",
    updatedAt: "2026-09-16",
  },
  {
    slug: "luftentfeuchter-leistung-lautstaerke",
    topic: "luftentfeuchter",
    eyebrow: "Luftentfeuchter im Datencheck",
    title: "Welche Leistungsdaten bei Luftentfeuchtern wirklich vergleichbar sind",
    description: "Entfeuchtungsleistung, Geräusch, Stromaufnahme und Betriebstemperatur anhand der tatsächlich dokumentierten Produktdaten einordnen.",
    path: "/ratgeber/daten/luftentfeuchter-leistung-lautstaerke/",
    updatedAt: "2026-09-16",
  },
  {
    slug: "maehroboter-navigation-flaechenleistung",
    topic: "maehroboter",
    eyebrow: "Mähroboter im Datencheck",
    title: "Navigation, Flächenleistung und Engstellen bei 15 Mährobotern",
    description: "Kabel, Kamera, LiDAR, RTK und hybride Navigation anhand der dokumentierten Flächenleistung, Steigung, Engstellen und Angebotspreise einordnen.",
    path: "/ratgeber/daten/maehroboter-navigation-flaechenleistung/",
    updatedAt: "2026-09-16",
  },
  {
    slug: "sicherheitskameras-verbindung-strom-setgroesse",
    topic: "sicherheitskameras",
    eyebrow: "Sicherheitskameras im Datencheck",
    title: "Verbindung, Stromversorgung und Setgröße bei 20 Kameras",
    description: "WLAN, PoE und Mobilfunk gemeinsam mit der Stromversorgung betrachten und die Produktkosten für vier Überwachungszonen nachvollziehen.",
    path: "/ratgeber/daten/sicherheitskameras-verbindung-strom-setgroesse/",
    updatedAt: "2026-09-16",
  },
  {
    slug: "bewaesserung-komponenten-systeme",
    topic: "bewaesserung",
    eyebrow: "Bewässerung im Datencheck",
    title: "84 Bewässerungsprodukte zeigen, warum Einzelteile noch kein System ergeben",
    description: "Rohre, Verbinder, Regner, Tropfleitungen und Steuerungen nach Sortimentsschwerpunkt und dokumentierter Planungstiefe untersuchen.",
    path: "/ratgeber/daten/bewaesserung-komponenten-systeme/",
    updatedAt: "2026-09-16",
  },
] as const;

export function getDataReportsForTopic(topic: string) {
  return DATA_REPORTS.filter((report) => report.topic === topic);
}
