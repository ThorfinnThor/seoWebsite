import { describe, expect, it } from "vitest";
import { visibleProductItems } from "./ExpandableProductList";

describe("expandable product results", () => {
  const products = Array.from({ length: 15 }, (_, index) => `product-${index + 1}`);

  it("shows no more than five products initially", () => {
    expect(visibleProductItems(products, false)).toEqual(products.slice(0, 5));
  });

  it("keeps every matching product available after expansion", () => {
    expect(visibleProductItems(products, true)).toEqual(products);
  });
});
