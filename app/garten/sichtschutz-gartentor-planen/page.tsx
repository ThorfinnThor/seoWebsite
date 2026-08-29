import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Gartentor im Sichtschutz planen",
  description: "Gartentor mit Systemmaß, lichter Öffnung, Öffnungsrichtung, Torpfosten und Bodenfreiheit passend zum Sichtschutz planen.",
  path: "/garten/sichtschutz-gartentor-planen/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/garten/sichtschutz-gartentor-planen/"
    title="Gartentor planen: Durchgang und Systemraster zusammenbringen"
    intro="Die beworbene Torbreite kann lichte Öffnung, Flügelmaß oder komplettes Einbauraster meinen. Für Nutzung und Pfostenposition brauchst du beide Perspektiven."
    updated="August 2026"
    breadcrumbs={[{label:"Start",href:"/"},{label:"Garten",href:"/garten/"},{label:"Gartentor planen"}]}
    plannerHref="/garten/sichtschutz-planer/"
    plannerLabel="Tor-Modul einrechnen"
    takeaway="Die benötigte lichte Durchgangsbreite und Öffnungsrichtung bestimmen den Streckenplan. Berücksichtige darin das vollständige Tor-Systemmaß."
    limitation="Der Planer behandelt jedes Tor mit einem eingegebenen Systemmaß. Verstärkungen, Beschläge, Anschläge, Fundamente und elektrische Antriebe werden nicht dimensioniert."
    sections={[
      {title:"Lichte Öffnung ist das Nutzmaß",paragraphs:["Mülltonne, Fahrrad, Schubkarre oder Gartengerät bestimmen, wie breit der freie Durchgang sein muss. Das äußere Modulmaß fällt durch Pfosten, Bänder und Spiel meist größer aus.","Prüfe in der technischen Zeichnung, welche Breite der Hersteller nennt. Für den Planer wird das vollständige Einbauraster des Tor-Moduls benötigt, nicht nur die freie Öffnung."]},
      {title:"Öffnungsrichtung braucht freien Raum",paragraphs:["Ein Flügeltor benötigt auf seiner Öffnungsseite eine freie Bewegungsfläche. Gefälle, Stufen, Mauern, Pflanzen und abgestellte Gegenstände können den Schwenkbereich blockieren.","Plane Anschlagseite, Griff, Schloss und Zugang so, dass das Tor im Alltag sicher bedient werden kann. Bodenfreiheit und Stufung müssen zum Geländeverlauf passen."]},
      {title:"Torpfosten separat prüfen",paragraphs:["Das Gewicht und die Bewegung des Flügels belasten Band- und Anschlagpfosten anders als ein ruhiges Sichtschutzfeld. Viele Systeme verlangen dafür eigene Profile oder Verstärkungen.","Auch Fundament und Verankerung können abweichen. Zähle das Tor im Raster als Modul, übernimm aber Pfostentyp und Ausführung ausschließlich aus dem freigegebenen Torsystem."]},
    ]}
  />;
}
