import { describe, expect, it } from "vitest";
import { isProjectProductCandidate, normalizeProjectProduct, parseProjectProductAttributes, projectProductKind, projectVertical } from "./project-products-normalizer";
import { assembleProjectCatalog } from "./sync-products";

const row = {
  product_name: "TrendLine Gewächshaus Mythos 6x6",
  category_name: "Gewächshäuser",
  description: "Aluminium Gewächshaus mit Dachfenster",
  merchant_id: "11830",
  merchant_name: "Globus Baumarkt DE",
  merchant_product_id: "greenhouse-1",
  product_GTIN: "4012345678901",
  search_price: "199,00",
  currency: "EUR",
  aw_deep_link: "https://www.awin1.com/pclick.php?p=1",
  in_stock: "1",
  last_updated: "2026-08-28T10:00:00Z",
};

describe("project product feed normalization", () => {
  it("classifies the five planner areas", () => {
    expect(projectVertical("Carport Bausatz")).toBe("carport");
    expect(projectVertical("Gewächshaus mit Dachfenster")).toBe("greenhouse");
    expect(projectVertical("Sichtschutz Zaunelement")).toBe("privacy-screen");
    expect(projectVertical("WPC Terrassendiele")).toBe("terrace");
    expect(projectVertical("Gipskartonplatte für Trockenbau")).toBe("drywall");
  });

  it("rejects adjacent accessories that do not belong in the planner catalog", () => {
    expect(isProjectProductCandidate({ product_name: "Ersatzdocht für Gewächshausheizung" })).toBe(false);
    expect(isProjectProductCandidate({ product_name: "Hand-Stichsäge für Gipskartonplatten" })).toBe(false);
    expect(isProjectProductCandidate({ product_name: "Metall- und Holzdetektor für Trockenbauplatten" })).toBe(false);
    expect(isProjectProductCandidate({ product_name: "Schmuckzaun Schmiedeeisen Gartenzaun 60x190cm" })).toBe(false);
  });

  it("normalizes a real product with a valid affiliate offer", () => {
    expect(isProjectProductCandidate(row)).toBe(true);
    const candidate = normalizeProjectProduct(row);
    expect(candidate).toMatchObject({ id: "project:greenhouse:11830:greenhouse-1", product: { id: "project:greenhouse:11830:greenhouse-1", vertical: "greenhouse", kind: "kit" }, offer: { priceEur: 199, productId: "project:greenhouse:11830:greenhouse-1" } });
  });

  it("extracts matching dimensions and package sizes", () => {
    expect(parseProjectProductAttributes("terrace", "decking", "Terrassendiele Kiefer 200 x 14,5 x 2,8 cm")).toMatchObject({ boardLengthMm: 2000, boardWidthMm: 145, boardThicknessMm: 28, material: "wood" });
    expect(parseProjectProductAttributes("terrace", "decking", "Terrassendielen Cumaru 240cm (19x140mm)")).toMatchObject({ boardLengthMm: 2400, boardWidthMm: 140, boardThicknessMm: 19, material: "wood" });
    expect(parseProjectProductAttributes("drywall", "board", "Knauf Gipskartonplatte GKBI 120 x 60 cm 12,5 mm 60 St.")).toMatchObject({ boardLengthMm: 1200, boardWidthMm: 600, boardThicknessMm: 12.5, piecesPerPack: 60, moistureApproved: true });
    expect(parseProjectProductAttributes("greenhouse", "kit", "Vitavia Gewächshaus 254 x 317 cm HKP")).toMatchObject({ externalWidthM: 2.54, externalLengthM: 3.17, glazingType: "polycarbonate", completeKit: true });
    expect(parseProjectProductAttributes("greenhouse", "kit", "Gewächshaus 193x319x195cm")).toMatchObject({ externalWidthM: 1.93, externalLengthM: 3.19, clearHeightM: 1.95, completeKit: true });
  });
  it("does not classify a carport sidewall as a complete kit", () => expect(projectProductKind("carport", "Seitenwand für Carport 300 cm")).toBe("panel"));
  it("does not classify InterGard foundations or hardwood names as complete kits or edge profiles", () => {
    expect(projectProductKind("carport", "Betonsockel Carport Terrassenüberdachung 170x170mm")).toBe("foundation");
    expect(projectProductKind("terrace", "Terrassendielen Massaranduba 580cm (21x145mm)")).toBe("decking");
  });
  it("recognizes height-first privacy screen rolls", () => expect(parseProjectProductAttributes("privacy-screen", "panel", "Sichtschutzmatte 180 x 300 cm")).toMatchObject({ panelWidthCm: 300, panelHeightCm: 180 }));

  it("publishes complete project products as mixed", () => {
    const candidate = normalizeProjectProduct(row);
    expect(candidate).toBeDefined();
    const catalog = assembleProjectCatalog([candidate!], [], "2026-08-28T00:00:00.000Z");
    expect(catalog.products).toHaveLength(1);
    expect(catalog.offers).toHaveLength(1);
    expect(catalog.products[0]).toMatchObject({ reviewed: true, dataQuality: "mixed" });
  });

  it("keeps missing prices private", () => {
    const candidate = normalizeProjectProduct({ ...row, search_price: "" });
    expect(candidate?.offer).toBeUndefined();
    expect(assembleProjectCatalog(candidate ? [candidate] : [], [], "2026-08-28T00:00:00.000Z").products).toHaveLength(0);
  });

  it("keeps an approved merchant represented when a planner catalog reaches its cap", () => {
    const incumbent = Array.from({ length: 130 }, (_, index) => normalizeProjectProduct({
      ...row,
      product_name: `WPC Terrassendiele 240 x 14 x 2 cm ${index}`,
      merchant_product_id: `terrace-${index}`,
      product_GTIN: "",
    })!);
    const intergard = normalizeProjectProduct({
      ...row,
      product_name: "Terrassendielen Cumaru 240cm (19x140mm)",
      merchant_id: "24966",
      merchant_name: "InterGard Heim und Garten DE",
      merchant_product_id: "cumaru-240",
      product_GTIN: "",
    })!;

    const catalog = assembleProjectCatalog([...incumbent, intergard], [], "2026-08-28T00:00:00.000Z");
    expect(catalog.products).toHaveLength(120);
    expect(catalog.offers.some((offer) => offer.merchantName === "InterGard Heim und Garten DE")).toBe(true);
  });
});
