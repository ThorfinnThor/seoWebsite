import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { ProductImage } from "./ProductImage";
import { PriceDisplay } from "./PriceDisplay";
import type { FlooringMatch } from "@/lib/flooring/types";
import type { RobotMowerMatch } from "@/lib/robot-mower/types";
import type { IrrigationMatch } from "@/lib/irrigation/types";
import type { ProjectMatch } from "@/lib/project-products/types";
import { resolveOfferUrl } from "@/lib/catalog/offer-url";
import type { PlannerId } from "@/lib/planners";

type Match = RobotMowerMatch | FlooringMatch | IrrigationMatch | ProjectMatch;

export function CatalogMatchList({ matches, emptyLabel, planner }: { matches: Match[]; emptyLabel: string; planner: PlannerId }) {
  if (!matches.length) return <p className="info-box"><span aria-hidden="true">i</span><span>{emptyLabel}</span></p>;
  return <div className="product-list" aria-label="Passende geprüfte Angebote">{matches.map((match, index) => <article className="product-card" key={match.product.id}>
    <div className="rank-badge">#{index + 1}</div>
    <ProductImage src={match.offer.imageUrl} alt={match.product.name} />
    <div className="product-content">
      <div className="product-heading"><div><p className="product-brand">{match.product.brand ?? "PassendPlanen Auswahl"}</p><h3>{match.product.name}</h3></div><span className={`quality quality--${match.product.dataQuality}`}>{match.product.dataQuality === "curated" ? "Produktdaten geprüft" : "Teilweise geprüft"}</span></div>
      <div className="product-reasons">{match.reasons.map((reason) => <span key={reason.code} className={`reason reason--${reason.strength}`}>{reason.label}</span>)}</div>
      {"orderEstimate" in match && match.orderEstimate && <dl className="product-facts"><div><dt>Benötigt</dt><dd>{match.orderEstimate.requiredUnits.toLocaleString("de-DE")} {match.orderEstimate.unitLabel}</dd></div><div><dt>Zu bestellen</dt><dd>{match.orderEstimate.packageCount.toLocaleString("de-DE")} {match.orderEstimate.packageCount === 1 ? "Paket/Einheit" : "Pakete/Einheiten"}</dd></div><div><dt>Bestellmenge</dt><dd>{match.orderEstimate.orderedUnits.toLocaleString("de-DE")} {match.orderEstimate.unitLabel}{match.orderEstimate.overage > 0 ? ` (${match.orderEstimate.overage.toLocaleString("de-DE")} Reserve/Übermenge)` : ""}</dd></div><div><dt>Geschätzter Warenwert</dt><dd>{match.orderEstimate.materialSubtotalEur.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}{match.orderEstimate.estimatedTotalEur !== undefined && match.orderEstimate.estimatedTotalEur !== match.orderEstimate.materialSubtotalEur ? `, mit Versand ${match.orderEstimate.estimatedTotalEur.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}` : ""}</dd></div></dl>}
      <div className="offer-row"><div><p className="merchant">Angebot von {match.offer.merchantName}</p><PriceDisplay offer={match.offer} /></div><AffiliateLink className="button button--primary" href={resolveOfferUrl(match.offer)} productId={match.product.id} verticalRef={planner} merchantName={match.offer.merchantName}>Beim Händler ansehen <span aria-hidden="true">↗</span></AffiliateLink></div>
      <p className="freshness">Preis und Verfügbarkeit: Stand {new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(new Date(match.offer.updatedAt))}. Bitte beim Händler prüfen.</p>
    </div>
  </article>)}</div>;
}
