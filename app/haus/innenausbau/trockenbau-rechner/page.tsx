import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { DrywallPlanner } from "./DrywallPlanner";

export const metadata = createPageMetadata({
  title: "Trockenbau-Rechner: Platten und Profile berechnen",
  description: "Gipsplatten, Bekleidungsfläche, Grundständer, Boden- und Deckenprofile sowie Dämmfläche für eine Trockenbauwand berechnen.",
  path: "/haus/innenausbau/trockenbau-rechner/",
});

export default function Page() {
  return <>
    <PlannerJsonLd name="Trockenbauwand-Rechner" description="Plattenmengen, Grundständer, Randprofile und Dämmfläche für eine Trockenbauwand nachvollziehbar berechnen." path="/haus/innenausbau/trockenbau-rechner/" />
    <section className="planner-hero"><Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Haus", href: "/haus/" }, { label: "Innenausbau", href: "/haus/innenausbau/" }, { label: "Trockenbau-Rechner" }]} /><div className="planner-hero-grid"><div><p className="eyebrow">Wandfläche · Platten · Grundraster</p><h1>Berechne den Mengenrahmen deiner <em>Trockenbauwand</em>.</h1><p>Wandfläche, Öffnungen, bekleidete Seiten, Plattenlagen und Profilraster werden zu einer nachvollziehbaren Materialbasis.</p></div><div className="hero-facts"><div><strong>4</strong><span>übersichtliche Schritte</span></div><div><strong>1–2</strong><span>Seiten und Plattenlagen</span></div><div><strong>klar</strong><span>keine Brandschutzfreigabe</span></div></div></div></section>
    <section className="planner-wrap"><DrywallPlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Was der Rechner leistet</p><h2>Mengenrahmen statt Ausführungsfreigabe.</h2></div><div className="note-grid"><article><h3>✓ Das wird berechnet</h3><p>Netto-Wandfläche, Bekleidungsfläche, volle Platten, ungestörtes Grundraster, Randprofilstäbe und optionale Dämmfläche.</p></article><article><h3>! Das bleibt Systemplanung</h3><p>Profiltyp, Zusatzprofile, Befestiger, Anschlüsse, Lasten, Installationen sowie Brand-, Schall- und Feuchteschutz.</p></article></div></section>
    <section className="section related-guides"><div className="section-heading"><p className="eyebrow">Vor Bestellung und Aufbau vertiefen</p><h2>Drei Details verändern die Stückliste.</h2><p>Plattenplan, Unterkonstruktion und Öffnungen müssen zum vollständigen freigegebenen Wandsystem passen.</p></div><div className="guide-grid related-guides--three"><Link className="guide-card" href="/haus/innenausbau/trockenbau-platten-berechnen/"><span className="guide-number">01 · Fläche</span><h2>Platten berechnen</h2><p>Von der Nettofläche zu vollen Platten mit sinnvoller Reserve.</p><span className="card-link">Plattenmenge verstehen →</span></Link><Link className="guide-card" href="/haus/innenausbau/trockenbau-profile-staenderwerk/"><span className="guide-number">02 · Raster</span><h2>Profile & Ständerwerk</h2><p>Warum das Grundraster nur der Anfang der Profilplanung ist.</p><span className="card-link">Unterkonstruktion einordnen →</span></Link><Link className="guide-card" href="/haus/innenausbau/trockenbau-tuer-oeffnungen/"><span className="guide-number">03 · Details</span><h2>Türen & Installationen</h2><p>Zusatzprofile, Leitungen und spätere Lasten vorab koordinieren.</p><span className="card-link">Öffnungen planen →</span></Link></div></section>
  </>;
}
