import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { PlannerHeroSummary } from "@/components/planner/PlannerHeroSummary";
import { TerracePlanner } from "./TerracePlanner";

export const metadata = createPageMetadata({
  title: "Terrassendielen-Rechner",
  description: "Dielenreihen, Laufmeter, Verschnitt, Lieferdielen und Unterkonstruktion für eine rechteckige Terrasse transparent abschätzen.",
  path: "/garten/terrassen-dielen-rechner/",
});

export default function Page() {
  return <>
    <PlannerJsonLd name="Terrassendielen-Rechner" description="Materialrahmen für Terrassendielen und Unterkonstruktion abschätzen." path="/garten/terrassen-dielen-rechner/" />
    <section className="planner-hero"><Breadcrumbs items={[{label:"Start",href:"/"},{label:"Garten",href:"/garten/"},{label:"Terrassendielen-Rechner"}]} /><div className="planner-hero-grid"><div><p className="eyebrow">Mengenschätzung · keine Ausführungsplanung</p><h1>Berechne den Materialrahmen für deine <em>Terrasse</em>.</h1><p>Fläche, Verlegerichtung, Dielenmaß, Fuge und Hersteller-Auflagerabstand werden zu einem nachvollziehbaren Mengenplan verbunden.</p></div><PlannerHeroSummary planner="terrace" /></div></section>
    <section className="planner-wrap"><TerracePlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Was der Rechner leistet</p><h2>Mengenrahmen statt Bauanleitung.</h2></div><div className="note-grid"><article><h3>✓ Das wird berechnet</h3><p>Fläche, Dielenreihen, Laufmeter, Verschnittreserve, ungefähre Lieferdielen, Auflagerlinien und Kreuzungspunkte.</p></article><article><h3>! Das bleibt Planung</h3><p>Untergrund, Statik, Entwässerung, Gefälle, Befestigung, Randabstände, Stoßdetails und örtliche Vorgaben.</p></article></div></section>
    <section className="section related-guides"><div className="section-heading"><p className="eyebrow">Vor der Bestellung vertiefen</p><h2>Drei Themen verändern den Materialbedarf.</h2><p>Ein guter Mengenplan braucht Herstellerangaben, einen Zuschnittplan und ein vollständiges Projektbudget.</p></div><div className="guide-grid related-guides--three"><Link className="guide-card" href="/garten/terrassendielen-verschnitt-fugen/"><span className="guide-number">01 · Belag</span><h2>Verschnitt und Fugen</h2><p>Verlegebreite, Stoßbild und sinnvolle Reserven verstehen.</p><span className="card-link">Dielenplanung lesen →</span></Link><Link className="guide-card" href="/garten/terrasse-unterkonstruktion/"><span className="guide-number">02 · Aufbau</span><h2>Unterkonstruktion</h2><p>Auflagerabstand, Kreuzungspunkte und Systemgrenzen einordnen.</p><span className="card-link">Aufbau verstehen →</span></Link><Link className="guide-card" href="/garten/terrasse-kosten/"><span className="guide-number">03 · Budget</span><h2>Gesamtkosten</h2><p>Belag, Unterbau, Befestigung und Reserven vollständig planen.</p><span className="card-link">Budget vorbereiten →</span></Link></div></section>
  </>;
}
