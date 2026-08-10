import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerIcon } from "@/components/icons/PlannerIcon";

export const metadata = createPageMetadata({
  title: "Hausprojekte planen",
  description: "Kostenlose Rechner und fundierte Ratgeber für Bodenbeläge, Trockenbau, Innenausbau, Raumklima und weitere Hausprojekte.",
  path: "/haus/",
});

export default function HousePage() {
  return <>
    <section className="page-hero"><Breadcrumbs items={[{label:"Start",href:"/"},{label:"Haus"}]} /><p className="eyebrow">Projektbereich Haus</p><h1>Materialmengen und Gerätebedarf nachvollziehbar planen.</h1><p>Browserbasierte Werkzeuge für Innenausbau und Raumklima – mit sichtbaren Rechenwegen und klaren fachlichen Grenzen.</p></section>
    <section className="section area-grid">
      <Link className="area-card" href="/haus/boden/"><span className="feature-icon" aria-hidden="true"><PlannerIcon name="flooring" /></span><div><p className="eyebrow">Innenausbau</p><h2>Bodenbeläge</h2><p>Flächen, Verschnitt, volle Pakete, Unterlage und Sockelleisten für Laminat, Klick-Vinyl und Fertigparkett planen.</p><span className="card-link">Bodenbereich öffnen →</span></div></Link>
      <Link className="area-card" href="/haus/raumklima/"><span className="feature-icon" aria-hidden="true"><PlannerIcon name="dehumidifier" /></span><div><p className="eyebrow">Raumklima</p><h2>Luftentfeuchtung</h2><p>Raumvolumen, Nutzung, Temperatur, Ablauf und Geräusch für eine passende Geräteklasse einordnen.</p><span className="card-link">Raumklima öffnen →</span></div></Link>
      <Link className="area-card" href="/haus/innenausbau/"><span className="feature-icon" aria-hidden="true"><PlannerIcon name="drywall" /></span><div><p className="eyebrow">Innenausbau</p><h2>Trockenbauwände</h2><p>Plattenflächen, Lagen, Grundständer, Randprofile, Öffnungen und Dämmung mengenmäßig vorbereiten.</p><span className="card-link">Innenausbau öffnen →</span></div></Link>
    </section>
  </>;
}
