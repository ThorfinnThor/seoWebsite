export const GA_MEASUREMENT_ID = "G-Q8FZ5Z7V04";
export const CONSENT_STORAGE_KEY = "pp-consent-v1";
export const OPEN_CONSENT_EVENT = "passendplanen:open-consent";

export type ConsentChoice = "granted" | "denied";

export interface ConsentStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function getConsentStorage(scope: { readonly localStorage: ConsentStorage }): ConsentStorage | null {
  try {
    return scope.localStorage;
  } catch {
    // Sandboxed iframes and strict privacy modes throw on storage access.
    return null;
  }
}

export function readConsent(storage: ConsentStorage | null): ConsentChoice | null {
  if (!storage) return null;
  try {
    const value = storage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(storage: ConsentStorage | null, choice: ConsentChoice) {
  if (!storage) return;
  try {
    storage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // The choice still applies for the current page view.
  }
}

/** Embeds (dedicated route or any iframe) never show the banner and never load analytics. */
export function isEmbeddedContext(pathname: string, isTopWindow: boolean) {
  return !isTopWindow || pathname === "/embed" || pathname.startsWith("/embed/");
}

/** Names of Google Analytics cookies present in a document.cookie string. */
export function analyticsCookieNames(cookieString: string) {
  return cookieString
    .split(";")
    .map((part) => part.split("=")[0]?.trim() ?? "")
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name === "_gat" || name.startsWith("_gat_"));
}

/** Cookie domains GA may have used: host-only, the host itself and every parent domain. */
export function analyticsCookieDomains(hostname: string) {
  const labels = hostname.split(".");
  const domains: (string | null)[] = [null];
  for (let index = 0; index < labels.length - 1; index += 1) domains.push(`.${labels.slice(index).join(".")}`);
  return domains;
}

export function deleteAnalyticsCookies(doc: { cookie: string }, hostname: string) {
  for (const name of analyticsCookieNames(doc.cookie)) {
    for (const domain of analyticsCookieDomains(hostname)) {
      doc.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}; SameSite=Lax`;
    }
  }
}
