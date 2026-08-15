import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Trockenbau-Profile und Ständerwerk planen",
  description: "Grundraster, Ständeranzahl, Boden- und Deckenprofile, Wandhöhe, Öffnungen und Anschlüsse im Trockenbau einordnen.",
  path: "/haus/innenausbau/trockenbau-profile-staenderwerk/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/haus/innenausbau/trockenbau-profile-staenderwerk/"
    title="Trockenbau-Profile: Das Grundraster ist nur die Basis"
    intro="Ein gleichmäßiges Ständerraster lässt sich aus Wandlänge und Achsabstand ableiten. Öffnungen, Enden, Anschlüsse, Lasten und hohe Wände verändern die tatsächliche Profilplanung."
    updated="August 2026"
    breadcrumbs={[{ label: "Start", href: "/" }, { label: "Haus", href: "/haus/" }, { label: "Innenausbau", href: "/haus/innenausbau/" }, { label: "Profile und Ständerwerk" }]}
    plannerHref="/haus/innenausbau/trockenbau-rechner/"
    plannerLabel="Grundraster berechnen"
    takeaway="Nutze die berechnete Ständerzahl nur als ungestörtes Grundraster. Ergänze Rand-, Anschluss-, Tür- und Lastprofile anhand des vollständigen Systemplans."
    limitation="PassendPlanen wählt keinen Profiltyp und bestätigt weder Tragfähigkeit noch zulässige Wandhöhe. Profilbreite, Blechdicke, Achsabstand und Befestigung müssen zum geprüften Aufbau passen."
    sections={[
      { title: "Achsabstand folgt dem Aufbau", paragraphs: ["Das Raster muss zu Plattenformat, Plattenlage, Wandhöhe und vorgesehenem System passen. Ein kleinerer Abstand ist nicht automatisch ein Ersatz für falsche oder ungeeignete Profile.", "Der Rechner teilt die Wandlänge durch den ausgewählten Abstand und ergänzt einen Endständer. Damit entsteht nur eine Grundzahl für eine durchgehende Wand ohne Störungen."] },
      { title: "Randprofile als Lieferstäbe", paragraphs: ["Boden- und Deckenanschluss ergeben zusammen die doppelte Wandlänge. Mit einer kleinen Längenreserve kann diese Summe durch die Lieferlänge geteilt und auf ganze Stäbe aufgerundet werden.", "Dichtungsband, Befestiger, Unterbrechungen, Bodenfugen und seitliche Anschlüsse bleiben separat. Auch Zuschnittreste sind nur nutzbar, wenn Mindestlänge und Anschluss passen."] },
      { title: "Öffnungen und Lasten verändern das Raster", paragraphs: ["Türöffnungen benötigen seitliche Profile und einen Sturz; Art und Ausführung hängen von Zarge, Öffnungsmaß, Wandhöhe und System ab. Fenster oder Revisionsöffnungen erzeugen weitere Rahmen.", "Hängeschränke, Sanitärobjekte, Geländer oder andere Lasten müssen vor dem Schließen der Wand mit passenden Verstärkungen und Befestigungspunkten geplant werden."] },
    ]}
  />;
}
