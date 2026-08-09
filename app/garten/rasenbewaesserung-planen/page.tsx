import type { Metadata } from "next";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata: Metadata = { title: "Rasenbewässerung richtig planen", description: "Rasenbewässerung mit Regnern planen: Fläche, Geometrie, Überlappung, Durchfluss, Zonen und Hindernisse realistisch berücksichtigen." };

export default function Page() {
  return <GuidePage
    title="Rasenbewässerung planen: Fläche allein reicht nicht"
    intro="Zwei Rasenflächen mit gleicher Quadratmeterzahl können völlig unterschiedliche Regnerpläne benötigen. Form, Hindernisse, Wind, Anschlussleistung und Überlappung entscheiden über die reale Abdeckung."
    updated="August 2026"
    breadcrumbs={[{label:"Start",href:"/"},{label:"Garten",href:"/garten/"},{label:"Rasenbewässerung planen"}]}
    plannerHref="/garten/bewaesserungs-planer/"
    plannerLabel="Systemrahmen planen"
    takeaway="Zeichne die Fläche maßstäblich mit Kanten, Engstellen und Hindernissen. Miss Durchfluss und Fließdruck, bevor du Regnertypen oder Zonen festlegst."
    limitation="Der MachPlan-Rechner liefert für Rasen bewusst keine exakte Regnerzahl oder Position. Dafür wären konkrete Düsenkennlinien, Geometrie, Druckverluste und eine vollständige Layoutplanung nötig."
    sections={[
      {title:"Geometrie vor Quadratmetern",paragraphs:["Rechteckige, schmale und verwinkelte Flächen benötigen unterschiedliche Wurfsektoren. Wege, Mauern, Bäume und Höhenunterschiede begrenzen sinnvolle Positionen.","Eine Skizze mit Maßen ist deshalb wertvoller als eine einzelne Flächenzahl. Markiere außerdem Bereiche, die nicht beregnet werden dürfen."]},
      {title:"Gleichmäßigkeit braucht Überlappung",paragraphs:["Die maximale Wurfweite eines Regners ist nicht gleichbedeutend mit gleichmäßiger Verteilung bis zum Rand. Fachgerechte Layouts berücksichtigen die Niederschlagsverteilung und abgestimmte Überlappung.","Wer nur Kreise ohne Düsendaten einzeichnet, riskiert trockene und überversorgte Stellen. Hersteller-Planungsdaten haben Vorrang."]},
      {title:"Zonen aus Anschlussleistung",paragraphs:["Wenn mehrere Regner zusammen mehr Durchfluss oder Druck benötigen als verfügbar, müssen sie auf getrennte Zonen verteilt werden. Leitungsquerschnitt und -länge beeinflussen die Situation zusätzlich.","Der Bewässerungsplaner kennzeichnet diese Prüfung als offen, solange belastbare Messwerte und ein konkretes System fehlen."]},
    ]}
  />;
}
