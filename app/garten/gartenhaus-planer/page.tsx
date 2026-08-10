import { createPageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { PlannerHeroSummary } from "@/components/planner/PlannerHeroSummary";
import { GardenHousePlanner } from "./GardenHousePlanner";

export const metadata = createPageMetadata({
  title: "Gartenhaus-Planer",
  description: "Mindestfläche berechnen und geprüfte Gartenhäuser nach Stellfläche, Nutzung, Budget, Material, Dach und Boden filtern.",
  path: "/garten/gartenhaus-planer/",
});

export default function GardenHousePlannerPage() {
  return <>
    <PlannerJsonLd name="Gartenhaus-Planer" description="Mindestfläche und Anforderungen für ein Gartenhaus bestimmen." path="/garten/gartenhaus-planer/" />
    <section className="planner-hero"><Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Gartenhaus-Planer" }]} /><div className="planner-hero-grid"><div><p className="eyebrow">Kostenlos · ohne Anmeldung</p><h1>Finde ein Gartenhaus, das zu deinem <em>Projekt</em> passt.</h1><p>Wir berechnen deinen Lagerbedarf und prüfen Stellfläche, Zugang, Ausstattung und Budget – nachvollziehbar und ohne Verkaufsprovision im Ranking.</p></div><PlannerHeroSummary planner="garden-house" /></div></section>
    <section className="planner-wrap"><GardenHousePlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Was der Planer leistet</p><h2>Planungshilfe, keine amtliche oder technische Freigabe.</h2></div><div className="note-grid"><article><h3>✓ Das wird geprüft</h3><p>Lagerflächenbedarf, bekannte Außenmaße, Türbreite, Bodenoption, Material, Dachform, Verfügbarkeit und Budgetstatus.</p></article><article><h3>! Das musst du prüfen</h3><p>Baugenehmigung, Abstände, Statik, Schnee- und Windlast, Fundament sowie die tatsächlich nutzbare Fläche vor Ort.</p></article></div></section>
  </>;
}
