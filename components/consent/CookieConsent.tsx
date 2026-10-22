"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  GA_MEASUREMENT_ID,
  OPEN_CONSENT_EVENT,
  type ConsentChoice,
  deleteAnalyticsCookies,
  getConsentStorage,
  isEmbeddedContext,
  readConsent,
  writeConsent,
} from "@/lib/consent";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }

  interface WindowEventMap {
    [OPEN_CONSENT_EVENT]: Event;
  }
}

const GA_DISABLE_KEY = `ga-disable-${GA_MEASUREMENT_ID}`;
const DENIED_DEFAULTS = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

function ensureGtag(): Gtag {
  if (window.gtag) return window.gtag;
  window.dataLayer = window.dataLayer ?? [];
  // gtag.js expects the arguments object itself, not an array copy.
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", DENIED_DEFAULTS);
  return window.gtag;
}

/** Only runs after an explicit "Akzeptieren"; before that no Google script or request exists. */
function enableAnalytics() {
  (window as unknown as Record<string, unknown>)[GA_DISABLE_KEY] = false;
  const gtag = ensureGtag();
  gtag("consent", "update", { analytics_storage: "granted" });

  if (document.getElementById("ga4-gtag")) {
    gtag("event", "page_view");
    return;
  }

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  const script = document.createElement("script");
  script.id = "ga4-gtag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

function disableAnalytics() {
  (window as unknown as Record<string, unknown>)[GA_DISABLE_KEY] = true;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  deleteAnalyticsCookies(document, window.location.hostname);
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice | null>(null);

  useEffect(() => {
    if (isEmbeddedContext(window.location.pathname, window.self === window.top)) return;

    const stored = readConsent(getConsentStorage(window));
    setChoice(stored);
    if (stored === "granted") enableAnalytics();
    else setOpen(stored === null);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  const decide = useCallback((next: ConsentChoice) => {
    writeConsent(getConsentStorage(window), next);
    setChoice(next);
    setOpen(false);
    if (next === "granted") enableAnalytics();
    else disableAnalytics();
  }, []);

  if (!open) return null;

  return (
    <section className="cookie-consent" role="dialog" aria-modal="false" aria-labelledby="cookie-consent-title" aria-describedby="cookie-consent-text">
      <h2 id="cookie-consent-title">Cookie-Einstellungen</h2>
      <p id="cookie-consent-text">
        Mit deiner Einwilligung nutzen wir Google Analytics, um die Reichweite zu messen und zu verstehen, welche Seiten und Planer hilfreich sind. Dabei setzt Google Cookies und Daten können in die USA übertragen werden. Ohne Einwilligung wird Google Analytics nicht geladen. Du kannst deine Wahl jederzeit über „Cookie-Einstellungen“ im Footer ändern. Mehr dazu in der <Link href="/datenschutz/#google-analytics">Datenschutzerklärung</Link>.
      </p>
      {choice ? <p className="cookie-consent__status">Aktuelle Wahl: {choice === "granted" ? "Google Analytics erlaubt" : "Google Analytics abgelehnt"}</p> : null}
      <div className="cookie-consent__actions">
        <button type="button" className="button cookie-consent__choice" onClick={() => decide("denied")}>Ablehnen</button>
        <button type="button" className="button cookie-consent__choice" onClick={() => decide("granted")}>Akzeptieren</button>
      </div>
    </section>
  );
}

export function CookieSettingsButton() {
  return (
    <button type="button" className="footer-cookie-settings" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      Cookie-Einstellungen
    </button>
  );
}
