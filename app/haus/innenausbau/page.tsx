import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata = createPageMetadata({
  title: "Innenausbau planen",
  description: "Trockenbauwand-Rechner und Ratgeber für Plattenmengen, Ständerwerk, Profile, Öffnungen und Installationen.",
  path: "/haus/innenausbau/",
});

export default function InteriorHubPage() {
  return <>
    <section className="page-hero"><Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Haus", href: "/haus/" }, { label: "Innenausbau" }]} /><p className="eyebrow">Projektbereich Innenausbau</p><h1>Materialmengen berechnen, Systemgrenzen sichtbar lassen.</h1><p>Der Trockenbau-Rechner schafft einen transparenten Mengenrahmen. Die Ratgeber trennen Flächenberechnung, Unterkonstruktion und konstruktive Details.</p></section>
    <section className="section"><Link className="planner-banner" href="/haus/innenausbau/trockenbau-rechner/"><div><span className="status-pill">Neuer Rechner</span><h2>Wie viele Platten und Grundprofile brauchst du?</h2><p>Wandfläche, Öffnungen, Plattenlagen, Reserve und ungestörtes Ständerraster in vier Schritten verbinden.</p></div><span className="button button--light">Mengen berechnen →</span></Link><div className="guide-grid"><Link className="guide-card" href="/haus/innenausbau/trockenbau-platten-berechnen/"><span className="guide-number">Innenausbau Wissen</span><h2>Platten berechnen</h2><p>Nettofläche, Wandseiten, Lagen, Format und Zuschnittreserve zusammenbringen.</p><span className="card-link">Ratgeber lesen →</span></Link><Link className="guide-card" href="/haus/innenausbau/trockenbau-profile-staenderwerk/"><span className="guide-number">Innenausbau Wissen</span><h2>Profile & Ständerwerk</h2><p>Grundraster, Randprofile, Öffnungen und Systemfreigaben unterscheiden.</p><span className="card-link">Ratgeber lesen →</span></Link><Link className="guide-card" href="/haus/innenausbau/trockenbau-tuer-oeffnungen/"><span className="guide-number">Innenausbau Wissen</span><h2>Türen & Installationen</h2><p>Öffnungen, Zusatzprofile, Lasten und Leitungswege frühzeitig koordinieren.</p><span className="card-link">Ratgeber lesen →</span></Link></div></section>
  </>;
}
