import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = { title: "Garten planen", description: "Planer und fundierte Ratgeber für Gartenhaus, Bewässerung, Fundament, Größe und Kosten." };

const gardenHouseGuides = [
  ["Die richtige Größe", "Vom Lagerbedarf zur realistischen Mindestfläche.", "/garten/gartenhaus-groesse/"],
  ["Fundament verstehen", "Welche Grundlage zu welchem Standort passen kann.", "/garten/gartenhaus-fundament/"],
  ["Kosten realistisch planen", "Kaufpreis, Lieferung, Fundament und Folgekosten.", "/garten/gartenhaus-kosten/"],
  ["Fahrräder unterbringen", "Türbreite, Rangierfläche und sichere Aufbewahrung.", "/garten/gartenhaus-fuer-fahrraeder/"],
  ["Boden richtig einordnen", "Enthalten, separat erhältlich oder selbst geplant.", "/garten/gartenhaus-boden/"],
  ["Zubehör priorisieren", "Was du direkt brauchst – und was warten kann.", "/garten/gartenhaus-zubehoer/"],
] as const;

const irrigationGuides = [
  ["Durchfluss richtig messen", "Eimertest und Fließdruck als belastbare Planungsbasis.", "/garten/bewaesserung-durchfluss-messen/"],
  ["Tropfrohr für Hecken", "Länge, Reserve, Filter, Druckminderung und Zonen.", "/garten/tropfbewaesserung-hecke/"],
  ["Rasenbewässerung planen", "Geometrie, Überlappung, Anschlussleistung und Grenzen.", "/garten/rasenbewaesserung-planen/"],
  ["Steuerungszonen festlegen", "Verbraucher sinnvoll trennen und Controller auswählen.", "/garten/bewaesserungscomputer-zonen/"],
] as const;

function GuideGrid({ items, label }: { items: readonly (readonly [string, string, string])[]; label: string }) {
  return <div className="guide-grid">{items.map(([title, text, href]) => <Link href={href} className="guide-card" key={href}><span className="guide-number">{label}</span><h2>{title}</h2><p>{text}</p><span className="card-link">Ratgeber lesen →</span></Link>)}</div>;
}

export default function GardenPage() {
  return <>
    <section className="page-hero"><Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Garten" }]} /><p className="eyebrow">Projektbereich Garten</p><h1>Mehr Klarheit zwischen Idee und Aufbau.</h1><p>Werkzeuge und Ratgeber, die Platzbedarf, technische Grenzen und Gesamtkosten zusammenbringen.</p></section>
    <section className="section">
      <Link className="planner-banner" href="/garten/gartenhaus-planer/"><div><span className="status-pill">Planer</span><h2>Welches Gartenhaus passt zu deinem Projekt?</h2><p>In wenigen Schritten zu Mindestfläche, Türbreite und kompatiblen Modellen.</p></div><span className="button button--light">Jetzt berechnen →</span></Link>
      <Link className="planner-banner planner-banner--secondary" href="/garten/bewaesserungs-planer/"><div><span className="status-pill">Planer</span><h2>Bewässerung als kompatibles System planen.</h2><p>Materialstruktur für Rasen, Beete und Hecken – ohne falschen Hydraulikanspruch.</p></div><span className="button button--light">System planen →</span></Link>
      <div className="content-cluster-heading"><p className="eyebrow">Gartenhaus Wissen</p><h2>Von der Stellfläche zum nutzbaren Haus.</h2></div>
      <GuideGrid items={gardenHouseGuides} label="Gartenhaus Wissen" />
      <div className="content-cluster-heading"><p className="eyebrow">Bewässerung Wissen</p><h2>Erst messen, dann Komponenten wählen.</h2></div>
      <GuideGrid items={irrigationGuides} label="Bewässerung Wissen" />
    </section>
  </>;
}
