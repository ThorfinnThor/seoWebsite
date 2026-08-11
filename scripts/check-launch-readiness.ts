import { access, readFile } from "node:fs/promises";
import { PLANNERS } from "@/lib/planners";

type CheckStatus = "ready" | "blocked" | "manual";
type Check = { status: CheckStatus; label: string; detail: string };
type Catalog = { products?: unknown[]; offers?: unknown[] };

const exists = async (path: string) => access(path).then(() => true).catch(() => false);
const read = (path: string) => readFile(path, "utf8");
const catalog = async (path: string): Promise<Catalog> => JSON.parse(await read(path));

const [nextConfig, gardenHouse, dehumidifier, irrigation] = await Promise.all([
  read("next.config.ts"),
  catalog("public/data/garden-house/catalog.json"),
  catalog("public/data/dehumidifier/catalog.json"),
  catalog("public/data/irrigation/catalog.json"),
]);

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://seo-website-woad.vercel.app").trim();
const legalEmail = process.env.NEXT_PUBLIC_LEGAL_EMAIL?.trim();
const emailReady = Boolean(legalEmail && !/^(you|test|example)@/i.test(legalEmail));
const temporaryDomain = /vercel\.app|seo-website/i.test(siteUrl);
const catalogProducts = (gardenHouse.products?.length ?? 0) + (dehumidifier.products?.length ?? 0) + (irrigation.products?.length ?? 0);
const catalogOffers = (gardenHouse.offers?.length ?? 0) + (dehumidifier.offers?.length ?? 0) + (irrigation.offers?.length ?? 0);

const checks: Check[] = [
  {
    status: nextConfig.includes('output: "export"') || nextConfig.includes("output: 'export'") ? "ready" : "blocked",
    label: "Statischer Betrieb",
    detail: "Next.js muss vollständig als statische Website exportieren.",
  },
  {
    status: await exists("out/index.html") && await exists("out/rechner/index.html") ? "ready" : "blocked",
    label: "Produktions-Build",
    detail: "Startseite und Rechnerübersicht müssen im Export vorhanden sein.",
  },
  {
    status: PLANNERS.length === 10 ? "ready" : "blocked",
    label: "Rechner",
    detail: `${PLANNERS.length} von 10 geplanten Rechnern sind registriert.`,
  },
  {
    status: await exists(".github/workflows/ci.yml") ? "ready" : "blocked",
    label: "Automatische Qualitätsprüfung",
    detail: "GitHub CI prüft Daten, Tests, TypeScript und Build.",
  },
  {
    status: emailReady ? "ready" : "blocked",
    label: "Öffentlicher Rechtskontakt",
    detail: emailReady ? `Rechtskontakt ist als ${legalEmail} konfiguriert.` : "NEXT_PUBLIC_LEGAL_EMAIL fehlt; Impressum und Datenschutz bleiben deshalb noindex und als Entwurf markiert.",
  },
  {
    status: temporaryDomain ? "manual" : "ready",
    label: "Name und Domain",
    detail: temporaryDomain ? `Aktuell wird die vorläufige Adresse ${siteUrl} verwendet.` : `Produktionsadresse ist ${siteUrl}.`,
  },
  {
    status: catalogProducts > 0 && catalogOffers > 0 ? "ready" : "blocked",
    label: "Geprüfte Affiliate-Produkte",
    detail: `${catalogProducts} geprüfte Produkte und ${catalogOffers} öffentliche Angebote in den Affiliate-Katalogen.`,
  },
  {
    status: process.env.AWIN_FEED_URLS_JSON ? "ready" : "manual",
    label: "Awin-Feed in GitHub",
    detail: process.env.AWIN_FEED_URLS_JSON ? "Feed-Konfiguration ist in dieser Umgebung vorhanden." : "GitHub-Secret AWIN_FEED_URLS_JSON kann lokal nicht bestätigt werden und muss in GitHub geprüft werden.",
  },
];

const symbols: Record<CheckStatus, string> = { ready: "✓", blocked: "✕", manual: "!" };
console.log("\nMachPlan Launch-Readiness\n");
for (const check of checks) console.log(`${symbols[check.status]} ${check.label}: ${check.detail}`);

const technicalBlockers = checks.filter((check) => check.status === "blocked" && !["Öffentlicher Rechtskontakt", "Geprüfte Affiliate-Produkte"].includes(check.label));
const publicBlockers = checks.filter((check) => check.status === "blocked");

console.log("\nErgebnis");
console.log(technicalBlockers.length === 0 ? "✓ Technischer Rechner-Preview ist startklar." : `✕ ${technicalBlockers.length} technische Blocker verbleiben.`);
console.log(publicBlockers.length === 0 ? "✓ Vollständiger öffentlicher Affiliate-Launch ist startklar." : `✕ ${publicBlockers.length} Blocker für den vollständigen öffentlichen Affiliate-Launch verbleiben.`);
