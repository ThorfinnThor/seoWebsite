import { describe, expect, it } from "vitest";
import type { StaticCatalog, ProductBase, OfferBase } from "@/lib/catalog/types";
import { catalogDimensionIssues } from "./dimension-safeguards";

const base = { id: "p", name: "Produkt", reviewed: true, dataQuality: "curated" as const };
function catalog(vertical: string, product: ProductBase): StaticCatalog<ProductBase, OfferBase> { return { schemaVersion: 1, vertical, generatedAt: "2026-08-28T00:00:00.000Z", products: [product], offers: [] }; }
describe("dimension safeguards", () => {
  it("rejects a 13 mm long terrace board", () => expect(catalogDimensionIssues(catalog("project-products", { ...base, vertical: "terrace", kind: "decking", boardLengthMm: 13 } as ProductBase))[0]?.code).toBe("suspicious-dimension"));
  it("rejects implausible mower capacity", () => expect(catalogDimensionIssues(catalog("robot-mower", { ...base, ratedAreaM2: 200_000 } as ProductBase))[0]?.code).toBe("suspicious-capacity"));
  it("accepts missing optional dimensions", () => expect(catalogDimensionIssues(catalog("project-products", { ...base, vertical: "carport", kind: "kit" } as ProductBase))).toEqual([]));
  it("accepts a narrow wall greenhouse but keeps the carport minimum strict", () => {
    expect(catalogDimensionIssues(catalog("project-products", { ...base, vertical: "greenhouse", kind: "kit", externalWidthM: 1.94, externalLengthM: 0.69 } as ProductBase))).toEqual([]);
    expect(catalogDimensionIssues(catalog("project-products", { ...base, vertical: "carport", kind: "kit", externalWidthM: 1.94, externalLengthM: 0.69 } as ProductBase))[0]?.code).toBe("suspicious-dimension");
  });
});
