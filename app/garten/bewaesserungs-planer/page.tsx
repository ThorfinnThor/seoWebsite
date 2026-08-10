import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { IrrigationPlanner } from "./IrrigationPlanner";

export const metadata = createPageMetadata({
  title: "Bewässerungsplaner",
  description: "Tropfrohr, Systemkategorien und Steuerungszonen für Rasen, Beete und Hecken transparent abschätzen.",
  path: "/garten/bewaesserungs-planer/",
});

export default function Page() {
  return <>
    <PlannerJsonLd name="Bewässerungsplaner" description="Komponentenstruktur für Rasen-, Beet- und Heckenbewässerung planen." path="/garten/bewaesserungs-planer/" />
    <section className="planner-hero"><Breadcrumbs items={[{label:"Start",href:"/"},{label:"Garten",href:"/garten/"},{label:"Bewässerungsplaner"}]} /><div className="planner-hero-grid"><div><p className="eyebrow">Komponentenplan · keine Hydrauliksimulation</p><h1>Plane ein kompatibles Bewässerungs<em>system</em>.</h1><p>Erhalte eine erste Materialstruktur für Rasen, Beete und Hecken – mit klaren Hinweisen, was vor dem Kauf gemessen und geplant werden muss.</p></div><div className="hero-facts"><div><strong>4</strong><span>Planungsschritte</span></div><div><strong>1</strong><span>kompatibles System</span></div><div><strong>0</strong><span>vorgetäuschte Präzision</span></div></div></div></section>
    <section className="planner-wrap"><IrrigationPlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Planungsgrenze</p><h2>Materialstruktur statt CAD und Hydraulik.</h2></div><div className="note-grid"><article><h3>✓ Das wird geschätzt</h3><p>Tropfrohrlängen, Nutzungskategorien, Mindestzahl der Steuerungszonen sowie benötigte Komponententypen.</p></article><article><h3>! Vor Kauf prüfen</h3><p>Fließdruck, Durchfluss, Rohrdurchmesser, Druckverlust, Regnerpositionen, tatsächliche Abdeckung und Herstellerkompatibilität.</p></article></div></section>
    <section className="section related-guides"><div className="section-heading"><p className="eyebrow">Vor dem Einkauf vertiefen</p><h2>Vier Prüfaufgaben für einen belastbaren Plan.</h2><p>Die Ratgeber erklären genau die Punkte, die ein kurzer Komponentenrechner bewusst offenlassen muss.</p></div><div className="guide-grid"><Link className="guide-card" href="/garten/bewaesserung-durchfluss-messen/"><span className="guide-number">01 · Messen</span><h2>Durchfluss & Fließdruck</h2><p>Den Anschluss unter realistischen Bedingungen erfassen.</p><span className="card-link">Messung vorbereiten →</span></Link><Link className="guide-card" href="/garten/tropfbewaesserung-hecke/"><span className="guide-number">02 · Tropfen</span><h2>Hecken bewässern</h2><p>Tropfrohr, Filter, Druckminderung und Zonen zusammendenken.</p><span className="card-link">Tropfsystem planen →</span></Link><Link className="guide-card" href="/garten/rasenbewaesserung-planen/"><span className="guide-number">03 · Rasen</span><h2>Regner richtig einordnen</h2><p>Warum Geometrie und Überlappung wichtiger als Fläche allein sind.</p><span className="card-link">Rasenplanung lesen →</span></Link><Link className="guide-card" href="/garten/bewaesserungscomputer-zonen/"><span className="guide-number">04 · Steuern</span><h2>Zonen festlegen</h2><p>Controller, Ventile und Verbraucher kompatibel strukturieren.</p><span className="card-link">Steuerung planen →</span></Link></div></section>
  </>;
}
