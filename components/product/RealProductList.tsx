import type { RealPlannerProduct } from "@/lib/real-products";

export function RealProductList({ items }: { items: readonly RealPlannerProduct[] }) {
  return <section className="real-products" aria-label="Aktuelle Beispielprodukte">
    <div className="result-heading"><div><p className="eyebrow">Aktuelle Beispiele</p><h3>Reale Produkte aus deutschen Händlerfeeds</h3><p className="reference-products__intro">Diese Auswahl zeigt konkrete Artikel, die zum Themenbereich passen. Preis und Verfügbarkeit sind Momentaufnahmen und werden vor dem Kauf beim Händler geprüft.</p></div><span>Live-Daten</span></div>
    <div className="real-product-grid">{items.map((item) => <article className="real-product-card" key={item.id}>
      <div><p className="product-brand">{item.brand}</p><h4>{item.name}</h4><p>{item.description}</p></div>
      <div className="real-product-card__footer"><div><strong>{item.priceEur.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</strong><small>{item.merchantName} · Preis aus Händlerfeed, bitte vor Kauf prüfen</small></div><a className="button button--secondary" href={item.url} target="_blank" rel="noopener noreferrer">Zum Händler ↗</a></div>
    </article>)}</div>
  </section>;
}
