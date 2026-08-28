"use client";

import { useEffect, useState } from "react";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { CatalogMatchList } from "@/components/product/CatalogMatchList";
import { loadProjectCatalog } from "@/lib/catalog/load-client-catalog";
import { recommendProjectProducts } from "@/lib/project-products/recommend";
import type { ProjectCatalog, ProjectProductKind, ProjectVertical } from "@/lib/project-products/types";

export function ProjectProductRecommendations({ vertical, preferredKinds }: { vertical: ProjectVertical; preferredKinds?: readonly ProjectProductKind[] }) {
  const [catalog, setCatalog] = useState<ProjectCatalog | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    loadProjectCatalog(controller.signal).then(setCatalog).catch(() => setCatalog(null));
    return () => controller.abort();
  }, []);
  const matches = catalog ? recommendProjectProducts(catalog, vertical, preferredKinds) : [];
  return <section className="recommendation-section"><p className="eyebrow">Geprüfte Angebote</p><h3>Passende Produkte</h3><p>Die Auswahl stammt aus aktiven Händlerfeeds und wird nach dem Projektbereich und der benötigten Produktgruppe sortiert.</p><AffiliateDisclosure /><CatalogMatchList matches={matches} emptyLabel="Geprüfte Affiliate-Produkte werden geladen oder sind für diesen Bereich noch nicht verfügbar." /></section>;
}
