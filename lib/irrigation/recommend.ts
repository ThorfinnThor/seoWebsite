import type { OfferBase, MatchReason } from "@/lib/catalog/types";
import type { IrrigationCatalog, IrrigationInput, IrrigationMatch, IrrigationPlan } from "./types";

const KIND_PRIORITY: Record<IrrigationProduct["kind"], number> = {
  controller: 6, valve: 5, dripline: 5, sprinkler: 5, filter: 4, "pressure-reducer": 4, sensor: 4, pipe: 3, connector: 2,
};

type IrrigationProduct = IrrigationCatalog["products"][number];

export function recommendIrrigation(catalog: IrrigationCatalog, input: IrrigationInput, plan: IrrigationPlan): IrrigationMatch[] {
  const offersByProduct = new Map<string, OfferBase>();
  for (const offer of catalog.offers) if (offer.available && !offersByProduct.has(offer.productId)) offersByProduct.set(offer.productId, offer);
  const wanted = new Set(plan.components.map((component) => component.kind));
  return catalog.products.flatMap((product) => {
    const offer = offersByProduct.get(product.id);
    if (!offer) return [];
    const reasons: MatchReason[] = [];
    let score = 0;
    const relevant = wanted.has(product.kind) || (product.kind === "controller" && input.automaticControl);
    if (relevant) { reasons.push({ code: "component", label: "Passt zu deinem Komponentenplan", strength: "positive" }); score += 5; }
    else reasons.push({ code: "component", label: "Ergänzung für das Bewässerungssystem", strength: "warning" });
    if (input.smartControl && product.smartCompatible) { reasons.push({ code: "smart", label: "Smarte Steuerung bestätigt", strength: "positive" }); score += 2; }
    if (input.automaticControl && product.kind === "controller" && product.maxZones && product.maxZones >= plan.controllerZones) { reasons.push({ code: "zones", label: `Mindestens ${product.maxZones} Zonen`, strength: "positive" }); score += 3; }
    if (product.systemId) { reasons.push({ code: "system", label: `System ${product.systemId}`, strength: "positive" }); score += 1; }
    if (offer.priceEur <= input.budgetMaxEur) { reasons.push({ code: "budget", label: "Innerhalb des eingegebenen Budgetrahmens", strength: "positive" }); score += 1; }
    return [{ product, offer, score: score + KIND_PRIORITY[product.kind] / 10, reasons }];
  }).sort((a, b) => b.score - a.score || a.offer.priceEur - b.offer.priceEur).slice(0, 8);
}
