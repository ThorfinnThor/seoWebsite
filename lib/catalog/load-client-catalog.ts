import { GardenHouseCatalogSchema, type GardenHouseCatalog } from "@/lib/garden-house/types";
import { DehumidifierCatalogSchema, type DehumidifierCatalog } from "@/lib/dehumidifier/types";

let gardenHouseCatalogRequest: Promise<GardenHouseCatalog> | null = null;
let dehumidifierCatalogRequest: Promise<DehumidifierCatalog> | null = null;

export async function loadGardenHouseCatalog(signal?: AbortSignal): Promise<GardenHouseCatalog> {
  if (signal) return fetchCatalog("/data/garden-house/catalog.json", GardenHouseCatalogSchema.parse, signal);
  gardenHouseCatalogRequest ??= fetchCatalog("/data/garden-house/catalog.json", GardenHouseCatalogSchema.parse).catch((error) => {
    gardenHouseCatalogRequest = null;
    throw error;
  });
  return gardenHouseCatalogRequest;
}

export async function loadDehumidifierCatalog(signal?: AbortSignal): Promise<DehumidifierCatalog> {
  if (signal) return fetchCatalog("/data/dehumidifier/catalog.json", DehumidifierCatalogSchema.parse, signal);
  dehumidifierCatalogRequest ??= fetchCatalog("/data/dehumidifier/catalog.json", DehumidifierCatalogSchema.parse).catch((error) => {
    dehumidifierCatalogRequest = null;
    throw error;
  });
  return dehumidifierCatalogRequest;
}

async function fetchCatalog<T>(url: string, parse: (value: unknown) => T, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal, cache: "force-cache" });
  if (!response.ok) throw new Error("Katalog konnte nicht geladen werden");
  return parse(await response.json());
}
