import type { Metadata } from "next";
import { FlowRateCalculator } from "@/components/calculator/FlowRateCalculator";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata: Metadata = { title: "Durchfluss für Gartenbewässerung messen", description: "Wasserdurchfluss und Fließdruck für eine Gartenbewässerung messen, einordnen und ohne falsche Präzision dokumentieren." };

export default function Page() {
  return <GuidePage
    title="Durchfluss messen: die Basis jeder Bewässerungsplanung"
    intro="Fläche allein sagt nicht, wie viele Verbraucher gleichzeitig funktionieren. Ein einfacher Eimertest liefert einen ersten Durchflusswert; der Fließdruck muss separat unter Entnahme gemessen werden."
    updated="August 2026"
    breadcrumbs={[{label:"Start",href:"/"},{label:"Garten",href:"/garten/"},{label:"Durchfluss messen"}]}
    plannerHref="/garten/bewaesserungs-planer/"
    plannerLabel="Bewässerung planen"
    takeaway="Miss Liter und Füllzeit möglichst am später genutzten Anschluss. Rechne Liter × 60 ÷ Sekunden und notiere zusätzlich den Fließdruck während Wasser läuft."
    limitation="Der Eimertest ersetzt keine hydraulische Rohrnetzberechnung. Schlauchlänge, Querschnitt, Höhenunterschiede, Armaturen und gleichzeitige Verbraucher verändern die verfügbare Leistung."
    calculator={<FlowRateCalculator />}
    sections={[
      {title:"Eimertest Schritt für Schritt",paragraphs:["Verwende einen Behälter mit bekanntem Volumen und öffne den vorgesehenen Anschluss vollständig. Miss die Zeit bis zur Markierung mehrmals und verwende einen typischen, stabilen Wert.","Beispiel: Zehn Liter in 30 Sekunden entsprechen 20 Litern pro Minute. Der Wert gilt nur für diese Messsituation und diesen Anschluss."],bullets:["Behältervolumen kontrollieren","Zeit erst bei stabilem Wasserstrahl messen","Messung wiederholen und auffällige Abweichungen prüfen"]},
      {title:"Ruhedruck ist nicht Fließdruck",paragraphs:["Der statische Druck ohne Entnahme kann deutlich höher sein als der Druck während des Betriebs. Für Regner und Ventile ist der verfügbare Druck bei laufendem Wasser entscheidend.","Ein geeignetes Manometer und eine definierte Entnahme helfen bei der Einordnung. Bei Unsicherheit oder komplexen Anlagen gehört die Messung in fachkundige Hände."]},
      {title:"Messwert in Zonen übersetzen",paragraphs:["Verbraucher sollten nicht so geplant werden, dass ihre addierten Anforderungen den gemessenen Anschlusswert vollständig ausreizen. Reserve, Druckverluste und Herstellergrenzen müssen berücksichtigt werden.","Der MachPlan-Bewässerungsplaner speichert Messwerte als Planungsangaben. Ohne sie bleibt die Zahl und Dimensionierung von Rasen-Zonen bewusst offen."]},
    ]}
  />;
}
