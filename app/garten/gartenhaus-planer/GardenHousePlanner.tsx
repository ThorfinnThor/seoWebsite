"use client";

import { useEffect, useRef, useState } from "react";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { usePlannerSessionState } from "@/components/calculator/usePlannerSessionState";
import { ResultSummary } from "@/components/calculator/ResultSummary";
import { PrintResultAction } from "@/components/planner/PrintResultAction";
import { ProductCard } from "@/components/product/ProductCard";
import { loadGardenHouseCatalog } from "@/lib/catalog/load-client-catalog";
import { calculateRequirements } from "@/lib/garden-house/rules";
import { explainNoMatches, recommendGardenHouses } from "@/lib/garden-house/recommend";
import { GardenHouseInputSchema, type GardenHouseCatalog, type GardenHouseInput } from "@/lib/garden-house/types";

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

export function GardenHousePlanner() {
  const [step, setStep] = useState(1);
  const { value: input, setValue: setInput, reset: resetInput } = usePlannerSessionState("machplan:garden-house:v1", INITIAL_INPUT, parseGardenHouseInput);
  const [catalog, setCatalog] = useState<GardenHouseCatalog | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const headingRef = useRef<HTMLDivElement>(null);
  const requirements = calculateRequirements(input);
  const results = catalog ? recommendGardenHouses(catalog, input) : [];
  const explanations = catalog ? explainNoMatches(catalog, input) : [];

  useEffect(() => {
    if (step > 1) headingRef.current?.focus();
  }, [step]);

  function update<K extends keyof GardenHouseInput>(key: K, value: GardenHouseInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function next() {
    const validation = GardenHouseInputSchema.safeParse(input);
    if (!validation.success) return;
    setStep((current) => Math.min(5, current + 1));
  }

  async function showResults() {
    setStep(5);
    if (catalog) return;
    setStatus("loading");
    try {
      setCatalog(await loadGardenHouseCatalog());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  const titles = ["Wie viel Platz steht zur Verfügung?", "Was soll ins Gartenhaus?", "Welche Ausführung passt zu dir?", "Prüfe deinen Planungsrahmen", "Dein Ergebnis"];
  return (
    <div ref={headingRef} tabIndex={-1} className="focus-target">
      <CalculatorShell step={step} totalSteps={5} title={titles[step - 1]} label="Gartenhaus-Planer" intro={step === 1 ? <p>Gib nur die Fläche an, die du baulich und rechtlich tatsächlich nutzen kannst.</p> : undefined} onReset={() => { resetInput(); setStep(1); setCatalog(null); setStatus("idle"); }}>
        {step === 1 && <div className="form-step">
          <div className="field-grid field-grid--two">
            <NumberField id="width" label="Verfügbare Breite" value={input.availableWidthCm} min={150} max={2000} unit="cm" onChange={(value) => update("availableWidthCm", value)} />
            <NumberField id="depth" label="Verfügbare Tiefe" value={input.availableDepthCm} min={150} max={2000} unit="cm" onChange={(value) => update("availableDepthCm", value)} />
          </div>
          <label className="toggle-row"><input type="checkbox" checked={input.allowRotation} onChange={(event) => update("allowRotation", event.target.checked)} /><span className="toggle" aria-hidden="true" /><span><strong>Gartenhaus darf gedreht werden</strong><small>Wir prüfen die Maße zusätzlich um 90° gedreht.</small></span></label>
          <InfoBox>Plane Dachüberstände, Montageabstand und vorgeschriebene Grenzabstände zusätzlich ein. Die eingegebenen Maße sind die nutzbare Stellfläche.</InfoBox>
        </div>}
        {step === 2 && <div className="form-step">
          <div className="field-grid field-grid--two">
            <NumberField id="bikes" label="Anzahl Fahrräder" value={input.bikes} min={0} max={12} unit="Stück" onChange={(value) => update("bikes", value)} />
            <div className="field"><label htmlFor="tools">Werkzeug & Gartengeräte</label><select id="tools" value={input.toolStorage} onChange={(event) => update("toolStorage", event.target.value as GardenHouseInput["toolStorage"])}><option value="none">Keine</option><option value="small">Wenig – Handgeräte</option><option value="medium">Mittel – mehrere Großgeräte</option><option value="large">Viel – umfangreiche Lagerung</option></select></div>
          </div>
          <fieldset className="choice-group"><legend>Was brauchst du außerdem?</legend><div className="check-card-grid"><CheckCard label="Rasenmäher" detail="Zusätzliche Stell- und Rangierfläche" checked={input.lawnMower} onChange={(value) => update("lawnMower", value)} /><CheckCard label="Werkbank" detail="Fester Arbeitsplatz mit Bewegungsraum" checked={input.workbench} onChange={(value) => update("workbench", value)} /><CheckCard label="Regale" detail="Wandfläche und Zugang einplanen" checked={input.shelving} onChange={(value) => update("shelving", value)} /></div></fieldset>
          <div className="live-estimate"><span>Aktuelle Flächenempfehlung</span><strong>{requirements.recommendedAreaM2.toLocaleString("de-DE")} m²</strong><small>inklusive 15 % Bewegungsreserve, auf 0,5 m² aufgerundet</small></div>
        </div>}
        {step === 3 && <div className="form-step">
          <fieldset className="choice-group"><legend>Material</legend><div className="radio-grid radio-grid--four">{MATERIALS.map(([value, label]) => <label className={`radio-card ${input.materialPreference === value ? "radio-card--selected" : ""}`} key={value}><input type="radio" name="material" value={value} checked={input.materialPreference === value} onChange={() => update("materialPreference", value)} /><span>{label}</span></label>)}</div></fieldset>
          <fieldset className="choice-group"><legend>Dachform</legend><div className="radio-grid radio-grid--four">{ROOFS.map(([value, label]) => <label className={`radio-card ${input.roofPreference === value ? "radio-card--selected" : ""}`} key={value}><input type="radio" name="roof" value={value} checked={input.roofPreference === value} onChange={() => update("roofPreference", value)} /><span>{label}</span></label>)}</div></fieldset>
          <fieldset className="choice-group"><legend>Boden</legend><div className="radio-grid radio-grid--three">{FLOORS.map(([value, label, detail]) => <label className={`radio-card radio-card--detail ${input.floorPreference === value ? "radio-card--selected" : ""}`} key={value}><input type="radio" name="floor" value={value} checked={input.floorPreference === value} onChange={() => update("floorPreference", value)} /><span><strong>{label}</strong><small>{detail}</small></span></label>)}</div></fieldset>
        </div>}
        {step === 4 && <div className="form-step">
          <NumberField id="budget" label="Maximales Gesamtbudget" value={input.budgetMaxEur} min={100} max={100000} unit="€" onChange={(value) => update("budgetMaxEur", value)} wide />
          <ResultSummary input={input} requirements={requirements} />
          <InfoBox>Bei Angeboten mit unbekannten Versandkosten kann MachPlan die Budgeteinhaltung nicht sicher bestätigen. Sie werden klar als „zzgl. Versand“ gekennzeichnet.</InfoBox>
        </div>}
        {step === 5 && <div className="results" aria-live="polite">
          <ResultSummary input={input} requirements={requirements} />
          {status === "loading" && <div className="result-state"><span className="loader" aria-hidden="true" /><h3>Geprüfte Produktdaten werden geladen …</h3><p>Wir laden nur den Gartenhaus-Katalog, nicht Daten anderer Planer.</p></div>}
          {status === "error" && <div className="result-state result-state--error"><h3>Produktdaten konnten gerade nicht geladen werden.</h3><p>Deine Eingaben bleiben erhalten. Bitte versuche es später erneut.</p><button className="button button--secondary" onClick={showResults}>Erneut versuchen</button></div>}
          {status === "ready" && catalog?.products.length === 0 && <div className="result-state"><span className="result-symbol" aria-hidden="true">◇</span><h3>Der geprüfte Produktkatalog wird gerade aufgebaut.</h3><p>Dein Planungsrahmen ist fertig. Produkte erscheinen hier erst, nachdem ihre Maße und Eigenschaften anhand realer Händlerdaten manuell geprüft wurden.</p><p className="state-note">Wir zeigen bewusst keine erfundenen oder ungeprüften Empfehlungen.</p></div>}
          {status === "ready" && catalog && catalog.products.length > 0 && results.length === 0 && <div className="result-state"><span className="result-symbol" aria-hidden="true">0</span><h3>Kein geprüftes Modell erfüllt alle Kriterien.</h3><p>Wir lockern keine Anforderungen im Hintergrund. Diese Änderungen könnten helfen:</p><ul className="suggestion-list">{explanations.map((item) => <li key={item.code}><strong>{item.label}</strong><span>{item.suggestion}</span></li>)}</ul><button className="button button--secondary" onClick={() => setStep(3)}>Präferenzen bearbeiten</button></div>}
          {results.length > 0 && <><div className="result-heading"><div><p className="eyebrow">Bis zu drei geprüfte Treffer</p><h3>Diese Modelle erfüllen deine harten Kriterien.</h3></div><span>{results.length} {results.length === 1 ? "Treffer" : "Treffer"}</span></div><AffiliateDisclosure /><div className="product-list">{results.map((match, index) => <ProductCard key={match.product.id} match={match} position={index + 1} />)}</div></>}
          <PrintResultAction />
        </div>}
        <div className="calculator-actions">
          {step > 1 && <button type="button" className="button button--back" onClick={() => setStep((current) => Math.max(1, current - 1))}>← Zurück</button>}
          {step < 4 && <button type="button" className="button button--primary" onClick={next}>Weiter <span aria-hidden="true">→</span></button>}
          {step === 4 && <button type="button" className="button button--primary" onClick={showResults}>Passende Produkte finden <span aria-hidden="true">→</span></button>}
          {step === 5 && <button type="button" className="button button--back" onClick={() => setStep(1)}>Planung ändern</button>}
        </div>
      </CalculatorShell>
    </div>
  );
}

function NumberField({ id, label, value, min, max, unit, onChange, wide = false }: { id: string; label: string; value: number; min: number; max: number; unit: string; onChange: (value: number) => void; wide?: boolean }) {
  const invalid = value < min || value > max || !Number.isFinite(value);
  return <div className={`field ${wide ? "field--wide" : ""}`}><label htmlFor={id}>{label}</label><div className="input-with-unit"><input id={id} type="number" inputMode="decimal" min={min} max={max} value={value} aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.valueAsNumber)} /><span>{unit}</span></div>{invalid && <small className="field-error" id={`${id}-error`}>Bitte einen Wert zwischen {min.toLocaleString("de-DE")} und {max.toLocaleString("de-DE")} eingeben.</small>}</div>;
}

function CheckCard({ label, detail, checked, onChange }: { label: string; detail: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className={`check-card ${checked ? "check-card--selected" : ""}`}><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span className="check-box" aria-hidden="true">{checked ? "✓" : ""}</span><span><strong>{label}</strong><small>{detail}</small></span></label>;
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return <div className="info-box"><span aria-hidden="true">i</span><p>{children}</p></div>;
}
