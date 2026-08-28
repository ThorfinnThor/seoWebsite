import type { ProductBase, StaticCatalog, OfferBase } from "@/lib/catalog/types";

export interface CatalogDimensionIssue { code: "suspicious-dimension" | "suspicious-capacity"; productId: string; detail: string; }

export function catalogDimensionIssues(catalog: StaticCatalog<ProductBase, OfferBase>): CatalogDimensionIssue[] {
  const issues: CatalogDimensionIssue[] = [];
  for (const product of catalog.products) {
    const value = product as ProductBase & Record<string, unknown>;
    if (catalog.vertical === "garden-house" && (outside(value.widthCm, 100, 2_000) || outside(value.depthCm, 100, 2_000))) issues.push(issue(product.id, "garden-house footprint outside 100-2000 cm"));
    if (catalog.vertical === "robot-mower" && outside(value.ratedAreaM2, 20, 100_000)) issues.push({ code: "suspicious-capacity", productId: product.id, detail: "rated area outside 20-100000 m²" });
    if (catalog.vertical !== "project-products") continue;
    if (value.vertical === "terrace" && value.kind === "decking") {
      if (outside(value.boardLengthMm, 500, 20_000) || outside(value.boardWidthMm, 50, 500) || outside(value.boardThicknessMm, 5, 100)) issues.push(issue(product.id, "terrace board dimensions outside plausible range"));
    }
    if (value.vertical === "privacy-screen" && value.kind === "panel" && (outside(value.panelWidthCm, 20, 1_000) || outside(value.panelHeightCm, 15, 500))) issues.push(issue(product.id, "privacy panel dimensions outside plausible range"));
    if (value.vertical === "drywall" && value.kind === "board" && (outside(value.boardLengthMm, 500, 6_000) || outside(value.boardWidthMm, 300, 2_000) || outside(value.boardThicknessMm, 5, 100))) issues.push(issue(product.id, "drywall board dimensions outside plausible range"));
    if ((value.vertical === "greenhouse" || value.vertical === "carport") && value.kind === "kit" && (outside(value.externalWidthM, 1, 50) || outside(value.externalLengthM, 1, 50))) issues.push(issue(product.id, `${String(value.vertical)} outside dimensions outside plausible range`));
  }
  return issues;
}

function outside(value: unknown, min: number, max: number): boolean { return typeof value === "number" && (value < min || value > max); }
function issue(productId: string, detail: string): CatalogDimensionIssue { return { code: "suspicious-dimension", productId, detail }; }
