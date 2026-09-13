import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Mähroboter mit Begrenzungskabel oder kabellos?",
  description: "Kabelgebundene und kabellose Mähroboter nach Installation, Empfang, Gartenstruktur und Änderungsbedarf einordnen.",
  path: "/garten/maehroboter-begrenzungskabel-kabellos/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/garten/maehroboter-begrenzungskabel-kabellos/"
    title="Mähroboter: Begrenzungskabel oder kabellose Navigation?"
    intro="Beide Prinzipien können einen Mähbereich zuverlässig abbilden – wenn Installation, Grundstück und konkretes System zusammenpassen. Der Unterschied liegt nicht nur im ersten Aufbau."
    updated="August 2026"
    breadcrumbs={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Kabel oder kabellos" }]}
    plannerHref="/garten/maehroboter-rechner/"
    plannerLabel="Installationsrahmen prüfen"
    takeaway="Wähle das Begrenzungsprinzip nach realer Gartenstruktur, Empfang, Änderungsbedarf und Installationsaufwand. Bestätige die Funktion am Standort, bevor du die Entscheidung vom Komfortversprechen abhängig machst."
    limitation="Kabellose Systeme verwenden unterschiedliche Navigations- und Referenzkonzepte. PassendPlanen bewertet keine Funkabdeckung und leitet aus der bloßen Bezeichnung keine Standortkompatibilität ab."
    sections={[
      { title: "Kabel definiert eine physische Grenze", paragraphs: ["Ein Begrenzungskabel folgt vorgegebenen Abständen entlang des Mähbereichs und kann zusätzliche Inseln oder Leitungen benötigen. Verbindungen, Kreuzungen und zulässige Längen sind systemspezifisch.", "Der Rechner zeigt deshalb nur die Summe der eingegebenen Rechteckumfänge mit einer kleinen Längenreserve. Gemeinsame Kanten, Hindernisinseln und Zusatzleitungen können das Ergebnis deutlich verändern."] },
      { title: "Kabellos braucht bestätigte Standortbedingungen", paragraphs: ["Virtuelle Grenzen lassen sich häufig leichter ändern, funktionieren aber nur mit dem jeweiligen Navigationskonzept und ausreichender Signaldeckung. Gebäude, Bäume, Mauern und schmale Bereiche können die Standortprüfung beeinflussen.", "Kläre vor dem Kauf, welche Basis, Referenz, Mobilfunkverbindung oder Netzwerkkomponente das konkrete System benötigt und wo sie zulässig montiert werden kann."] },
      { title: "RTK, Kamera und LiDAR lösen die Aufgabe unterschiedlich", paragraphs: ["RTK bestimmt die Position über Satellitensignale und Korrekturdaten. Dichte Baumkronen, hohe Gebäude oder überdachte Bereiche können deshalb kritische Stellen sein. Eine gute Verbindung auf der offenen Hauptfläche belegt noch nicht, dass jede Grenze und Passage funktioniert.", "Kamera und LiDAR erfassen die Umgebung auf andere Weise. Sichtbare Kanten, wechselndes Licht, Laub, Tiere, sehr offene Flächen und ein verschmutzter Sensor können je nach System unterschiedlich relevant sein. Entscheidend ist das Verhalten des vollständigen Modells einschließlich seiner Rückfallebene, nicht nur der Name der Navigationstechnik."] },
      { title: "Ein komplexer Garten bleibt auch ohne Kabel komplex", paragraphs: ["Mehrere Rasenstücke, enge Tore und Bereiche neben öffentlichen Wegen brauchen eine sichere, tatsächlich befahrbare Verbindung. Eine digitale Zone ersetzt weder einen realen Fahrweg noch die vom Hersteller verlangte Sicherung an Wasser, Stufen oder Straßen.", "Kabellose Navigation ist besonders interessant, wenn sich Grenzen häufig ändern oder eine nachträgliche Kabelverlegung vermieden werden soll. Vor dem Kauf sollten trotzdem die schwierigsten Stellen getestet und die Bedingungen für Rückgabe, Einrichtung und mögliche laufende Dienste geklärt sein."] },
      { title: "Die Ladestation bleibt ein eigener Plan", paragraphs: ["Unabhängig vom Begrenzungsprinzip braucht die Station einen freigegebenen, erreichbaren und mit Strom versorgten Platz. Zufahrt, ebener Untergrund, freie Bereiche und mögliche Überdachung richten sich nach der Anleitung.", "Plane Kabelweg oder Stromzuführung so, dass sie nicht zur Stolper-, Mäh- oder Feuchtefalle werden. Elektrische Außenanschlüsse gehören in eine geeignete fachgerechte Ausführung."] },
    ]}
  />;
}
