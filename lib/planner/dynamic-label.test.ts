import { describe, expect, it } from "vitest";
import { nextNumberedLabel } from "./dynamic-label";

describe("nextNumberedLabel", () => {
  it("does not reuse a removed room number", () => {
    expect(nextNumberedLabel(["Raum 1", "Raum 3", "Raum 4"], "Raum")).toBe("Raum 5");
  });

  it("ignores user-defined labels and respects the first generated number", () => {
    expect(nextNumberedLabel(["Hauptrasen", "Rasenfläche 3", "Hinten"], "Rasenfläche", 2)).toBe("Rasenfläche 4");
  });
});
