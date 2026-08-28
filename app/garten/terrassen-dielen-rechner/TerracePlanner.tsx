"use client";

import { useEffect, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { PlannerNumberField as NumberField } from "@/components/calculator/PlannerNumberField";
import { usePlannerValidation } from "@/components/calculator/usePlannerValidation";
import { usePlannerStepTransition } from "@/components/calculator/usePlannerStepTransition";
import { usePlannerSessionState } from "@/components/calculator/usePlannerSessionState";
import { PrintResultAction } from "@/components/planner/PrintResultAction";
import { calculateTerracePlan } from "@/lib/terrace/rules";
import { TerraceInputSchema, type TerraceInput } from "@/lib/terrace/types";
import { ReferenceProductList } from "@/components/product/ReferenceProductList";
import { ProjectProductRecommendations } from "@/components/product/ProjectProductRecommendations";
import { REFERENCE_PRODUCTS, setReferenceQuantities } from "@/lib/reference-products";

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
const FIELD_IDS: Partial<Record<string, string>> = { terraceLengthM: "terrace-length", terraceWidthM: "terrace-width", boardWidthMm: "board-width", boardGapMm: "board-gap", boardLengthM: "board-length", maxSupportSpacingCm: "support-spacing" };
const STEP_FIELDS: Partial<Record<number, readonly string[]>> = { 1: ["terraceLengthM", "terraceWidthM"], 2: ["boardWidthMm", "boardGapMm", "boardLengthM"], 3: ["maxSupportSpacingCm"] };

export function TerracePlanner() {
  const [step, setStep] = useState(1);
  const goToStep = usePlannerStepTransition(setStep);
  const { value: input, setValue: setInput, reset: resetInput } = usePlannerSessionState("passendplanen:terrace:v1", INITIAL, parseTerraceInput);
  const { parsed, fieldErrors, formError, validate, clearFieldError, resetValidation } = usePlannerValidation({ input, setInput, schema: TerraceInputSchema, fieldIds: FIELD_IDS, stepFields: STEP_FIELDS, step, setStep });
  const plan = parsed.success ? calculateTerracePlan(parsed.data) : null;

  useEffect(() => {
    if (step > 1) document.getElementById("calculator-heading")?.focus();
  }, [step]);

  function update<K extends keyof TerraceInput>(key: K, value: TerraceInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    clearFieldError(String(key));
  }

  function next() {
    if (!validate()) return;
    goToStep(Math.min(4, step + 1));
  }

  return <CalculatorShell step={step} totalSteps={4} title={TITLES[step - 1]} label="Terrassendielen-Rechner" onReset={() => { resetInput(); setStep(1); resetValidation(); }}>
    {step === 1 && <div className="form-step">
      <div className="field-grid field-grid--two">
        <NumberField id="terrace-length" label="Länge der Terrasse" value={input.terraceLengthM} unit="m" min={1} max={30} step="0.1" error={fieldErrors.terraceLengthM} onChange={(value) => update("terraceLengthM", value)} />
        <NumberField id="terrace-width" label="Breite der Terrasse" value={input.terraceWidthM} unit="m" min={1} max={30} step="0.1" error={fieldErrors.terraceWidthM} onChange={(value) => update("terraceWidthM", value)} />
      </div>
      <fieldset className="choice-group"><legend>Verlegerichtung der Dielen</legend><div className="radio-grid radio-grid--two"><DirectionChoice label="Entlang der Länge" detail={`${format(input.terraceLengthM)} m Lauflänge`} checked={input.layingDirection === "length"} onChange={() => update("layingDirection", "length")} /><DirectionChoice label="Entlang der Breite" detail={`${format(input.terraceWidthM)} m Lauflänge`} checked={input.layingDirection === "width"} onChange={() => update("layingDirection", "width")} /></div></fieldset>
      <div className="live-estimate"><span>Terrassenfläche</span><strong>{plan ? `${format(plan.areaM2)} m²` : "–"}</strong><small>Länge × Breite; Ausschnitte und Sonderformen separat berücksichtigen.</small></div>
    </div>}

    {step === 2 && <div className="form-step">
      <div className="field-grid field-grid--two">
        <NumberField id="board-width" label="Sichtbreite einer Diele" value={input.boardWidthMm} unit="mm" min={50} max={300} error={fieldErrors.boardWidthMm} onChange={(value) => update("boardWidthMm", value)} />
        <NumberField id="board-gap" label="Geplante Fugenbreite" value={input.boardGapMm} unit="mm" min={3} max={15} error={fieldErrors.boardGapMm} onChange={(value) => update("boardGapMm", value)} />
        <NumberField id="board-length" label="Lieferlänge einer Diele" value={input.boardLengthM} unit="m" min={1} max={10} step="0.1" error={fieldErrors.boardLengthM} onChange={(value) => update("boardLengthM", value)} />
      </div>
      <div className="info-box"><span aria-hidden="true">i</span><p>Verwende die tatsächlich wirksame Sichtbreite und die vom Hersteller freigegebene Fuge. Profilmaße und Verlegebreite können voneinander abweichen.</p></div>
      <div className="requirement-summary requirement-summary--three"><div><span>Dielenreihen</span><strong>{plan?.courseCount ?? "–"}</strong></div><div><span>Reine Laufmeter</span><strong>{plan ? `${format(plan.deckingLinearM)} m` : "–"}</strong></div><div><span>Mindestens Stöße je Reihe</span><strong>{plan?.minimumJointsPerCourse ?? "–"}</strong></div></div>
    </div>}

    {step === 3 && <div className="form-step">
      <fieldset className="choice-group"><legend>Verschnitt- und Auswahlreserve</legend><div className="radio-grid radio-grid--three">{([5, 10, 15] as const).map((value) => <label className={`radio-card radio-card--detail ${input.wastePercent === value ? "radio-card--selected" : ""}`} key={value}><input type="radio" name="waste" checked={input.wastePercent === value} onChange={() => update("wastePercent", value)} /><span><strong>{value} %</strong><small>{value === 5 ? "einfache Fläche" : value === 10 ? "übliche Reserve" : "viele Zuschnitte"}</small></span></label>)}</div></fieldset>
      <NumberField id="support-spacing" label="Maximaler Auflagerabstand laut Belag-Hersteller" value={input.maxSupportSpacingCm} unit="cm" min={20} max={80} error={fieldErrors.maxSupportSpacingCm} onChange={(value) => update("maxSupportSpacingCm", value)} />
      <div className="info-box"><span aria-hidden="true">!</span><p>Der voreingestellte Wert ist nur ein Planungswert. Material, Dielenstärke, Nutzung und Verlegesystem können einen kleineren Abstand verlangen.</p></div>
      <div className="live-estimate"><span>Geschätzte Unterkonstruktionslinien</span><strong>{plan ? plan.supportRowCount : "–"}</strong><small>Erste und letzte Auflagerung eingeschlossen; Randdetails separat prüfen.</small></div>
    </div>}

    {step === 4 && plan && <div className="results terrace-results" aria-live="polite">
      <div className="requirement-summary"><div><span>Fläche</span><strong>{format(plan.areaM2)} m²</strong></div><div><span>Dielenreihen</span><strong>{plan.courseCount}</strong></div><div><span>Dielen inkl. Reserve</span><strong>{format(plan.deckingLinearMWithWaste)} lfm</strong></div><div><span>Volle Lieferdielen</span><strong>ca. {plan.fullBoardsToBuy}</strong></div></div>
      <div className="detail-result-grid">
        <article><span className="component-icon" aria-hidden="true">═</span><div><p className="eyebrow">Belag</p><h3>{plan.courseCount} Dielenreihen</h3><p>{format(plan.deckingLinearM)} laufende Meter ohne und {format(plan.deckingLinearMWithWaste)} laufende Meter mit {input.wastePercent} % Reserve.</p><strong>Bei {format(input.boardLengthM)} m Lieferlänge: ca. {plan.fullBoardsToBuy} volle Dielen</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">╫</span><div><p className="eyebrow">Unterkonstruktion</p><h3>{plan.supportRowCount} Auflagerlinien</h3><p>Geschätzt {format(plan.supportLinearMWithWaste)} laufende Meter inklusive Reserve bei maximal {format(input.maxSupportSpacingCm)} cm Abstand.</p><strong>{plan.fixingIntersections.toLocaleString("de-DE")} rechnerische Kreuzungspunkte</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">↔</span><div><p className="eyebrow">Zuschnitt & Fugen</p><h3>{plan.fullLengthPossible ? "Verlegung ohne Längsstoß möglich" : `Mindestens ${plan.minimumJointsPerCourse} Stoß je Reihe`}</h3><p>Die Reihenbreite liegt rechnerisch bei {format(plan.coveredWidthM, 3)} m. Am Rand sind ungefähr {plan.edgeAdjustmentMm} mm anzupassen.</p><strong>Stoßbild und symmetrische Randreihen vor Bestellung zeichnen.</strong></div></article>
      </div>
      <ReferenceProductList items={setReferenceQuantities(REFERENCE_PRODUCTS.terrace, { "terrace-decking": `${format(plan.deckingLinearMWithWaste)} lfm`, "terrace-substructure": `${format(plan.supportLinearMWithWaste)} lfm`, "terrace-screws": "nach Auflagerpunkten", "terrace-spacers": `${plan.courseCount} Reihen`, "terrace-foundation": `${plan.supportRowCount} Auflagerlinien`, "terrace-edge": "nach Randlängen" })} />
      <ProjectProductRecommendations requirements={{ vertical: "terrace", requiredKinds: ["decking", "substructure", "fastening", "foundation", "bracket"], areaM2: plan.areaM2, requiredLinearM: plan.deckingLinearMWithWaste, boardLengthMm: input.boardLengthM * 1000, boardWidthMm: input.boardWidthMm, requiredBoardCount: plan.fullBoardsToBuy, supportLinearM: plan.supportLinearMWithWaste }} />
      <div className="warning-panel"><h3>Vor Bestellung und Aufbau prüfen</h3><ul>{plan.warnings.map((warning) => <li key={warning}>{warning}</li>)}<li>Untergrund, Entwässerung, Aufbauhöhe, Gefälle und konstruktiver Holzschutz gehören in die konkrete Ausführungsplanung.</li></ul></div>
      <PrintResultAction />
    </div>}

    {formError && <p className="field-error calculator-error" role="alert">{formError}</p>}
    <div className="calculator-actions">{step > 1 && <button className="button button--back" type="button" onClick={() => { resetValidation(); goToStep(Math.max(1, step - 1)); }}>← Zurück</button>}{step < 4 && <button className="button button--primary" type="button" onClick={next}>{step === 3 ? "Materialrahmen berechnen" : "Weiter"} <span aria-hidden="true">→</span></button>}{step === 4 && <button className="button button--back" type="button" onClick={() => goToStep(1)}>Eingaben ändern</button>}</div>
  </CalculatorShell>;
}

function DirectionChoice({ label, detail, checked, onChange }: { label: string; detail: string; checked: boolean; onChange: () => void }) {
  return <label className={`radio-card radio-card--detail ${checked ? "radio-card--selected" : ""}`}><input type="radio" name="direction" checked={checked} onChange={onChange} /><span><strong>{label}</strong><small>{detail}</small></span></label>;
}

function format(value: number, maximumFractionDigits = 1) {
  return value.toLocaleString("de-DE", { maximumFractionDigits });
}
