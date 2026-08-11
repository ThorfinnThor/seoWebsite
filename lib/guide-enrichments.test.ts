import { describe, expect, it } from "vitest";
import { calculateDrywallPlan } from "@/lib/drywall/rules";
import { calculateFlooringPlan } from "@/lib/flooring/rules";
import { calculateRequirements } from "@/lib/garden-house/rules";
import { calculateGreenhousePlan } from "@/lib/greenhouse/rules";
import { buildIrrigationPlan } from "@/lib/irrigation/rules";
import { calculatePrivacyScreenPlan } from "@/lib/privacy-screen/rules";
import { calculateRobotMowerPlan } from "@/lib/robot-mower/rules";
import { calculateTerracePlan } from "@/lib/terrace/rules";
import { GUIDE_ENRICHMENTS } from "./guide-enrichments";

describe("guide enrichments", () => {
  it("verwenden normalisierte interne Pfade", () => {
    for (const path of Object.keys(GUIDE_ENRICHMENTS)) {
      expect(path).toMatch(/^\/.+\/$/);
    }
  });

  it("verweisen nur auf eindeutige HTTPS-Quellen", () => {
    for (const enrichment of Object.values(GUIDE_ENRICHMENTS)) {
      const urls = enrichment.sources?.map((source) => source.href) ?? [];
      expect(new Set(urls).size).toBe(urls.length);
      for (const source of enrichment.sources ?? []) {
        expect(source.href).toMatch(/^https:\/\//);
        expect(source.label.length).toBeGreaterThan(10);
        expect(source.publisher.length).toBeGreaterThan(2);
        expect(source.note.length).toBeGreaterThan(20);
      }
    }
  });

  it("liefert vollständige Rechenbeispiele", () => {
    for (const enrichment of Object.values(GUIDE_ENRICHMENTS)) {
      if (!enrichment.example) continue;
      expect(enrichment.example.steps.length).toBeGreaterThanOrEqual(3);
      expect(enrichment.example.result.length).toBeGreaterThan(20);
    }
  });

  it("hinterlegt für jeden veröffentlichten Ratgeber mindestens eine Quelle", () => {
    expect(Object.keys(GUIDE_ENRICHMENTS)).toHaveLength(34);
    for (const enrichment of Object.values(GUIDE_ENRICHMENTS)) {
      expect(enrichment.sources?.length).toBeGreaterThan(0);
    }
  });

  it("hält veröffentlichte Beispiele mit der Rechnerlogik synchron", () => {
    const gardenHouse = calculateRequirements({
      availableWidthCm: 400,
      availableDepthCm: 400,
      allowRotation: true,
      budgetMaxEur: 5000,
      bikes: 2,
      toolStorage: "medium",
      lawnMower: true,
      workbench: false,
      shelving: true,
      floorPreference: "irrelevant",
      materialPreference: "any",
      roofPreference: "any",
    });
    expect(gardenHouse).toMatchObject({ recommendedAreaM2: 6, minDoorWidthCm: 80 });

    const drywall = calculateDrywallPlan({
      wallLengthM: 5,
      wallHeightM: 2.6,
      openingsAreaM2: 2,
      openingCount: 1,
      claddingSides: 2,
      layersPerSide: 1,
      boardLengthM: 2.6,
      boardWidthM: 1.25,
      wastePercent: 10,
      studSpacingCm: 62.5,
      trackBarLengthM: 3,
      includeInsulation: false,
      moistureExposure: false,
      fireOrAcousticRequirement: false,
      installationsPlanned: false,
    });
    expect(drywall).toMatchObject({
      boardCount: 8,
      baselineStudCount: 9,
      trackLengthWithReserveM: 11,
      trackBarCount: 4,
    });

    const flooring = calculateFlooringPlan({
      rooms: [{ id: "room-1", label: "Raum", lengthM: 5, widthM: 4 }],
      excludedAreaM2: 0,
      flooringType: "laminate",
      layingPattern: "straight",
      wastePercent: 10,
      plankLengthMm: 1285,
      plankWidthMm: 192,
      packageCoverageM2: 2.2,
      includeUnderlay: true,
      underlayRollCoverageM2: 10,
      includeSkirting: true,
      totalDoorOpeningM: 0.9,
      skirtingBarLengthM: 2.4,
      floorHeating: false,
      wetRoom: false,
    });
    expect(flooring).toMatchObject({
      purchaseAreaM2: 22,
      packageCount: 10,
      skirtingBarCount: 8,
    });

    const irrigation = buildIrrigationPlan({
      lawnAreaM2: 0,
      bedAreaM2: 0,
      hedgeLengthM: 20,
      automaticControl: false,
      smartControl: false,
      rainSensorWanted: false,
      budgetMaxEur: 500,
    });
    expect(irrigation.hedgeDriplineM).toBe(23);

    const greenhouse = calculateGreenhousePlan({
      lengthM: 3,
      widthM: 2.5,
      layout: "two-side",
      bedDepthCm: 70,
      aisleWidthCm: 80,
      endBedDepthCm: 60,
      doorWidthCm: 80,
      baseBarLengthM: 2,
      useCase: "vegetables",
      glazing: "polycarbonate",
      roofVentCount: 2,
      automaticOpeners: true,
      crossVentilation: true,
      waterAtSite: true,
      electricityPlanned: false,
    });
    expect(greenhouse).toMatchObject({ footprintM2: 7.5, growingAreaM2: 4.2, pathAreaM2: 2.4, flexibleFloorAreaM2: 0.9 });

    const mower = calculateRobotMowerPlan({
      areas: [{ id: "main", label: "Hauptrasen", lengthM: 15, widthM: 20, excludedAreaM2: 25 }],
      complexity: "moderate",
      growth: "normal",
      mowingZones: 1,
      narrowestPassageCm: 120,
      maximumSlopePercent: 10,
      obstacleCount: 2,
      separatedAreas: false,
      boundarySystem: "undecided",
      powerAtStation: true,
      reliableReception: true,
      rainShelteredStation: true,
    });
    expect(mower).toMatchObject({ grossAreaM2: 300, netAreaM2: 275, capacityFactor: 1.3, requiredRatedAreaM2: 400 });

    const privacyScreen = calculatePrivacyScreenPlan({
      totalLengthM: 10,
      fenceHeightCm: 180,
      systemFieldWidthCm: 180,
      gateCount: 1,
      gateModuleWidthCm: 100,
      reservePanel: false,
      mountingType: "ground",
      terrain: "level",
      windExposure: "normal",
    });
    expect(privacyScreen).toMatchObject({ panelCount: 5, postCount: 7, fullSystemLengthCm: 1000, adjustmentRequired: false });

    const terrace = calculateTerracePlan({
      terraceLengthM: 4,
      terraceWidthM: 3,
      layingDirection: "length",
      boardWidthMm: 145,
      boardGapMm: 5,
      boardLengthM: 4,
      wastePercent: 10,
      maxSupportSpacingCm: 40,
    });
    expect(terrace).toMatchObject({ courseCount: 21, deckingLinearM: 84, deckingLinearMWithWaste: 92.4, fullBoardsToBuy: 24 });
  });
});
