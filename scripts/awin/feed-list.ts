import type { RawFeedRow } from "./types";

const MAX_AUTO_FEEDS = 100;
const GERMAN_LANGUAGE = /^(?:de|de[-_]de|german|deutsch)$/i;
const ELIGIBLE_MEMBERSHIP_STATUSES = new Set(["active", "joined"]);
const DARWIN_FEED_PATH = /^\/productdata-darwin-download\/publisher\/\d+\/[A-Za-z0-9_-]+\/\d+\/feed\/F?\d+\.csv\.gz$/;

function normalizedKey(key: string): string {
  return key.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function field(row: RawFeedRow, ...keys: string[]): string | undefined {
  const wanted = new Set(keys.map(normalizedKey));
  const key = Object.keys(row).find((candidate) => wanted.has(normalizedKey(candidate)));
  const value = key ? row[key] : undefined;
  return value?.trim() || undefined;
}

export interface FeedListEntry {
  url: string;
  advertiserId?: string;
  advertiserName?: string;
  feedId?: string;
  feedName?: string;
  language?: string;
  membershipStatus?: string;
  lastUpdated?: string;
  productCount?: number;
}

/** Keep feed-list discovery limited to advertisers explicitly enabled for this site. */
export function filterFeedListEntries(entries: FeedListEntry[], allowedAdvertiserIds: ReadonlySet<string>): FeedListEntry[] {
  return entries.filter((entry) => entry.advertiserId !== undefined && allowedAdvertiserIds.has(entry.advertiserId));
}

function feedTimestamp(raw?: string): number {
  if (!raw) return 0;
  const german = raw.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})(?:\D|$)/);
  if (german) return Date.UTC(Number(german[3]), Number(german[2]) - 1, Number(german[1]));
  const parsed = Date.parse(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Select one deterministic, current feed per advertiser to avoid stale duplicate offers. */
export function selectPreferredFeedEntries(entries: FeedListEntry[]): FeedListEntry[] {
  const preferred = new Map<string, FeedListEntry>();
  const compare = (left: FeedListEntry, right: FeedListEntry) =>
    feedTimestamp(left.lastUpdated) - feedTimestamp(right.lastUpdated)
    || (left.productCount ?? 0) - (right.productCount ?? 0)
    || Number(left.feedId ?? 0) - Number(right.feedId ?? 0)
    || right.url.localeCompare(left.url);
  for (const entry of entries) {
    const key = entry.advertiserId ?? entry.url;
    const current = preferred.get(key);
    if (!current || compare(entry, current) > 0) preferred.set(key, entry);
  }
  return [...preferred.values()];
}

export function parseFeedListRows(rows: RawFeedRow[]): FeedListEntry[] {
  const entries: FeedListEntry[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    const rawUrl = field(row, "url", "download_url", "download url", "feed_url", "feed url", "feed_download_url", "feed download url", "manual_download_url", "manual download url");
    const url = rawUrl ? normalizeFeedUrl(rawUrl) : undefined;
    if (!url) continue;
    const membershipStatus = field(row, "membership_status", "membership status", "status");
    if (membershipStatus && !ELIGIBLE_MEMBERSHIP_STATUSES.has(membershipStatus.trim().toLowerCase())) continue;
    const language = field(row, "language", "feed_language", "feed language");
    if (language && !GERMAN_LANGUAGE.test(language)) continue;
    if (seen.has(url)) continue;
    seen.add(url);
    entries.push({
      url,
      advertiserId: field(row, "advertiser_id", "advertiser id"),
      advertiserName: field(row, "advertiser_name", "advertiser name"),
      feedId: field(row, "feed_id", "feed id"),
      feedName: field(row, "datafeed_name", "datafeed name", "feed_name", "feed name"),
      language,
      membershipStatus,
      lastUpdated: field(row, "last_update", "last update", "last_updated", "last updated"),
      productCount: Number(field(row, "products", "product_count", "product count")?.replace(/[^\d]/g, "")) || undefined,
    });
  }
  if (entries.length > MAX_AUTO_FEEDS) throw new Error(`Awin feed list contains more than ${MAX_AUTO_FEEDS} eligible feeds`);
  return entries;
}

export function isAllowedFeedUrl(raw: string): boolean {
  return normalizeFeedUrl(raw) !== undefined;
}

/**
 * Awin's feed-list endpoint can still return its legacy Productserve download
 * host with an http:// URL. The same endpoint supports HTTPS, so upgrade that
 * trusted legacy URL before it is stored or fetched. All other hosts remain
 * HTTPS-only and are rejected.
 */
export function normalizeFeedUrl(raw: string): string | undefined {
  try {
    const url = new URL(raw);
    if (url.username || url.password || url.port || url.hash) return undefined;
    if (url.hostname === "productdata.awin.com" && url.protocol === "https:") return url.toString();
    if (url.hostname === "datafeed.api.productserve.com" && (url.protocol === "http:" || url.protocol === "https:")) {
      url.protocol = "https:";
      return url.toString();
    }
    if (url.hostname === "ui.awin.com" && url.protocol === "https:" && !url.search && DARWIN_FEED_PATH.test(url.pathname)) {
      return url.toString();
    }
    return undefined;
  } catch {
    return undefined;
  }
}

export function isFeedListUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && url.hostname === "ui.awin.com" && /feedlist$/i.test(url.pathname);
  } catch {
    return false;
  }
}

export function extractFeedListUrl(raw: string): string | undefined {
  const trimmed = raw.trim();
  if (isFeedListUrl(trimmed)) return trimmed;
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (typeof parsed === "string" && isFeedListUrl(parsed)) return parsed;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const candidate = (parsed as Record<string, unknown>).feedList ?? (parsed as Record<string, unknown>).feedListUrl;
      if (typeof candidate === "string" && isFeedListUrl(candidate)) return candidate;
    }
  } catch {
    // The normal direct-feed parser will report malformed JSON/config details.
  }
  return undefined;
}
