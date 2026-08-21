import type { OfferBase, MatchReason } from "@/lib/catalog/types";
import type { RobotMowerCatalog, RobotMowerInput, RobotMowerMatch, RobotMowerPlan } from "./types";

export function recommendRobotMowers(catalog: RobotMowerCatalog, input: RobotMowerInput, plan: RobotMowerPlan): RobotMowerMatch[] {
  const offersByProduct = new Map<string, OfferBase>();
  for (const offer of catalog.offers) if (offer.available && !offersByProduct.has(offer.productId)) offersByProduct.set(offer.productId, offer);
  return catalog.products.flatMap((product) => {
    const offer = offersByProduct.get(product.id);
    if (!offer) return [];
    const reasons: MatchReason[] = [];
    let score = 0;
    if (product.ratedAreaM2 === undefined || product.ratedAreaM2 >= plan.requiredRatedAreaM2) { reasons.push({ code: "capacity", label: product.ratedAreaM2 ? `Nennfläche mindestens ${product.ratedAreaM2} m²` : "Nennfläche redaktionell noch zu bestätigen", strength: product.ratedAreaM2 ? "required" : "warning" }); score += product.ratedAreaM2 ? 3 : 0; } else return [];
    if (product.maxSlopePercent === undefined || product.maxSlopePercent >= input.maximumSlopePercent) { reasons.push({ code: "slope", label: product.maxSlopePercent ? `bis ${product.maxSlopePercent}% Steigung` : "Steigungsgrenze redaktionell noch zu bestätigen", strength: product.maxSlopePercent ? "required" : "warning" }); score += product.maxSlopePercent ? 2 : 0; } else return [];
    if (product.minPassageCm === undefined || product.minPassageCm <= input.narrowestPassageCm) { reasons.push({ code: "passage", label: product.minPassageCm ? `Passagen ab ${product.minPassageCm} cm` : "Passagenbreite redaktionell noch zu bestätigen", strength: product.minPassageCm ? "positive" : "warning" }); score += product.minPassageCm ? 1 : 0; } else return [];
    if (input.boundarySystem === "wire" && product.navigation === "wire") { reasons.push({ code: "navigation", label: "Für Begrenzungskabel ausgelegt", strength: "positive" }); score += 2; }
    else if (input.boundarySystem === "wireless" && ["rtk", "lidar", "camera", "hybrid"].includes(product.navigation)) { reasons.push({ code: "navigation", label: "Kabellose Navigation möglich – Empfang vor Ort prüfen", strength: "positive" }); score += 2; }
    else if (input.boundarySystem === "undecided") reasons.push({ code: "navigation", label: "Navigationsprinzip im Projektvergleich prüfen", strength: "warning" });
    return [{ product, offer, score, reasons }];
  }).sort((a, b) => b.score - a.score || a.offer.priceEur - b.offer.priceEur).slice(0, 8);
}
