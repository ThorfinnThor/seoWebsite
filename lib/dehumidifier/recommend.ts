import { budgetStatus, compareOffers, landedPrice } from "@/lib/catalog/price";
import type { MatchReason } from "@/lib/catalog/types";
import { calculateDehumidifierRequirements } from "./rules";
import type { DehumidifierCatalog, DehumidifierInput, DehumidifierMatch, DehumidifierProduct } from "./types";

function capacityFits(product: DehumidifierProduct, requiredAreaM2: number, requiredVolumeM3: number): boolean {
  if (product.maxRecommendedVolumeM3 !== undefined) return product.maxRecommendedVolumeM3 >= requiredVolumeM3;
  return product.maxRecommendedAreaM2 !== undefined && product.maxRecommendedAreaM2 >= requiredAreaM2;
}

export function recommendDehumidifiers(catalog: DehumidifierCatalog, input: DehumidifierInput): DehumidifierMatch[] {
  const requirements = calculateDehumidifierRequirements(input);
  return catalog.products.flatMap((product) => {
    if (!product.reviewed || product.dataQuality === "feed") return [];
    if (!capacityFits(product, requirements.requiredAreaM2, requirements.requiredVolumeM3)) return [];
    if (input.approximateTemperatureC !== undefined && product.minOperatingTempC !== undefined && input.approximateTemperatureC < product.minOperatingTempC) return [];
    if (input.approximateTemperatureC !== undefined && product.maxOperatingTempC !== undefined && input.approximateTemperatureC > product.maxOperatingTempC) return [];
    if (input.continuousDrainPossible && !product.continuousDrain) return [];
    const offers = catalog.offers.filter((offer) => offer.productId === product.id && offer.available && budgetStatus(offer, input.budgetMaxEur) !== "over").sort(compareOffers);
    if (!offers.length) return [];
    const offer = offers[0];
    const knownCapacity = product.maxRecommendedVolumeM3 ?? product.maxRecommendedAreaM2 ?? requirements.requiredAreaM2;
    const requiredCapacity = product.maxRecommendedVolumeM3 !== undefined ? requirements.requiredVolumeM3 : requirements.requiredAreaM2;
    const capacityScore = Math.max(0, 35 - Math.abs(knownCapacity - requiredCapacity) / Math.max(1, requiredCapacity) * 20);
    const tempScore = input.roomType === "basement" && product.minOperatingTempC !== undefined && product.minOperatingTempC <= 5 ? 12 : 5;
    const drainScore = input.continuousDrainPossible ? 12 : product.continuousDrain ? 6 : 2;
    const laundryScore = input.laundryDrying && product.laundryMode ? 10 : input.laundryDrying ? 0 : 4;
    const noiseScore = input.noisePriority === "high" && product.noiseDb !== undefined ? Math.max(0, 14 - Math.max(0, product.noiseDb - 38)) : 5;
    const price = landedPrice(offer) ?? offer.priceEur;
    const priceScore = Math.max(0, 12 * (1 - price / input.budgetMaxEur) + 6);
    const qualityScore = product.dataQuality === "curated" ? 8 : 5;
    const reasons: MatchReason[] = [{ code: "capacity", label: product.maxRecommendedVolumeM3 !== undefined ? `Für bis zu ${product.maxRecommendedVolumeM3} m³ freigegeben; benötigt werden etwa ${requirements.requiredVolumeM3} m³.` : `Für bis zu ${product.maxRecommendedAreaM2} m² freigegeben; Auswahlziel sind ${requirements.requiredAreaM2} m².`, strength: "required" }];
    if (input.continuousDrainPossible) reasons.push({ code: "drain", label: "Unterstützt den gewünschten kontinuierlichen Wasserablauf.", strength: "required" });
    if (input.laundryDrying && product.laundryMode) reasons.push({ code: "laundry", label: "Ein eigener Wäschemodus ist angegeben.", strength: "positive" });
    if (input.noisePriority === "high" && product.noiseDb !== undefined) reasons.push({ code: "noise", label: `Angegebener Geräuschpegel: ${product.noiseDb} dB.`, strength: product.noiseDb <= 42 ? "positive" : "warning" });
    if (budgetStatus(offer, input.budgetMaxEur) === "unknown") reasons.push({ code: "shipping", label: "Grundpreis im Budget; Versandkosten sind unbekannt.", strength: "warning" });
    return [{ product, offer, score: Math.round((capacityScore + tempScore + drainScore + laundryScore + noiseScore + priceScore + qualityScore) * 10) / 10, budgetStatus: budgetStatus(offer, input.budgetMaxEur) === "within" ? ("within" as const) : ("unknown" as const), reasons: reasons.slice(0, 4) }];
  }).sort((a, b) => b.score - a.score || a.product.id.localeCompare(b.product.id)).slice(0, 3);
}
