import { describe, expect, it } from "vitest";
import { normalizeDehumidifier, parseDehumidifierAttributes } from "./dehumidifier-normalizer";
import { assembleDehumidifierCatalog } from "./sync-products";

const row = {
  product_name: "KlimaDry Luftentfeuchter 20 L/Tag für Räume bis 50 m²",
  merchant_id: "44",
  merchant_name: "Klima Shop",
  merchant_product_id: "dry-20",
  brand_name: "KlimaDry",
  description: "5 bis 35 °C, 42 dB, 320 W, 4,5 L Tank, Schlauchanschluss und Wäschemodus",
  search_price: "199,90",
  currency: "EUR",
  delivery_cost: "kostenlos",
  in_stock: "true",
  aw_deep_link: "https://www.awin1.com/cread.php?awinmid=44&awinaffid=1",
  ean: "4012345678902",
  last_updated: "2026-08-15T10:00:00Z",
};

describe("dehumidifier feed normalization", () => {
  it("extracts capacity and operating facts", () => expect(parseDehumidifierAttributes(`${row.product_name} ${row.description}`)).toMatchObject({ maxRecommendedAreaM2: 50, extractionLPerDay: 20, minOperatingTempC: 5, maxOperatingTempC: 35, continuousDrain: true, laundryMode: true, noiseDb: 42, powerW: 320 }));
  it("keeps a feed candidate private until review", () => expect(assembleDehumidifierCatalog([normalizeDehumidifier(row)], [], "2026-08-16T00:00:00.000Z").products).toHaveLength(0));
  it("publishes only after an explicit curated override", () => {
    const catalog = assembleDehumidifierCatalog([normalizeDehumidifier(row)], [{ id: "gtin:4012345678902", reviewed: true, dataQuality: "curated", reviewNote: "Manufacturer data checked" }], "2026-08-16T00:00:00.000Z");
    expect(catalog.products).toHaveLength(1);
    expect(catalog.offers).toHaveLength(1);
  });
});
