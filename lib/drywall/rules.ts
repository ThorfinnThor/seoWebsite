import type { DrywallInput, DrywallPlan } from "./types";

const round = (value: number, digits = 2) => {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

export function calculateDrywallPlan(input: DrywallInput): DrywallPlan {
  const grossWallAreaM2 = input.wallLengthM * input.wallHeightM;
  const netFaceAreaM2 = grossWallAreaM2 - input.openingsAreaM2;
  const totalCladdingAreaM2 = netFaceAreaM2 * input.claddingSides * input.layersPerSide;
  const purchaseAreaM2 = totalCladdingAreaM2 * (1 + input.wastePercent / 100);
  const boardAreaM2 = input.boardLengthM * input.boardWidthM;
  const boardCount = Math.ceil(purchaseAreaM2 / boardAreaM2);
  const orderedBoardAreaM2 = boardCount * boardAreaM2;
  const baselineStudCount = Math.ceil(input.wallLengthM / (input.studSpacingCm / 100)) + 1;
  const trackLengthWithReserveM = input.wallLengthM * 2 * 1.1;
  const warnings = [
    "Die Mengen sind ein Vorplanungsrahmen. Plattenformat, Profilabstände, Befestiger und zulässiger Aufbau des konkreten Systems haben Vorrang.",
    "Schrauben, Dübel, Dichtband, Fugenband, Spachtel, Eckschutz und Anschlussdetails werden nicht pauschal aus Quadratmetern abgeleitet.",
  ];

  if (input.openingCount > 0) warnings.push("Tür- und Fensteröffnungen benötigen zusätzliche beziehungsweise anders angeordnete Profile, Stürze und Anschlüsse; die Grundprofilzahl enthält diese Verstärkungen nicht.");
  if (input.wallHeightM > 3) warnings.push("Bei Wandhöhen über 3 m müssen Profiltyp, Achsabstand, Plattenlage, Befestigung und zulässige Systemhöhe ausdrücklich bestätigt werden.");
  if (input.claddingSides === 1) warnings.push("Nur eine bekleidete Seite ist eingetragen. Unterkonstruktion, Rückseite und Anschlussart müssen zum geplanten Vorsatz- oder Schachtsystem passen.");
  if (input.includeInsulation) warnings.push("Die Dämmfläche ist nur eine Flächenmenge; Dicke, Dichte, Hohlraum, Brand- und Schallschutzeignung bleiben Systemauswahl.");
  if (input.moistureExposure) warnings.push("Für feuchtebeanspruchte Bereiche sind geeignete Platten, Unterkonstruktion, Abdichtung und Anschlüsse nach Nutzung und System erforderlich.");
  if (input.fireOrAcousticRequirement) warnings.push("Brand- oder Schallschutz darf nur mit einem vollständig geprüften Aufbau inklusive Profilen, Dämmung, Plattenlagen, Fugen und Anschlüssen geplant werden.");
  if (input.installationsPlanned) warnings.push("Elektro-, Sanitär- oder andere Installationen verändern Hohlraum, Öffnungen und Verstärkungen und gehören in eine koordinierte Fachplanung.");
  if (input.openingCount > 3 && input.wastePercent === 10) warnings.push("Viele Öffnungen erzeugen zusätzliche Zuschnitte. Prüfe einen Platten- und Fugenplan; 10 % Reserve können für die Geometrie knapp sein.");

  return {
    grossWallAreaM2: round(grossWallAreaM2),
    netFaceAreaM2: round(netFaceAreaM2),
    totalCladdingAreaM2: round(totalCladdingAreaM2),
    purchaseAreaM2: round(purchaseAreaM2),
    boardAreaM2: round(boardAreaM2),
    boardCount,
    orderedBoardAreaM2: round(orderedBoardAreaM2),
    baselineStudCount,
    trackLengthWithReserveM: round(trackLengthWithReserveM, 1),
    trackBarCount: Math.ceil(trackLengthWithReserveM / input.trackBarLengthM),
    insulationAreaM2: input.includeInsulation ? round(netFaceAreaM2) : 0,
    warnings,
  };
}
