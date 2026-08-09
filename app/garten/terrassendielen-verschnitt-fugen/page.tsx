import type { Metadata } from "next";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata: Metadata = { title: "Terrassendielen: Verschnitt und Fugen planen", description: "Verschnitt, Fugenbreite, Verlegerichtung, Dielenlänge und Stoßbild für Terrassendielen nachvollziehbar planen." };

export default function Page() {
  return <GuidePage
    title="Terrassendielen planen: Fuge und Zuschnitt entscheiden mit"
    intro="Der Materialbedarf entsteht nicht nur aus Quadratmetern. Sichtbreite, Fuge, Verlegerichtung, Lieferlänge und ein brauchbarer Stoßplan bestimmen die benötigten Dielen."
    updated="August 2026"
    breadcrumbs={[{label:"Start",href:"/"},{label:"Garten",href:"/garten/"},{label:"Terrassendielen planen"}]}
    plannerHref="/garten/terrassen-dielen-rechner/"
    plannerLabel="Dielenbedarf berechnen"
    takeaway="Rechne mit der wirksamen Sichtbreite plus Herstellerfuge. Zeichne jede Dielenreihe und die geplanten Stöße, bevor du aus Laufmetern eine Bestellmenge machst."
    limitation="Die richtige Fuge hängt von Material, Feuchte, Temperatur, Profil und Herstellersystem ab. Ein pauschaler Millimeterwert ersetzt keine Verlegeanleitung."
    sections={[
      {title:"Sichtbreite plus Fuge ergibt das Raster",paragraphs:["Die Nennbreite einer Diele ist nicht immer identisch mit der nach Montage sichtbaren Breite. Clips oder Profilkanten können das wirksame Raster verändern.","Für die Zahl der Dielenreihen zählt das Modul aus Sichtbreite und vorgesehener Fuge. Am Rand bleibt häufig eine Anpassung, die symmetrisch oder durch eine zugeschnittene Randdiele gelöst werden muss."]},
      {title:"Verschnitt ist kein fester Naturwert",paragraphs:["Eine einfache rechteckige Fläche mit wiederverwendbaren Abschnitten kann mit kleiner Reserve auskommen. Diagonale Verlegung, viele Ausschnitte, Treppen oder ein komplexes Stoßbild erhöhen den Bedarf.","Der Rechner bietet 5, 10 und 15 Prozent als bewusst grobe Planungsstufen. Vor der Bestellung ist ein Reihen- und Zuschnittplan genauer."]},
      {title:"Stöße konstruktiv planen",paragraphs:["Ist die Lieferdiele kürzer als die Lauflänge, entstehen Stöße. Diese brauchen eine geeignete Auflagerung und müssen nach Systemvorgabe befestigt werden.","Ein gleichmäßiges oder bewusst versetztes Stoßbild beeinflusst Optik, Unterkonstruktion und Verschnitt. Offcuts dürfen nur eingerechnet werden, wenn Länge und Stoßposition tatsächlich passen."]},
    ]}
  />;
}
