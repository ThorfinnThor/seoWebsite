import type { OfferBase } from "@/lib/catalog/types";

/**
 * Keeps the product UI independent from monetisation. Direct merchant URLs
 * are the default while links are being reviewed; setting
 * NEXT_PUBLIC_USE_AFFILIATE_LINKS=true switches every offer to its Awin URL.
 */
export function resolveOfferUrl(offer: OfferBase): string {
  return process.env.NEXT_PUBLIC_USE_AFFILIATE_LINKS === "true" || !offer.merchantUrl
    ? offer.affiliateUrl
    : offer.merchantUrl;
}
