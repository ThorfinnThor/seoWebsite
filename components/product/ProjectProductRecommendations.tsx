"use client";

import { useEffect, useState } from "react";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { CatalogMatchList } from "@/components/product/CatalogMatchList";
import { loadProjectCatalog } from "@/lib/catalog/load-client-catalog";
import { recommendProjectProducts } from "@/lib/project-products/recommend";
import type { ProjectRequirements } from "@/lib/project-products/requirements";
import type { ProjectCatalog } from "@/lib/project-products/types";
import { useProductResultTracking } from "@/lib/analytics";

export function ProjectProductRecommendations({ requirements }: { requirements: ProjectRequirements }) {
  const [catalog, setCatalog] = useState<ProjectCatalog | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    loadProjectCatalog(controller.signal).then(setCatalog).catch(() => setCatalog(null));
    return () => controller.abort();
  }, []);
  const matches = catalog ? recommendProjectProducts({ catalog, requirements }) : [];
  const technicalMatches = matches.filter((match) => match.confidence === "exact" || match.confidence === "compatible");
  const relatedMatches = matches.filter((match) => match.confidence === "category" || match.confidence === "supplement");
  useProductResultTracking({ planner: requirements.vertical, ready: catalog !== null, matchCount: matches.length, technicalMatchCount: technicalMatches.length });
  return <section className="recommendation-section" id="angebote"><h3>{technicalMatches.length ? "Produkte, die zu deinen Maßen passen" : "Produkte für dein Projekt"}</h3>{technicalMatches.length === 0 && <p>Die Händler nennen hier nicht alle Maße. Vergleiche vor dem Kauf mit deiner Berechnung.</p>}<AffiliateDisclosure /><CatalogMatchList planner={requirements.vertical} matches={technicalMatches.length ? technicalMatches : relatedMatches} emptyLabel="Für diese Berechnung haben wir gerade kein passendes Angebot." />{technicalMatches.length > 0 && relatedMatches.length > 0 && <div className="recommendation-section__related"><h3>Ergänzungen</h3><p>Gehört zum Projekt, die genauen Maße nennt der Händler nicht.</p><CatalogMatchList planner={requirements.vertical} matches={relatedMatches} emptyLabel="" /></div>}</section>;
}
