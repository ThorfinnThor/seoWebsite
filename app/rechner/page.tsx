import { PlannerDirectory } from "@/components/planner/PlannerDirectory";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { PLANNERS } from "@/lib/planners";
import { absoluteUrl } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Alle Rechner und Planer",
  description: "Kostenlose Planer für Gartenhaus, Gewächshaus, Carport, Mähroboter, Sicherheitskameras, Sicherheitskamera-Speicher, Trockenbau, Luftentfeuchter, Bewässerung, Terrasse, Sichtschutz und Bodenbeläge.",
  path: "/rechner/",
});

export default function RechnerPage() {
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "PassendPlanen Rechner und Planer",
      itemListElement: PLANNERS.map((planner, index) => ({ "@type": "ListItem", position: index + 1, name: planner.title, url: absoluteUrl(planner.href) })),
    }} />
    <section className="page-hero tool-hub-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Rechner & Planer" }]} />
      <p className="eyebrow">12 Rechner, kostenlos und ohne Anmeldung</p>
      <h1>Alle Rechner und Planer</h1>
      <p>Wähle dein Projekt und gib deine Maße ein. Am Ende stehen Mengen, Größen und passende Produkte.</p>
    </section>
    <PlannerDirectory />
    <section className="section planner-notes tool-principles">
      <div><h2>Wie die Rechner arbeiten</h2></div>
      <div className="note-grid"><article><h3>Gleiche Eingabe, gleiches Ergebnis</h3><p>Die Berechnung läuft direkt in deinem Browser. Deine Eingaben verlassen das Gerät nicht.</p></article><article><h3>Was offen bleibt, steht dabei</h3><p>Wo Messwerte, Fachplanung oder örtliche Vorgaben fehlen, sagen wir das und rechnen nichts schön.</p></article></div>
    </section>
  </>;
}
