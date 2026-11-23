"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calculateDrywallPlan } from "@/lib/drywall/rules";
import type { DrywallInput } from "@/lib/drywall/types";
import { calculateFlooringPlan } from "@/lib/flooring/rules";
import type { FlooringInput } from "@/lib/flooring/types";
import { getPlannerSessionStorage, writePlannerState } from "@/lib/planner/persistence";
import { calculateRobotMowerPlan } from "@/lib/robot-mower/rules";
import type { RobotMowerInput } from "@/lib/robot-mower/types";
import { calculateTerracePlan } from "@/lib/terrace/rules";
import type { TerraceInput } from "@/lib/terrace/types";

/**
 * Two inputs, one result. Uses the same rules as the full planners and hands
 * the values over, so nobody types the same measurements twice.
 */

type Field = { label: string; unit: string; min: number; max: number; step: number; start: number };
type Result = { value: string; label: string };

type QuickProject = {
  id: string;
  label: string;
  question: string;
  fields: readonly [Field, Field];
  assumption: string;
  plannerHref: string;
  plannerLabel: string;
  storageKey: string;
  buildInput: (a: number, b: number) => unknown;
  results: (a: number, b: number) => Result[];
};

const de = (value: number, digits = 1) => value.toLocaleString("de-DE", { maximumFractionDigits: digits });

const terraceInput = (a: number, b: number): TerraceInput => ({ terraceLengthM: a, terraceWidthM: b, layingDirection: "width", boardWidthMm: 145, boardGapMm: 5, boardLengthM: 4, wastePercent: 5, maxSupportSpacingCm: 50 });
const drywallInput = (a: number, b: number): DrywallInput => ({ wallLengthM: a, wallHeightM: b, openingsAreaM2: 0, openingCount: 0, claddingSides: 2, layersPerSide: 1, boardLengthM: 2.5, boardWidthM: 1.25, wastePercent: 10, studSpacingCm: 62.5, trackBarLengthM: 3, includeInsulation: true, moistureExposure: false, fireOrAcousticRequirement: false, installationsPlanned: false });
const flooringInput = (a: number, b: number): FlooringInput => ({ rooms: [{ id: "room-1", label: "Raum 1", lengthM: a, widthM: b }], excludedAreaM2: 0, flooringType: "laminate", layingPattern: "straight", wastePercent: 10, plankLengthMm: 1285, plankWidthMm: 192, packageCoverageM2: 2.22, includeUnderlay: true, underlayRollCoverageM2: 10, includeSkirting: true, totalDoorOpeningM: 1, skirtingBarLengthM: 2.4, floorHeating: false, wetRoom: false });
const mowerInput = (a: number, b: number): RobotMowerInput => ({ areas: [{ id: "area-1", label: "Hauptrasen", lengthM: a, widthM: b, excludedAreaM2: 0 }], complexity: "moderate", growth: "normal", mowingZones: 1, narrowestPassageCm: 90, maximumSlopePercent: 20, obstacleCount: 4, separatedAreas: false, boundarySystem: "undecided", powerAtStation: true, reliableReception: true, rainShelteredStation: false });

const PROJECTS: readonly QuickProject[] = [
  {
    id: "terrasse",
    label: "Terrasse",
    question: "Wie viele Dielen brauche ich?",
    fields: [{ label: "Länge", unit: "m", min: 1, max: 30, step: 0.1, start: 5 }, { label: "Breite", unit: "m", min: 1, max: 30, step: 0.1, start: 4 }],
    assumption: "Dielen 145 mm mit 5 mm Fuge, 4 m lang, 5 % Verschnitt, Träger alle 50 cm.",
    plannerHref: "/garten/terrassen-dielen-rechner/",
    plannerLabel: "Im Terrassen-Rechner anpassen",
    storageKey: "passendplanen:terrace:v1",
    buildInput: terraceInput,
    results: (a, b) => {
      const plan = calculateTerracePlan(terraceInput(a, b));
      return [{ value: `${plan.fullBoardsToBuy}`, label: "Dielen à 4 m" }, { value: `${de(plan.supportLinearMWithWaste, 0)} m`, label: "Unterkonstruktion" }, { value: `${de(plan.areaM2)} m²`, label: "Fläche" }];
    },
  },
  {
    id: "trockenbau",
    label: "Trockenbauwand",
    question: "Was brauche ich für die Wand?",
    fields: [{ label: "Länge", unit: "m", min: 1, max: 50, step: 0.1, start: 4 }, { label: "Höhe", unit: "m", min: 1.8, max: 6, step: 0.05, start: 2.5 }],
    assumption: "Beidseitig eine Lage, Platten 2,5 × 1,25 m, 10 % Verschnitt, Raster 62,5 cm, ohne Tür.",
    plannerHref: "/haus/innenausbau/trockenbau-rechner/",
    plannerLabel: "Im Trockenbau-Rechner anpassen",
    storageKey: "passendplanen:drywall:v1",
    buildInput: drywallInput,
    results: (a, b) => {
      const plan = calculateDrywallPlan(drywallInput(a, b));
      return [{ value: `${plan.boardCount}`, label: "Gipsplatten" }, { value: `${plan.baselineStudCount}`, label: "Ständer" }, { value: `${plan.trackBarCount}`, label: "UW-Stäbe à 3 m" }];
    },
  },
  {
    id: "boden",
    label: "Laminat",
    question: "Wie viele Pakete bestelle ich?",
    fields: [{ label: "Raumlänge", unit: "m", min: 0.8, max: 30, step: 0.1, start: 5 }, { label: "Raumbreite", unit: "m", min: 0.8, max: 30, step: 0.1, start: 4 }],
    assumption: "Pakete mit 2,22 m², 10 % Verschnitt, 1 m Türöffnung, Leisten 2,4 m.",
    plannerHref: "/haus/boden/bodenbelag-rechner/",
    plannerLabel: "Im Bodenbelag-Rechner anpassen",
    storageKey: "passendplanen:flooring:v1",
    buildInput: flooringInput,
    results: (a, b) => {
      const plan = calculateFlooringPlan(flooringInput(a, b));
      return [{ value: `${plan.packageCount}`, label: "Pakete" }, { value: `${de(plan.orderedAreaM2)} m²`, label: "Bestellmenge" }, { value: `${plan.skirtingBarCount}`, label: "Sockelleisten" }];
    },
  },
  {
    id: "maehroboter",
    label: "Mähroboter",
    question: "Welche Flächenklasse passt?",
    fields: [{ label: "Rasenlänge", unit: "m", min: 1, max: 100, step: 1, start: 25 }, { label: "Rasenbreite", unit: "m", min: 1, max: 100, step: 1, start: 16 }],
    assumption: "Gegliederter Garten, normales Wachstum, eine Zone. Beete und Wege ziehst du im Rechner ab.",
    plannerHref: "/garten/maehroboter-rechner/",
    plannerLabel: "Im Mähroboter-Rechner anpassen",
    storageKey: "passendplanen:robot-mower:v1",
    buildInput: mowerInput,
    results: (a, b) => {
      const plan = calculateRobotMowerPlan(mowerInput(a, b));
      return [{ value: `ab ${de(plan.requiredRatedAreaM2, 0)} m²`, label: "Nennfläche" }, { value: `${de(plan.netAreaM2, 0)} m²`, label: "Rasen" }, { value: `+ ${de((plan.capacityFactor - 1) * 100, 0)} %`, label: "Reserve" }];
    },
  },
];

export function QuickCalculator() {
  const router = useRouter();
  const [projectId, setProjectId] = useState(PROJECTS[0].id);
  const project = PROJECTS.find((candidate) => candidate.id === projectId) ?? PROJECTS[0];
  const [values, setValues] = useState<Record<string, [string, string]>>(() => Object.fromEntries(PROJECTS.map((candidate) => [candidate.id, [String(candidate.fields[0].start).replace(".", ","), String(candidate.fields[1].start).replace(".", ",")]])));
  const [rawA, rawB] = values[project.id];
  const numbers = [rawA, rawB].map((raw) => Number(raw.replace(",", ".")));
  const valid = numbers.every((value, index) => Number.isFinite(value) && value >= project.fields[index].min && value <= project.fields[index].max);
  const results = valid ? project.results(numbers[0], numbers[1]) : null;

  function update(index: 0 | 1, value: string) {
    setValues((current) => {
      const next: [string, string] = [...current[project.id]];
      next[index] = value;
      return { ...current, [project.id]: next };
    });
  }

  function openPlanner() {
    const storage = getPlannerSessionStorage(window);
    if (storage && valid) writePlannerState(storage, project.storageKey, project.buildInput(numbers[0], numbers[1]));
    router.push(project.plannerHref);
  }

  return (
    <div className="quick-calc">
      <div className="quick-calc__tabs" role="group" aria-label="Projekt wählen">
        {PROJECTS.map((candidate) => (
          <button key={candidate.id} type="button" aria-pressed={candidate.id === project.id} onClick={() => setProjectId(candidate.id)}>{candidate.label}</button>
        ))}
      </div>
      <div className="quick-calc__body">
        <p className="quick-calc__question">{project.question}</p>
        <div className="quick-calc__fields">
          {project.fields.map((field, index) => (
            <label key={`${project.id}-${field.label}`} htmlFor={`quick-${project.id}-${index}`}>
              <span>{field.label}</span>
              <span className="quick-calc__input">
                <input id={`quick-${project.id}-${index}`} inputMode="decimal" autoComplete="off" value={values[project.id][index]} onChange={(event) => update(index as 0 | 1, event.target.value)} />
                <span aria-hidden="true">{field.unit}</span>
              </span>
            </label>
          ))}
        </div>
        <div className="quick-calc__result" aria-live="polite">
          {results
            ? <dl>{results.map((result) => <div key={result.label}><dt>{result.label}</dt><dd>{result.value}</dd></div>)}</dl>
            : <p>Bitte Werte zwischen {de(project.fields[0].min)} und {de(project.fields[0].max)} {project.fields[0].unit} sowie {de(project.fields[1].min)} und {de(project.fields[1].max)} {project.fields[1].unit} eingeben.</p>}
        </div>
        <p className="quick-calc__assumption">Gerechnet mit: {project.assumption}</p>
        <button type="button" className="button button--primary" onClick={openPlanner} disabled={!valid}>{project.plannerLabel} <span aria-hidden="true">→</span></button>
      </div>
    </div>
  );
}
