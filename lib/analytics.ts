"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import type { PlannerId } from "@/lib/planners";

type AnalyticsValue = string | number | boolean;
type AnalyticsProperties = Record<string, AnalyticsValue>;

declare global {
  interface WindowEventMap {
    "passendplanen:analytics": CustomEvent<{ name: string; properties: AnalyticsProperties }>;
  }
}

export function trackAnalyticsEvent(name: string, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent("passendplanen:analytics", { detail: { name, properties } }));

  try {
    track(name, properties);
  } catch {
    // Analytics must never interrupt a calculation or an outbound merchant link.
  }
}

export function useProductResultTracking({
  planner,
  ready,
  matchCount,
  technicalMatchCount = matchCount,
}: {
  planner: PlannerId;
  ready: boolean;
  matchCount: number;
  technicalMatchCount?: number;
}) {
  const previousKey = useRef<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    const key = `${planner}:${matchCount}:${technicalMatchCount}`;
    if (previousKey.current === key) return;
    previousKey.current = key;

    trackAnalyticsEvent(matchCount > 0 ? "products_shown" : "products_unavailable", {
      planner,
      match_count: matchCount,
      technical_match_count: technicalMatchCount,
    });
  }, [matchCount, planner, ready, technicalMatchCount]);
}
