"use client";

import { useEffect, useState } from "react";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { CatalogMatchList } from "@/components/product/CatalogMatchList";
import { loadProjectCatalog } from "@/lib/catalog/load-client-catalog";
import { recommendProjectProducts } from "@/lib/project-products/recommend";
import type { ProjectRequirements } from "@/lib/project-products/requirements";
import type { ProjectCatalog } from "@/lib/project-products/types";

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
  return <section className="recommendation-section"><p className="eyebrow">Geprüfte Angebote</p><h3>{technicalMatches.length ? "Technisch passende Produkte" : "Geprüfte Kategorieangebote"}</h3><p>Die Auswahl nutzt die Maße und Mengen aus deiner Berechnung. Wo technische Produktdaten fehlen, wird das Angebot ausdrücklich nur als Kategorieprodukt gezeigt.</p><AffiliateDisclosure /><CatalogMatchList matches={technicalMatches} emptyLabel="Für diese Berechnung ist derzeit kein Angebot mit ausreichend bestätigten technischen Daten verfügbar." />{relatedMatches.length > 0 && <div className="recommendation-section__related"><h3>Alternativen und mögliche Ergänzungen</h3><p>Diese Angebote gehören zum Projektbereich, sind aber nicht als technischer Match bestätigt.</p><CatalogMatchList matches={relatedMatches} emptyLabel="Keine weiteren geprüften Kategorieangebote verfügbar." /></div>}</section>;
}
