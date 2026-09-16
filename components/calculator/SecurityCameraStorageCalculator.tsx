"use client";

import { useEffect, useState } from "react";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { ExpandableProductList } from "@/components/product/ExpandableProductList";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { ProductImage } from "@/components/product/ProductImage";
import { useProductResultTracking } from "@/lib/analytics";
import { loadSecurityCameraCatalog } from "@/lib/catalog/load-client-catalog";
import { resolveOfferUrl } from "@/lib/catalog/offer-url";
import { calculateSecurityCameraStorage, SecurityCameraStorageInputSchema } from "@/lib/quick-calculators/rules";
import { cameraOffersForCount } from "@/lib/security-camera/storage-offers";
import type { SecurityCameraCatalog } from "@/lib/security-camera/types";

interface StorageInput {
  cameraCount: number;
  averageBitrateMbps: number;
  recordingHoursPerDay: number;
  retentionDays: number;
  reservePercent: number;
}

const INITIAL_VALUES: StorageInput = {
  cameraCount: 2,
  averageBitrateMbps: 2,
  recordingHoursPerDay: 24,
  retentionDays: 14,
  reservePercent: 15,
};

const EXAMPLES: Array<{ label: string; detail: string; values: StorageInput }> = [
  { label: "Zwei Kameras rund um die Uhr", detail: "2 Mbit/s und 14 Tage", values: INITIAL_VALUES },
  { label: "Vier Kameras mit Ereignissen", detail: "4 Mbit/s und 8 Stunden täglich", values: { cameraCount: 4, averageBitrateMbps: 4, recordingHoursPerDay: 8, retentionDays: 30, reservePercent: 15 } },
  { label: "Sechs Kameras mit hoher Bitrate", detail: "8 Mbit/s und 30 Tage", values: { cameraCount: 6, averageBitrateMbps: 8, recordingHoursPerDay: 24, retentionDays: 30, reservePercent: 20 } },
];

export function SecurityCameraStorageCalculator() {
  const [input, setInput] = useState<StorageInput>(INITIAL_VALUES);
  const [catalog, setCatalog] = useState<SecurityCameraCatalog | null>(null);
  const [catalogStatus, setCatalogStatus] = useState<"loading" | "ready" | "error">("loading");
  const parsed = SecurityCameraStorageInputSchema.safeParse(input);
  const result = parsed.success ? calculateSecurityCameraStorage(parsed.data) : null;
  const cameraOffers = catalog && parsed.success ? cameraOffersForCount(catalog, parsed.data.cameraCount) : [];
  useProductResultTracking({ planner: "security-camera", ready: catalogStatus === "ready", matchCount: cameraOffers.length, technicalMatchCount: 0 });

  useEffect(() => {
    let active = true;
    loadSecurityCameraCatalog()
      .then((loadedCatalog) => {
        if (!active) return;
        setCatalog(loadedCatalog);
        setCatalogStatus("ready");
      })
      .catch(() => {
        if (active) setCatalogStatus("error");
      });
    return () => { active = false; };
  }, []);

  function update(key: keyof StorageInput, value: number) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return <section className="inline-calculator security-storage-calculator" aria-labelledby="security-storage-title">
    <div className="inline-calculator-heading">
      <div><p className="eyebrow">Speicherbedarf berechnen</p><h2 id="security-storage-title">Wie viel Platz brauchen deine Aufnahmen?</h2></div>
      <p>Die Rechnung verwendet die durchschnittliche Bitrate. Sie ist belastbarer als eine pauschale Annahme allein aus der Auflösung.</p>
    </div>
    <div className="inline-calculator-body">
      <div className="cost-example-picker" aria-label="Rechenbeispiele für Kameraspeicher">
        <div><strong>Beispiel laden</strong><span>Alle Werte bleiben frei veränderbar.</span></div>
        <div>{EXAMPLES.map((example) => <button type="button" key={example.label} onClick={() => setInput(example.values)}><strong>{example.label}</strong><span>{example.detail}</span></button>)}</div>
      </div>
      <div className="inline-inputs inline-inputs--cost">
        <StorageField id="storage-cameras" label="Anzahl der Kameras" value={input.cameraCount} unit="Kameras" min={1} max={64} step={1} onChange={(value) => update("cameraCount", value)} />
        <StorageField id="storage-bitrate" label="Durchschnittliche Bitrate je Kamera" value={input.averageBitrateMbps} unit="Mbit/s" min={0.1} max={100} step={0.1} onChange={(value) => update("averageBitrateMbps", value)} />
        <StorageField id="storage-hours" label="Aktive Aufnahme pro Tag" value={input.recordingHoursPerDay} unit="Stunden" min={0.1} max={24} step={0.1} onChange={(value) => update("recordingHoursPerDay", value)} />
        <StorageField id="storage-days" label="Gewünschte Aufbewahrung" value={input.retentionDays} unit="Tage" min={1} max={365} step={1} onChange={(value) => update("retentionDays", value)} />
        <StorageField id="storage-reserve" label="Reserve" value={input.reservePercent} unit="%" min={0} max={50} step={1} onChange={(value) => update("reservePercent", value)} />
      </div>
      <div className="inline-results inline-results--cost" aria-live="polite">
        <Result label="Je Kamera und Tag" value={result ? `${format(result.gigabytesPerCameraDay, 1)} GB` : "–"} />
        <Result label="Rechnerischer Bedarf" value={result ? formatCapacity(result.baseStorageGb) : "–"} />
        <Result label="Mit Reserve" value={result ? formatCapacity(result.recommendedStorageGb) : "–"} prominent />
        <Result label="Gesamte Videodatenrate" value={result ? `${format(result.aggregateBitrateMbps, 1)} Mbit/s` : "–"} />
      </div>
      <StorageInterpretation input={input} result={result} />
      <section className="storage-product-recommendations" aria-labelledby="storage-product-title">
        <p className="eyebrow">Geprüfte Tink Angebote</p>
        <h3 id="storage-product-title">Kameraangebote für {parsed.success ? parsed.data.cameraCount : "deine"} geplante {parsed.success && parsed.data.cameraCount === 1 ? "Kamera" : "Kameras"}</h3>
        <p>Die Reihenfolge berücksichtigt ausschließlich, wie genau die Setgröße zu deiner Kamerazahl passt. Einsatzort, Verbindung, Stromversorgung, Funktionen und Speicherkompatibilität sind hier nicht geprüft.</p>
        {catalogStatus === "loading" && <div className="storage-offer-state" role="status"><span className="loader" aria-hidden="true" /><p>Geprüfte Kameraangebote werden geladen.</p></div>}
        {catalogStatus === "error" && <div className="storage-offer-state"><strong>Die Kameraangebote konnten gerade nicht geladen werden.</strong><p>Der Speicherrechner funktioniert unabhängig davon. Im Kamera Finder kannst du die technischen Kriterien vollständig prüfen.</p></div>}
        {catalogStatus === "ready" && cameraOffers.length === 0 && <div className="storage-offer-state"><strong>Aktuell ist kein geprüftes Tink Angebot verfügbar.</strong><p>Der Speicherrechner bleibt ohne Produktverknüpfung nutzbar.</p></div>}
        {cameraOffers.length > 0 && <>
          <AffiliateDisclosure />
          <ExpandableProductList items={cameraOffers} ariaLabel="Tink Kameraangebote nach Setgröße" renderItem={({ product, offer, requiredSets, resultingCameraCount, estimatedTotalEur }, index) => <article className="product-card" key={product.id}>
            <div className="rank-badge">#{index + 1}</div>
            <ProductImage src={offer.imageUrl} alt={product.name} />
            <div className="product-content">
              <p className="product-brand">{product.brand ?? "Sicherheitskamera"}</p>
              <h3>{product.name}</h3>
              <dl className="product-facts">
                <div><dt>Setgröße</dt><dd>{product.cameraCount}</dd></div>
                <div><dt>Benötigte Angebote</dt><dd>{requiredSets}</dd></div>
                <div><dt>Kameras zusammen</dt><dd>{resultingCameraCount}</dd></div>
                <div><dt>Auflösung</dt><dd>{product.resolution.toUpperCase()}</dd></div>
              </dl>
              <p className="storage-offer-check">Vor dem Kauf bitte Einsatzort, Verbindung, Stromversorgung, Speicheroption und möglichen Basisstationsbedarf im Kamera Finder und beim Händler prüfen.</p>
              <p className="state-note">Rechnerischer Produktwert für {requiredSets} {requiredSets === 1 ? "Angebot" : "Angebote"} {estimatedTotalEur.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}. Versandbedingungen bei mehreren Bestellungen gesondert prüfen.</p>
              <div className="offer-row"><div><p className="merchant">Angebot von {offer.merchantName}</p><PriceDisplay offer={offer} /></div><AffiliateLink className="button button--primary" href={resolveOfferUrl(offer)} productId={product.id} pageSlug="sicherheitskamera-speicher-rechner" verticalRef="security-camera" merchantName={offer.merchantName}>Beim Händler ansehen <span aria-hidden="true">↗</span></AffiliateLink></div>
            </div>
          </article>} />
        </>}
      </section>
    </div>
    <p className="inline-calculator-note">Das Ergebnis ist eine Planungsschätzung. Prüfe die reale oder konfigurierte Durchschnittsbitrate, Vorlauf und Nachlauf bei Ereignissen, Tonspuren, Dateisystemreserve und die Angaben des konkreten Recorders. Es ist keine Zusage für eine bestimmte Aufbewahrungsdauer.</p>
  </section>;
}

function StorageInterpretation({ input, result }: { input: StorageInput; result: ReturnType<typeof calculateSecurityCameraStorage> | null }) {
  if (!result) return <div className="cost-interpretation"><strong>Eine Eingabe liegt außerhalb des gültigen Bereichs.</strong><p>Prüfe Kamerazahl, Bitrate, Aufnahmezeit, Tage und Reserve.</p></div>;
  if (input.recordingHoursPerDay < 24) return <div className="cost-interpretation"><strong>Die angenommene Ereigniszeit entscheidet über das Ergebnis.</strong><p>Deine Rechnung geht von {format(input.recordingHoursPerDay, 1)} aktiven Stunden je Tag aus. Miss diesen Wert möglichst über mehrere typische Tage und berücksichtige Vorlauf und Nachlauf.</p></div>;
  if (result.recommendedStorageTb >= 10) return <div className="cost-interpretation"><strong>Der Speicherbedarf ist für ein Heimsystem sehr groß.</strong><p>Prüfe Bitrate, Bildrate, Aufbewahrungszeit und die Möglichkeit unterschiedlicher Aufnahmeprofile. Eine niedrigere Bildqualität darf den gewünschten Erkennungszweck aber nicht zunichtemachen.</p></div>;
  return <div className="cost-interpretation"><strong>Die Rechnung bildet eine durchgehende Aufnahme ab.</strong><p>Mit {format(input.reservePercent, 0)} Prozent Reserve ergeben sich rund {format(result.recommendedStorageTb, 2)} TB. Kaufe nicht nach dieser Zahl allein, sondern gleiche sie mit den unterstützten Laufwerken und der nutzbaren Kapazität des Recorders ab.</p></div>;
}

function StorageField({ id, label, value, unit, min, max, step, onChange }: { id: string; label: string; value: number; unit: string; min: number; max: number; step: number; onChange: (value: number) => void }) {
  const invalid = !Number.isFinite(value) || value < min || value > max;
  return <div className="field"><label htmlFor={id}>{label}</label><div className="input-with-unit"><input id={id} type="number" inputMode="decimal" value={Number.isFinite(value) ? value : ""} min={min} max={max} step={step} aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.valueAsNumber)} /><span>{unit}</span></div>{invalid && <small className="field-error" id={`${id}-error`}>Bitte einen Wert zwischen {min.toLocaleString("de-DE")} und {max.toLocaleString("de-DE")} eingeben.</small>}</div>;
}

function Result({ label, value, prominent = false }: { label: string; value: string; prominent?: boolean }) {
  return <div className={prominent ? "inline-result--prominent" : undefined}><span>{label}</span><strong>{value}</strong></div>;
}

function formatCapacity(gigabytes: number) {
  return gigabytes >= 1000 ? `${format(gigabytes / 1000, 2)} TB` : `${format(gigabytes, 1)} GB`;
}

const format = (value: number, digits = 2) => value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });
