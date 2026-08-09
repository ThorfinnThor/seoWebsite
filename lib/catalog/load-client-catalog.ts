import { GardenHouseCatalogSchema, type GardenHouseCatalog } from "@/lib/garden-house/types";

export async function loadGardenHouseCatalog(signal?: AbortSignal): Promise<GardenHouseCatalog> {
  const response = await fetch("/data/garden-house/catalog.json", { signal, cache: "no-store" });
  if (!response.ok) throw new Error("Katalog konnte nicht geladen werden");
  return GardenHouseCatalogSchema.parse(await response.json());
}
