import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL, legalContactComplete } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Informationen zur Verarbeitung personenbezogener Daten bei MachPlan.",
  robots: legalContactComplete ? undefined : { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung" intro="Diese Erklärung beschreibt den aktuellen, datensparsamen Stand der statischen Website. Stand: 9. August 2026.">
      <section>
        <h2>1. Verantwortlicher</h2>
        <address>{LEGAL.owner}<br />{LEGAL.street}<br />{LEGAL.postalCode} {LEGAL.city}<br />{LEGAL.country}</address>
        {LEGAL.email ? <p>E-Mail: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></p> : <p><strong>E-Mail:</strong> wird vor Veröffentlichung ergänzt.</p>}
      </section>
      <section>
        <h2>2. Bereitstellung und Hosting</h2>
        <p>Die Website wird als statische Website über Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, ausgeliefert. Beim Abruf können technisch erforderliche Verbindungs- und Protokolldaten verarbeitet werden, insbesondere IP-Adresse, Zeitpunkt, angeforderte Adresse, Referrer, Browser- und Geräteinformationen.</p>
        <p>Die Verarbeitung dient der sicheren, stabilen und effizienten Bereitstellung des Angebots. Rechtsgrundlage ist unser berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO. Eine Verarbeitung in den USA kann nicht ausgeschlossen werden. Die konkret eingesetzten Garantien und Unterauftragnehmer sind vor dem Produktivbetrieb anhand des gewählten Vercel-Tarifs und der Projektkonfiguration zu prüfen.</p>
        <p><a href="https://vercel.com/legal/privacy-notice" rel="noreferrer">Datenschutzhinweise von Vercel</a></p>
      </section>
      <section>
        <h2>3. Planer und lokale Eingaben</h2>
        <p>Die Eingaben in den Planern werden im Browser ausgewertet. Damit sie bei einem versehentlichen Neuladen nicht verloren gehen, werden sie für die Seitensitzung im Sitzungsspeicher des aktuellen Browser-Tabs (Session Storage) abgelegt. Sie werden nicht an MachPlan übertragen, nicht in einer Datenbank gespeichert und nicht an ein Nutzerkonto gebunden.</p>
        <p>Über „Zurücksetzen“ lassen sich die gespeicherten Planerwerte auf die Standardangaben zurücksetzen. Produktkataloge werden als statische Dateien von derselben Website geladen.</p>
      </section>
      <section>
        <h2>4. Cookies, Analyse und Kontaktformulare</h2>
        <p>MachPlan setzt derzeit keine eigenen Analyse-, Marketing- oder Personalisierungsdienste ein, legt keine eigenen Cookies an und bietet kein Kontaktformular oder Nutzerkonto an. Falls sich das ändert, wird diese Erklärung vor Aktivierung angepasst.</p>
      </section>
      <section>
        <h2>5. Externe und künftige Partnerlinks</h2>
        <p>Normale externe Links führen zu Angeboten Dritter. Erst mit dem Anklicken verlassen Nutzerinnen und Nutzer MachPlan; für die anschließende Verarbeitung ist der jeweilige Anbieter verantwortlich.</p>
        <p>Affiliate-Links sind aktuell noch nicht aktiviert. Vor ihrer Aktivierung werden sie klar gekennzeichnet, die konkreten Empfänger und Datenflüsse dokumentiert und diese Datenschutzerklärung ergänzt.</p>
      </section>
      <section>
        <h2>6. Speicherdauer</h2>
        <p>MachPlan speichert derzeit keine personenbezogenen Planerprofile. Technische Protokolldaten werden durch den Hostinganbieter nur so lange verarbeitet, wie dies für Betrieb und Sicherheit erforderlich ist; die konkrete Dauer richtet sich nach Tarif und Konfiguration und wird vor dem Produktivbetrieb verifiziert.</p>
      </section>
      <section>
        <h2>7. Deine Rechte</h2>
        <p>Du hast – soweit die gesetzlichen Voraussetzungen erfüllt sind – Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem kannst du dich bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere bei der für deinen Wohnort oder den Verantwortlichen zuständigen Behörde.</p>
      </section>
      <section>
        <h2>8. Änderungen</h2>
        <p>Diese Erklärung wird angepasst, sobald neue Dienste, Affiliate-Technik, Analysewerkzeuge oder Kontaktmöglichkeiten hinzukommen. Der oben genannte Stand kennzeichnet die zuletzt inhaltlich geprüfte Version.</p>
      </section>
    </LegalPage>
  );
}
