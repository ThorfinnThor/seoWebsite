import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { RobotMowerPlanner } from "./RobotMowerPlanner";

export const metadata: Metadata = {
  title: "Mähroboter-Rechner: Fläche und Anforderungen prüfen",
  description: "Rasenfläche, Kapazitätsreserve, Steigung, Engstellen, Zonen und Begrenzungssystem für die Mähroboter-Auswahl einordnen.",
};

export default function Page() {
  return <>
    <PlannerJsonLd name="Mähroboter-Flächencheck" description="Rasenfläche, Kapazitätsklasse, Passagen, Steigung und Installationsrahmen für einen Mähroboter einordnen." path="/garten/maehroboter-rechner/" />
    <section className="planner-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Mähroboter-Rechner" }]} />
      <div className="planner-hero-grid"><div><p className="eyebrow">Fläche · Gelände · Installation</p><h1>Prüfe deinen Garten, bevor du einen <em>Mähroboter</em> vergleichst.</h1><p>Mehrere Rasenbereiche, Abzüge, Engstellen, Steigung und Begrenzungsprinzip werden zu einem nachvollziehbaren Auswahlrahmen.</p></div><div className="hero-facts"><div><strong>4</strong><span>übersichtliche Schritte</span></div><div><strong>m²</strong><span>Nettofläche mit Reserve</span></div><div><strong>klar</strong><span>keine erfundene Kompatibilität</span></div></div></div>
    </section>
    <section className="planner-wrap"><RobotMowerPlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Was der Rechner leistet</p><h2>Auswahlrahmen statt Modellversprechen.</h2></div><div className="note-grid"><article><h3>✓ Das wird berechnet</h3><p>Netto-Rasenfläche, transparente Kapazitätsreserve, Passageklasse und ein grober rechteckiger Kantenrahmen.</p></article><article><h3>! Das bleibt Produktprüfung</h3><p>Zulässige Steigung, Mindestpassage, Navigation, Randabstände, Station, Sicherheit, Laufzeit und Schnittbild des konkreten Geräts.</p></article></div></section>
    <section className="section related-guides"><div className="section-heading"><p className="eyebrow">Vor dem Kauf vertiefen</p><h2>Drei Prüfungen verhindern Fehlkäufe.</h2><p>Die reale Mähfläche, schwierige Geländeabschnitte und das passende Begrenzungsprinzip müssen zusammenpassen.</p></div><div className="guide-grid related-guides--three"><Link className="guide-card" href="/garten/maehroboter-flaeche-berechnen/"><span className="guide-number">01 · Fläche</span><h2>Rasenfläche berechnen</h2><p>Teilflächen und feste Abzüge sauber zum Netto-Mähbereich verbinden.</p><span className="card-link">Fläche erfassen →</span></Link><Link className="guide-card" href="/garten/maehroboter-steigung-engstellen/"><span className="guide-number">02 · Gelände</span><h2>Steigung & Engstellen</h2><p>Die schwierigsten Meter des Gartens vor der Gerätewahl messen.</p><span className="card-link">Gelände prüfen →</span></Link><Link className="guide-card" href="/garten/maehroboter-begrenzungskabel-kabellos/"><span className="guide-number">03 · System</span><h2>Kabel oder kabellos?</h2><p>Installationsaufwand, Empfang und spätere Änderungen einordnen.</p><span className="card-link">Systeme vergleichen →</span></Link></div></section>
  </>;
}
