import { describe, expect, it } from "vitest";
import exclusions from "@/data/manual/guide-product-exclusions.json";
import { GUIDE_FIGURE_PATHS } from "@/components/figures/GuideFigure";
import { merchantLabel } from "@/lib/catalog/merchant-label";
import { displayName, getGuideProducts } from "@/lib/guide-products";
import { resolveTopicForPage } from "@/lib/internal-links";
import { SEO_GUIDES } from "@/lib/seo-guides";
import { SEO_GUIDE_REWRITES } from "@/lib/seo-guide-rewrites";

const selections = SEO_GUIDES.map((guide) => {
  const path = `/ratgeber/${guide.slug}/`;
  return { path, selection: getGuideProducts(resolveTopicForPage(path)?.slug, path) };
}).filter((entry) => entry.selection !== undefined);

describe("guide products", () => {
  it("covers most guides and stays small", () => {
    expect(selections.length).toBeGreaterThan(SEO_GUIDES.length * 0.8);
    for (const { path, selection } of selections) {
      expect(selection!.products.length, path).toBeGreaterThanOrEqual(2);
      expect(selection!.products.length, path).toBeLessThanOrEqual(3);
      expect(new Set(selection!.products.map((product) => product.id)).size, path).toBe(selection!.products.length);
    }
  });

  it("links only to tracked partner offers and never to excluded products", () => {
    const excluded = new Set(exclusions.products.map((product) => product.id));
    for (const { path, selection } of selections) {
      for (const product of selection!.products) {
        expect(new URL(product.url).hostname, path).toMatch(/(^|\.)awin1\.com$/);
        expect(excluded.has(product.id), product.name).toBe(false);
      }
    }
  });

  it("names the selection criterion and shows no price", () => {
    for (const { path, selection } of selections) {
      expect(selection!.basis.length, path).toBeGreaterThan(20);
      expect(JSON.stringify(selection!.products), path).not.toMatch(/€|EUR/);
    }
  });

  it("respects the size stated in the guide", () => {
    const mower = getGuideProducts("maehroboter", "/ratgeber/maehroboter-fuer-500-qm/");
    for (const product of mower!.products) {
      const area = Number(product.facts[0].match(/bis ([\d.]+) m²/)![1].replace(".", ""));
      expect(area).toBeGreaterThanOrEqual(600);
    }
    const laminate = getGuideProducts("bodenbelag", "/ratgeber/laminat-fuer-20-qm/");
    expect(laminate!.products.every((product) => /laminat/i.test(product.name))).toBe(true);
  });

  it("cleans merchant names and keyword tails", () => {
    expect(merchantLabel("Globus Baumarkt DE")).toBe("Globus Baumarkt");
    expect(merchantLabel("Benz24 DE/AT")).toBe("Benz24");
    expect(merchantLabel("Meaco GmbH DE")).toBe("Meaco");
    expect(displayName("Knauf Gipskartonplatte Horizonboard GKF Gipsplatte günstig")).toBe("Knauf Gipskartonplatte Horizonboard GKF");
  });
});

describe("rewritten guides", () => {
  it("only exist for real guides", () => {
    const slugs = new Set(SEO_GUIDES.map((guide) => guide.slug));
    expect(Object.keys(SEO_GUIDE_REWRITES)).toHaveLength(49);
    for (const slug of Object.keys(SEO_GUIDE_REWRITES)) expect(slugs.has(slug), slug).toBe(true);
    for (const path of GUIDE_FIGURE_PATHS) expect(slugs.has(path.split("/")[2]), path).toBe(true);
  });
});
