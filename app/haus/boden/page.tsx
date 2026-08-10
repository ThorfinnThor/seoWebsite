import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = { title: "Bodenbeläge planen", description: "Bodenbelag-Rechner und Ratgeber für Laminat, Klick-Vinyl, Fertigparkett, Verschnitt, Unterlage und Sockelleisten." };

export default function FlooringHubPage() {
  return <>
    <section className="page-hero"><Breadcrumbs items={[{label:"Start",href:"/"},{label:"Haus",href:"/haus/"},{label:"Boden"}]} /><p className="eyebrow">Projektbereich Boden</p><h1>Vom Raummaß zur bestellbaren Paketmenge.</h1><p>Berechne Bodenbelag und Zubehör transparent. Die Ratgeber helfen dir, Verschnitt, Untergrund und Randabschlüsse richtig einzuordnen.</p></section>
    <section className="section"><Link className="planner-banner" href="/haus/boden/bodenbelag-rechner/"><div><span className="status-pill">Neuer Rechner</span><h2>Wie viele Pakete Bodenbelag brauchst du?</h2><p>Teilflächen, feste Abzüge, Verlegemuster, Paketmaß, Unterlage und Sockelleisten in vier Schritten verbinden.</p></div><span className="button button--light">Material berechnen →</span></Link><div className="guide-grid"><Link className="guide-card" href="/haus/boden/laminat-verschnitt-berechnen/"><span className="guide-number">Boden Wissen</span><h2>Verschnitt und Pakete</h2><p>Nettofläche, Geometrie und Verlegeart zu einer Bestellmenge machen.</p><span className="card-link">Ratgeber lesen →</span></Link><Link className="guide-card" href="/haus/boden/untergrund-trittschall/"><span className="guide-number">Boden Wissen</span><h2>Untergrund und Trittschall</h2><p>Ebenheit, Feuchte, Unterlage und Fußbodenheizung zusammendenken.</p><span className="card-link">Ratgeber lesen →</span></Link><Link className="guide-card" href="/haus/boden/sockelleisten-berechnen/"><span className="guide-number">Boden Wissen</span><h2>Sockelleisten</h2><p>Umfang, Türen, Lieferstäbe und Formteile vollständig planen.</p><span className="card-link">Ratgeber lesen →</span></Link></div></section>
  </>;
}
