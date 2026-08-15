import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Tropfbewässerung für Hecken planen",
  description: "Tropfrohr für Hecken planen: Leitungslänge, Reserve, Druckminderung, Filterung, Zonen und Herstellergrenzen richtig einordnen.",
  path: "/garten/tropfbewaesserung-hecke/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/garten/tropfbewaesserung-hecke/"
    title="Tropfbewässerung für Hecken: Länge ist nur der Anfang"
    intro="Eine Hecke lässt sich häufig gleichmäßiger über eine Tropfleitung versorgen als mit punktuellem Gießen. Entscheidend sind Leitungsführung, Systemgrenzen und eine zur Pflanzung passende Betriebsweise."
    updated="August 2026"
    breadcrumbs={[{label:"Start",href:"/"},{label:"Garten",href:"/garten/"},{label:"Tropfbewässerung für Hecken"}]}
    plannerHref="/garten/bewaesserungs-planer/"
    plannerLabel="Komponentenplan erstellen"
    takeaway="Plane die reale Heckenlänge plus Anschluss- und Verlegereserve. Filter, Druckminderung und alle Verbinder müssen zum gewählten System passen."
    limitation="PassendPlanen berechnet keine pflanzenspezifische Wassermenge. Boden, Wetter, Alter der Pflanzen, Tropferabstand und Herstellerangaben bestimmen Laufzeit und Auslegung."
    sections={[
      {title:"Leitungsweg statt Luftlinie",paragraphs:["Miss den tatsächlichen Weg vom Anschluss bis zum Ende der Hecke. Kurven, Versätze und die Verbindung zur Versorgungsleitung erhöhen die benötigte Länge.","Der Planer ergänzt eine kleine Verlegereserve, behandelt sie aber nur als Materialheuristik. Die maximal zulässige Stranglänge kommt aus dem konkreten Tropfsystem."]},
      {title:"Druck und Schmutz kontrollieren",paragraphs:["Tropfsysteme arbeiten häufig in einem definierten Druckbereich. Ein passender Druckminderer schützt nicht automatisch vor allen Problemen, muss aber mit Eingangsdruck und System freigegeben sein.","Ein geeigneter Filter kann Tropfstellen vor Partikeln schützen. Filterfeinheit, Wartung und Wasserquelle müssen zusammenpassen."]},
      {title:"Eigene Zone für eigene Bedürfnisse",paragraphs:["Hecken, Beete und Rasen haben unterschiedliche Ausbringungsarten und Laufzeiten. Sie sollten deshalb nicht automatisch in derselben Steuerungszone liegen.","Bei automatischer Steuerung plant PassendPlanen mindestens eine Zone pro aktiver Nutzungskategorie. Die genaue Aufteilung bleibt von Durchfluss und System abhängig."]},
    ]}
  />;
}
