import { describe, expect, it } from "vitest";
import { issuesToFieldErrors } from "./planner-validation";

describe("issuesToFieldErrors", () => {
  it("keeps the first message for each field", () => {
    const result = issuesToFieldErrors({
      issues: [
        { path: ["budgetMaxEur"], message: "Budget fehlt" },
        { path: ["budgetMaxEur"], message: "Budget ist zu niedrig" },
        { path: ["bikes"], message: "Nur ganze Fahrräder" },
      ],
    });

    expect(result).toEqual({ budgetMaxEur: "Budget fehlt", bikes: "Nur ganze Fahrräder" });
  });

  it("maps schema-wide issues to the form boundary", () => {
    expect(issuesToFieldErrors({ issues: [{ path: [], message: "Mindestens eine Fläche" }] })).toEqual({
      _form: "Mindestens eine Fläche",
    });
  });
});
