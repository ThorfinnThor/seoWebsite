import type { RawFeedRow } from "./types";

const MAX_AUTO_FEEDS = 100;
const GERMAN_LANGUAGE = /^(?:de|de[-_]de|german|deutsch)$/i;

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
  language?: string;
  membershipStatus?: string;
}

export function parseFeedListRows(rows: RawFeedRow[]): FeedListEntry[] {
  const entries: FeedListEntry[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    const url = field(row, "url", "download_url", "download url", "feed_url", "feed url", "feed_download_url", "feed download url", "manual_download_url", "manual download url");
    if (!url || !isAllowedFeedUrl(url)) continue;
    const membershipStatus = field(row, "membership_status", "membership status", "status");
    if (membershipStatus && membershipStatus.trim().toLowerCase() !== "joined") continue;
    const language = field(row, "language", "feed_language", "feed language");
    if (language && !GERMAN_LANGUAGE.test(language)) continue;
    if (seen.has(url)) continue;
    seen.add(url);
    entries.push({
      url,
      advertiserId: field(row, "advertiser_id", "advertiser id"),
      advertiserName: field(row, "advertiser_name", "advertiser name"),
      feedId: field(row, "feed_id", "feed id"),
      language,
      membershipStatus,
    });
  }
  if (entries.length > MAX_AUTO_FEEDS) throw new Error(`Awin feed list contains more than ${MAX_AUTO_FEEDS} eligible feeds`);
  return entries;
}

export function isAllowedFeedUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && (url.hostname === "productdata.awin.com" || url.hostname === "datafeed.api.productserve.com");
  } catch {
    return false;
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
