import type { Metadata } from "next";

import { GardenHousePlanner } from "@/app/garten/gartenhaus-planer/GardenHousePlanner";

export const metadata: Metadata = {
  title: "Gartenhaus-Planer Embed",
  robots: { index: false, follow: false },
};

export default function GardenHousePlannerEmbedPage() {
  return (
    <div className="embed-route">
      <h1 className="embed-route__title">Gartenhaus-Planer</h1>
      <GardenHousePlanner />
    </div>
  );
}
