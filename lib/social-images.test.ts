import { describe, expect, it } from "vitest";
import { PLANNERS } from "./planners";
import { socialImageForPath } from "./social-images";

describe("socialImageForPath", () => {
  it("ordnet jedem Rechner sein eigenes Vorschaubild zu", () => {
    for (const planner of PLANNERS) {
      expect(socialImageForPath(planner.href)).toBe(`/social/${planner.id}.png`);
    }
  });

  it("nutzt für allgemeine Seiten die PassendPlanen Vorschau", () => {
    expect(socialImageForPath("/methodik/")).toBe("/social/passendplanen.png");
  });
});
