"use client";

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { readPlannerState, writePlannerState } from "@/lib/planner/persistence";

export function usePlannerSessionState<T>(key: string, initialValue: T, parse: (value: unknown) => T | null): { value: T; setValue: Dispatch<SetStateAction<T>>; reset: () => void } {
  const [value, setStoredValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const changedBeforeHydration = useRef(false);

  const setValue = useCallback<Dispatch<SetStateAction<T>>>((nextValue) => {
    if (!hydrated) changedBeforeHydration.current = true;
    setStoredValue(nextValue);
  }, [hydrated]);

  useEffect(() => {
    const stored = readPlannerState(window.sessionStorage, key, parse);
    if (stored !== null && !changedBeforeHydration.current) setStoredValue(stored);
    setHydrated(true);
  }, [key, parse]);

  useEffect(() => {
    if (hydrated) writePlannerState(window.sessionStorage, key, value);
  }, [hydrated, key, value]);

  const reset = useCallback(() => {
    changedBeforeHydration.current = true;
    setStoredValue(initialValue);
    writePlannerState(window.sessionStorage, key, initialValue);
  }, [initialValue, key]);

  return { value, setValue, reset };
}
