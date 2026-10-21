import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { PlannerHeroSummary } from "@/components/planner/PlannerHeroSummary";
import { PlannerFaq } from "@/components/planner/PlannerFaq";
import { PlannerGuide } from "@/components/planner/PlannerGuide";
import { TopicLinks } from "@/components/seo/TopicLinks";
import { DrywallPlanner } from "./DrywallPlanner";

export const metadata = createPageMetadata({
  title: "Trockenbau-Rechner: kostenlose Kalkulation",
  description: "Kostenlose Kalkulationshilfe für Trockenbau: Gipsplatten, CW- und UW-Profile, Dämmung und Verschnitt einer Trockenbauwand online berechnen. Mit Rechenweg.",
  path: "/haus/innenausbau/trockenbau-rechner/",
});

export default function Page() {
  return <>
    <PlannerJsonLd name="Trockenbau-Rechner und Kalkulationshilfe" description="Kostenloser Trockenbau-Planer: Plattenmengen, CW-Ständer, UW-Randprofile und Dämmfläche für eine Trockenbauwand nachvollziehbar kalkulieren." path="/haus/innenausbau/trockenbau-rechner/" />
    <section className="planner-hero"><Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Haus", href: "/haus/" }, { label: "Innenausbau", href: "/haus/innenausbau/" }, { label: "Trockenbau-Rechner" }]} /><div className="planner-hero-grid"><div><p className="eyebrow">Kostenloser Trockenbau-Planer · Kalkulationshilfe</p><h1>Trockenbau kalkulieren: Platten, Profile und Dämmung deiner <em>Trockenbauwand</em>.</h1><p>Der Trockenbau-Rechner verbindet Wandfläche, Öffnungen, bekleidete Seiten, Plattenlagen und CW-Profilraster zu einer nachvollziehbaren Materialkalkulation. Kostenlos, ohne Anmeldung und mit offenem Rechenweg für Gipsplatten, CW- und UW-Profile und Dämmfläche.</p></div><PlannerHeroSummary planner="drywall" /></div></section>
    <section className="planner-wrap"><DrywallPlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Was der Rechner leistet</p><h2>Mengenrahmen statt Ausführungsfreigabe.</h2></div><div className="note-grid"><article><h3>✓ Das wird berechnet</h3><p>Netto-Wandfläche, Bekleidungsfläche, volle Platten, ungestörtes Grundraster, Randprofilstäbe und optionale Dämmfläche.</p></article><article><h3>! Das bleibt Systemplanung</h3><p>Profiltyp, Zusatzprofile, Befestiger, Anschlüsse, Lasten, Installationen sowie Brand-, Schall- und Feuchteschutz.</p></article></div></section>
    <PlannerGuide planner="drywall" />
    <PlannerFaq planner="drywall" />
    <section className="section related-guides"><div className="section-heading"><p className="eyebrow">Vor Bestellung und Aufbau vertiefen</p><h2>Drei Details verändern die Stückliste.</h2><p>Plattenplan, Unterkonstruktion und Öffnungen müssen zum vollständigen freigegebenen Wandsystem passen.</p></div><div className="guide-grid related-guides--three"><Link className="guide-card" href="/haus/innenausbau/trockenbau-platten-berechnen/"><span className="guide-number">01 · Fläche</span><h2>Platten berechnen</h2><p>Von der Nettofläche zu vollen Platten mit sinnvoller Reserve.</p><span className="card-link">Plattenmenge verstehen →</span></Link><Link className="guide-card" href="/haus/innenausbau/trockenbau-profile-staenderwerk/"><span className="guide-number">02 · Raster</span><h2>Profile & Ständerwerk</h2><p>Warum das Grundraster nur der Anfang der Profilplanung ist.</p><span className="card-link">Unterkonstruktion einordnen →</span></Link><Link className="guide-card" href="/haus/innenausbau/trockenbau-tuer-oeffnungen/"><span className="guide-number">03 · Details</span><h2>Türen & Installationen</h2><p>Zusatzprofile, Leitungen und spätere Lasten vorab koordinieren.</p><span className="card-link">Öffnungen planen →</span></Link></div></section>
    <TopicLinks topicSlug="trockenbau" currentPath="/haus/innenausbau/trockenbau-rechner/" exclude={["/haus/innenausbau/trockenbau-platten-berechnen/", "/haus/innenausbau/trockenbau-profile-staenderwerk/", "/haus/innenausbau/trockenbau-tuer-oeffnungen/"]} />
  </>;
}
