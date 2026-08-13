export type PlannerFieldErrors = Record<string, string>;

type ValidationIssue = {
  message: string;
  path: readonly PropertyKey[];
};

export function issuesToFieldErrors(error: { issues: readonly ValidationIssue[] }): PlannerFieldErrors {
  const fieldErrors: PlannerFieldErrors = {};

  for (const issue of error.issues) {
    const key = issue.path.length === 0 ? "_form" : issue.path.map(String).join(".");
    fieldErrors[key] ??= issue.message;
  }

  return fieldErrors;
}

export function focusFirstInvalidField(
  fieldErrors: PlannerFieldErrors,
  fieldIds: Partial<Record<string, string>>,
  preferredOrder: readonly string[],
) {
  if (typeof document === "undefined") return;
  const field = preferredOrder.find((key) => fieldErrors[key] && fieldIds[key]);
  if (!field) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => document.getElementById(fieldIds[field]!)?.focus());
  });
}

export function findInvalidPlannerStep(
  fieldErrors: PlannerFieldErrors,
  fieldIds: Partial<Record<string, string>>,
  stepFields: Partial<Record<number, readonly string[]>>,
  currentStep: number,
) {
  const fieldOrder = [
    ...(stepFields[currentStep] ?? []),
    ...Object.values(stepFields).flatMap((fields) => fields ?? []),
    ...Object.keys(fieldIds),
  ];
  const invalidField = fieldOrder.find((key) => fieldErrors[key] && fieldIds[key]);
  const invalidStep = invalidField
    ? Object.entries(stepFields).find(([, fields]) => fields?.includes(invalidField))?.[0]
    : undefined;

  return {
    fieldOrder,
    invalidField,
    invalidStep: invalidStep === undefined ? undefined : Number(invalidStep),
  };
}

export function nextPlannerStep(step: number, totalSteps: number) {
  return Math.min(totalSteps, step + 1);
}

export function previousPlannerStep(step: number) {
  return Math.max(1, step - 1);
}
