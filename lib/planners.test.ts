import { describe, expect, it } from "vitest";
import { getPlanner, PLANNERS } from "./planners";

describe("planner directory", () => {
  it("contains all ten calculators exactly once", () => {
    expect(PLANNERS).toHaveLength(10);
    expect(new Set(PLANNERS.map((planner) => planner.id)).size).toBe(10);
    expect(new Set(PLANNERS.map((planner) => planner.href)).size).toBe(10);
  });

  it("groups the directory into seven garden and three house tools", () => {
    expect(PLANNERS.filter((planner) => planner.area === "garden")).toHaveLength(7);
    expect(PLANNERS.filter((planner) => planner.area === "house")).toHaveLength(3);
  });

  it("gives every calculator three concrete result descriptions", () => {
    for (const planner of PLANNERS) {
      expect(planner.outputs).toHaveLength(3);
      expect(planner.outputs.every((output) => output.length >= 18)).toBe(true);
      expect(planner.outputs.join(" ")).not.toMatch(/übersichtliche Schritte|deterministische Auswahl|0 €|vorgetäuschte Präzision/i);
    }
  });

  it("answers three calculator-specific questions with substantial text", () => {
    for (const planner of PLANNERS) {
      expect(planner.faqs).toHaveLength(3);
      expect(new Set(planner.faqs.map((faq) => faq.question)).size).toBe(3);
      for (const faq of planner.faqs) {
        expect(faq.question).toMatch(/\?$/);
        expect(faq.answer.length).toBeGreaterThan(80);
      }
    }
  });

  it("resolves every registered calculator", () => {
    for (const planner of PLANNERS) {
      expect(getPlanner(planner.id)).toBe(planner);
    }
  });
});
