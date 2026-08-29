import { describe, expect, it } from "vitest";
import { generateMetadata as projectMetadata } from "@/app/ratgeber/projekte/[topic]/[slug]/page";
import { generateMetadata as comparisonMetadata } from "@/app/ratgeber/vergleiche/[topic]/[slug]/page";

describe("indexing policy for programmatic detail pages", () => {
  it("keeps project profiles available but out of the index", async () => {
    const metadata = await projectMetadata({
      params: Promise.resolve({ topic: "maehroboter", slug: "maehroboter-100-qm-offen" }),
    });

    expect(metadata.robots).toEqual({ index: false, follow: true });
  });

  it("keeps generated direct comparisons available but out of the index", async () => {
    const metadata = await comparisonMetadata({
      params: Promise.resolve({ topic: "maehroboter", slug: "maehroboter-begrenzungskabel-oder-rtk-300-qm" }),
    });

    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});
