import { writeFile } from "node:fs/promises";
import { buildLlmsFullTxt, buildLlmsTxt } from "../lib/llms-content";

await Promise.all([
  writeFile("public/llms.txt", buildLlmsTxt(), "utf8"),
  writeFile("public/llms-full.txt", buildLlmsFullTxt(), "utf8"),
]);

console.log("Generated llms.txt and llms-full.txt.");
