import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Sichtschutz-Pfosten und Fundament planen",
  description: "Pfosten, Fundamente, Fußplatten und Windangriffsfläche bei Sichtschutzanlagen sicher und systembezogen einordnen.",
  path: "/garten/sichtschutz-pfosten-fundament/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/garten/sichtschutz-pfosten-fundament/"
    title="Sichtschutz-Pfosten: Stückzahl ist noch keine Fundamentplanung"
    intro="Geschlossene oder halbgeschlossene Felder bieten dem Wind große Angriffsflächen. Deshalb lässt sich aus Höhe und Pfostenzahl keine pauschale Fundamenttiefe ableiten."
    updated="August 2026"
    breadcrumbs={[{label:"Start",href:"/"},{label:"Garten",href:"/garten/"},{label:"Sichtschutz-Pfosten und Fundament"}]}
    plannerHref="/garten/sichtschutz-planer/"
    plannerLabel="Pfostenanzahl abschätzen"
    takeaway="Nutze die berechnete Pfostenzahl nur für den Mengenrahmen. Dimensioniere Pfosten, Verankerung und Fundament nach Systemfreigabe, Standort, Boden und tatsächlicher Windangriffsfläche."
    limitation="Diese Seite liefert keine Statik und keine Fundamentabmessung. Bei exponierter Lage, unsicherem Bestand oder hohen geschlossenen Feldern ist eine fachkundige Prüfung erforderlich."
    sections={[
      {title:"Wind wirkt auf Fläche und Hebel",paragraphs:["Ein hohes, blickdichtes Feld leitet Windkräfte über Halter und Pfosten in die Verankerung. Höhe, Durchlässigkeit, Feldbreite, Böen und Geländelage beeinflussen diese Lasten gemeinsam.","Eine allgemeine Fundamenttiefe ohne System, Boden und Standort wäre deshalb Scheingenauigkeit. Maßgeblich sind Herstellerunterlagen und die Anforderungen am konkreten Einbauort."]},
      {title:"Einbetonieren und Aufschrauben sind unterschiedliche Systeme",paragraphs:["Einbetonierte Pfosten brauchen eine geeignete Gründung und Wasserführung. Aufgeschraubte Fußplatten benötigen einen ausreichend tragfähigen Untergrund, passende Randabstände und zugelassene Befestiger.","Terrassenplatten, dünne Mauerkronen oder unbekannte Alt-Fundamente sind nicht automatisch geeignet. Sichtbare Stabilität ersetzt keinen Nachweis für die neuen Lasten."]},
      {title:"Pfostentypen vor der Bestellung trennen",paragraphs:["Zwischenpfosten nehmen Felder auf beiden Seiten auf. End-, Eck- und Torpfosten können andere Profile, Abdeckungen oder Verstärkungen benötigen.","Erstelle aus dem Streckenplan eine Positionsskizze und ordne jedem Punkt seinen Systemartikel zu. Prüfe dabei auch Kappen, Halter, Distanzteile und Korrosionsschutz."]},
    ]}
  />;
}
