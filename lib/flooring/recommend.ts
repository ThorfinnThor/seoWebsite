import type { OfferBase, MatchReason } from "@/lib/catalog/types";
import type { FlooringCatalog, FlooringInput, FlooringMatch } from "./types";

export function recommendFlooring(catalog: FlooringCatalog, input: FlooringInput): FlooringMatch[] {
  const offersByProduct = new Map<string, OfferBase>();
  for (const offer of catalog.offers) if (offer.available && !offersByProduct.has(offer.productId)) offersByProduct.set(offer.productId, offer);
  return catalog.products.flatMap((product) => {
    if (product.flooringType !== input.flooringType) return [];
    const offer = offersByProduct.get(product.id);
    if (!offer) return [];
    const reasons: MatchReason[] = [{ code: "type", label: "Passende Bodenart", strength: "required" }];
    let score = 2;
    if (input.floorHeating) {
      if (product.floorHeatingApproved === false) return [];
      reasons.push({ code: "floor-heating", label: product.floorHeatingApproved ? "Fußbodenheizung bestätigt" : "Freigabe der Fußbodenheizung prüfen", strength: product.floorHeatingApproved ? "positive" : "warning" });
      score += product.floorHeatingApproved ? 2 : 0;
    }
    if (input.wetRoom) {
      if (product.wetRoomApproved === false) return [];
      reasons.push({ code: "wet-room", label: product.wetRoomApproved ? "Feuchtraumeignung bestätigt" : "Feuchtraumeignung prüfen", strength: product.wetRoomApproved ? "positive" : "warning" });
      score += product.wetRoomApproved ? 2 : 0;
    }
    if (product.packageCoverageM2) { reasons.push({ code: "coverage", label: `${product.packageCoverageM2.toLocaleString("de-DE")} m² je Paket`, strength: "positive" }); score += 1; }
    else reasons.push({ code: "coverage", label: "Paketinhalt redaktionell noch zu bestätigen", strength: "warning" });
    return [{ product, offer, score, reasons }];
  }).sort((a, b) => b.score - a.score || a.offer.priceEur - b.offer.priceEur).slice(0, 8);
}
