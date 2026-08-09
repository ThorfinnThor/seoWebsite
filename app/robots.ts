import type { MetadataRoute } from "next";
export const dynamic = "force-static";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://machplan.example").replace(/\/$/, "");
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/data/"] }, sitemap: `${siteUrl}/sitemap.xml` }; }
