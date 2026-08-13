import { describe, expect, it } from "vitest";
import { parsePlannerDirectoryFilter, plannerDirectoryUrl } from "./directory-filter";

describe("planner directory filter", () => {
  it("parses only supported filters", () => {
    expect(parsePlannerDirectoryFilter("garden")).toBe("garden");
    expect(parsePlannerDirectoryFilter("house")).toBe("house");
    expect(parsePlannerDirectoryFilter("invalid")).toBe("all");
  });

  it("stores and clears the filter in the URL", () => {
    expect(plannerDirectoryUrl("garden", "https://example.test/rechner/")).toBe("/rechner/?bereich=garden");
    expect(plannerDirectoryUrl("all", "https://example.test/rechner/?bereich=house")).toBe("/rechner/");
  });
});
