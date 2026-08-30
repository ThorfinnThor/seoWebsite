import type { PlannerId } from "@/lib/planners";

const TOPIC_RULES: readonly [RegExp, PlannerId][] = [
  [/gartenhaus/, "garden-house"],
  [/luftentfeuchter|raumklima|feuchte/, "dehumidifier"],
  [/bewaesser|tropf|durchfluss/, "irrigation"],
  [/terrasse|dielen/, "terrace"],
  [/sichtschutz|zaun|gartentor/, "privacy-screen"],
  [/boden|laminat|sockelleiste|trittschall/, "flooring"],
  [/gewaechshaus/, "greenhouse"],
  [/maehroboter|rasenroboter/, "robot-mower"],
  [/carport/, "carport"],
  [/trockenbau|staenderwerk/, "drywall"],
];

export function socialImageForPath(path: string) {
  const normalized = path.toLowerCase();
  const match = TOPIC_RULES.find(([pattern]) => pattern.test(normalized));
  return `/social/${match?.[1] ?? "passendplanen"}.png`;
}

export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 } as const;
