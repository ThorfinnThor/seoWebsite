import { describe, expect, it } from "vitest";
import { extractFeedListUrl, isAllowedFeedUrl, normalizeFeedUrl, parseFeedListRows } from "./feed-list";

describe("Awin feed list resolver", () => {
  it("keeps only joined German product feeds and deduplicates URLs", () => {
    const rows = [
      { "Advertiser ID": "30763", "Advertiser Name": "Ecovacs DE", "Membership Status": "Joined", "Feed ID": "98163", Language: "German", URL: "https://productdata.awin.com/datafeed/download/apikey/x/fid/98163/" },
      { "Advertiser ID": "69012", "Advertiser Name": "LaminatDEPOT DE", "Membership Status": "Not Joined", Language: "German", URL: "https://productdata.awin.com/datafeed/download/apikey/x/fid/115897/" },
      { "Advertiser ID": "30763", "Advertiser Name": "Ecovacs DE", "Membership Status": "Joined", Language: "English", URL: "https://productdata.awin.com/datafeed/download/apikey/x/fid/98163/" },
    ];
    expect(parseFeedListRows(rows)).toHaveLength(1);
    expect(parseFeedListRows(rows)[0]).toMatchObject({ advertiserId: "30763", feedId: "98163" });
  });

  it("accepts the Awin feed-data host but rejects arbitrary URLs", () => {
    expect(isAllowedFeedUrl("https://productdata.awin.com/datafeed/download/apikey/x/fid/1/")).toBe(true);
    expect(isAllowedFeedUrl("http://datafeed.api.productserve.com/datafeed/download/apikey/x/fid/1/")).toBe(true);
    expect(isAllowedFeedUrl("https://example.com/feed.csv")).toBe(false);
  });

  it("upgrades Awin's legacy Productserve links to HTTPS", () => {
    const legacy = "http://datafeed.api.productserve.com/datafeed/download/apikey/x/fid/9/";
    expect(normalizeFeedUrl(legacy)).toBe("https://datafeed.api.productserve.com/datafeed/download/apikey/x/fid/9/");
    expect(parseFeedListRows([{ "Membership Status": "Joined", Language: "German", URL: legacy }])).toEqual([
      expect.objectContaining({ url: "https://datafeed.api.productserve.com/datafeed/download/apikey/x/fid/9/" }),
    ]);
  });

  it("rejects credentials and insecure URLs outside Awin's legacy feed host", () => {
    expect(normalizeFeedUrl("https://user:password@productdata.awin.com/datafeed/download/fid/1/")).toBeUndefined();
    expect(normalizeFeedUrl("http://productdata.awin.com/datafeed/download/fid/1/")).toBeUndefined();
  });

  it("extracts a feedList URL from the secret value", () => {
    const url = "https://ui.awin.com/productdata-darwin-download/publisher/3037577/key/1/feedList";
    expect(extractFeedListUrl(url)).toBe(url);
    expect(extractFeedListUrl(JSON.stringify({ feedList: url }))).toBe(url);
  });
});
