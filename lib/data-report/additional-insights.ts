import flooringCatalogJson from "@/public/data/flooring/catalog.json";
import gardenHouseCatalogJson from "@/public/data/garden-house/catalog.json";
import securityCameraCatalogJson from "@/public/data/security-camera/catalog.json";
import { bestAvailablePriceByProduct, countDistinct, formatReportDate, median, percent, rounded } from "./statistics";
import { FlooringCatalogSchema, type FlooringProduct } from "@/lib/flooring/types";
import { GardenHouseCatalogSchema, type GardenHouseProduct } from "@/lib/garden-house/types";
import { SecurityCameraCatalogSchema, type SecurityCameraProduct } from "@/lib/security-camera/types";

const gardenHouseCatalog = GardenHouseCatalogSchema.parse(gardenHouseCatalogJson);
const flooringCatalog = FlooringCatalogSchema.parse(flooringCatalogJson);
const securityCameraCatalog = SecurityCameraCatalogSchema.parse(securityCameraCatalogJson);

const gardenHouses = gardenHouseCatalog.products.filter((product) => product.reviewed);
const gardenHousePrices = bestAvailablePriceByProduct(gardenHouseCatalog);

function shortSide(product: GardenHouseProduct) {
  return Math.min(product.widthCm, product.depthCm);
}

function longSide(product: GardenHouseProduct) {
  return Math.max(product.widthCm, product.depthCm);
}

function shapeRatio(product: GardenHouseProduct) {
  return longSide(product) / shortSide(product);
}

function summarizeGardenHouseDimensions(products: readonly GardenHouseProduct[]) {
  const prices = products.flatMap((product) => {
    const price = gardenHousePrices.get(product.id);
    return price === undefined ? [] : [price];
  });
  return {
    count: products.length,
    share: rounded(percent(products.length, gardenHouses.length), 1),
    medianShortSideCm: rounded(median(products.map(shortSide))),
    medianLongSideCm: rounded(median(products.map(longSide))),
    medianAreaM2: rounded(median(products.map((product) => product.footprintM2)), 1),
    medianShapeRatio: rounded(median(products.map(shapeRatio)), 2),
    medianPriceEur: rounded(median(prices)),
  };
}

export const gardenHouseDimensionReport = {
  generatedAt: gardenHouseCatalog.generatedAt,
  updatedLabel: formatReportDate(gardenHouseCatalog.generatedAt),
  total: gardenHouses.length,
  brands: countDistinct(gardenHouses.map((product) => product.brand)),
  summary: summarizeGardenHouseDimensions(gardenHouses),
  fitThresholds: [200, 250, 300].map((thresholdCm) => {
    const products = gardenHouses.filter((product) => shortSide(product) <= thresholdCm);
    return { thresholdCm, ...summarizeGardenHouseDimensions(products) };
  }),
  shortSideBands: [
    { label: "Bis 200 cm", matches: (product: GardenHouseProduct) => shortSide(product) <= 200 },
    { label: "Über 200 bis 250 cm", matches: (product: GardenHouseProduct) => shortSide(product) > 200 && shortSide(product) <= 250 },
    { label: "Über 250 bis 300 cm", matches: (product: GardenHouseProduct) => shortSide(product) > 250 && shortSide(product) <= 300 },
    { label: "Über 300 cm", matches: (product: GardenHouseProduct) => shortSide(product) > 300 },
  ].map(({ label, matches }) => ({ label, ...summarizeGardenHouseDimensions(gardenHouses.filter(matches)) })),
  shapes: [
    { key: "compact", label: "Nahezu quadratisch", detail: "Seitenverhältnis bis 1,20", matches: (product: GardenHouseProduct) => shapeRatio(product) <= 1.2 },
    { key: "balanced", label: "Leicht länglich", detail: "Seitenverhältnis über 1,20 bis 1,60", matches: (product: GardenHouseProduct) => shapeRatio(product) > 1.2 && shapeRatio(product) <= 1.6 },
    { key: "elongated", label: "Deutlich länglich", detail: "Seitenverhältnis über 1,60", matches: (product: GardenHouseProduct) => shapeRatio(product) > 1.6 },
  ].map(({ key, label, detail, matches }) => ({ key, label, detail, ...summarizeGardenHouseDimensions(gardenHouses.filter(matches)) })),
} as const;

type GardenHouseWithRoof = GardenHouseProduct & { roofType: NonNullable<GardenHouseProduct["roofType"]> };

function hasRoofType(product: GardenHouseProduct): product is GardenHouseWithRoof {
  return product.roofType !== undefined;
}

const gardenHousesWithRoof = gardenHouses.filter(hasRoofType);

function summarizeGardenHouseRoof(products: readonly GardenHouseWithRoof[]) {
  const prices = products.flatMap((product) => {
    const price = gardenHousePrices.get(product.id);
    return price === undefined ? [] : [price];
  });
  return {
    count: products.length,
    share: rounded(percent(products.length, gardenHousesWithRoof.length), 1),
    medianAreaM2: rounded(median(products.map((product) => product.footprintM2)), 1),
    medianWidthCm: rounded(median(products.map((product) => product.widthCm))),
    medianDepthCm: rounded(median(products.map((product) => product.depthCm))),
    medianPriceEur: rounded(median(prices)),
    woodCount: products.filter((product) => product.material === "wood").length,
    metalCount: products.filter((product) => product.material === "metal").length,
  };
}

export const gardenHouseRoofReport = {
  generatedAt: gardenHouseCatalog.generatedAt,
  updatedLabel: formatReportDate(gardenHouseCatalog.generatedAt),
  total: gardenHouses.length,
  classified: gardenHousesWithRoof.length,
  missing: gardenHouses.length - gardenHousesWithRoof.length,
  coverageShare: rounded(percent(gardenHousesWithRoof.length, gardenHouses.length), 1),
  heightKnown: gardenHouses.filter((product) => product.heightCm !== undefined).length,
  types: [
    { key: "gable", label: "Satteldach" },
    { key: "flat", label: "Flachdach" },
    { key: "pent", label: "Pultdach" },
  ].map(({ key, label }) => ({ key, label, ...summarizeGardenHouseRoof(gardenHousesWithRoof.filter((product) => product.roofType === key)) })),
  sizeBands: [
    { label: "Bis 6 m²", matches: (product: GardenHouseWithRoof) => product.footprintM2 <= 6 },
    { label: "Über 6 bis 12 m²", matches: (product: GardenHouseWithRoof) => product.footprintM2 > 6 && product.footprintM2 <= 12 },
    { label: "Über 12 m²", matches: (product: GardenHouseWithRoof) => product.footprintM2 > 12 },
  ].map(({ label, matches }) => {
    const products = gardenHousesWithRoof.filter(matches);
    return {
      label,
      total: products.length,
      gable: products.filter((product) => product.roofType === "gable").length,
      flat: products.filter((product) => product.roofType === "flat").length,
      pent: products.filter((product) => product.roofType === "pent").length,
    };
  }),
} as const;

type CompleteFlooringFormat = FlooringProduct & {
  packageCoverageM2: number;
  plankLengthMm: number;
  plankWidthMm: number;
};

function hasCompleteFlooringFormat(product: FlooringProduct): product is CompleteFlooringFormat {
  return product.reviewed && product.packageCoverageM2 !== undefined && product.plankLengthMm !== undefined && product.plankWidthMm !== undefined;
}

const flooringFormats = flooringCatalog.products.filter(hasCompleteFlooringFormat);

function summarizeFlooringFormats(products: readonly CompleteFlooringFormat[]) {
  return {
    count: products.length,
    share: rounded(percent(products.length, flooringFormats.length), 1),
    medianLengthMm: rounded(median(products.map((product) => product.plankLengthMm))),
    medianWidthMm: rounded(median(products.map((product) => product.plankWidthMm))),
    medianPlankAreaM2: rounded(median(products.map((product) => (product.plankLengthMm * product.plankWidthMm) / 1_000_000)), 3),
    medianPackageCoverageM2: rounded(median(products.map((product) => product.packageCoverageM2)), 2),
  };
}

export const flooringFormatReport = {
  generatedAt: flooringCatalog.generatedAt,
  updatedLabel: formatReportDate(flooringCatalog.generatedAt),
  total: flooringFormats.length,
  brands: countDistinct(flooringFormats.map((product) => product.brand)),
  summary: summarizeFlooringFormats(flooringFormats),
  types: [
    { key: "laminate", label: "Laminat" },
    { key: "vinyl-click", label: "Klickvinyl" },
    { key: "parquet-floating", label: "Fertigparkett" },
  ].map(({ key, label }) => ({ key, label, ...summarizeFlooringFormats(flooringFormats.filter((product) => product.flooringType === key)) })),
  widthBands: [
    { label: "Bis 160 mm", matches: (product: CompleteFlooringFormat) => product.plankWidthMm <= 160 },
    { label: "Über 160 bis 220 mm", matches: (product: CompleteFlooringFormat) => product.plankWidthMm > 160 && product.plankWidthMm <= 220 },
    { label: "Über 220 mm", matches: (product: CompleteFlooringFormat) => product.plankWidthMm > 220 },
  ].map(({ label, matches }) => ({ label, ...summarizeFlooringFormats(flooringFormats.filter(matches)) })),
  scenarios: [8, 18, 35].map((netAreaM2) => {
    const purchaseAreaM2 = netAreaM2 * 1.1;
    const orders = flooringFormats.map((product) => {
      const packageCount = Math.ceil(purchaseAreaM2 / product.packageCoverageM2);
      const orderedAreaM2 = packageCount * product.packageCoverageM2;
      return { packageCount, orderedAreaM2, packageSurplusM2: orderedAreaM2 - purchaseAreaM2 };
    });
    return {
      netAreaM2,
      purchaseAreaM2: rounded(purchaseAreaM2, 1),
      products: orders.length,
      medianPackageCount: rounded(median(orders.map((order) => order.packageCount))),
      medianOrderedAreaM2: rounded(median(orders.map((order) => order.orderedAreaM2)), 2),
      medianPackageSurplusM2: rounded(median(orders.map((order) => order.packageSurplusM2)), 2),
      productsWithMoreThanOneM2Surplus: orders.filter((order) => order.packageSurplusM2 > 1).length,
    };
  }),
} as const;

type FlooringWithThickness = FlooringProduct & { thicknessMm: number };

function hasFlooringThickness(product: FlooringProduct): product is FlooringWithThickness {
  return product.reviewed && product.thicknessMm !== undefined;
}

const flooringWithThickness = flooringCatalog.products.filter(hasFlooringThickness);

function summarizeFlooringThickness(products: readonly FlooringWithThickness[]) {
  const thicknesses = products.map((product) => product.thicknessMm);
  return {
    count: products.length,
    share: rounded(percent(products.length, flooringWithThickness.length), 1),
    minThicknessMm: rounded(Math.min(...thicknesses), 1),
    medianThicknessMm: rounded(median(thicknesses), 1),
    maxThicknessMm: rounded(Math.max(...thicknesses), 1),
    floorHeatingApproved: products.filter((product) => product.floorHeatingApproved === true).length,
    floorHeatingKnown: products.filter((product) => product.floorHeatingApproved !== undefined).length,
  };
}

export const flooringThicknessReport = {
  generatedAt: flooringCatalog.generatedAt,
  updatedLabel: formatReportDate(flooringCatalog.generatedAt),
  total: flooringWithThickness.length,
  summary: summarizeFlooringThickness(flooringWithThickness),
  allClick: flooringWithThickness.filter((product) => product.installation === "click").length,
  types: [
    { key: "laminate", label: "Laminat" },
    { key: "vinyl-click", label: "Klickvinyl" },
    { key: "parquet-floating", label: "Fertigparkett" },
  ].map(({ key, label }) => ({ key, label, ...summarizeFlooringThickness(flooringWithThickness.filter((product) => product.flooringType === key)) })),
  bands: [
    { label: "Bis 5 mm", matches: (product: FlooringWithThickness) => product.thicknessMm <= 5 },
    { label: "Über 5 bis 8 mm", matches: (product: FlooringWithThickness) => product.thicknessMm > 5 && product.thicknessMm <= 8 },
    { label: "Über 8 bis 10 mm", matches: (product: FlooringWithThickness) => product.thicknessMm > 8 && product.thicknessMm <= 10 },
    { label: "Über 10 mm", matches: (product: FlooringWithThickness) => product.thicknessMm > 10 },
  ].map(({ label, matches }) => {
    const products = flooringWithThickness.filter(matches);
    return { label, count: products.length, share: rounded(percent(products.length, flooringWithThickness.length), 1) };
  }),
  thresholds: [5, 8, 10].map((maximumMm) => {
    const count = flooringWithThickness.filter((product) => product.thicknessMm <= maximumMm).length;
    return { maximumMm, count, share: rounded(percent(count, flooringWithThickness.length), 1) };
  }),
} as const;

const cameras = securityCameraCatalog.products.filter((product) => product.reviewed);
const cameraPrices = bestAvailablePriceByProduct(securityCameraCatalog);

function summarizeCameraFeatures(products: readonly SecurityCameraProduct[]) {
  const prices = products.flatMap((product) => {
    const price = cameraPrices.get(product.id);
    return price === undefined ? [] : [price];
  });
  return {
    count: products.length,
    share: rounded(percent(products.length, cameras.length), 1),
    indoor: products.filter((product) => product.placement === "indoor").length,
    outdoor: products.filter((product) => product.placement === "outdoor").length,
    panTilt: products.filter((product) => product.panTilt).length,
    integratedLight: products.filter((product) => product.integratedLight).length,
    resolution4k: products.filter((product) => product.resolution === "4k").length,
    medianPriceEur: rounded(median(prices), 2),
  };
}

export const securityCameraFeatureReport = {
  generatedAt: securityCameraCatalog.generatedAt,
  updatedLabel: formatReportDate(securityCameraCatalog.generatedAt),
  total: cameras.length,
  brands: countDistinct(cameras.map((product) => product.brand)),
  summary: summarizeCameraFeatures(cameras),
  placements: [
    { key: "indoor", label: "Innen" },
    { key: "outdoor", label: "Außen" },
  ].map(({ key, label }) => ({ key, label, ...summarizeCameraFeatures(cameras.filter((product) => product.placement === key)) })),
  featureProfiles: [
    { key: "fixed", label: "Fest ausgerichtet ohne Licht", panTilt: false, integratedLight: false },
    { key: "moving", label: "Beweglich ohne Licht", panTilt: true, integratedLight: false },
    { key: "lit", label: "Fest ausgerichtet mit Licht", panTilt: false, integratedLight: true },
    { key: "moving-lit", label: "Beweglich mit Licht", panTilt: true, integratedLight: true },
  ].map(({ key, label, panTilt, integratedLight }) => ({ key, label, ...summarizeCameraFeatures(cameras.filter((product) => product.panTilt === panTilt && product.integratedLight === integratedLight)), panTilt, integratedLight })),
  resolutions: [
    { key: "hd", label: "HD" },
    { key: "2k", label: "2K" },
    { key: "3k", label: "3K" },
    { key: "4k", label: "4K" },
  ].map(({ key, label }) => {
    const products = cameras.filter((product) => product.resolution === key);
    return {
      key,
      label,
      ...summarizeCameraFeatures(products),
      wifi: products.filter((product) => product.connection === "wifi").length,
      poe: products.filter((product) => product.connection === "poe").length,
      cellular: products.filter((product) => product.connection === "cellular").length,
    };
  }),
  filterPath: {
    outdoor: cameras.filter((product) => product.placement === "outdoor").length,
    outdoorWithLight: cameras.filter((product) => product.placement === "outdoor" && product.integratedLight).length,
    outdoorWithLightAndMovement: cameras.filter((product) => product.placement === "outdoor" && product.integratedLight && product.panTilt).length,
    outdoorWithLightMovementAnd4k: cameras.filter((product) => product.placement === "outdoor" && product.integratedLight && product.panTilt && product.resolution === "4k").length,
  },
} as const;
