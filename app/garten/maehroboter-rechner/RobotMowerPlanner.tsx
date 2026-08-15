"use client";

import { useEffect, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { PlannerNumberField as NumberField } from "@/components/calculator/PlannerNumberField";
import { usePlannerValidation } from "@/components/calculator/usePlannerValidation";
import { usePlannerStepTransition } from "@/components/calculator/usePlannerStepTransition";
import { usePlannerSessionState } from "@/components/calculator/usePlannerSessionState";
import { PrintResultAction } from "@/components/planner/PrintResultAction";
import { calculateRobotMowerPlan } from "@/lib/robot-mower/rules";
import { RobotMowerInputSchema, type LawnArea, type RobotMowerInput } from "@/lib/robot-mower/types";
import { nextNumberedLabel } from "@/lib/planner/dynamic-label";

const INITIAL: RobotMowerInput = {
  areas: [{ id: "area-1", label: "Hauptrasen", lengthM: 20, widthM: 15, excludedAreaM2: 25 }],
  complexity: "moderate",
  growth: "normal",
  mowingZones: 2,
  narrowestPassageCm: 90,
  maximumSlopePercent: 20,
  obstacleCount: 4,
  separatedAreas: false,
  boundarySystem: "wire",
  powerAtStation: true,
  reliableReception: true,
  rainShelteredStation: false,
};

const TITLES = [
  "Wie groß ist die tatsächlich zu mähende Fläche?",
  "Wie anspruchsvoll ist dein Rasen?",
  "Wie soll Orientierung und Ladestation funktionieren?",
  "Dein Mähroboter-Auswahlrahmen",
];

const parseInput = (value: unknown) => {
  const result = RobotMowerInputSchema.safeParse(value);
  return result.success ? result.data : null;
};

export function RobotMowerPlanner() {
  const [step, setStep] = useState(1);
  const goToStep = usePlannerStepTransition(setStep);
  const { value: input, setValue: setInput, reset: resetInput } = usePlannerSessionState("passendplanen:robot-mower:v1", INITIAL, parseInput);
  const areaFieldIds = Object.fromEntries(input.areas.flatMap((area, index) => [[`areas.${index}.lengthM`, `${area.id}-length`], [`areas.${index}.widthM`, `${area.id}-width`], [`areas.${index}.excludedAreaM2`, `${area.id}-excluded`]]));
  const fieldIds: Partial<Record<string, string>> = { ...areaFieldIds, mowingZones: "mowing-zones", obstacleCount: "obstacles", narrowestPassageCm: "narrowest-passage", maximumSlopePercent: "maximum-slope" };
  const stepFields: Partial<Record<number, readonly string[]>> = { 1: Object.keys(areaFieldIds), 2: ["mowingZones", "obstacleCount", "narrowestPassageCm", "maximumSlopePercent"], 3: [] };
  const { parsed, fieldErrors, formError, validate, clearFieldError, resetValidation } = usePlannerValidation({ input, setInput, schema: RobotMowerInputSchema, fieldIds, stepFields, step, setStep });
  const plan = parsed.success ? calculateRobotMowerPlan(parsed.data) : null;

  useEffect(() => {
    if (step > 1) document.getElementById("calculator-heading")?.focus();
  }, [step]);

  function update<K extends keyof RobotMowerInput>(key: K, value: RobotMowerInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    clearFieldError(String(key));
  }

  function updateArea(id: string, patch: Partial<LawnArea>) {
    setInput((current) => ({ ...current, areas: current.areas.map((area) => area.id === id ? { ...area, ...patch } : area) }));
    const index = input.areas.findIndex((area) => area.id === id);
    if (index >= 0) clearFieldError(`areas.${index}`);
  }

  function addArea() {
    setInput((current) => current.areas.length >= 8 ? current : ({ ...current, areas: [...current.areas, { id: `area-${Date.now()}`, label: nextNumberedLabel(current.areas.map((area) => area.label), "Rasenfläche", 2), lengthM: 8, widthM: 6, excludedAreaM2: 0 }] }));
    clearFieldError("areas");
  }

  function removeArea(id: string) {
    setInput((current) => current.areas.length === 1 ? current : ({ ...current, areas: current.areas.filter((area) => area.id !== id) }));
    clearFieldError("areas");
  }

  function next() {
    if (!validate()) return;
    goToStep(Math.min(4, step + 1));
  }

  return <CalculatorShell step={step} totalSteps={4} title={TITLES[step - 1]} label="Mähroboter-Flächencheck" onReset={() => { resetInput(); setStep(1); resetValidation(); }}>
    {step === 1 && <div className="form-step">
      <div className="room-list">{input.areas.map((area, index) => <article className="room-editor" key={area.id}>
        <div className="room-editor-heading"><div><span>Teilfläche {index + 1}</span><input className="text-input" aria-label={`Name der Rasenfläche ${index + 1}`} value={area.label} maxLength={40} onChange={(event) => updateArea(area.id, { label: event.target.value })} /></div>{input.areas.length > 1 && <button type="button" onClick={() => removeArea(area.id)} aria-label={`${area.label} entfernen`}>Entfernen</button>}</div>
        <div className="field-grid field-grid--three"><NumberField id={`${area.id}-length`} label="Länge" value={area.lengthM} unit="m" min={1} max={100} step="0.1" error={fieldErrors[`areas.${index}.lengthM`]} onChange={(value) => updateArea(area.id, { lengthM: value })} /><NumberField id={`${area.id}-width`} label="Breite" value={area.widthM} unit="m" min={1} max={100} step="0.1" error={fieldErrors[`areas.${index}.widthM`]} onChange={(value) => updateArea(area.id, { widthM: value })} /><NumberField id={`${area.id}-excluded`} label="Feste Abzüge" value={area.excludedAreaM2} unit="m²" min={0} max={1000} step="0.1" error={fieldErrors[`areas.${index}.excludedAreaM2`]} onChange={(value) => updateArea(area.id, { excludedAreaM2: value })} /></div>
        <p>{format(Math.max(0, area.lengthM * area.widthM - area.excludedAreaM2))} m² netto</p>
      </article>)}</div>
      {input.areas.length < 8 && <button className="add-room-button" type="button" onClick={addArea}>+ Weitere rechteckige Rasenfläche</button>}
      <div className="info-box"><span aria-hidden="true">i</span><p>Teile L-Formen in Rechtecke. Ziehe Haus, Terrasse, feste Beete oder Teich ab. Einzelne Bäume und kleine Hindernisse werden später separat erfasst.</p></div>
      <div className="live-estimate"><span>Netto-Rasenfläche</span><strong>{plan ? `${format(plan.netAreaM2)} m²` : "–"}</strong><small>{input.areas.length} Teilfläche{input.areas.length === 1 ? "" : "n"}, feste Abzüge berücksichtigt</small></div>
    </div>}

    {step === 2 && <div className="form-step">
      <fieldset className="choice-group"><legend>Geometrie des Mähbereichs</legend><div className="radio-grid radio-grid--three"><Choice name="complexity" label="Einfach" detail="offen, wenige Kanten" checked={input.complexity === "simple"} onChange={() => update("complexity", "simple")} /><Choice name="complexity" label="Gegliedert" detail="mehrere Ecken und Bereiche" checked={input.complexity === "moderate"} onChange={() => update("complexity", "moderate")} /><Choice name="complexity" label="Komplex" detail="viele Engstellen und Inseln" checked={input.complexity === "complex"} onChange={() => update("complexity", "complex")} /></div></fieldset>
      <fieldset className="choice-group"><legend>Wachstumsintensität als Auswahlreserve</legend><div className="radio-grid radio-grid--three"><Choice name="growth" label="Eher langsam" detail="schattig oder trocken" checked={input.growth === "slow"} onChange={() => update("growth", "slow")} /><Choice name="growth" label="Normal" detail="übliche Gartennutzung" checked={input.growth === "normal"} onChange={() => update("growth", "normal")} /><Choice name="growth" label="Stark" detail="schnelles Wachstum" checked={input.growth === "strong"} onChange={() => update("growth", "strong")} /></div></fieldset>
      <div className="field-grid field-grid--two"><NumberField id="mowing-zones" label="Geplante Mähzonen" value={input.mowingZones} unit="Zonen" min={1} max={8} integer error={fieldErrors.mowingZones} onChange={(value) => update("mowingZones", value)} /><NumberField id="obstacles" label="Bäume und feste Hindernisse" value={input.obstacleCount} unit="Stk." min={0} max={100} integer error={fieldErrors.obstacleCount} onChange={(value) => update("obstacleCount", value)} /></div>
      <div className="field-grid field-grid--two"><NumberField id="narrowest-passage" label="Engste zu befahrende Passage" value={input.narrowestPassageCm} unit="cm" min={30} max={500} error={fieldErrors.narrowestPassageCm} onChange={(value) => update("narrowestPassageCm", value)} /><NumberField id="maximum-slope" label="Maximale gemessene Steigung" value={input.maximumSlopePercent} unit="%" min={0} max={80} step="1" error={fieldErrors.maximumSlopePercent} onChange={(value) => update("maximumSlopePercent", value)} /></div>
      <div className="check-card-grid check-card-grid--two"><Check label="Getrennte Rasenflächen" detail="keine selbstständig befahrbare Verbindung" checked={input.separatedAreas} onChange={(value) => update("separatedAreas", value)} /><div className="live-estimate"><span>Planerische Flächenklasse</span><strong>{plan ? `ab ${plan.requiredRatedAreaM2} m²` : "–"}</strong><small>Mit transparenter Betriebsreserve, noch ohne Produktfreigabe.</small></div></div>
    </div>}

    {step === 3 && <div className="form-step">
      <fieldset className="choice-group"><legend>Begrenzungs- und Navigationsprinzip</legend><div className="radio-grid radio-grid--three"><Choice name="boundary" label="Begrenzungskabel" detail="physische Leitungsführung" checked={input.boundarySystem === "wire"} onChange={() => update("boundarySystem", "wire")} /><Choice name="boundary" label="Kabellos" detail="Standortempfang nötig" checked={input.boundarySystem === "wireless"} onChange={() => update("boundarySystem", "wireless")} /><Choice name="boundary" label="Noch offen" detail="Systeme erst vergleichen" checked={input.boundarySystem === "undecided"} onChange={() => update("boundarySystem", "undecided")} /></div></fieldset>
      <div className="check-card-grid check-card-grid--two"><Check label="Strom an der Station verfügbar" detail="Position und Anschluss fachgerecht geprüft" checked={input.powerAtStation} onChange={(value) => update("powerAtStation", value)} /><Check label="Empfang im ganzen Bereich plausibel" detail="für kabellose Navigation vor Ort testen" checked={input.reliableReception} onChange={(value) => update("reliableReception", value)} /><Check label="Stationsplatz passend geschützt" detail="Herstellerabstände und freie Zufahrt bleiben erhalten" checked={input.rainShelteredStation} onChange={(value) => update("rainShelteredStation", value)} /></div>
      <div className="live-estimate"><span>Rechteckiger Kantenrahmen</span><strong>{plan ? `${format(plan.rectangularPerimeterM)} m` : "–"}</strong><small>{input.boundarySystem === "wireless" ? "Keine Kabelmenge abgeleitet; Empfang und virtuelle Grenzen prüfen." : `Als grober Kabelrahmen mit 10 % Reserve: ${plan?.boundaryWireFrameM ?? "–"} m.`}</small></div>
      <div className="info-box"><span aria-hidden="true">i</span><p>Der Kantenrahmen addiert nur die Umfänge deiner Rechtecke. Inseln, gemeinsame Kanten, Such- oder Leitkabel und herstellerspezifische Abstände sind nicht enthalten.</p></div>
    </div>}

    {step === 4 && plan && <div className="results robot-mower-results" aria-live="polite">
      <div className="requirement-summary"><div><span>Netto-Rasenfläche</span><strong>{format(plan.netAreaM2)} m²</strong></div><div><span>Flächenklasse ab</span><strong>{plan.requiredRatedAreaM2} m²</strong></div><div><span>Engste Passage</span><strong>{format(input.narrowestPassageCm)} cm</strong></div><div><span>Maximale Steigung</span><strong>{format(input.maximumSlopePercent)} %</strong></div></div>
      <div className="detail-result-grid">
        <article><span className="component-icon" aria-hidden="true">◉</span><div><p className="eyebrow">Kapazitätsrahmen</p><h3>Modelle ab {plan.requiredRatedAreaM2} m² Nennfläche prüfen</h3><p>{format(plan.netAreaM2)} m² Nettofläche werden mit dem Faktor {format(plan.capacityFactor)} für Geometrie, Zonen, Wachstum und Trennung eingeordnet.</p><strong>Herstellerbedingungen und reale Mähzeit bleiben ausschlaggebend.</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">↗</span><div><p className="eyebrow">Gelände</p><h3>{passageLabel(plan.passageClass)} · {format(input.maximumSlopePercent)} % Steigung</h3><p>{input.obstacleCount} feste Hindernisse und {input.mowingZones} geplante Zone{input.mowingZones === 1 ? "" : "n"} gehören in den konkreten Gartenplan.</p><strong>Durchfahrt, Randgefälle und Wendefläche produktbezogen bestätigen.</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">⌁</span><div><p className="eyebrow">Begrenzung</p><h3>{input.boundarySystem === "wire" ? `Grob ${plan.boundaryWireFrameM} m Kabelrahmen` : input.boundarySystem === "wireless" ? "Kabellose Standortprüfung" : "Systementscheidung noch offen"}</h3><p>{input.boundarySystem === "wire" ? `${format(plan.rectangularPerimeterM)} m Rechtecksumme plus 10 % Reserve – ohne Inseln und Zusatzleitungen.` : "Virtuelle Grenzen oder Leitungsführung müssen am realen Grundstück funktionieren und zum Gerät passen."}</p><strong>{input.powerAtStation ? "Stromposition vorgemerkt." : "Stromversorgung der Station ist noch offen."}</strong></div></article>
      </div>
      <div className="warning-panel"><h3>Vor der Geräteauswahl prüfen</h3><ul>{plan.warnings.map((warning) => <li key={warning}>{warning}</li>)}{plan.setupTasks.map((task) => <li key={task}>{task}</li>)}<li>Randgestaltung, Stufen, Wasserflächen, öffentliche Wege, Kinder- und Tierbereiche sowie Aufbewahrung nach Anleitung und örtlicher Situation planen.</li></ul></div>
      <PrintResultAction />
    </div>}

    {formError && <p className="field-error calculator-error" role="alert">{formError}</p>}
    <div className="calculator-actions">{step > 1 && <button className="button button--back" type="button" onClick={() => { resetValidation(); goToStep(Math.max(1, step - 1)); }}>← Zurück</button>}{step < 4 && <button className="button button--primary" type="button" onClick={next}>{step === 3 ? "Auswahlrahmen berechnen" : "Weiter"} <span aria-hidden="true">→</span></button>}{step === 4 && <button className="button button--back" type="button" onClick={() => goToStep(1)}>Eingaben ändern</button>}</div>
  </CalculatorShell>;
}

function Choice({ name, label, detail, checked, onChange }: { name: string; label: string; detail: string; checked: boolean; onChange: () => void }) {
  return <label className={`radio-card radio-card--detail ${checked ? "radio-card--selected" : ""}`}><input type="radio" name={name} checked={checked} onChange={onChange} /><span><strong>{label}</strong><small>{detail}</small></span></label>;
}

function Check({ label, detail, checked, onChange }: { label: string; detail: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className={`check-card ${checked ? "check-card--selected" : ""}`}><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span className="check-box" aria-hidden="true">{checked ? "✓" : ""}</span><span><strong>{label}</strong><small>{detail}</small></span></label>;
}

function passageLabel(value: "tight" | "narrow" | "open") {
  if (value === "tight") return "Sehr enge Passage";
  if (value === "narrow") return "Schmale Passage";
  return "Offene Passage";
}

function format(value: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 2 });
}
