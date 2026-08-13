export type PlannerDirectoryFilter = "all" | "garden" | "house";

export function parsePlannerDirectoryFilter(value: string | null): PlannerDirectoryFilter {
  return value === "garden" || value === "house" ? value : "all";
}

export function plannerDirectoryUrl(filter: PlannerDirectoryFilter, currentUrl: string) {
  const url = new URL(currentUrl);
  if (filter === "all") url.searchParams.delete("bereich");
  else url.searchParams.set("bereich", filter);
  return `${url.pathname}${url.search}${url.hash}`;
}
