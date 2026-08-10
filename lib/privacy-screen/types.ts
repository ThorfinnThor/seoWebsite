import { z } from "zod";

export const PrivacyScreenInputSchema = z.object({
  totalLengthM: z.number().min(1).max(100),
  fenceHeightCm: z.number().min(60).max(250),
  systemFieldWidthCm: z.number().min(50).max(300),
  gateCount: z.number().int().min(0).max(3),
  gateModuleWidthCm: z.number().min(70).max(250),
  reservePanel: z.boolean(),
  mountingType: z.enum(["ground", "baseplate", "existing"]),
  terrain: z.enum(["level", "sloped"]),
  windExposure: z.enum(["sheltered", "normal", "exposed"]),
}).superRefine((input, context) => {
  if (input.gateCount * input.gateModuleWidthCm >= input.totalLengthM * 100) {
    context.addIssue({
      code: "custom",
      path: ["gateCount"],
      message: "Die Tor-Module müssen zusammen kürzer als die gesamte Sichtschutzstrecke sein.",
    });
  }
});

export type PrivacyScreenInput = z.infer<typeof PrivacyScreenInputSchema>;

export interface PrivacyScreenPlan {
  targetLengthCm: number;
  gateLengthCm: number;
  panelCount: number;
  orderPanelCount: number;
  bayCount: number;
  postCount: number;
  anchoringPointCount: number;
  fullSystemLengthCm: number;
  endAdjustmentCm: number;
  lastFieldWidthCm: number;
  adjustmentRequired: boolean;
  warnings: string[];
}
