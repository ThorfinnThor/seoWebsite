import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";
import { vitestAliasRoot } from "./vitest.config";

describe("Vitest alias root", () => {
  it("decodes file URLs when the checkout path contains spaces", () => {
    const configPath = join(tmpdir(), "passend planen", "vitest.config.ts");
    const root = vitestAliasRoot(pathToFileURL(configPath));

    expect(root).toBe(dirname(configPath));
    expect(root).not.toContain("%20");
  });
});
