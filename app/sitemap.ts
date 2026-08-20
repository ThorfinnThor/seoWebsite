import type { MetadataRoute } from "next";
import { ALL_SITEMAP_ENTRIES } from "@/lib/sitemap-entries";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_SITEMAP_ENTRIES;
}
