import type { GardenHouseInput, GardenHouseRequirements, GardenHouseRules } from "./types";

export const DEFAULT_GARDEN_HOUSE_RULES: GardenHouseRules = {
  version: 1,
  status: "planning-heuristic",
  note: "Lagerflächen-Heuristik, keine Bau- oder Planungsnorm.",
  areaM2: {
    baseCirculation: 0.8,
    perBike: 0.65,
    toolStorage: { none: 0, small: 0.7, medium: 1.4, large: 2.5 },
    lawnMower: 0.8,
    workbench: 2,
    shelving: 0.6,
  },
  circulationReserveFactor: 1.15,
  minDoorWidthCm: { normal: 70, bulky: 80 },
};

export function calculateRequirements(
  input: GardenHouseInput,
  rules: GardenHouseRules = DEFAULT_GARDEN_HOUSE_RULES,
): GardenHouseRequirements {
  const rawArea =
    rules.areaM2.baseCirculation +
    input.bikes * rules.areaM2.perBike +
    rules.areaM2.toolStorage[input.toolStorage] +
    (input.lawnMower ? rules.areaM2.lawnMower : 0) +
    (input.workbench ? rules.areaM2.workbench : 0) +
    (input.shelving ? rules.areaM2.shelving : 0);
  const bulkyAccess = input.bikes > 0 || input.lawnMower;
  return {
    recommendedAreaM2: Math.ceil((rawArea * rules.circulationReserveFactor) / 0.5) * 0.5,
    minDoorWidthCm: bulkyAccess ? rules.minDoorWidthCm.bulky : rules.minDoorWidthCm.normal,
    bulkyAccess,
  };
}
