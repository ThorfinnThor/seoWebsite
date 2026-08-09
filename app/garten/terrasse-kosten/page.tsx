import type { Metadata } from "next";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata: Metadata = { title: "Terrassen-Kosten vollständig planen", description: "Kosten einer Terrasse nach Belag, Untergrund, Unterkonstruktion, Befestigung, Zuschnitt, Lieferung und Pflege realistisch strukturieren." };

export default function Page() {
  return <GuidePage
    title="Was kostet eine Terrasse wirklich?"
    intro="Ein Quadratmeterpreis für Dielen beschreibt nur einen Teil des Projekts. Untergrund, Unterkonstruktion, Befestigung, Randdetails, Lieferung und Aufbau können das Budget stark verändern."
    updated="August 2026"
    breadcrumbs={[{label:"Start",href:"/"},{label:"Garten",href:"/garten/"},{label:"Terrassen-Kosten"}]}
    plannerHref="/garten/terrassen-dielen-rechner/"
    plannerLabel="Materialmenge abschätzen"
    takeaway="Berechne zuerst Dielen- und Unterkonstruktionsmengen. Hole Preise anschließend getrennt für Belag, Unterbau, Befestigung, Lieferung und Ausführung ein."
    limitation="Pauschale Quadratmeterpreise sind ohne Standort, Untergrund und Konstruktionsdetails nicht belastbar. Der Rechner erstellt deshalb bewusst kein verbindliches Kostenangebot."
    sections={[
      {title:"Sechs Kostenblöcke statt eines Dielenpreises",paragraphs:["Ein vollständiger Vergleich trennt Belag, Unterkonstruktion, Gründung, Befestigung, Rand- und Entwässerungsdetails sowie Arbeits- und Lieferkosten."],bullets:["Dielen inklusive Zuschnittreserve","Unterkonstruktion und zusätzliche Stoßauflager","Fundamente, Lager oder vorbereiteter Untergrund","Clips, Schrauben, Verbinder und Trennlagen","Blenden, Stufen, Entwässerung und Anschlüsse","Lieferung, Werkzeug, Zuschnitt und Montage"]},
      {title:"Preis pro Quadratmeter richtig beziehen",paragraphs:["Ein Belagspreis pro Quadratmeter kann Fugen und Profilgeometrie bereits berücksichtigen – oder nur aus der reinen Dielenbreite abgeleitet sein. Vergleiche Angebotseinheit und tatsächliche Deckbreite.","Bei Laufmeterpreisen liefert der Terrassenrechner die passendere erste Menge. Pakete und feste Lieferlängen müssen anschließend auf volle Einheiten aufgerundet werden."]},
      {title:"Lebensdauer und Pflege mitdenken",paragraphs:["Holz, WPC und andere Materialien unterscheiden sich bei Pflege, Reparierbarkeit, Erwärmung, Ausdehnung und Austausch einzelner Dielen. Ein günstiger Startpreis beschreibt diese Folgekosten nicht vollständig.","Herstellerfreigaben und ein konstruktiv trockener Aufbau sind oft wirtschaftlicher als spätere Reparaturen an einer falsch geplanten Unterkonstruktion."]},
    ]}
  />;
}
