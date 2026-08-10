import type { FlooringInput, FlooringPlan } from "./types";

const round = (value: number, digits = 2) => {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

export function calculateFlooringPlan(input: FlooringInput): FlooringPlan {
  const grossAreaM2 = input.rooms.reduce((total, room) => total + room.lengthM * room.widthM, 0);
  const netAreaM2 = grossAreaM2 - input.excludedAreaM2;
  const purchaseAreaM2 = netAreaM2 * (1 + input.wastePercent / 100);
  const plankAreaM2 = (input.plankLengthMm / 1000) * (input.plankWidthMm / 1000);
  const packageCount = Math.ceil(purchaseAreaM2 / input.packageCoverageM2);
  const orderedAreaM2 = packageCount * input.packageCoverageM2;
  const rawPerimeterM = input.rooms.reduce((total, room) => total + 2 * (room.lengthM + room.widthM), 0);
  const perimeterM = Math.max(0, rawPerimeterM - input.totalDoorOpeningM);
  const skirtingLengthWithReserveM = input.includeSkirting ? perimeterM * 1.1 : 0;
  const underlayAreaWithReserveM2 = input.includeUnderlay ? netAreaM2 * 1.05 : 0;
  const warnings = [
    "Das Paketmaß und die Verlegefreigabe des konkreten Bodens haben Vorrang vor dieser Mengenschätzung.",
    "Untergrund, Ebenheit, Restfeuchte, Dehnungsfugen und Übergangsprofile gehören in die konkrete Verlegeplanung.",
  ];

  if (input.rooms.length > 1) warnings.push("Bei zusammengesetzten Teilflächen können gemeinsam liegende Innenkanten im Sockelleisten-Umfang doppelt enthalten sein.");
  if (input.layingPattern === "diagonal" && input.wastePercent < 10) warnings.push("Für diagonale Verlegung sind 5 % Reserve meist knapp; zeichne einen Reihen- und Zuschnittplan.");
  if (input.excludedAreaM2 > grossAreaM2 * 0.2) warnings.push("Die abgezogene Fläche ist groß. Prüfe, ob Randzuschnitte und Laufwege den Verschnitt trotzdem erhöhen.");
  if (input.floorHeating) warnings.push("Boden, Unterlage, Wärmedurchlasswiderstand und Heizprotokoll müssen gemeinsam für Fußbodenheizung freigegeben sein.");
  if (input.wetRoom) warnings.push("Für feuchtebelastete Räume sind nur ausdrücklich freigegebene Systeme und dichte Anschlussdetails geeignet.");
  if (!input.includeUnderlay) warnings.push("Keine separate Unterlage eingeplant: Prüfe, ob sie bereits integriert ist oder laut Systemaufbau ergänzt werden muss.");

  return {
    roomCount: input.rooms.length,
    grossAreaM2: round(grossAreaM2),
    netAreaM2: round(netAreaM2),
    purchaseAreaM2: round(purchaseAreaM2),
    plankAreaM2: round(plankAreaM2, 4),
    estimatedPlankCount: Math.ceil(purchaseAreaM2 / plankAreaM2),
    packageCount,
    orderedAreaM2: round(orderedAreaM2),
    areaSurplusM2: round(orderedAreaM2 - netAreaM2),
    perimeterM: round(perimeterM, 1),
    skirtingLengthWithReserveM: round(skirtingLengthWithReserveM, 1),
    skirtingBarCount: input.includeSkirting ? Math.ceil(skirtingLengthWithReserveM / input.skirtingBarLengthM) : 0,
    underlayAreaWithReserveM2: round(underlayAreaWithReserveM2),
    underlayRollCount: input.includeUnderlay ? Math.ceil(underlayAreaWithReserveM2 / input.underlayRollCoverageM2) : 0,
    warnings,
  };
}
