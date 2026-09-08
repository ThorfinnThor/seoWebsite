import type { OfferBase, MatchReason } from "@/lib/catalog/types";
import type { SecurityCameraCatalog, SecurityCameraInput, SecurityCameraMatch } from "./types";

const resolutionRank = { hd: 1, "2k": 2, "3k": 3, "4k": 4 } as const;

export function recommendSecurityCameras(catalog: SecurityCameraCatalog, input: SecurityCameraInput): SecurityCameraMatch[] {
  const offersByProduct = new Map<string, OfferBase>();
  for (const offer of catalog.offers) {
    if (!offer.available) continue;
    const current = offersByProduct.get(offer.productId);
    if (!current || offer.priceEur < current.priceEur) offersByProduct.set(offer.productId, offer);
  }

  return catalog.products.flatMap((product) => {
    const offer = offersByProduct.get(product.id);
    if (!offer || product.placement !== input.placement) return [];
    if (input.connection !== "undecided" && product.connection !== input.connection) return [];
    if (!input.powerAvailable && !["battery", "solar"].includes(product.power)) return [];
    if (resolutionRank[product.resolution] < resolutionRank[input.minimumResolution]) return [];
    if (input.panTiltRequired && !product.panTilt) return [];
    if (input.integratedLightRequired && !product.integratedLight) return [];
    if (input.preferredBrand && product.brand?.toLocaleLowerCase("de") !== input.preferredBrand.toLocaleLowerCase("de")) return [];

    const requiredSets = Math.ceil(input.coverageZones / product.cameraCount);
    const estimatedTotalEur = Math.round(requiredSets * offer.priceEur * 100) / 100;
    if (estimatedTotalEur > input.budgetMaxEur) return [];

    const reasons: MatchReason[] = [
      { code: "placement", label: product.placement === "outdoor" ? "Für außen ausgewiesen" : "Für innen ausgewiesen", strength: "required" },
      { code: "connection", label: connectionLabel(product.connection), strength: "required" },
      { code: "resolution", label: `${product.resolution.toUpperCase()} Auflösung`, strength: "positive" },
      { code: "coverage", label: `${product.cameraCount} ${product.cameraCount === 1 ? "Kamera" : "Kameras"} je Angebot`, strength: "positive" },
    ];
    if (product.panTilt) reasons.push({ code: "pan-tilt", label: "Schwenken und Neigen möglich", strength: "positive" });
    if (product.integratedLight) reasons.push({ code: "light", label: "Licht ist integriert", strength: "positive" });
    const score = resolutionRank[product.resolution] * 2 + product.cameraCount + (product.panTilt ? 1 : 0) + (product.integratedLight ? 1 : 0);
    return [{ product, offer, score, requiredSets, estimatedTotalEur, reasons }];
  }).sort((left, right) => left.estimatedTotalEur - right.estimatedTotalEur || right.score - left.score);
}

function connectionLabel(connection: "wifi" | "poe" | "cellular") {
  if (connection === "poe") return "Netzwerk und Strom über PoE";
  if (connection === "cellular") return "Mobilfunkverbindung über 4G";
  return "Verbindung über WLAN";
}
