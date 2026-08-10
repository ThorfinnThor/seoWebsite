import type { RobotMowerInput, RobotMowerPlan } from "./types";

const round = (value: number, digits = 1) => {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

export function calculateRobotMowerPlan(input: RobotMowerInput): RobotMowerPlan {
  const grossAreaM2 = input.areas.reduce((total, area) => total + area.lengthM * area.widthM, 0);
  const excludedAreaM2 = input.areas.reduce((total, area) => total + area.excludedAreaM2, 0);
  const netAreaM2 = grossAreaM2 - excludedAreaM2;
  const rectangularPerimeterM = input.areas.reduce((total, area) => total + 2 * (area.lengthM + area.widthM), 0);

  let capacityFactor = 1.2;
  if (input.complexity === "moderate") capacityFactor += 0.1;
  if (input.complexity === "complex") capacityFactor += 0.2;
  if (input.growth === "strong") capacityFactor += 0.1;
  if (input.mowingZones > 1) capacityFactor += 0.05;
  if (input.separatedAreas) capacityFactor += 0.15;

  const requiredRatedAreaM2 = Math.ceil((netAreaM2 * capacityFactor) / 50) * 50;
  const passageClass = input.narrowestPassageCm < 60 ? "tight" : input.narrowestPassageCm < 100 ? "narrow" : "open";
  const setupTasks: string[] = [];
  const warnings = [
    "Die Flächenklasse ist eine transparente Auswahlheuristik und keine Garantie für Fahrzeit, Schnittbild oder vollständige Abdeckung.",
    "Steigung, Passagen, Kanten und Hindernisse müssen mit den freigegebenen Grenzen des konkreten Geräts geprüft werden.",
  ];

  if (input.boundarySystem === "wire") setupTasks.push("Installationsabstände, Inseln, Leitungsführung und zulässige Kabelkreuzungen aus der konkreten Anleitung übernehmen.");
  if (input.boundarySystem === "wireless") setupTasks.push("Empfang, Referenzstation beziehungsweise Signaldeckung und abgeschattete Bereiche am Standort praktisch prüfen.");
  if (input.boundarySystem === "undecided") setupTasks.push("Kabelgebundene und kabellose Begrenzung anhand von Gartenstruktur, Empfang und Änderungsbedarf vergleichen.");
  if (!input.powerAtStation) setupTasks.push("Einen fachgerecht nutzbaren Stromanschluss für die freigegebene Position der Ladestation klären.");
  if (!input.rainShelteredStation) setupTasks.push("Zulässige Aufstellung und mögliche Überdachung nach Herstellerangaben prüfen, ohne Zufahrt oder Signal zu blockieren.");

  if (input.areas.length > 1) warnings.push("Rechteckige Teilflächen können gemeinsame Kanten doppelt enthalten; der Kabelrahmen ist deshalb nur eine obere Geometrieschätzung.");
  if (input.obstacleCount > 8) warnings.push("Viele Bäume, Beete oder Einbauten erhöhen Rangieraufwand und mögliche Auslassungen; die reine Quadratmeterleistung reicht dann nicht als Auswahlkriterium.");
  if (passageClass === "tight") warnings.push("Die engste Passage liegt unter 60 cm. Durchfahrt, Wendefläche und Begrenzungsabstände sind stark systemabhängig und müssen konkret bestätigt werden.");
  if (passageClass === "narrow") warnings.push("Passagen unter 100 cm sollten mit den herstellerspezifischen Mindestmaßen und der geplanten Leitungs- oder Navigationsführung abgeglichen werden.");
  if (input.maximumSlopePercent > 35) warnings.push("Die eingetragene maximale Steigung schränkt die Geräteauswahl deutlich ein; miss die steilste relevante Stelle und prüfe zusätzlich Kanten und Nässe.");
  if (input.separatedAreas) warnings.push("Getrennte Rasenflächen benötigen eine bestätigte Verbindung, manuelles Umsetzen oder eine eigene Gerätestrategie.");
  if (input.boundarySystem === "wireless" && !input.reliableReception) warnings.push("Kabellose Navigation ist ohne bestätigten Empfang am gesamten Arbeitsbereich noch keine belastbare Auswahl.");

  return {
    areaCount: input.areas.length,
    grossAreaM2: round(grossAreaM2),
    netAreaM2: round(netAreaM2),
    capacityFactor: round(capacityFactor, 2),
    requiredRatedAreaM2,
    rectangularPerimeterM: round(rectangularPerimeterM),
    boundaryWireFrameM: Math.ceil(rectangularPerimeterM * 1.1),
    passageClass,
    setupTasks,
    warnings,
  };
}
