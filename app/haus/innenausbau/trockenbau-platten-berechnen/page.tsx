import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Trockenbau-Platten richtig berechnen",
  description: "Gipsplatten aus Wandfläche, Öffnungen, bekleideten Seiten, Plattenlagen, Format und Zuschnittreserve berechnen.",
  path: "/haus/innenausbau/trockenbau-platten-berechnen/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/haus/innenausbau/trockenbau-platten-berechnen/"
    title="Trockenbau-Platten berechnen: Fläche, Lagen und Format"
    intro="Die Stückzahl entsteht nicht nur aus Wandlänge mal Höhe. Öffnungen, beide Wandseiten, mehrere Plattenlagen und ein sinnvoller Zuschnittplan verändern die Bestellmenge."
    updated="August 2026"
    breadcrumbs={[{ label: "Start", href: "/" }, { label: "Haus", href: "/haus/" }, { label: "Innenausbau", href: "/haus/innenausbau/" }, { label: "Trockenbau-Platten berechnen" }]}
    plannerHref="/haus/innenausbau/trockenbau-rechner/"
    plannerLabel="Plattenmenge berechnen"
    takeaway="Die Nettofläche einer Wandseite bildet die Grundlage. Multipliziere sie mit der Anzahl bekleideter Seiten und Plattenlagen, ergänze eine begründete Reserve und runde die Menge auf volle Platten auf."
    limitation="Eine reine Flächenrechnung ersetzt keinen Verlege- und Fugenplan. Zulässige Plattenrichtung, Stoßversatz, Befestigungsabstände und Formate folgen dem konkreten System."
    sections={[
      { title: "Nettofläche je Wandseite", paragraphs: ["Wandlänge mal Wandhöhe ergibt die Bruttofläche. Türen und Fenster können geometrisch abgezogen werden, verursachen aber zugleich Randzuschnitte und zusätzliche Unterkonstruktion.", "Erfasse Öffnungen deshalb separat und behalte ihre Anzahl im Blick. Eine große ruhige Fläche lässt sich anders belegen als dieselbe Nettofläche mit mehreren kleinen Ausschnitten."] },
      { title: "Seiten und Lagen vollständig multiplizieren", paragraphs: ["Eine beidseitig bekleidete Trennwand benötigt die Nettofläche zweimal. Bei zwei Plattenlagen je Seite vervierfacht sich die reine Fläche gegenüber einer einzelnen Wandseite.", "Mehrlagige Aufbauten brauchen einen vorgesehenen Fugenversatz. Reststücke dürfen nur dort eingeplant werden, wo Größe, Kanten und Befestigung zum System passen."], bullets: ["Bekleidete Seiten getrennt festlegen", "Plattenlagen je Seite bestätigen", "Öffnungs- und Randzuschnitte zeichnen"] },
      { title: "Volle Platten statt theoretischer Quadratmeter", paragraphs: ["Die Fläche einer Platte ergibt sich aus Länge mal Breite. Nach Reserve wird die benötigte Gesamtfläche durch dieses Format geteilt und auf ganze Platten aufgerundet.", "Die resultierende Stückzahl ist ein Einkaufsrahmen. Transport, Lagerung, beschädigte Kanten und eine mögliche Reparaturreserve sind zusätzliche Projektentscheidungen."] },
    ]}
  />;
}
