import dehumidifierCatalogJson from "@/public/data/dehumidifier/catalog.json";
import flooringCatalogJson from "@/public/data/flooring/catalog.json";
import gardenHouseCatalogJson from "@/public/data/garden-house/catalog.json";
import { DehumidifierCatalogSchema, type DehumidifierProduct } from "@/lib/dehumidifier/types";
import { FlooringCatalogSchema, type FlooringProduct } from "@/lib/flooring/types";
import { GardenHouseCatalogSchema, type GardenHouseProduct } from "@/lib/garden-house/types";
import { bestAvailablePriceByProduct, countDistinct, formatReportDate, median, percent, quantile, rounded } from "./statistics";

const gardenHouseCatalog = GardenHouseCatalogSchema.parse(gardenHouseCatalogJson);
const flooringCatalog = FlooringCatalogSchema.parse(flooringCatalogJson);
const dehumidifierCatalog = DehumidifierCatalogSchema.parse(dehumidifierCatalogJson);

function reportProducts<T extends { reviewed: boolean }>(products: readonly T[]): T[] {
  return products.filter((product) => product.reviewed);
}

function values<T>(products: readonly T[], getValue: (product: T) => number | undefined): number[] {
  return products.map(getValue).filter((value): value is number => Number.isFinite(value));
}

function priceValues<T extends { id: string }>(products: readonly T[], prices: ReadonlyMap<string, number>): number[] {
  return products.map((product) => prices.get(product.id)).filter((price): price is number => price !== undefined);
}

function summarizeGardenHouses(products: readonly GardenHouseProduct[], prices: ReadonlyMap<string, number>) {
  const pricePerSquareMeter = products.flatMap((product) => {
    const price = prices.get(product.id);
    return price === undefined ? [] : [price / product.footprintM2];
  });
  return {
    count: products.length,
    medianAreaM2: rounded(median(values(products, (product) => product.footprintM2)), 1),
    medianPriceEur: rounded(median(priceValues(products, prices))),
    lowerPriceEur: rounded(quantile(priceValues(products, prices), 0.25)),
    upperPriceEur: rounded(quantile(priceValues(products, prices), 0.75)),
    medianPricePerM2Eur: rounded(median(pricePerSquareMeter)),
  };
}

const gardenHouseProducts = reportProducts(gardenHouseCatalog.products);
const gardenHousePrices = bestAvailablePriceByProduct(gardenHouseCatalog);
const gardenHouseWithPrices = gardenHouseProducts.filter((product) => gardenHousePrices.has(product.id));

const gardenHouseMaterials = [
  { key: "wood", label: "Holz" },
  { key: "metal", label: "Metall" },
  { key: "plastic", label: "Kunststoff" },
] as const;

const gardenHouseSizeBands = [
  { label: "Bis 5 m²", matches: (product: GardenHouseProduct) => product.footprintM2 <= 5 },
  { label: "Über 5 bis 10 m²", matches: (product: GardenHouseProduct) => product.footprintM2 > 5 && product.footprintM2 <= 10 },
  { label: "Über 10 bis 20 m²", matches: (product: GardenHouseProduct) => product.footprintM2 > 10 && product.footprintM2 <= 20 },
  { label: "Über 20 m²", matches: (product: GardenHouseProduct) => product.footprintM2 > 20 },
] as const;

export const gardenHouseDataReport = {
  generatedAt: gardenHouseCatalog.generatedAt,
  updatedLabel: formatReportDate(gardenHouseCatalog.generatedAt),
  total: gardenHouseProducts.length,
  available: gardenHouseWithPrices.length,
  brands: countDistinct(gardenHouseProducts.map((product) => product.brand)),
  summary: summarizeGardenHouses(gardenHouseWithPrices, gardenHousePrices),
  materials: gardenHouseMaterials.map(({ key, label }) => {
    const products = gardenHouseWithPrices.filter((product) => product.material === key);
    return { key, label, share: rounded(percent(products.length, gardenHouseWithPrices.length), 1), ...summarizeGardenHouses(products, gardenHousePrices) };
  }),
  sizes: gardenHouseSizeBands.map(({ label, matches }) => ({ label, ...summarizeGardenHouses(gardenHouseWithPrices.filter(matches), gardenHousePrices) })),
  roofs: [
    { label: "Flachdach", count: gardenHouseProducts.filter((product) => product.roofType === "flat").length },
    { label: "Satteldach", count: gardenHouseProducts.filter((product) => product.roofType === "gable").length },
    { label: "Pultdach", count: gardenHouseProducts.filter((product) => product.roofType === "pent").length },
    { label: "Nicht eindeutig angegeben", count: gardenHouseProducts.filter((product) => product.roofType === undefined).length },
  ].map((row) => ({ ...row, share: rounded(percent(row.count, gardenHouseProducts.length), 1) })),
  coverage: {
    wallThickness: gardenHouseProducts.filter((product) => product.wallThicknessMm !== undefined).length,
    floorIncluded: gardenHouseProducts.filter((product) => product.floorIncluded !== undefined).length,
    roofType: gardenHouseProducts.filter((product) => product.roofType !== undefined).length,
  },
} as const;

function flooringScenario(products: readonly FlooringProduct[], prices: ReadonlyMap<string, number>) {
  const orderAreaM2 = 22;
  const orders = products.flatMap((product) => {
    const price = prices.get(product.id);
    if (price === undefined || product.packageCoverageM2 === undefined) return [];
    const packages = Math.ceil(orderAreaM2 / product.packageCoverageM2);
    return [{ packages, orderedAreaM2: packages * product.packageCoverageM2, materialCostEur: packages * price }];
  });
  return {
    products: orders.length,
    medianPackages: rounded(median(orders.map((order) => order.packages))),
    medianOrderedAreaM2: rounded(median(orders.map((order) => order.orderedAreaM2)), 1),
    lowerMaterialCostEur: rounded(quantile(orders.map((order) => order.materialCostEur), 0.25)),
    medianMaterialCostEur: rounded(median(orders.map((order) => order.materialCostEur))),
    upperMaterialCostEur: rounded(quantile(orders.map((order) => order.materialCostEur), 0.75)),
  };
}

const flooringProducts = reportProducts(flooringCatalog.products);
const flooringPrices = bestAvailablePriceByProduct(flooringCatalog);
const flooringTypes = [
  { key: "laminate", label: "Laminat" },
  { key: "vinyl-click", label: "Klickvinyl" },
  { key: "parquet-floating", label: "Fertigparkett" },
] as const;

export const flooringDataReport = {
  generatedAt: flooringCatalog.generatedAt,
  updatedLabel: formatReportDate(flooringCatalog.generatedAt),
  total: flooringProducts.length,
  available: flooringProducts.filter((product) => flooringPrices.has(product.id)).length,
  brands: countDistinct(flooringProducts.map((product) => product.brand)),
  floorHeatingApproved: flooringProducts.filter((product) => product.floorHeatingApproved === true).length,
  floorHeatingUnknown: flooringProducts.filter((product) => product.floorHeatingApproved === undefined).length,
  wetRoomApproved: flooringProducts.filter((product) => product.wetRoomApproved === true).length,
  wetRoomRejected: flooringProducts.filter((product) => product.wetRoomApproved === false).length,
  wetRoomUnknown: flooringProducts.filter((product) => product.wetRoomApproved === undefined).length,
  types: flooringTypes.map(({ key, label }) => {
    const products = flooringProducts.filter((product) => product.flooringType === key);
    return {
      key,
      label,
      count: products.length,
      share: rounded(percent(products.length, flooringProducts.length), 1),
      medianPackageCoverageM2: rounded(median(values(products, (product) => product.packageCoverageM2)), 2),
      medianThicknessMm: rounded(median(values(products, (product) => product.thicknessMm)), 1),
      floorHeatingApproved: products.filter((product) => product.floorHeatingApproved === true).length,
      wetRoomApproved: products.filter((product) => product.wetRoomApproved === true).length,
      medianPackagePriceEur: rounded(median(priceValues(products, flooringPrices)), 2),
      scenario: flooringScenario(products, flooringPrices),
    };
  }),
} as const;

function summarizeDehumidifiers(products: readonly DehumidifierProduct[], prices: ReadonlyMap<string, number>) {
  return {
    count: products.length,
    available: products.filter((product) => prices.has(product.id)).length,
    medianPriceEur: rounded(median(priceValues(products, prices)), 2),
    extractionKnown: products.filter((product) => product.extractionLPerDay !== undefined).length,
    medianExtractionLPerDay: rounded(median(values(products, (product) => product.extractionLPerDay)), 1),
    noiseKnown: products.filter((product) => product.noiseDb !== undefined).length,
    medianNoiseDb: rounded(median(values(products, (product) => product.noiseDb)), 1),
  };
}

const dehumidifierProducts = reportProducts(dehumidifierCatalog.products);
const dehumidifierPrices = bestAvailablePriceByProduct(dehumidifierCatalog);
const performanceBands = [
  { label: "Bis 12 Liter pro Tag", matches: (product: DehumidifierProduct) => product.extractionLPerDay !== undefined && product.extractionLPerDay <= 12 },
  { label: "Über 12 bis 20 Liter", matches: (product: DehumidifierProduct) => product.extractionLPerDay !== undefined && product.extractionLPerDay > 12 && product.extractionLPerDay <= 20 },
  { label: "Über 20 Liter", matches: (product: DehumidifierProduct) => product.extractionLPerDay !== undefined && product.extractionLPerDay > 20 },
] as const;

export const dehumidifierDataReport = {
  generatedAt: dehumidifierCatalog.generatedAt,
  updatedLabel: formatReportDate(dehumidifierCatalog.generatedAt),
  total: dehumidifierProducts.length,
  available: dehumidifierProducts.filter((product) => dehumidifierPrices.has(product.id)).length,
  brands: countDistinct(dehumidifierProducts.map((product) => product.brand)),
  summary: summarizeDehumidifiers(dehumidifierProducts, dehumidifierPrices),
  featureCounts: {
    continuousDrain: dehumidifierProducts.filter((product) => product.continuousDrain).length,
    laundryMode: dehumidifierProducts.filter((product) => product.laundryMode === true).length,
    laundryModeUnknown: dehumidifierProducts.filter((product) => product.laundryMode === undefined).length,
  },
  coverage: [
    { label: "Entfeuchtungsleistung", count: dehumidifierProducts.filter((product) => product.extractionLPerDay !== undefined).length },
    { label: "Geräuschwert", count: dehumidifierProducts.filter((product) => product.noiseDb !== undefined).length },
    { label: "Leistungsaufnahme", count: dehumidifierProducts.filter((product) => product.powerW !== undefined).length },
    { label: "Niedrigste Betriebstemperatur", count: dehumidifierProducts.filter((product) => product.minOperatingTempC !== undefined).length },
    { label: "Tankgröße", count: dehumidifierProducts.filter((product) => product.tankLiters !== undefined).length },
  ].map((row) => ({ ...row, share: rounded(percent(row.count, dehumidifierProducts.length), 1) })),
  performanceBands: performanceBands.map(({ label, matches }) => ({ label, ...summarizeDehumidifiers(dehumidifierProducts.filter(matches), dehumidifierPrices) })),
} as const;
