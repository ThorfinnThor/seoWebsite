import { defineConfig } from "vitest/config";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export function vitestAliasRoot(configUrl: string | URL): string {
  return dirname(fileURLToPath(configUrl));
}

const root = vitestAliasRoot(import.meta.url);

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
  },
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: `${root}/`,
      },
    ],
  },
});
