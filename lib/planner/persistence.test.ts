import { describe, expect, it } from "vitest";
import { readPlannerState, writePlannerState, type PlannerStorage } from "./persistence";

function memoryStorage(initial: Record<string, string> = {}): PlannerStorage & { values: Map<string, string> } {
  const values = new Map(Object.entries(initial));
  return { values, getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); }, removeItem: (key) => { values.delete(key); } };
}

describe("planner session persistence", () => {
  it("round-trips validated state", () => {
    const storage = memoryStorage();
    expect(writePlannerState(storage, "planner", { width: 400 })).toBe(true);
    expect(readPlannerState(storage, "planner", (value) => typeof value === "object" && value !== null && "width" in value ? value as { width: number } : null)).toEqual({ width: 400 });
  });

  it("removes invalid JSON", () => {
    const storage = memoryStorage({ planner: "not-json" });
    expect(readPlannerState(storage, "planner", () => null)).toBeNull();
    expect(storage.values.has("planner")).toBe(false);
  });

  it("removes schema-invalid state", () => {
    const storage = memoryStorage({ planner: JSON.stringify({ width: -1 }) });
    expect(readPlannerState(storage, "planner", () => null)).toBeNull();
    expect(storage.values.has("planner")).toBe(false);
  });

  it("fails safely when storage is unavailable", () => {
    const storage: PlannerStorage = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); }, removeItem: () => { throw new Error("blocked"); } };
    expect(readPlannerState(storage, "planner", () => null)).toBeNull();
    expect(writePlannerState(storage, "planner", { value: 1 })).toBe(false);
  });
});
