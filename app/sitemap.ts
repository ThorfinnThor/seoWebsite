import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
export const dynamic = "force-static";
const siteUrl = SITE.url.replace(/\/$/, "");
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/garten", "/garten/gartenhaus-planer", "/garten/gartenhaus-groesse", "/garten/gartenhaus-fundament", "/garten/gartenhaus-kosten", "/garten/gartenhaus-fuer-fahrraeder", "/garten/gartenhaus-boden", "/garten/gartenhaus-zubehoer", "/garten/bewaesserungs-planer", "/haus/raumklima", "/haus/raumklima/luftentfeuchter-rechner", "/haus/raumklima/luftentfeuchter-keller", "/haus/raumklima/luftentfeuchter-stromverbrauch", "/haus/raumklima/luftentfeuchter-waesche", "/methodik", "/ueber-machplan", "/affiliate-transparenz"];
  return paths.map((path, index) => ({ url: `${siteUrl}${path}/`, lastModified: new Date("2026-08-09"), changeFrequency: index < 3 ? "weekly" : "monthly", priority: index === 0 ? 1 : index < 3 ? .9 : .7 }));
}
