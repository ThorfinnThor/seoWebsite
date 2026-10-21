import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { PlannerHeroSummary } from "@/components/planner/PlannerHeroSummary";
import { PlannerFaq } from "@/components/planner/PlannerFaq";
import { PlannerGuide } from "@/components/planner/PlannerGuide";
import { TopicLinks } from "@/components/seo/TopicLinks";
import { CarportPlanner } from "./CarportPlanner";

export const metadata = createPageMetadata({
  title: "Carport-Planer: Größe & Maße kostenlos berechnen",
  description: "Kostenloser Carport-Planer für Einzel- und Doppelcarport: lichte Breite, Länge und Höhe aus Fahrzeug, Türraum, Zufahrt und Stauraum berechnen.",
  path: "/garten/carport-planer/",
});

export default function Page() {
  return <>
    <PlannerJsonLd name="Carport-Planer" description="Kostenloser Carport-Planer für lichten Stellraum, Bewegungsreserven, Planungsfläche und Dachwasserrahmen von Einzel- und Doppelcarports." path="/garten/carport-planer/" />
    <section className="planner-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Carport-Planer" }]} />
      <div className="planner-hero-grid"><div><p className="eyebrow">Fahrzeug · Freiraum · Standort</p><h1>Carport planen: Größe und lichte Maße deines <em>Carports</em> berechnen.</h1><p>Der kostenlose Carport-Planer macht aus Fahrzeugmaßen, Tür- und Bewegungsraum, Zufahrt und Stauraum lichte Zielmaße für Einzel- oder Doppelcarport. So lassen sich Bausätze vergleichen, bevor Fundament und Dach geplant werden.</p></div><PlannerHeroSummary planner="carport" /></div>
    </section>
    <section className="planner-wrap"><CarportPlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Was der Planer leistet</p><h2>Platzbedarf statt Bauplanung.</h2></div><div className="note-grid"><article><h3>✓ Das wird berechnet</h3><p>Lichte Zielbreite, -länge und -höhe, Stell- und Bewegungsfläche sowie theoretisches Regenwasser je 10 Millimeter Niederschlag.</p></article><article><h3>! Das bleibt Fachplanung</h3><p>Außenmaße, Pfosten, Fundament, Statik, Wind- und Schneelast, Anschlüsse, Entwässerung, Elektrik und örtliche Anforderungen.</p></article></div></section>
    <PlannerGuide planner="carport" />
    <PlannerFaq planner="carport" />
    <section className="section related-guides"><div className="section-heading"><p className="eyebrow">Vor Auswahl und Aufbau vertiefen</p><h2>Drei Details entscheiden über die Nutzbarkeit.</h2><p>Ausreichender Innenraum, tragfähige Gründung und kontrolliertes Dachwasser müssen zum konkreten Grundstück und System passen.</p></div><div className="guide-grid related-guides--three"><Link className="guide-card" href="/garten/carport-groesse/"><span className="guide-number">01 · Raum</span><h2>Carport-Größe planen</h2><p>Fahrzeug, Türen, Heckklappe, Zufahrt und Reserve zusammenbringen.</p><span className="card-link">Größe einordnen →</span></Link><Link className="guide-card" href="/garten/carport-fundament/"><span className="guide-number">02 · Tragwerk</span><h2>Fundament verstehen</h2><p>Warum lichte Maße noch keine Pfosten- oder Fundamentposition bestimmen.</p><span className="card-link">Gründung einordnen →</span></Link><Link className="guide-card" href="/garten/carport-dachentwaesserung/"><span className="guide-number">03 · Wasser</span><h2>Dachentwässerung planen</h2><p>Gefälle, Rinne, Fallrohr, Speicher und Überlauf frühzeitig verbinden.</p><span className="card-link">Dachwasser planen →</span></Link></div></section>
    <TopicLinks topicSlug="carport" currentPath="/garten/carport-planer/" exclude={["/garten/carport-groesse/", "/garten/carport-fundament/", "/garten/carport-dachentwaesserung/"]} />
  </>;
}
