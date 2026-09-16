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
] as const;

export function getDataReportsForTopic(topic: string) {
  return DATA_REPORTS.filter((report) => report.topic === topic);
}
