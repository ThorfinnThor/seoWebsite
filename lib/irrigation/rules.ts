import type { IrrigationInput, IrrigationPlan, IrrigationRules } from "./types";
export const DEFAULT_IRRIGATION_RULES:IrrigationRules={version:1,status:"planning-heuristic",hedgeReserveFactor:1.15,bedDriplineMPerM2:1.5,controllerReserveZones:1};
export function buildIrrigationPlan(input:IrrigationInput,rules=DEFAULT_IRRIGATION_RULES):IrrigationPlan{
  const hasLawn=input.lawnAreaM2>0,hasDrip=input.bedAreaM2>0||input.hedgeLengthM>0;
  const style=hasLawn&&hasDrip?"combined":hasLawn?"sprinkler":"drip";
  const activeCategories=[hasLawn,input.bedAreaM2>0,input.hedgeLengthM>0].filter(Boolean).length;
  const controllerZones=input.automaticControl?activeCategories+rules.controllerReserveZones:0;
  const hedgeDriplineM=Math.ceil(input.hedgeLengthM*rules.hedgeReserveFactor);
  const bedDriplineM=Math.ceil(input.bedAreaM2*rules.bedDriplineMPerM2);
  const components:IrrigationPlan["components"]=[];
  if(hedgeDriplineM)components.push({kind:"dripline",label:"Tropfrohr für Hecke",quantity:`ca. ${hedgeDriplineM} m`,note:"inklusive 15 % Verlege- und Anschlussreserve"});
  if(bedDriplineM)components.push({kind:"dripline",label:"Tropfrohr für Beete",quantity:`erste Schätzung: ${bedDriplineM} m`,note:"Abstand und Pflanzenbedarf vor Kauf prüfen"});
  if(hasLawn)components.push({kind:"sprinkler",label:"Rasenbewässerung",quantity:"Layout erforderlich",note:"Anzahl und Position nicht ohne Geometrie/Hydraulik festlegen"});
  components.push({kind:"filter",label:"Filter",quantity:"1 Systemkomponente",note:"passend zu Wasserquelle und gewähltem System"});
  if(hasDrip)components.push({kind:"pressure-reducer",label:"Druckminderer",quantity:"nach Systemvorgabe",note:"nicht pauschal dimensionierbar"});
  if(input.automaticControl)components.push({kind:"controller",label:input.smartControl?"Smarte Steuerung":"Automatische Steuerung",quantity:`mind. ${controllerZones} Zonen`,note:"eine Reservezone ist eingeplant"});
  if(input.rainSensorWanted)components.push({kind:"sensor",label:"Regen-/Feuchtesensor",quantity:"1 kompatibler Sensor",note:"muss zum Steuerungssystem passen"});
  const warnings=["Alle Komponenten innerhalb eines bestätigten Systems auswählen."];
  if(input.waterFlowLMin===undefined||input.waterPressureBar===undefined)warnings.push("Wasserdurchfluss und Fließdruck vor der Produktauswahl messen.");
  if(hasLawn)warnings.push("Rasenregner und Zonen benötigen eine Layout- und Hydraulikprüfung.");
  return{style,hedgeDriplineM,bedDriplineM,activeCategories,controllerZones,components,warnings};
}
