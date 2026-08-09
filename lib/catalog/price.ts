import type { OfferBase } from "./types";

export type BudgetStatus = "within" | "over" | "unknown";

export function landedPrice(offer: OfferBase): number | undefined {
  if (offer.deliveryCostStatus === "unknown") return undefined;
  return offer.priceEur + (offer.deliveryCostEur ?? 0);
}

export function budgetStatus(offer: OfferBase, budgetMaxEur: number): BudgetStatus {
  const total = landedPrice(offer);
  if (total === undefined) return offer.priceEur > budgetMaxEur ? "over" : "unknown";
  return total <= budgetMaxEur ? "within" : "over";
}

export function compareOffers(a: OfferBase, b: OfferBase): number {
  const aTotal = landedPrice(a);
  const bTotal = landedPrice(b);
  if (aTotal !== undefined && bTotal !== undefined) return aTotal - bTotal;
  if (aTotal !== undefined) return -1;
  if (bTotal !== undefined) return 1;
  return a.priceEur - b.priceEur;
}

export function formatEur(value: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
}
