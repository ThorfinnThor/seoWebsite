import type { Metadata } from "next";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata: Metadata = { title: "Carport-Fundament und Pfosten richtig einordnen", description: "Carport-Pfosten, Fundamente, Verankerung, Boden und Lasten als konkrete Tragwerksaufgabe statt pauschale Stückliste verstehen." };

export default function Page() {
  return <GuidePage
    title="Carport-Fundament: Pfostenraster und Boden bestimmen die Gründung"
    intro="Das Fundament verbindet Wind-, Dach- und Schneelasten mit dem Baugrund. Seine Lage und Ausführung folgen der geprüften Konstruktion – nicht nur der überdachten Quadratmeterzahl."
    updated="August 2026"
    breadcrumbs={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Carport-Fundament" }]}
    plannerHref="/garten/carport-planer/"
    plannerLabel="Platzrahmen berechnen"
    takeaway="Lege zuerst ein konkretes, für Standort und Lasten geeignetes Carportsystem fest. Übertrage dessen Pfosten- und Fundamentplan anschließend in ein genaues Grundstücksaufmaß."
    limitation="MachPlan bestimmt weder Fundamentabmessungen noch Bewehrung, Beton, Pfostenträger oder Anker. Baugrund, Frost, Lasten und Systemvorgaben müssen fachlich und objektspezifisch geprüft werden."
    sections={[
      { title: "Lichter Raum und Pfostenachse trennen", paragraphs: ["Der Planer ermittelt den gewünschten freien Stellbereich. Pfosten liegen außerhalb oder teilweise neben diesem Bereich und vergrößern die notwendigen Außenmaße.", "Ihre Anzahl, Abstände und Querschnitte hängen vom Tragwerk ab. Ein Pfosten darf nicht allein deshalb versetzt werden, weil er beim Türöffnen stört." ] },
      { title: "Baugrund und Lastabtrag gehören zusammen", paragraphs: ["Tragfähigkeit, Frost, Grundwasser, Auffüllungen, Leitungen und Gelände beeinflussen die Gründung. Sichtbar feste Pflasterflächen sind nicht automatisch ein geeigneter Lastabtrag.", "Fundamentoberkanten müssen außerdem zu Pflaster, Gefälle, Entwässerung und Pfostenschutz passen. Bei geneigtem Gelände entsteht daraus ein eigener Höhenplan."], bullets: ["Leitungen und Entwässerung vor Aushub lokalisieren", "Achsmaße und Diagonalen kontrollieren", "Vorgesehene Anker und Randabstände einhalten"] },
      { title: "Hausanschluss ist eine zusätzliche Aufgabe", paragraphs: ["Bei angebauten Carports kommen Anschlüsse an Fassade oder Tragwerk hinzu. Lastabtrag, Abdichtung, Wärmebrücken und Brandschutz lassen sich nicht aus einem Standardgrundriss ableiten.", "Die Planung muss außerdem sicherstellen, dass Dachwasser nicht an der Fassade konzentriert wird und Wartungszugang erhalten bleibt."] },
    ]}
  />;
}
