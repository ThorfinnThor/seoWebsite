import type { Metadata } from "next";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata: Metadata = { title: "Mähroboter mit Begrenzungskabel oder kabellos?", description: "Kabelgebundene und kabellose Mähroboter nach Installation, Empfang, Gartenstruktur und Änderungsbedarf einordnen." };

export default function Page() {
  return <GuidePage
    title="Mähroboter: Begrenzungskabel oder kabellose Navigation?"
    intro="Beide Prinzipien können einen Mähbereich zuverlässig abbilden – wenn Installation, Grundstück und konkretes System zusammenpassen. Der Unterschied liegt nicht nur im ersten Aufbau."
    updated="August 2026"
    breadcrumbs={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Kabel oder kabellos" }]}
    plannerHref="/garten/maehroboter-rechner/"
    plannerLabel="Installationsrahmen prüfen"
    takeaway="Wähle das Begrenzungsprinzip nach realer Gartenstruktur, Empfang, Änderungsbedarf und Installationsaufwand. Bestätige die Funktion am Standort, bevor du die Entscheidung vom Komfortversprechen abhängig machst."
    limitation="Kabellose Systeme verwenden unterschiedliche Navigations- und Referenzkonzepte. MachPlan bewertet keine Funkabdeckung und leitet aus der bloßen Bezeichnung keine Standortkompatibilität ab."
    sections={[
      { title: "Kabel definiert eine physische Grenze", paragraphs: ["Ein Begrenzungskabel folgt vorgegebenen Abständen entlang des Mähbereichs und kann zusätzliche Inseln oder Leitungen benötigen. Verbindungen, Kreuzungen und zulässige Längen sind systemspezifisch.", "Der Rechner zeigt deshalb nur die Summe der eingegebenen Rechteckumfänge mit einer kleinen Längenreserve. Gemeinsame Kanten, Hindernisinseln und Zusatzleitungen können das Ergebnis deutlich verändern."] },
      { title: "Kabellos braucht bestätigte Standortbedingungen", paragraphs: ["Virtuelle Grenzen lassen sich häufig leichter ändern, funktionieren aber nur mit dem jeweiligen Navigationskonzept und ausreichender Signaldeckung. Gebäude, Bäume, Mauern und schmale Bereiche können die Standortprüfung beeinflussen.", "Kläre vor dem Kauf, welche Basis-, Referenz-, Mobilfunk- oder Netzwerkkomponenten das konkrete System benötigt und wo sie zulässig montiert werden können."] },
      { title: "Die Ladestation bleibt ein eigener Plan", paragraphs: ["Unabhängig vom Begrenzungsprinzip braucht die Station einen freigegebenen, erreichbaren und mit Strom versorgten Platz. Zufahrt, ebener Untergrund, freie Bereiche und mögliche Überdachung richten sich nach der Anleitung.", "Plane Kabelweg oder Stromzuführung so, dass sie nicht zur Stolper-, Mäh- oder Feuchtefalle werden. Elektrische Außenanschlüsse gehören in eine geeignete fachgerechte Ausführung."] },
    ]}
  />;
}
