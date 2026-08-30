import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/lib/site";
import { SOCIAL_IMAGE_SIZE, socialImageForPath } from "@/lib/social-images";

export const CONTENT_UPDATED_AT = "2026-08-29";

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
  const socialImage = socialImageForPath(canonical);
  const socialImages = [{ url: socialImage, ...SOCIAL_IMAGE_SIZE, alt: `${title} bei ${SITE.name}` }];

  return {
    title,
    description,
    alternates: { canonical },
    authors: [{ name: "Schayan Yousefian", url: absoluteUrl("/ueber-passendplanen/") }],
    ...(robots ? { robots } : {}),
    openGraph: {
      type: article ? "article" : "website",
      locale: "de_DE",
      siteName: SITE.name,
      title,
      description,
      url: canonical,
      images: socialImages,
      ...(article
        ? {
            modifiedTime: CONTENT_UPDATED_AT,
            authors: [absoluteUrl("/ueber-passendplanen/")],
          }
        : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}
