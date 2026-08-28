import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { ProductImage } from "./ProductImage";
import { PriceDisplay } from "./PriceDisplay";
import type { FlooringMatch } from "@/lib/flooring/types";
import type { RobotMowerMatch } from "@/lib/robot-mower/types";
import type { IrrigationMatch } from "@/lib/irrigation/types";
import type { ProjectMatch } from "@/lib/project-products/types";
import { resolveOfferUrl } from "@/lib/catalog/offer-url";

type Match = RobotMowerMatch | FlooringMatch | IrrigationMatch | ProjectMatch;

export function CatalogMatchList({ matches, emptyLabel }: { matches: Match[]; emptyLabel: string }) {
  if (!matches.length) return <p className="info-box"><span aria-hidden="true">i</span><span>{emptyLabel}</span></p>;
  return <div className="product-list" aria-label="Passende geprüfte Angebote">{matches.map((match, index) => <article className="product-card" key={match.product.id}>
    <div className="rank-badge">#{index + 1}</div>
    <ProductImage src={match.offer.imageUrl} alt={match.product.name} />
    <div className="product-content">
      <div className="product-heading"><div><p className="product-brand">{match.product.brand ?? "PassendPlanen Auswahl"}</p><h3>{match.product.name}</h3></div><span className={`quality quality--${match.product.dataQuality}`}>{match.product.dataQuality === "curated" ? "Produktdaten geprüft" : "Teilweise geprüft"}</span></div>
      <div className="product-reasons">{match.reasons.map((reason) => <span key={reason.code} className={`reason reason--${reason.strength}`}>{reason.label}</span>)}</div>
      <div className="offer-row"><div><p className="merchant">Angebot von {match.offer.merchantName}</p><PriceDisplay offer={match.offer} /></div><AffiliateLink className="button button--primary" href={resolveOfferUrl(match.offer)} productId={match.product.id}>Beim Händler ansehen <span aria-hidden="true">↗</span></AffiliateLink></div>
      <p className="freshness">Preis und Verfügbarkeit: Stand {new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(new Date(match.offer.updatedAt))}. Bitte beim Händler prüfen.</p>
    </div>
  </article>)}</div>;
}
