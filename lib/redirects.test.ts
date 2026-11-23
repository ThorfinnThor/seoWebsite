import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { SEO_GUIDES } from "@/lib/seo-guides";

describe("permanent SEO redirects", () => {
  it("consolidates the duplicate mower navigation guide", async () => {
    const redirects = await readFile(new URL("../public/_redirects", import.meta.url), "utf8");

    expect(redirects).toContain(
      "/ratgeber/maehroboter-ohne-begrenzungskabel/ /garten/maehroboter-begrenzungskabel-kabellos/ 301",
    );
  });

  it("sends merged size guides to the remaining page", async () => {
    const redirects = await readFile(new URL("../public/_redirects", import.meta.url), "utf8");

    expect(redirects).toContain("/ratgeber/maehroboter-fuer-800-qm/ /ratgeber/maehroboter-fuer-1000-qm/ 301");
    expect(redirects).toContain("/ratgeber/terrasse-40-qm-material/ /ratgeber/terrasse-30-qm-material/ 301");
    const slugs = SEO_GUIDES.map((guide) => guide.slug);
    expect(slugs).not.toContain("maehroboter-fuer-800-qm");
    expect(slugs).not.toContain("terrasse-40-qm-material");
    expect(slugs).toEqual(expect.arrayContaining(["maehroboter-fuer-1000-qm", "terrasse-30-qm-material"]));
  });
});
