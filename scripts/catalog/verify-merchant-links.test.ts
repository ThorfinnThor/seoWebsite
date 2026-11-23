import { describe, expect, it } from "vitest";
import { applyLinkVerification, merchantTarget, verifyOfferLink } from "./verify-merchant-links";
import type { OfferBase, ProductBase } from "@/lib/catalog/types";

const product: ProductBase = { id: "p", name: "ECOVACS GOAT A3000 LiDAR PRO", gtin: "6970135038183", reviewed: true, dataQuality: "curated" };
const offer: OfferBase = { id: "o", productId: "p", merchantId: "m", merchantName: "Shop", merchantProductId: "A3000", priceEur: 2299, deliveryCostStatus: "unknown", available: true, affiliateUrl: "https://awin.example/click", merchantUrl: "https://shop.example/ecovacs-goat-a3000", updatedAt: "2026-08-28T00:00:00.000Z" };
describe("merchant link verification", () => {
  it("verifies product identity on the expected merchant domain", async () => {
    const status = await verifyOfferLink(offer, product, async () => new Response("<title>ECOVACS GOAT A3000 LiDAR PRO 6970135038183</title>", { status: 200, headers: { "content-type": "text/html" } }));
    expect(status).toBe("verified");
  });
  it("opens the shop page and never the affiliate link", async () => {
    const awin = "https://www.awin1.com/pclick.php?p=1&a=2&m=3";
    const requested: string[] = [];
    const fetcher = async (input: string | URL | Request) => { requested.push(String(input)); return new Response("6970135038183", { status: 200, headers: { "content-type": "text/html" } }); };
    expect(await verifyOfferLink({ ...offer, affiliateUrl: awin }, product, fetcher)).toBe("verified");
    expect(requested).toEqual(["https://shop.example/ecovacs-goat-a3000"]);
  });
  it("makes no request when only an affiliate link is known", async () => {
    const awin = "https://www.awin1.com/pclick.php?p=1&a=2&m=3";
    const fetcher = async () => { throw new Error("must not be called"); };
    expect(await verifyOfferLink({ ...offer, affiliateUrl: awin, merchantUrl: undefined }, product, fetcher)).toBe("unknown");
    expect(merchantTarget({ affiliateUrl: awin, merchantUrl: awin })).toBeUndefined();
  });
  it("reads the shop address from a deep link", () => {
    expect(merchantTarget({ affiliateUrl: "https://www.awin1.com/cread.php?awinmid=1&awinaffid=2&ued=https%3A%2F%2Fshop.example%2Fitem", merchantUrl: undefined })).toBe("https://shop.example/item");
    expect(merchantTarget({ affiliateUrl: "https://www.awin1.com/cread.php?ued=https%3A%2F%2Fwww.awin1.com%2Fx", merchantUrl: undefined })).toBeUndefined();
  });
  it("deactivates missing targets", async () => expect(await verifyOfferLink(offer, product, async () => new Response("missing", { status: 404 }))).toBe("not-found"));
  it("keeps bot-blocked targets separate", async () => expect(await verifyOfferLink(offer, product, async () => new Response("blocked", { status: 403 }))).toBe("blocked"));
  it("removes invalid targets but retains bot-blocked offers for later manual verification", () => {
    expect(applyLinkVerification(offer, "not-found", "2026-08-28T00:00:00.000Z")).toBeUndefined();
    expect(applyLinkVerification(offer, "identity-mismatch", "2026-08-28T00:00:00.000Z")).toBeUndefined();
    expect(applyLinkVerification(offer, "blocked", "2026-08-28T00:00:00.000Z")).toMatchObject({ available: true, linkVerificationStatus: "blocked" });
  });
});
