"use client";

import { useEffect, useState } from "react";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { CatalogMatchList } from "@/components/product/CatalogMatchList";
import { loadIrrigationCatalog } from "@/lib/catalog/load-client-catalog";
import { recommendIrrigation } from "@/lib/irrigation/recommend";
import type { IrrigationCatalog, IrrigationInput, IrrigationPlan } from "@/lib/irrigation/types";
import { useProductResultTracking } from "@/lib/analytics";

export function IrrigationCatalogRecommendations({ input, plan }: { input: IrrigationInput; plan: IrrigationPlan }) {
  const [catalog, setCatalog] = useState<IrrigationCatalog | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    loadIrrigationCatalog(controller.signal).then(setCatalog).catch(() => setCatalog(null));
    return () => controller.abort();
  }, []);
  const matches = catalog ? recommendIrrigation(catalog, input, plan) : [];
  useProductResultTracking({ planner: "irrigation", ready: catalog !== null, matchCount: matches.length });
  return <section className="recommendation-section"><p className="eyebrow">Geprüfte Angebote</p><h3>Passende Bewässerungskomponenten</h3><p>Die Auswahl ordnet verfügbare Komponenten deinem Bewässerungsplan zu. Systemkompatibilität und Hydraulik bleiben vor dem Kauf zu prüfen.</p><AffiliateDisclosure /><CatalogMatchList planner="irrigation" matches={matches} emptyLabel="Geprüfte Bewässerungsangebote werden geladen oder sind für diesen Plan noch nicht verfügbar." /></section>;
}
