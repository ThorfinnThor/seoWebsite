import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { PrivacyScreenPlanner } from "./PrivacyScreenPlanner";

export const metadata = createPageMetadata({
  title: "Sichtschutz- und Zaunfeld-Planer",
  description: "Sichtschutzfelder, Tor-Module, Pfosten und Rasteranpassung für eine gerade Strecke nachvollziehbar abschätzen.",
  path: "/garten/sichtschutz-planer/",
});

export default function Page() {
  return <>
    <PlannerJsonLd name="Sichtschutz- und Zaunfeld-Planer" description="Mengen- und Rasterplan für eine gerade Sichtschutzstrecke erstellen." path="/garten/sichtschutz-planer/" />
    <section className="planner-hero"><Breadcrumbs items={[{label:"Start",href:"/"},{label:"Garten",href:"/garten/"},{label:"Sichtschutz-Planer"}]} /><div className="planner-hero-grid"><div><p className="eyebrow">Systemraster · keine Fundamentbemessung</p><h1>Plane Felder, Tore und Pfosten für deinen <em>Sichtschutz</em>.</h1><p>Streckenlänge, echtes Montage-Raster und Tor-Module werden zu einem transparenten Mengenrahmen für eine gerade Zaunlinie.</p></div><div className="hero-facts"><div><strong>4</strong><span>übersichtliche Schritte</span></div><div><strong>cm</strong><span>Rasterabschluss sichtbar</span></div><div><strong>klar</strong><span>Grenzen bei Wind und Fundament</span></div></div></div></section>
    <section className="planner-wrap"><PrivacyScreenPlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Was der Planer leistet</p><h2>Bestellrahmen statt Statik.</h2></div><div className="note-grid"><article><h3>✓ Das wird berechnet</h3><p>Standardfelder, Tor-Module, rechnerische Pfosten, Gesamtraster, Randanpassung und optionale Elementreserve.</p></article><article><h3>! Das bleibt Planung</h3><p>Fundamentabmessung, Windlast, Befestigung, Systemfreigabe, Gefälledetail, Grenzverlauf und örtliche Anforderungen.</p></article></div></section>
    <section className="section related-guides"><div className="section-heading"><p className="eyebrow">Vor der Bestellung vertiefen</p><h2>Drei Details entscheiden über das Ergebnis.</h2><p>Systemmaß, Verankerung und Toranschluss müssen zum konkreten Produkt und Standort passen.</p></div><div className="guide-grid related-guides--three"><Link className="guide-card" href="/garten/sichtschutz-elemente-berechnen/"><span className="guide-number">01 · Raster</span><h2>Elemente berechnen</h2><p>Montagemaß, Pfostenachsen und Randfeld richtig einordnen.</p><span className="card-link">Raster verstehen →</span></Link><Link className="guide-card" href="/garten/sichtschutz-pfosten-fundament/"><span className="guide-number">02 · Halt</span><h2>Pfosten & Fundament</h2><p>Warum Stückzahl und Dimensionierung zwei getrennte Aufgaben sind.</p><span className="card-link">Verankerung einordnen →</span></Link><Link className="guide-card" href="/garten/sichtschutz-gartentor-planen/"><span className="guide-number">03 · Zugang</span><h2>Gartentor planen</h2><p>Öffnungsrichtung, Pfosten und Systemmaß vorab klären.</p><span className="card-link">Torplanung lesen →</span></Link></div></section>
  </>;
}
