"use client";

import { useEffect, useRef, useState } from "react";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { usePlannerStepTransition } from "@/components/calculator/usePlannerStepTransition";
import { usePlannerSessionState } from "@/components/calculator/usePlannerSessionState";
import { ResultSummary } from "@/components/calculator/ResultSummary";
import { PrintResultAction } from "@/components/planner/PrintResultAction";
import { ProductCard } from "@/components/product/ProductCard";
import { loadGardenHouseCatalog } from "@/lib/catalog/load-client-catalog";
import { calculateRequirements } from "@/lib/garden-house/rules";
import { explainNoMatches, recommendGardenHouses } from "@/lib/garden-house/recommend";
import { GardenHouseInputSchema, type GardenHouseCatalog, type GardenHouseInput } from "@/lib/garden-house/types";
import { findInvalidPlannerStep, focusFirstInvalidField, issuesToFieldErrors, type PlannerFieldErrors } from "@/lib/planner-validation";
import { useProductResultTracking } from "@/lib/analytics";

const INITIAL_INPUT: GardenHouseInput = {
  availableWidthCm: 400,
  availableDepthCm: 350,
  allowRotation: true,
  budgetMaxEur: 3500,
  bikes: 2,
  toolStorage: "medium",
  lawnMower: true,
  workbench: false,
  shelving: true,
  floorPreference: "preferred",
  materialPreference: "any",
  roofPreference: "any",
};

const MATERIALS = [["any", "Egal"], ["wood", "Holz"], ["metal", "Metall"], ["plastic", "Kunststoff"]] as const;
const ROOFS = [["any", "Egal"], ["flat", "Flachdach"], ["pent", "Pultdach"], ["gable", "Satteldach"]] as const;
const FLOORS = [["irrelevant", "Nicht wichtig", "Ich plane den Boden separat."], ["preferred", "Bevorzugt", "Boden oder Bodenset wäre hilfreich."], ["required", "Erforderlich", "Nur mit Boden oder passendem Set."]] as const;
const parseGardenHouseInput = (value: unknown) => { const result = GardenHouseInputSchema.safeParse(value); return result.success ? result.data : null; };
const FIELD_IDS: Partial<Record<string, string>> = { availableWidthCm: "width", availableDepthCm: "depth", bikes: "bikes", toolStorage: "tools", budgetMaxEur: "budget" };
const STEP_FIELDS: Record<number, readonly string[]> = { 1: ["availableWidthCm", "availableDepthCm"], 2: ["bikes", "toolStorage"], 3: [], 4: ["budgetMaxEur"] };

export function GardenHousePlanner() {
  const [step, setStep] = useState(1);
  const goToStep = usePlannerStepTransition(setStep);
  const { value: input, setValue: setInput, reset: resetInput } = usePlannerSessionState("passendplanen:garden-house:v1", INITIAL_INPUT, parseGardenHouseInput);
  const [catalog, setCatalog] = useState<GardenHouseCatalog | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<PlannerFieldErrors>({});
  const [formError, setFormError] = useState("");
  const requestPending = useRef(false);
  const validation = GardenHouseInputSchema.safeParse(input);
  const validatedInput = validation.success ? validation.data : null;
  const requirements = validatedInput ? calculateRequirements(validatedInput) : null;
  const results = catalog && validatedInput ? recommendGardenHouses(catalog, validatedInput) : [];
  const explanations = catalog && validatedInput ? explainNoMatches(catalog, validatedInput) : [];
  useProductResultTracking({ planner: "garden-house", ready: step === 5 && status === "ready", matchCount: results.length });

  useEffect(() => {
    if (step > 1) document.getElementById("calculator-heading")?.focus();
  }, [step]);

  function update<K extends keyof GardenHouseInput>(key: K, value: GardenHouseInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => { const nextErrors = { ...current }; delete nextErrors[String(key)]; return nextErrors; });
    setFormError("");
  }

  function reportValidationError(error: Parameters<typeof issuesToFieldErrors>[0]) {
    const nextErrors = issuesToFieldErrors(error);
    setFieldErrors(nextErrors);
    setFormError("Bitte prüfe die markierten Eingaben, bevor du fortfährst.");
    const { fieldOrder, invalidStep } = findInvalidPlannerStep(nextErrors, FIELD_IDS, STEP_FIELDS, step);
    if (invalidStep && invalidStep !== step) setStep(invalidStep);
    focusFirstInvalidField(nextErrors, FIELD_IDS, fieldOrder);
  }

  function next() {
    const parsed = GardenHouseInputSchema.safeParse(input);
    if (!parsed.success) { reportValidationError(parsed.error); return; }
    setInput(parsed.data);
    setFieldErrors({});
    setFormError("");
    goToStep(Math.min(5, step + 1));
  }

  async function showResults() {
    const parsed = GardenHouseInputSchema.safeParse(input);
    if (!parsed.success) { reportValidationError(parsed.error); return; }
    if (requestPending.current) return;
    setInput(parsed.data);
    setFieldErrors({});
    setFormError("");
    setStep(5);
    if (catalog) { setStatus("ready"); return; }
    requestPending.current = true;
    setStatus("loading");
    try {
      setCatalog(await loadGardenHouseCatalog());
      setStatus("ready");
    } catch {
      setStatus("error");
    } finally {
      requestPending.current = false;
    }
  }

  function reset() {
    resetInput();
    setStep(1);
    setCatalog(null);
    setStatus("idle");
    setFieldErrors({});
    setFormError("");
    requestPending.current = false;
  }

  const titles = ["Wie viel Platz steht zur Verfügung?", "Was soll ins Gartenhaus?", "Welche Ausführung passt zu dir?", "Prüfe deinen Planungsrahmen", "Dein Ergebnis"];
  return (
      <CalculatorShell planner="garden-house" step={step} totalSteps={5} title={titles[step - 1]} label="Gartenhaus-Planer" intro={step === 1 ? <p>Gib nur die Fläche an, die du baulich und rechtlich tatsächlich nutzen kannst.</p> : undefined} onReset={reset}>
        {step === 1 && <div className="form-step">
          <div className="field-grid field-grid--two">
            <NumberField id="width" label="Verfügbare Breite" value={input.availableWidthCm} min={150} max={2000} unit="cm" error={fieldErrors.availableWidthCm} onChange={(value) => update("availableWidthCm", value)} />
            <NumberField id="depth" label="Verfügbare Tiefe" value={input.availableDepthCm} min={150} max={2000} unit="cm" error={fieldErrors.availableDepthCm} onChange={(value) => update("availableDepthCm", value)} />
          </div>
          {formError && <p className="field-error" role="alert">{formError}</p>}
          <label className="toggle-row"><input type="checkbox" checked={input.allowRotation} onChange={(event) => update("allowRotation", event.target.checked)} /><span className="toggle" aria-hidden="true" /><span><strong>Gartenhaus darf gedreht werden</strong><small>Wir prüfen die Maße zusätzlich um 90° gedreht.</small></span></label>
          <InfoBox>Plane Dachüberstände, Montageabstand und vorgeschriebene Grenzabstände zusätzlich ein. Die eingegebenen Maße sind die nutzbare Stellfläche.</InfoBox>
        </div>}
        {step === 2 && <div className="form-step">
          <div className="field-grid field-grid--two">
            <NumberField id="bikes" label="Anzahl Fahrräder" value={input.bikes} min={0} max={12} unit="Stück" integer error={fieldErrors.bikes} onChange={(value) => update("bikes", value)} />
            <div className="field"><label htmlFor="tools">Werkzeug & Gartengeräte</label><select id="tools" value={input.toolStorage} onChange={(event) => update("toolStorage", event.target.value as GardenHouseInput["toolStorage"])}><option value="none">Keine</option><option value="small">Wenig – Handgeräte</option><option value="medium">Mittel – mehrere Großgeräte</option><option value="large">Viel – umfangreiche Lagerung</option></select></div>
          </div>
          <fieldset className="choice-group"><legend>Was brauchst du außerdem?</legend><div className="check-card-grid"><CheckCard label="Rasenmäher" detail="Zusätzliche Stell- und Rangierfläche" checked={input.lawnMower} onChange={(value) => update("lawnMower", value)} /><CheckCard label="Werkbank" detail="Fester Arbeitsplatz mit Bewegungsraum" checked={input.workbench} onChange={(value) => update("workbench", value)} /><CheckCard label="Regale" detail="Wandfläche und Zugang einplanen" checked={input.shelving} onChange={(value) => update("shelving", value)} /></div></fieldset>
          {formError && <p className="field-error" role="alert">{formError}</p>}
          <div className="live-estimate"><span>Aktuelle Flächenempfehlung</span><strong>{requirements ? `${requirements.recommendedAreaM2.toLocaleString("de-DE")} m²` : "Eingaben prüfen"}</strong><small>{requirements ? "inklusive 15 % Bewegungsreserve, auf 0,5 m² aufgerundet" : "Die Empfehlung wird nur aus gültigen Werten berechnet."}</small></div>
        </div>}
        {step === 3 && <div className="form-step">
          <fieldset className="choice-group"><legend>Material</legend><div className="radio-grid radio-grid--four">{MATERIALS.map(([value, label]) => <label className={`radio-card ${input.materialPreference === value ? "radio-card--selected" : ""}`} key={value}><input type="radio" name="material" value={value} checked={input.materialPreference === value} onChange={() => update("materialPreference", value)} /><span>{label}</span></label>)}</div></fieldset>
          <fieldset className="choice-group"><legend>Dachform</legend><div className="radio-grid radio-grid--four">{ROOFS.map(([value, label]) => <label className={`radio-card ${input.roofPreference === value ? "radio-card--selected" : ""}`} key={value}><input type="radio" name="roof" value={value} checked={input.roofPreference === value} onChange={() => update("roofPreference", value)} /><span>{label}</span></label>)}</div></fieldset>
          <fieldset className="choice-group"><legend>Boden</legend><div className="radio-grid radio-grid--three">{FLOORS.map(([value, label, detail]) => <label className={`radio-card radio-card--detail ${input.floorPreference === value ? "radio-card--selected" : ""}`} key={value}><input type="radio" name="floor" value={value} checked={input.floorPreference === value} onChange={() => update("floorPreference", value)} /><span><strong>{label}</strong><small>{detail}</small></span></label>)}</div></fieldset>
        </div>}
        {step === 4 && <div className="form-step">
          <NumberField id="budget" label="Maximales Gesamtbudget" value={input.budgetMaxEur} min={100} max={100000} unit="€" error={fieldErrors.budgetMaxEur} onChange={(value) => update("budgetMaxEur", value)} wide />
          {formError && <p className="field-error" role="alert">{formError}</p>}
          {validatedInput && requirements && <ResultSummary input={validatedInput} requirements={requirements} />}
          {requirements && !requirements.hasSufficientArea && <div className="warning-panel" role="alert"><h3>Die verfügbare Stellfläche reicht noch nicht aus.</h3><p>Für deine Nutzung werden mindestens {requirements.recommendedAreaM2.toLocaleString("de-DE")} m² empfohlen; verfügbar sind {requirements.availableAreaM2.toLocaleString("de-DE", { maximumFractionDigits: 2 })} m². Reduziere die Nutzung oder prüfe eine größere Stellfläche, bevor du Produkte vergleichst.</p></div>}
          <InfoBox>Bei Angeboten mit unbekannten Versandkosten kann PassendPlanen die Budgeteinhaltung nicht sicher bestätigen. Sie werden klar als „zzgl. Versand“ gekennzeichnet.</InfoBox>
        </div>}
        {step === 5 && <div className="results" aria-live="polite">
          {validatedInput && requirements && <ResultSummary input={validatedInput} requirements={requirements} />}
          {requirements && !requirements.hasSufficientArea && <div className="result-state result-state--error" role="alert"><span className="result-symbol" aria-hidden="true">!</span><h3>Die verfügbare Stellfläche ist zu klein.</h3><p>Dein Bedarf liegt bei mindestens {requirements.recommendedAreaM2.toLocaleString("de-DE")} m², verfügbar sind aber nur {requirements.availableAreaM2.toLocaleString("de-DE", { maximumFractionDigits: 2 })} m². Dieser Planungsrahmen ist noch nicht bereit für einen Produktvergleich.</p><button className="button button--secondary" type="button" onClick={() => setStep(1)}>Stellfläche ändern</button></div>}
          {status === "loading" && <div className="result-state"><span className="loader" aria-hidden="true" /><h3>Geprüfte Produktdaten werden geladen …</h3><p>Wir laden nur den Gartenhaus-Katalog, nicht Daten anderer Planer.</p></div>}
          {status === "error" && <div className="result-state result-state--error"><h3>Produktdaten konnten gerade nicht geladen werden.</h3><p>Deine Eingaben bleiben erhalten. Bitte versuche es später erneut.</p><button className="button button--secondary" onClick={showResults}>Erneut versuchen</button></div>}
          {status === "ready" && requirements?.hasSufficientArea && catalog?.products.length === 0 && <div className="result-state"><span className="result-symbol" aria-hidden="true">◇</span><h3>Der geprüfte Produktkatalog wird gerade aufgebaut.</h3><p>Dein Planungsrahmen ist fertig. Produkte erscheinen hier erst, nachdem ihre Maße und Eigenschaften anhand realer Händlerdaten manuell geprüft wurden.</p><p className="state-note">Wir zeigen bewusst keine erfundenen oder ungeprüften Empfehlungen.</p></div>}
          {requirements?.hasSufficientArea && status === "ready" && catalog && catalog.products.length > 0 && results.length === 0 && <div className="result-state"><span className="result-symbol" aria-hidden="true">0</span><h3>Kein geprüftes Modell erfüllt alle Kriterien.</h3><p>Wir lockern keine Anforderungen im Hintergrund. Diese Änderungen könnten helfen:</p><ul className="suggestion-list">{explanations.map((item) => <li key={item.code}><strong>{item.label}</strong><span>{item.suggestion}</span></li>)}</ul><button className="button button--secondary" onClick={() => setStep(3)}>Präferenzen bearbeiten</button></div>}
          {requirements?.hasSufficientArea && results.length > 0 && <><div className="result-heading"><div><p className="eyebrow">Bis zu drei geprüfte Treffer</p><h3>Diese Modelle erfüllen deine harten Kriterien.</h3></div><span>{results.length} {results.length === 1 ? "Treffer" : "Treffer"}</span></div><AffiliateDisclosure /><div className="product-list">{results.map((match, index) => <ProductCard key={match.product.id} match={match} position={index + 1} />)}</div></>}
          <PrintResultAction />
        </div>}
        <div className="calculator-actions">
          {step > 1 && <button type="button" className="button button--back" onClick={() => goToStep(Math.max(1, step - 1))}>← Zurück</button>}
          {step < 4 && <button type="button" className="button button--primary" onClick={next}>Weiter <span aria-hidden="true">→</span></button>}
          {step === 4 && <button type="button" className="button button--primary" disabled={status === "loading"} onClick={showResults}>Passende Produkte finden <span aria-hidden="true">→</span></button>}
          {step === 5 && <button type="button" className="button button--back" onClick={() => goToStep(1)}>Planung ändern</button>}
        </div>
      </CalculatorShell>
  );
}

function NumberField({ id, label, value, min, max, unit, error, integer = false, onChange, wide = false }: { id: string; label: string; value: number; min: number; max: number; unit: string; error?: string; integer?: boolean; onChange: (value: number) => void; wide?: boolean }) {
  const invalid = value < min || value > max || !Number.isFinite(value) || integer && !Number.isInteger(value) || Boolean(error);
  return <div className={`field ${wide ? "field--wide" : ""}`}><label htmlFor={id}>{label}</label><div className="input-with-unit"><input id={id} type="number" inputMode={integer ? "numeric" : "decimal"} min={min} max={max} step={integer ? 1 : undefined} value={Number.isFinite(value) ? value : ""} aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.valueAsNumber)} /><span>{unit}</span></div>{invalid && <small className="field-error" id={`${id}-error`}>{integer ? `Bitte eine ganze Zahl zwischen ${min.toLocaleString("de-DE")} und ${max.toLocaleString("de-DE")} eingeben.` : `Bitte einen Wert zwischen ${min.toLocaleString("de-DE")} und ${max.toLocaleString("de-DE")} eingeben.`}</small>}</div>;
}

function CheckCard({ label, detail, checked, onChange }: { label: string; detail: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className={`check-card ${checked ? "check-card--selected" : ""}`}><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span className="check-box" aria-hidden="true">{checked ? "✓" : ""}</span><span><strong>{label}</strong><small>{detail}</small></span></label>;
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return <div className="info-box"><span aria-hidden="true">i</span><p>{children}</p></div>;
}
