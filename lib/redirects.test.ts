import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("permanent SEO redirects", () => {
  it("consolidates the duplicate mower navigation guide", async () => {
    const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8")) as {
      redirects: Array<{ source: string; destination: string; statusCode: number }>;
    };

    expect(config.redirects).toContainEqual({
      source: "/ratgeber/maehroboter-ohne-begrenzungskabel/",
      destination: "/garten/maehroboter-begrenzungskabel-kabellos/",
      statusCode: 301,
    });
  });
});
