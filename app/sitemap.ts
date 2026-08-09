import type { MetadataRoute } from "next";
export const dynamic = "force-static";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://machplan.example").replace(/\/$/, "");
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/garten", "/garten/gartenhaus-planer", "/garten/gartenhaus-groesse", "/garten/gartenhaus-fundament", "/garten/gartenhaus-kosten", "/garten/gartenhaus-fuer-fahrraeder", "/garten/gartenhaus-boden", "/garten/gartenhaus-zubehoer"];
  return paths.map((path, index) => ({ url: `${siteUrl}${path}/`, lastModified: new Date("2026-08-09"), changeFrequency: index < 3 ? "weekly" : "monthly", priority: index === 0 ? 1 : index < 3 ? .9 : .7 }));
}
