import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Mähroboter: Steigung und Engstellen messen",
  description: "Maximale Rasensteigung, schmale Passagen, Kanten und Wendeflächen vor der Mähroboter-Auswahl richtig aufnehmen.",
  path: "/garten/maehroboter-steigung-engstellen/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/garten/maehroboter-steigung-engstellen/"
    title="Mähroboter bei Steigung und Engstellen: Der schwierigste Abschnitt zählt"
    intro="Eine große freie Fläche kann leicht sein, während wenige Meter am Hang oder zwischen zwei Beeten die gesamte Geräteauswahl bestimmen."
    updated="August 2026"
    breadcrumbs={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Steigung und Engstellen" }]}
    plannerHref="/garten/maehroboter-rechner/"
    plannerLabel="Gelände einordnen"
    takeaway="Miss die steilste tatsächlich zu mähende Stelle und die engste vollständig befahrbare Passage. Vergleiche beide Werte anschließend mit den Bedingungen des konkreten Geräts und Installationssystems."
    limitation="MachPlan bestätigt keine Befahrbarkeit. Feuchte, loses Gelände, Gefälle direkt an Kanten, Begrenzungsabstände und erforderliche Wendeflächen können trotz rechnerisch passender Breite problematisch sein."
    sections={[
      { title: "Steigung in Prozent dokumentieren", paragraphs: ["Miss nicht nur den durchschnittlichen Hang, sondern den steilsten Abschnitt innerhalb des geplanten Mähbereichs. Entscheidend ist außerdem, ob die Steigung entlang einer Kante, in einer Kurve oder vor einer Engstelle liegt.", "Prozent und Grad sind unterschiedliche Angaben. Übernimm für den Vergleich genau die Einheit und Messbedingung, die der Hersteller verwendet, statt Werte ungeprüft umzudeuten."] },
      { title: "Passage ist mehr als lichte Breite", paragraphs: ["Die gemessene Öffnung zwischen zwei festen Kanten ist nicht automatisch die nutzbare Fahrspur. Begrenzungskabel, Sicherheitsabstände, überhängende Pflanzen und notwendige Wendeflächen können sie verkleinern.", "Miss Anfang, Mitte und Ende der Passage. Notiere außerdem Länge, Bodenbeschaffenheit und ob der Roboter dort nur hindurchfahren oder auch mähen soll."] },
      { title: "Kanten und Absturzstellen separat prüfen", paragraphs: ["Mauern, Stufen, Teichränder, Kiesflächen und öffentliche Wege benötigen eine bewusst geplante Grenze. Die zulässige Ausführung hängt vom Navigationssystem und der konkreten Anleitung ab.", "Eine gute Skizze markiert Hang, Engstellen, Hindernisse und kritische Ränder zusätzlich zur Fläche. Diese Punkte sind später harte Auswahlkriterien und keine Eigenschaften, die eine größere Nennfläche ausgleicht."] },
    ]}
  />;
}
