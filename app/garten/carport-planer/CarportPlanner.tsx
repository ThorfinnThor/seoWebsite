"use client";

import { useEffect, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { usePlannerSessionState } from "@/components/calculator/usePlannerSessionState";
import { PrintResultAction } from "@/components/planner/PrintResultAction";
import { calculateCarportPlan } from "@/lib/carport/rules";
import { CarportInputSchema, type CarportInput } from "@/lib/carport/types";

const INITIAL: CarportInput = {
  vehicleCount: 1,
  vehicleLengthM: 4.8,
  vehicleWidthM: 1.9,
  vehicleHeightM: 1.75,
  sideClearanceCm: 60,
  frontClearanceCm: 60,
  rearClearanceCm: 80,
  verticalClearanceCm: 30,
  storageDepthM: 0,
  approach: "straight",
  roofType: "flat",
  installation: "freestanding",
  siteSlope: "level",
  drainage: "cistern",
  electricityPlanned: false,
  evCharging: false,
  pvPlanned: false,
};

const TITLES = [
  "Welche Fahrzeuge sollen geschützt stehen?",
  "Wie viel Bewegungs- und Zugangsraum brauchst du?",
  "Welche Standort- und Dachaufgaben sind vorgesehen?",
  "Dein Carport-Planungsrahmen",
];

const parseInput = (value: unknown) => {
  const result = CarportInputSchema.safeParse(value);
  return result.success ? result.data : null;
};

export function CarportPlanner() {
  const [step, setStep] = useState(1);
  const { value: input, setValue: setInput, reset: resetInput } = usePlannerSessionState("machplan:carport:v1", INITIAL, parseInput);
  const [error, setError] = useState("");
  const parsed = CarportInputSchema.safeParse(input);
  const plan = parsed.success ? calculateCarportPlan(parsed.data) : null;

  useEffect(() => {
    if (step > 1) document.getElementById("calculator-heading")?.focus();
  }, [step]);

  function update<K extends keyof CarportInput>(key: K, value: CarportInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function next() {
    if (!parsed.success) {
      setError("Bitte prüfe die Fahrzeug- und Freiraummaße, bevor du fortfährst.");
      return;
    }
    setStep((current) => Math.min(4, current + 1));
  }

  return <CalculatorShell step={step} totalSteps={4} title={TITLES[step - 1]} label="Carport-Planer" onReset={() => { resetInput(); setStep(1); setError(""); }}>
    {step === 1 && <div className="form-step">
      <fieldset className="choice-group"><legend>Anzahl der Stellplätze</legend><div className="radio-grid radio-grid--two"><Choice name="vehicle-count" label="Ein Fahrzeug" detail="ein lichter Stellbereich" checked={input.vehicleCount === 1} onChange={() => update("vehicleCount", 1)} /><Choice name="vehicle-count" label="Zwei Fahrzeuge" detail="gemeinsamer Doppelcarport" checked={input.vehicleCount === 2} onChange={() => update("vehicleCount", 2)} /></div></fieldset>
      <div className="field-grid field-grid--three"><NumberField id="vehicle-length" label="Fahrzeuglänge" value={input.vehicleLengthM} unit="m" min={3} max={8} step="0.05" onChange={(value) => update("vehicleLengthM", value)} /><NumberField id="vehicle-width" label="Fahrzeugbreite" value={input.vehicleWidthM} unit="m" min={1.4} max={3} step="0.05" onChange={(value) => update("vehicleWidthM", value)} /><NumberField id="vehicle-height" label="Fahrzeughöhe" value={input.vehicleHeightM} unit="m" min={1.2} max={4} step="0.05" onChange={(value) => update("vehicleHeightM", value)} /></div>
      <div className="info-box"><span>i</span><p>Miss das größte vorgesehene Fahrzeug inklusive Spiegelbreite und fester Dachaufbauten. Geöffnete Türen, Heckklappe, Fahrradträger und ein mögliches künftiges Fahrzeug benötigen zusätzliche Prüfung.</p></div>
      <div className="live-estimate"><span>Reine Fahrzeug-Stellfläche</span><strong>{plan ? `${format(plan.vehicleParkingAreaM2)} m²` : "–"}</strong><small>{input.vehicleCount} × {format(input.vehicleLengthM)} × {format(input.vehicleWidthM)} m, noch ohne Bewegungsraum</small></div>
    </div>}

    {step === 2 && <div className="form-step">
      <div className="field-grid field-grid--two"><NumberField id="side-clearance" label="Seitlicher Freiraum je Rand und Zwischenraum" value={input.sideClearanceCm} unit="cm" min={20} max={150} onChange={(value) => update("sideClearanceCm", value)} /><NumberField id="vertical-clearance" label="Höhenreserve über dem Fahrzeug" value={input.verticalClearanceCm} unit="cm" min={15} max={120} onChange={(value) => update("verticalClearanceCm", value)} /></div>
      <div className="field-grid field-grid--three"><NumberField id="front-clearance" label="Freiraum vorne" value={input.frontClearanceCm} unit="cm" min={20} max={200} onChange={(value) => update("frontClearanceCm", value)} /><NumberField id="rear-clearance" label="Freiraum hinten" value={input.rearClearanceCm} unit="cm" min={20} max={200} onChange={(value) => update("rearClearanceCm", value)} /><NumberField id="storage-depth" label="Zusätzliche Stauraumtiefe" value={input.storageDepthM} unit="m" min={0} max={4} step="0.1" onChange={(value) => update("storageDepthM", value)} /></div>
      <fieldset className="choice-group"><legend>Anfahrt auf den Stellplatz</legend><div className="radio-grid radio-grid--three"><Choice name="approach" label="Gerade" detail="direkte Einfahrt" checked={input.approach === "straight"} onChange={() => update("approach", "straight")} /><Choice name="approach" label="Mit Richtungswechsel" detail="Kurve oder Rangieren" checked={input.approach === "turn"} onChange={() => update("approach", "turn")} /><Choice name="approach" label="Noch offen" detail="Zufahrt nicht vermessen" checked={input.approach === "unknown"} onChange={() => update("approach", "unknown")} /></div></fieldset>
      <div className="requirement-summary requirement-summary--three"><div><span>Lichte Zielbreite</span><strong>{plan ? `${format(plan.clearWidthM)} m` : "–"}</strong></div><div><span>Lichte Ziellänge</span><strong>{plan ? `${format(plan.clearLengthM)} m` : "–"}</strong></div><div><span>Lichte Zielhöhe</span><strong>{plan ? `${format(plan.clearHeightM)} m` : "–"}</strong></div></div>
      <div className="info-box"><span>i</span><p>Diese lichten Innenmaße enthalten noch keine Pfosten, Wandstärken, Dachüberstände, Rinnen oder Montageabstände. Außenmaße des konkreten Systems sind deshalb größer.</p></div>
    </div>}

    {step === 3 && <div className="form-step">
      <fieldset className="choice-group"><legend>Dachform als Planungskontext</legend><div className="radio-grid radio-grid--four"><Choice name="roof" label="Flachdach" detail="Gefälle dennoch nötig" checked={input.roofType === "flat"} onChange={() => update("roofType", "flat")} /><Choice name="roof" label="Pultdach" detail="eine Ablaufrichtung" checked={input.roofType === "mono-pitch"} onChange={() => update("roofType", "mono-pitch")} /><Choice name="roof" label="Satteldach" detail="höherer Aufbau" checked={input.roofType === "gable"} onChange={() => update("roofType", "gable")} /><Choice name="roof" label="Noch offen" detail="keine Konstruktion gewählt" checked={input.roofType === "undecided"} onChange={() => update("roofType", "undecided")} /></div></fieldset>
      <div className="field-grid field-grid--two"><fieldset className="choice-group compact-choice"><legend>Aufstellung</legend><div className="radio-grid radio-grid--two"><Choice name="installation" label="Freistehend" detail="eigene Konstruktion" checked={input.installation === "freestanding"} onChange={() => update("installation", "freestanding")} /><Choice name="installation" label="Am Haus" detail="Gebäudeanschluss" checked={input.installation === "attached"} onChange={() => update("installation", "attached")} /></div></fieldset><fieldset className="choice-group compact-choice"><legend>Gelände</legend><div className="radio-grid radio-grid--three"><Choice name="slope" label="Eben" detail="Aufmaß bestätigt" checked={input.siteSlope === "level"} onChange={() => update("siteSlope", "level")} /><Choice name="slope" label="Leicht geneigt" detail="Höhen aufnehmen" checked={input.siteSlope === "slight"} onChange={() => update("siteSlope", "slight")} /><Choice name="slope" label="Hang" detail="Erdarbeiten offen" checked={input.siteSlope === "slope"} onChange={() => update("siteSlope", "slope")} /></div></fieldset></div>
      <fieldset className="choice-group"><legend>Ziel für Dachwasser</legend><div className="radio-grid radio-grid--four"><Choice name="drainage" label="Speicher" detail="Überlauf mitplanen" checked={input.drainage === "cistern"} onChange={() => update("drainage", "cistern")} /><Choice name="drainage" label="Versickerung" detail="Zulässigkeit prüfen" checked={input.drainage === "infiltration"} onChange={() => update("drainage", "infiltration")} /><Choice name="drainage" label="Anschluss" detail="Freigabe und Rückstau" checked={input.drainage === "connection"} onChange={() => update("drainage", "connection")} /><Choice name="drainage" label="Noch offen" detail="kein Ablaufziel" checked={input.drainage === "undecided"} onChange={() => update("drainage", "undecided")} /></div></fieldset>
      <div className="check-card-grid check-card-grid--two"><Check label="Elektrik vorgesehen" detail="Beleuchtung oder Steckdose" checked={input.electricityPlanned} onChange={(value) => setInput((current) => ({ ...current, electricityPlanned: value, evCharging: value ? current.evCharging : false }))} /><Check label="Ladeeinrichtung vorgesehen" detail="Anschlussleistung und Schutztechnik planen" checked={input.evCharging} onChange={(value) => setInput((current) => ({ ...current, evCharging: value, electricityPlanned: value || current.electricityPlanned }))} /><Check label="Photovoltaik vorgesehen" detail="Tragwerk und Dachsystem freigeben" checked={input.pvPlanned} onChange={(value) => update("pvPlanned", value)} /></div>
      <div className="live-estimate"><span>Überdeckter Planungsrahmen</span><strong>{plan ? `${format(plan.coveredPlanningAreaM2)} m² · ${plan.theoreticalRainwaterPer10MmL} l` : "–"}</strong><small>Fläche aus lichten Zielmaßen; Regenwasser theoretisch je 10 mm Niederschlag.</small></div>
    </div>}

    {step === 4 && plan && <div className="results carport-results" aria-live="polite">
      <div className="requirement-summary"><div><span>Lichte Breite</span><strong>{format(plan.clearWidthM)} m</strong></div><div><span>Lichte Länge</span><strong>{format(plan.clearLengthM)} m</strong></div><div><span>Lichte Höhe</span><strong>{format(plan.clearHeightM)} m</strong></div><div><span>Planungsfläche</span><strong>{format(plan.coveredPlanningAreaM2)} m²</strong></div></div>
      <div className="detail-result-grid">
        <article><span className="component-icon" aria-hidden="true">▱</span><div><p className="eyebrow">Lichter Stellbereich</p><h3>{format(plan.clearWidthM)} × {format(plan.clearLengthM)} m</h3><p>{format(plan.vehicleParkingAreaM2)} m² reine Fahrzeugfläche plus {format(plan.freeMovementAreaM2)} m² rechnerischer Freiraum{plan.storageAreaM2 > 0 ? ` und ${format(plan.storageAreaM2)} m² Stauraumzone` : ""}.</p><strong>Pfostenpositionen und reale Türöffnungen im konkreten Grundriss prüfen.</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">↥</span><div><p className="eyebrow">Höhe & Zufahrt</p><h3>{format(plan.clearHeightM)} m lichte Zielhöhe</h3><p>{input.approach === "straight" ? "Gerade Zufahrt eingetragen." : input.approach === "turn" ? "Richtungswechsel und Rangieren sind vorgesehen." : "Zufahrtsgeometrie ist noch offen."}</p><strong>Heckklappe, Dachlast, Anbauten und künftige Fahrzeuge separat vermessen.</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">◒</span><div><p className="eyebrow">Dachwasser</p><h3>Theoretisch {plan.theoreticalRainwaterPer10MmL} Liter je 10 mm Regen</h3><p>Geometrischer Wert aus der lichten Planungsfläche, noch ohne Dachüberstand, tatsächliche Projektion und reale Verluste.</p><strong>Rinne, Fallrohr, Ablaufziel und sicherer Überlauf bleiben konkrete Planung.</strong></div></article>
      </div>
      <div className="warning-panel"><h3>Vor Produktauswahl und Aufbau prüfen</h3><ul>{plan.warnings.map((warning) => <li key={warning}>{warning}</li>)}<li>Fahrzeugmaße, Grundstücksgrenzen, Leitungen im Boden, Bäume, Tor, Beleuchtung und Wartungszugang in ein genaues Bestandsaufmaß übernehmen.</li></ul></div>
      <PrintResultAction />
    </div>}

    {error && <p className="field-error calculator-error" role="alert">{error}</p>}
    <div className="calculator-actions">{step > 1 && <button className="button button--back" type="button" onClick={() => { setError(""); setStep((current) => Math.max(1, current - 1)); }}>← Zurück</button>}{step < 4 && <button className="button button--primary" type="button" onClick={next}>{step === 3 ? "Planungsrahmen berechnen" : "Weiter"} →</button>}{step === 4 && <button className="button button--back" type="button" onClick={() => setStep(1)}>Eingaben ändern</button>}</div>
  </CalculatorShell>;
}

function NumberField({ id, label, value, unit, min, max, step, onChange }: { id: string; label: string; value: number; unit: string; min: number; max: number; step?: string; onChange: (value: number) => void }) {
  const invalid = !Number.isFinite(value) || value < min || value > max;
  return <div className="field"><label htmlFor={id}>{label}</label><div className="input-with-unit"><input id={id} type="number" value={Number.isFinite(value) ? value : ""} min={min} max={max} step={step} aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.valueAsNumber)} /><span>{unit}</span></div>{invalid && <small className="field-error" id={`${id}-error`}>Bitte {min} bis {max} {unit} eingeben.</small>}</div>;
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
