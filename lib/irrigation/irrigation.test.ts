import { describe,expect,it } from "vitest";
import { buildIrrigationPlan } from "./rules";
import type { IrrigationInput } from "./types";
const input:IrrigationInput={lawnAreaM2:100,bedAreaM2:20,hedgeLengthM:10,automaticControl:true,smartControl:false,rainSensorWanted:true,budgetMaxEur:500};
describe("irrigation planning",()=>{
  it("builds a combined plan",()=>expect(buildIrrigationPlan(input).style).toBe("combined"));
  it("adds hedge reserve conservatively",()=>expect(buildIrrigationPlan(input).hedgeDriplineM).toBe(12));
  it("describes lawn layout instead of inventing sprinkler count",()=>expect(buildIrrigationPlan(input).components.find((item)=>item.kind==="sprinkler")?.quantity).toBe("Layout erforderlich"));
  it("keeps compatible-system warning",()=>expect(buildIrrigationPlan(input).warnings).toContain("Alle Komponenten innerhalb eines bestätigten Systems auswählen."));
  it("adds a controller reserve zone",()=>expect(buildIrrigationPlan(input).controllerZones).toBe(4));
  it("does not add a controller for manual use",()=>expect(buildIrrigationPlan({...input,automaticControl:false}).controllerZones).toBe(0));
});
