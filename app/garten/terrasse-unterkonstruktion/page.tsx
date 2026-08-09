import type { Metadata } from "next";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata: Metadata = { title: "Terrassen-Unterkonstruktion planen", description: "Unterkonstruktion einer Terrasse nach Auflagerabstand, Dielenrichtung, Stoßstellen, Material und Entwässerung einordnen." };

export default function Page() {
  return <GuidePage
    title="Terrassen-Unterkonstruktion: Abstand ist nur eine Vorgabe"
    intro="Die Unterkonstruktion trägt den Belag, bildet Gefälle und überträgt Lasten. Der maximale Auflagerabstand des konkreten Dielensystems ist wichtig, aber nicht die einzige Planungsgröße."
    updated="August 2026"
    breadcrumbs={[{label:"Start",href:"/"},{label:"Garten",href:"/garten/"},{label:"Terrassen-Unterkonstruktion"}]}
    plannerHref="/garten/terrassen-dielen-rechner/"
    plannerLabel="Materialrahmen berechnen"
    takeaway="Übernimm den maximalen Auflagerabstand aus der Freigabe des gewählten Belags. Ergänze Auflager für Ränder, Stöße, Ausschnitte und besondere Lasten im konkreten Plan."
    limitation="Der Rechner dimensioniert keine Tragkonstruktion und prüft keine Bauwerksanschlüsse. Tragfähigkeit, Fundamente, Abdichtung und Anschlusshöhen gehören in fachkundige Planung."
    sections={[
      {title:"Dielen und Unterkonstruktion kreuzen sich",paragraphs:["Üblicherweise verlaufen die Auflager quer zur Dielenrichtung. Deshalb verändert die gewählte Verlegerichtung nicht nur die Optik, sondern auch Länge und Anzahl der Unterkonstruktionslinien.","Der Rechner teilt die Dielen-Lauflänge so auf, dass der eingegebene maximale Abstand rechnerisch nicht überschritten wird, und setzt eine erste sowie letzte Linie an."]},
      {title:"Stoßstellen brauchen einen Detailplan",paragraphs:["An Dielenstößen kann eine einzelne schmale Unterkonstruktion für Randabstände oder zwei getrennte Befestigungsbereiche ungeeignet sein. Maßgeblich ist das freigegebene Systemdetail.","Zusätzliche Linien können auch an Treppen, Einfassungen, Revisionsöffnungen und schweren Einbauten nötig werden. Sie sind in der Grundschätzung nicht enthalten."]},
      {title:"Wasser muss kontrolliert weg",paragraphs:["Unterkonstruktion und Belag müssen trocknen können. Gefälle, Abstand zum Untergrund, Hinterlüftung und Wasserführung sind Teil des Gesamtaufbaus.","Materialkombinationen benötigen geeignete Trennlagen und Befestiger. Dauerhafte Feuchte oder unverträgliche Metalle können die Lebensdauer deutlich reduzieren."]},
    ]}
  />;
}
