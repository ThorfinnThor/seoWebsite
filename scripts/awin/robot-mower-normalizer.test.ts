import { describe, expect, it } from "vitest";
import { isRobotMowerCandidate, normalizeRobotMower, parseRobotMowerAttributes } from "./robot-mower-normalizer";

const goat = {
  product_name: "GOAT O800 RTK",
  merchant_category: "GOAT",
  category_name: "Lawn Mowers",
  description: "Kabellose Einrichtung, Passierbarkeit 0,7 m, Neigungswinkel 45% (24°), RTK und LiDAR, IPX6",
  merchant_id: "30763",
  merchant_name: "Ecovacs DE",
  merchant_product_id: "6970135034789",
  product_GTIN: "6970135034789",
  search_price: "1299.00",
  currency: "EUR",
  aw_deep_link: "https://www.awin1.com/pclick.php?p=1",
  in_stock: "1",
};

describe("robot mower normalizer", () => {
  it("recognizes GOAT lawn mowers and extracts hard specs", () => {
    expect(isRobotMowerCandidate(goat)).toBe(true);
    const result = normalizeRobotMower(goat);
    expect(result.product?.navigation).toBe("hybrid");
    expect(result.product?.maxSlopePercent).toBe(45);
    expect(result.product?.minPassageCm).toBe(70);
    expect(result.offer?.priceEur).toBe(1299);
  });

  it("excludes window and vacuum robots", () => {
    expect(isRobotMowerCandidate({ product_name: "WINBOT W2", merchant_category: "WINBOT", description: "Fensterroboter" })).toBe(false);
    expect(isRobotMowerCandidate({ product_name: "DEEBOT X11", merchant_category: "DEEBOT", description: "Saugroboter" })).toBe(false);
    expect(isRobotMowerCandidate({ product_name: "Geschenkpaket GOAT A1600", merchant_category: "GOAT", description: "Rasenmäher" })).toBe(false);
  });

  it("keeps German thousands separators in area values", () => {
    expect(parseRobotMowerAttributes("für 1.000 m² geeignet").ratedAreaM2).toBe(1000);
  });

  it("accepts international Awin price formatting", () => {
    const result = normalizeRobotMower({ ...goat, search_price: "1,599.00" });
    expect(result.offer?.priceEur).toBe(1599);
  });
});
