export type PlannerFieldErrors = Record<string, string>;

type ValidationIssue = {
  message: string;
  path: readonly PropertyKey[];
};

export function issuesToFieldErrors(error: { issues: readonly ValidationIssue[] }): PlannerFieldErrors {
  const fieldErrors: PlannerFieldErrors = {};

  for (const issue of error.issues) {
    const key = issue.path[0] === undefined ? "_form" : String(issue.path[0]);
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

  requestAnimationFrame(() => document.getElementById(fieldIds[field]!)?.focus());
}
