import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL, legalContactComplete } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung und Kontaktangaben von MachPlan.",
  robots: legalContactComplete ? undefined : { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" intro="Anbieterkennzeichnung für dieses Informations- und Planungsangebot.">
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <address>
          {LEGAL.owner}<br />
          {LEGAL.street}<br />
          {LEGAL.postalCode} {LEGAL.city}<br />
          {LEGAL.country}
        </address>
      </section>
      <section>
        <h2>Kontakt</h2>
        {LEGAL.email ? <p>E-Mail: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></p> : <p><strong>E-Mail:</strong> wird vor Veröffentlichung ergänzt.</p>}
      </section>
      <section>
        <h2>Inhaltliche Verantwortung</h2>
        <p>Verantwortlich für die Inhalte: {LEGAL.owner}, Anschrift wie oben.</p>
      </section>
      <section>
        <h2>Hinweis zum Angebot</h2>
        <p>MachPlan stellt redaktionelle Informationen und deterministische Planungshilfen bereit. Ergebnisse ersetzen keine amtliche, technische, medizinische oder sonstige fachliche Prüfung.</p>
      </section>
    </LegalPage>
  );
}
