import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SITEMAP_INDEX_URL } from "@/lib/sitemap-entries";

export const dynamic = "force-static";
const siteUrl = SITE.url.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/data/"] },
    sitemap: [`${siteUrl}/sitemap.xml`, SITEMAP_INDEX_URL],
  };
}
