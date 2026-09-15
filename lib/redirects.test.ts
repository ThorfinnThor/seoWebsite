import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("permanent SEO redirects", () => {
  it("consolidates the duplicate mower navigation guide", async () => {
    const redirects = await readFile(new URL("../public/_redirects", import.meta.url), "utf8");

    expect(redirects).toContain(
      "/ratgeber/maehroboter-ohne-begrenzungskabel/ /garten/maehroboter-begrenzungskabel-kabellos/ 301",
    );
  });
});
