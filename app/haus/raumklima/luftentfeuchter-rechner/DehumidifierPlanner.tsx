"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { usePlannerStepTransition } from "@/components/calculator/usePlannerStepTransition";
import { usePlannerSessionState } from "@/components/calculator/usePlannerSessionState";
import { PrintResultAction } from "@/components/planner/PrintResultAction";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductReasons } from "@/components/product/ProductReasons";
import { loadDehumidifierCatalog } from "@/lib/catalog/load-client-catalog";
import { resolveOfferUrl } from "@/lib/catalog/offer-url";
import { recommendDehumidifiers } from "@/lib/dehumidifier/recommend";
import { calculateDehumidifierRequirements } from "@/lib/dehumidifier/rules";
import { DehumidifierInputSchema, type DehumidifierCatalog, type DehumidifierInput } from "@/lib/dehumidifier/types";
import { findInvalidPlannerStep, focusFirstInvalidField, issuesToFieldErrors, type PlannerFieldErrors } from "@/lib/planner-validation";
import { useProductResultTracking } from "@/lib/analytics";

const INITIAL: DehumidifierInput = { roomType: "basement", areaM2: 25, ceilingHeightM: 2.3, approximateTemperatureC: 14, humiditySeverity: "moderate", laundryDrying: false, continuousDrainPossible: true, noisePriority: "medium", budgetMaxEur: 300 };
const ROOMS = [["basement", "Keller"], ["living", "Wohnraum"], ["bedroom", "Schlafzimmer"], ["bathroom", "Bad"], ["laundry", "Waschraum"], ["garage", "Garage"], ["other", "Anderer Raum"]] as const;
const FIELD_IDS: Partial<Record<string, string>> = { roomType: "room", areaM2: "area", ceilingHeightM: "height", approximateTemperatureC: "temperature", budgetMaxEur: "dehumidifier-budget" };
const STEP_FIELDS: Record<number, readonly string[]> = { 1: ["areaM2", "ceilingHeightM", "approximateTemperatureC"], 2: ["humiditySeverity"], 3: ["budgetMaxEur"] };
const parseDehumidifierInput = (value: unknown) => { const result = DehumidifierInputSchema.safeParse(value); return result.success ? result.data : null; };

export function DehumidifierPlanner() {
  const [step, setStep] = useState(1);
  const goToStep = usePlannerStepTransition(setStep);
  const { value: input, setValue: setInput, reset: resetInput } = usePlannerSessionState("passendplanen:dehumidifier:v1", INITIAL, parseDehumidifierInput);
  const [catalog, setCatalog] = useState<DehumidifierCatalog | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<PlannerFieldErrors>({});
  const [formError, setFormError] = useState("");
  const requestPending = useRef(false);
  const validation = DehumidifierInputSchema.safeParse(input);
  const validatedInput = validation.success ? validation.data : null;
  const requirements = validatedInput ? calculateDehumidifierRequirements(validatedInput) : null;
  const matches = catalog && validatedInput ? recommendDehumidifiers(catalog, validatedInput) : [];
  useProductResultTracking({ planner: "dehumidifier", ready: step === 4 && status === "ready", matchCount: matches.length });

  useEffect(() => { if (step > 1) document.getElementById("calculator-heading")?.focus(); }, [step]);

  function update<K extends keyof DehumidifierInput>(key: K, value: DehumidifierInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => { const nextErrors = { ...current }; delete nextErrors[String(key)]; return nextErrors; });
    setFormError("");
  }

  function parseCurrentInput() {
    const parsed = DehumidifierInputSchema.safeParse(input);
    if (parsed.success) {
      setInput(parsed.data);
      setFieldErrors({});
      setFormError("");
      return parsed.data;
    }
    const nextErrors = issuesToFieldErrors(parsed.error);
    setFieldErrors(nextErrors);
    setFormError("Bitte prüfe die markierten Eingaben, bevor du fortfährst.");
    const { fieldOrder, invalidStep } = findInvalidPlannerStep(nextErrors, FIELD_IDS, STEP_FIELDS, step);
    if (invalidStep && invalidStep !== step) setStep(invalidStep);
    focusFirstInvalidField(nextErrors, FIELD_IDS, fieldOrder);
    return null;
  }

  function next() {
    if (!parseCurrentInput()) return;
    goToStep(Math.min(3, step + 1));
  }

  async function showResults() {
    if (!parseCurrentInput() || requestPending.current) return;
    setStep(4);
    if (catalog) { setStatus("ready"); return; }
    requestPending.current = true;
    setStatus("loading");
    try {
      setCatalog(await loadDehumidifierCatalog());
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

  const titles = ["Welcher Raum soll entfeuchtet werden?", "Wie hoch ist die Belastung?", "Welche Eigenschaften sind wichtig?", "Dein Auswahlrahmen"];
  return <CalculatorShell planner="dehumidifier" step={step} totalSteps={4} title={titles[step - 1]} label="Luftentfeuchter-Rechner" onReset={reset}>
    {step === 1 && <div className="form-step">
      <div className="field"><label htmlFor="room">Raumtyp</label><select id="room" value={input.roomType} onChange={(event) => update("roomType", event.target.value as DehumidifierInput["roomType"])}>{ROOMS.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></div>
      <div className="field-grid field-grid--two compact-fields">
        <NumberInput id="area" label="Raumfläche" value={input.areaM2} unit="m²" min={4} max={500} error={fieldErrors.areaM2} onChange={(value) => update("areaM2", value)} />
        <NumberInput id="height" label="Deckenhöhe" value={input.ceilingHeightM} unit="m" min={1.8} max={6} step="0.1" error={fieldErrors.ceilingHeightM} onChange={(value) => update("ceilingHeightM", value)} />
      </div>
      <OptionalNumberInput id="temperature" label="Ungefähre Raumtemperatur" value={input.approximateTemperatureC} unit="°C" min={0} max={45} error={fieldErrors.approximateTemperatureC} onChange={(value) => update("approximateTemperatureC", value)} />
      {formError && <p className="field-error" role="alert">{formError}</p>}
      <div className="live-estimate"><span>Berechnetes Raumvolumen</span><strong>{requirements ? `${requirements.roomVolumeM3.toLocaleString("de-DE")} m³` : "Eingaben prüfen"}</strong><small>{requirements ? "Fläche × Deckenhöhe" : "Das Volumen wird nur aus gültigen Werten berechnet."}</small></div>
    </div>}
    {step === 2 && <div className="form-step">
      <fieldset className="choice-group"><legend>Geschätzte Feuchtebelastung</legend><div className="radio-grid radio-grid--three">{[["mild", "Leicht", "Nur zeitweise erhöht"], ["moderate", "Mittel", "Regelmäßig spürbar"], ["high", "Hoch", "Deutlich und anhaltend"]].map(([value, label, detail]) => <label key={value} className={`radio-card radio-card--detail ${input.humiditySeverity === value ? "radio-card--selected" : ""}`}><input type="radio" name="severity" checked={input.humiditySeverity === value} onChange={() => update("humiditySeverity", value as DehumidifierInput["humiditySeverity"])} /><span><strong>{label}</strong><small>{detail}</small></span></label>)}</div></fieldset>
      <div className="check-card-grid check-card-grid--two"><Check label="Wäsche wird im Raum getrocknet" detail="Erhöht den Auswahlpuffer." checked={input.laundryDrying} onChange={(value) => update("laundryDrying", value)} /><Check label="Kontinuierlicher Ablauf ist erforderlich" detail="Nur Geräte mit Schlauchanschluss berücksichtigen." checked={input.continuousDrainPossible} onChange={(value) => update("continuousDrainPossible", value)} /></div>
      {formError && <p className="field-error" role="alert">{formError}</p>}
      <div className="info-box"><span aria-hidden="true">i</span><p>Die Belastungsstufe ist eine Auswahlhilfe. Sie diagnostiziert weder Ursache noch Schimmel- oder Bauschäden.</p></div>
    </div>}
    {step === 3 && <div className="form-step">
      <fieldset className="choice-group"><legend>Geräusch hat Priorität</legend><div className="radio-grid radio-grid--three">{[["low", "Niedrig"], ["medium", "Mittel"], ["high", "Hoch"]].map(([value, label]) => <label key={value} className={`radio-card ${input.noisePriority === value ? "radio-card--selected" : ""}`}><input type="radio" name="noise" checked={input.noisePriority === value} onChange={() => update("noisePriority", value as DehumidifierInput["noisePriority"])} /><span>{label}</span></label>)}</div></fieldset>
      <NumberInput id="dehumidifier-budget" label="Maximales Gesamtbudget" value={input.budgetMaxEur} unit="€" min={50} max={10000} error={fieldErrors.budgetMaxEur} onChange={(value) => update("budgetMaxEur", value)} />
      {formError && <p className="field-error" role="alert">{formError}</p>}
      {requirements && <RequirementGrid input={validatedInput!} />}
    </div>}
    {step === 4 && validatedInput && <div className="results" aria-live="polite">
      <RequirementGrid input={validatedInput} />
      {status === "loading" && <State title="Geprüfte Produktdaten werden geladen." text="Wir laden nur den Luftentfeuchter-Katalog." />}
      {status === "error" && <State title="Produktdaten konnten nicht geladen werden." text="Deine Berechnung bleibt erhalten. Du kannst den Katalog erneut laden."><button type="button" className="button button--secondary" onClick={showResults}>Erneut versuchen</button></State>}
      {status === "ready" && catalog?.products.length === 0 && <State title="Der geprüfte Gerätekatalog wird noch aufgebaut." text="Dein Auswahlrahmen ist vollständig. Modelle erscheinen erst nach manueller Prüfung ihrer Herstellerangaben." />}
      {status === "ready" && catalog && catalog.products.length > 0 && matches.length === 0 && <State title="Kein geprüftes Modell erfüllt alle Kriterien." text="Ändere Budget, Ablaufanforderung oder Raumdaten bewusst – wir lockern keine Kriterien im Hintergrund." />}
      {matches.length > 0 && <><AffiliateDisclosure /><div className="product-list">{matches.map(({ product, offer, reasons }, index) => <article className="product-card" key={product.id}><div className="rank-badge">#{index + 1}</div><ProductImage src={offer.imageUrl} alt={product.name} /><div className="product-content"><p className="product-brand">{product.brand ?? "Luftentfeuchter"}</p><h3>{product.name}</h3><dl className="product-facts"><div><dt>Fläche</dt><dd>{product.maxRecommendedAreaM2 ?? "–"} m²</dd></div><div><dt>Ablauf</dt><dd>{product.continuousDrain ? "ja" : "nein"}</dd></div><div><dt>Geräusch</dt><dd>{product.noiseDb ?? "–"} dB</dd></div><div><dt>Leistung</dt><dd>{product.powerW ?? "–"} W</dd></div></dl><ProductReasons reasons={reasons} /><div className="offer-row"><PriceDisplay offer={offer} /><AffiliateLink className="button button--primary" href={resolveOfferUrl(offer)} productId={product.id} verticalRef="dehumidifier" merchantName={offer.merchantName}>Beim Händler ansehen ↗</AffiliateLink></div></div></article>)}</div></>}
      <PrintResultAction />
    </div>}
    <div className="calculator-actions">
      {step > 1 && <button type="button" className="button button--back" onClick={() => goToStep(Math.max(1, step - 1))}>← Zurück</button>}
      {step < 3 && <button type="button" className="button button--primary" onClick={next}>Weiter <span aria-hidden="true">→</span></button>}
      {step === 3 && <button type="button" className="button button--primary" disabled={status === "loading"} onClick={showResults}>Auswahlrahmen berechnen <span aria-hidden="true">→</span></button>}
      {step === 4 && <button type="button" className="button button--back" onClick={() => goToStep(1)}>Eingaben ändern</button>}
    </div>
  </CalculatorShell>;
}

function NumberInput({ id, label, value, unit, min, max, step, error, onChange }: { id: string; label: string; value: number; unit: string; min: number; max: number; step?: string; error?: string; onChange: (value: number) => void }) {
  const invalid = !Number.isFinite(value) || value < min || value > max || Boolean(error);
  return <div className="field"><label htmlFor={id}>{label}</label><div className="input-with-unit"><input id={id} type="number" inputMode="decimal" value={Number.isFinite(value) ? value : ""} min={min} max={max} step={step} aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.valueAsNumber)} /><span>{unit}</span></div>{invalid && <small className="field-error" id={`${id}-error`}>Bitte einen Wert zwischen {min.toLocaleString("de-DE")} und {max.toLocaleString("de-DE")} eingeben.</small>}</div>;
}

function OptionalNumberInput({ id, label, value, unit, min, max, error, onChange }: { id: string; label: string; value?: number; unit: string; min: number; max: number; error?: string; onChange: (value: number | undefined) => void }) {
  const invalid = value !== undefined && (!Number.isFinite(value) || value < min || value > max) || Boolean(error);
  return <div className="field field--wide"><label htmlFor={id}>{label} <span className="optional">optional</span></label><div className="input-with-unit"><input id={id} type="number" inputMode="decimal" value={value !== undefined && Number.isFinite(value) ? value : ""} min={min} max={max} aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.value === "" ? undefined : event.target.valueAsNumber)} /><span>{unit}</span></div>{invalid && <small className="field-error" id={`${id}-error`}>Bitte einen Wert zwischen {min.toLocaleString("de-DE")} und {max.toLocaleString("de-DE")} eingeben – oder das Feld leeren.</small>}</div>;
}

function Check({ label, detail, checked, onChange }: { label: string; detail: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className={`check-card ${checked ? "check-card--selected" : ""}`}><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span className="check-box" aria-hidden="true">{checked ? "✓" : ""}</span><span><strong>{label}</strong><small>{detail}</small></span></label>;
}

function RequirementGrid({ input }: { input: DehumidifierInput }) {
  const requirements = calculateDehumidifierRequirements(input);
  return <div className="requirement-summary"><div><span>Raumvolumen</span><strong>{requirements.roomVolumeM3.toLocaleString("de-DE")} m³</strong></div><div><span>Auswahlziel Fläche</span><strong>{requirements.requiredAreaM2} m²</strong></div><div><span>Auswahlziel Volumen</span><strong>{requirements.requiredVolumeM3} m³</strong></div><div><span>Planungspuffer</span><strong>× {requirements.margin.toLocaleString("de-DE")}</strong></div></div>;
}

function State({ title, text, children }: { title: string; text: string; children?: ReactNode }) {
  return <div className="result-state"><span className="result-symbol" aria-hidden="true">◇</span><h3>{title}</h3><p>{text}</p>{children}<p className="state-note">Keine Diagnose und keine ungeprüften Produktempfehlungen.</p></div>;
}
