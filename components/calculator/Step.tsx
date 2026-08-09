import type { PropsWithChildren } from "react";

export function Step({ children, labelledBy }: PropsWithChildren<{ labelledBy?: string }>) {
  return <fieldset className="form-step" aria-labelledby={labelledBy}>{children}</fieldset>;
}
