import type { MetadataRoute } from "next";
import { DECISION_GUIDES, DECISION_GUIDE_DIRECTORIES } from "@/lib/decision-guides";
import { legalContactComplete } from "@/lib/legal";
import { CONTENT_UPDATED_AT } from "@/lib/metadata";
import { PROJECT_EXAMPLES, PROJECT_EXAMPLE_DIRECTORIES } from "@/lib/project-examples";
import { SEO_GUIDES } from "@/lib/seo-guides";
import { SEO_TOPICS } from "@/lib/seo-topics";
import { SITE } from "@/lib/site";

export type SitemapEntry = MetadataRoute.Sitemap[number];

export type SitemapSegment = {
  id: string;
  label: string;
  entries: readonly SitemapEntry[];
};

const SITE_URL = SITE.url.replace(/\/$/, "");
const PROJECT_PROFILES_UPDATED_AT = "2026-08-16";
const DECISION_GUIDES_UPDATED_AT = "2026-08-20";

const CORE_PATHS = [
  "", "/rechner", "/garten", "/ratgeber",
  "/garten/gartenhaus-planer", "/garten/gartenhaus-groesse", "/garten/gartenhaus-fundament", "/garten/gartenhaus-kosten", "/garten/gartenhaus-fuer-fahrraeder", "/garten/gartenhaus-boden", "/garten/gartenhaus-zubehoer",
  "/garten/bewaesserungs-planer", "/garten/bewaesserung-durchfluss-messen", "/garten/tropfbewaesserung-hecke", "/garten/rasenbewaesserung-planen", "/garten/bewaesserungscomputer-zonen",
  "/garten/terrassen-dielen-rechner", "/garten/terrassendielen-verschnitt-fugen", "/garten/terrasse-unterkonstruktion", "/garten/terrasse-kosten",
  "/garten/sichtschutz-planer", "/garten/sichtschutz-elemente-berechnen", "/garten/sichtschutz-pfosten-fundament", "/garten/sichtschutz-gartentor-planen",
  "/garten/gewaechshaus-planer", "/garten/gewaechshaus-groesse", "/garten/gewaechshaus-fundament", "/garten/gewaechshaus-belueftung",
  "/garten/maehroboter-rechner", "/garten/maehroboter-flaeche-berechnen", "/garten/maehroboter-steigung-engstellen", "/garten/maehroboter-begrenzungskabel-kabellos",
  "/garten/carport-planer", "/garten/carport-groesse", "/garten/carport-fundament", "/garten/carport-dachentwaesserung",
  "/haus", "/haus/boden", "/haus/boden/bodenbelag-rechner", "/haus/boden/laminat-verschnitt-berechnen", "/haus/boden/untergrund-trittschall", "/haus/boden/sockelleisten-berechnen",
  "/haus/innenausbau", "/haus/innenausbau/trockenbau-rechner", "/haus/innenausbau/trockenbau-platten-berechnen", "/haus/innenausbau/trockenbau-profile-staenderwerk", "/haus/innenausbau/trockenbau-tuer-oeffnungen",
  "/haus/raumklima", "/haus/raumklima/luftentfeuchter-rechner", "/haus/raumklima/luftentfeuchter-keller", "/haus/raumklima/luftentfeuchter-stromverbrauch", "/haus/raumklima/luftentfeuchter-waesche",
  "/methodik", "/ueber-passendplanen", "/affiliate-transparenz",
] as const;

function entry(path: string, lastModified: string): SitemapEntry {
  return {
    url: `${SITE_URL}${path}/`,
    lastModified: new Date(lastModified),
  };
}

const corePaths = [
  ...CORE_PATHS,
  ...SEO_TOPICS.map((topic) => `/ratgeber/thema/${topic.slug}`),
  ...PROJECT_EXAMPLE_DIRECTORIES.map((directory) => `/ratgeber/projekte/${directory.topicSlug}`),
  "/ratgeber/vergleiche",
  ...DECISION_GUIDE_DIRECTORIES.map((directory) => `/ratgeber/vergleiche/${directory.topicSlug}`),
  ...(legalContactComplete ? ["/impressum", "/datenschutz"] : []),
];

export const SITEMAP_SEGMENTS: readonly SitemapSegment[] = [
  {
    id: "core",
    label: "Kernseiten und Themenverzeichnisse",
    entries: corePaths.map((path) => entry(path, CONTENT_UPDATED_AT)),
  },
  {
    id: "redaktionelle-ratgeber",
    label: "Redaktionelle Ratgeber",
    entries: SEO_GUIDES.map((guide) => entry(`/ratgeber/${guide.slug}`, CONTENT_UPDATED_AT)),
  },
  ...SEO_TOPICS.map((topic) => ({
    id: `projektprofile-${topic.slug}`,
    label: `Projektprofile: ${topic.name}`,
    entries: PROJECT_EXAMPLES
      .filter((example) => example.topicSlug === topic.slug)
      .map((example) => entry(`/ratgeber/projekte/${example.topicSlug}/${example.slug}`, PROJECT_PROFILES_UPDATED_AT)),
  })),
  ...SEO_TOPICS.map((topic) => ({
    id: `vergleiche-${topic.slug}`,
    label: `Direktvergleiche: ${topic.name}`,
    entries: DECISION_GUIDES
      .filter((guide) => guide.topicSlug === topic.slug)
      .map((guide) => entry(`/ratgeber/vergleiche/${guide.topicSlug}/${guide.slug}`, DECISION_GUIDES_UPDATED_AT)),
  })),
];

export const ALL_SITEMAP_ENTRIES: MetadataRoute.Sitemap = SITEMAP_SEGMENTS.flatMap((segment) => segment.entries);

export const SITEMAP_INDEX_URL = `${SITE_URL}/sitemaps/index.xml`;

export function sitemapSegmentUrl(segment: SitemapSegment) {
  return `${SITE_URL}/sitemaps/${segment.id}.xml`;
}
