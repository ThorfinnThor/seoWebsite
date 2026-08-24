import { describe, expect, it } from "vitest";
import { isFlooringCandidate, normalizeFlooring, parseFlooringAttributes } from "./flooring-normalizer";

describe("flooring normalizer", () => {
  it("classifies click and glue products from the product lead", () => {
    expect(parseFlooringAttributes("Klick-Vinyl #LisbonLoft auch als Klebe-Vinyl erhältlich").installation).toBe("click");
    expect(parseFlooringAttributes("Klebe-Vinyl #BerlinLoft auch als Klick-Vinyl erhältlich").installation).toBe("glue");
  });

  it("keeps missing package data in review instead of inventing it", () => {
    const row = { product_name: "Klick-Vinyl Test", category_name: "Flooring & Carpeting", description: "Geeignet für Fußbodenheizung", merchant_id: "69012", merchant_name: "LaminatDEPOT DE", merchant_product_id: "test-1", product_GTIN: "4017268480532", search_price: "83.74", currency: "EUR", aw_deep_link: "https://www.awin1.com/pclick.php?p=1", in_stock: "1" };
    expect(isFlooringCandidate(row)).toBe(true);
    const result = normalizeFlooring(row);
    expect(result.product).toBeDefined();
    expect(result.issues).toContain("missing-package-coverage");
    expect(result.product?.packageCoverageM2).toBeUndefined();
  });

  it("parses Awin description variants for package, dimensions and installation", () => {
    const attributes = parseFlooringAttributes("Parkett Paketinhalt: 11 Stück = 2,198 m² Stärke: 11,5 mm Maße: 108 x 18,5 cm (L x B) Verlegeart: Automatic-Click-System");
    expect(attributes).toMatchObject({ packageCoverageM2: 2.198, plankLengthMm: 1080, plankWidthMm: 185, thicknessMm: 11.5, installation: "click" });
  });

  it("excludes wall panels that merely mention vinyl", () => {
    expect(isFlooringCandidate({ product_name: "Wandpaneel Vinyloptik", category_name: "Interior" })).toBe(false);
  });
});
