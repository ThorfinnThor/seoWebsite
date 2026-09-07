import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerFaq } from "@/components/planner/PlannerFaq";
import { PlannerHeroSummary } from "@/components/planner/PlannerHeroSummary";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { SecurityCameraPlanner } from "./SecurityCameraPlanner";

export const metadata = createPageMetadata({
  title: "Sicherheitskamera Finder für Haus und Grundstück",
  description: "Sicherheitskameras nach Einsatzort, Verbindung, Stromversorgung, Auflösung, Schwenkfunktion, Licht und benötigter Anzahl auswählen.",
  path: "/haus/sicherheit/sicherheitskamera-finder/",
});

export default function Page() {
  return <>
    <PlannerJsonLd name="Sicherheitskamera Finder" description="Sicherheitskameras anhand der Einbausituation und technischer Pflichtkriterien auswählen." path="/haus/sicherheit/sicherheitskamera-finder/" />
    <section className="planner-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Haus", href: "/haus/" }, { label: "Sicherheit" }, { label: "Sicherheitskamera Finder" }]} />
      <div className="planner-hero-grid">
        <div><p className="eyebrow">Einsatzort · Verbindung · Installation</p><h1>Finde eine <em>Sicherheitskamera</em>, die zu deinem Standort passt.</h1><p>Der Finder prüft die technischen Pflichtkriterien und berücksichtigt, wie viele Bereiche du abdecken möchtest. Speicherregeln, Datenschutz und die tatsächliche Funkabdeckung bleiben vor der Montage gesondert zu klären.</p></div>
        <PlannerHeroSummary planner="security-camera" />
      </div>
    </section>
    <section className="planner-wrap"><SecurityCameraPlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Vor der Montage</p><h2>Technik und zulässiger Bildbereich gehören zusammen.</h2></div><div className="note-grid"><article><h3>Was der Finder prüft</h3><p>Einsatzort, Verbindung, Stromversorgung, Mindestauflösung, Kamerazahl, Schwenkfunktion, integriertes Licht und Budget.</p></article><article><h3>Was du selbst klärst</h3><p>Aufnahmebereich, Nachbargrundstücke, öffentliche Wege, Hinweispflichten, Speicherort, Löschfristen, WLAN Qualität und sichere Befestigung.</p></article></div></section>
    <PlannerFaq planner="security-camera" />
  </>;
}
