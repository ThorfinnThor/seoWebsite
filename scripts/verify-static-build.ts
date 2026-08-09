import { access } from "node:fs/promises";
const required = ["out/index.html", "out/garten/gartenhaus-planer/index.html", "out/data/garden-house/catalog.json"];
await Promise.all(required.map((file) => access(file)));
console.log(`Static build contains ${required.length} required launch artifacts.`);
