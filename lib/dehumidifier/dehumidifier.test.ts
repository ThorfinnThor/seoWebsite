import { describe,expect,it } from "vitest";
import { calculateDehumidifierRequirements } from "./rules";
import { recommendDehumidifiers } from "./recommend";
import type { DehumidifierCatalog,DehumidifierInput } from "./types";
const input:DehumidifierInput={roomType:"basement",areaM2:20,ceilingHeightM:2.5,approximateTemperatureC:12,humiditySeverity:"moderate",laundryDrying:false,continuousDrainPossible:true,noisePriority:"high",budgetMaxEur:300};
const catalog:DehumidifierCatalog={schemaVersion:1,vertical:"dehumidifier",generatedAt:"2026-08-09T00:00:00.000Z",products:[{id:"p",name:"Testgerät",reviewed:true,dataQuality:"curated",maxRecommendedVolumeM3:80,minOperatingTempC:5,continuousDrain:true,noiseDb:40,powerW:300}],offers:[{id:"o",productId:"p",merchantId:"m",merchantName:"M",merchantProductId:"mp",priceEur:200,deliveryCostStatus:"free",available:true,affiliateUrl:"https://example.com",updatedAt:"2026-08-09T00:00:00.000Z"}]};
describe("dehumidifier planning",()=>{
  it("uses the strongest transparent margin",()=>expect(calculateDehumidifierRequirements(input)).toMatchObject({margin:1.25,requiredAreaM2:25,requiredVolumeM3:63}));
  it("raises the margin for laundry",()=>expect(calculateDehumidifierRequirements({...input,laundryDrying:true}).margin).toBe(1.3));
  it("matches a reviewed product with sufficient volume",()=>expect(recommendDehumidifiers(catalog,input)).toHaveLength(1));
  it("rejects a device outside its operating temperature",()=>expect(recommendDehumidifiers({...catalog,products:[{...catalog.products[0],minOperatingTempC:15}]},input)).toHaveLength(0));
  it("rejects a missing required drain",()=>expect(recommendDehumidifiers({...catalog,products:[{...catalog.products[0],continuousDrain:false}]},input)).toHaveLength(0));
  it("never recommends feed-only data",()=>expect(recommendDehumidifiers({...catalog,products:[{...catalog.products[0],dataQuality:"feed"}]},input)).toHaveLength(0));
});
