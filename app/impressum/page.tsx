import { createPageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL, legalContactComplete } from "@/lib/legal";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Impressum",
  description: "Anbieterkennzeichnung und Kontaktangaben von PassendPlanen.",
  path: "/impressum/",
  robots: legalContactComplete ? undefined : { index: false, follow: true },
});

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
        <p>E-Mail <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></p>
      </section>
      <section>
        <h2>Redaktionell verantwortlich</h2>
        <p>Verantwortlich im Sinne des § 18 Abs. 2 MStV: {LEGAL.owner}, Anschrift wie oben.</p>
      </section>
      <section>
        <h2>Hinweis zum Angebot</h2>
        <p>PassendPlanen stellt redaktionelle Informationen und deterministische Planungshilfen bereit. Ergebnisse ersetzen keine amtliche, technische, medizinische oder sonstige fachliche Prüfung. Einzelheiten zur eigenverantwortlichen Nutzung und zum gesetzlichen Haftungsrahmen stehen in den <Link href="/nutzungshinweise/">Nutzungshinweisen</Link>.</p>
      </section>
    </LegalPage>
  );
}
