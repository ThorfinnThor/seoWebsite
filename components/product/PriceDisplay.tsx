import type { OfferBase } from "@/lib/catalog/types";
import { formatEur, landedPrice } from "@/lib/catalog/price";

export function PriceDisplay({ offer }: { offer: OfferBase }) {
  const total = landedPrice(offer);
  if (offer.deliveryCostStatus === "unknown") {
    return <div className="price"><strong>ab {formatEur(offer.priceEur)}</strong><span>zzgl. Versand – beim Händler prüfen</span></div>;
  }
  if (offer.deliveryCostStatus === "free") {
    return <div className="price"><strong>{formatEur(offer.priceEur)}</strong><span>inkl. Versand</span></div>;
  }
  return <div className="price"><strong>{formatEur(total ?? offer.priceEur)}</strong><span>{formatEur(offer.priceEur)} + {formatEur(offer.deliveryCostEur ?? 0)} Versand</span></div>;
}
