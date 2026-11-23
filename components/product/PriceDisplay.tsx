import type { OfferBase } from "@/lib/catalog/types";
import { formatEur, landedPrice } from "@/lib/catalog/price";

const STALE_AFTER_DAYS = 14;

/** Feed prices change daily. After two weeks the number is only a rough guide. */
function isStale(updatedAt: string) {
  return Date.now() - new Date(updatedAt).getTime() > STALE_AFTER_DAYS * 24 * 60 * 60 * 1000;
}

export function PriceDisplay({ offer }: { offer: OfferBase }) {
  const total = landedPrice(offer);
  if (isStale(offer.updatedAt)) {
    const date = new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long" }).format(new Date(offer.updatedAt));
    return <div className="price price--stale"><strong>zuletzt {formatEur(offer.priceEur)}</strong><span>Stand {date}, aktueller Preis beim Händler</span></div>;
  }
  if (offer.deliveryCostStatus === "unknown") {
    return <div className="price"><strong>ab {formatEur(offer.priceEur)}</strong><span>zzgl. Versand – beim Händler prüfen</span></div>;
  }
  if (offer.deliveryCostStatus === "free") {
    return <div className="price"><strong>{formatEur(offer.priceEur)}</strong><span>inkl. Versand</span></div>;
  }
  return <div className="price"><strong>{formatEur(total ?? offer.priceEur)}</strong><span>{formatEur(offer.priceEur)} + {formatEur(offer.deliveryCostEur ?? 0)} Versand</span></div>;
}
