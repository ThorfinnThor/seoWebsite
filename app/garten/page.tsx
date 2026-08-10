import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata = createPageMetadata({
  title: "Garten planen",
  description: "Planer und fundierte Ratgeber für Gartenhaus, Gewächshaus, Carport, Mähroboter, Bewässerung, Terrasse, Sichtschutz, Fundament und Kosten.",
  path: "/garten/",
});

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

const terraceGuides = [
  ["Verschnitt und Fugen", "Verlegebreite, Lieferlängen und Stoßbild zusammenbringen.", "/garten/terrassendielen-verschnitt-fugen/"],
  ["Unterkonstruktion planen", "Auflagerabstand, Stoßstellen und Wasserführung einordnen.", "/garten/terrasse-unterkonstruktion/"],
  ["Terrassen-Kosten", "Belag, Unterbau, Befestigung und Lieferung vollständig budgetieren.", "/garten/terrasse-kosten/"],
] as const;

const privacyScreenGuides = [
  ["Sichtschutz-Elemente berechnen", "Systemmaß, Pfostenachsen und Randfeld richtig einordnen.", "/garten/sichtschutz-elemente-berechnen/"],
  ["Pfosten und Fundament", "Stückzahl, Verankerung und Windangriffsfläche trennen.", "/garten/sichtschutz-pfosten-fundament/"],
  ["Gartentor planen", "Durchgang, Öffnungsrichtung, Torpfosten und Raster verbinden.", "/garten/sichtschutz-gartentor-planen/"],
] as const;

const greenhouseGuides = [
  ["Gewächshaus-Größe planen", "Beete, Wege, Tür und Nutzung in ein passendes Innenraster übersetzen.", "/garten/gewaechshaus-groesse/"],
  ["Fundament einordnen", "Basisprofil, Gründung, Entwässerung und Verankerung sauber trennen.", "/garten/gewaechshaus-fundament/"],
  ["Belüftung vorbereiten", "Dachfenster, Querlüftung, automatische Öffner und Schatten verbinden.", "/garten/gewaechshaus-belueftung/"],
] as const;

const robotMowerGuides = [
  ["Mähfläche berechnen", "Teilflächen und feste Abzüge zu einer belastbaren Nettofläche verbinden.", "/garten/maehroboter-flaeche-berechnen/"],
  ["Steigung und Engstellen", "Die schwierigsten Abschnitte des Gartens richtig messen und dokumentieren.", "/garten/maehroboter-steigung-engstellen/"],
  ["Kabel oder kabellos", "Installation, Empfang, Änderungsbedarf und Stationsplatz vergleichen.", "/garten/maehroboter-begrenzungskabel-kabellos/"],
] as const;

const carportGuides = [
  ["Carport-Größe planen", "Fahrzeug, Türöffnung, Heckklappe, Reserve und Zufahrt verbinden.", "/garten/carport-groesse/"],
  ["Fundament einordnen", "Lichten Raum, Pfostenraster, Baugrund und Lastabtrag sauber trennen.", "/garten/carport-fundament/"],
  ["Dachentwässerung", "Gefälle, Rinne, Fallrohr, Ablaufziel und Überlauf frühzeitig planen.", "/garten/carport-dachentwaesserung/"],
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
      <Link className="planner-banner planner-banner--secondary planner-banner--terrace" href="/garten/terrassen-dielen-rechner/"><div><span className="status-pill">Neu</span><h2>Dielen und Unterkonstruktion mengenmäßig vorbereiten.</h2><p>Verlegerichtung, Fugen, Verschnitt, Lieferlängen und Auflagerabstand nachvollziehbar berechnen.</p></div><span className="button button--light">Material berechnen →</span></Link>
      <Link className="planner-banner planner-banner--secondary planner-banner--screen" href="/garten/sichtschutz-planer/"><div><span className="status-pill">Neu</span><h2>Sichtschutzfelder und Pfosten im echten Systemraster planen.</h2><p>Gerade Strecke, Tor-Module, Randanpassung und Bestellreserve transparent zusammenbringen.</p></div><span className="button button--light">Sichtschutz planen →</span></Link>
      <Link className="planner-banner planner-banner--secondary planner-banner--greenhouse" href="/garten/gewaechshaus-planer/"><div><span className="status-pill">Neu</span><h2>Ein Gewächshaus von Beeten und Wegen aus planen.</h2><p>Grundfläche, Innenraster, Basisprofile, Lüftung und Regenwasser als nachvollziehbaren Rahmen vorbereiten.</p></div><span className="button button--light">Gewächshaus planen →</span></Link>
      <Link className="planner-banner planner-banner--secondary planner-banner--mower" href="/garten/maehroboter-rechner/"><div><span className="status-pill">Neu</span><h2>Den Garten vor dem Mähroboter-Kauf prüfen.</h2><p>Nettofläche, Kapazitätsreserve, Steigung, Engstellen und Begrenzungsprinzip transparent einordnen.</p></div><span className="button button--light">Mähbereich prüfen →</span></Link>
      <Link className="planner-banner planner-banner--secondary planner-banner--carport" href="/garten/carport-planer/"><div><span className="status-pill">Neu</span><h2>Den lichten Stellraum eines Carports zuerst planen.</h2><p>Fahrzeugmaße, Bewegungsraum, Zufahrt, Stauraum und Dachwasser zu einem klaren Platzrahmen verbinden.</p></div><span className="button button--light">Carport planen →</span></Link>
      <div className="content-cluster-heading"><p className="eyebrow">Gartenhaus Wissen</p><h2>Von der Stellfläche zum nutzbaren Haus.</h2></div>
      <GuideGrid items={gardenHouseGuides} label="Gartenhaus Wissen" />
      <div className="content-cluster-heading"><p className="eyebrow">Bewässerung Wissen</p><h2>Erst messen, dann Komponenten wählen.</h2></div>
      <GuideGrid items={irrigationGuides} label="Bewässerung Wissen" />
      <div className="content-cluster-heading"><p className="eyebrow">Terrasse Wissen</p><h2>Vom Dielenraster zum vollständigen Aufbau.</h2></div>
      <GuideGrid items={terraceGuides} label="Terrasse Wissen" />
      <div className="content-cluster-heading"><p className="eyebrow">Sichtschutz Wissen</p><h2>Vom Systemraster zur prüfbaren Zaunlinie.</h2></div>
      <GuideGrid items={privacyScreenGuides} label="Sichtschutz Wissen" />
      <div className="content-cluster-heading"><p className="eyebrow">Gewächshaus Wissen</p><h2>Vom Innenraster zum passenden System.</h2></div>
      <GuideGrid items={greenhouseGuides} label="Gewächshaus Wissen" />
      <div className="content-cluster-heading"><p className="eyebrow">Mähroboter Wissen</p><h2>Von der Rasenfläche zum prüfbaren Gerätekorridor.</h2></div>
      <GuideGrid items={robotMowerGuides} label="Mähroboter Wissen" />
      <div className="content-cluster-heading"><p className="eyebrow">Carport Wissen</p><h2>Vom Fahrzeugmaß zum nutzbaren Stellbereich.</h2></div>
      <GuideGrid items={carportGuides} label="Carport Wissen" />
    </section>
  </>;
}
