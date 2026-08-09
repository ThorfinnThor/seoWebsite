"use client";

import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { readPlannerState, writePlannerState } from "@/lib/planner/persistence";

export function usePlannerSessionState<T>(key: string, initialValue: T, parse: (value: unknown) => T | null): { value: T; setValue: Dispatch<SetStateAction<T>>; reset: () => void } {
  const [value, setValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readPlannerState(window.sessionStorage, key, parse);
    if (stored !== null) setValue(stored);
    setHydrated(true);
  }, [key, parse]);

  useEffect(() => {
    if (hydrated) writePlannerState(window.sessionStorage, key, value);
  }, [hydrated, key, value]);

  const reset = useCallback(() => {
    setValue(initialValue);
    writePlannerState(window.sessionStorage, key, initialValue);
  }, [initialValue, key]);

  return { value, setValue, reset };
}
