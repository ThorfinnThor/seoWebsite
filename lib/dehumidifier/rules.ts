import type { DehumidifierInput, DehumidifierRequirements, DehumidifierRules } from "./types";

export const DEFAULT_DEHUMIDIFIER_RULES: DehumidifierRules = { version: 1, status: "experimental-selection-margin", areaMargin: { living_mild: 1, living_moderate: 1.15, high_humidity: 1.3, cool_basement: 1.25, laundry: 1.3 } };

export function calculateDehumidifierRequirements(input: DehumidifierInput, rules = DEFAULT_DEHUMIDIFIER_RULES): DehumidifierRequirements {
  const candidates = [rules.areaMargin.living_mild];
  if (input.humiditySeverity === "moderate") candidates.push(rules.areaMargin.living_moderate);
  if (input.humiditySeverity === "high") candidates.push(rules.areaMargin.high_humidity);
  if (input.roomType === "basement" && (input.approximateTemperatureC === undefined || input.approximateTemperatureC < 16)) candidates.push(rules.areaMargin.cool_basement);
  if (input.laundryDrying || input.roomType === "laundry") candidates.push(rules.areaMargin.laundry);
  const margin = Math.max(...candidates);
  const roomVolumeM3 = input.areaM2 * input.ceilingHeightM;
  return { margin, requiredAreaM2: Math.ceil(input.areaM2 * margin), requiredVolumeM3: Math.ceil(roomVolumeM3 * margin), roomVolumeM3: Math.round(roomVolumeM3 * 10) / 10 };
}
