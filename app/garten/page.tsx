import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = { title: "Garten planen", description: "Planer und fundierte Ratgeber für Gartenhaus, Fundament, Größe und Kosten." };

export default function GardenPage() {
  const guides = [
    ["Die richtige Größe", "Vom Lagerbedarf zur realistischen Mindestfläche.", "/garten/gartenhaus-groesse/"],
    ["Fundament verstehen", "Welche Grundlage zu welchem Standort passen kann.", "/garten/gartenhaus-fundament/"],
    ["Kosten realistisch planen", "Kaufpreis, Lieferung, Fundament und Folgekosten.", "/garten/gartenhaus-kosten/"],
    ["Fahrräder unterbringen", "Türbreite, Rangierfläche und sichere Aufbewahrung.", "/garten/gartenhaus-fuer-fahrraeder/"],
    ["Boden richtig einordnen", "Enthalten, separat erhältlich oder selbst geplant.", "/garten/gartenhaus-boden/"],
    ["Zubehör priorisieren", "Was du direkt brauchst – und was warten kann.", "/garten/gartenhaus-zubehoer/"],
  ] as const;
  return <><section className="page-hero"><Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Garten" }]} /><p className="eyebrow">Projektbereich Garten</p><h1>Mehr Klarheit zwischen Idee und Aufbau.</h1><p>Werkzeuge und Ratgeber, die Platzbedarf, technische Grenzen und Gesamtkosten zusammenbringen.</p></section><section className="section"><Link className="planner-banner" href="/garten/gartenhaus-planer/"><div><span className="status-pill">Planer</span><h2>Welches Gartenhaus passt zu deinem Projekt?</h2><p>In wenigen Schritten zu Mindestfläche, Türbreite und kompatiblen Modellen.</p></div><span className="button button--light">Jetzt berechnen →</span></Link><div className="guide-grid">{guides.map(([title, text, href]) => <Link href={href} className="guide-card" key={href}><span className="guide-number">MachPlan Wissen</span><h2>{title}</h2><p>{text}</p><span className="card-link">Ratgeber lesen →</span></Link>)}</div></section></>;
}
