import type { CarportInput, CarportPlan } from "./types";

const round = (value: number, digits = 2) => {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

export function calculateCarportPlan(input: CarportInput): CarportPlan {
  const sideClearanceM = input.sideClearanceCm / 100;
  const clearWidthM = input.vehicleCount * input.vehicleWidthM + (input.vehicleCount + 1) * sideClearanceM;
  const clearLengthM = input.vehicleLengthM + input.frontClearanceCm / 100 + input.rearClearanceCm / 100 + input.storageDepthM;
  const clearHeightM = input.vehicleHeightM + input.verticalClearanceCm / 100;
  const coveredPlanningAreaM2 = clearWidthM * clearLengthM;
  const vehicleParkingAreaM2 = input.vehicleCount * input.vehicleLengthM * input.vehicleWidthM;
  const storageAreaM2 = clearWidthM * input.storageDepthM;
  const freeMovementAreaM2 = Math.max(0, coveredPlanningAreaM2 - vehicleParkingAreaM2 - storageAreaM2);
  const warnings = [
    "Die lichten Zielmaße sind ein Platzrahmen und keine Außen-, Bestell- oder Fundamentmaße eines konkreten Carports.",
    "Statik, Wind- und Schneelast, Pfosten, Fundamente, Verankerung, Brandschutz, Abstände und örtliche Anforderungen werden nicht bemessen.",
    "Das Regenwasserpotenzial ist ein theoretischer Geometriewert vor Rinnen-, Überlauf-, Speicher- und Verdunstungsverlusten.",
  ];

  if (input.sideClearanceCm < 50) warnings.push("Unter 50 cm seitlichem Planungsabstand je Rand beziehungsweise Fahrzeugzwischenraum können Türöffnung und Einsteigen unkomfortabel werden.");
  if (input.verticalClearanceCm < 25) warnings.push("Die Höhenreserve liegt unter 25 cm. Antennen, Dachaufbauten, geöffnete Heckklappe und zukünftige Fahrzeuge separat prüfen.");
  if (input.approach === "turn") warnings.push("Die Zufahrt erfolgt mit Richtungswechsel. Schleppkurve, Einfahrtsbreite, Tor, Pfostenpositionen und Rangierraum müssen vor Ort geprüft werden.");
  if (input.approach === "unknown") warnings.push("Die Zufahrt ist noch offen. Ein passendes Stellmaß garantiert ohne geprüfte Einfahrt und Rangierfläche keine Nutzbarkeit.");
  if (input.storageDepthM > 0) warnings.push("Der zusätzliche Stauraum benötigt einen eigenen Zugangs-, Befestigungs- und Wetterschutzplan und darf Fahr- oder Fluchtwege nicht blockieren.");
  if (input.installation === "attached") warnings.push("Beim Hausanschluss sind Fassade, Abdichtung, Entwässerung, Lastabtrag, Brandschutz und Anschlusshöhen objektspezifisch zu planen.");
  if (input.siteSlope !== "level") warnings.push("Das Grundstück ist nicht eben. Höhen, Entwässerung, Erdarbeiten und Fundamentausbildung gehören in ein genaues Aufmaß.");
  if (input.roofType === "undecided") warnings.push("Die Dachform ist noch offen; Aufbauhöhe, Gefälle, Entwässerungsrichtung und Lastabtrag verändern die konkrete Konstruktion.");
  if (input.drainage === "undecided") warnings.push("Für das Dachwasser fehlt noch ein Ziel. Rinne, Fallrohr, Überlauf und zulässige Ableitung müssen vor dem Aufbau geklärt werden.");
  if (input.evCharging) warnings.push("Eine Ladeeinrichtung erfordert eine fachgerecht geplante elektrische Versorgung, Schutztechnik, Leitungsführung und Prüfung der verfügbaren Anschlussleistung.");
  else if (input.electricityPlanned) warnings.push("Beleuchtung und Steckdosen im Außenbereich gehören in eine geeignete, fachgerecht geplante Elektroinstallation.");
  if (input.pvPlanned) warnings.push("Photovoltaik verändert Dachlast, Befestigung, Leitungswege und elektrische Planung; Tragwerk und System müssen dafür ausdrücklich geeignet sein.");

  return {
    clearWidthM: round(clearWidthM),
    clearLengthM: round(clearLengthM),
    clearHeightM: round(clearHeightM),
    coveredPlanningAreaM2: round(coveredPlanningAreaM2),
    vehicleParkingAreaM2: round(vehicleParkingAreaM2),
    storageAreaM2: round(storageAreaM2),
    freeMovementAreaM2: round(freeMovementAreaM2),
    theoreticalRainwaterPer10MmL: Math.round(coveredPlanningAreaM2 * 10),
    warnings,
  };
}
