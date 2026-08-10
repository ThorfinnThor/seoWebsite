import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Sockelleisten richtig berechnen",
  description: "Sockelleisten aus Raumumfang, Türöffnungen, Lieferlänge, Innenkanten, Gehrungen und Zuschnittreserve berechnen.",
  path: "/haus/boden/sockelleisten-berechnen/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/haus/boden/sockelleisten-berechnen/"
    title="Sockelleisten berechnen: Umfang minus Türen reicht fast"
    intro="Für eine einfache Raumform beginnt der Bedarf beim Wandumfang. Türöffnungen werden abgezogen, Zuschnitte und Stöße brauchen anschließend eine Längenreserve."
    updated="August 2026"
    breadcrumbs={[{label:"Start",href:"/"},{label:"Haus",href:"/haus/"},{label:"Boden",href:"/haus/boden/"},{label:"Sockelleisten berechnen"}]}
    plannerHref="/haus/boden/bodenbelag-rechner/"
    plannerLabel="Leistenbedarf berechnen"
    takeaway="Addiere die Wandlängen, ziehe Türöffnungen ohne Leiste ab, ergänze Reserve und runde auf volle Lieferstäbe auf. Zähle Ecken, Enden und Verbinder separat."
    limitation="Der Rechner behandelt jede eingegebene Teilfläche als eigenen Umfang. Bei zusammengesetzten Bereichen müssen gemeinsame Innenkanten im Aufmaß entfernt werden."
    sections={[
      {title:"Vom Rechteck zum Raumumfang",paragraphs:["Ein rechteckiger Raum hat den Umfang zweimal Länge plus zweimal Breite. Von dieser Länge werden Türöffnungen oder andere Abschnitte ohne Sockelleiste abgezogen.","Bei L-Formen und offenen Übergängen ist eine Handskizze verlässlicher. Werden Teilrechtecke einfach addiert, können gemeinsame Kanten fälschlich doppelt gezählt werden."]},
      {title:"Lieferstäbe aufrunden",paragraphs:["Sockelleisten werden in festen Stablängen verkauft. Die benötigte Länge inklusive Reserve wird deshalb durch die Lieferlänge geteilt und auf den nächsten ganzen Stab aufgerundet.","Kurze Reststücke sind nicht überall optisch oder technisch sinnvoll. Lange sichtbare Wände sollten möglichst mit wenigen Stößen geplant werden."]},
      {title:"Formteile gehören in eine zweite Liste",paragraphs:["Innen- und Außenecken, Endkappen, Verbinder und Kabelkanal-Zubehör werden nicht über laufende Meter abgedeckt. Manche Profile werden auf Gehrung geschnitten, andere verwenden Systemformteile.","Zähle diese Positionen auf der Raumskizze und prüfe Dekor, Profilhöhe, Befestigung und Wandbeschaffenheit vor der Bestellung."]},
    ]}
  />;
}
