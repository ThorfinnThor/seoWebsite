import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Carport-Dachentwässerung und Regenwasser planen",
  description: "Carport-Dachgefälle, Rinne, Fallrohr, Speicher, Versickerung und Überlauf als zusammenhängenden Entwässerungsweg planen.",
  path: "/garten/carport-dachentwaesserung/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/garten/carport-dachentwaesserung/"
    title="Carport-Dachentwässerung: Das Wasser braucht einen vollständigen Weg"
    intro="Dachform und überdeckte Fläche bestimmen, wo Wasser gesammelt wird. Erst mit Rinne, Fallrohr, zulässigem Ziel und sicherem Überlauf entsteht ein vollständiger Entwässerungsplan."
    updated="August 2026"
    breadcrumbs={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Carport-Dachentwässerung" }]}
    plannerHref="/garten/carport-planer/"
    plannerLabel="Dachflächenrahmen berechnen"
    takeaway="Lege Entwässerungsrichtung und Ablaufziel vor dem Fundament fest. Plane den gesamten Weg vom Dach über Rinne und Fallrohr bis zu Speicher, Anschluss oder zulässiger Versickerung einschließlich Überlauf."
    limitation="Der theoretische Literwert ist keine Rinnen-, Rohr-, Speicher- oder Versickerungsbemessung. Reale Dachfläche, Starkregen, Verluste, Boden und örtliche Vorgaben müssen konkret berücksichtigt werden."
    sections={[
      { title: "Auch ein Flachdach braucht Gefälle", paragraphs: ["Die sichtbare Dachform sagt nicht allein, wohin Wasser läuft. Konstruktion und Abdichtung benötigen eine vorgesehene Entwässerungsrichtung und ausreichend freie Abläufe.", "Rinne und Fallrohr müssen zugänglich bleiben und dürfen nicht mit Tür-, Stell-, Geh- oder Rangierbereichen kollidieren."] },
      { title: "Theoretisches Volumen richtig lesen", paragraphs: ["Ein Millimeter Niederschlag auf einem Quadratmeter entspricht geometrisch einem Liter Wasser. Der Planer bündelt dies für zehn Millimeter als anschaulichen Rahmen.", "Tatsächliche Dachprojektion, Überstände, Wind, Spritzwasser, Rinnenverluste und ein bereits gefüllter Speicher verändern die nutzbare Menge. Der Wert ist deshalb kein garantierter Ertrag." ] },
      { title: "Überlauf vor dem Speicher planen", paragraphs: ["Speicher haben eine begrenzte Kapazität. Ein sicherer Überlauf verhindert, dass Wasser unkontrolliert an Fundament, Fassade, Nachbargrundstück oder Fahrfläche austritt.", "Ob Anschluss oder Versickerung zulässig und technisch geeignet sind, hängt von Grundstück und örtlichen Bedingungen ab. Diese Entscheidung muss vor Erdarbeiten und Leitungsführung feststehen."] },
    ]}
  />;
}
