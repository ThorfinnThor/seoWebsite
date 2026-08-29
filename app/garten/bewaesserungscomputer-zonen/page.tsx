import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Bewässerungscomputer und Zonen planen",
  description: "Bewässerungssteuerung nach Zonen planen: Rasen, Beet und Hecke trennen, Ventile, Sensoren und Systemkompatibilität berücksichtigen.",
  path: "/garten/bewaesserungscomputer-zonen/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/garten/bewaesserungscomputer-zonen/"
    title="Bewässerungscomputer: Zonen passend planen"
    intro="Eine Steuerung ist nur dann passend dimensioniert, wenn klar ist, welche Bereiche unabhängig laufen sollen. Rasen, Beet und Hecke benötigen meist unterschiedliche Laufzeiten und Ausbringungsarten."
    updated="August 2026"
    breadcrumbs={[{label:"Start",href:"/"},{label:"Garten",href:"/garten/"},{label:"Bewässerungscomputer und Zonen"}]}
    plannerHref="/garten/bewaesserungs-planer/"
    plannerLabel="Zonen abschätzen"
    takeaway="Plane mindestens getrennte Zonen für deutlich unterschiedliche Verbraucher. Prüfe anschließend Ventilart, Zahl der Ausgänge, Sensoranschluss und Erweiterbarkeit im selben System."
    limitation="Die Zonenzahl aus dem Planer ist eine Untergrenze nach Nutzungskategorien. Anschlussleistung, Leitungsnetz und reale Regnergruppen können zusätzliche Zonen erfordern."
    sections={[
      {title:"Was eine Zone bedeutet",paragraphs:["Eine Zone fasst Verbraucher zusammen, die gleichzeitig mit ähnlicher Laufzeit betrieben werden können. Unterschiedliche Pflanzen oder Ausbringungsarten sind ein starkes Signal für getrennte Zonen.","Auch eine große Rasenfläche kann mehrere Zonen benötigen, wenn die Anschlussleistung nicht für alle Regner gleichzeitig reicht."]},
      {title:"Steuerung, Ventile und Stromversorgung",paragraphs:["Bewässerungscomputer am Wasserhahn und fest installierte Mehrkanalsteuerungen sind unterschiedliche Systemansätze. Ventile, Spannung, Anschlüsse und Gehäuseschutz müssen zusammenpassen.","Elektrische Installation, Außenbetrieb und Frostschutz sind nach Herstellerangaben und gegebenenfalls fachgerecht auszuführen."]},
      {title:"Smart und Sensor nur bei echter Kompatibilität",paragraphs:["App-Steuerung, Wetterdaten oder Bodenfeuchtesensoren sind nur hilfreich, wenn sie mit Controller und Ventilkonzept kompatibel sind. Ein gemeinsames Markenlogo allein bestätigt nicht jede Kombination.","PassendPlanen wird Produktsets später nur über bestätigte System-IDs kombinieren. Bis dahin bleibt die Ausgabe auf Komponentenkategorien beschränkt."]},
    ]}
  />;
}
