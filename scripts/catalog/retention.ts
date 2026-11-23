import { z } from "zod";
import type { OfferBase, ProductBase, StaticCatalog } from "@/lib/catalog/types";
import type { AffiliateCandidate } from "@/scripts/awin/types";
import { catalogRegression } from "./safeguards";

/** Days an offer must be missing from a readable feed before it is dropped after a large decline. */
export const ABSENCE_DAYS = 3;
/** Same, when more than half of a catalog's offers disappear at once. */
export const MASS_ABSENCE_DAYS = 7;
const MASS_LOSS_SHARE = 0.5;
const REJECTING_ISSUES = new Set(["semantic-kind-mismatch", "suspicious-price", "price-outlier", "suspicious-dimension", "suspicious-capacity", "identity-mismatch", "not-found"]);

export const AbsenceStateSchema = z.object({
  schemaVersion: z.literal(1),
  verticals: z.record(z.string(), z.record(z.string(), z.object({ since: z.iso.date(), lastSeenMissing: z.iso.date(), days: z.number().int().positive() }))),
});
export type AbsenceState = z.infer<typeof AbsenceStateSchema>;
type Absences = AbsenceState["verticals"][string];

export interface FeedEvidence {
  /** Rows read per merchant in this run. */
  rowsByMerchant: ReadonlyMap<string, number>;
  /** Merchants whose feed broke off while reading. */
  failedMerchants: ReadonlySet<string>;
  /** Previously published offers, as `merchantId:merchantProductId`, that were in a feed in this run. */
  seenOfferKeys: ReadonlySet<string>;
  /** Merchants switched off in data/manual/merchants.json. */
  disabledMerchants: ReadonlySet<string>;
}

/**
 * absent: readable feed, product no longer listed (assortment change).
 * feed-unavailable: no rows from this merchant, nothing can be concluded.
 * rejected: the merchant still lists it, but our importer no longer publishes it.
 */
export type AbsenceReason = "absent" | "feed-unavailable" | "rejected";
export interface RetainedOffer { offerId: string; productName: string; merchantName: string; reason: AbsenceReason; days: number }
export interface RetentionResult<T> {
  catalog: T;
  absences: Absences;
  regression?: string;
  retained: RetainedOffer[];
  dropped: RetainedOffer[];
  /** True if the decline needs a person: feed outage, importer change, or a mass loss. */
  critical: boolean;
}

/** Catalogs sorted by ID stay sorted; the project catalog keeps its own ranking and gets carried products appended. */
function inPreviousOrder<TProduct extends ProductBase>(products: TProduct[], previous: TProduct[]): TProduct[] {
  const sorted = previous.every((product, index) => index === 0 || previous[index - 1].id.localeCompare(product.id) <= 0);
  return sorted ? products.sort((a, b) => a.id.localeCompare(b.id)) : products;
}

export function offerKey(merchantId: string, merchantProductId: string): string { return `${merchantId}:${merchantProductId}`; }

interface RetentionInput<TProduct extends ProductBase, T extends StaticCatalog<TProduct, OfferBase>> {
  next: T;
  previous: T;
  candidates: AffiliateCandidate<TProduct>[];
  /** Products an override deliberately keeps unpublished. */
  withheldProductIds: ReadonlySet<string>;
  evidence: FeedEvidence;
  absences: Absences;
  /** Applies current overrides to a product carried over from the previous catalog. */
  refresh?: (product: TProduct) => TProduct;
  /** Calendar day of this run, YYYY-MM-DD. */
  today: string;
}

/**
 * Feeds rotate: a product can be missing for a day and return the next. If a
 * catalog drops past the safeguard, keep the fresh data and carry over what is
 * missing until it has been absent for several days, instead of rejecting the
 * whole catalog and freezing every price in it.
 */
export function retainMissingOffers<TProduct extends ProductBase, T extends StaticCatalog<TProduct, OfferBase>>(input: RetentionInput<TProduct, T>): RetentionResult<T> {
  const { next, previous, candidates, withheldProductIds, evidence, absences, today, refresh = (product) => product } = input;
  const regression = catalogRegression(next, previous) ?? (previous.products.length > 0 && next.products.length === 0 ? `All ${previous.products.length} products disappeared` : undefined);
  if (!regression) return { catalog: next, absences: {}, retained: [], dropped: [], critical: false };

  const nextOfferIds = new Set(next.offers.map((offer) => offer.id));
  const nextProductIds = new Set(next.products.map((product) => product.id));
  const nextListings = new Set(next.offers.map((offer) => `${offer.productId}|${offer.merchantId}`));
  const previousProducts = new Map(previous.products.map((product) => [product.id, product]));
  const candidatesByOffer = new Map(candidates.flatMap((candidate) => candidate.offer ? [[candidate.offer.id, candidate] as const] : []));
  const candidatesById = new Map<string, AffiliateCandidate<TProduct>[]>();
  for (const candidate of candidates) candidatesById.set(candidate.id, [...(candidatesById.get(candidate.id) ?? []), candidate]);

  const missing: Array<{ offer: OfferBase; fresh?: OfferBase; product: TProduct; reason: AbsenceReason; days: number }> = [];
  const nextAbsences: Absences = {};
  for (const offer of previous.offers) {
    if (nextOfferIds.has(offer.id)) continue;
    const product = previousProducts.get(offer.productId);
    if (!product || withheldProductIds.has(product.id) || evidence.disabledMerchants.has(offer.merchantId)) continue;
    // The merchant lists the same product under a new article number.
    if (nextListings.has(`${offer.productId}|${offer.merchantId}`)) continue;
    const listed = candidatesByOffer.get(offer.id);
    // Still imported, but deliberately not selected (catalog cap, variant choice).
    if (listed && (listed.issues.length === 0 || nextProductIds.has(listed.id))) continue;
    const issues = listed?.issues ?? (candidatesById.get(product.id) ?? []).flatMap((candidate) => candidate.offer ? [] : candidate.issues);
    if (issues.some((issue) => REJECTING_ISSUES.has(issue))) continue;

    const unavailable = evidence.failedMerchants.has(offer.merchantId) || !evidence.rowsByMerchant.get(offer.merchantId);
    const seen = Boolean(listed) || evidence.seenOfferKeys.has(offerKey(offer.merchantId, offer.merchantProductId));
    const reason: AbsenceReason = seen ? "rejected" : unavailable ? "feed-unavailable" : "absent";
    const known = absences[offer.id];
    const days = reason !== "absent" ? known?.days ?? 0 : known ? known.days + (known.lastSeenMissing === today ? 0 : 1) : 1;
    if (days > 0) nextAbsences[offer.id] = { since: known?.since ?? today, lastSeenMissing: reason === "absent" ? today : known?.lastSeenMissing ?? today, days };
    missing.push({ offer, fresh: listed?.offer ? { ...listed.offer, productId: product.id } : undefined, product, reason, days });
  }

  const absentCount = missing.filter((entry) => entry.reason === "absent").length;
  const massLoss = absentCount > previous.offers.length * MASS_LOSS_SHARE;
  const requiredDays = massLoss ? MASS_ABSENCE_DAYS : ABSENCE_DAYS;
  const expired = missing.filter((entry) => entry.reason === "absent" && entry.days >= requiredDays);
  // A catalog never empties itself; that always needs a person.
  const wouldEmpty = next.products.length === 0 && expired.length === missing.length;
  const dropped = wouldEmpty ? [] : expired;
  const droppedIds = new Set(dropped.map((entry) => entry.offer.id));
  for (const id of droppedIds) delete nextAbsences[id];
  const kept = missing.filter((entry) => !droppedIds.has(entry.offer.id));

  const keptProductIds = new Set(kept.map((entry) => entry.product.id));
  const carriedProducts = previous.products.filter((product) => keptProductIds.has(product.id) && !nextProductIds.has(product.id)).map(refresh);
  const catalog = {
    ...next,
    products: inPreviousOrder([...next.products, ...carriedProducts], previous.products),
    offers: [...next.offers, ...kept.map((entry) => entry.fresh ?? entry.offer)].sort((a, b) => a.id.localeCompare(b.id)),
  };
  const describe = (entry: (typeof missing)[number]): RetainedOffer => ({ offerId: entry.offer.id, productName: entry.product.name, merchantName: entry.offer.merchantName, reason: entry.reason, days: entry.days });
  return {
    catalog,
    absences: nextAbsences,
    regression,
    retained: kept.map(describe),
    dropped: dropped.map(describe),
    critical: massLoss || wouldEmpty || missing.some((entry) => entry.reason !== "absent") || next.products.length === 0,
  };
}
