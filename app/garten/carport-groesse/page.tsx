import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Carport-Größe für ein oder zwei Autos planen",
  description: "Carport-Breite, Länge und lichte Höhe aus Fahrzeugmaß, Türöffnung, Bewegungsraum, Zufahrt und Stauraum ableiten.",
  path: "/garten/carport-groesse/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/garten/carport-groesse/"
    title="Carport-Größe: Das Fahrzeugmaß ist nur der Anfang"
    intro="Ein Auto, das rechnerisch unter das Dach passt, lässt sich noch nicht automatisch bequem einparken, öffnen und beladen. Entscheidend sind lichte Maße und die reale Zufahrt."
    updated="August 2026"
    breadcrumbs={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Carport-Größe" }]}
    plannerHref="/garten/carport-planer/"
    plannerLabel="Lichten Stellraum planen"
    takeaway="Miss das größte vorgesehene Fahrzeug und addiere Freiraum für Türen, Heckklappe, Einsteigen und Rangieren. Vergleiche diesen lichten Zielraum anschließend mit den Innen- und Außenmaßen konkreter Systeme."
    limitation="Der Planer berechnet keine Durchfahrtskurve und keine Pfostenpositionen. Tor, Straße, Grundstückszufahrt, Wendefläche und konstruktive Bauteile können den nutzbaren Raum zusätzlich begrenzen."
    sections={[
      { title: "Breite für Türen und Zwischenraum", paragraphs: ["Zur Fahrzeugbreite kommt Freiraum an beiden Seiten. Beim Doppelcarport entsteht zusätzlich ein gemeinsam nutzbarer Zwischenraum zwischen den Fahrzeugen.", "Die benötigte Breite hängt von Türlänge, Sitzhöhe, Kindersitz, Mobilität und täglicher Nutzung ab. Ein rechnerischer Mindestabstand ist deshalb kein allgemeines Komfortmaß."], bullets: ["Spiegel und Türbewegung berücksichtigen", "Pfosten nicht in die Türöffnungszone setzen", "Fahrräder oder Mülltonnen als eigene Zone planen"] },
      { title: "Länge und Höhe mit beweglichen Teilen", paragraphs: ["Vorne und hinten braucht das Fahrzeug Abstand zu Pfosten, Wand, Stauraum und Fahrweg. Eine geöffnete Heckklappe kann mehr Höhe und Rückraum verlangen als das geschlossene Auto.", "Dachbox, Antenne, Fahrradträger und ein mögliches größeres Folgefahrzeug gehören in die Reserven. Die lichte Höhe ist nicht mit der äußeren Gesamthöhe des Carports gleichzusetzen."] },
      { title: "Die Zufahrt kann mehr Raum verlangen", paragraphs: ["Bei gerader Einfahrt ist der Stellraum einfacher erreichbar als nach einer engen Kurve. Seitliche Mauern, Torpfosten und öffentliche Gehwege beeinflussen Anfahrwinkel und Rangierweg.", "Übertrage den Zielraum in einen Grundstücksplan und zeichne die Anfahrt. So wird erkennbar, ob Pfostenraster und Dachform eines konkreten Modells praktisch funktionieren."] },
    ]}
  />;
}
