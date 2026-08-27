import type { ReferenceProduct } from "@/lib/reference-products";

interface ReferenceProductListProps {
  items: readonly ReferenceProduct[];
  title?: string;
  description?: string;
}

/**
 * Shows the product building blocks behind a planner before a reviewed
 * merchant feed is available. It deliberately has no outbound link or price.
 */
export function ReferenceProductList({
  items,
  title = "Passende Produktbausteine",
  description = "Diese Bausteine leiten sich direkt aus deinem Plan ab. Händlerangebote, Preise und Affiliate-Links werden nach der Feed-Prüfung ergänzt.",
}: ReferenceProductListProps) {
  return (
    <section className="reference-products" aria-label={title}>
      <div className="result-heading">
        <div>
          <p className="eyebrow">Auswahlbasis</p>
          <h3>{title}</h3>
          <p className="reference-products__intro">{description}</p>
        </div>
        <span>Feed folgt</span>
      </div>
      <div className="reference-product-grid">
        {items.map((item) => (
          <article className="reference-product-card" key={item.id}>
            <span className="reference-product-icon" aria-hidden="true">+</span>
            <div>
              <p className="eyebrow">{item.category}</p>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <strong>{item.quantity ?? "Menge nach Auslegung"}</strong>
              <small>{item.planningNote}</small>
              <span className="reference-product-status">Händlerangebot folgt nach Feed-Anbindung</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
