export const SITE = {
  name: "PassendPlanen",
  workingName: false,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.passendplanen.de",
  description: "Deterministische Planer für Haus und Garten: Bedarf berechnen, Anforderungen verstehen und passende Produkte finden.",
} as const;

export const absoluteUrl = (path = "/") => `${SITE.url.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
