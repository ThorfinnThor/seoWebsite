import type { OfferBase, MatchReason } from "@/lib/catalog/types";
import type { ProjectCatalog, ProjectMatch, ProjectProductKind, ProjectVertical } from "./types";

export function recommendProjectProducts(catalog: ProjectCatalog, vertical: ProjectVertical, preferredKinds: readonly ProjectProductKind[] = []): ProjectMatch[] {
  const offersByProduct = new Map<string, OfferBase>();
  for (const offer of catalog.offers) if (offer.available && !offersByProduct.has(offer.productId)) offersByProduct.set(offer.productId, offer);
  const priority = new Map(preferredKinds.map((kind, index) => [kind, preferredKinds.length - index]));
  return catalog.products.flatMap((product) => {
    if (product.vertical !== vertical) return [];
    const offer = offersByProduct.get(product.id);
    if (!offer) return [];
    const preferred = priority.get(product.kind) ?? 0;
    const reasons: MatchReason[] = [{ code: "vertical", label: `Für ${verticalLabel(vertical)} geeignet`, strength: "required" }];
    if (preferred) reasons.push({ code: "component", label: "Passt zu einer berechneten Produktgruppe", strength: "positive" });
    else reasons.push({ code: "component", label: "Ergänzung für das Projekt", strength: "warning" });
    return [{ product, offer, score: preferred * 10, reasons }];
  }).sort((a, b) => b.score - a.score || a.offer.priceEur - b.offer.priceEur).slice(0, 8);
}

function verticalLabel(vertical: ProjectVertical): string {
  return { carport: "Carport-Projekt", greenhouse: "Gewächshaus-Projekt", "privacy-screen": "Sichtschutz-Projekt", terrace: "Terrassen-Projekt", drywall: "Trockenbau-Projekt" }[vertical];
}
