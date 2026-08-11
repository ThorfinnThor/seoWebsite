import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { PlannerHeroSummary } from "@/components/planner/PlannerHeroSummary";
import { PlannerFaq } from "@/components/planner/PlannerFaq";
import { FlooringPlanner } from "./FlooringPlanner";

export const metadata = createPageMetadata({
  title: "Bodenbelag-Rechner für Laminat, Vinyl und Parkett",
  description: "Bodenfläche, Verschnitt, volle Pakete, Unterlage und Sockelleisten für Laminat, Klick-Vinyl und Fertigparkett berechnen.",
  path: "/haus/boden/bodenbelag-rechner/",
});

export default function Page() {
  return <>
    <PlannerJsonLd name="Bodenbelag-Mengenrechner" description="Materialrahmen für Laminat, Klick-Vinyl und schwimmend verlegtes Fertigparkett berechnen." path="/haus/boden/bodenbelag-rechner/" />
    <section className="planner-hero"><Breadcrumbs items={[{label:"Start",href:"/"},{label:"Haus",href:"/haus/"},{label:"Boden",href:"/haus/boden/"},{label:"Bodenbelag-Rechner"}]} /><div className="planner-hero-grid"><div><p className="eyebrow">Mengenschätzung · keine Verlegefreigabe</p><h1>Berechne Pakete und Zubehör für deinen <em>Bodenbelag</em>.</h1><p>Rechteckige Teilflächen, feste Abzüge, Dielen- und Paketmaß werden zu einem nachvollziehbaren Materialrahmen für Laminat, Klick-Vinyl oder Fertigparkett.</p></div><PlannerHeroSummary planner="flooring" /></div></section>
    <section className="planner-wrap"><FlooringPlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Was der Rechner leistet</p><h2>Bestellrahmen statt Verlegeanleitung.</h2></div><div className="note-grid"><article><h3>✓ Das wird berechnet</h3><p>Brutto- und Nettofläche, Verschnittreserve, volle Pakete, ungefähre Dielenzahl, Unterlagenrollen und Sockelleisten.</p></article><article><h3>! Das bleibt Planung</h3><p>Untergrundprüfung, Restfeuchte, Ebenheit, Dampfbremse, Dehnungsfugen, Übergänge, Fußbodenheizung und Feuchtraumfreigabe.</p></article></div></section>
    <PlannerFaq planner="flooring" />
    <section className="section related-guides"><div className="section-heading"><p className="eyebrow">Vor der Bestellung vertiefen</p><h2>Drei Details verändern Menge und Aufbau.</h2><p>Verschnitt, Untergrund und Raumumfang müssen mit dem konkreten Bodensystem zusammenpassen.</p></div><div className="guide-grid related-guides--three"><Link className="guide-card" href="/haus/boden/laminat-verschnitt-berechnen/"><span className="guide-number">01 · Fläche</span><h2>Verschnitt berechnen</h2><p>Raumgeometrie, Verlegerichtung und Paketreserve einordnen.</p><span className="card-link">Mengenplanung lesen →</span></Link><Link className="guide-card" href="/haus/boden/untergrund-trittschall/"><span className="guide-number">02 · Aufbau</span><h2>Untergrund & Unterlage</h2><p>Warum Quadratmeter allein keine Systementscheidung liefern.</p><span className="card-link">Aufbau verstehen →</span></Link><Link className="guide-card" href="/haus/boden/sockelleisten-berechnen/"><span className="guide-number">03 · Rand</span><h2>Sockelleisten berechnen</h2><p>Umfang, Türen, Innenkanten, Stöße und Reserve planen.</p><span className="card-link">Leistenbedarf lesen →</span></Link></div></section>
  </>;
}
