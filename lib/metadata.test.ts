import { describe, expect, it } from "vitest";
import { CONTENT_UPDATED_AT, createPageMetadata } from "./metadata";

describe("createPageMetadata", () => {
  it("normalisiert Canonical- und Open-Graph-URLs", () => {
    const metadata = createPageMetadata({
      title: "Testseite",
      description: "Eine eindeutige Beschreibung.",
      path: "/garten/testseite/",
    });

    expect(metadata).toMatchObject({
      alternates: { canonical: "/garten/testseite/" },
      openGraph: { type: "website", url: "/garten/testseite/", images: [{ url: "/social/passendplanen.png", width: 1200, height: 630 }] },
      twitter: { card: "summary_large_image", images: ["/social/passendplanen.png"] },
    });
  });

  it("ordnet Themenseiten einer passenden Social Preview zu", () => {
    const metadata = createPageMetadata({
      title: "Mähroboter für kleine Flächen",
      description: "Ein konkreter Flächencheck.",
      path: "/garten/maehroboter-flaeche-berechnen/",
    });

    expect(metadata).toMatchObject({
      openGraph: { images: [{ url: "/social/robot-mower.png" }] },
      twitter: { images: ["/social/robot-mower.png"] },
    });
  });

  it("kennzeichnet Ratgeber als aktuelle Artikel", () => {
    const metadata = createPageMetadata({
      title: "Ratgeber",
      description: "Ein nachvollziehbarer Ratgeber.",
      path: "ratgeber",
      kind: "article",
    });

    expect(metadata).toMatchObject({
      alternates: { canonical: "/ratgeber/" },
      openGraph: { type: "article", modifiedTime: CONTENT_UPDATED_AT },
    });
  });

  it("übernimmt noindex-Regeln für unfertige Rechtstexte", () => {
    const metadata = createPageMetadata({
      title: "Entwurf",
      description: "Noch nicht veröffentlichen.",
      path: "/entwurf/",
      robots: { index: false, follow: true },
    });

    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});
