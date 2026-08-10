import { PlannerIcon } from "@/components/icons/PlannerIcon";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { PLANNERS } from "@/lib/planners";
import { absoluteUrl } from "@/lib/site";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Alle Rechner und Planer",
  description: "Kostenlose Planer für Gartenhaus, Gewächshaus, Carport, Mähroboter, Trockenbau, Luftentfeuchter, Bewässerung, Terrasse, Sichtschutz und Bodenbeläge – ohne Anmeldung.",
  path: "/rechner/",
});

export default function RechnerPage() {
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "MachPlan Rechner und Planer",
      itemListElement: PLANNERS.map((planner, index) => ({ "@type": "ListItem", position: index + 1, name: planner.title, url: absoluteUrl(planner.href) })),
    }} />
    <section className="page-hero tool-hub-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Rechner & Planer" }]} />
      <p className="eyebrow">10 Rechner · kostenlos · ohne Anmeldung</p>
      <h1>Welches Projekt möchtest du als Nächstes klären?</h1>
      <p>Jeder Planer übersetzt wenige Angaben in nachvollziehbare Anforderungen. Die Karten zeigen dir jetzt direkt, welche konkreten Ergebnisse du erhältst.</p>
    </section>
    <section className="section tool-grid" aria-label="Verfügbare Planer">
      {PLANNERS.map((planner) => <article className="tool-card" key={planner.id}>
        <div className="tool-card-top"><span className="feature-icon" aria-hidden="true"><PlannerIcon name={planner.icon} /></span><span className="status-pill">{planner.category}</span></div>
        <h2>{planner.title}</h2>
        <p>{planner.description}</p>
        <p className="tool-card-results-label">Das Ergebnis:</p>
        <ul>{planner.outputs.map((output) => <li key={output}><span aria-hidden="true">✓</span>{output}</li>)}</ul>
        <Link className="button button--primary" href={planner.href}>{planner.cta} →</Link>
      </article>)}
    </section>
    <section className="section planner-notes tool-principles">
      <div><p className="eyebrow">Ein gemeinsames Prinzip</p><h2>Erst harte Kriterien, dann Vergleich.</h2></div>
      <div className="note-grid"><article><h3>Gleiche Eingabe, gleiches Ergebnis</h3><p>Die Berechnungen sind deterministisch und laufen direkt im Browser. Es gibt kein KI-Raten und kein verstecktes Nutzerprofil.</p></article><article><h3>Grenzen bleiben sichtbar</h3><p>Wo Messwerte, Fachplanung oder örtliche Vorgaben fehlen, zeigt MachPlan eine offene Prüfaufgabe statt einer erfundenen Sicherheit.</p></article></div>
    </section>
  </>;
}
