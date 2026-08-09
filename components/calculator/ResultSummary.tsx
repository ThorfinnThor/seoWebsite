import type { GardenHouseInput, GardenHouseRequirements } from "@/lib/garden-house/types";

export function ResultSummary({ input, requirements }: { input: GardenHouseInput; requirements: GardenHouseRequirements }) {
  return (
    <div className="requirement-summary" aria-label="Dein Planungsrahmen">
      <div><span>Mindestfläche</span><strong>{requirements.recommendedAreaM2.toLocaleString("de-DE")} m²</strong></div>
      <div><span>Türbreite</span><strong>mind. {requirements.minDoorWidthCm} cm</strong></div>
      <div><span>Stellfläche</span><strong>{(input.availableWidthCm / 100).toLocaleString("de-DE")} × {(input.availableDepthCm / 100).toLocaleString("de-DE")} m</strong></div>
      <div><span>Budget</span><strong>bis {input.budgetMaxEur.toLocaleString("de-DE")} €</strong></div>
    </div>
  );
}
