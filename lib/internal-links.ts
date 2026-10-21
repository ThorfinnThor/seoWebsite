import { DATA_REPORTS } from "@/lib/data-report/registry";
import { INDEXABLE_DECISION_GUIDES } from "@/lib/decision-guides";
import { INDEXABLE_PROJECT_EXAMPLES } from "@/lib/project-examples";
import { SEO_GUIDES } from "@/lib/seo-guides";
import { getGuidesForTopic, getSeoTopic, SEO_TOPICS, type SeoTopic } from "@/lib/seo-topics";

export type TopicLink = { href: string; label: string; description?: string };

export type TopicLinkGroup = { id: "basics" | "guides" | "evidence"; title: string; links: readonly TopicLink[] };

type TopicCluster = {
  /** Area hub that lists the calculator and its hand-written guides. */
  hub: TopicLink;
  /** Hand-written calculator-adjacent guides outside /ratgeber/. */
  pages: readonly TopicLink[];
};

/**
 * Hand-written guides that sit next to each calculator. These pages are part of
 * the sitemap core segment; the registry lets calculators, Ratgeber articles and
 * topic directories link to them consistently.
 */
export const TOPIC_CLUSTERS: Readonly<Record<string, TopicCluster>> = {
  gartenhaus: {
    hub: { href: "/garten/", label: "Garten planen" },
    pages: [
      { href: "/garten/gartenhaus-groesse/", label: "Gartenhaus-Größe", description: "Vom Lagerbedarf zur realistischen Mindestfläche." },
      { href: "/garten/gartenhaus-fundament/", label: "Gartenhaus-Fundament", description: "Welche Grundlage zu welchem Standort passen kann." },
      { href: "/garten/gartenhaus-kosten/", label: "Gartenhaus-Kosten", description: "Kaufpreis, Lieferung, Fundament und Folgekosten." },
      { href: "/garten/gartenhaus-fuer-fahrraeder/", label: "Gartenhaus für Fahrräder", description: "Türbreite, Rangierfläche und sichere Aufbewahrung." },
      { href: "/garten/gartenhaus-boden/", label: "Gartenhaus-Boden", description: "Enthalten, separat erhältlich oder selbst geplant." },
      { href: "/garten/gartenhaus-zubehoer/", label: "Gartenhaus-Zubehör", description: "Was direkt gebraucht wird und was warten kann." },
    ],
  },
  bewaesserung: {
    hub: { href: "/garten/", label: "Garten planen" },
    pages: [
      { href: "/garten/bewaesserung-durchfluss-messen/", label: "Durchfluss messen", description: "Eimertest und Fließdruck als Planungsbasis." },
      { href: "/garten/tropfbewaesserung-hecke/", label: "Tropfbewässerung für Hecken", description: "Länge, Reserve, Filter, Druckminderung und Zonen." },
      { href: "/garten/rasenbewaesserung-planen/", label: "Rasenbewässerung planen", description: "Geometrie, Überlappung, Anschlussleistung und Grenzen." },
      { href: "/garten/bewaesserungscomputer-zonen/", label: "Bewässerungscomputer und Zonen", description: "Verbraucher sinnvoll trennen und Controller auswählen." },
    ],
  },
  terrasse: {
    hub: { href: "/garten/", label: "Garten planen" },
    pages: [
      { href: "/garten/terrassendielen-verschnitt-fugen/", label: "Terrassendielen, Verschnitt und Fugen", description: "Verlegebreite, Lieferlängen und Stoßbild zusammenbringen." },
      { href: "/garten/terrasse-unterkonstruktion/", label: "Terrassen-Unterkonstruktion", description: "Auflagerabstand, Stoßstellen und Wasserführung einordnen." },
      { href: "/garten/terrasse-kosten/", label: "Terrassen-Kosten", description: "Belag, Unterbau, Befestigung und Lieferung budgetieren." },
    ],
  },
  sichtschutz: {
    hub: { href: "/garten/", label: "Garten planen" },
    pages: [
      { href: "/garten/sichtschutz-elemente-berechnen/", label: "Sichtschutz-Elemente berechnen", description: "Systemmaß, Pfostenachsen und Randfeld einordnen." },
      { href: "/garten/sichtschutz-pfosten-fundament/", label: "Sichtschutz-Pfosten und Fundament", description: "Stückzahl, Verankerung und Windangriffsfläche trennen." },
      { href: "/garten/sichtschutz-gartentor-planen/", label: "Gartentor im Sichtschutz", description: "Durchgang, Öffnungsrichtung, Torpfosten und Raster." },
    ],
  },
  gewaechshaus: {
    hub: { href: "/garten/", label: "Garten planen" },
    pages: [
      { href: "/garten/gewaechshaus-groesse/", label: "Gewächshaus-Größe", description: "Beete, Wege, Tür und Nutzung in ein Innenraster übersetzen." },
      { href: "/garten/gewaechshaus-fundament/", label: "Gewächshaus-Fundament", description: "Basisprofil, Gründung, Entwässerung und Verankerung." },
      { href: "/garten/gewaechshaus-belueftung/", label: "Gewächshaus-Belüftung", description: "Dachfenster, Querlüftung, Öffner und Schatten." },
    ],
  },
  maehroboter: {
    hub: { href: "/garten/", label: "Garten planen" },
    pages: [
      { href: "/garten/maehroboter-flaeche-berechnen/", label: "Mähfläche berechnen", description: "Teilflächen und Abzüge zu einer Nettofläche verbinden." },
      { href: "/garten/maehroboter-steigung-engstellen/", label: "Steigung und Engstellen", description: "Die schwierigsten Abschnitte richtig messen." },
      { href: "/garten/maehroboter-begrenzungskabel-kabellos/", label: "Begrenzungskabel oder kabellos", description: "Installation, Empfang und Änderungsbedarf vergleichen." },
    ],
  },
  carport: {
    hub: { href: "/garten/", label: "Garten planen" },
    pages: [
      { href: "/garten/carport-groesse/", label: "Carport-Größe planen", description: "Fahrzeug, Türen, Heckklappe, Reserve und Zufahrt." },
      { href: "/garten/carport-fundament/", label: "Carport-Fundament", description: "Lichter Raum, Pfostenraster, Baugrund und Lastabtrag." },
      { href: "/garten/carport-dachentwaesserung/", label: "Carport-Dachentwässerung", description: "Gefälle, Rinne, Fallrohr, Ablaufziel und Überlauf." },
    ],
  },
  bodenbelag: {
    hub: { href: "/haus/boden/", label: "Boden planen" },
    pages: [
      { href: "/haus/boden/laminat-verschnitt-berechnen/", label: "Laminat-Verschnitt berechnen", description: "Nettofläche, Geometrie und Verlegeart zur Bestellmenge machen." },
      { href: "/haus/boden/untergrund-trittschall/", label: "Untergrund und Trittschall", description: "Ebenheit, Feuchte, Unterlage und Fußbodenheizung." },
      { href: "/haus/boden/sockelleisten-berechnen/", label: "Sockelleisten berechnen", description: "Umfang, Türen, Lieferstäbe und Formteile planen." },
    ],
  },
  trockenbau: {
    hub: { href: "/haus/innenausbau/", label: "Innenausbau planen" },
    pages: [
      { href: "/haus/innenausbau/trockenbau-platten-berechnen/", label: "Trockenbau-Platten berechnen", description: "Nettofläche, Seiten, Lagen, Format und Reserve." },
      { href: "/haus/innenausbau/trockenbau-profile-staenderwerk/", label: "CW- und UW-Profile, Ständerwerk", description: "Grundraster, Randprofile und Systemfreigaben." },
      { href: "/haus/innenausbau/trockenbau-tuer-oeffnungen/", label: "Trockenbau mit Türen und Öffnungen", description: "Zusatzprofile, Lasten und Leitungswege koordinieren." },
    ],
  },
  luftentfeuchter: {
    hub: { href: "/haus/raumklima/", label: "Raumklima planen" },
    pages: [
      { href: "/haus/raumklima/luftentfeuchter-keller/", label: "Luftentfeuchter im Keller", description: "Temperaturbereich, Dauerablauf und Grenzen." },
      { href: "/haus/raumklima/luftentfeuchter-stromverbrauch/", label: "Luftentfeuchter-Stromverbrauch", description: "Leistung, Laufzeit und reale Energiekosten." },
      { href: "/haus/raumklima/luftentfeuchter-waesche/", label: "Wäsche trocknen mit Entfeuchter", description: "Raum, Ablauf, Modus und Lüftung zusammendenken." },
    ],
  },
};

function normalizePath(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * Resolves the topic cluster of any page from its URL or its calculator link.
 */
export function resolveTopicForPage(path: string, plannerHref?: string): SeoTopic | undefined {
  const normalized = normalizePath(path);
  const directoryMatch = normalized.match(/^\/ratgeber\/(?:thema|vergleiche|projekte)\/([^/]+)\//);
  if (directoryMatch) return getSeoTopic(directoryMatch[1]);
  const byPlannerPath = SEO_TOPICS.find((topic) => topic.plannerHref === normalized);
  if (byPlannerPath) return byPlannerPath;
  const byClusterPage = Object.entries(TOPIC_CLUSTERS).find(([, cluster]) => cluster.pages.some((page) => page.href === normalized));
  if (byClusterPage) return getSeoTopic(byClusterPage[0]);
  const byGuide = SEO_GUIDES.find((guide) => `/ratgeber/${guide.slug}/` === normalized);
  const href = byGuide?.plannerHref ?? plannerHref;
  return SEO_TOPICS.find((topic) => topic.plannerHref === href)
    ?? Object.entries(TOPIC_CLUSTERS).map(([slug, cluster]) => cluster.pages.some((page) => page.href === href) ? getSeoTopic(slug) : undefined).find(Boolean);
}

/**
 * Builds the contextual link set of a topic. Only indexable targets are
 * included: noindex programmatic examples stay reachable through their
 * directories but are never promoted as related content.
 */
export function getTopicLinkGroups(topicSlug: string, currentPath: string): readonly TopicLinkGroup[] {
  const topic = getSeoTopic(topicSlug);
  if (!topic) return [];
  const current = normalizePath(currentPath);
  const cluster = TOPIC_CLUSTERS[topic.slug];
  const notCurrent = (link: TopicLink) => normalizePath(link.href) !== current;

  const basics: TopicLink[] = [
    { href: topic.plannerHref, label: topic.plannerLabel, description: "Kostenloser Rechner mit nachvollziehbarem Rechenweg." },
    { href: `/ratgeber/thema/${topic.slug}/`, label: `Themenübersicht ${topic.name}`, description: "Alle Rechner, Ratgeber, Vergleiche und Datenauswertungen." },
    ...(cluster?.pages ?? []),
    { href: "/rechner/", label: "Alle kostenlosen Rechner und Planer" },
  ];

  const guides: TopicLink[] = getGuidesForTopic(SEO_GUIDES, topic).map((guide) => ({
    href: `/ratgeber/${guide.slug}/`,
    label: guide.title,
  }));

  const evidence: TopicLink[] = [
    ...INDEXABLE_DECISION_GUIDES.filter((guide) => guide.topicSlug === topic.slug).map((guide) => ({
      href: `/ratgeber/vergleiche/${guide.topicSlug}/${guide.slug}/`,
      label: guide.title,
    })),
    ...INDEXABLE_PROJECT_EXAMPLES.filter((example) => example.topicSlug === topic.slug).map((example) => ({
      href: `/ratgeber/projekte/${example.topicSlug}/${example.slug}/`,
      label: example.title,
    })),
    ...DATA_REPORTS.filter((report) => report.topic === topic.slug).map((report) => ({
      href: report.path,
      label: report.title,
    })),
    { href: `/ratgeber/vergleiche/${topic.slug}/`, label: `Alle Direktvergleiche: ${topic.name}` },
    { href: `/ratgeber/projekte/${topic.slug}/`, label: `Alle Projektbeispiele: ${topic.name}` },
  ];

  return ([
    { id: "basics", title: "Rechner und Grundlagen", links: basics.filter(notCurrent) },
    { id: "guides", title: "Ratgeber und Szenarien", links: guides.filter(notCurrent) },
    { id: "evidence", title: "Vergleiche, Rechenbeispiele und Daten", links: evidence.filter(notCurrent) },
  ] satisfies TopicLinkGroup[]).filter((group) => group.links.length > 0);
}
