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
      openGraph: { type: "website", url: "/garten/testseite/" },
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
