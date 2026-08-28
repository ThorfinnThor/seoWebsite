import { describe, expect, it } from "vitest";
import type { ProjectCatalog, ProjectProduct } from "./types";
import { recommendProjectProducts } from "./recommend";

const timestamp = "2026-08-28T00:00:00.000Z";
function catalog(products: ProjectProduct[]): ProjectCatalog { return { schemaVersion: 1, vertical: "project-products", generatedAt: timestamp, products, offers: products.map((product, index) => ({ id: `o${index}`, productId: product.id, merchantId: "m", merchantName: "Händler", merchantProductId: product.id, priceEur: 10 + index, deliveryCostStatus: "free", deliveryCostEur: 0, available: true, affiliateUrl: `https://example.com/${index}`, updatedAt: timestamp })) }; }
const base = { reviewed: true, dataQuality: "curated" as const };

describe("project product matching", () => {
  it("matches terrace dimensions and calculates quantity", () => {
    const products: ProjectProduct[] = [{ ...base, id: "board", name: "Diele", vertical: "terrace", kind: "decking", boardLengthMm: 3000, boardWidthMm: 145, boardThicknessMm: 28 }];
    const [match] = recommendProjectProducts({ catalog: catalog(products), requirements: { vertical: "terrace", requiredKinds: ["decking"], areaM2: 20, requiredLinearM: 138, boardLengthMm: 3000, boardWidthMm: 145, requiredBoardCount: 46, supportLinearM: 50 } });
    expect(match.confidence).toBe("exact"); expect(match.orderEstimate).toMatchObject({ requiredUnits: 46, packageCount: 46, overage: 0 });
  });
  it("recalculates a different drywall format and exposes pallet overage", () => {
    const products: ProjectProduct[] = [{ ...base, id: "board", name: "Miniboard", vertical: "drywall", kind: "board", boardLengthMm: 1200, boardWidthMm: 600, piecesPerPack: 60, boardType: "standard" }];
    const [match] = recommendProjectProducts({ catalog: catalog(products), requirements: { vertical: "drywall", requiredKinds: ["board"], purchaseAreaM2: 10, boardLengthMm: 2500, boardWidthMm: 1250, boardCount: 4, profileLengthMm: 3000, trackBarCount: 4, moistureRequired: false, fireOrAcousticRequired: false, insulationRequired: false } });
    expect(match.confidence).toBe("compatible"); expect(match.orderEstimate).toMatchObject({ requiredUnits: 14, packageCount: 1, orderedUnits: 60, overage: 46 });
  });
  it("does not call external carport dimensions a technical match", () => {
    const products: ProjectProduct[] = [{ ...base, id: "carport", name: "Carport", vertical: "carport", kind: "kit", externalWidthM: 3.6, externalLengthM: 5.5, vehicleCount: 1 }];
    const [match] = recommendProjectProducts({ catalog: catalog(products), requirements: { vertical: "carport", requiredKinds: ["kit"], clearWidthM: 3, clearLengthM: 5, clearHeightM: 2.2, vehicleCount: 1, installation: "freestanding", roofType: "flat" } });
    expect(match.confidence).toBe("category"); expect(match.reasons.map((reason) => reason.code)).toContain("missing-clear-size");
  });
});
