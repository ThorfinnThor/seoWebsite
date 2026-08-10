import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Laminat-Verschnitt und Pakete berechnen",
  description: "Verschnitt für Laminat, Klick-Vinyl und Fertigparkett anhand von Raumform, Verlegemuster, Dielenmaß und Paketinhalt planen.",
  path: "/haus/boden/laminat-verschnitt-berechnen/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/haus/boden/laminat-verschnitt-berechnen/"
    title="Laminat-Verschnitt berechnen: Fläche ist erst der Anfang"
    intro="Aus der Nettofläche wird erst durch Zuschnittreserve und Aufrundung auf volle Pakete eine bestellbare Menge. Raumform und Verlegemuster entscheiden mit."
    updated="August 2026"
    breadcrumbs={[{label:"Start",href:"/"},{label:"Haus",href:"/haus/"},{label:"Boden",href:"/haus/boden/"},{label:"Verschnitt berechnen"}]}
    plannerHref="/haus/boden/bodenbelag-rechner/"
    plannerLabel="Pakete berechnen"
    takeaway="Teile verwinkelte Räume in messbare Rechtecke, ziehe nur sicher unbelegte Flächen ab und runde die Fläche inklusive passender Reserve auf volle Pakete auf."
    limitation="Ein pauschaler Verschnittwert ersetzt keinen Reihenplan. Diagonalen, Nischen, Muster, schiefe Wände und kurze wiederverwendbare Reststücke können den Bedarf deutlich verändern."
    sections={[
      {title:"Nettofläche aus Teilflächen bilden",paragraphs:["Rechteckige Räume ergeben Länge mal Breite. L-Formen und verbundene Bereiche lassen sich in überlappungsfreie Rechtecke zerlegen und anschließend addieren.","Feste Flächen werden nur abgezogen, wenn dort tatsächlich kein Boden verlegt wird. Lose Möbel, viele Küchenzeilen und später austauschbare Einbauten sind kein automatischer Abzug."]},
      {title:"Reserve zur Geometrie passend wählen",paragraphs:["Bei einer einfachen geraden Verlegung können fünf Prozent ausreichen, wenn geeignete Reststücke in der nächsten Reihe weiterverwendet werden. Viele Nischen, schräge Wände oder diagonale Verlegung benötigen häufig mehr.","Der Rechner bietet bewusst nur grobe Stufen. Ein gezeichneter Reihenplan mit Start- und Endstücken ist genauer und zeigt, ob problematisch schmale Randreihen entstehen."]},
      {title:"Volle Pakete sind die reale Bestelleinheit",paragraphs:["Hersteller verkaufen Bodenbelag üblicherweise paketweise. Deshalb wird die benötigte Fläche inklusive Reserve durch den tatsächlichen Paketinhalt geteilt und immer aufgerundet.","Die Differenz zur Nettofläche ist nicht vollständig nutzbarer Überschuss: Ein Teil davon deckt Verschnitt ab. Eine zusätzliche ungeöffnete Reparaturreserve ist eine separate Entscheidung."]},
    ]}
  />;
}
