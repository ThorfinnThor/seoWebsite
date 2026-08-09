"use client";

import { useState } from "react";
import { calculateEnergyCost, EnergyCostInputSchema } from "@/lib/quick-calculators/rules";

export function EnergyCostCalculator() {
  const [powerW, setPowerW] = useState(300);
  const [hoursPerDay, setHoursPerDay] = useState(10);
  const [daysPerMonth, setDaysPerMonth] = useState(30);
  const [priceCents, setPriceCents] = useState(35);
  const parsed = EnergyCostInputSchema.safeParse({ powerW, hoursPerDay, daysPerMonth, electricityPriceCentsKwh: priceCents });
  const result = parsed.success ? calculateEnergyCost(parsed.data) : null;

  return <section className="inline-calculator" aria-labelledby="energy-calculator-title">
    <div className="inline-calculator-heading"><div><p className="eyebrow">Stromkosten-Rechner</p><h2 id="energy-calculator-title">Leistung und Laufzeit in Kosten übersetzen</h2></div><p>Nutze für eine realistische Schätzung die gemessene durchschnittliche Laufzeit – nicht automatisch 24 Stunden.</p></div>
    <div className="inline-calculator-body inline-calculator-body--energy">
      <div className="inline-inputs inline-inputs--four"><InlineNumber id="device-power" label="Leistungsaufnahme" value={powerW} unit="W" min={10} max={5000} step="1" onChange={setPowerW} /><InlineNumber id="runtime-day" label="Laufzeit pro Tag" value={hoursPerDay} unit="Std." min={0.1} max={24} step="0.1" onChange={setHoursPerDay} /><InlineNumber id="days-month" label="Betriebstage im Monat" value={daysPerMonth} unit="Tage" min={1} max={31} step="1" onChange={setDaysPerMonth} /><InlineNumber id="electricity-price" label="Dein Strompreis" value={priceCents} unit="ct/kWh" min={1} max={200} step="0.1" onChange={setPriceCents} /></div>
      <div className="inline-results inline-results--four" aria-live="polite"><Result label="Verbrauch im Monat" value={result ? `${format(result.monthlyKwh, 1)} kWh` : "–"} /><Result label="Kosten im Monat" value={result ? `${format(result.monthlyCostEur)} €` : "–"} /><Result label="Hochrechnung pro Jahr" value={result ? `${format(result.annualCostEur)} €` : "–"} /><Result label="Eine Betriebsstunde" value={result ? `${format(result.costPerOperatingHourEur, 3)} €` : "–"} /></div>
    </div>
    <p className="inline-calculator-note">Die Jahreszahl ist zwölfmal der eingegebene Beispielmonat. Saisonale Nutzung, Hygrostat-Pausen und wechselnde Leistungsaufnahme können den realen Wert deutlich verändern.</p>
  </section>;
}

function InlineNumber({ id, label, value, unit, min, max, step, onChange }: { id: string; label: string; value: number; unit: string; min: number; max: number; step: string; onChange: (value: number) => void }) {
  const invalid = !Number.isFinite(value) || value < min || value > max;
  return <div className="field"><label htmlFor={id}>{label}</label><div className="input-with-unit"><input id={id} type="number" inputMode="decimal" value={Number.isFinite(value) ? value : ""} min={min} max={max} step={step} aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.valueAsNumber)} /><span>{unit}</span></div>{invalid && <small className="field-error" id={`${id}-error`}>Bitte {min} bis {max} eingeben.</small>}</div>;
}

function Result({ label, value }: { label: string; value: string }) {
  return <div><span>{label}</span><strong>{value}</strong></div>;
}

const format = (value: number, digits = 2) => value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });
