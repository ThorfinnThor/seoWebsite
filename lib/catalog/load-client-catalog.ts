import { GardenHouseCatalogSchema, type GardenHouseCatalog } from "@/lib/garden-house/types";
import { DehumidifierCatalogSchema, type DehumidifierCatalog } from "@/lib/dehumidifier/types";
import { RobotMowerCatalogSchema, type RobotMowerCatalog } from "@/lib/robot-mower/types";
import { FlooringCatalogSchema, type FlooringCatalog } from "@/lib/flooring/types";
import { IrrigationCatalogSchema, type IrrigationCatalog } from "@/lib/irrigation/types";
import { ProjectCatalogSchema, type ProjectCatalog } from "@/lib/project-products/types";

let gardenHouseCatalogRequest: Promise<GardenHouseCatalog> | null = null;
let dehumidifierCatalogRequest: Promise<DehumidifierCatalog> | null = null;
let robotMowerCatalogRequest: Promise<RobotMowerCatalog> | null = null;
let flooringCatalogRequest: Promise<FlooringCatalog> | null = null;
let irrigationCatalogRequest: Promise<IrrigationCatalog> | null = null;
let projectCatalogRequest: Promise<ProjectCatalog> | null = null;

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

export async function loadRobotMowerCatalog(signal?: AbortSignal): Promise<RobotMowerCatalog> {
  if (signal) return fetchCatalog("/data/robot-mower/catalog.json", RobotMowerCatalogSchema.parse, signal);
  robotMowerCatalogRequest ??= fetchCatalog("/data/robot-mower/catalog.json", RobotMowerCatalogSchema.parse).catch((error) => { robotMowerCatalogRequest = null; throw error; });
  return robotMowerCatalogRequest;
}

export async function loadFlooringCatalog(signal?: AbortSignal): Promise<FlooringCatalog> {
  if (signal) return fetchCatalog("/data/flooring/catalog.json", FlooringCatalogSchema.parse, signal);
  flooringCatalogRequest ??= fetchCatalog("/data/flooring/catalog.json", FlooringCatalogSchema.parse).catch((error) => { flooringCatalogRequest = null; throw error; });
  return flooringCatalogRequest;
}

export async function loadIrrigationCatalog(signal?: AbortSignal): Promise<IrrigationCatalog> {
  if (signal) return fetchCatalog("/data/irrigation/catalog.json", IrrigationCatalogSchema.parse, signal);
  irrigationCatalogRequest ??= fetchCatalog("/data/irrigation/catalog.json", IrrigationCatalogSchema.parse).catch((error) => { irrigationCatalogRequest = null; throw error; });
  return irrigationCatalogRequest;
}

export async function loadProjectCatalog(signal?: AbortSignal): Promise<ProjectCatalog> {
  if (signal) return fetchCatalog("/data/project-products/catalog.json", ProjectCatalogSchema.parse, signal);
  projectCatalogRequest ??= fetchCatalog("/data/project-products/catalog.json", ProjectCatalogSchema.parse).catch((error) => { projectCatalogRequest = null; throw error; });
  return projectCatalogRequest;
}

async function fetchCatalog<T>(url: string, parse: (value: unknown) => T, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal, cache: "force-cache" });
  if (!response.ok) throw new Error("Katalog konnte nicht geladen werden");
  return parse(await response.json());
}
