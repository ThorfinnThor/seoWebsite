import projectCatalogJson from "@/public/data/project-products/catalog.json";
import { ProjectCatalogSchema, type ProjectProduct, type ProjectVertical } from "@/lib/project-products/types";
import { bestAvailablePriceByProduct, countDistinct, formatReportDate, median, percent, quantile, rounded } from "./statistics";

const catalog = ProjectCatalogSchema.parse(projectCatalogJson);
const prices = bestAvailablePriceByProduct(catalog);

function productsFor(vertical: ProjectVertical) {
  return catalog.products.filter((product) => product.reviewed && product.vertical === vertical);
}

function numeric<T>(items: readonly T[], read: (item: T) => number | undefined) {
  return items.map(read).filter((value): value is number => Number.isFinite(value));
}

function priceValues(items: readonly ProjectProduct[]) {
  return items.map((product) => prices.get(product.id)).filter((value): value is number => value !== undefined);
}

function base(vertical: ProjectVertical) {
  const products = productsFor(vertical);
  return {
    generatedAt: catalog.generatedAt,
    updatedLabel: formatReportDate(catalog.generatedAt),
    total: products.length,
    available: products.filter((product) => prices.has(product.id)).length,
    brands: countDistinct(products.map((product) => product.brand)),
    medianPriceEur: rounded(median(priceValues(products)), 2),
  };
}

function groupSummary(items: readonly ProjectProduct[]) {
  return {
    count: items.length,
    medianPriceEur: rounded(median(priceValues(items)), 2),
    lowerPriceEur: rounded(quantile(priceValues(items), 0.25), 2),
    upperPriceEur: rounded(quantile(priceValues(items), 0.75), 2),
  };
}

const carportProducts = productsFor("carport");
const carportKits = carportProducts.filter((product) => product.kind === "kit");

function carportKitSummary(items: readonly ProjectProduct[]) {
  const footprint = items.flatMap((product) => product.externalWidthM !== undefined && product.externalLengthM !== undefined ? [product.externalWidthM * product.externalLengthM] : []);
  return {
    ...groupSummary(items),
    medianWidthM: rounded(median(numeric(items, (product) => product.externalWidthM)), 2),
    medianLengthM: rounded(median(numeric(items, (product) => product.externalLengthM)), 2),
    medianFootprintM2: rounded(median(footprint), 1),
  };
}

export const carportProjectReport = {
  ...base("carport"),
  kits: carportKitSummary(carportKits),
  vehicleGroups: [1, 2].map((vehicleCount) => ({ vehicleCount, ...carportKitSummary(carportKits.filter((product) => product.vehicleCount === vehicleCount)) })),
  footprintBands: [
    { label: "Bis 20 m²", matches: (product: ProjectProduct) => (product.externalWidthM ?? 0) * (product.externalLengthM ?? 0) <= 20 },
    { label: "Über 20 bis 35 m²", matches: (product: ProjectProduct) => { const area = (product.externalWidthM ?? 0) * (product.externalLengthM ?? 0); return area > 20 && area <= 35; } },
    { label: "Über 35 m²", matches: (product: ProjectProduct) => (product.externalWidthM ?? 0) * (product.externalLengthM ?? 0) > 35 },
  ].map(({ label, matches }) => ({ label, ...carportKitSummary(carportKits.filter(matches)) })),
  kinds: [
    { key: "kit", label: "Carport Bausätze" }, { key: "panel", label: "Seiten und Frontelemente" }, { key: "foundation", label: "Fundamentteile" },
    { key: "drainage", label: "Entwässerung" }, { key: "electric", label: "Elektrik" },
  ].map(({ key, label }) => ({ key, label, ...groupSummary(carportProducts.filter((product) => product.kind === key)) })),
  coverage: {
    externalDimensions: carportProducts.filter((product) => product.externalWidthM !== undefined && product.externalLengthM !== undefined).length,
    clearDimensions: carportProducts.filter((product) => product.clearWidthM !== undefined || product.clearLengthM !== undefined).length,
    clearHeight: carportProducts.filter((product) => product.clearHeightM !== undefined).length,
    roofType: carportProducts.filter((product) => product.roofType !== undefined).length,
    installationType: carportProducts.filter((product) => product.installationType !== undefined).length,
  },
} as const;

const greenhouseProducts = productsFor("greenhouse");
const greenhouseKits = greenhouseProducts.filter((product) => product.kind === "kit");

function greenhouseSummary(items: readonly ProjectProduct[]) {
  const areas = items.flatMap((product) => product.externalWidthM !== undefined && product.externalLengthM !== undefined ? [product.externalWidthM * product.externalLengthM] : []);
  return {
    ...groupSummary(items),
    medianAreaM2: rounded(median(areas), 1),
    medianHeightM: rounded(median(numeric(items, (product) => product.clearHeightM)), 2),
  };
}

export const greenhouseProjectReport = {
  ...base("greenhouse"),
  kits: greenhouseSummary(greenhouseKits),
  areaBands: [
    { label: "Bis 5 m²", matches: (product: ProjectProduct) => product.externalWidthM !== undefined && product.externalLengthM !== undefined && product.externalWidthM * product.externalLengthM <= 5 },
    { label: "Über 5 bis 10 m²", matches: (product: ProjectProduct) => { const area = (product.externalWidthM ?? 0) * (product.externalLengthM ?? 0); return area > 5 && area <= 10; } },
    { label: "Über 10 m²", matches: (product: ProjectProduct) => (product.externalWidthM ?? 0) * (product.externalLengthM ?? 0) > 10 },
  ].map(({ label, matches }) => ({ label, ...greenhouseSummary(greenhouseKits.filter(matches)) })),
  glazing: [
    { key: "polycarbonate", label: "Hohlkammerplatten" }, { key: "glass", label: "Glas" }, { key: "mixed", label: "Mischverglasung" },
    { key: "foil", label: "Folie" }, { key: "unknown", label: "Nicht dokumentiert" },
  ].map(({ key, label }) => ({ key, label, ...greenhouseSummary(greenhouseKits.filter((product) => (product.glazingType ?? "unknown") === key)) })),
  kinds: [
    { key: "kit", label: "Gewächshäuser" }, { key: "ventilation", label: "Lüftung" }, { key: "bench", label: "Pflanztisch" }, { key: "shade", label: "Beschattung" },
  ].map(({ key, label }) => ({ key, label, ...groupSummary(greenhouseProducts.filter((product) => product.kind === key)) })),
  coverage: {
    area: greenhouseProducts.filter((product) => product.externalWidthM !== undefined && product.externalLengthM !== undefined).length,
    height: greenhouseProducts.filter((product) => product.clearHeightM !== undefined).length,
    glazing: greenhouseProducts.filter((product) => product.glazingType !== undefined && product.glazingType !== "unknown").length,
    doorWidth: greenhouseProducts.filter((product) => product.doorWidthCm !== undefined).length,
    roofVents: greenhouseProducts.filter((product) => product.roofVentCount !== undefined).length,
  },
} as const;

const privacyProducts = productsFor("privacy-screen");
const privacyPanels = privacyProducts.filter((product) => product.kind === "panel");

function privacyPanelSummary(items: readonly ProjectProduct[]) {
  const pricesPerMeter = items.flatMap((product) => {
    const price = prices.get(product.id);
    return price !== undefined && product.panelWidthCm !== undefined ? [price / (product.panelWidthCm / 100)] : [];
  });
  const tenMeterCosts = items.flatMap((product) => {
    const price = prices.get(product.id);
    return price !== undefined && product.panelWidthCm !== undefined ? [Math.ceil(1000 / product.panelWidthCm) * price] : [];
  });
  return {
    ...groupSummary(items),
    medianWidthCm: rounded(median(numeric(items, (product) => product.panelWidthCm))),
    medianHeightCm: rounded(median(numeric(items, (product) => product.panelHeightCm))),
    medianPricePerMeterEur: rounded(median(pricesPerMeter), 2),
    medianTenMeterCostEur: rounded(median(tenMeterCosts), 2),
  };
}

export const privacyProjectReport = {
  ...base("privacy-screen"),
  panels: privacyPanelSummary(privacyPanels),
  widthBands: [
    { label: "Bis 100 cm", matches: (product: ProjectProduct) => (product.panelWidthCm ?? 0) <= 100 },
    { label: "Über 100 bis 200 cm", matches: (product: ProjectProduct) => (product.panelWidthCm ?? 0) > 100 && (product.panelWidthCm ?? 0) <= 200 },
    { label: "Über 200 cm", matches: (product: ProjectProduct) => (product.panelWidthCm ?? 0) > 200 },
  ].map(({ label, matches }) => ({ label, ...privacyPanelSummary(privacyPanels.filter(matches)) })),
  heightBands: [
    { label: "Bis 100 cm", matches: (product: ProjectProduct) => (product.panelHeightCm ?? 0) <= 100 },
    { label: "Über 100 bis 160 cm", matches: (product: ProjectProduct) => (product.panelHeightCm ?? 0) > 100 && (product.panelHeightCm ?? 0) <= 160 },
    { label: "Über 160 cm", matches: (product: ProjectProduct) => (product.panelHeightCm ?? 0) > 160 },
  ].map(({ label, matches }) => ({ label, ...privacyPanelSummary(privacyPanels.filter(matches)) })),
  kinds: [
    { key: "panel", label: "Elemente und Matten" }, { key: "post", label: "Pfosten" }, { key: "gate", label: "Tore" },
    { key: "bracket", label: "Halterungen" }, { key: "foundation", label: "Fundamentteile" },
  ].map(({ key, label }) => ({ key, label, ...groupSummary(privacyProducts.filter((product) => product.kind === key)) })),
  coverage: {
    panelDimensions: privacyProducts.filter((product) => product.panelWidthCm !== undefined && product.panelHeightCm !== undefined).length,
    material: privacyProducts.filter((product) => product.material !== undefined).length,
    gateCompatible: privacyProducts.filter((product) => product.gateCompatible !== undefined).length,
    postSystem: privacyProducts.filter((product) => product.postSystemId !== undefined).length,
    mountingType: privacyProducts.filter((product) => product.mountingType !== undefined).length,
  },
} as const;

const terraceProducts = productsFor("terrace");
const terraceDecking = terraceProducts.filter((product) => product.kind === "decking");

function terraceDeckingSummary(items: readonly ProjectProduct[]) {
  return {
    ...groupSummary(items),
    medianLengthMm: rounded(median(numeric(items, (product) => product.boardLengthMm))),
    medianWidthMm: rounded(median(numeric(items, (product) => product.boardWidthMm))),
    medianThicknessMm: rounded(median(numeric(items, (product) => product.boardThicknessMm)), 1),
  };
}

export const terraceProjectReport = {
  ...base("terrace"),
  decking: terraceDeckingSummary(terraceDecking),
  materials: [
    { key: "wood", label: "Holz" }, { key: "wpc", label: "WPC" },
  ].map(({ key, label }) => ({ key, label, ...terraceDeckingSummary(terraceDecking.filter((product) => product.material === key)) })),
  lengthBands: [
    { label: "Bis 2.500 mm", matches: (product: ProjectProduct) => product.boardLengthMm !== undefined && product.boardLengthMm <= 2500 },
    { label: "Über 2.500 bis 4.000 mm", matches: (product: ProjectProduct) => (product.boardLengthMm ?? 0) > 2500 && (product.boardLengthMm ?? 0) <= 4000 },
    { label: "Über 4.000 mm", matches: (product: ProjectProduct) => (product.boardLengthMm ?? 0) > 4000 },
  ].map(({ label, matches }) => ({ label, ...terraceDeckingSummary(terraceDecking.filter(matches)) })),
  kinds: [
    { key: "decking", label: "Dielen" }, { key: "substructure", label: "Unterkonstruktion" }, { key: "fastening", label: "Befestigung" }, { key: "bracket", label: "Verbinder" },
  ].map(({ key, label }) => ({ key, label, ...groupSummary(terraceProducts.filter((product) => product.kind === key)) })),
  coverage: {
    material: terraceProducts.filter((product) => product.material !== undefined).length,
    boardDimensions: terraceProducts.filter((product) => product.boardLengthMm !== undefined && product.boardWidthMm !== undefined && product.boardThicknessMm !== undefined).length,
    packageCoverage: terraceProducts.filter((product) => product.packageCoverageM2 !== undefined).length,
    packageLinearMeters: terraceProducts.filter((product) => product.packageLinearM !== undefined).length,
    piecesPerPack: terraceProducts.filter((product) => product.piecesPerPack !== undefined).length,
    systemId: terraceProducts.filter((product) => product.systemId !== undefined).length,
  },
} as const;

const drywallProducts = productsFor("drywall");
const drywallBoards = drywallProducts.filter((product) => product.kind === "board");
const drywallProfiles = drywallProducts.filter((product) => product.kind === "profile");

function drywallBoardSummary(items: readonly ProjectProduct[]) {
  return {
    ...groupSummary(items),
    medianThicknessMm: rounded(median(numeric(items, (product) => product.boardThicknessMm)), 1),
    dimensionsKnown: items.filter((product) => product.boardLengthMm !== undefined && product.boardWidthMm !== undefined).length,
  };
}

function drywallProfileSummary(items: readonly ProjectProduct[]) {
  const packLinearMeters = items.flatMap((product) => product.profileLengthMm !== undefined && product.piecesPerPack !== undefined ? [(product.profileLengthMm / 1000) * product.piecesPerPack] : []);
  return {
    ...groupSummary(items),
    medianLengthMm: rounded(median(numeric(items, (product) => product.profileLengthMm))),
    medianWidthMm: rounded(median(numeric(items, (product) => product.profileWidthMm))),
    medianPiecesPerPack: rounded(median(numeric(items, (product) => product.piecesPerPack))),
    medianPackLinearM: rounded(median(packLinearMeters), 1),
  };
}

export const drywallProjectReport = {
  ...base("drywall"),
  boards: drywallBoardSummary(drywallBoards),
  boardTypes: [
    { key: "standard", label: "Standardplatten" }, { key: "moisture", label: "Feuchtraumplatten" },
    { key: "fire-acoustic", label: "Brand und Schallschutzplatten" }, { key: "gypsum-fiber", label: "Gipsfaserplatten" },
  ].map(({ key, label }) => ({ key, label, ...drywallBoardSummary(drywallBoards.filter((product) => product.boardType === key)) })),
  profiles: drywallProfileSummary(drywallProfiles),
  profileWidths: [50, 75, 100].map((widthMm) => ({ widthMm, ...drywallProfileSummary(drywallProfiles.filter((product) => product.profileWidthMm === widthMm)) })),
  kinds: [
    { key: "board", label: "Platten" }, { key: "profile", label: "Profile" }, { key: "joint", label: "Fugenmaterial" }, { key: "insulation", label: "Dämmung" },
  ].map(({ key, label }) => ({ key, label, ...groupSummary(drywallProducts.filter((product) => product.kind === key)) })),
  coverage: {
    boardType: drywallProducts.filter((product) => product.boardType !== undefined).length,
    boardThickness: drywallProducts.filter((product) => product.boardThicknessMm !== undefined).length,
    boardDimensions: drywallProducts.filter((product) => product.boardLengthMm !== undefined && product.boardWidthMm !== undefined).length,
    moistureApproval: drywallProducts.filter((product) => product.moistureApproved !== undefined).length,
    fireClass: drywallProducts.filter((product) => product.fireClass !== undefined).length,
    profileWidth: drywallProducts.filter((product) => product.profileWidthMm !== undefined).length,
    profileLength: drywallProducts.filter((product) => product.profileLengthMm !== undefined).length,
    profileDimensions: drywallProducts.filter((product) => product.profileLengthMm !== undefined && product.profileWidthMm !== undefined).length,
  },
} as const;

export const projectReportMeta = {
  generatedAt: catalog.generatedAt,
  updatedLabel: formatReportDate(catalog.generatedAt),
  total: catalog.products.filter((product) => product.reviewed).length,
  verticalShares: (["carport", "greenhouse", "privacy-screen", "terrace", "drywall"] as const).map((vertical) => ({
    vertical,
    count: productsFor(vertical).length,
    share: rounded(percent(productsFor(vertical).length, catalog.products.length), 1),
  })),
} as const;
