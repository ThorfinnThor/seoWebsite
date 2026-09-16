"use client";

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { getPlannerSessionStorage, readPlannerState, writePlannerState } from "@/lib/planner/persistence";

export function usePlannerSessionState<T>(key: string, initialValue: T, parse: (value: unknown) => T | null): { value: T; setValue: Dispatch<SetStateAction<T>>; reset: () => void } {
  const [value, setStoredValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const changedBeforeHydration = useRef(false);

  const setValue = useCallback<Dispatch<SetStateAction<T>>>((nextValue) => {
    if (!hydrated) changedBeforeHydration.current = true;
    setStoredValue(nextValue);
  }, [hydrated]);

  useEffect(() => {
    const storage = getPlannerSessionStorage(window);
    const stored = storage ? readPlannerState(storage, key, parse) : null;
    if (stored !== null && !changedBeforeHydration.current) setStoredValue(stored);
    setHydrated(true);
  }, [key, parse]);

  useEffect(() => {
    const storage = getPlannerSessionStorage(window);
    if (hydrated && storage) writePlannerState(storage, key, value);
  }, [hydrated, key, value]);

  const reset = useCallback(() => {
    changedBeforeHydration.current = true;
    setStoredValue(initialValue);
    const storage = getPlannerSessionStorage(window);
    if (storage) writePlannerState(storage, key, initialValue);
  }, [initialValue, key]);

  return { value, setValue, reset };
}
