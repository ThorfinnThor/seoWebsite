import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PassendPlanen – Haus und Garten planen",
    short_name: "PassendPlanen",
    description: "Deterministische Planer für Haus und Garten.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffefa",
    theme_color: "#174d3a",
    lang: "de-DE",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
