"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { usePlannerSessionState } from "@/components/calculator/usePlannerSessionState";
import { usePlannerStepTransition } from "@/components/calculator/usePlannerStepTransition";
import { PrintResultAction } from "@/components/planner/PrintResultAction";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductReasons } from "@/components/product/ProductReasons";
import { useProductResultTracking } from "@/lib/analytics";
import { loadSecurityCameraCatalog } from "@/lib/catalog/load-client-catalog";
import { resolveOfferUrl } from "@/lib/catalog/offer-url";
import { recommendSecurityCameras } from "@/lib/security-camera/recommend";
import { SecurityCameraInputSchema, type SecurityCameraCatalog, type SecurityCameraInput } from "@/lib/security-camera/types";

const INITIAL: SecurityCameraInput = { placement: "outdoor", coverageZones: 2, connection: "wifi", powerAvailable: false, minimumResolution: "2k", panTiltRequired: false, integratedLightRequired: false, preferredBrand: "", budgetMaxEur: 600 };
const BRANDS = ["eufy", "Reolink", "Ring", "Arlo", "Yale", "Netatmo", "Bosch Smart Home", "eve"];
const parseInput = (value: unknown) => { const parsed = SecurityCameraInputSchema.safeParse(value); return parsed.success ? parsed.data : null; };

export function SecurityCameraPlanner() {
  const [step, setStep] = useState(1);
  const goToStep = usePlannerStepTransition(setStep);
  const { value: input, setValue: setInput, reset: resetInput } = usePlannerSessionState("passendplanen:security-camera:v1", INITIAL, parseInput);
  const [catalog, setCatalog] = useState<SecurityCameraCatalog | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [formError, setFormError] = useState("");
  const requestPending = useRef(false);
  const parsed = SecurityCameraInputSchema.safeParse(input);
  const matches = catalog && parsed.success ? recommendSecurityCameras(catalog, parsed.data) : [];
  useProductResultTracking({ planner: "security-camera", ready: step === 4 && status === "ready", matchCount: matches.length });

  useEffect(() => { if (step > 1) document.getElementById("calculator-heading")?.focus(); }, [step]);

  function update<K extends keyof SecurityCameraInput>(key: K, value: SecurityCameraInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    setFormError("");
  }

  function validate() {
    const result = SecurityCameraInputSchema.safeParse(input);
    if (result.success) { setInput(result.data); setFormError(""); return result.data; }
    setFormError("Bitte prüfe die Eingaben, bevor du fortfährst.");
    return null;
  }

  function next() {
    if (!validate()) return;
    goToStep(Math.min(3, step + 1));
  }

  async function showResults() {
    if (!validate() || requestPending.current) return;
    setStep(4);
    if (catalog) { setStatus("ready"); return; }
    requestPending.current = true;
    setStatus("loading");
    try { setCatalog(await loadSecurityCameraCatalog()); setStatus("ready"); }
    catch { setStatus("error"); }
    finally { requestPending.current = false; }
  }

  function reset() {
    resetInput(); setStep(1); setCatalog(null); setStatus("idle"); setFormError(""); requestPending.current = false;
  }

  const titles = ["Wo soll die Kamera eingesetzt werden?", "Wie kann die Kamera verbunden und versorgt werden?", "Welche Funktionen sind wirklich nötig?", "Dein Auswahlrahmen"];
  return <CalculatorShell planner="security-camera" step={step} totalSteps={4} title={titles[step - 1]} label="Sicherheitskamera Finder" onReset={reset}>
    {step === 1 && <div className="form-step">
      <fieldset className="choice-group"><legend>Einsatzort</legend><div className="radio-grid radio-grid--two">{[["outdoor", "Außen", "Fassade, Einfahrt oder Garten"], ["indoor", "Innen", "Wohnraum, Flur oder Nebenraum"]].map(([value, label, detail]) => <Choice key={value} name="placement" selected={input.placement === value} label={label} detail={detail} onChange={() => update("placement", value as SecurityCameraInput["placement"])} />)}</div></fieldset>
      <NumberField id="camera-zones" label="Getrennte Bereiche" value={input.coverageZones} min={1} max={12} unit="Bereiche" onChange={(value) => update("coverageZones", value)} />
      <div className="info-box"><span aria-hidden="true">i</span><p>Ein Bereich entspricht einem eigenen Blickwinkel. Eine Kamera kann nicht zuverlässig um Hausecken oder durch geschlossene Türen sehen.</p></div>
    </div>}
    {step === 2 && <div className="form-step">
      <fieldset className="choice-group"><legend>Verbindung</legend><div className="radio-grid radio-grid--four">{[["wifi", "WLAN"], ["poe", "PoE Kabel"], ["cellular", "4G Mobilfunk"], ["undecided", "Noch offen"]].map(([value, label]) => <Choice key={value} name="connection" selected={input.connection === value} label={label} onChange={() => update("connection", value as SecurityCameraInput["connection"])} />)}</div></fieldset>
      <Check label="Stromanschluss ist am Montageort vorhanden" detail="Wenn nicht, erscheinen nur Akku oder Solarmodelle." checked={input.powerAvailable} onChange={(value) => update("powerAvailable", value)} />
      <div className="info-box"><span aria-hidden="true">i</span><p>WLAN Reichweite und Upload Geschwindigkeit müssen direkt am Montageort geprüft werden. PoE benötigt ein geeignetes Netzwerkkabel und passende Netzwerkhardware.</p></div>
    </div>}
    {step === 3 && <div className="form-step">
      <fieldset className="choice-group"><legend>Mindestauflösung</legend><div className="radio-grid radio-grid--four">{[["hd", "Full HD"], ["2k", "2K"], ["3k", "3K"], ["4k", "4K"]].map(([value, label]) => <Choice key={value} name="resolution" selected={input.minimumResolution === value} label={label} onChange={() => update("minimumResolution", value as SecurityCameraInput["minimumResolution"])} />)}</div></fieldset>
      <div className="check-card-grid check-card-grid--two"><Check label="Schwenken und Neigen erforderlich" detail="Nur Modelle mit ausdrücklich genannter Bewegung werden berücksichtigt." checked={input.panTiltRequired} onChange={(value) => update("panTiltRequired", value)} /><Check label="Licht soll integriert sein" detail="Geeignet für Spotlight und Wall Light Kameras." checked={input.integratedLightRequired} onChange={(value) => update("integratedLightRequired", value)} /></div>
      <div className="field-grid field-grid--two compact-fields"><div className="field"><label htmlFor="camera-brand">Bevorzugtes System</label><select id="camera-brand" value={input.preferredBrand} onChange={(event) => update("preferredBrand", event.target.value)}><option value="">Keine Marke vorgeben</option>{BRANDS.map((brand) => <option key={brand} value={brand}>{brand}</option>)}</select></div><NumberField id="camera-budget" label="Gesamtbudget" value={input.budgetMaxEur} min={40} max={20000} unit="€" onChange={(value) => update("budgetMaxEur", value)} /></div>
      {formError && <p className="field-error" role="alert">{formError}</p>}
    </div>}
    {step === 4 && parsed.success && <div className="results" aria-live="polite">
      <Summary input={parsed.data} />
      {status === "loading" && <State title="Geprüfte Kameradaten werden geladen." text="Der Produktkatalog wird für deinen Auswahlrahmen gefiltert." />}
      {status === "error" && <State title="Der Kamerakatalog konnte nicht geladen werden." text="Deine Eingaben bleiben erhalten."><button type="button" className="button button--secondary" onClick={showResults}>Erneut versuchen</button></State>}
      {status === "ready" && catalog?.products.length === 0 && <State title="Der Kamerakatalog wird gerade aufgebaut." text="Die Feedprodukte sind vorhanden. Sie erscheinen nach der technischen Prüfung und dem nächsten Import." />}
      {status === "ready" && catalog && catalog.products.length > 0 && matches.length === 0 && <State title="Kein geprüftes Angebot erfüllt alle Angaben." text="Ändere Verbindung, Funktionswünsche, Marke oder Budget bewusst. Kriterien werden nicht automatisch gelockert." />}
      {matches.length > 0 && <><AffiliateDisclosure /><div className="product-list">{matches.map(({ product, offer, reasons, requiredSets, estimatedTotalEur }, index) => <article className="product-card" key={product.id}><div className="rank-badge">#{index + 1}</div><ProductImage src={offer.imageUrl} alt={product.name} /><div className="product-content"><p className="product-brand">{product.brand ?? "Sicherheitskamera"}</p><h3>{product.name}</h3><dl className="product-facts"><div><dt>Einsatzort</dt><dd>{product.placement === "outdoor" ? "Außen" : "Innen"}</dd></div><div><dt>Verbindung</dt><dd>{product.connection === "poe" ? "PoE" : product.connection === "cellular" ? "4G" : "WLAN"}</dd></div><div><dt>Auflösung</dt><dd>{product.resolution.toUpperCase()}</dd></div><div><dt>Setgröße</dt><dd>{product.cameraCount}</dd></div></dl><ProductReasons reasons={reasons} />{requiredSets > 1 && <p className="state-note">Für {input.coverageZones} Bereiche werden rechnerisch {requiredSets} Angebote benötigt. Geschätzter Warenwert {estimatedTotalEur.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}.</p>}<div className="offer-row"><PriceDisplay offer={offer} /><AffiliateLink className="button button--primary" href={resolveOfferUrl(offer)} productId={product.id} verticalRef="security-camera" merchantName={offer.merchantName}>Beim Händler ansehen ↗</AffiliateLink></div></div></article>)}</div></>}
      <div className="info-box"><span aria-hidden="true">i</span><p>Prüfe vor dem Kauf den genauen Lieferumfang, eine mögliche Basisstation, Speicheroptionen, Folgekosten, App Unterstützung und die zulässige Ausrichtung der Kamera.</p></div>
      <PrintResultAction />
    </div>}
    <div className="calculator-actions">{step > 1 && <button type="button" className="button button--back" onClick={() => goToStep(Math.max(1, step - 1))}>← Zurück</button>}{step < 3 && <button type="button" className="button button--primary" onClick={next}>Weiter <span aria-hidden="true">→</span></button>}{step === 3 && <button type="button" className="button button--primary" onClick={showResults}>Kameras vergleichen <span aria-hidden="true">→</span></button>}{step === 4 && <button type="button" className="button button--back" onClick={() => goToStep(1)}>Eingaben ändern</button>}</div>
  </CalculatorShell>;
}

function Choice({ name, selected, label, detail, onChange }: { name: string; selected: boolean; label: string; detail?: string; onChange: () => void }) {
  return <label className={`radio-card ${detail ? "radio-card--detail" : ""} ${selected ? "radio-card--selected" : ""}`}><input type="radio" name={name} checked={selected} onChange={onChange} /><span><strong>{label}</strong>{detail && <small>{detail}</small>}</span></label>;
}

function Check({ label, detail, checked, onChange }: { label: string; detail: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className={`check-card ${checked ? "check-card--selected" : ""}`}><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span className="check-box" aria-hidden="true">{checked ? "✓" : ""}</span><span><strong>{label}</strong><small>{detail}</small></span></label>;
}

function NumberField({ id, label, value, min, max, unit, onChange }: { id: string; label: string; value: number; min: number; max: number; unit: string; onChange: (value: number) => void }) {
  const invalid = !Number.isFinite(value) || value < min || value > max;
  return <div className="field"><label htmlFor={id}>{label}</label><div className="input-with-unit"><input id={id} type="number" inputMode="numeric" value={Number.isFinite(value) ? value : ""} min={min} max={max} aria-invalid={invalid} onChange={(event) => onChange(event.target.valueAsNumber)} /><span>{unit}</span></div>{invalid && <small className="field-error">Bitte einen Wert zwischen {min} und {max} eingeben.</small>}</div>;
}

function Summary({ input }: { input: SecurityCameraInput }) {
  return <div className="requirement-summary"><div><span>Einsatzort</span><strong>{input.placement === "outdoor" ? "Außen" : "Innen"}</strong></div><div><span>Bereiche</span><strong>{input.coverageZones}</strong></div><div><span>Verbindung</span><strong>{input.connection === "undecided" ? "offen" : input.connection.toUpperCase()}</strong></div><div><span>Mindestauflösung</span><strong>{input.minimumResolution.toUpperCase()}</strong></div></div>;
}

function State({ title, text, children }: { title: string; text: string; children?: ReactNode }) {
  return <div className="result-state"><span className="result-symbol" aria-hidden="true">◇</span><h3>{title}</h3><p>{text}</p>{children}<p className="state-note">Keine Überwachungsgarantie und keine rechtliche Freigabe des Aufnahmebereichs.</p></div>;
}
