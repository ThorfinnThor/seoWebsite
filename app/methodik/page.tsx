import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = { title: "Methodik", description: "So berechnet MachPlan Bedarf, prüft harte Kriterien und begründet Produktempfehlungen." };

const methods = [
  { title: "Gartenhaus", text: "Nutzungsobjekte, Bewegungsflächen und Reserven ergeben einen Mindestflächenkorridor. Stellfläche, Außenmaße, Türbreite, Boden, Material und Budget sind harte Filter." },
  { title: "Luftentfeuchtung", text: "Raumvolumen, Feuchtebelastung, Temperatur und Nutzung bilden eine Auswahlklasse. Herstellerfreigaben, Arbeitsbereich, Ablauf, Geräusch und Budget entscheiden über die Eignung." },
  { title: "Bewässerung", text: "Flächenarten und Längen ergeben eine erste Komponentenstruktur. Druck, Durchfluss, Leitungsführung und reale Abdeckung bleiben ausdrücklich Teil der Vor-Ort-Planung." },
  { title: "Terrasse", text: "Maße, Verlegerichtung, Dielenraster und Hersteller-Auflagerabstand ergeben einen Mengenrahmen. Tragfähigkeit, Entwässerung und Systemdetails bleiben Teil der Ausführungsplanung." },
  { title: "Sichtschutz", text: "Streckenlänge, Montage-Raster und Tor-Module ergeben Feld- und Pfostenzahlen. Windlast, Befestigung und Fundamentabmessungen bleiben ausdrücklich außerhalb der Berechnung." },
  { title: "Bodenbelag", text: "Teilflächen, feste Abzüge, Verschnitt und Paketinhalt ergeben eine Bestellmenge. Untergrund, Feuchte, Dehnungsfugen und Systemfreigaben bleiben Teil der Verlegeplanung." },
  { title: "Gewächshaus", text: "Außenmaß, Beet- und Wegeaufteilung ergeben einen Flächenrahmen; der Umfang liefert eine Basisprofilmenge. Fundament, Lasten, Verglasung, Heizung und Klima bleiben konkrete Systemplanung." },
];

export default function MethodikPage() {
  return (
    <article className="method-page">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Methodik" }]} />
      <header><p className="eyebrow">Nachvollziehbar statt scheinpräzise</p><h1>So arbeitet MachPlan.</h1><p>Unsere Werkzeuge trennen Bedarfsermittlung, harte Eignungskriterien und erklärende Sortierung. Der Rechenweg bleibt deterministisch: gleiche Eingaben führen zu denselben Ergebnissen.</p></header>
      <section className="principle-grid">
        <article><span>01</span><h2>Bedarf erfassen</h2><p>Nur Angaben, die den Planungsrahmen oder die Eignung tatsächlich verändern.</p></article>
        <article><span>02</span><h2>Unpassendes ausschließen</h2><p>Fehlt ein zwingendes Merkmal, wird ein Produkt nicht durch andere Vorteile „hochgerechnet“.</p></article>
        <article><span>03</span><h2>Rest begründen</h2><p>Bewertungen nutzen dokumentierte Eigenschaften – niemals Höhe oder Existenz einer Provision.</p></article>
      </section>
      <section className="method-detail"><div><p className="eyebrow">Sieben Bereiche</p><h2>Die Regeln passen zum Projekt.</h2></div><div className="method-cards">{methods.map((method) => <article key={method.title}><h3>{method.title}</h3><p>{method.text}</p></article>)}</div></section>
      <section className="method-detail"><div><p className="eyebrow">Daten-Gate</p><h2>Keine Empfehlung ohne belastbare Pflichtdaten.</h2></div><div><p>Ein Produkt wird erst öffentlich vergleichbar, wenn Pflichtfelder, Quelle, Aktualität, Ziel-URL und Preisstatus validiert sind. Daten aus Händler- oder Herstellerfeeds sind als solche zu verstehen; sie ersetzen keinen unabhängigen Labortest.</p><p>Leere Kataloge sind deshalb ein beabsichtigter sicherer Zustand – kein Anlass, ungeprüfte Angebote zu zeigen.</p><Link className="text-link" href="/affiliate-transparenz/">Affiliate-Regeln ansehen →</Link></div></section>
      <section className="method-limit"><h2>Was MachPlan nicht verspricht</h2><p>Die Ergebnisse sind Planungshilfen und keine Genehmigung, Fachplanung, Bauphysik-, Gesundheits- oder Sicherheitsdiagnose. Örtliche Bedingungen und aktuelle Herstellerangaben haben Vorrang.</p></section>
    </article>
  );
}
