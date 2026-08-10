import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Alle Rechner und Planer",
  description: "Kostenlose Planer für Gartenhaus, Gewächshaus, Luftentfeuchter, Bewässerung, Terrasse, Sichtschutz und Bodenbeläge – ohne Anmeldung.",
};

const tools = [
  {
    title: "Gartenhaus-Planer",
    category: "Garten · Lagerung",
    description: "Mindestfläche, Türbreite, Stellfläche, Bodenoption und Budget zu einem klaren Auswahlrahmen verbinden.",
    facts: ["5 Schritte", "Fläche & Zugang", "Produktfilter vorbereitet"],
    href: "/garten/gartenhaus-planer/",
    icon: "⌂",
    cta: "Gartenhaus planen",
  },
  {
    title: "Luftentfeuchter-Rechner",
    category: "Haus · Raumklima",
    description: "Raumvolumen, Feuchtebelastung, Temperatur, Ablauf und Geräusch für die Geräteauswahl einordnen.",
    facts: ["4 Schritte", "Keine Ferndiagnose", "Herstellergrenzen zuerst"],
    href: "/haus/raumklima/luftentfeuchter-rechner/",
    icon: "◌",
    cta: "Gerätegröße berechnen",
  },
  {
    title: "Bewässerungsplaner",
    category: "Garten · Wasser",
    description: "Materialstruktur und Steuerungszonen für Rasen, Beete und Hecken vorbereiten – ohne fake-genaue Hydraulik.",
    facts: ["4 Schritte", "Systemkompatibilität", "Messlücken sichtbar"],
    href: "/garten/bewaesserungs-planer/",
    icon: "≈",
    cta: "Bewässerung planen",
  },
  {
    title: "Terrassendielen-Rechner",
    category: "Garten · Terrasse",
    description: "Dielenreihen, Laufmeter, Reserve, Lieferlängen und Unterkonstruktion zu einem Materialrahmen verbinden.",
    facts: ["4 Schritte", "Belag & Unterbau", "Zuschnittgrenzen sichtbar"],
    href: "/garten/terrassen-dielen-rechner/",
    icon: "═",
    cta: "Terrassenbedarf berechnen",
  },
  {
    title: "Sichtschutz-Planer",
    category: "Garten · Zaun",
    description: "Standardfelder, Tor-Module, Pfosten und Rasterabschluss für eine gerade Sichtschutzstrecke abschätzen.",
    facts: ["4 Schritte", "Systemmaß statt Nennmaß", "Keine Fundamentbemessung"],
    href: "/garten/sichtschutz-planer/",
    icon: "▥",
    cta: "Sichtschutz planen",
  },
  {
    title: "Bodenbelag-Rechner",
    category: "Haus · Innenausbau",
    description: "Teilflächen, Verschnitt, Paketinhalt, Unterlage und Sockelleisten zu einem bestellbaren Materialrahmen verbinden.",
    facts: ["4 Schritte", "Volle Pakete", "Aufbaugrenzen sichtbar"],
    href: "/haus/boden/bodenbelag-rechner/",
    icon: "▤",
    cta: "Bodenmaterial berechnen",
  },
  {
    title: "Gewächshaus-Planer",
    category: "Garten · Anbau",
    description: "Grundfläche, Beet- und Wegeaufteilung, Basisprofile und theoretisches Regenwasser als Planungsrahmen zusammenführen.",
    facts: ["4 Schritte", "Innenraster sichtbar", "Keine Fundamentbemessung"],
    href: "/garten/gewaechshaus-planer/",
    icon: "◇",
    cta: "Gewächshaus planen",
  },
] as const;

export default function RechnerPage() {
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "MachPlan Rechner und Planer",
      itemListElement: tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: absoluteUrl(tool.href) })),
    }} />
    <section className="page-hero tool-hub-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Rechner & Planer" }]} />
      <p className="eyebrow">Kostenlos · ohne Anmeldung</p>
      <h1>Welches Projekt möchtest du als Nächstes klären?</h1>
      <p>Jeder Planer übersetzt wenige Angaben in nachvollziehbare Anforderungen. Produktangebote erscheinen erst, wenn Daten und Kompatibilität geprüft sind.</p>
    </section>
    <section className="section tool-grid" aria-label="Verfügbare Planer">
      {tools.map((tool) => <article className="tool-card" key={tool.href}>
        <div className="tool-card-top"><span className="feature-icon" aria-hidden="true">{tool.icon}</span><span className="status-pill">{tool.category}</span></div>
        <h2>{tool.title}</h2>
        <p>{tool.description}</p>
        <ul>{tool.facts.map((fact) => <li key={fact}>✓ {fact}</li>)}</ul>
        <Link className="button button--primary" href={tool.href}>{tool.cta} →</Link>
      </article>)}
    </section>
    <section className="section planner-notes tool-principles">
      <div><p className="eyebrow">Ein gemeinsames Prinzip</p><h2>Erst harte Kriterien, dann Vergleich.</h2></div>
      <div className="note-grid"><article><h3>Gleiche Eingabe, gleiches Ergebnis</h3><p>Die Berechnungen sind deterministisch und laufen direkt im Browser. Es gibt kein KI-Raten und kein verstecktes Nutzerprofil.</p></article><article><h3>Grenzen bleiben sichtbar</h3><p>Wo Messwerte, Fachplanung oder örtliche Vorgaben fehlen, zeigt MachPlan eine offene Prüfaufgabe statt einer erfundenen Sicherheit.</p></article></div>
    </section>
  </>;
}
