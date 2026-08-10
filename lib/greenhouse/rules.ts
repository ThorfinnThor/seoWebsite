import type { GreenhouseInput, GreenhousePlan } from "./types";

const round = (value: number, digits = 2) => {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

export function calculateGreenhousePlan(input: GreenhouseInput): GreenhousePlan {
  const footprintM2 = input.lengthM * input.widthM;
  const bedDepthM = input.bedDepthCm / 100;
  const aisleWidthM = input.aisleWidthCm / 100;
  const endBedDepthM = input.endBedDepthCm / 100;
  const hasFixedBeds = input.layout !== "containers";
  const sideBedAreaM2 = hasFixedBeds ? 2 * bedDepthM * input.lengthM : 0;
  const endBedAreaM2 = input.layout === "u-shape" ? (input.widthM - 2 * bedDepthM) * endBedDepthM : 0;
  const pathLengthM = input.layout === "u-shape" ? input.lengthM - endBedDepthM : input.lengthM;
  const pathAreaM2 = aisleWidthM * pathLengthM;
  const growingAreaM2 = sideBedAreaM2 + endBedAreaM2;
  const requiredLayoutWidthCm = hasFixedBeds ? 2 * input.bedDepthCm + input.aisleWidthCm : input.aisleWidthCm;
  const remainingWidthCm = input.widthM * 100 - requiredLayoutWidthCm;
  const basePerimeterM = 2 * (input.lengthM + input.widthM);
  const baseLengthWithReserveM = basePerimeterM * 1.05;
  const warnings = [
    "Die Flächenberechnung ersetzt keine Montage-, Fundament-, Wind- oder Schneelastplanung des konkreten Gewächshauses.",
    "Das Regenwasserpotenzial ist ein theoretischer Geometriewert vor Überlauf, Spritz-, Rinnen- und Speicherverlusten.",
  ];

  if (remainingWidthCm < 10) warnings.push("Das gewählte Raster nutzt die Breite fast vollständig; Wandprofile, Schrägen und Montagetoleranzen benötigen ein genaueres Innenmaß.");
  if (input.layout === "containers") warnings.push("Bei Topf- und Tischkultur hängt die reale Anbaufläche von Stellflächen, Regalhöhen und Bewegungswegen ab.");
  if (input.doorWidthCm < 80) warnings.push("Unter 80 cm bekannte Türbreite können Schubkarre, breite Kisten oder eingeschränkte Zugänge problematisch werden.");
  if (input.roofVentCount === 0) warnings.push("Es ist kein Dachfenster eingetragen. Lüftungsöffnungen müssen passend zu Größe, Nutzung und System geplant werden.");
  if (!input.crossVentilation) warnings.push("Ohne gegenüberliegende Öffnung ist eine wirksame Querlüftung nicht bestätigt.");
  if (input.useCase === "overwintering") warnings.push("Für Überwinterung berechnet der Planer weder Heizleistung noch Frostschutz, Energiebedarf oder elektrische Installation.");
  if (input.glazing === "undecided") warnings.push("Verglasung ist noch offen; Gewicht, Licht, Wärmedämmung, Befestigung und Bruchverhalten unterscheiden sich deutlich.");
  if (!input.waterAtSite) warnings.push("Ohne Wasseranschluss am Standort müssen Speichergröße, Transportweg und Bewässerungsroutine vorab gelöst werden.");
  if (input.electricityPlanned) warnings.push("Strom im feuchten Gartenumfeld gehört in eine geeignete, fachgerecht geplante Installation.");

  return {
    footprintM2: round(footprintM2),
    requiredLayoutWidthCm: round(requiredLayoutWidthCm, 1),
    remainingWidthCm: round(remainingWidthCm, 1),
    sideBedAreaM2: round(sideBedAreaM2),
    endBedAreaM2: round(endBedAreaM2),
    growingAreaM2: round(growingAreaM2),
    pathAreaM2: round(pathAreaM2),
    flexibleFloorAreaM2: round(Math.max(0, footprintM2 - growingAreaM2 - pathAreaM2)),
    exposedBedEdgeM: round(hasFixedBeds ? 2 * input.lengthM + (input.layout === "u-shape" ? input.widthM - 2 * bedDepthM : 0) : 0, 1),
    basePerimeterM: round(basePerimeterM, 1),
    baseLengthWithReserveM: round(baseLengthWithReserveM, 1),
    baseBarCount: Math.ceil(baseLengthWithReserveM / input.baseBarLengthM),
    theoreticalRainwaterPer10MmL: Math.round(footprintM2 * 10),
    warnings,
  };
}
