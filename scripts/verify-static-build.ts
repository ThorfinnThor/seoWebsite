import { access } from "node:fs/promises";
const required = ["out/index.html", "out/rechner/index.html", "out/garten/gartenhaus-planer/index.html", "out/garten/bewaesserungs-planer/index.html", "out/garten/bewaesserung-durchfluss-messen/index.html", "out/haus/raumklima/luftentfeuchter-rechner/index.html", "out/methodik/index.html", "out/ueber-machplan/index.html", "out/impressum/index.html", "out/datenschutz/index.html", "out/affiliate-transparenz/index.html", "out/404.html", "out/manifest.webmanifest", "out/data/garden-house/catalog.json", "out/data/dehumidifier/catalog.json", "out/data/irrigation/catalog.json"];
await Promise.all(required.map((file) => access(file)));
console.log(`Static build contains ${required.length} required launch artifacts.`);
