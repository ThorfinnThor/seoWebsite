import { GardenHouseCatalogSchema, type GardenHouseCatalog } from "@/lib/garden-house/types";
import { DehumidifierCatalogSchema, type DehumidifierCatalog } from "@/lib/dehumidifier/types";

export async function loadGardenHouseCatalog(signal?: AbortSignal): Promise<GardenHouseCatalog> {
  const response = await fetch("/data/garden-house/catalog.json", { signal, cache: "no-store" });
  if (!response.ok) throw new Error("Katalog konnte nicht geladen werden");
  return GardenHouseCatalogSchema.parse(await response.json());
}

export async function loadDehumidifierCatalog(signal?: AbortSignal): Promise<DehumidifierCatalog> {
  const response = await fetch("/data/dehumidifier/catalog.json", { signal, cache: "no-store" });
  if (!response.ok) throw new Error("Katalog konnte nicht geladen werden");
  return DehumidifierCatalogSchema.parse(await response.json());
}
