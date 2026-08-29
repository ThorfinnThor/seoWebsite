import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Untergrund und Trittschalldämmung planen",
  description: "Untergrund, Ebenheit, Restfeuchte, Dampfbremse, Trittschall und Fußbodenheizung vor schwimmender Bodenverlegung richtig einordnen.",
  path: "/haus/boden/untergrund-trittschall/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/haus/boden/untergrund-trittschall/"
    title="Untergrund und Trittschall: Aufbau vor Quadratmetern"
    intro="Eine passende Unterlage gleicht keinen ungeeigneten Untergrund aus. Tragfähigkeit, Ebenheit, Feuchte und der komplette Systemaufbau müssen vor der Verlegung geklärt sein."
    updated="August 2026"
    breadcrumbs={[{label:"Start",href:"/"},{label:"Haus",href:"/haus/"},{label:"Boden",href:"/haus/boden/"},{label:"Untergrund und Trittschall"}]}
    plannerHref="/haus/boden/bodenbelag-rechner/"
    plannerLabel="Materialmenge berechnen"
    takeaway="Untergrund und Herstelleranforderungen geben die Grundlage. Danach lässt sich einordnen, ob separate Unterlage, Feuchteschutz oder ein integrierter Aufbau zum konkreten Boden passen."
    limitation="Der Rechner zählt Unterlagenrollen mit einer Flächenreserve. Er prüft weder Restfeuchte noch Ebenheit und wählt keine Trittschall-, Dampfbrems- oder Fußbodenheizungslösung aus."
    sections={[
      {title:"Der Untergrund muss verlegereif sein",paragraphs:["Ein Untergrund muss ausreichend fest, sauber, trocken und innerhalb der zulässigen Ebenheit liegen. Kleine weiche Unterlagen korrigieren keine größeren Unebenheiten und können Klickverbindungen zusätzlich belasten.","Messmethode, zulässige Werte und notwendige Vorbereitung hängen von Untergrund, Bodenprodukt und Herstellersystem ab. Alte Beläge dürfen nur bleiben, wenn der Aufbau ausdrücklich dafür freigegeben ist."]},
      {title:"Unterlage und Feuchteschutz trennen",paragraphs:["Trittschallunterlage, Dampfbremse und integrierte Kaschierung erfüllen unterschiedliche Aufgaben. Mehrere Lagen übereinander sind nicht automatisch besser und können unzulässig nachgeben.","Prüfe die vollständige Verlegeanleitung. Bei mineralischen Untergründen oder feuchtebelasteten Situationen können besondere Sperr- und Anschlussdetails nötig sein."]},
      {title:"Fußbodenheizung als Gesamtsystem",paragraphs:["Boden und Unterlage müssen für die vorhandene Heizung freigegeben sein. Gemeinsam bestimmen sie den Wärmedurchlass; zusätzlich gelten Vorgaben zu Oberflächentemperatur und Heizprotokoll.","Die reine Materialmenge bleibt gleich, aber die Eignung kann sich vollständig ändern. Deshalb zeigt der Rechner bei Fußbodenheizung eine Prüfaufgabe statt einer pauschalen Freigabe."]},
    ]}
  />;
}
