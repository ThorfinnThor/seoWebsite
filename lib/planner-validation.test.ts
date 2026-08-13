import { describe, expect, it } from "vitest";
import { findInvalidPlannerStep, issuesToFieldErrors, nextPlannerStep, previousPlannerStep } from "./planner-validation";

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

  it("keeps nested array paths addressable", () => {
    expect(issuesToFieldErrors({ issues: [{ path: ["rooms", 1, "lengthM"], message: "Länge prüfen" }] })).toEqual({
      "rooms.1.lengthM": "Länge prüfen",
    });
  });
});

describe("planner wizard navigation", () => {
  it("locates an invalid field on a later step", () => {
    expect(findInvalidPlannerStep(
      { waterFlowLMin: "Durchfluss prüfen" },
      { lawnAreaM2: "lawn", waterFlowLMin: "flow" },
      { 1: ["lawnAreaM2"], 2: ["waterFlowLMin"] },
      1,
    )).toMatchObject({ invalidField: "waterFlowLMin", invalidStep: 2 });
  });

  it("calculates absolute next and previous steps", () => {
    expect(nextPlannerStep(1, 4)).toBe(2);
    expect(nextPlannerStep(4, 4)).toBe(4);
    expect(previousPlannerStep(2)).toBe(1);
    expect(previousPlannerStep(1)).toBe(1);
  });
});
