"use client";

import { useEffect, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { usePlannerSessionState } from "@/components/calculator/usePlannerSessionState";
import { calculatePrivacyScreenPlan } from "@/lib/privacy-screen/rules";
import { PrivacyScreenInputSchema, type PrivacyScreenInput } from "@/lib/privacy-screen/types";

const INITIAL: PrivacyScreenInput = {
  totalLengthM: 10,
  fenceHeightCm: 180,
  systemFieldWidthCm: 180,
  gateCount: 0,
  gateModuleWidthCm: 100,
  reservePanel: false,
  mountingType: "ground",
  terrain: "level",
  windExposure: "normal",
};

const TITLES = [
  "Wie lang und hoch soll der Sichtschutz werden?",
  "Welches Systemraster und welche Tore planst du?",
  "Wie sieht die Einbausituation aus?",
  "Dein Mengen- und Rasterplan",
];

const parseInput = (value: unknown) => {
  const result = PrivacyScreenInputSchema.safeParse(value);
  return result.success ? result.data : null;
};

export function PrivacyScreenPlanner() {
  const [step, setStep] = useState(1);
  const { value: input, setValue: setInput, reset: resetInput } = usePlannerSessionState("machplan:privacy-screen:v1", INITIAL, parseInput);
  const [error, setError] = useState("");
  const parsed = PrivacyScreenInputSchema.safeParse(input);
  const plan = parsed.success ? calculatePrivacyScreenPlan(parsed.data) : null;

  useEffect(() => {
    if (step > 1) document.getElementById("calculator-heading")?.focus();
  }, [step]);

  function update<K extends keyof PrivacyScreenInput>(key: K, value: PrivacyScreenInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function next() {
    if (!parsed.success) {
      setError("Bitte prüfe die Eingaben. Die Tor-Module müssen zusammen kürzer als die gesamte Strecke bleiben.");
      return;
    }
    setStep((current) => Math.min(4, current + 1));
  }

  return <CalculatorShell step={step} totalSteps={4} title={TITLES[step - 1]} label="Sichtschutz- und Zaunfeld-Planer" onReset={() => { resetInput(); setStep(1); setError(""); }}>
    {step === 1 && <div className="form-step">
      <div className="field-grid field-grid--two">
        <NumberField id="screen-length" label="Länge der geraden Strecke" value={input.totalLengthM} unit="m" min={1} max={100} step="0.1" onChange={(value) => update("totalLengthM", value)} />
        <NumberField id="screen-height" label="Gewünschte Sichtschutzhöhe" value={input.fenceHeightCm} unit="cm" min={60} max={250} onChange={(value) => update("fenceHeightCm", value)} />
      </div>
      <div className="info-box"><span>i</span><p>Der Planer rechnet eine einzelne gerade Strecke. Ecken, Versprünge und getrennte Abschnitte bitte jeweils separat berechnen.</p></div>
      <div className="live-estimate"><span>Zu planende Strecke</span><strong>{format(input.totalLengthM)} m</strong><small>bei {format(input.fenceHeightCm)} cm gewünschter Höhe</small></div>
    </div>}

    {step === 2 && <div className="form-step">
      <NumberField id="field-width" label="Montage- oder Achsmaß eines Standardfelds" value={input.systemFieldWidthCm} unit="cm" min={50} max={300} step="0.1" onChange={(value) => update("systemFieldWidthCm", value)} />
      <div className="info-box"><span>!</span><p>Übernimm das Systemmaß aus der Montageanleitung: von Pfostenachse zu Pfostenachse oder das ausdrücklich genannte Einbaumaß. Die reine Elementbreite reicht häufig nicht.</p></div>
      <div className="field-grid field-grid--two">
        <NumberField id="gate-count" label="Anzahl der Tor-Module" value={input.gateCount} unit="Stk." min={0} max={3} step="1" onChange={(value) => update("gateCount", value)} />
        <NumberField id="gate-width" label="Systemmaß je Tor-Modul" value={input.gateModuleWidthCm} unit="cm" min={70} max={250} step="0.1" onChange={(value) => update("gateModuleWidthCm", value)} />
      </div>
      <div className="requirement-summary requirement-summary--three"><div><span>Standardfelder</span><strong>{plan?.panelCount ?? "–"}</strong></div><div><span>Tor-Module</span><strong>{input.gateCount}</strong></div><div><span>Pfosten rechnerisch</span><strong>{plan?.postCount ?? "–"}</strong></div></div>
    </div>}

    {step === 3 && <div className="form-step">
      <fieldset className="choice-group"><legend>Geplanter Montagekontext</legend><div className="radio-grid radio-grid--three">
        <Choice name="mounting" label="Im Erdreich" detail="Pfosten einbetonieren" checked={input.mountingType === "ground"} onChange={() => update("mountingType", "ground")} />
        <Choice name="mounting" label="Auf Fußplatte" detail="auf tragfähigem Untergrund" checked={input.mountingType === "baseplate"} onChange={() => update("mountingType", "baseplate")} />
        <Choice name="mounting" label="Vorhandener Bestand" detail="Mauer oder Fundamente" checked={input.mountingType === "existing"} onChange={() => update("mountingType", "existing")} />
      </div></fieldset>
      <div className="field-grid field-grid--two">
        <fieldset className="choice-group"><legend>Geländeverlauf</legend><div className="radio-grid radio-grid--two"><Choice name="terrain" label="Eben" detail="durchgehende Bezugshöhe" checked={input.terrain === "level"} onChange={() => update("terrain", "level")} /><Choice name="terrain" label="Mit Gefälle" detail="Stufung separat planen" checked={input.terrain === "sloped"} onChange={() => update("terrain", "sloped")} /></div></fieldset>
        <fieldset className="choice-group"><legend>Windlage grob</legend><div className="radio-grid radio-grid--three"><Choice name="wind" label="Geschützt" detail="dichte Umgebung" checked={input.windExposure === "sheltered"} onChange={() => update("windExposure", "sheltered")} /><Choice name="wind" label="Normal" detail="übliche Wohnlage" checked={input.windExposure === "normal"} onChange={() => update("windExposure", "normal")} /><Choice name="wind" label="Exponiert" detail="freie Windangriffsfläche" checked={input.windExposure === "exposed"} onChange={() => update("windExposure", "exposed")} /></div></fieldset>
      </div>
      <label className={`check-card ${input.reservePanel ? "check-card--selected" : ""}`}><input type="checkbox" checked={input.reservePanel} onChange={(event) => update("reservePanel", event.target.checked)} /><span className="check-box" aria-hidden="true">{input.reservePanel ? "✓" : ""}</span><span><strong>Ein zusätzliches Standardfeld als Reserve einplanen</strong><small>Sinnvoll bei empfindlichen Oberflächen, komplexem Zuschnitt oder schwer nachkaufbaren Serien.</small></span></label>
      <div className="live-estimate"><span>Rechnerische Verankerungspunkte</span><strong>{plan?.anchoringPointCount ?? "–"}</strong><small>Ein Pfosten je Anfang, Übergang und Ende der geraden Strecke; konkrete Torpfosten können systembedingt abweichen.</small></div>
    </div>}

    {step === 4 && plan && <div className="results privacy-screen-results" aria-live="polite">
      <div className="requirement-summary"><div><span>Standardfelder im Verlauf</span><strong>{plan.panelCount}</strong></div><div><span>Bestellmenge Felder</span><strong>{plan.orderPanelCount}</strong></div><div><span>Tor-Module</span><strong>{input.gateCount}</strong></div><div><span>Pfosten rechnerisch</span><strong>{plan.postCount}</strong></div></div>
      <div className="detail-result-grid">
        <article><span className="component-icon" aria-hidden="true">▥</span><div><p className="eyebrow">Felder</p><h3>{plan.panelCount} Standardfelder für den Verlauf</h3><p>Mit {format(input.systemFieldWidthCm)} cm Systemraster decken sie zusammen mit den Toren rechnerisch {format(plan.fullSystemLengthCm / 100)} m bei {format(input.fenceHeightCm)} cm gewünschter Höhe ab.</p><strong>Bestellrahmen: {plan.orderPanelCount} Felder{input.reservePanel ? " inklusive Reserve" : " ohne Reserve"}</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">┃</span><div><p className="eyebrow">Pfosten</p><h3>{plan.postCount} Pfosten beziehungsweise Verankerungspunkte</h3><p>Gezählt für {plan.bayCount} aufeinanderfolgende Module einer geraden Strecke. Eck-, End- und Torpfosten können unterschiedliche Artikel sein.</p><strong>Pfostentypen anhand des konkreten Systems aufteilen.</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">↔</span><div><p className="eyebrow">Rasterabschluss</p><h3>{plan.adjustmentRequired ? `${format(plan.endAdjustmentCm)} cm Anpassung` : "Das Raster geht rechnerisch auf"}</h3><p>{plan.adjustmentRequired ? `Das letzte Feld müsste ungefähr ${format(plan.lastFieldWidthCm)} cm Systembreite erhalten.` : "Standardfelder und Tor-Module entsprechen zusammen der eingegebenen Streckenlänge."}</p><strong>{plan.adjustmentRequired ? "Nur kürzen, wenn das gewählte System es ausdrücklich erlaubt." : "Aufmaß und Montagetoleranzen trotzdem vor Bestellung prüfen."}</strong></div></article>
      </div>
      <div className="warning-panel"><h3>Vor Bestellung und Montage prüfen</h3><ul>{plan.warnings.map((warning) => <li key={warning}>{warning}</li>)}<li>Leitungen im Boden, Grundstücksgrenze, örtliche Vorgaben und Nachbarrecht gehören in die Standortprüfung.</li></ul></div>
      <div className="print-action"><button className="button button--secondary" type="button" onClick={() => window.print()}>Mengenplan drucken</button></div>
    </div>}

    {error && <p className="field-error calculator-error" role="alert">{error}</p>}
    <div className="calculator-actions">{step > 1 && <button className="button button--back" type="button" onClick={() => { setError(""); setStep((current) => Math.max(1, current - 1)); }}>← Zurück</button>}{step < 4 && <button className="button button--primary" type="button" onClick={next}>{step === 3 ? "Mengenplan berechnen" : "Weiter"} →</button>}{step === 4 && <button className="button button--back" type="button" onClick={() => setStep(1)}>Eingaben ändern</button>}</div>
  </CalculatorShell>;
}

function NumberField({ id, label, value, unit, min, max, step, onChange }: { id: string; label: string; value: number; unit: string; min: number; max: number; step?: string; onChange: (value: number) => void }) {
  const invalid = !Number.isFinite(value) || value < min || value > max;
  return <div className="field"><label htmlFor={id}>{label}</label><div className="input-with-unit"><input id={id} type="number" value={Number.isFinite(value) ? value : ""} min={min} max={max} step={step} aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.valueAsNumber)} /><span>{unit}</span></div>{invalid && <small className="field-error" id={`${id}-error`}>Bitte {min} bis {max} {unit} eingeben.</small>}</div>;
}

function Choice({ name, label, detail, checked, onChange }: { name: string; label: string; detail: string; checked: boolean; onChange: () => void }) {
  return <label className={`radio-card radio-card--detail ${checked ? "radio-card--selected" : ""}`}><input type="radio" name={name} checked={checked} onChange={onChange} /><span><strong>{label}</strong><small>{detail}</small></span></label>;
}

function format(value: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 1 });
}
