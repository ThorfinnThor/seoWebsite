import { createPageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL, legalContactComplete } from "@/lib/legal";

export const metadata = createPageMetadata({
  title: "Datenschutz",
  description: "Informationen zur Verarbeitung personenbezogener Daten bei PassendPlanen.",
  path: "/datenschutz/",
  robots: legalContactComplete ? undefined : { index: false, follow: true },
});

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung" intro="Diese Erklärung beschreibt den aktuellen, datensparsamen Stand der statischen Website. Stand: 15. August 2026.">
      <section>
        <h2>1. Verantwortlicher</h2>
        <address>{LEGAL.owner}<br />{LEGAL.street}<br />{LEGAL.postalCode} {LEGAL.city}<br />{LEGAL.country}</address>
        <p>E-Mail: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></p>
      </section>
      <section>
        <h2>2. Bereitstellung und Hosting</h2>
        <p>Die Website wird als statische Website über Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, ausgeliefert. Beim Abruf können technisch erforderliche Verbindungs- und Protokolldaten verarbeitet werden, insbesondere IP-Adresse, Zeitpunkt, angeforderte Adresse, Referrer, Browser- und Geräteinformationen.</p>
        <p>Die Verarbeitung dient der sicheren, stabilen und effizienten Bereitstellung des Angebots. Rechtsgrundlage ist unser berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO. Eine Verarbeitung in den USA und anderen Drittländern kann nicht ausgeschlossen werden.</p>
        <p>Empfänger der Daten können Vercel und die für Hosting, Auslieferung, Sicherheit und technischen Betrieb eingesetzten Unterauftragnehmer sein. Vercel beschreibt für internationale Übermittlungen geeignete Garantien, insbesondere Standardvertragsklauseln. Maßgeblich sind die für das eingesetzte Vertragsverhältnis geltenden Vercel-Bedingungen.</p>
        <p><a href="https://vercel.com/legal/privacy-notice" rel="noreferrer">Datenschutzhinweise von Vercel</a> · <a href="https://vercel.com/legal/dpa" rel="noreferrer">Vercel Data Processing Addendum</a></p>
      </section>
      <section>
        <h2>3. Kontaktaufnahme per E-Mail</h2>
        <p>Wenn du uns per E-Mail kontaktierst, verarbeiten wir deine E-Mail-Adresse, den Inhalt deiner Nachricht und die dabei übermittelten technischen Metadaten, um dein Anliegen zu bearbeiten und zu beantworten.</p>
        <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um vorvertragliche oder vertragliche Kommunikation geht, andernfalls unser berechtigtes Interesse an der Beantwortung von Anfragen nach Art. 6 Abs. 1 lit. f DSGVO. Die Angaben werden gelöscht, wenn das Anliegen abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten oder berechtigten Gründe für eine weitere Speicherung bestehen.</p>
      </section>
      <section>
        <h2>4. Planer und lokale Eingaben</h2>
        <p>Die Eingaben in den Planern werden im Browser ausgewertet. Damit sie bei einem versehentlichen Neuladen nicht verloren gehen, werden sie für die Seitensitzung im Sitzungsspeicher des aktuellen Browser-Tabs (Session Storage) abgelegt. Sie werden nicht an PassendPlanen übertragen, nicht in einer Datenbank gespeichert und nicht an ein Nutzerkonto gebunden.</p>
        <p>Über „Zurücksetzen“ lassen sich die gespeicherten Planerwerte auf die Standardangaben zurücksetzen. Produktkataloge werden als statische Dateien von derselben Website geladen.</p>
      </section>
      <section>
        <h2>5. Cookies, Analyse und Kontaktformulare</h2>
        <p>PassendPlanen setzt derzeit keine eigenen Analyse-, Marketing- oder Personalisierungsdienste ein, legt keine eigenen Cookies an und bietet kein Kontaktformular oder Nutzerkonto an. Falls sich das ändert, wird diese Erklärung vor Aktivierung angepasst.</p>
      </section>
      <section>
        <h2>6. Externe und künftige Partnerlinks</h2>
        <p>Normale externe Links führen zu Angeboten Dritter. Erst mit dem Anklicken verlassen Nutzerinnen und Nutzer PassendPlanen; für die anschließende Verarbeitung ist der jeweilige Anbieter verantwortlich.</p>
        <p>Affiliate-Links sind aktuell noch nicht aktiviert. Vor ihrer Aktivierung werden sie klar gekennzeichnet, die konkreten Empfänger und Datenflüsse dokumentiert und diese Datenschutzerklärung ergänzt.</p>
      </section>
      <section>
        <h2>7. Speicherdauer</h2>
        <p>PassendPlanen speichert keine personenbezogenen Planerprofile. Technische Protokolldaten werden durch den Hostinganbieter nach den für den eingesetzten Dienst geltenden Einstellungen und Bedingungen verarbeitet und gelöscht oder anonymisiert, sobald sie für die jeweiligen Zwecke nicht mehr erforderlich sind. Für E-Mail-Anfragen gelten die im Abschnitt zur Kontaktaufnahme genannten Kriterien.</p>
      </section>
      <section>
        <h2>8. Deine Rechte</h2>
        <p>Du hast – soweit die gesetzlichen Voraussetzungen erfüllt sind – Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem kannst du dich bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere bei der für deinen Wohnort oder den Verantwortlichen zuständigen Behörde.</p>
      </section>
      <section>
        <h2>9. Änderungen</h2>
        <p>Diese Erklärung wird angepasst, sobald neue Dienste, Affiliate-Technik, Analysewerkzeuge oder Kontaktmöglichkeiten hinzukommen. Der oben genannte Stand kennzeichnet die zuletzt inhaltlich geprüfte Version.</p>
      </section>
    </LegalPage>
  );
}
