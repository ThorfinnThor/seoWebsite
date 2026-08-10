import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Mähroboter-Rasenfläche richtig berechnen",
  description: "Netto-Mähfläche aus Rechtecken und festen Abzügen ermitteln und eine realistische Kapazitätsreserve für den Mähroboter einordnen.",
  path: "/garten/maehroboter-flaeche-berechnen/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/garten/maehroboter-flaeche-berechnen/"
    title="Mähroboter-Fläche berechnen: Netto statt Grundstücksgröße"
    intro="Für die Geräteauswahl zählt nicht das gesamte Grundstück, sondern die zusammenhängende Rasenfläche, die der Roboter tatsächlich erreicht und mähen soll."
    updated="August 2026"
    breadcrumbs={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Mähroboter-Fläche berechnen" }]}
    plannerHref="/garten/maehroboter-rechner/"
    plannerLabel="Rasenfläche berechnen"
    takeaway="Zerlege den Rasen in einfache Rechtecke, addiere deren Flächen und ziehe nur dauerhaft nicht befahrbare Bereiche ab. Plane danach eine nachvollziehbare Kapazitätsreserve für Geometrie und Nutzung ein."
    limitation="Die berechnete Flächenklasse ist eine Auswahlheuristik. Hersteller messen Nennflächen unter eigenen Bedingungen; Fahrzeit, Wachstum, Ladezyklen und Gartenstruktur können die reale Leistung verändern."
    sections={[
      { title: "Komplexe Formen in Teilflächen zerlegen", paragraphs: ["L-Formen, Seitenstreifen oder ein separater Vorgarten lassen sich als mehrere Rechtecke erfassen. Länge mal Breite ergibt jeweils eine Bruttofläche; die Summe bildet den geometrischen Ausgangspunkt.", "Überlappende Rechtecke dürfen nicht doppelt gezählt werden. Bei stark runden oder schrägen Grenzen hilft eine maßstäbliche Skizze, die Abweichung bewusst zu schätzen."] },
      { title: "Nur feste Nicht-Rasenflächen abziehen", paragraphs: ["Haus, Terrasse, Teich, feste Beete und dauerhaft gepflasterte Wege gehören nicht zur Mähfläche. Einzelne Bäume, Pfosten oder kleine Inseln verändern dagegen vor allem Navigation und Randführung.", "Große Abzüge solltest du einer konkreten Teilfläche zuordnen. So bleibt sichtbar, ob versehentlich mehr abgezogen wurde, als das Rechteck überhaupt enthält."], bullets: ["Zusammenhängende Rasenstücke getrennt benennen", "Verbindungsstreifen nicht vergessen", "Nicht selbstständig erreichbare Flächen markieren"] },
      { title: "Warum exakt passende Nennfläche knapp sein kann", paragraphs: ["Eine offene rechteckige Fläche ist einfacher abzuarbeiten als mehrere Zonen mit Engstellen und Hindernissen. Starkes Wachstum oder zeitlich eingeschränkter Betrieb kann zusätzliche Kapazität verlangen.", "MachPlan startet deshalb mit einer sichtbaren Grundreserve und erhöht sie bei komplexer Geometrie, mehreren Zonen, starkem Wachstum oder getrennten Flächen. Das Ergebnis ist ein Vergleichsrahmen, keine Laufzeitprognose."] },
    ]}
  />;
}
