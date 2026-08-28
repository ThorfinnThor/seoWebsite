import { describe, expect, it } from "vitest";
import { isIrrigationCandidate, irrigationKind, normalizeIrrigation, parseIrrigationAttributes } from "./irrigation-normalizer";
import { assembleIrrigationCatalog, parseFeedJobs } from "./sync-products";

const row = {
  product_name: "GardenSmart Bewässerungscomputer 6 Zonen",
  merchant_id: "77",
  merchant_name: "Garten Technik",
  merchant_product_id: "smart-6",
  brand_name: "GardenSmart",
  description: "Smart App WLAN Controller System AquaLine mit Regensensor-Kompatibilität",
  search_price: "129,00",
  currency: "EUR",
  delivery_cost: "4,90",
  in_stock: "true",
  aw_deep_link: "https://www.awin1.com/cread.php?awinmid=77&awinaffid=1",
  ean: "4012345678903",
  last_updated: "2026-08-15T10:00:00Z",
};

describe("irrigation feed normalization", () => {
  it("classifies irrigation components conservatively", () => { expect(irrigationKind(row.product_name)).toBe("controller"); expect(irrigationKind("Tropfschlauch 25 m")).toBe("dripline"); });
  it("excludes roof-window rain sensors from garden irrigation", () => {
    expect(isIrrigationCandidate({ product_name: "Roto Regensensor ZEL STG RS 24 V", merchant_category: "Dachfenster Zubehör", description: "Regensensor am Wohndachfenster" })).toBe(false);
  });
  it("excludes aquarium accessories from garden irrigation", () => {
    expect(isIrrigationCandidate({ product_name: "Aquariumzubehör Rücklaufsicherung", category_name: "Aquaristik", description: "für Aquariumfilter" })).toBe(false);
  });
  it.each([
    { product_name: "Canopia Terrassendach 1275 x 400 cm", description: "mit Regensensor" },
    { product_name: "Einhell PICOBELLA Oberflächenbürste", description: "mit Wasseranschluss" },
    { product_name: "Gardena Klarwasser-Tauchpumpe 11000 Aquasensor", merchant_category: "Gartenbewässerung" },
    { product_name: "ACO Rain4me Zisterne Regenwassertank", description: "mit Filterpaket" },
  ])("rejects known false positive $product_name", (candidate) => expect(isIrrigationCandidate(candidate)).toBe(false));
  it("does not infer a kind from a description-only keyword", () => expect(irrigationKind("ACO Zisterne")).toBeUndefined());
  it("extracts controller capacity and compatibility", () => expect(parseIrrigationAttributes(`${row.product_name} ${row.description}`)).toMatchObject({ kind: "controller", maxZones: 6, smartCompatible: true, systemId: "AquaLine" }));
  it("publishes complete feed products as mixed", () => expect(assembleIrrigationCatalog([normalizeIrrigation(row)], [], "2026-08-16T00:00:00.000Z").products[0]).toMatchObject({ reviewed: true, dataQuality: "mixed" }));
  it("keeps products without compatibility data private", () => expect(assembleIrrigationCatalog([normalizeIrrigation({ ...row, description: "Bewässerungscomputer 6 Zonen" })], [], "2026-08-16T00:00:00.000Z").products).toHaveLength(0));
  it("publishes a reviewed compatible product and offer", () => {
    const catalog = assembleIrrigationCatalog([normalizeIrrigation(row)], [{ id: "gtin:4012345678903", reviewed: true, dataQuality: "curated", reviewNote: "System and zones checked" }], "2026-08-16T00:00:00.000Z");
    expect(catalog.products[0]).toMatchObject({ kind: "controller", maxZones: 6, systemId: "AquaLine" });
    expect(catalog.offers).toHaveLength(1);
  });
  it("accepts legacy and per-vertical secret formats", () => {
    expect(parseFeedJobs(JSON.stringify(["https://example.com/all.csv"]))[0].verticals.size).toBe(3);
    const jobs = parseFeedJobs(JSON.stringify({ "garden-house": [], dehumidifier: ["https://example.com/dry.csv"], irrigation: ["https://example.com/water.csv"] }));
    expect(jobs).toHaveLength(2);
  });
});
