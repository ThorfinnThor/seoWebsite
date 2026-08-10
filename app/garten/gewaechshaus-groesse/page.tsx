import type { Metadata } from "next";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata: Metadata = { title: "Gewächshaus-Größe und Innenaufteilung planen", description: "Gewächshaus-Größe aus Beeten, Wegen, Türzugang und geplanter Nutzung statt nur aus Quadratmetern ableiten." };

export default function Page() {
  return <GuidePage
    title="Gewächshaus-Größe: Nutzbare Fläche beginnt im Inneren"
    intro="Ein Gewächshaus kann auf dem Papier groß wirken und trotzdem unpraktisch sein. Beettiefe, Mittelweg, Tür und Arbeitshöhe bestimmen, wie viel der Grundfläche wirklich nutzbar bleibt."
    updated="August 2026"
    breadcrumbs={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Gewächshaus-Größe" }]}
    plannerHref="/garten/gewaechshaus-planer/"
    plannerLabel="Gewächshaus aufteilen"
    takeaway="Zeichne zuerst Beete, einen durchgehenden Weg und den Türbereich in das Innenmaß. Prüfe erst danach, welches Außenmaß und welches konkrete Modell dazu passen."
    limitation="Der Rechner verwendet Außenmaße als Flächenrahmen. Innenprofile, schräge Wände, Verstrebungen, Türschwelle und herstellerspezifische Nutzmaße können die reale Fläche verkleinern."
    sections={[
      { title: "Außenmaß ist nicht Nutzmaß", paragraphs: ["Profile, Sockel und geneigte Seitenwände nehmen Raum ein. Besonders an niedrigen Traufen kann eine rechnerisch breite Beetfläche nicht über die gesamte Höhe genutzt werden.", "Prüfe in der technischen Zeichnung Innenbreite, Seitenhöhe, Firsthöhe und lichte Türmaße. Produktnamen oder nominelle Grundflächen ersetzen diese Maße nicht."] },
      { title: "Vom Mittelweg zu den Beeten", paragraphs: ["Ein durchgehender Mittelweg verbindet Tür und hinteren Bereich. Zwei Seitenbeete sind einfach zugänglich; ein zusätzliches hinteres Beet erhöht die Anbaufläche, braucht aber ausreichende Reichweite und Bewegungsraum.", "Bei Tischen und Töpfen ist die freie Grundfläche nur der Anfang. Tischbreite, Arbeitshöhe, Gießzugang und saisonale Umstellung gehören in eine separate Stellskizze."], bullets: ["Türanschlag und Schwelle freihalten", "Rankpflanzen nicht in notwendige Laufwege planen", "Schläuche, Gießkannen und Erntekisten mitdenken"] },
      { title: "Nutzung verändert die Prioritäten", paragraphs: ["Für Gemüse zählen Beetfläche, Höhe und Lüftung. Bei Anzucht werden Stellflächen und Lichtverteilung wichtiger. Für Überwinterung kommen Frostschutz, Energiebedarf und sichere Elektrik hinzu.", "Ein größeres Haus löst diese Anforderungen nicht automatisch. Es vergrößert zugleich Fundament, Hüllfläche, Lüftungsaufgabe und möglichen Heizbedarf."] },
    ]}
  />;
}
