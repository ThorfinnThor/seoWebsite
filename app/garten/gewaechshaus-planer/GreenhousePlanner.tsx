"use client";

import { useEffect, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { PlannerNumberField as NumberField } from "@/components/calculator/PlannerNumberField";
import { usePlannerValidation } from "@/components/calculator/usePlannerValidation";
import { usePlannerStepTransition } from "@/components/calculator/usePlannerStepTransition";
import { usePlannerSessionState } from "@/components/calculator/usePlannerSessionState";
import { PrintResultAction } from "@/components/planner/PrintResultAction";
import { calculateGreenhousePlan } from "@/lib/greenhouse/rules";
import { GreenhouseInputSchema, type GreenhouseInput } from "@/lib/greenhouse/types";

const INITIAL: GreenhouseInput = {
  lengthM: 4,
  widthM: 3,
  layout: "two-side",
  bedDepthCm: 60,
  aisleWidthCm: 80,
  endBedDepthCm: 60,
  doorWidthCm: 90,
  baseBarLengthM: 2.5,
  useCase: "vegetables",
  glazing: "polycarbonate",
  roofVentCount: 2,
  automaticOpeners: true,
  crossVentilation: true,
  waterAtSite: true,
  electricityPlanned: false,
};

const TITLES = [
  "Wie groß ist die verfügbare Gewächshausfläche?",
  "Wie möchtest du Beete und Wege aufteilen?",
  "Welche Ausstattung und Versorgung planst du?",
  "Dein Gewächshaus-Planungsrahmen",
];

const parseInput = (value: unknown) => {
  const result = GreenhouseInputSchema.safeParse(value);
  return result.success ? result.data : null;
};
const FIELD_IDS: Partial<Record<string, string>> = { lengthM: "greenhouse-length", widthM: "greenhouse-width", doorWidthCm: "greenhouse-door", bedDepthCm: "bed-depth", aisleWidthCm: "aisle-width", endBedDepthCm: "end-bed-depth", baseBarLengthM: "base-bar-length", roofVentCount: "roof-vents" };
const STEP_FIELDS: Partial<Record<number, readonly string[]>> = { 1: ["lengthM", "widthM", "doorWidthCm"], 2: ["bedDepthCm", "aisleWidthCm", "endBedDepthCm"], 3: ["baseBarLengthM", "roofVentCount"] };

export function GreenhousePlanner() {
  const [step, setStep] = useState(1);
  const goToStep = usePlannerStepTransition(setStep);
  const { value: input, setValue: setInput, reset: resetInput } = usePlannerSessionState("passendplanen:greenhouse:v1", INITIAL, parseInput);
  const { parsed, fieldErrors, formError, validate, clearFieldError, resetValidation } = usePlannerValidation({ input, setInput, schema: GreenhouseInputSchema, fieldIds: FIELD_IDS, stepFields: STEP_FIELDS, step, setStep });
  const plan = parsed.success ? calculateGreenhousePlan(parsed.data) : null;

  useEffect(() => {
    if (step > 1) document.getElementById("calculator-heading")?.focus();
  }, [step]);

  function update<K extends keyof GreenhouseInput>(key: K, value: GreenhouseInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    clearFieldError(String(key));
  }

  function next() {
    if (!validate()) return;
    goToStep(Math.min(4, step + 1));
  }

  return <CalculatorShell step={step} totalSteps={4} title={TITLES[step - 1]} label="Gewächshaus-Planer" onReset={() => { resetInput(); setStep(1); resetValidation(); }}>
    {step === 1 && <div className="form-step">
      <div className="field-grid field-grid--two"><NumberField id="greenhouse-length" label="Außenlänge" value={input.lengthM} unit="m" min={1.5} max={30} step="0.1" error={fieldErrors.lengthM} onChange={(value) => update("lengthM", value)} /><NumberField id="greenhouse-width" label="Außenbreite" value={input.widthM} unit="m" min={1.2} max={12} step="0.1" error={fieldErrors.widthM} onChange={(value) => update("widthM", value)} /></div>
      <NumberField id="greenhouse-door" label="Bekannte lichte Türbreite" value={input.doorWidthCm} unit="cm" min={50} max={200} error={fieldErrors.doorWidthCm} onChange={(value) => update("doorWidthCm", value)} />
      <fieldset className="choice-group"><legend>Hauptnutzung</legend><div className="radio-grid radio-grid--four"><Choice name="use-case" label="Anzucht" detail="Jungpflanzen und Tische" checked={input.useCase === "seedlings"} onChange={() => update("useCase", "seedlings")} /><Choice name="use-case" label="Gemüse" detail="Beete und Rankpflanzen" checked={input.useCase === "vegetables"} onChange={() => update("useCase", "vegetables")} /><Choice name="use-case" label="Überwinterung" detail="Frostschutz separat" checked={input.useCase === "overwintering"} onChange={() => update("useCase", "overwintering")} /><Choice name="use-case" label="Gemischt" detail="wechselnde Nutzung" checked={input.useCase === "mixed"} onChange={() => update("useCase", "mixed")} /></div></fieldset>
      <div className="info-box"><span aria-hidden="true">i</span><p>Verwende die tatsächlich verfügbare, bereits rechtlich und baulich geprüfte Stellfläche. Arbeitsraum, Dachüberstände und Entwässerung können zusätzliche Fläche benötigen.</p></div>
      <div className="live-estimate"><span>Grundfläche</span><strong>{plan ? `${format(plan.footprintM2)} m²` : "–"}</strong><small>{format(input.lengthM)} × {format(input.widthM)} m Außenmaß</small></div>
    </div>}

    {step === 2 && <div className="form-step">
      <fieldset className="choice-group"><legend>Innenaufteilung</legend><div className="radio-grid radio-grid--three"><Choice name="layout" label="Zwei Seitenbeete" detail="durchgehender Mittelweg" checked={input.layout === "two-side"} onChange={() => update("layout", "two-side")} /><Choice name="layout" label="U-förmige Beete" detail="zusätzliches hinteres Beet" checked={input.layout === "u-shape"} onChange={() => update("layout", "u-shape")} /><Choice name="layout" label="Töpfe und Tische" detail="keine festen Beete" checked={input.layout === "containers"} onChange={() => update("layout", "containers")} /></div></fieldset>
      <div className="field-grid field-grid--three"><NumberField id="bed-depth" label="Tiefe je Seitenbeet" value={input.bedDepthCm} unit="cm" min={30} max={120} error={fieldErrors.bedDepthCm} onChange={(value) => update("bedDepthCm", value)} /><NumberField id="aisle-width" label="Breite des Mittelwegs" value={input.aisleWidthCm} unit="cm" min={50} max={180} error={fieldErrors.aisleWidthCm} onChange={(value) => update("aisleWidthCm", value)} /><NumberField id="end-bed-depth" label="Tiefe des hinteren Beets" value={input.endBedDepthCm} unit="cm" min={30} max={120} error={fieldErrors.endBedDepthCm} onChange={(value) => update("endBedDepthCm", value)} /></div>
      {input.layout === "containers" && <div className="info-box"><span aria-hidden="true">i</span><p>Bei Topf- und Tischkultur werden die Beetmaße nicht verwendet. Der Rechner trennt nur den durchgehenden Mittelweg von der flexibel stellbaren Restfläche.</p></div>}
      <div className="requirement-summary requirement-summary--three"><div><span>Anbaufläche in festen Beeten</span><strong>{plan ? `${format(plan.growingAreaM2)} m²` : "–"}</strong></div><div><span>Mittelweg</span><strong>{plan ? `${format(plan.pathAreaM2)} m²` : "–"}</strong></div><div><span>Flexible Restfläche</span><strong>{plan ? `${format(plan.flexibleFloorAreaM2)} m²` : "–"}</strong></div></div>
      <div className="live-estimate"><span>Breitenraster</span><strong>{plan ? `${format(plan.requiredLayoutWidthCm)} von ${format(input.widthM * 100)} cm` : "passt noch nicht"}</strong><small>{plan ? `${format(plan.remainingWidthCm)} cm bleiben für Profile, Abstand oder zusätzliche Stellfläche.` : "Beet- oder Wegbreite verkleinern."}</small></div>
    </div>}

    {step === 3 && <div className="form-step">
      <fieldset className="choice-group"><legend>Verglasung noch als Planungskontext</legend><div className="radio-grid radio-grid--four"><Choice name="glazing" label="Glas" detail="Gewicht und Bruchschutz" checked={input.glazing === "glass"} onChange={() => update("glazing", "glass")} /><Choice name="glazing" label="Hohlkammerplatten" detail="Systemstärke prüfen" checked={input.glazing === "polycarbonate"} onChange={() => update("glazing", "polycarbonate")} /><Choice name="glazing" label="Folie" detail="Befestigung und Alterung" checked={input.glazing === "foil"} onChange={() => update("glazing", "foil")} /><Choice name="glazing" label="Noch offen" detail="keine Auswahl getroffen" checked={input.glazing === "undecided"} onChange={() => update("glazing", "undecided")} /></div></fieldset>
      <div className="field-grid field-grid--two"><NumberField id="base-bar-length" label="Lieferlänge eines Basisprofils" value={input.baseBarLengthM} unit="m" min={1} max={6} step="0.1" error={fieldErrors.baseBarLengthM} onChange={(value) => update("baseBarLengthM", value)} /><NumberField id="roof-vents" label="Geplante Dachfenster" value={input.roofVentCount} unit="Stk." min={0} max={20} integer error={fieldErrors.roofVentCount} onChange={(value) => update("roofVentCount", value)} /></div>
      <div className="check-card-grid check-card-grid--two"><Check label="Automatische Fensteröffner" detail="nur für vorhandene passende Fenster" checked={input.automaticOpeners} onChange={(value) => update("automaticOpeners", value)} /><Check label="Gegenüberliegende Öffnung" detail="Tür, Seiten- oder weiteres Lüftungsfenster" checked={input.crossVentilation} onChange={(value) => update("crossVentilation", value)} /><Check label="Wasser am Standort" detail="Anschluss oder vorbereiteter Speicher" checked={input.waterAtSite} onChange={(value) => update("waterAtSite", value)} /><Check label="Elektrik vorgesehen" detail="feuchte Umgebung fachgerecht planen" checked={input.electricityPlanned} onChange={(value) => update("electricityPlanned", value)} /></div>
      <div className="live-estimate"><span>Basis- und Regenwasserrahmen</span><strong>{plan ? `${plan.baseBarCount} Basisstäbe · ${plan.theoreticalRainwaterPer10MmL} l` : "–"}</strong><small>Basis mit 5 % Längenreserve; Regenwasser theoretisch je 10 mm Niederschlag.</small></div>
    </div>}

    {step === 4 && plan && <div className="results greenhouse-results" aria-live="polite">
      <div className="requirement-summary"><div><span>Grundfläche</span><strong>{format(plan.footprintM2)} m²</strong></div><div><span>Feste Beetfläche</span><strong>{format(plan.growingAreaM2)} m²</strong></div><div><span>Wegfläche</span><strong>{format(plan.pathAreaM2)} m²</strong></div><div><span>Flexible Restfläche</span><strong>{format(plan.flexibleFloorAreaM2)} m²</strong></div></div>
      <div className="detail-result-grid">
        <article><span className="component-icon" aria-hidden="true">⌗</span><div><p className="eyebrow">Innenaufteilung</p><h3>{input.layout === "containers" ? `${format(plan.flexibleFloorAreaM2)} m² flexibel stellbar` : `${format(plan.growingAreaM2)} m² feste Beetfläche`}</h3><p>{input.layout === "containers" ? `Neben dem ${format(input.aisleWidthCm)} cm breiten Mittelweg bleibt die übrige Fläche für Töpfe und Tische.` : `${format(plan.sideBedAreaM2)} m² Seitenbeete${input.layout === "u-shape" ? ` plus ${format(plan.endBedAreaM2)} m² hinteres Beet` : ""}.`}</p><strong>{plan.exposedBedEdgeM ? `${format(plan.exposedBedEdgeM)} laufende Meter sichtbare Beeteinfassung` : "Stellplan für Töpfe, Tische und Bewegungsraum zeichnen"}</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">□</span><div><p className="eyebrow">Basisumfang</p><h3>{plan.baseBarCount} Basisprofile à {format(input.baseBarLengthM)} m</h3><p>Der reine Außenumfang beträgt {format(plan.basePerimeterM)} m; mit 5 % Längenreserve werden {format(plan.baseLengthWithReserveM)} m angesetzt.</p><strong>Fundamentart, Verankerung und Profilkompatibilität bleiben offen.</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">◒</span><div><p className="eyebrow">Regenwasser</p><h3>Theoretisch {plan.theoreticalRainwaterPer10MmL} Liter je 10 mm Regen</h3><p>Geometrischer Maximalwert aus der horizontalen Dachgrundfläche, bevor Rinnen-, Überlauf-, Spritz- und Speicherverluste berücksichtigt werden.</p><strong>Speicher und Überlauf anhand realer Niederschläge und Nutzung planen.</strong></div></article>
      </div>
      <div className="warning-panel"><h3>Vor Auswahl und Aufbau prüfen</h3><ul>{plan.warnings.map((warning) => <li key={warning}>{warning}</li>)}<li>Standort, Verschattung, Dachausrichtung, Türanschlag, Arbeitsraum, örtliche Vorgaben und Herstellermaße gehören in die konkrete Planung.</li></ul></div>
      <PrintResultAction />
    </div>}

    {formError && <p className="field-error calculator-error" role="alert">{formError}</p>}
    <div className="calculator-actions">{step > 1 && <button className="button button--back" type="button" onClick={() => { resetValidation(); goToStep(Math.max(1, step - 1)); }}>← Zurück</button>}{step < 4 && <button className="button button--primary" type="button" onClick={next}>{step === 3 ? "Planungsrahmen berechnen" : "Weiter"} <span aria-hidden="true">→</span></button>}{step === 4 && <button className="button button--back" type="button" onClick={() => goToStep(1)}>Eingaben ändern</button>}</div>
  </CalculatorShell>;
}

function Choice({ name, label, detail, checked, onChange }: { name: string; label: string; detail: string; checked: boolean; onChange: () => void }) {
  return <label className={`radio-card radio-card--detail ${checked ? "radio-card--selected" : ""}`}><input type="radio" name={name} checked={checked} onChange={onChange} /><span><strong>{label}</strong><small>{detail}</small></span></label>;
}

function Check({ label, detail, checked, onChange }: { label: string; detail: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className={`check-card ${checked ? "check-card--selected" : ""}`}><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span className="check-box" aria-hidden="true">{checked ? "✓" : ""}</span><span><strong>{label}</strong><small>{detail}</small></span></label>;
}

function format(value: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 2 });
}
