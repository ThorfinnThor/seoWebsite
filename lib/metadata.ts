import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/lib/site";

export const CONTENT_UPDATED_AT = "2026-08-10";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  kind?: "website" | "article";
  robots?: Metadata["robots"];
}

function canonicalPath(path: string) {
  if (path === "/") return "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${normalized.replace(/\/+$/, "")}/`;
}

export function createPageMetadata({
  title,
  description,
  path,
  kind = "website",
  robots,
}: PageMetadataInput): Metadata {
  const canonical = canonicalPath(path);
  const article = kind === "article";

  return {
    title,
    description,
    alternates: { canonical },
    authors: [{ name: "Schayan Yousefian", url: absoluteUrl("/ueber-machplan/") }],
    ...(robots ? { robots } : {}),
    openGraph: {
      type: article ? "article" : "website",
      locale: "de_DE",
      siteName: SITE.name,
      title,
      description,
      url: canonical,
      ...(article
        ? {
            modifiedTime: CONTENT_UPDATED_AT,
            authors: [absoluteUrl("/ueber-machplan/")],
          }
        : {}),
    },
    twitter: { card: "summary", title, description },
  };
}
