import { afterEach, describe, expect, it, vi } from "vitest";

const gardenCatalog = {
  schemaVersion: 1,
  vertical: "garden-house",
  generatedAt: "2026-08-12T00:00:00.000Z",
  products: [],
  offers: [],
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
});

describe("client catalog loading", () => {
  it("deduplicates simultaneous requests", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => gardenCatalog });
    vi.stubGlobal("fetch", fetchMock);
    const { loadGardenHouseCatalog } = await import("./load-client-catalog");

    const [first, second] = await Promise.all([loadGardenHouseCatalog(), loadGardenHouseCatalog()]);

    expect(first).toEqual(gardenCatalog);
    expect(second).toEqual(gardenCatalog);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/data/garden-house/catalog.json", { signal: undefined, cache: "force-cache" });
  });

  it("retries after a failed request", async () => {
    const fetchMock = vi.fn()
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce({ ok: true, json: async () => gardenCatalog });
    vi.stubGlobal("fetch", fetchMock);
    const { loadGardenHouseCatalog } = await import("./load-client-catalog");

    await expect(loadGardenHouseCatalog()).rejects.toThrow("offline");
    await expect(loadGardenHouseCatalog()).resolves.toEqual(gardenCatalog);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
