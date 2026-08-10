import type { Metadata } from "next";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata: Metadata = { title: "Sichtschutz-Elemente richtig berechnen", description: "Sichtschutzfelder mit Montage-Raster, Pfostenachsen, Tor-Modulen und angepasstem Randfeld nachvollziehbar berechnen." };

export default function Page() {
  return <GuidePage
    title="Sichtschutz-Elemente berechnen: Das Systemmaß zählt"
    intro="Eine Streckenlänge geteilt durch die sichtbare Elementbreite ergibt selten schon eine belastbare Bestellung. Pfosten, Halter und Montagespiel stecken im Systemraster."
    updated="August 2026"
    breadcrumbs={[{label:"Start",href:"/"},{label:"Garten",href:"/garten/"},{label:"Sichtschutz-Elemente berechnen"}]}
    plannerHref="/garten/sichtschutz-planer/"
    plannerLabel="Sichtschutz-Raster planen"
    takeaway="Übernimm das Achs- oder Montagemaß aus der Anleitung des konkreten Systems. Rechne Tore als eigene Module und löse die Restbreite bewusst am Rand."
    limitation="Der Mengenplan setzt eine einzelne gerade Strecke voraus. Ecken, Versprünge, Gefälle und systemspezifische Sonderpfosten müssen im konkreten Aufmaß ergänzt werden."
    sections={[
      {title:"Elementbreite und Einbaumaß sind nicht dasselbe",paragraphs:["Ein Sichtschutzelement kann beispielsweise 180 Zentimeter breit sein, während Pfosten, Halter und notwendiges Spiel ein anderes Achsmaß erzeugen. Entscheidend ist die Maßangabe, mit der der Hersteller die Pfostenpositionen vorgibt.","Fehlt dieses Maß im Shop, prüfe Montageanleitung oder technische Zeichnung. Eine angenommene Pfostenbreite kann sich über mehrere Felder zu einem deutlichen Fehler summieren."]},
      {title:"Auf ganze Module aufrunden",paragraphs:["Für den Bestellrahmen wird die verbleibende Strecke nach Abzug der Tor-Module durch das Feldraster geteilt und auf ganze Felder aufgerundet. Dadurch kann das Standardraster länger als die Zielstrecke werden.","Die Differenz ist kein Abfallwert, sondern eine Planungsaufgabe: ein kürzbares Randfeld, ein freigegebenes Sondermaß oder eine veränderte Pfostenposition. Nicht jedes Material und jedes Dekor darf beliebig gekürzt werden."]},
      {title:"Pfosten aus zusammenhängenden Feldern ableiten",paragraphs:["Eine gerade Folge aus sechs Modulen benötigt rechnerisch sieben Begrenzungspunkte: Anfang, fünf Übergänge und Ende. Tore zählen dabei als eigene Module.","In der Stückliste müssen normale Zwischenpfosten, Endpfosten und möglicherweise verstärkte Torpfosten anschließend getrennt werden. Eckpfosten entstehen erst, wenn eine zweite Strecke anschließt."]},
    ]}
  />;
}
