import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { PlannerHeroSummary } from "@/components/planner/PlannerHeroSummary";
import { PlannerFaq } from "@/components/planner/PlannerFaq";
import { CarportPlanner } from "./CarportPlanner";

export const metadata = createPageMetadata({
  title: "Carport-Planer: Größe und lichten Stellraum berechnen",
  description: "Lichte Carport-Breite, Länge, Höhe, Bewegungsraum, Stauraum und Dachwasserrahmen für ein oder zwei Fahrzeuge planen.",
  path: "/garten/carport-planer/",
});

export default function Page() {
  return <>
    <PlannerJsonLd name="Carport-Planer" description="Lichten Stellraum, Bewegungsreserven, Planungsfläche und Dachwasserrahmen für einen Carport berechnen." path="/garten/carport-planer/" />
    <section className="planner-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Carport-Planer" }]} />
      <div className="planner-hero-grid"><div><p className="eyebrow">Fahrzeug · Freiraum · Standort</p><h1>Plane den lichten Raum deines <em>Carports</em> vor der Produktauswahl.</h1><p>Fahrzeugmaße, Tür- und Bewegungsraum, Zufahrt, Stauraum und Dachaufgaben werden zu einem nachvollziehbaren Platzrahmen.</p></div><PlannerHeroSummary planner="carport" /></div>
    </section>
    <section className="planner-wrap"><CarportPlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Was der Planer leistet</p><h2>Platzbedarf statt Bauplanung.</h2></div><div className="note-grid"><article><h3>✓ Das wird berechnet</h3><p>Lichte Zielbreite, -länge und -höhe, Stell- und Bewegungsfläche sowie theoretisches Regenwasser je 10 Millimeter Niederschlag.</p></article><article><h3>! Das bleibt Fachplanung</h3><p>Außenmaße, Pfosten, Fundament, Statik, Wind- und Schneelast, Anschlüsse, Entwässerung, Elektrik und örtliche Anforderungen.</p></article></div></section>
    <PlannerFaq planner="carport" />
    <section className="section related-guides"><div className="section-heading"><p className="eyebrow">Vor Auswahl und Aufbau vertiefen</p><h2>Drei Details entscheiden über die Nutzbarkeit.</h2><p>Ausreichender Innenraum, tragfähige Gründung und kontrolliertes Dachwasser müssen zum konkreten Grundstück und System passen.</p></div><div className="guide-grid related-guides--three"><Link className="guide-card" href="/garten/carport-groesse/"><span className="guide-number">01 · Raum</span><h2>Carport-Größe planen</h2><p>Fahrzeug, Türen, Heckklappe, Zufahrt und Reserve zusammenbringen.</p><span className="card-link">Größe einordnen →</span></Link><Link className="guide-card" href="/garten/carport-fundament/"><span className="guide-number">02 · Tragwerk</span><h2>Fundament verstehen</h2><p>Warum lichte Maße noch keine Pfosten- oder Fundamentposition bestimmen.</p><span className="card-link">Gründung einordnen →</span></Link><Link className="guide-card" href="/garten/carport-dachentwaesserung/"><span className="guide-number">03 · Wasser</span><h2>Dachentwässerung planen</h2><p>Gefälle, Rinne, Fallrohr, Speicher und Überlauf frühzeitig verbinden.</p><span className="card-link">Dachwasser planen →</span></Link></div></section>
  </>;
}
