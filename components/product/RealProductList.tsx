import type { RealPlannerProduct } from "@/lib/real-products";

export function RealProductList({ items }: { items: readonly RealPlannerProduct[] }) {
  return <section className="real-products" aria-label="Konkrete Produktbeispiele">
    <div className="result-heading"><div><p className="eyebrow">Konkrete Beispiele</p><h3>Passende Produkte bei deutschen Händlern</h3><p className="reference-products__intro">Diese redaktionelle Auswahl zeigt reale Artikel, die zum Themenbereich passen. Den aktuellen Preis und die Verfügbarkeit prüfst du direkt beim Händler.</p></div><span>Händlerauswahl</span></div>
    <div className="real-product-grid">{items.map((item) => <article className="real-product-card" key={item.id}>
      <div><p className="product-brand">{item.brand}</p><h4>{item.name}</h4><p>{item.description}</p></div>
      <div className="real-product-card__footer"><small>{item.merchantName}<br />Preis &amp; Verfügbarkeit beim Händler</small><a className="button button--secondary" href={item.url} target="_blank" rel="noopener noreferrer">Zum Händler ↗</a></div>
    </article>)}</div>
  </section>;
}
