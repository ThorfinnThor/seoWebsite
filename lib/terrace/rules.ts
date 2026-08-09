import type { TerraceInput, TerracePlan } from "./types";

const round = (value: number, digits = 1) => {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

export function calculateTerracePlan(input: TerraceInput): TerracePlan {
  const runLengthM = input.layingDirection === "length" ? input.terraceLengthM : input.terraceWidthM;
  const spanWidthM = input.layingDirection === "length" ? input.terraceWidthM : input.terraceLengthM;
  const moduleWidthMm = input.boardWidthMm + input.boardGapMm;
  const spanWidthMm = spanWidthM * 1000;
  const courseCount = Math.ceil((spanWidthMm + input.boardGapMm) / moduleWidthMm);
  const coveredWidthM = (courseCount * input.boardWidthMm + (courseCount - 1) * input.boardGapMm) / 1000;
  const deckingLinearM = courseCount * runLengthM;
  const wasteFactor = 1 + input.wastePercent / 100;
  const deckingLinearMWithWaste = deckingLinearM * wasteFactor;
  const supportIntervals = Math.ceil(runLengthM / (input.maxSupportSpacingCm / 100));
  const supportRowCount = supportIntervals + 1;
  const supportLinearMWithWaste = supportRowCount * spanWidthM * wasteFactor;
  const fullLengthPossible = input.boardLengthM >= runLengthM;
  const minimumJointsPerCourse = Math.max(0, Math.ceil(runLengthM / input.boardLengthM) - 1);
  const warnings = [
    "Herstellerabstände, Randabstände und Befestigungssystem des konkreten Belags haben Vorrang.",
    "Die Mengenschätzung setzt voraus, dass geeignete Verschnitte im Verlegeplan wiederverwendet werden können.",
  ];

  if (!fullLengthPossible) warnings.push("Ein Stoß- und Fugenplan ist erforderlich; Stöße benötigen eine dafür freigegebene Auflagerung.");
  if (input.wastePercent === 5) warnings.push("5 % Verschnitt sind nur bei einfacher Geometrie und sorgfältigem Zuschnitt realistisch.");

  return {
    areaM2: round(input.terraceLengthM * input.terraceWidthM, 2),
    runLengthM,
    spanWidthM,
    courseCount,
    coveredWidthM: round(coveredWidthM, 3),
    edgeAdjustmentMm: Math.max(0, Math.round((coveredWidthM - spanWidthM) * 1000)),
    deckingLinearM: round(deckingLinearM, 1),
    deckingLinearMWithWaste: round(deckingLinearMWithWaste, 1),
    fullBoardsToBuy: Math.ceil(deckingLinearMWithWaste / input.boardLengthM),
    supportRowCount,
    supportLinearMWithWaste: round(supportLinearMWithWaste, 1),
    fixingIntersections: courseCount * supportRowCount,
    fullLengthPossible,
    minimumJointsPerCourse,
    warnings,
  };
}
