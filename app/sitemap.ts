import type { MetadataRoute } from "next";
import { legalContactComplete } from "@/lib/legal";
import { CONTENT_UPDATED_AT } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { SEO_GUIDES } from "@/lib/seo-guides";
import { SEO_TOPICS } from "@/lib/seo-topics";
import { PROJECT_EXAMPLES, PROJECT_EXAMPLE_DIRECTORIES } from "@/lib/project-examples";
export const dynamic = "force-static";
const siteUrl = SITE.url.replace(/\/$/, "");
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: string[] = ["", "/rechner", "/garten", "/ratgeber", "/garten/gartenhaus-planer", "/garten/gartenhaus-groesse", "/garten/gartenhaus-fundament", "/garten/gartenhaus-kosten", "/garten/gartenhaus-fuer-fahrraeder", "/garten/gartenhaus-boden", "/garten/gartenhaus-zubehoer", "/garten/bewaesserungs-planer", "/garten/bewaesserung-durchfluss-messen", "/garten/tropfbewaesserung-hecke", "/garten/rasenbewaesserung-planen", "/garten/bewaesserungscomputer-zonen", "/garten/terrassen-dielen-rechner", "/garten/terrassendielen-verschnitt-fugen", "/garten/terrasse-unterkonstruktion", "/garten/terrasse-kosten", "/garten/sichtschutz-planer", "/garten/sichtschutz-elemente-berechnen", "/garten/sichtschutz-pfosten-fundament", "/garten/sichtschutz-gartentor-planen", "/garten/gewaechshaus-planer", "/garten/gewaechshaus-groesse", "/garten/gewaechshaus-fundament", "/garten/gewaechshaus-belueftung", "/garten/maehroboter-rechner", "/garten/maehroboter-flaeche-berechnen", "/garten/maehroboter-steigung-engstellen", "/garten/maehroboter-begrenzungskabel-kabellos", "/garten/carport-planer", "/garten/carport-groesse", "/garten/carport-fundament", "/garten/carport-dachentwaesserung", "/haus", "/haus/boden", "/haus/boden/bodenbelag-rechner", "/haus/boden/laminat-verschnitt-berechnen", "/haus/boden/untergrund-trittschall", "/haus/boden/sockelleisten-berechnen", "/haus/innenausbau", "/haus/innenausbau/trockenbau-rechner", "/haus/innenausbau/trockenbau-platten-berechnen", "/haus/innenausbau/trockenbau-profile-staenderwerk", "/haus/innenausbau/trockenbau-tuer-oeffnungen", "/haus/raumklima", "/haus/raumklima/luftentfeuchter-rechner", "/haus/raumklima/luftentfeuchter-keller", "/haus/raumklima/luftentfeuchter-stromverbrauch", "/haus/raumklima/luftentfeuchter-waesche", "/methodik", "/ueber-passendplanen", "/affiliate-transparenz"];
  paths.push(...SEO_GUIDES.map((guide) => `/ratgeber/${guide.slug}`));
  paths.push(...SEO_TOPICS.map((topic) => `/ratgeber/thema/${topic.slug}`));
  paths.push(...PROJECT_EXAMPLE_DIRECTORIES.map((directory) => `/ratgeber/projekte/${directory.topicSlug}`));
  paths.push(...PROJECT_EXAMPLES.map((example) => `/ratgeber/projekte/${example.topicSlug}/${example.slug}`));
  if (legalContactComplete) paths.push("/impressum", "/datenschutz");
  return paths.map((path, index) => ({ url: `${siteUrl}${path}/`, lastModified: new Date(CONTENT_UPDATED_AT), changeFrequency: index < 3 ? "weekly" : "monthly", priority: index === 0 ? 1 : index < 3 ? .9 : .7 }));
}
