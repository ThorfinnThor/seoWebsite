import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
  },
  resolve: {
    // fileURLToPath decodes the URL, so paths containing spaces resolve correctly.
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
});
