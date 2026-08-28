import { describe, expect, it } from "vitest";
import { parsePrice, parsePriceFromFields, priceIssue } from "./price-normalizer";

describe("affiliate price normalization", () => {
  it.each([
    ["2299", 2299],
    ["2299.00", 2299],
    ["2299.0000", 2299],
    ["2.299,00", 2299],
    ["2,299.00", 2299],
    ["2299,00", 2299],
    ["44.48", 44.48],
    ["44,48", 44.48],
    ["44.4800 EUR", 44.48],
  ])("parses %s as %s EUR", (raw, expected) => expect(parsePrice(raw)).toBe(expected));

  it("uses the first valid feed field", () => expect(parsePriceFromFields("", "2299.0000", "99")).toBe(2299));
  it("rejects invalid or negative values", () => { expect(parsePrice("--1")).toBeUndefined(); expect(parsePrice("-12.00")).toBeUndefined(); });
  it("quarantines vertical-specific outliers", () => {
    expect(priceIssue("robot-mower", 2299)).toBeUndefined();
    expect(priceIssue("robot-mower", 22_990_000)).toBe("suspicious-price");
    expect(priceIssue("irrigation", 0.1)).toBe("suspicious-price");
  });
});
