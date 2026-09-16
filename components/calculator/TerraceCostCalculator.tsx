"use client";

import { useState } from "react";
import { calculateTerraceCost, TerraceCostInputSchema } from "@/lib/quick-calculators/rules";

interface CostInput {
  areaM2: number;
  wastePercent: number;
  deckingPricePerM2: number;
  substructurePricePerM2: number;
  foundationPricePerM2: number;
  fasteningPricePerM2: number;
  laborPricePerM2: number;
  fixedCostsEur: number;
}

const EMPTY_OFFER: CostInput = {
  areaM2: 20,
  wastePercent: 10,
  deckingPricePerM2: 0,
  substructurePricePerM2: 0,
  foundationPricePerM2: 0,
  fasteningPricePerM2: 0,
  laborPricePerM2: 0,
  fixedCostsEur: 0,
};

const EXAMPLES: Array<{ label: string; detail: string; values: CostInput }> = [
  { label: "Kleine Terrasse in Eigenleistung", detail: "12 m² mit angenommenen Einzelpreisen", values: { areaM2: 12, wastePercent: 10, deckingPricePerM2: 55, substructurePricePerM2: 22, foundationPricePerM2: 15, fasteningPricePerM2: 7, laborPricePerM2: 0, fixedCostsEur: 180 } },
  { label: "24 m² mit Montage", detail: "Vollständiges fiktives Angebot", values: { areaM2: 24, wastePercent: 10, deckingPricePerM2: 75, substructurePricePerM2: 32, foundationPricePerM2: 24, fasteningPricePerM2: 9, laborPricePerM2: 85, fixedCostsEur: 350 } },
  { label: "Große Terrasse mit Montage", detail: "35 m² mit günstigeren Dielen", values: { areaM2: 35, wastePercent: 10, deckingPricePerM2: 48, substructurePricePerM2: 28, foundationPricePerM2: 18, fasteningPricePerM2: 8, laborPricePerM2: 65, fixedCostsEur: 300 } },
];

export function TerraceCostCalculator() {
  const [input, setInput] = useState<CostInput>(EMPTY_OFFER);
  const parsed = TerraceCostInputSchema.safeParse(input);
  const result = parsed.success ? calculateTerraceCost(parsed.data) : null;
  const hasOfferValues = parsed.success && [input.deckingPricePerM2, input.substructurePricePerM2, input.foundationPricePerM2, input.fasteningPricePerM2, input.laborPricePerM2, input.fixedCostsEur].some((value) => value > 0);

  function update(key: keyof CostInput, value: number) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return <section className="inline-calculator terrace-cost-calculator" aria-labelledby="terrace-cost-title">
    <div className="inline-calculator-heading">
      <div><p className="eyebrow">Terrassenkosten berechnen</p><h2 id="terrace-cost-title">Was ergibt dein konkretes Angebot?</h2></div>
      <p>Trage die Positionen aus deinem Angebot ein. Nur der Belag wird hier mit der gewählten Zuschnittreserve hochgerechnet.</p>
    </div>
    <div className="inline-calculator-body">
      <div className="cost-example-picker" aria-label="Fiktive Rechenbeispiele">
        <div><strong>Rechenbeispiel laden</strong><span>Die Werte sind Annahmen und keine Marktpreise.</span></div>
        <div>{EXAMPLES.map((example) => <button type="button" key={example.label} onClick={() => setInput(example.values)}><strong>{example.label}</strong><span>{example.detail}</span></button>)}</div>
      </div>
      <div className="inline-inputs inline-inputs--cost">
        <CostField id="cost-area" label="Terrassenfläche" value={input.areaM2} unit="m²" min={1} max={1000} onChange={(value) => update("areaM2", value)} />
        <CostField id="cost-waste" label="Reserve für den Belag" value={input.wastePercent} unit="%" min={0} max={30} onChange={(value) => update("wastePercent", value)} />
        <CostField id="cost-decking" label="Belag laut Angebot" value={input.deckingPricePerM2} unit="€/m²" min={0} max={5000} onChange={(value) => update("deckingPricePerM2", value)} />
        <CostField id="cost-substructure" label="Unterkonstruktion" value={input.substructurePricePerM2} unit="€/m²" min={0} max={5000} onChange={(value) => update("substructurePricePerM2", value)} />
        <CostField id="cost-foundation" label="Untergrund und Gründung" value={input.foundationPricePerM2} unit="€/m²" min={0} max={5000} onChange={(value) => update("foundationPricePerM2", value)} />
        <CostField id="cost-fastening" label="Befestigung und Zubehör" value={input.fasteningPricePerM2} unit="€/m²" min={0} max={5000} onChange={(value) => update("fasteningPricePerM2", value)} />
        <CostField id="cost-labor" label="Montage" value={input.laborPricePerM2} unit="€/m²" min={0} max={5000} onChange={(value) => update("laborPricePerM2", value)} />
        <CostField id="cost-fixed" label="Lieferung und feste Nebenkosten" value={input.fixedCostsEur} unit="€" min={0} max={1_000_000} onChange={(value) => update("fixedCostsEur", value)} />
      </div>
      <div className="inline-results inline-results--cost" aria-live="polite">
        <Result label="Belagsmenge mit Reserve" value={result ? `${format(result.purchaseAreaM2, 1)} m²` : "–"} />
        <Result label="Material zusammen" value={result && hasOfferValues ? `${format(result.materialCostEur)} €` : "–"} />
        <Result label="Montage" value={result && hasOfferValues ? `${format(result.laborCostEur)} €` : "–"} />
        <Result label="Feste Nebenkosten" value={result && hasOfferValues ? `${format(result.fixedCostsEur)} €` : "–"} />
        <Result label="Gesamtsumme" value={result && hasOfferValues ? `${format(result.totalCostEur)} €` : "–"} prominent />
        <Result label="Kosten je Terrassenfläche" value={result && hasOfferValues ? `${format(result.totalCostPerM2Eur)} €/m²` : "–"} />
      </div>
      <CostInterpretation input={input} result={result} hasOfferValues={hasOfferValues} />
    </div>
    <p className="inline-calculator-note">Das Ergebnis dient nur zur eigenen Budgetplanung. Prüfe Mengen, Leistungsumfang, Steuern, Lieferung und Montagebedingungen direkt im jeweiligen Angebot.</p>
  </section>;
}

function CostInterpretation({ input, result, hasOfferValues }: { input: CostInput; result: ReturnType<typeof calculateTerraceCost> | null; hasOfferValues: boolean }) {
  if (!result || !hasOfferValues) return <div className="cost-interpretation"><strong>Dein Angebot fehlt noch.</strong><p>Übernimm die einzelnen Positionen aus einem Händlerangebot oder lade eines der drei fiktiven Beispiele.</p></div>;
  if (result.laborSharePercent >= 45) return <div className="cost-interpretation"><strong>Die Montage prägt dieses Angebot.</strong><p>Sie macht rund {format(result.laborSharePercent, 1)} Prozent der Gesamtsumme aus. Vergleiche deshalb nicht nur den Endpreis, sondern auch Untergrundvorbereitung, Zuschnitt, Randdetails und Entsorgung.</p></div>;
  if (input.fixedCostsEur > result.totalCostEur * 0.2) return <div className="cost-interpretation"><strong>Die festen Nebenkosten fallen deutlich ins Gewicht.</strong><p>Bei dieser Fläche verändern Lieferung und weitere Pauschalen den Quadratmeterwert stärker als bei einem größeren Projekt.</p></div>;
  return <div className="cost-interpretation"><strong>Der Dielenpreis ist nur ein Teil des Budgets.</strong><p>In deiner Eingabe entfallen {format(result.deckingCostEur)} Euro auf den Belag. Die Gesamtsumme enthält zusätzlich Unterkonstruktion, Gründung, Befestigung, Montage und feste Nebenkosten.</p></div>;
}

function CostField({ id, label, value, unit, min, max, onChange }: { id: string; label: string; value: number; unit: string; min: number; max: number; onChange: (value: number) => void }) {
  const invalid = !Number.isFinite(value) || value < min || value > max;
  return <div className="field"><label htmlFor={id}>{label}</label><div className="input-with-unit"><input id={id} type="number" inputMode="decimal" value={Number.isFinite(value) ? value : ""} min={min} max={max} step="0.1" aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.valueAsNumber)} /><span>{unit}</span></div>{invalid && <small className="field-error" id={`${id}-error`}>Bitte einen Wert zwischen {min.toLocaleString("de-DE")} und {max.toLocaleString("de-DE")} eingeben.</small>}</div>;
}

function Result({ label, value, prominent = false }: { label: string; value: string; prominent?: boolean }) {
  return <div className={prominent ? "inline-result--prominent" : undefined}><span>{label}</span><strong>{value}</strong></div>;
}

const format = (value: number, digits = 2) => value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });
