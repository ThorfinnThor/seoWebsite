"use client";

import { useState } from "react";
import { calculateFlowRate, FlowRateInputSchema } from "@/lib/quick-calculators/rules";

export function FlowRateCalculator() {
  const [volumeLiters, setVolumeLiters] = useState(10);
  const [fillSeconds, setFillSeconds] = useState(30);
  const parsed = FlowRateInputSchema.safeParse({ volumeLiters, fillSeconds });
  const result = parsed.success ? calculateFlowRate(parsed.data) : null;

  return <section className="inline-calculator" aria-labelledby="flow-calculator-title">
    <div className="inline-calculator-heading"><div><p className="eyebrow">Eimertest-Rechner</p><h2 id="flow-calculator-title">Sekunden in Durchfluss umrechnen</h2></div><p>Die Rechnung läuft nur in deinem Browser. Es werden keine Messwerte übertragen.</p></div>
    <div className="inline-calculator-body">
      <div className="inline-inputs"><InlineNumber id="bucket-volume" label="Behältervolumen" value={volumeLiters} unit="Liter" min={0.5} max={1000} step="0.5" onChange={setVolumeLiters} /><InlineNumber id="fill-time" label="Gemessene Füllzeit" value={fillSeconds} unit="Sek." min={0.5} max={3600} step="0.1" onChange={setFillSeconds} /></div>
      <div className="inline-results" aria-live="polite"><Result label="Durchfluss" value={result ? `${format(result.litersPerMinute)} l/min` : "–"} /><Result label="Pro Stunde" value={result ? `${result.litersPerHour.toLocaleString("de-DE")} Liter` : "–"} /><Result label="10-Liter-Vergleich" value={result ? `${format(result.secondsPer10Liters)} Sekunden` : "–"} /></div>
    </div>
    <p className="inline-calculator-note">Mehrfach messen und den Wert nicht mit dem statischen Ruhedruck verwechseln. Am später verwendeten Anschluss unter typischen Bedingungen testen.</p>
  </section>;
}

function InlineNumber({ id, label, value, unit, min, max, step, onChange }: { id: string; label: string; value: number; unit: string; min: number; max: number; step: string; onChange: (value: number) => void }) {
  const invalid = !Number.isFinite(value) || value < min || value > max;
  return <div className="field"><label htmlFor={id}>{label}</label><div className="input-with-unit"><input id={id} type="number" inputMode="decimal" value={Number.isFinite(value) ? value : ""} min={min} max={max} step={step} aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.valueAsNumber)} /><span>{unit}</span></div>{invalid && <small className="field-error" id={`${id}-error`}>Bitte einen Wert zwischen {min} und {max} eingeben.</small>}</div>;
}

function Result({ label, value }: { label: string; value: string }) {
  return <div><span>{label}</span><strong>{value}</strong></div>;
}

const format = (value: number) => value.toLocaleString("de-DE", { maximumFractionDigits: 1 });
