"use client";

import { useEffect, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { usePlannerSessionState } from "@/components/calculator/usePlannerSessionState";
import { PrintResultAction } from "@/components/planner/PrintResultAction";
import { calculateDrywallPlan } from "@/lib/drywall/rules";
import { DrywallInputSchema, type DrywallInput } from "@/lib/drywall/types";

const INITIAL: DrywallInput = {
  wallLengthM: 5,
  wallHeightM: 2.5,
  openingsAreaM2: 2,
  openingCount: 1,
  claddingSides: 2,
  layersPerSide: 1,
  boardLengthM: 2.5,
  boardWidthM: 1.25,
  wastePercent: 10,
  studSpacingCm: 62.5,
  trackBarLengthM: 3,
  includeInsulation: true,
  moistureExposure: false,
  fireOrAcousticRequirement: false,
  installationsPlanned: false,
};

const TITLES = [
  "Welche Wandfläche möchtest du bekleiden?",
  "Welche Plattenlage soll mengenmäßig vorbereitet werden?",
  "Welche Unterkonstruktion und Anforderungen sind vorgesehen?",
  "Dein Trockenbau-Mengenrahmen",
];

const parseInput = (value: unknown) => {
  const result = DrywallInputSchema.safeParse(value);
  return result.success ? result.data : null;
};

export function DrywallPlanner() {
  const [step, setStep] = useState(1);
  const { value: input, setValue: setInput, reset: resetInput } = usePlannerSessionState("machplan:drywall:v1", INITIAL, parseInput);
  const [error, setError] = useState("");
  const parsed = DrywallInputSchema.safeParse(input);
  const plan = parsed.success ? calculateDrywallPlan(parsed.data) : null;

  useEffect(() => {
    if (step > 1) document.getElementById("calculator-heading")?.focus();
  }, [step]);

  function update<K extends keyof DrywallInput>(key: K, value: DrywallInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function next() {
    if (!parsed.success) {
      setError("Bitte prüfe Wand- und Öffnungsmaße. Die Öffnungsfläche muss kleiner als die gesamte Wandfläche sein.");
      return;
    }
    setStep((current) => Math.min(4, current + 1));
  }

  return <CalculatorShell step={step} totalSteps={4} title={TITLES[step - 1]} label="Trockenbauwand-Rechner" onReset={() => { resetInput(); setStep(1); setError(""); }}>
    {step === 1 && <div className="form-step">
      <div className="field-grid field-grid--two"><NumberField id="wall-length" label="Wandlänge" value={input.wallLengthM} unit="m" min={1} max={50} step="0.1" onChange={(value) => update("wallLengthM", value)} /><NumberField id="wall-height" label="Wandhöhe" value={input.wallHeightM} unit="m" min={1.8} max={6} step="0.05" onChange={(value) => update("wallHeightM", value)} /></div>
      <div className="field-grid field-grid--two"><NumberField id="opening-area" label="Summe der Tür- und Fensteröffnungen" value={input.openingsAreaM2} unit="m²" min={0} max={50} step="0.1" onChange={(value) => update("openingsAreaM2", value)} /><NumberField id="opening-count" label="Anzahl der Öffnungen" value={input.openingCount} unit="Stk." min={0} max={12} step="1" onChange={(value) => update("openingCount", value)} /></div>
      <div className="info-box"><span>i</span><p>Erfasse die geometrische Wandfläche. Öffnungen reduzieren die Plattenfläche, benötigen aber eigene Profile, Anschlüsse und Zuschnitte – sie sind deshalb nicht einfach „eingespartes Material“.</p></div>
      <div className="live-estimate"><span>Nettofläche einer Wandseite</span><strong>{plan ? `${format(plan.netFaceAreaM2)} m²` : "–"}</strong><small>{plan ? `${format(plan.grossWallAreaM2)} m² brutto minus ${format(input.openingsAreaM2)} m² Öffnungen` : "Maße prüfen"}</small></div>
    </div>}

    {step === 2 && <div className="form-step">
      <fieldset className="choice-group"><legend>Bekleidete Wandseiten</legend><div className="radio-grid radio-grid--two"><Choice name="sides" label="Eine Seite" detail="zum Beispiel Vorsatzebene" checked={input.claddingSides === 1} onChange={() => update("claddingSides", 1)} /><Choice name="sides" label="Zwei Seiten" detail="beidseitige Trennwand" checked={input.claddingSides === 2} onChange={() => update("claddingSides", 2)} /></div></fieldset>
      <fieldset className="choice-group"><legend>Plattenlagen je Seite</legend><div className="radio-grid radio-grid--two"><Choice name="layers" label="Einlagig" detail="eine Plattenlage" checked={input.layersPerSide === 1} onChange={() => update("layersPerSide", 1)} /><Choice name="layers" label="Zweilagig" detail="Fugen versetzt planen" checked={input.layersPerSide === 2} onChange={() => update("layersPerSide", 2)} /></div></fieldset>
      <div className="field-grid field-grid--two"><NumberField id="board-length" label="Plattenlänge" value={input.boardLengthM} unit="m" min={1.5} max={4} step="0.01" onChange={(value) => update("boardLengthM", value)} /><NumberField id="board-width" label="Plattenbreite" value={input.boardWidthM} unit="m" min={0.5} max={1.5} step="0.01" onChange={(value) => update("boardWidthM", value)} /></div>
      <fieldset className="choice-group"><legend>Zuschnitt- und Auswahlreserve</legend><div className="radio-grid radio-grid--two"><Choice name="waste" label="10 %" detail="einfache Fläche" checked={input.wastePercent === 10} onChange={() => update("wastePercent", 10)} /><Choice name="waste" label="15 %" detail="mehr Öffnungen und Zuschnitte" checked={input.wastePercent === 15} onChange={() => update("wastePercent", 15)} /></div></fieldset>
      <div className="requirement-summary requirement-summary--three"><div><span>Bekleidungsfläche</span><strong>{plan ? `${format(plan.totalCladdingAreaM2)} m²` : "–"}</strong></div><div><span>Mit Reserve</span><strong>{plan ? `${format(plan.purchaseAreaM2)} m²` : "–"}</strong></div><div><span>Volle Platten</span><strong>{plan?.boardCount ?? "–"}</strong></div></div>
    </div>}

    {step === 3 && <div className="form-step">
      <fieldset className="choice-group"><legend>Gewähltes Achsraster als Mengenbasis</legend><div className="radio-grid radio-grid--three"><Choice name="spacing" label="40 cm" detail="engere Grundteilung" checked={input.studSpacingCm === 40} onChange={() => update("studSpacingCm", 40)} /><Choice name="spacing" label="50 cm" detail="mittlere Grundteilung" checked={input.studSpacingCm === 50} onChange={() => update("studSpacingCm", 50)} /><Choice name="spacing" label="62,5 cm" detail="passend zum Beispielmaß" checked={input.studSpacingCm === 62.5} onChange={() => update("studSpacingCm", 62.5)} /></div></fieldset>
      <NumberField id="track-bar-length" label="Lieferlänge der Boden- und Deckenprofile" value={input.trackBarLengthM} unit="m" min={2} max={6} step="0.1" onChange={(value) => update("trackBarLengthM", value)} />
      <div className="check-card-grid check-card-grid--two"><Check label="Dämmung im Hohlraum" detail="nur Fläche, keine Materialeignung" checked={input.includeInsulation} onChange={(value) => update("includeInsulation", value)} /><Check label="Feuchtebeanspruchter Bereich" detail="Platten und Abdichtung prüfen" checked={input.moistureExposure} onChange={(value) => update("moistureExposure", value)} /><Check label="Brand- oder Schallschutzanforderung" detail="vollständiges geprüftes System nötig" checked={input.fireOrAcousticRequirement} onChange={(value) => update("fireOrAcousticRequirement", value)} /><Check label="Installationen in der Wand" detail="Elektro, Sanitär oder Verstärkungen" checked={input.installationsPlanned} onChange={(value) => update("installationsPlanned", value)} /></div>
      <div className="live-estimate"><span>Grundraster der Unterkonstruktion</span><strong>{plan ? `${plan.baselineStudCount} Ständer · ${plan.trackBarCount} Schienenstäbe` : "–"}</strong><small>Nur durchgehende Grundwand; Öffnungen, Anschlüsse und Verstärkungen kommen hinzu.</small></div>
    </div>}

    {step === 4 && plan && <div className="results drywall-results" aria-live="polite">
      <div className="requirement-summary"><div><span>Netto je Wandseite</span><strong>{format(plan.netFaceAreaM2)} m²</strong></div><div><span>Bekleidung gesamt</span><strong>{format(plan.totalCladdingAreaM2)} m²</strong></div><div><span>Volle Platten</span><strong>{plan.boardCount}</strong></div><div><span>Grundständer</span><strong>{plan.baselineStudCount}</strong></div></div>
      <div className="detail-result-grid">
        <article><span className="component-icon" aria-hidden="true">▥</span><div><p className="eyebrow">Platten</p><h3>{plan.boardCount} Platten à {format(input.boardLengthM)} × {format(input.boardWidthM)} m</h3><p>{format(plan.purchaseAreaM2)} m² einschließlich {input.wastePercent} % Reserve; volle Platten ergeben {format(plan.orderedBoardAreaM2)} m².</p><strong>Plattenlage, Fugenversatz und zulässige Ausrichtung zeichnerisch prüfen.</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">╫</span><div><p className="eyebrow">Profile</p><h3>{plan.baselineStudCount} Ständer im ungestörten Grundraster</h3><p>{plan.trackBarCount} Boden-/Deckenprofilstäbe à {format(input.trackBarLengthM)} m für {format(plan.trackLengthWithReserveM)} m mit 10 % Längenreserve.</p><strong>{input.openingCount} Öffnung{input.openingCount === 1 ? "" : "en"}: Zusatzprofile und Stürze noch ergänzen.</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">≋</span><div><p className="eyebrow">Hohlraum & Ergänzungen</p><h3>{input.includeInsulation ? `${format(plan.insulationAreaM2)} m² Dämmfläche` : "Keine Dämmung eingerechnet"}</h3><p>Schrauben, Dübel, Dichtungs- und Fugenmaterial sowie Anschluss- und Kantenteile bleiben bewusst außerhalb der Pauschalmenge.</p><strong>Nur ein vollständiger freigegebener Aufbau erfüllt Brand-, Schall- oder Feuchteanforderungen.</strong></div></article>
      </div>
      <div className="warning-panel"><h3>Vor Bestellung und Ausführung prüfen</h3><ul>{plan.warnings.map((warning) => <li key={warning}>{warning}</li>)}<li>Bestandsbauteile, Boden und Decke, Leitungsverlauf, Türzargen, Lasten, Bewegungsfugen und spätere Befestigungen in einem konkreten Wandplan koordinieren.</li></ul></div>
      <PrintResultAction />
    </div>}

    {error && <p className="field-error calculator-error" role="alert">{error}</p>}
    <div className="calculator-actions">{step > 1 && <button className="button button--back" type="button" onClick={() => { setError(""); setStep((current) => Math.max(1, current - 1)); }}>← Zurück</button>}{step < 4 && <button className="button button--primary" type="button" onClick={next}>{step === 3 ? "Mengenrahmen berechnen" : "Weiter"} →</button>}{step === 4 && <button className="button button--back" type="button" onClick={() => setStep(1)}>Eingaben ändern</button>}</div>
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
