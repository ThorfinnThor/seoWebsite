import { describe, expect, it } from "vitest";
import { isFlooringCandidate, normalizeFlooring, parseFlooringAttributes, parseFlooringType } from "./flooring-normalizer";

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

  it("parses three-part millimetre dimensions without treating thickness as width", () => {
    const attributes = parseFlooringAttributes("Format 1.290 x 203 x 4 mm, Klick-Verlegesystem");
    expect(attributes).toMatchObject({ plankLengthMm: 1290, plankWidthMm: 203, thicknessMm: 4, installation: "click" });
  });

  it("excludes wall panels that merely mention vinyl", () => {
    expect(isFlooringCandidate({ product_name: "Wandpaneel Vinyloptik", category_name: "Interior" })).toBe(false);
  });

  it("uses a readable short description when the feed name is only an internal code", () => {
    const result = normalizeFlooring({ product_name: "VI.REP.REAFCL002", product_short_description: "Klick Vinyl Eiche grau 592 x 148 mm, 1,40 m² / Paket", merchant_id: "48707", merchant_name: "Woodstore24 DE/AT", merchant_product_id: "1", product_GTIN: "4262551037812", search_price: "41.30", currency: "EUR", aw_deep_link: "https://www.awin1.com/pclick.php?p=1", in_stock: "1" });
    expect(result.name).toContain("Klick Vinyl Eiche grau");
    expect(result.issues).not.toContain("unhelpful-product-name");
  });

  it("keeps an internal-only feed name in review", () => {
    const result = normalizeFlooring({ product_name: "VI.REP.REAFCL002", merchant_id: "48707", merchant_name: "Woodstore24 DE/AT", merchant_product_id: "1", search_price: "41.30", currency: "EUR", aw_deep_link: "https://www.awin1.com/pclick.php?p=1", in_stock: "1" });
    expect(result.issues).toContain("unhelpful-product-name");
  });

  it("does not turn page-builder CSS or generic prose into a product name", () => {
    const result = normalizeFlooring({ product_name: "VI.REP.REAFCL002", description: "#html-body [data-pb-style=WM6IKDO]{justify-content:flex-start;background-position:left top} Informationen auf einen Blick Art: SPC Vinyl", merchant_id: "48707", merchant_name: "Woodstore24 DE/AT", merchant_product_id: "1", search_price: "41.30", currency: "EUR", aw_deep_link: "https://www.awin1.com/pclick.php?p=1", in_stock: "1" });
    expect(result.name).toBe("VI.REP.REAFCL002");
    expect(result.issues).toContain("unhelpful-product-name");
  });

  it.each([
    ["Krono Original Laminat Greenland Oak", "", "laminate"],
    ["Parador Designboden Modular ONE Hydron Eiche Spirit Natur Landhausdiele", "Designboden, robuster als Laminat", "design"],
    ["Classen Designboden mit Trittschalldämmung Mondeiche", "", "design"],
    ["Corklife Korkboden Studiostyle Beja", "Für Parkett- und Laminatfreunde", "cork"],
    ["Amorim Corklife Vinylboden mit Trittschalldämmung Hardy Oak", "Träger aus Kork", "vinyl-click"],
    ["Classen Vinyl Designboden Ceramin Floors Tera Egmont Oak", "", "vinyl-click"],
    ["Parador Vinylboden Modular ONE mit Trittschalldämmung Eiche Balance Natur", "leiser als Laminat", "vinyl-click"],
    ["Parador Parkett Basic Eiche rustikal", "mit Vinylschutz", "parquet-floating"],
    ["Woodo9033104.2", "Dreischicht-Parkett Eiche", "parquet-floating"],
    ["DOLLE Bodentreppe kompakt", "Bodenbelag", undefined],
  ])("classifies %s", (name, description, expected) => expect(parseFlooringType(name, description)).toBe(expected));

  it("keeps an unrecognised floor in review instead of calling it laminate", () => {
    const result = normalizeFlooring({ product_name: "Linoleumboden Natur 900 x 300 mm", description: "Bodenbelag, Klick, Paketinhalt 2,1 m²", merchant_id: "11830", merchant_name: "Globus Baumarkt DE", merchant_product_id: "1", search_price: "41.30", currency: "EUR", aw_deep_link: "https://www.awin1.com/pclick.php?p=1", in_stock: "1" });
    expect(result.product).toBeUndefined();
    expect(result.issues).toContain("unknown-flooring-type");
  });

  it("requires an explicit wet-room claim instead of generic water resistance", () => {
    expect(parseFlooringAttributes("SPC Vinyl mit wasserresistenter Stabilität").wetRoomApproved).toBeUndefined();
    expect(parseFlooringAttributes("Klickvinyl ausdrücklich für Feuchträume geeignet").wetRoomApproved).toBe(true);
  });
});
