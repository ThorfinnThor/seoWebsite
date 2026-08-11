"use client";

import { useEffect, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { usePlannerSessionState } from "@/components/calculator/usePlannerSessionState";
import { PrintResultAction } from "@/components/planner/PrintResultAction";
import { calculateFlooringPlan } from "@/lib/flooring/rules";
import { FlooringInputSchema, type FlooringInput, type FlooringRoom } from "@/lib/flooring/types";

const INITIAL: FlooringInput = {
  rooms: [{ id: "room-1", label: "Raum 1", lengthM: 5, widthM: 4 }],
  excludedAreaM2: 0,
  flooringType: "laminate",
  layingPattern: "straight",
  wastePercent: 10,
  plankLengthMm: 1285,
  plankWidthMm: 192,
  packageCoverageM2: 2.22,
  includeUnderlay: true,
  underlayRollCoverageM2: 10,
  includeSkirting: true,
  totalDoorOpeningM: 1,
  skirtingBarLengthM: 2.4,
  floorHeating: false,
  wetRoom: false,
};

const TITLES = [
  "Welche Flächen möchtest du belegen?",
  "Wie wird der Boden geliefert und verlegt?",
  "Welche Ergänzungen gehören zum Projekt?",
  "Dein Material- und Paketrahmen",
];

const parseInput = (value: unknown) => {
  const result = FlooringInputSchema.safeParse(value);
  return result.success ? result.data : null;
};

export function FlooringPlanner() {
  const [step, setStep] = useState(1);
  const { value: input, setValue: setInput, reset: resetInput } = usePlannerSessionState("machplan:flooring:v1", INITIAL, parseInput);
  const [error, setError] = useState("");
  const parsed = FlooringInputSchema.safeParse(input);
  const plan = parsed.success ? calculateFlooringPlan(parsed.data) : null;

  useEffect(() => {
    if (step > 1) document.getElementById("calculator-heading")?.focus();
  }, [step]);

  function update<K extends keyof FlooringInput>(key: K, value: FlooringInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function updateRoom(id: string, patch: Partial<FlooringRoom>) {
    setInput((current) => ({ ...current, rooms: current.rooms.map((room) => room.id === id ? { ...room, ...patch } : room) }));
    setError("");
  }

  function addRoom() {
    setInput((current) => current.rooms.length >= 8 ? current : ({ ...current, rooms: [...current.rooms, { id: `room-${Date.now()}`, label: `Raum ${current.rooms.length + 1}`, lengthM: 3, widthM: 3 }] }));
  }

  function removeRoom(id: string) {
    setInput((current) => current.rooms.length === 1 ? current : ({ ...current, rooms: current.rooms.filter((room) => room.id !== id) }));
  }

  function next() {
    if (!parsed.success) {
      setError("Bitte prüfe Maße und Abzüge. Die nicht belegte Fläche muss kleiner als die gesamte Bodenfläche bleiben.");
      return;
    }
    setStep((current) => Math.min(4, current + 1));
  }

  return <CalculatorShell step={step} totalSteps={4} title={TITLES[step - 1]} label="Bodenbelag-Mengenrechner" onReset={() => { resetInput(); setStep(1); setError(""); }}>
    {step === 1 && <div className="form-step">
      <div className="room-list">{input.rooms.map((room, index) => <article className="room-editor" key={room.id}>
        <div className="room-editor-heading"><div><span>Teilfläche {index + 1}</span><input className="text-input" aria-label={`Name der Teilfläche ${index + 1}`} value={room.label} maxLength={40} onChange={(event) => updateRoom(room.id, { label: event.target.value })} /></div>{input.rooms.length > 1 && <button type="button" onClick={() => removeRoom(room.id)} aria-label={`${room.label} entfernen`}>Entfernen</button>}</div>
        <div className="field-grid field-grid--two"><NumberField id={`${room.id}-length`} label="Länge" value={room.lengthM} unit="m" min={0.8} max={30} step="0.1" onChange={(value) => updateRoom(room.id, { lengthM: value })} /><NumberField id={`${room.id}-width`} label="Breite" value={room.widthM} unit="m" min={0.8} max={30} step="0.1" onChange={(value) => updateRoom(room.id, { widthM: value })} /></div>
        <p>{format(room.lengthM * room.widthM)} m²</p>
      </article>)}</div>
      {input.rooms.length < 8 && <button className="add-room-button" type="button" onClick={addRoom}>+ Weitere rechteckige Teilfläche</button>}
      <NumberField id="excluded-area" label="Nicht belegte feste Fläche" value={input.excludedAreaM2} unit="m²" min={0} max={200} step="0.1" onChange={(value) => update("excludedAreaM2", value)} />
      <div className="info-box"><span>i</span><p>Teile L-Formen in Rechtecke. Ziehe nur Flächen ab, auf denen sicher kein Boden liegt; Küchenzeilen oder lose Möbel werden meist nicht abgezogen.</p></div>
      <div className="live-estimate"><span>Netto zu belegende Fläche</span><strong>{plan ? `${format(plan.netAreaM2)} m²` : "–"}</strong><small>{input.rooms.length} Teilfläche{input.rooms.length === 1 ? "" : "n"}, feste Abzüge bereits berücksichtigt</small></div>
    </div>}

    {step === 2 && <div className="form-step">
      <fieldset className="choice-group"><legend>Bodenart</legend><div className="radio-grid radio-grid--three"><Choice name="floor-type" label="Laminat" detail="schwimmende Verlegung" checked={input.flooringType === "laminate"} onChange={() => update("flooringType", "laminate")} /><Choice name="floor-type" label="Klick-Vinyl" detail="Systemfreigabe prüfen" checked={input.flooringType === "vinyl-click"} onChange={() => update("flooringType", "vinyl-click")} /><Choice name="floor-type" label="Fertigparkett" detail="schwimmend geplant" checked={input.flooringType === "parquet-floating"} onChange={() => update("flooringType", "parquet-floating")} /></div></fieldset>
      <fieldset className="choice-group"><legend>Verlegemuster</legend><div className="radio-grid radio-grid--two"><Choice name="pattern" label="Gerade" detail="parallel zur Bezugswand" checked={input.layingPattern === "straight"} onChange={() => update("layingPattern", "straight")} /><Choice name="pattern" label="Diagonal" detail="mehr Randzuschnitte" checked={input.layingPattern === "diagonal"} onChange={() => update("layingPattern", "diagonal")} /></div></fieldset>
      <fieldset className="choice-group"><legend>Verschnitt- und Auswahlreserve</legend><div className="radio-grid radio-grid--three">{([5, 10, 15] as const).map((value) => <Choice key={value} name="waste" label={`${value} %`} detail={value === 5 ? "einfache Geometrie" : value === 10 ? "üblicher Startwert" : "viele Zuschnitte"} checked={input.wastePercent === value} onChange={() => update("wastePercent", value)} />)}</div></fieldset>
      <div className="field-grid field-grid--three"><NumberField id="plank-length" label="Dielenlänge" value={input.plankLengthMm} unit="mm" min={300} max={2500} onChange={(value) => update("plankLengthMm", value)} /><NumberField id="plank-width" label="Dielenbreite" value={input.plankWidthMm} unit="mm" min={80} max={500} onChange={(value) => update("plankWidthMm", value)} /><NumberField id="package-area" label="Inhalt je Paket" value={input.packageCoverageM2} unit="m²" min={0.25} max={10} step="0.01" onChange={(value) => update("packageCoverageM2", value)} /></div>
      <div className="requirement-summary requirement-summary--three"><div><span>Nettofläche</span><strong>{plan ? `${format(plan.netAreaM2)} m²` : "–"}</strong></div><div><span>Mit Reserve</span><strong>{plan ? `${format(plan.purchaseAreaM2)} m²` : "–"}</strong></div><div><span>Volle Pakete</span><strong>{plan?.packageCount ?? "–"}</strong></div></div>
    </div>}

    {step === 3 && <div className="form-step">
      <div className="check-card-grid check-card-grid--two"><Check label="Separate Unterlage einplanen" detail="5 % Verlegereserve; Systemaufbau prüfen" checked={input.includeUnderlay} onChange={(value) => update("includeUnderlay", value)} /><Check label="Sockelleisten einplanen" detail="10 % Längenreserve" checked={input.includeSkirting} onChange={(value) => update("includeSkirting", value)} /></div>
      <div className="field-grid field-grid--two"><NumberField id="underlay-roll" label="Deckfläche je Unterlagenrolle" value={input.underlayRollCoverageM2} unit="m²" min={1} max={100} step="0.1" onChange={(value) => update("underlayRollCoverageM2", value)} /><NumberField id="skirting-bar" label="Lieferlänge je Sockelleiste" value={input.skirtingBarLengthM} unit="m" min={1} max={5} step="0.1" onChange={(value) => update("skirtingBarLengthM", value)} /></div>
      <NumberField id="door-openings" label="Summe aller Türöffnungen ohne Sockelleiste" value={input.totalDoorOpeningM} unit="m" min={0} max={30} step="0.1" onChange={(value) => update("totalDoorOpeningM", value)} />
      <div className="check-card-grid check-card-grid--two"><Check label="Fußbodenheizung vorhanden" detail="Freigabe und Wärmedurchlass prüfen" checked={input.floorHeating} onChange={(value) => update("floorHeating", value)} /><Check label="Feuchtebelasteter Raum" detail="zum Beispiel Bad oder Eingangszone" checked={input.wetRoom} onChange={(value) => update("wetRoom", value)} /></div>
      <div className="live-estimate"><span>Zubehörrahmen</span><strong>{plan ? `${plan.underlayRollCount} Rollen · ${plan.skirtingBarCount} Leisten` : "–"}</strong><small>Nur Mengen; Eignung, Profil, Unterlage und Anschlüsse separat festlegen.</small></div>
    </div>}

    {step === 4 && plan && <div className="results flooring-results" aria-live="polite">
      <div className="requirement-summary"><div><span>Nettofläche</span><strong>{format(plan.netAreaM2)} m²</strong></div><div><span>Mit {input.wastePercent} % Reserve</span><strong>{format(plan.purchaseAreaM2)} m²</strong></div><div><span>Volle Pakete</span><strong>{plan.packageCount}</strong></div><div><span>Bestellte Fläche</span><strong>{format(plan.orderedAreaM2)} m²</strong></div></div>
      <div className="detail-result-grid">
        <article><span className="component-icon" aria-hidden="true">▤</span><div><p className="eyebrow">Bodenbelag</p><h3>{plan.packageCount} volle Pakete</h3><p>Rechnerisch etwa {plan.estimatedPlankCount} Dielen aus {format(input.plankLengthMm)} × {format(input.plankWidthMm)} mm. Das Paketmaß ist für die Bestellung maßgeblich.</p><strong>{format(plan.areaSurplusM2)} m² Differenz zwischen bestellter Fläche und Nettofläche</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">≋</span><div><p className="eyebrow">Unterlage</p><h3>{input.includeUnderlay ? `${plan.underlayRollCount} Rollen` : "Keine separate Unterlage eingerechnet"}</h3><p>{input.includeUnderlay ? `${format(plan.underlayAreaWithReserveM2)} m² inklusive 5 % Reserve bei ${format(input.underlayRollCoverageM2)} m² je Rolle.` : "Prüfe, ob eine Unterlage integriert ist oder für das gewählte System ergänzt werden muss."}</p><strong>Unterlage niemals nur nach Quadratmetern auswählen.</strong></div></article>
        <article><span className="component-icon" aria-hidden="true">⌑</span><div><p className="eyebrow">Sockelleisten</p><h3>{input.includeSkirting ? `${plan.skirtingBarCount} Leisten` : "Keine Sockelleisten eingerechnet"}</h3><p>{input.includeSkirting ? `${format(plan.skirtingLengthWithReserveM)} laufende Meter inklusive 10 % Reserve, Türöffnungen abgezogen.` : "Randabschlüsse und Übergangsprofile bleiben außerhalb der Bestellmenge."}</p><strong>{input.rooms.length > 1 ? "Gemeinsame Innenkanten im Aufmaß korrigieren." : "Ecken, Versprünge und Profilstöße im Zuschnittplan prüfen."}</strong></div></article>
      </div>
      <div className="warning-panel"><h3>Vor Bestellung und Verlegung prüfen</h3><ul>{plan.warnings.map((warning) => <li key={warning}>{warning}</li>)}<li>Chargengleichheit, Sockelleistenprofile, Übergänge, Abschlussprofile und eine mögliche Paketreserve für spätere Reparaturen separat entscheiden.</li></ul></div>
      <PrintResultAction />
    </div>}

    {error && <p className="field-error calculator-error" role="alert">{error}</p>}
    <div className="calculator-actions">{step > 1 && <button className="button button--back" type="button" onClick={() => { setError(""); setStep((current) => Math.max(1, current - 1)); }}>← Zurück</button>}{step < 4 && <button className="button button--primary" type="button" onClick={next}>{step === 3 ? "Materialrahmen berechnen" : "Weiter"} →</button>}{step === 4 && <button className="button button--back" type="button" onClick={() => setStep(1)}>Eingaben ändern</button>}</div>
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
