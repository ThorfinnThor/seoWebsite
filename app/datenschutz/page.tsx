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
    <LegalPage title="Datenschutzerklärung" intro="Diese Erklärung beschreibt den aktuellen, datensparsamen Stand der statischen Website. Stand: 22. Oktober 2026.">
      <section>
        <h2>1. Verantwortlicher</h2>
        <address>{LEGAL.owner}<br />{LEGAL.street}<br />{LEGAL.postalCode} {LEGAL.city}<br />{LEGAL.country}</address>
        <p>E-Mail <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></p>
      </section>
      <section>
        <h2>2. Bereitstellung und Hosting</h2>
        <p>Die Website wird als statische Website über Cloudflare Pages und das weltweite Netzwerk der Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA, ausgeliefert. Beim Abruf können technisch erforderliche Verbindungs- und Protokolldaten verarbeitet werden, insbesondere IP-Adresse, Zeitpunkt, angeforderte Adresse, Referrer, Browser- und Geräteinformationen.</p>
        <p>Die Verarbeitung dient der sicheren, stabilen und effizienten Bereitstellung des Angebots. Rechtsgrundlage ist unser berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO. Eine Verarbeitung in den USA und anderen Drittländern kann nicht ausgeschlossen werden.</p>
        <p>Empfänger der Daten können Cloudflare und die für Hosting, Auslieferung, Sicherheit und technischen Betrieb eingesetzten Unterauftragnehmer sein. Cloudflare beschreibt die Verarbeitung und internationale Übermittlungen in seinen Datenschutzinformationen und im Data Processing Addendum.</p>
        <p><a href="https://www.cloudflare.com/privacypolicy/" rel="noreferrer">Datenschutzhinweise von Cloudflare</a> · <a href="https://www.cloudflare.com/cloudflare-customer-dpa/" rel="noreferrer">Cloudflare Data Processing Addendum</a></p>
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
        <h2>5. Reichweitenmessung und Ereignisse</h2>
        <p>PassendPlanen verwendet Cloudflare Web Analytics, um Seitenaufrufe und die technische Leistung der Website in zusammengefasster Form auszuwerten. Nach Angaben von Cloudflare werden dabei keine Cookies gesetzt und keine personenbezogenen Daten von Besucherinnen und Besuchern erhoben oder verwendet.</p>
        <p>Zusätzlich werden über Cloudflare Zaraz wenige, fest definierte Interaktionen erfasst. Dazu gehören der Start, Abschluss und das Zurücksetzen eines Planers, die Anzahl angezeigter Produkttreffer und Klicks auf gekennzeichnete Partnerlinks. Übermittelt werden nur technische Kategorien und Zählwerte wie Planertyp, Schrittzahl, Händler, gekürzte Produktreferenz und Anzahl der Treffer. Konkrete Maße, Antworten oder sonstige Eingaben aus den Planern werden nicht übertragen.</p>
        <p>Die Auswertung hilft uns, Fehler, unverständliche Abläufe und nicht hilfreiche Produktergebnisse zu erkennen. Rechtsgrundlage ist unser berechtigtes Interesse an der bedarfsgerechten und technisch zuverlässigen Gestaltung nach Art. 6 Abs. 1 lit. f DSGVO. Für diese Auswertung setzt PassendPlanen keine Analyse- oder Marketingcookies ein und erstellt keine nutzerbezogenen Profile. Google Analytics wird nur mit deiner Einwilligung genutzt (Abschnitt 6).</p>
        <p><a href="https://www.cloudflare.com/privacypolicy/" rel="noreferrer">Datenschutzhinweise von Cloudflare</a> · <a href="https://developers.cloudflare.com/web-analytics/about/" rel="noreferrer">Informationen zu Cloudflare Web Analytics</a></p>
      </section>
      <section id="google-analytics">
        <h2>6. Google Analytics 4 (nur mit Einwilligung)</h2>
        <p>Wenn du im Cookie-Banner auf „Akzeptieren“ klickst, nutzen wir Google Analytics 4, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google“). Zweck ist die Reichweitenmessung: Wir wollen verstehen, wie viele Menschen die Website besuchen, welche Seiten und Planer genutzt werden und über welche Wege Besucherinnen und Besucher zu uns finden.</p>
        <p>Verarbeitet werden dabei insbesondere aufgerufene Seiten, Zeitpunkt und Dauer des Besuchs, Referrer, ungefährer Standort (aus der gekürzten IP-Adresse abgeleitet), Geräte-, Browser- und Betriebssysteminformationen sowie eine zufällig erzeugte Kennung. Google Analytics 4 speichert keine vollständigen IP-Adressen. Google-Signale und Funktionen zur Personalisierung von Werbung sind deaktiviert; eine Zusammenführung mit Google-Konten findet durch uns nicht statt.</p>
        <p>Rechtsgrundlage ist deine Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und, für das Speichern und Auslesen von Informationen auf deinem Endgerät, § 25 Abs. 1 TTDSG (heute TDDDG). Ohne Einwilligung wird das Google-Analytics-Skript nicht geladen und es werden keine Daten an Google übertragen. Wir nutzen den Google Consent Mode; alle Einwilligungssignale sind standardmäßig auf „abgelehnt“ gesetzt.</p>
        <p>Google Analytics setzt nach deiner Einwilligung folgende Cookies:</p>
        <ul>
          <li><code>_ga</code> – unterscheidet Besucherinnen und Besucher anhand einer zufälligen Kennung, Laufzeit 2 Jahre.</li>
          <li><code>_ga_Q8FZ5Z7V04</code> – speichert den Sitzungsstatus für diese Website, Laufzeit 2 Jahre.</li>
        </ul>
        <p>Deine Entscheidung im Cookie-Banner speichern wir ohne Ablaufdatum im lokalen Speicher deines Browsers (Local Storage, Eintrag <code>pp-consent-v1</code>), damit das Banner nicht bei jedem Seitenaufruf erneut erscheint. Dieser Eintrag ist technisch erforderlich und enthält nur „erlaubt“ oder „abgelehnt“.</p>
        <p>Die in Google Analytics gespeicherten Ereignisdaten werden nach 14 Monaten automatisch gelöscht.</p>
        <p>Google verarbeitet Daten auch auf Servern der Google LLC in den USA. Google LLC ist unter dem EU-US Data Privacy Framework zertifiziert; für die Übermittlung besteht damit ein Angemessenheitsbeschluss der EU-Kommission nach Art. 45 DSGVO. Ergänzend gelten die Standardvertragsklauseln der Europäischen Kommission. Mit Google besteht ein Auftragsverarbeitungsvertrag.</p>
        <p>Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen: Klicke im Footer auf „Cookie-Einstellungen“ und wähle „Ablehnen“. Danach werden keine Daten mehr an Google Analytics gesendet und die Cookies <code>_ga</code> und <code>_ga_Q8FZ5Z7V04</code> in deinem Browser gelöscht. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.</p>
        <p><a href="https://policies.google.com/privacy" rel="noreferrer">Datenschutzerklärung von Google</a> · <a href="https://support.google.com/analytics/answer/12017362" rel="noreferrer">Datenschutz in Google Analytics</a> · <a href="https://www.dataprivacyframework.gov/" rel="noreferrer">EU-US Data Privacy Framework</a></p>
      </section>
      <section>
        <h2>7. Externe Links und Partnerlinks</h2>
        <p>Normale externe Links führen zu Angeboten Dritter. Erst mit dem Anklicken verlassen Nutzerinnen und Nutzer PassendPlanen; für die anschließende Verarbeitung ist der jeweilige Anbieter verantwortlich.</p>
        <p>Gekennzeichnete Partnerlinks können über ein Affiliate-Netzwerk oder direkt zum jeweiligen Händler führen. Beim Klick werden die Zieladresse sowie Zuordnungsparameter übertragen, damit der Händler oder das Netzwerk einen vermittelten Besuch und gegebenenfalls einen Kauf zuordnen kann. Dabei können der jeweilige Anbieter und das Affiliate-Netzwerk eigene Verbindungsdaten, Cookies oder ähnliche Technologien verarbeiten. Einzelheiten ergeben sich aus den Datenschutzhinweisen des aufgerufenen Anbieters.</p>
      </section>
      <section>
        <h2>8. Speicherdauer</h2>
        <p>PassendPlanen speichert keine personenbezogenen Planerprofile. Technische Protokolldaten werden durch den Hostinganbieter nach den für den eingesetzten Dienst geltenden Einstellungen und Bedingungen verarbeitet und gelöscht oder anonymisiert, sobald sie für die jeweiligen Zwecke nicht mehr erforderlich sind. Daten in Google Analytics werden nach 14 Monaten gelöscht; die Cookies von Google Analytics laufen nach 2 Jahren ab oder werden beim Widerruf entfernt. Für E-Mail-Anfragen gelten die im Abschnitt zur Kontaktaufnahme genannten Kriterien.</p>
      </section>
      <section>
        <h2>9. Deine Rechte</h2>
        <p>Du hast – soweit die gesetzlichen Voraussetzungen erfüllt sind – Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem kannst du dich bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere bei der für deinen Wohnort oder den Verantwortlichen zuständigen Behörde.</p>
      </section>
      <section>
        <h2>10. Änderungen</h2>
        <p>Diese Erklärung wird angepasst, sobald neue Dienste, Affiliate-Technik, Analysewerkzeuge oder Kontaktmöglichkeiten hinzukommen. Der oben genannte Stand kennzeichnet die zuletzt inhaltlich geprüfte Version.</p>
      </section>
    </LegalPage>
  );
}
