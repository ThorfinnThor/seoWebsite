"use client";

import { useCallback, useRef, type Dispatch, type SetStateAction } from "react";

export function usePlannerStepTransition(setStep: Dispatch<SetStateAction<number>>) {
  const locked = useRef(false);

  return useCallback((nextStep: number) => {
    if (locked.current) return false;
    locked.current = true;
    setStep(nextStep);
    window.setTimeout(() => { locked.current = false; }, 250);
    return true;
  }, [setStep]);
}
