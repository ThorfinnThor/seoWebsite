"use client";

import { useEffect, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { usePlannerStepTransition } from "@/components/calculator/usePlannerStepTransition";
import { usePlannerSessionState } from "@/components/calculator/usePlannerSessionState";
import { PrintResultAction } from "@/components/planner/PrintResultAction";
import { buildIrrigationPlan } from "@/lib/irrigation/rules";
import { IrrigationInputSchema, type IrrigationInput } from "@/lib/irrigation/types";
import { findInvalidPlannerStep, focusFirstInvalidField, issuesToFieldErrors, type PlannerFieldErrors } from "@/lib/planner-validation";
import { ReferenceProductList } from "@/components/product/ReferenceProductList";
import { RealProductList } from "@/components/product/RealProductList";
import { REFERENCE_PRODUCTS, setReferenceQuantities } from "@/lib/reference-products";
import { REAL_PLANNER_PRODUCTS } from "@/lib/real-products";

const INITIAL: IrrigationInput = { lawnAreaM2: 100, bedAreaM2: 20, hedgeLengthM: 15, automaticControl: true, smartControl: false, rainSensorWanted: true, budgetMaxEur: 600 };
const FIELD_IDS: Partial<Record<keyof IrrigationInput, string>> = {
  lawnAreaM2: "lawn",
  bedAreaM2: "beds",
  hedgeLengthM: "hedge",
  waterFlowLMin: "flow",
  waterPressureBar: "pressure",
  budgetMaxEur: "irrigation-budget",
};
const STEP_FIELDS: Record<number, readonly (keyof IrrigationInput)[]> = {
  1: ["lawnAreaM2", "bedAreaM2", "hedgeLengthM"],
  2: ["waterFlowLMin", "waterPressureBar"],
  3: ["budgetMaxEur"],
};
const parseIrrigationInput = (value: unknown) => { const result = IrrigationInputSchema.safeParse(value); return result.success ? result.data : null; };

export function IrrigationPlanner() {
  const [step, setStep] = useState(1);
  const goToStep = usePlannerStepTransition(setStep);
  const { value: input, setValue: setInput, reset: resetInput } = usePlannerSessionState("passendplanen:irrigation:v1", INITIAL, parseIrrigationInput);
  const [fieldErrors, setFieldErrors] = useState<PlannerFieldErrors>({});
  const [error, setError] = useState("");
  const validation = IrrigationInputSchema.safeParse(input);
  const plan = validation.success ? buildIrrigationPlan(validation.data) : null;

  useEffect(() => { if (step > 1) document.getElementById("calculator-heading")?.focus(); }, [step]);
  useEffect(() => {
    if (Object.keys(fieldErrors).length === 0) return;
    const parsed = IrrigationInputSchema.safeParse(input);
    setFieldErrors(parsed.success ? {} : issuesToFieldErrors(parsed.error));
    if (parsed.success) setError("");
    // Existing cross-field errors must follow changes in any related input.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  function update<K extends keyof IrrigationInput>(key: K, value: IrrigationInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => { const next = { ...current }; delete next[String(key)]; return next; });
    setError("");
  }

  function next() {
    const parsed = IrrigationInputSchema.safeParse(input);
    if (!parsed.success) {
      const nextErrors = issuesToFieldErrors(parsed.error);
      setFieldErrors(nextErrors);
      setError("Bitte prüfe die markierten Eingaben, bevor du fortfährst.");
      const { fieldOrder, invalidStep } = findInvalidPlannerStep(nextErrors, FIELD_IDS, STEP_FIELDS, step);
      if (invalidStep && invalidStep !== step) setStep(invalidStep);
      focusFirstInvalidField(nextErrors, FIELD_IDS, fieldOrder);
      return;
    }
    setInput(parsed.data);
    setFieldErrors({});
    setError("");
    goToStep(Math.min(4, step + 1));
  }

  function reset() {
    resetInput();
    setStep(1);
    setFieldErrors({});
    setError("");
  }

  const titles = ["Welche Flächen sollen bewässert werden?", "Was liefert dein Wasseranschluss?", "Wie soll das System gesteuert werden?", "Dein erster Komponentenplan"];
  return <CalculatorShell step={step} totalSteps={4} title={titles[step - 1]} label="Bewässerungsplaner" onReset={reset}>
    {step === 1 && <div className="form-step">
      <div className="field-grid field-grid--two">
        <NumberField id="lawn" label="Rasenfläche" value={input.lawnAreaM2} unit="m²" min={0} max={10000} error={fieldErrors.lawnAreaM2} onChange={(value) => update("lawnAreaM2", value)} />
        <NumberField id="beds" label="Beetfläche" value={input.bedAreaM2} unit="m²" min={0} max={10000} error={fieldErrors.bedAreaM2} onChange={(value) => update("bedAreaM2", value)} />
        <NumberField id="hedge" label="Heckenlänge" value={input.hedgeLengthM} unit="m" min={0} max={2000} error={fieldErrors.hedgeLengthM} onChange={(value) => update("hedgeLengthM", value)} />
      </div>
      {error && <p className="field-error" role="alert">{error}</p>}
      <div className="info-box"><span aria-hidden="true">i</span><p>Flächen dürfen grob geschätzt sein. Für Rasenregner brauchen wir später zusätzlich Form, Hindernisse und gewünschte Zonen.</p></div>
    </div>}
    {step === 2 && <div className="form-step">
      <div className="field-grid field-grid--two">
        <OptionalField id="flow" label="Gemessener Durchfluss" value={input.waterFlowLMin} unit="l/min" max={1000} error={fieldErrors.waterFlowLMin} onChange={(value) => update("waterFlowLMin", value)} />
        <OptionalField id="pressure" label="Fließdruck" value={input.waterPressureBar} unit="bar" max={20} error={fieldErrors.waterPressureBar} onChange={(value) => update("waterPressureBar", value)} />
      </div>
      {error && <p className="field-error" role="alert">{error}</p>}
      <div className="measurement-card"><h3>Eimertest für den Durchfluss</h3><p>Miss, wie viele Sekunden dein Anschluss zum Füllen eines bekannten Volumens benötigt. Durchfluss in l/min = Liter × 60 ÷ Sekunden.</p><p><strong>Den Fließdruck misst du während Wasser entnommen wird</strong> – statischer Ruhedruck ist kein Ersatz.</p></div>
      <div className="info-box"><span aria-hidden="true">!</span><p>Ohne belastbare Messwerte erstellen wir nur die Materialstruktur. Rohrdimensionen und Rasen-Zonen bleiben ausdrücklich offen.</p></div>
    </div>}
    {step === 3 && <div className="form-step">
      <div className="check-card-grid check-card-grid--two">
        <Check label="Automatische Steuerung" detail="Ventile und Controller einplanen" checked={input.automaticControl} onChange={(value) => { update("automaticControl", value); if (!value) { update("smartControl", false); update("rainSensorWanted", false); } }} />
        <Check label="Smarte Steuerung" detail="App-/Netzwerkfunktion gewünscht" checked={input.smartControl} disabled={!input.automaticControl} onChange={(value) => update("smartControl", value)} />
        <Check label="Regen- oder Feuchtesensor" detail="Nur systemkompatible Sensoren" checked={input.rainSensorWanted} disabled={!input.automaticControl} onChange={(value) => update("rainSensorWanted", value)} />
      </div>
      <NumberField id="irrigation-budget" label="Maximales Systembudget" value={input.budgetMaxEur} unit="€" min={50} max={100000} error={fieldErrors.budgetMaxEur} onChange={(value) => update("budgetMaxEur", value)} />
      {error && <p className="field-error" role="alert">{error}</p>}
      <div className="live-estimate"><span>Voraussichtlicher Systemstil</span><strong>{plan ? plan.style === "combined" ? "Kombiniertes System" : plan.style === "sprinkler" ? "Rasensprenger-System" : "Tropfbewässerung" : "Eingaben prüfen"}</strong><small>{plan ? input.automaticControl ? `Steuerung mit mindestens ${plan.controllerZones} Zonen vorgesehen` : "Manuelle Steuerung gewählt" : "Der Plan wird erst aus gültigen Werten berechnet."}</small></div>
    </div>}
    {step === 4 && plan && <div className="results">
      <div className="requirement-summary"><div><span>System</span><strong>{plan.style === "combined" ? "Kombiniert" : plan.style === "sprinkler" ? "Rasen" : "Tropf"}</strong></div><div><span>Nutzungsbereiche</span><strong>{plan.activeCategories}</strong></div><div><span>Steuerungszonen</span><strong>{plan.controllerZones || "manuell"}</strong></div><div><span>Budgetrahmen</span><strong>{input.budgetMaxEur.toLocaleString("de-DE")} €</strong></div></div>
      <div className="component-plan"><div className="result-heading"><div><p className="eyebrow">Erste Materialstruktur</p><h3>Diese Kategorien solltest du einplanen.</h3></div></div>{plan.components.map((component) => <article key={`${component.kind}-${component.label}`}><span className="component-icon" aria-hidden="true">{component.kind === "dripline" ? "≈" : component.kind === "controller" ? "⌁" : "○"}</span><div><h4>{component.label}</h4><strong>{component.quantity}</strong><p>{component.note}</p></div></article>)}</div>
      <div className="warning-panel"><h3>Vor der Produktauswahl prüfen</h3><ul>{plan.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul></div>
      <ReferenceProductList items={setReferenceQuantities(REFERENCE_PRODUCTS.irrigation, { "irrigation-controller": input.automaticControl ? `${plan.controllerZones || 1} Zonen` : "manuell", "irrigation-valves": input.automaticControl ? `${plan.controllerZones || 1} Stück` : "optional", "irrigation-dripline": `${formatM(input.hedgeLengthM)} m Hecke + Beete nach Plan`, "irrigation-sprinklers": `${formatM(input.lawnAreaM2)} m² Rasenfläche`, "irrigation-filter": "1 Set", "irrigation-pipe": "nach Leitungsplan" })} />
      <RealProductList items={REAL_PLANNER_PRODUCTS.irrigation} />
      <PrintResultAction />
    </div>}
    <div className="calculator-actions">
      {step > 1 && <button type="button" className="button button--back" onClick={() => goToStep(Math.max(1, step - 1))}>← Zurück</button>}
      {step < 4 && <button type="button" className="button button--primary" onClick={next}>{step === 3 ? "Komponentenplan erstellen" : "Weiter"} <span aria-hidden="true">→</span></button>}
      {step === 4 && <button type="button" className="button button--back" onClick={() => goToStep(1)}>Eingaben ändern</button>}
    </div>
  </CalculatorShell>;
}

function NumberField({ id, label, value, unit, min, max, error, onChange }: { id: string; label: string; value: number; unit: string; min: number; max: number; error?: string; onChange: (value: number) => void }) {
  const invalid = !Number.isFinite(value) || value < min || value > max || Boolean(error);
  const message = error ?? (!Number.isFinite(value) || value < min || value > max ? `Bitte einen Wert zwischen ${min.toLocaleString("de-DE")} und ${max.toLocaleString("de-DE")} eingeben.` : undefined);
  return <div className="field"><label htmlFor={id}>{label}</label><div className="input-with-unit"><input id={id} type="number" inputMode="decimal" min={min} max={max} value={Number.isFinite(value) ? value : ""} aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.valueAsNumber)} /><span>{unit}</span></div>{message && <small className="field-error" id={`${id}-error`}>{message}</small>}</div>;
}

function OptionalField({ id, label, value, unit, max, error, onChange }: { id: string; label: string; value?: number; unit: string; max: number; error?: string; onChange: (value: number | undefined) => void }) {
  const invalid = value !== undefined && (!Number.isFinite(value) || value <= 0 || value > max) || Boolean(error);
  return <div className="field"><label htmlFor={id}>{label} <span className="optional">optional</span></label><div className="input-with-unit"><input id={id} type="number" inputMode="decimal" min="0.1" max={max} step="0.1" value={value !== undefined && Number.isFinite(value) ? value : ""} aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.value === "" ? undefined : event.target.valueAsNumber)} /><span>{unit}</span></div>{invalid && <small className="field-error" id={`${id}-error`}>Bitte einen Wert über 0 und höchstens {max.toLocaleString("de-DE")} eingeben – oder das Feld leeren.</small>}</div>;
}

function Check({ label, detail, checked, disabled = false, onChange }: { label: string; detail: string; checked: boolean; disabled?: boolean; onChange: (value: boolean) => void }) {
  return <label className={`check-card ${checked ? "check-card--selected" : ""} ${disabled ? "check-card--disabled" : ""}`}><input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} /><span className="check-box" aria-hidden="true">{checked ? "✓" : ""}</span><span><strong>{label}</strong><small>{detail}</small></span></label>;
}

function formatM(value: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 1 });
}
