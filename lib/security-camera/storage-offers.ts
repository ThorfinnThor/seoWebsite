import type { SecurityCameraCatalog, SecurityCameraProduct } from "@/lib/security-camera/types";
import type { OfferBase } from "@/lib/catalog/types";

export interface CameraCountOffer {
  product: SecurityCameraProduct;
  offer: OfferBase;
  requiredSets: number;
  resultingCameraCount: number;
  estimatedTotalEur: number;
}

export function cameraOffersForCount(catalog: SecurityCameraCatalog, requestedCameraCount: number): CameraCountOffer[] {
  const tinkOffers = new Map<string, OfferBase>();

  for (const offer of catalog.offers) {
    if (!offer.available || offer.merchantName.toLocaleLowerCase("de") !== "tink de") continue;
    if (offer.linkVerificationStatus && !["verified", "redirect-ok"].includes(offer.linkVerificationStatus)) continue;
    const current = tinkOffers.get(offer.productId);
    if (!current || offer.priceEur < current.priceEur) tinkOffers.set(offer.productId, offer);
  }

  return catalog.products.flatMap((product) => {
    const offer = tinkOffers.get(product.id);
    if (!product.reviewed || !offer) return [];
    const requiredSets = Math.ceil(requestedCameraCount / product.cameraCount);
    const resultingCameraCount = requiredSets * product.cameraCount;
    return [{
      product,
      offer,
      requiredSets,
      resultingCameraCount,
      estimatedTotalEur: Math.round(requiredSets * offer.priceEur * 100) / 100,
    }];
  }).sort((left, right) =>
    left.resultingCameraCount - requestedCameraCount - (right.resultingCameraCount - requestedCameraCount)
    || left.requiredSets - right.requiredSets
    || left.estimatedTotalEur - right.estimatedTotalEur
    || left.product.name.localeCompare(right.product.name, "de"),
  );
}
