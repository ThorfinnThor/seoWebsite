import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { GreenhousePlanner } from "./GreenhousePlanner";

export const metadata: Metadata = {
  title: "Gewächshaus-Planer: Fläche, Beete und Basisprofile",
  description: "Gewächshaus-Grundfläche, Beet- und Wegeaufteilung, Basisprofile sowie theoretisches Regenwasser nachvollziehbar planen.",
};

export default function Page() {
  return <>
    <PlannerJsonLd name="Gewächshaus-Planer" description="Grundfläche, Innenaufteilung, Basisprofile und Regenwasserrahmen für ein Gewächshaus berechnen." path="/garten/gewaechshaus-planer/" />
    <section className="planner-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Gewächshaus-Planer" }]} />
      <div className="planner-hero-grid"><div><p className="eyebrow">Fläche · Wege · Ausstattung</p><h1>Plane dein <em>Gewächshaus</em> vom Innenraum aus.</h1><p>Außenmaß, Beetaufteilung, Wege, Basisprofile und Regenwasser werden zu einem nachvollziehbaren Planungsrahmen – ohne Scheingenauigkeit bei Fundament und Statik.</p></div><div className="hero-facts"><div><strong>4</strong><span>übersichtliche Schritte</span></div><div><strong>cm</strong><span>Innenraster sichtbar</span></div><div><strong>klar</strong><span>offene Fachentscheidungen</span></div></div></div>
    </section>
    <section className="planner-wrap"><GreenhousePlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Was der Planer leistet</p><h2>Vorplanung statt Bauanweisung.</h2></div><div className="note-grid"><article><h3>✓ Das wird berechnet</h3><p>Grundfläche, feste Beet- und Wegflächen, verbleibende Breite, Basisumfang mit Reserve sowie theoretisch auffangbares Regenwasser.</p></article><article><h3>! Das bleibt Planung</h3><p>Fundament, Verankerung, Wind- und Schneelast, Verglasungsstärke, Heizung, Entwässerung, Elektrik und örtliche Anforderungen.</p></article></div></section>
    <section className="section related-guides"><div className="section-heading"><p className="eyebrow">Vor Auswahl und Aufbau vertiefen</p><h2>Drei Entscheidungen prägen das Gewächshaus.</h2><p>Außenmaß, tragfähige Basis und kontrollierbare Lüftung müssen zum konkreten Standort und System passen.</p></div><div className="guide-grid related-guides--three"><Link className="guide-card" href="/garten/gewaechshaus-groesse/"><span className="guide-number">01 · Raum</span><h2>Größe & Innenaufteilung</h2><p>Beete, Wege und Tür schon vor der Modellauswahl zusammenbringen.</p><span className="card-link">Fläche planen →</span></Link><Link className="guide-card" href="/garten/gewaechshaus-fundament/"><span className="guide-number">02 · Basis</span><h2>Fundament einordnen</h2><p>Warum der Profilumfang noch keine Gründung oder Verankerung bestimmt.</p><span className="card-link">Unterbau verstehen →</span></Link><Link className="guide-card" href="/garten/gewaechshaus-belueftung/"><span className="guide-number">03 · Klima</span><h2>Belüftung vorbereiten</h2><p>Dachfenster, Querlüftung und automatische Öffner sinnvoll kombinieren.</p><span className="card-link">Lüftung planen →</span></Link></div></section>
  </>;
}
