import type { MatchReason, OfferBase } from "@/lib/catalog/types";
import { MATCH_CONFIDENCE_LABELS, MATCH_CONFIDENCE_SCORE } from "./match-confidence";
import type { ProjectRequirements } from "./requirements";
import type { MatchConfidence, ProjectCatalog, ProjectMatch, ProjectOrderEstimate, ProjectProduct } from "./types";

export function recommendProjectProducts({ catalog, requirements }: { catalog: ProjectCatalog; requirements: ProjectRequirements }): ProjectMatch[] {
  const offersByProduct = bestAvailableOffers(catalog.offers);
  return catalog.products.flatMap((product) => {
    if (product.vertical !== requirements.vertical) return [];
    const offer = offersByProduct.get(product.id);
    if (!offer) return [];
    const match = matchProduct(product, offer, requirements);
    return match ? [match] : [];
  }).sort((a, b) => b.score - a.score || estimatedCost(a) - estimatedCost(b) || a.offer.priceEur - b.offer.priceEur).slice(0, 12);
}

function bestAvailableOffers(offers: OfferBase[]): Map<string, OfferBase> {
  const result = new Map<string, OfferBase>();
  for (const offer of offers) {
    if (!offer.available) continue;
    const previous = result.get(offer.productId);
    const total = offer.priceEur + (offer.deliveryCostEur ?? 0);
    const previousTotal = previous ? previous.priceEur + (previous.deliveryCostEur ?? 0) : Infinity;
    if (!previous || total < previousTotal) result.set(offer.productId, offer);
  }
  return result;
}

function matchProduct(product: ProjectProduct, offer: OfferBase, requirements: ProjectRequirements): ProjectMatch | undefined {
  if (requirements.vertical === "terrace") return terraceMatch(product, offer, requirements);
  if (requirements.vertical === "privacy-screen") return privacyMatch(product, offer, requirements);
  if (requirements.vertical === "drywall") return drywallMatch(product, offer, requirements);
  if (requirements.vertical === "greenhouse") return greenhouseMatch(product, offer, requirements);
  return carportMatch(product, offer, requirements);
}

function baseMatch(product: ProjectProduct, offer: OfferBase, confidence: MatchConfidence, reasons: MatchReason[], estimate?: ProjectOrderEstimate): ProjectMatch {
  return { product, offer, confidence, orderEstimate: estimate, reasons: [{ code: "match-confidence", label: MATCH_CONFIDENCE_LABELS[confidence], strength: confidence === "category" || confidence === "supplement" ? "warning" : "required" }, ...reasons], score: MATCH_CONFIDENCE_SCORE[confidence] - (estimate?.overage ?? 0) / Math.max(1, estimate?.requiredUnits ?? 1) };
}

function terraceMatch(product: ProjectProduct, offer: OfferBase, requirements: Extract<ProjectRequirements, { vertical: "terrace" }>): ProjectMatch {
  if (product.kind !== "decking") return baseMatch(product, offer, "supplement", [{ code: "component", label: "Ergänzung für den Terrassenaufbau", strength: "warning" }]);
  const hasDimensions = Boolean(product.boardLengthMm && product.boardWidthMm);
  const materialMatches = !requirements.material || !product.material || product.material === requirements.material;
  const widthDelta = product.boardWidthMm ? Math.abs(product.boardWidthMm - requirements.boardWidthMm) : Infinity;
  const lengthDelta = product.boardLengthMm ? Math.abs(product.boardLengthMm - requirements.boardLengthMm) : Infinity;
  const confidence: MatchConfidence = hasDimensions && materialMatches && widthDelta <= 2 && lengthDelta <= 10 ? "exact" : hasDimensions && materialMatches && widthDelta <= 10 ? "compatible" : "category";
  const reasons: MatchReason[] = hasDimensions
    ? [{ code: "board-format", label: `${format(product.boardLengthMm!)} × ${format(product.boardWidthMm!)} mm berücksichtigt`, strength: confidence === "exact" ? "positive" : "warning" }]
    : [{ code: "missing-format", label: "Dielenformat im Feed nicht vollständig bestätigt", strength: "warning" }];
  const adjustedLinearM = product.boardWidthMm ? requirements.requiredLinearM * requirements.boardWidthMm / product.boardWidthMm : requirements.requiredLinearM;
  const requiredBoards = product.boardLengthMm ? Math.ceil(adjustedLinearM / (product.boardLengthMm / 1000)) : requirements.requiredBoardCount;
  return baseMatch(product, offer, confidence, reasons, orderEstimate(requiredBoards, product.piecesPerPack ?? 1, "Dielen", offer));
}

function privacyMatch(product: ProjectProduct, offer: OfferBase, requirements: Extract<ProjectRequirements, { vertical: "privacy-screen" }>): ProjectMatch {
  if (product.kind !== "panel") return baseMatch(product, offer, "supplement", [{ code: "component", label: "Ergänzung für das Sichtschutzsystem", strength: "warning" }]);
  const dimensionsKnown = Boolean(product.panelWidthCm && product.panelHeightCm);
  const heightFits = Boolean(product.panelHeightCm && product.panelHeightCm >= requirements.fenceHeightCm);
  const widthDelta = product.panelWidthCm ? Math.abs(product.panelWidthCm - requirements.fieldWidthCm) : Infinity;
  const gateFits = requirements.gateCount === 0 || product.gateCompatible === true;
  const systemConfirmed = Boolean(product.systemId && product.postSystemId);
  const confidence: MatchConfidence = dimensionsKnown && heightFits && widthDelta <= 2 && gateFits && systemConfirmed ? "exact" : dimensionsKnown && heightFits && widthDelta <= 15 && gateFits ? "compatible" : "category";
  const reasons: MatchReason[] = dimensionsKnown ? [{ code: "panel-format", label: `${format(product.panelWidthCm!)} × ${format(product.panelHeightCm!)} cm mit dem Raster verglichen`, strength: confidence === "category" ? "warning" : "positive" }] : [{ code: "missing-format", label: "Elementmaße nicht vollständig bestätigt", strength: "warning" }];
  if (requirements.gateCount > 0 && !product.gateCompatible) reasons.push({ code: "gate", label: "Torkompatibilität nicht bestätigt", strength: "warning" });
  const reservePanels = requirements.orderPanelCount - requirements.panelCount;
  const requiredPanels = product.panelWidthCm ? Math.ceil(requirements.panelCount * requirements.fieldWidthCm / product.panelWidthCm) + reservePanels : requirements.orderPanelCount;
  return baseMatch(product, offer, confidence, reasons, orderEstimate(requiredPanels, product.piecesPerPack ?? 1, "Elemente", offer));
}

function drywallMatch(product: ProjectProduct, offer: OfferBase, requirements: Extract<ProjectRequirements, { vertical: "drywall" }>): ProjectMatch {
  if (product.kind === "board") {
    const formatKnown = Boolean(product.boardLengthMm && product.boardWidthMm);
    const exactFormat = product.boardLengthMm === requirements.boardLengthMm && product.boardWidthMm === requirements.boardWidthMm;
    const moistureFits = !requirements.moistureRequired || product.moistureApproved === true;
    const fireFits = !requirements.fireOrAcousticRequired || product.boardType === "fire-acoustic" || Boolean(product.fireClass);
    const confidence: MatchConfidence = formatKnown && exactFormat && moistureFits && fireFits ? "exact" : formatKnown && moistureFits && fireFits ? "compatible" : "category";
    const productArea = product.boardLengthMm && product.boardWidthMm ? product.boardLengthMm * product.boardWidthMm / 1_000_000 : undefined;
    const requiredBoards = productArea ? Math.ceil(requirements.purchaseAreaM2 / productArea) : requirements.boardCount;
    const reasons: MatchReason[] = [formatKnown ? { code: "board-format", label: exactFormat ? "Plattenformat entspricht der Berechnung" : "Alternatives Format – Menge neu berechnet", strength: exactFormat ? "positive" : "warning" } : { code: "missing-format", label: "Plattenformat nicht vollständig bestätigt", strength: "warning" }];
    if (requirements.moistureRequired) reasons.push({ code: "moisture", label: moistureFits ? "Feuchtraumeignung bestätigt" : "Feuchtraumeignung nicht bestätigt", strength: moistureFits ? "positive" : "warning" });
    if (requirements.fireOrAcousticRequired) reasons.push({ code: "fire-acoustic", label: fireFits ? "Brand-/Schallschutzeignung im Produktmerkmal" : "Brand-/Schallschutzeignung nicht bestätigt", strength: fireFits ? "positive" : "warning" });
    return baseMatch(product, offer, confidence, reasons, orderEstimate(requiredBoards, product.piecesPerPack ?? 1, "Platten", offer));
  }
  if (product.kind === "profile") {
    const compatible = product.profileLengthMm !== undefined;
    const requiredProfiles = product.profileLengthMm ? Math.ceil((requirements.trackBarCount * requirements.profileLengthMm) / product.profileLengthMm) : requirements.trackBarCount;
    return baseMatch(product, offer, compatible ? "compatible" : "supplement", [{ code: "profile", label: compatible ? "Profillänge in der Menge berücksichtigt" : "Profilformat nicht bestätigt", strength: compatible ? "positive" : "warning" }], orderEstimate(requiredProfiles, product.piecesPerPack ?? 1, "Profile", offer));
  }
  return baseMatch(product, offer, "supplement", [{ code: "component", label: "Ergänzung für den Trockenbauaufbau", strength: "warning" }]);
}

function greenhouseMatch(product: ProjectProduct, offer: OfferBase, requirements: Extract<ProjectRequirements, { vertical: "greenhouse" }>): ProjectMatch | undefined {
  if (product.kind !== "kit") return baseMatch(product, offer, "supplement", [{ code: "component", label: "Material für die berechnete Planung", strength: "warning" }]);
  if (!requirements.showCompleteKits) return undefined;
  const dimensionsKnown = Boolean(product.externalWidthM && product.externalLengthM);
  const difference = dimensionsKnown ? Math.min(dimensionDifference(product.externalWidthM!, product.externalLengthM!, requirements.widthM, requirements.lengthM), dimensionDifference(product.externalLengthM!, product.externalWidthM!, requirements.widthM, requirements.lengthM)) : Infinity;
  const glazingFits = requirements.glazing === "undecided" || product.glazingType === requirements.glazing || product.glazingType === "mixed";
  const ventilationConfirmed = requirements.roofVentCount === 0 || product.roofVentCount !== undefined && product.roofVentCount >= requirements.roofVentCount;
  const detailMatchConfirmed = product.doorWidthCm !== undefined && ventilationConfirmed;
  const confidence: MatchConfidence = dimensionsKnown && difference <= 0.1 && glazingFits && detailMatchConfirmed ? "exact" : dimensionsKnown && difference <= 0.4 && glazingFits ? "compatible" : "category";
  const reasons: MatchReason[] = dimensionsKnown ? [{ code: "kit-size", label: `${format(product.externalWidthM!)} × ${format(product.externalLengthM!)} m mit der geplanten Grundfläche verglichen`, strength: confidence === "category" ? "warning" : "positive" }] : [{ code: "missing-size", label: "Außenmaße des Komplettmodells nicht bestätigt", strength: "warning" }];
  if (!glazingFits) reasons.push({ code: "glazing", label: "Verglasung weicht von der Planung ab", strength: "warning" });
  if (!detailMatchConfirmed) reasons.push({ code: "kit-details", label: "Türbreite oder Lüftungsumfang nicht vollständig bestätigt", strength: "warning" });
  return baseMatch(product, offer, confidence, reasons, orderEstimate(1, 1, "Komplettmodell", offer));
}

function carportMatch(product: ProjectProduct, offer: OfferBase, requirements: Extract<ProjectRequirements, { vertical: "carport" }>): ProjectMatch {
  if (product.kind !== "kit") return baseMatch(product, offer, "supplement", [{ code: "component", label: "Ergänzung für das Carport-Projekt", strength: "warning" }]);
  const clearKnown = Boolean(product.clearWidthM && product.clearLengthM && product.clearHeightM);
  const clearFits = clearKnown && product.clearWidthM! >= requirements.clearWidthM && product.clearLengthM! >= requirements.clearLengthM && product.clearHeightM! >= requirements.clearHeightM;
  const vehicleFits = !product.vehicleCount || product.vehicleCount >= requirements.vehicleCount;
  const configurationFits = (!product.installationType || product.installationType === "unknown" || product.installationType === requirements.installation) && (requirements.roofType === "undecided" || !product.roofType || product.roofType === "unknown" || product.roofType === requirements.roofType);
  const confidence: MatchConfidence = clearFits && vehicleFits && configurationFits ? "compatible" : "category";
  const reasons: MatchReason[] = clearKnown ? [{ code: "clear-size", label: clearFits ? "Bestätigte lichte Maße erfüllen den Platzrahmen" : "Lichte Maße reichen für den Platzrahmen nicht aus", strength: clearFits ? "positive" : "warning" }] : [{ code: "missing-clear-size", label: product.externalWidthM && product.externalLengthM ? "Außenmaße bekannt, lichte Maße nicht bestätigt" : "Lichte und äußere Maße nicht vollständig bestätigt", strength: "warning" }];
  return baseMatch(product, offer, confidence, reasons, orderEstimate(1, 1, "Carport", offer));
}

function orderEstimate(requiredUnits: number, packSize: number, unitLabel: string, offer: OfferBase): ProjectOrderEstimate {
  const packageCount = Math.ceil(requiredUnits / packSize);
  const materialSubtotalEur = packageCount * offer.priceEur;
  const shippingEur = offer.deliveryCostStatus === "unknown" ? undefined : offer.deliveryCostEur ?? 0;
  return { requiredUnits, packageCount, orderedUnits: packageCount * packSize, overage: packageCount * packSize - requiredUnits, unitLabel, materialSubtotalEur, shippingEur, estimatedTotalEur: shippingEur === undefined ? undefined : materialSubtotalEur + shippingEur };
}

function dimensionDifference(width: number, length: number, targetWidth: number, targetLength: number): number { return Math.abs(width - targetWidth) / targetWidth + Math.abs(length - targetLength) / targetLength; }
function estimatedCost(match: ProjectMatch): number { return match.orderEstimate?.estimatedTotalEur ?? match.orderEstimate?.materialSubtotalEur ?? match.offer.priceEur; }
function format(value: number): string { return value.toLocaleString("de-DE", { maximumFractionDigits: 2 }); }
