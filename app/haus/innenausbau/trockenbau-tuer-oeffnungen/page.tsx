import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Türen, Öffnungen und Installationen im Trockenbau",
  description: "Türöffnungen, Zargen, Zusatzprofile, Elektro- und Sanitärinstallationen sowie spätere Lasten in Trockenbauwänden planen.",
  path: "/haus/innenausbau/trockenbau-tuer-oeffnungen/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/haus/innenausbau/trockenbau-tuer-oeffnungen/"
    title="Trockenbau-Türen und Installationen: Vor dem Schließen koordinieren"
    intro="Öffnungen reduzieren zwar die Plattenfläche, erhöhen aber Detailaufwand und Profilbedarf. Leitungen und spätere Lasten müssen feststehen, solange der Wandhohlraum zugänglich ist."
    updated="August 2026"
    breadcrumbs={[{ label: "Start", href: "/" }, { label: "Haus", href: "/haus/" }, { label: "Innenausbau", href: "/haus/innenausbau/" }, { label: "Türen und Installationen" }]}
    plannerHref="/haus/innenausbau/trockenbau-rechner/"
    plannerLabel="Wandmenge vorbereiten"
    takeaway="Dokumentiere jede Öffnung mit Lage und Maß. Koordiniere Zarge, Zusatzprofile, Leitungen, Dämmung und spätere Befestigungslasten in einem Wandplan vor der ersten Plattenlage."
    limitation="Elektro-, Sanitär-, Brand- und Schallschutzdetails gehören in fachgerechte Planung und Ausführung. Der Rechner liefert dafür weder Leitungswege noch Durchdringungs- oder Befestigungsdetails."
    sections={[
      { title: "Türöffnung als eigenes Bauteildetail", paragraphs: ["Rohbauöffnung, Türblatt und Zargenmaß sind nicht identisch. Das erforderliche Öffnungsmaß und die passenden Profile richten sich nach Türsystem und Wandaufbau.", "Seitliche Verstärkungen, Sturz, Befestigung und Anschluss der Platten müssen als zusammengehöriges Detail geplant werden. Die pauschale Grundständerzahl enthält diese Teile nicht."] },
      { title: "Leitungswege schützen und trennen", paragraphs: ["Dosen, Kabel, Rohre und Armaturen benötigen festgelegte Positionen und ausreichenden Hohlraum. Profilöffnungen dürfen nur systemgerecht genutzt oder hergestellt werden.", "Durchdringungen können Brand-, Schall-, Feuchte- oder Luftdichtheit beeinflussen. Sie müssen mit dem geforderten Gesamtaufbau kompatibel bleiben." ] },
      { title: "Spätere Lasten heute markieren", paragraphs: ["Küchenschränke, Waschtische, Fernseher, Handläufe und Regale benötigen geeignete Befestigungszonen. Nach dem Schließen der Wand sind fehlende Verstärkungen nur aufwendig zu ergänzen.", "Dokumentiere Lage und Art der Verstärkung mit Maßen und Fotos. Die spätere Befestigung muss dennoch zur tatsächlichen Last und zum freigegebenen System passen."] },
    ]}
  />;
}
