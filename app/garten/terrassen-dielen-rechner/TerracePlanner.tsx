"use client";

import { useEffect, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { usePlannerSessionState } from "@/components/calculator/usePlannerSessionState";
import { calculateTerracePlan } from "@/lib/terrace/rules";
import { TerraceInputSchema, type TerraceInput } from "@/lib/terrace/types";

const INITIAL: TerraceInput = {
  terraceLengthM: 5,
  terraceWidthM: 4,
  layingDirection: "length",
  boardWidthMm: 145,
  boardGapMm: 5,
  boardLengthM: 3,
  wastePercent: 10,
  maxSupportSpacingCm: 40,
};

const TITLES = [
  "Wie groß ist deine Terrassenfläche?",
  "Welche Dielen möchtest du einplanen?",
  "Welche Reserve und Auflagerung gelten?",
  "Dein erster Materialrahmen",
];
const parseTerraceInput = (value: unknown) => { const result = TerraceInputSchema.safeParse(value); return result.success ? result.data : null; };

export function TerracePlanner() {
  const [step, setStep] = useState(1);
  const { value: input, setValue: setInput, reset: resetInput } = usePlannerSessionState("machplan:terrace:v1", INITIAL, parseTerraceInput);
  const [error, setError] = useState("");
  const parsed = TerraceInputSchema.safeParse(input);
  const plan = parsed.success ? calculateTerracePlan(parsed.data) : null;

  useEffect(() => {
    if (step > 1) document.getElementById("calculator-heading")?.focus();
  }, [step]);

  function update<K extends keyof TerraceInput>(key: K, value: TerraceInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function next() {
    if (!parsed.success) {
      setError("Bitte prüfe die markierten Größen und verwende Werte innerhalb der angegebenen Grenzen.");
      return;
    }
    setError("");
    setStep((current) => Math.min(4, current + 1));
  }

  return <CalculatorShell step={step} totalSteps={4} title={TITLES[step - 1]} label="Terrassendielen-Rechner" onReset={() => { resetInput(); setStep(1); setError(""); }}>
    {step === 1 && <div className="form-step">
      <div className="field-grid field-grid--two">
        <NumberField id="terrace-length" label="Länge der Terrasse" value={input.terraceLengthM} unit="m" min={1} max={30} step="0.1" onChange={(value) => update("terraceLengthM", value)} />
        <NumberField id="terrace-width" label="Breite der Terrasse" value={input.terraceWidthM} unit="m" min={1} max={30} step="0.1" onChange={(value) => update("terraceWidthM", value)} />
      </div>
      <fieldset className="choice-group"><legend>Verlegerichtung der Dielen</legend><div className="radio-grid radio-grid--two"><DirectionChoice label="Entlang der Länge" detail={`${format(input.terraceLengthM)} m Lauflänge`} checked={input.layingDirection === "length"} onChange={() => update("layingDirection", "length")} /><DirectionChoice label="Entlang der Breite" detail={`${format(input.terraceWidthM)} m Lauflänge`} checked={input.layingDirection === "width"} onChange={() => update("layingDirection", "width")} /></div></fieldset>
      <div className="live-estimate"><span>Terrassenfläche</span><strong>{plan ? `${format(plan.areaM2)} m²` : "–"}</strong><small>Länge × Breite; Ausschnitte und Sonderformen separat berücksichtigen.</small></div>
    </div>}

    {step === 2 && <div className="form-step">
      <div className="field-grid field-grid--two">
        <NumberField id="board-width" label="Sichtbreite einer Diele" value={input.boardWidthMm} unit="mm" min={50} max={300} onChange={(value) => update("boardWidthMm", value)} />
        <NumberField id="board-gap" label="Geplante Fugenbreite" value={input.boardGapMm} unit="mm" min={3} max={15} onChange={(value) => update("boardGapMm", value)} />
        <NumberField id="board-length" label="Lieferlänge einer Diele" value={input.boardLengthM} unit="m" min={1} max={10} step="0.1" onChange={(value) => update("boardLengthM", value)} />
      </div>
      <div className="info-box"><span>i</span><p>Verwende die tatsächlich wirksame Sichtbreite und die vom Hersteller freigegebene Fuge. Profilmaße und Verlegebreite können voneinander abweichen.</p></div>
      <div className="requirement-summary requirement-summary--three"><div><span>Dielenreihen</span><strong>{plan?.courseCount ?? "–"}</strong></div><div><span>Reine Laufmeter</span><strong>{plan ? `${format(plan.deckingLinearM)} m` : "–"}</strong></div><div><span>Mindestens Stöße je Reihe</span><strong>{plan?.minimumJointsPerCourse ?? "–"}</strong></div></div>
    </div>}

    {step === 3 && <div className="form-step">
      <fieldset className="choice-group"><legend>Verschnitt- und Auswahlreserve</legend><div className="radio-grid radio-grid--three">{([5, 10, 15] as const).map((value) => <label className={`radio-card radio-card--detail ${input.wastePercent === value ? "radio-card--selected" : ""}`} key={value}><input type="radio" name="waste" checked={input.wastePercent === value} onChange={() => update("wastePercent", value)} /><span><strong>{value} %</strong><small>{value === 5 ? "einfache Fläche" : value === 10 ? "übliche Reserve" : "viele Zuschnitte"}</small></span></label>)}</div></fieldset>
      <NumberField id="support-spacing" label="Maximaler Auflagerabstand laut Belag-Hersteller" value={input.maxSupportSpacingCm} unit="cm" min={20} max={80} onChange={(value) => update("maxSupportSpacingCm", value)} />
      <div className="info-box"><span>!</span><p>Der voreingestellte Wert ist nur ein Planungswert. Material, Dielenstärke, Nutzung und Verlegesystem können einen kleineren Abstand verlangen.</p></div>
      <div className="live-estimate"><span>Geschätzte Unterkonstruktionslinien</span><strong>{plan ? plan.supportRowCount : "–"}</strong><small>Erste und letzte Auflagerung eingeschlossen; Randdetails separat prüfen.</small></div>
    </div>}

    {step === 4 && plan && <div className="results terrace-results" aria-live="polite">
      <div className="requirement-summary"><div><span>Fläche</span><strong>{format(plan.areaM2)} m²</strong></div><div><span>Dielenreihen</span><strong>{plan.courseCount}</strong></div><div><span>Dielen inkl. Reserve</span><strong>{format(plan.deckingLinearMWithWaste)} lfm</strong></div><div><span>Volle Lieferdielen</span><strong>ca. {plan.fullBoardsToBuy}</strong></div></div>
      <div className="terrace-result-grid">
        <article><span className="component-icon" aria-hidden="true">═</span><div><p className="eyebrow">Belag</p><h3>{plan.courseCount} Dielenreihen</h3><p>{format(plan.deckingLinearM)} laufende Meter ohne und {format(plan.deckingLinearMWithWaste)} laufende Meter mit {input.wastePercent} % Reserve.</p><strong>Bei {format(input.boardLengthM)} m Lieferlänge: ca. {plan.fullBoardsToBuy} volle Dielen</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">╫</span><div><p className="eyebrow">Unterkonstruktion</p><h3>{plan.supportRowCount} Auflagerlinien</h3><p>Geschätzt {format(plan.supportLinearMWithWaste)} laufende Meter inklusive Reserve bei maximal {format(input.maxSupportSpacingCm)} cm Abstand.</p><strong>{plan.fixingIntersections.toLocaleString("de-DE")} rechnerische Kreuzungspunkte</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">↔</span><div><p className="eyebrow">Zuschnitt & Fugen</p><h3>{plan.fullLengthPossible ? "Verlegung ohne Längsstoß möglich" : `Mindestens ${plan.minimumJointsPerCourse} Stoß je Reihe`}</h3><p>Die Reihenbreite liegt rechnerisch bei {format(plan.coveredWidthM, 3)} m. Am Rand sind ungefähr {plan.edgeAdjustmentMm} mm anzupassen.</p><strong>Stoßbild und symmetrische Randreihen vor Bestellung zeichnen.</strong></div></article>
      </div>
      <div className="warning-panel"><h3>Vor Bestellung und Aufbau prüfen</h3><ul>{plan.warnings.map((warning) => <li key={warning}>{warning}</li>)}<li>Untergrund, Entwässerung, Aufbauhöhe, Gefälle und konstruktiver Holzschutz gehören in die konkrete Ausführungsplanung.</li></ul></div>
      <div className="print-action"><button className="button button--secondary" type="button" onClick={() => window.print()}>Materialrahmen drucken</button></div>
    </div>}

    {error && <p className="field-error calculator-error" role="alert">{error}</p>}
    <div className="calculator-actions">{step > 1 && <button className="button button--back" type="button" onClick={() => { setError(""); setStep((current) => Math.max(1, current - 1)); }}>← Zurück</button>}{step < 4 && <button className="button button--primary" type="button" onClick={next}>{step === 3 ? "Materialrahmen berechnen" : "Weiter"} →</button>}{step === 4 && <button className="button button--back" type="button" onClick={() => setStep(1)}>Eingaben ändern</button>}</div>
  </CalculatorShell>;
}

function NumberField({ id, label, value, unit, min, max, step, onChange }: { id: string; label: string; value: number; unit: string; min: number; max: number; step?: string; onChange: (value: number) => void }) {
  const invalid = !Number.isFinite(value) || value < min || value > max;
  return <div className="field"><label htmlFor={id}>{label}</label><div className="input-with-unit"><input id={id} type="number" value={Number.isFinite(value) ? value : ""} min={min} max={max} step={step} aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.valueAsNumber)} /><span>{unit}</span></div>{invalid && <small className="field-error" id={`${id}-error`}>Bitte {min} bis {max} {unit} eingeben.</small>}</div>;
}

function DirectionChoice({ label, detail, checked, onChange }: { label: string; detail: string; checked: boolean; onChange: () => void }) {
  return <label className={`radio-card radio-card--detail ${checked ? "radio-card--selected" : ""}`}><input type="radio" name="direction" checked={checked} onChange={onChange} /><span><strong>{label}</strong><small>{detail}</small></span></label>;
}

function format(value: number, maximumFractionDigits = 1) {
  return value.toLocaleString("de-DE", { maximumFractionDigits });
}
