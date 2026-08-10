import type { PrivacyScreenInput, PrivacyScreenPlan } from "./types";

const round = (value: number, digits = 1) => {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

export function calculatePrivacyScreenPlan(input: PrivacyScreenInput): PrivacyScreenPlan {
  const targetLengthCm = input.totalLengthM * 100;
  const gateLengthCm = input.gateCount * input.gateModuleWidthCm;
  const panelCount = Math.ceil((targetLengthCm - gateLengthCm) / input.systemFieldWidthCm);
  const bayCount = panelCount + input.gateCount;
  const fullSystemLengthCm = panelCount * input.systemFieldWidthCm + gateLengthCm;
  const endAdjustmentCm = Math.max(0, fullSystemLengthCm - targetLengthCm);
  const adjustmentRequired = endAdjustmentCm > 0;
  const warnings = [
    "Verwende das Montage- oder Achsmaß des konkreten Systems; die reine Elementbreite kann davon abweichen.",
    "Pfostenquerschnitt, Befestiger, Fundament und Windlast müssen nach Herstellerangaben und vor Ort festgelegt werden.",
  ];

  if (adjustmentRequired) {
    warnings.push(`Das letzte Standardfeld muss rechnerisch um ${round(endAdjustmentCm)} cm angepasst oder durch ein passendes Sonderfeld ersetzt werden.`);
  }
  if (!input.reservePanel) warnings.push("Ohne Reserveelement sollte die Bestellmenge erst nach einem vollständigen Aufmaß freigegeben werden.");
  if (input.fenceHeightCm >= 200) warnings.push("Bei mindestens 200 cm Höhe steigen Windangriffsfläche und Hebelwirkung; verwende nur ein dafür freigegebenes Gesamtsystem.");
  if (input.terrain === "sloped") warnings.push("Bei Gefälle sind Stufung, Bodenfreiheit und unterschiedliche Pfostenhöhen separat zu planen.");
  if (input.windExposure === "exposed") warnings.push("Die angegebene Lage ist windexponiert; eine fachkundige Prüfung von Systemfreigabe, Verankerung und Fundamenten ist besonders wichtig.");

  if (input.mountingType === "ground") {
    warnings.push("Für einbetonierte Pfosten berechnet der Planer weder Fundamentdurchmesser noch Fundamenttiefe.");
  } else if (input.mountingType === "baseplate") {
    warnings.push("Bei Fußplatten müssen Untergrund, Randabstände, Dübel und zulässige Lasten zusammenpassen.");
  } else {
    warnings.push("Vorhandene Fundamente oder Mauern müssen für Geometrie und Lasten des neuen Systems nachweislich geeignet sein.");
  }

  return {
    targetLengthCm: round(targetLengthCm),
    gateLengthCm: round(gateLengthCm),
    panelCount,
    orderPanelCount: panelCount + (input.reservePanel ? 1 : 0),
    bayCount,
    postCount: bayCount + 1,
    anchoringPointCount: bayCount + 1,
    fullSystemLengthCm: round(fullSystemLengthCm),
    endAdjustmentCm: round(endAdjustmentCm),
    lastFieldWidthCm: round(input.systemFieldWidthCm - endAdjustmentCm),
    adjustmentRequired,
    warnings,
  };
}
