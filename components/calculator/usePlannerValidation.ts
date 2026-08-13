"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { findInvalidPlannerStep, focusFirstInvalidField, issuesToFieldErrors, type PlannerFieldErrors } from "@/lib/planner-validation";

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: Parameters<typeof issuesToFieldErrors>[0] };

type PlannerSchema<T> = { safeParse: (value: unknown) => ValidationResult<T> };

export function usePlannerValidation<T>({
  input,
  setInput,
  schema,
  fieldIds,
  stepFields,
  step,
  setStep,
}: {
  input: T;
  setInput: Dispatch<SetStateAction<T>>;
  schema: PlannerSchema<T>;
  fieldIds: Partial<Record<string, string>>;
  stepFields: Partial<Record<number, readonly string[]>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const [fieldErrors, setFieldErrors] = useState<PlannerFieldErrors>({});
  const [formError, setFormError] = useState("");
  const parsed = schema.safeParse(input);

  useEffect(() => {
    if (Object.keys(fieldErrors).length === 0) return;
    const result = schema.safeParse(input);
    setFieldErrors(result.success ? {} : issuesToFieldErrors(result.error));
    if (result.success) setFormError("");
    // Revalidate existing cross-field errors whenever an input changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, schema]);

  function validate(): T | null {
    const result = schema.safeParse(input);
    if (result.success) {
      setInput(result.data);
      setFieldErrors({});
      setFormError("");
      return result.data;
    }

    const nextErrors = issuesToFieldErrors(result.error);
    setFieldErrors(nextErrors);
    setFormError("Bitte prüfe die markierten Eingaben, bevor du fortfährst.");
    const { fieldOrder, invalidStep } = findInvalidPlannerStep(nextErrors, fieldIds, stepFields, step);

    if (invalidStep && invalidStep !== step) setStep(invalidStep);
    focusFirstInvalidField(nextErrors, fieldIds, fieldOrder);
    return null;
  }

  function clearFieldError(key: string) {
    setFieldErrors((current) => {
      const next = { ...current };
      for (const field of Object.keys(next)) {
        if (field === key || field.startsWith(`${key}.`)) delete next[field];
      }
      return next;
    });
    setFormError("");
  }

  function resetValidation() {
    setFieldErrors({});
    setFormError("");
  }

  return { parsed, fieldErrors, formError, validate, clearFieldError, resetValidation };
}
