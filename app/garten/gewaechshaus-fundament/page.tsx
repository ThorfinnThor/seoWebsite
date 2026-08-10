import { createPageMetadata } from "@/lib/metadata";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata = createPageMetadata({
  title: "Gewächshaus-Fundament und Basis richtig einordnen",
  description: "Basisprofil, Fundament, Ebenheit, Entwässerung und Verankerung beim Gewächshaus als getrennte Planungsaufgaben verstehen.",
  path: "/garten/gewaechshaus-fundament/",
  kind: "article",
});

export default function Page() {
  return <GuidePage path="/garten/gewaechshaus-fundament/"
    title="Gewächshaus-Fundament: Profilumfang ist noch keine Gründung"
    intro="Die Basis verbindet das Gewächshaus mit dem Standort. Sie muss eben, tragfähig, entwässert und passend zum freigegebenen Verankerungssystem ausgeführt werden."
    updated="August 2026"
    breadcrumbs={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Gewächshaus-Fundament" }]}
    plannerHref="/garten/gewaechshaus-planer/"
    plannerLabel="Basisumfang berechnen"
    takeaway="Nutze den berechneten Außenumfang nur als Mengenrahmen für kompatible Basisprofile. Fundamentart, Abmessung und Verankerung folgen Herstellerangaben, Boden und Standortlasten."
    limitation="MachPlan bemisst weder Fundament noch Anker und prüft keine Wind-, Schnee- oder Traglast. Bei unklarem Boden, exponiertem Standort oder größeren Konstruktionen fachlich planen lassen."
    sections={[
      { title: "Vier Aufgaben der Basis", paragraphs: ["Die Unterkante des Gewächshauses braucht eine waagerechte Geometrie, ausreichend tragfähigen Untergrund, Schutz vor dauerhaftem Wasser und eine sichere Verbindung gegen Verschieben oder Abheben.", "Ein passendes Basisprofil kann Montage und Ausrichtung erleichtern. Es ersetzt jedoch nicht automatisch die vom System geforderte Gründung."], bullets: ["Rechtwinkligkeit über beide Diagonalen kontrollieren", "Wasser vom Sockel wegführen", "Anker nur in freigegebenem Untergrund einsetzen"] },
      { title: "Fundamentart folgt dem System", paragraphs: ["Punkt-, Streifen- oder umlaufende Lösungen sowie Bodenanker können je nach Konstruktion und Untergrund infrage kommen. Welche Variante zulässig ist, steht in der Montage- und Fundamentanleitung des konkreten Modells.", "Lose Steine oder vorhandene Terrassenplatten sind nicht allein deshalb geeignet, weil sie eben aussehen. Tragfähigkeit, Frost, Setzung, Randabstände und Verankerung bleiben zu prüfen."] },
      { title: "Innenboden und Entwässerung mitdenken", paragraphs: ["Beetboden, Plattenweg und frei entwässernde Flächen stellen unterschiedliche Anforderungen an Höhen. Plane Schwellenanschluss, Stolperkanten und Wasserführung vor der Montage.", "Eine Regenrinne braucht einen kontrollierten Ablauf oder Speicher mit Überlauf. Der theoretische Sammelwert des Planers berücksichtigt noch keine realen Verluste und keinen Starkregen-Nachweis."] },
    ]}
  />;
}
