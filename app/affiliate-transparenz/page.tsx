import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = createPageMetadata({
  title: "Affiliate-Transparenz",
  description: "So trennt PassendPlanen Bedarf, Bewertung und mögliche Affiliate-Vergütung.",
  path: "/affiliate-transparenz/",
});

export default function AffiliateTransparenzPage() {
  return (
    <LegalPage title="Affiliate-Transparenz" intro="Wie Empfehlungen entstehen, wie Partnerlinks gekennzeichnet werden und was eine mögliche Provision nicht beeinflusst." requiresContact={false}>
      <section>
        <h2>Aktueller Stand</h2>
        <p>Partnerlinks stehen in den Ergebnissen der Planer, in Ratgebern und auf Themenseiten. Jeder Block trägt die Kennzeichnung „Anzeige“. Produkte eines Händlers erscheinen erst, wenn seine Produktdaten geprüft wurden.</p>
      </section>
      <section>
        <h2>Bedarf vor Provision</h2>
        <p>Die Planer leiten Anforderungen aus deinen Eingaben ab. Produkte, die harte Kriterien nicht erfüllen, werden ausgeschlossen. Eine mögliche Vergütung beeinflusst weder diese Filter noch die fachliche Reihenfolge.</p>
      </section>
      <section>
        <h2>So werden Partnerlinks erkennbar</h2>
        <p>Über jeder Produktliste steht „Anzeige“, die Schaltflächen nennen den Händler, zu dem sie führen. Kaufst du nach dem Klick ein, kann PassendPlanen eine Provision erhalten. Dein Preis ändert sich dadurch nicht.</p>
      </section>
      <section>
        <h2>Datenqualität und Grenzen</h2>
        <p>Preise, Verfügbarkeit und technische Daten werden nur angezeigt, wenn Quelle und Aktualität nachvollziehbar sind. Fehlende Pflichtangaben führen zum Ausschluss. Herstellerangaben werden nicht als unabhängiger Produkttest dargestellt.</p>
      </section>
      <section>
        <h2>Mehr zur Methode</h2>
        <p><Link href="/methodik/">Unsere Methodik</Link> beschreibt harte Filter, nachvollziehbare Berechnungen und die Grenzen der Planer.</p>
      </section>
    </LegalPage>
  );
}
