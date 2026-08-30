import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { ProductImage } from "./ProductImage";
import { ProductReasons } from "./ProductReasons";
import { PriceDisplay } from "./PriceDisplay";
import type { GardenHouseMatch } from "@/lib/garden-house/types";
import { resolveOfferUrl } from "@/lib/catalog/offer-url";

const MATERIAL = { wood: "Holz", metal: "Metall", plastic: "Kunststoff" } as const;

export function ProductCard({ match, position }: { match: GardenHouseMatch; position: number }) {
  const { product, offer } = match;
  return (
    <article className="product-card">
      <div className="rank-badge">#{position}</div>
      <ProductImage src={offer.imageUrl} alt={product.name} />
      <div className="product-content">
        <div className="product-heading">
          <div><p className="product-brand">{product.brand ?? "Gartenhaus"}</p><h3>{product.name}</h3></div>
          <span className={`quality quality--${product.dataQuality}`}>{product.dataQuality === "curated" ? "Produktdaten geprüft" : "Teilweise geprüft"}</span>
        </div>
        <dl className="product-facts">
          <div><dt>Maße</dt><dd>{product.widthCm} × {product.depthCm} cm{match.rotated ? " (gedreht)" : ""}</dd></div>
          <div><dt>Fläche</dt><dd>{product.footprintM2.toLocaleString("de-DE")} m²</dd></div>
          <div><dt>Material</dt><dd>{MATERIAL[product.material]}</dd></div>
          <div><dt>Boden</dt><dd>{product.floorIncluded ? "enthalten" : product.floorKitAvailable ? "Set erhältlich" : "nicht bestätigt"}</dd></div>
        </dl>
        <ProductReasons reasons={match.reasons} />
        <div className="offer-row">
          <div><p className="merchant">Angebot von {offer.merchantName}</p><PriceDisplay offer={offer} /></div>
          <AffiliateLink className="button button--primary" href={resolveOfferUrl(offer)} productId={product.id} verticalRef="garden-house" merchantName={offer.merchantName}>Beim Händler ansehen <span aria-hidden="true">↗</span></AffiliateLink>
        </div>
        <p className="freshness">Preis und Verfügbarkeit: Stand {new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(new Date(offer.updatedAt))}. Bitte beim Händler prüfen.</p>
      </div>
    </article>
  );
}
