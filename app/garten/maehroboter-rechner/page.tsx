import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { PlannerHeroSummary } from "@/components/planner/PlannerHeroSummary";
import { PlannerFaq } from "@/components/planner/PlannerFaq";
import { RobotMowerPlanner } from "./RobotMowerPlanner";

export const metadata = createPageMetadata({
  title: "Mähroboter Rechner für Fläche, Steigung und Engstellen",
  description: "Welcher Mähroboter passt zum Garten. Rasenfläche, Steigung, Engstellen, Zonen und Navigation prüfen und geeignete Modelle vergleichen.",
  path: "/garten/maehroboter-rechner/",
});

export default function Page() {
  return <>
    <PlannerJsonLd name="Mähroboter Flächencheck" description="Rasenfläche, Kapazitätsklasse, Passagen, Steigung und Installationsrahmen für einen Mähroboter einordnen." path="/garten/maehroboter-rechner/" />
    <section className="planner-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Mähroboter-Rechner" }]} />
      <div className="planner-hero-grid"><div><p className="eyebrow">Fläche · Gelände · Navigation</p><h1>Welcher <em>Mähroboter</em> passt wirklich in deinen Garten?</h1><p>Der Rechner berücksichtigt die reine Rasenfläche, schwierige Passagen, Steigung und getrennte Bereiche. Im Ergebnis erscheinen nur geprüfte Modelle, die zu deinen Pflichtangaben passen.</p></div><PlannerHeroSummary planner="robot-mower" /></div>
    </section>
    <section className="planner-wrap"><RobotMowerPlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Eine häufige Frage</p><h2>Sind 500 m² schon genug für RTK?</h2></div><div><p>Die Größe allein beantwortet das nicht. Auf einer offenen Fläche können virtuelle Grenzen sehr praktisch sein. Unter großen Bäumen, nah an Hauswänden oder in einer schmalen Verbindung kann ein Kabelsystem besser planbar sein.</p><Link className="text-link" href="/ratgeber/vergleiche/maehroboter/maehroboter-begrenzungskabel-oder-rtk-500-qm/">Kabel und RTK für 500 m² vergleichen →</Link></div></section>
    <section className="section planner-notes"><div><p className="eyebrow">Was der Rechner leistet</p><h2>Auswahlrahmen statt Modellversprechen.</h2></div><div className="note-grid"><article><h3>✓ Das wird berechnet</h3><p>Netto-Rasenfläche, transparente Kapazitätsreserve, Passageklasse und ein grober rechteckiger Kantenrahmen.</p></article><article><h3>! Das bleibt Produktprüfung</h3><p>Zulässige Steigung, Mindestpassage, Navigation, Randabstände, Station, Sicherheit, Laufzeit und Schnittbild des konkreten Geräts.</p></article></div></section>
    <PlannerFaq planner="robot-mower" />
    <section className="section related-guides"><div className="section-heading"><p className="eyebrow">Wenn eine Eingabe unklar ist</p><h2>Diese Ratgeber helfen beim Messen und Einordnen</h2><p>Du musst nicht jede technische Antwort schon kennen. Wichtig ist, dass unsichere Stellen sichtbar bleiben und am konkreten Modell geprüft werden.</p></div><div className="guide-grid related-guides--three"><Link className="guide-card" href="/garten/maehroboter-flaeche-berechnen/"><span className="guide-number">Rasenfläche</span><h2>Was gehört zur Mähfläche?</h2><p>Teilflächen und feste Abzüge zu einer realistischen Nettofläche verbinden.</p><span className="card-link">Fläche erfassen →</span></Link><Link className="guide-card" href="/garten/maehroboter-steigung-engstellen/"><span className="guide-number">Schwierige Stellen</span><h2>Steigung und Engstellen messen</h2><p>Die Passage oder Neigung finden, an der eine Auswahl tatsächlich scheitern kann.</p><span className="card-link">Gelände prüfen →</span></Link><Link className="guide-card" href="/garten/maehroboter-begrenzungskabel-kabellos/"><span className="guide-number">Navigation</span><h2>Kabel oder kabellos wählen</h2><p>Empfang, Installationsaufwand und spätere Änderungen am eigenen Garten abwägen.</p><span className="card-link">Systeme vergleichen →</span></Link></div></section>
  </>;
}
