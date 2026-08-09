export interface PlannerStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function readPlannerState<T>(storage: PlannerStorage, key: string, parse: (value: unknown) => T | null): T | null {
  try {
    const raw = storage.getItem(key);
    if (!raw) return null;
    const parsed = parse(JSON.parse(raw));
    if (parsed === null) storage.removeItem(key);
    return parsed;
  } catch {
    try { storage.removeItem(key); } catch { /* storage may be unavailable */ }
    return null;
  }
}

export function writePlannerState<T>(storage: PlannerStorage, key: string, value: T): boolean {
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
