import { describe, expect, it } from "vitest";
import { isProjectProductCandidate, normalizeProjectProduct, projectVertical } from "./project-products-normalizer";
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

  it("normalizes a real product with a valid affiliate offer", () => {
    expect(isProjectProductCandidate(row)).toBe(true);
    const candidate = normalizeProjectProduct(row);
    expect(candidate).toMatchObject({ id: "project:greenhouse:11830:greenhouse-1", product: { id: "project:greenhouse:11830:greenhouse-1", vertical: "greenhouse", kind: "kit" }, offer: { priceEur: 199, productId: "project:greenhouse:11830:greenhouse-1" } });
  });

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
});
