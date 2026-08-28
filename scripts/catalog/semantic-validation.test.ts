import { describe, expect, it } from "vitest";
import { irrigationSemanticIssues } from "./semantic-validation";

describe("irrigation semantic validation", () => {
  it.each([
    ["Canopia Terrassendach 1275 x 400 cm", "sprinkler"],
    ["Einhell PICOBELLA Oberflächenbürste", "pipe"],
    ["Gardena Klarwasser-Tauchpumpe Aquasensor", "controller"],
    ["ACO Rain4me Zisterne Regenwassertank", "filter"],
  ] as const)("rejects %s classified as %s", (name, kind) => {
    expect(irrigationSemanticIssues({ name, kind })).toContain("semantic-kind-mismatch");
  });

  it.each([
    ["GARDENA Bewässerungscomputer MultiControl", "controller"],
    ["GARDENA Micro-Drip Wasserfilter", "filter"],
    ["GARDENA Viereckregner AquaZoom", "sprinkler"],
    ["GARDENA Verlegerohr 25 mm", "pipe"],
  ] as const)("accepts %s classified as %s", (name, kind) => {
    expect(irrigationSemanticIssues({ name, kind })).toEqual([]);
  });
});
