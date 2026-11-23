import type { FlooringProduct } from "@/lib/flooring/types";

/** The flooring data reports compare these three groups; design and cork floors are not part of the sample. */
export const REPORTED_FLOORING_TYPES = [
  { key: "laminate", label: "Laminat" },
  { key: "vinyl-click", label: "Klickvinyl" },
  { key: "parquet-floating", label: "Fertigparkett" },
] as const;

const reportedTypes = new Set<FlooringProduct["flooringType"]>(REPORTED_FLOORING_TYPES.map(({ key }) => key));

export function isReportedFlooring(product: FlooringProduct): boolean { return reportedTypes.has(product.flooringType); }
