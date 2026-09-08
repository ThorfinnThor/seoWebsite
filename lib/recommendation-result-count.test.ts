import { describe, expect, it } from "vitest";
import type { OfferBase } from "@/lib/catalog/types";
import { recommendDehumidifiers } from "@/lib/dehumidifier/recommend";
import type { DehumidifierCatalog, DehumidifierInput } from "@/lib/dehumidifier/types";
import { recommendFlooring } from "@/lib/flooring/recommend";
import type { FlooringCatalog, FlooringInput } from "@/lib/flooring/types";
import { recommendGardenHouses } from "@/lib/garden-house/recommend";
import type { GardenHouseCatalog, GardenHouseInput } from "@/lib/garden-house/types";
import { recommendIrrigation } from "@/lib/irrigation/recommend";
import type { IrrigationCatalog, IrrigationInput, IrrigationPlan } from "@/lib/irrigation/types";
import { recommendProjectProducts } from "@/lib/project-products/recommend";
import type { ProjectCatalog } from "@/lib/project-products/types";
import { recommendRobotMowers } from "@/lib/robot-mower/recommend";
import type { RobotMowerCatalog, RobotMowerInput, RobotMowerPlan } from "@/lib/robot-mower/types";
import { recommendSecurityCameras } from "@/lib/security-camera/recommend";
import type { SecurityCameraCatalog, SecurityCameraInput } from "@/lib/security-camera/types";

const timestamp = "2026-09-08T00:00:00.000Z";
const products = (count: number) => Array.from({ length: count }, (_, index) => index + 1);
const offer = (productId: string, index: number): OfferBase => ({
  id: `offer-${productId}`,
  productId,
  merchantId: "merchant",
  merchantName: "Händler",
  merchantProductId: `merchant-${index}`,
  priceEur: 100 + index,
  deliveryCostStatus: "free",
  deliveryCostEur: 0,
  available: true,
  affiliateUrl: `https://example.com/${index}`,
  updatedAt: timestamp,
});

describe("recommendation result counts", () => {
  it("returns every matching garden house", () => {
    const input: GardenHouseInput = { availableWidthCm: 500, availableDepthCm: 500, allowRotation: true, budgetMaxEur: 10000, bikes: 0, toolStorage: "none", lawnMower: false, workbench: false, shelving: false, floorPreference: "irrelevant", materialPreference: "any", roofPreference: "any" };
    const catalog: GardenHouseCatalog = { schemaVersion: 1, vertical: "garden-house", generatedAt: timestamp, products: products(7).map((index) => ({ id: `house-${index}`, name: `Haus ${index}`, reviewed: true, dataQuality: "curated", widthCm: 250, depthCm: 250, footprintM2: 6.25, material: "wood", roofType: "gable", doorWidthCm: 100, floorIncluded: true })), offers: products(7).map((index) => offer(`house-${index}`, index)) };
    expect(recommendGardenHouses(catalog, input)).toHaveLength(7);
  });

  it("returns every matching dehumidifier", () => {
    const input: DehumidifierInput = { roomType: "living", areaM2: 10, ceilingHeightM: 2.4, approximateTemperatureC: 20, humiditySeverity: "mild", laundryDrying: false, continuousDrainPossible: false, noisePriority: "medium", budgetMaxEur: 10000 };
    const catalog: DehumidifierCatalog = { schemaVersion: 1, vertical: "dehumidifier", generatedAt: timestamp, products: products(7).map((index) => ({ id: `dehumidifier-${index}`, name: `Entfeuchter ${index}`, reviewed: true, dataQuality: "curated", maxRecommendedAreaM2: 100, continuousDrain: true })), offers: products(7).map((index) => offer(`dehumidifier-${index}`, index)) };
    expect(recommendDehumidifiers(catalog, input)).toHaveLength(7);
  });

  it("returns every matching irrigation product", () => {
    const input: IrrigationInput = { lawnAreaM2: 100, bedAreaM2: 0, hedgeLengthM: 0, automaticControl: true, smartControl: false, rainSensorWanted: false, budgetMaxEur: 10000 };
    const plan: IrrigationPlan = { style: "sprinkler", hedgeDriplineM: 0, bedDriplineM: 0, activeCategories: 1, controllerZones: 1, components: [{ kind: "controller", label: "Steuerung", quantity: "1", note: "Test" }], warnings: [] };
    const catalog: IrrigationCatalog = { schemaVersion: 1, vertical: "irrigation", generatedAt: timestamp, products: products(9).map((index) => ({ id: `controller-${index}`, name: `Steuerung ${index}`, reviewed: true, dataQuality: "curated", kind: "controller", maxZones: 4 })), offers: products(9).map((index) => offer(`controller-${index}`, index)) };
    expect(recommendIrrigation(catalog, input, plan)).toHaveLength(9);
  });

  it("returns every matching floor covering", () => {
    const input: FlooringInput = { rooms: [{ id: "room", label: "Raum", lengthM: 4, widthM: 4 }], excludedAreaM2: 0, flooringType: "laminate", layingPattern: "straight", wastePercent: 10, plankLengthMm: 1200, plankWidthMm: 200, packageCoverageM2: 2, includeUnderlay: false, underlayRollCoverageM2: 10, includeSkirting: false, totalDoorOpeningM: 1, skirtingBarLengthM: 2.4, floorHeating: false, wetRoom: false };
    const catalog: FlooringCatalog = { schemaVersion: 1, vertical: "flooring", generatedAt: timestamp, products: products(9).map((index) => ({ id: `floor-${index}`, name: `Boden ${index}`, reviewed: true, dataQuality: "curated", flooringType: "laminate", installation: "click", packageCoverageM2: 2 })), offers: products(9).map((index) => offer(`floor-${index}`, index)) };
    expect(recommendFlooring(catalog, input)).toHaveLength(9);
  });

  it("returns every matching robot mower", () => {
    const input: RobotMowerInput = { areas: [{ id: "lawn", label: "Rasen", lengthM: 10, widthM: 10, excludedAreaM2: 0 }], complexity: "simple", growth: "normal", mowingZones: 1, narrowestPassageCm: 100, maximumSlopePercent: 10, obstacleCount: 0, separatedAreas: false, boundarySystem: "undecided", powerAtStation: true, reliableReception: true, rainShelteredStation: true };
    const plan: RobotMowerPlan = { areaCount: 1, grossAreaM2: 100, netAreaM2: 100, capacityFactor: 1.2, requiredRatedAreaM2: 150, rectangularPerimeterM: 40, boundaryWireFrameM: 44, passageClass: "open", setupTasks: [], warnings: [] };
    const catalog: RobotMowerCatalog = { schemaVersion: 1, vertical: "robot-mower", generatedAt: timestamp, products: products(9).map((index) => ({ id: `mower-${index}`, name: `Mäher ${index}`, reviewed: true, dataQuality: "curated", ratedAreaM2: 500, maxSlopePercent: 30, minPassageCm: 80, navigation: "wire" })), offers: products(9).map((index) => offer(`mower-${index}`, index)) };
    expect(recommendRobotMowers(catalog, input, plan)).toHaveLength(9);
  });

  it("returns every matching project product", () => {
    const catalog: ProjectCatalog = { schemaVersion: 1, vertical: "project-products", generatedAt: timestamp, products: products(13).map((index) => ({ id: `deck-${index}`, name: `Diele ${index}`, reviewed: true, dataQuality: "curated", vertical: "terrace", kind: "decking", boardLengthMm: 3000, boardWidthMm: 145, boardThicknessMm: 28 })), offers: products(13).map((index) => offer(`deck-${index}`, index)) };
    const matches = recommendProjectProducts({ catalog, requirements: { vertical: "terrace", requiredKinds: ["decking"], areaM2: 20, requiredLinearM: 138, boardLengthMm: 3000, boardWidthMm: 145, requiredBoardCount: 46, supportLinearM: 50 } });
    expect(matches).toHaveLength(13);
  });

  it("returns every matching security camera", () => {
    const input: SecurityCameraInput = { placement: "outdoor", coverageZones: 1, connection: "wifi", powerAvailable: false, minimumResolution: "2k", panTiltRequired: false, integratedLightRequired: false, preferredBrand: "", budgetMaxEur: 10000 };
    const catalog: SecurityCameraCatalog = { schemaVersion: 1, vertical: "security-camera", generatedAt: timestamp, products: products(12).map((index) => ({ id: `camera-${index}`, name: `Kamera ${index}`, reviewed: true, dataQuality: "curated", placement: "outdoor", connection: "wifi", power: "solar", resolution: "2k", cameraCount: 1, panTilt: false, integratedLight: false })), offers: products(12).map((index) => offer(`camera-${index}`, index)) };
    expect(recommendSecurityCameras(catalog, input)).toHaveLength(12);
  });
});
