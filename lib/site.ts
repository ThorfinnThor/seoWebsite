export const SITE = {
  name: "MachPlan",
  workingName: true,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://seo-website-woad.vercel.app",
  description: "Deterministische Planer für Haus und Garten: Bedarf berechnen, Anforderungen verstehen und passende Produkte finden.",
} as const;
