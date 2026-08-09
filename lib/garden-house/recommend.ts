import { budgetStatus, compareOffers, landedPrice } from "@/lib/catalog/price";
import type { MatchReason, OfferBase } from "@/lib/catalog/types";
import { calculateRequirements } from "./rules";
import type {
  GardenHouseCatalog,
  GardenHouseInput,
  GardenHouseMatch,
  GardenHouseProduct,
  NoMatchExplanation,
} from "./types";

interface Compatibility {
  compatible: boolean;
  code?: string;
  rotated: boolean;
}

function physicalFit(product: GardenHouseProduct, input: GardenHouseInput): { fits: boolean; rotated: boolean } {
  const normal = product.widthCm <= input.availableWidthCm && product.depthCm <= input.availableDepthCm;
  const rotated =
    input.allowRotation && product.depthCm <= input.availableWidthCm && product.widthCm <= input.availableDepthCm;
  return { fits: normal || rotated, rotated: !normal && rotated };
}

function compatibility(product: GardenHouseProduct, input: GardenHouseInput): Compatibility {
  const requirements = calculateRequirements(input);
  if (!product.reviewed) return { compatible: false, code: "unreviewed", rotated: false };
  const fit = physicalFit(product, input);
  if (!fit.fits) return { compatible: false, code: "footprint", rotated: false };
  if (product.footprintM2 < requirements.recommendedAreaM2) return { compatible: false, code: "area", rotated: fit.rotated };
  if (product.doorWidthCm !== undefined && product.doorWidthCm < requirements.minDoorWidthCm) {
    return { compatible: false, code: "door", rotated: fit.rotated };
  }
  if (input.materialPreference !== "any" && product.material !== input.materialPreference) {
    return { compatible: false, code: "material", rotated: fit.rotated };
  }
  if (input.roofPreference !== "any" && product.roofType !== input.roofPreference) {
    return { compatible: false, code: "roof", rotated: fit.rotated };
  }
  if (
    input.floorPreference === "required" &&
    product.floorIncluded !== true &&
    product.floorKitAvailable !== true
  ) {
    return { compatible: false, code: "floor", rotated: fit.rotated };
  }
  return { compatible: true, rotated: fit.rotated };
}

function selectOffers(offers: OfferBase[], budgetMaxEur: number): OfferBase[] {
  return offers
    .filter((offer) => offer.available && budgetStatus(offer, budgetMaxEur) !== "over")
    .sort(compareOffers);
}

function scoreMatch(product: GardenHouseProduct, offer: OfferBase, input: GardenHouseInput): number {
  const requirements = calculateRequirements(input);
  const areaRatio = requirements.recommendedAreaM2 / product.footprintM2;
  const areaScore = Math.max(0, Math.min(32, 32 * areaRatio));
  const total = landedPrice(offer) ?? offer.priceEur;
  const budgetScore = Math.max(0, Math.min(24, 24 * (1 - total / input.budgetMaxEur) + 12));
  const materialScore = input.materialPreference === "any" ? 6 : 12;
  const roofScore = input.roofPreference === "any" ? 3 : 6;
  const floorScore =
    input.floorPreference === "irrelevant"
      ? 4
      : product.floorIncluded
        ? 10
        : product.floorKitAvailable
          ? 8
          : 0;
  const doorScore = product.doorWidthCm === undefined ? 1 : 5;
  const qualityScore = product.dataQuality === "curated" ? 8 : product.dataQuality === "mixed" ? 5 : 2;
  return Math.round((areaScore + budgetScore + materialScore + roofScore + floorScore + doorScore + qualityScore) * 10) / 10;
}

function buildReasons(
  product: GardenHouseProduct,
  offer: OfferBase,
  input: GardenHouseInput,
  rotated: boolean,
): MatchReason[] {
  const requirements = calculateRequirements(input);
  const reasons: MatchReason[] = [
    {
      code: "area-fit",
      label: `${product.footprintM2.toLocaleString("de-DE")} m² bieten genug Platz für die berechneten ${requirements.recommendedAreaM2.toLocaleString("de-DE")} m².`,
      strength: "required",
    },
    {
      code: "physical-fit",
      label: rotated ? "Passt um 90° gedreht auf die angegebene Stellfläche." : "Passt auf die angegebene Stellfläche.",
      strength: "required",
    },
  ];
  if (budgetStatus(offer, input.budgetMaxEur) === "unknown") {
    reasons.push({ code: "shipping-unknown", label: "Grundpreis im Budget; Versandkosten bitte beim Händler prüfen.", strength: "warning" });
  } else {
    reasons.push({ code: "budget-fit", label: "Bekannter Gesamtpreis liegt innerhalb des Budgets.", strength: "positive" });
  }
  if (product.doorWidthCm === undefined) {
    reasons.push({ code: "door-unknown", label: `Türbreite unbekannt – empfohlen sind mindestens ${requirements.minDoorWidthCm} cm.`, strength: "warning" });
  } else {
    reasons.push({ code: "door-fit", label: `Die ${product.doorWidthCm} cm breite Tür erfüllt die Zugangsempfehlung.`, strength: "positive" });
  }
  if (input.floorPreference !== "irrelevant" && product.floorIncluded) {
    reasons.push({ code: "floor-included", label: "Ein Boden ist bereits enthalten.", strength: "positive" });
  } else if (input.floorPreference !== "irrelevant" && product.floorKitAvailable) {
    reasons.push({ code: "floor-kit", label: "Ein passendes Bodenset ist separat erhältlich.", strength: "positive" });
  }
  return reasons.slice(0, 4);
}

export function recommendGardenHouses(catalog: GardenHouseCatalog, input: GardenHouseInput): GardenHouseMatch[] {
  return catalog.products
    .flatMap((product) => {
      const check = compatibility(product, input);
      if (!check.compatible) return [];
      const offers = selectOffers(
        catalog.offers.filter((offer) => offer.productId === product.id),
        input.budgetMaxEur,
      );
      if (offers.length === 0) return [];
      const [offer, ...alternativeOffers] = offers;
      return [{
        product,
        offer,
        alternativeOffers: alternativeOffers.slice(0, 2),
        score: scoreMatch(product, offer, input),
        rotated: check.rotated,
        budgetStatus: budgetStatus(offer, input.budgetMaxEur) === "within" ? ("within" as const) : ("unknown" as const),
        reasons: buildReasons(product, offer, input, check.rotated),
      }];
    })
    .sort((a, b) => b.score - a.score || a.product.id.localeCompare(b.product.id))
    .slice(0, 3);
}

export function explainNoMatches(catalog: GardenHouseCatalog, input: GardenHouseInput): NoMatchExplanation[] {
  const counts = new Map<string, number>();
  const reviewed = catalog.products.filter((product) => product.reviewed);
  for (const product of reviewed) {
    const check = compatibility(product, input);
    if (!check.compatible && check.code) counts.set(check.code, (counts.get(check.code) ?? 0) + 1);
    else if (selectOffers(catalog.offers.filter((offer) => offer.productId === product.id), input.budgetMaxEur).length === 0) {
      counts.set("offer", (counts.get("offer") ?? 0) + 1);
    }
  }
  const copy: Record<string, [string, string]> = {
    footprint: ["Die Modelle passen nicht auf die Stellfläche.", "Stellfläche vergrößern oder Drehung erlauben."],
    area: ["Die passenden Modelle bieten zu wenig Nutzfläche.", "Weniger Lagerbedarf wählen oder mehr Stellfläche vorsehen."],
    door: ["Die bekannten Türen sind für den Bedarf zu schmal.", "Bedarf prüfen oder Modelle mit breiterer Tür wählen."],
    material: ["Die Materialwahl schließt verfügbare Modelle aus.", "Materialpräferenz auf „egal“ setzen."],
    roof: ["Die Dachform schließt verfügbare Modelle aus.", "Dachpräferenz auf „egal“ setzen."],
    floor: ["Kein passendes Modell erfüllt die Bodenanforderung.", "Separates Fundament/Bodenset prüfen oder Präferenz ändern."],
    offer: ["Kein verfügbares Angebot liegt sicher oder möglicherweise im Budget.", "Budget erhöhen oder später erneut prüfen."],
  };
  return [...counts.entries()]
    .filter(([code]) => code in copy)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([code, rejectedProducts]) => ({ code, label: copy[code][0], suggestion: copy[code][1], rejectedProducts }));
}
