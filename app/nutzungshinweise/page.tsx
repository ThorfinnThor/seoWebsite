import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Nutzungshinweise und Haftung",
  description: "Hinweise zur eigenverantwortlichen Nutzung der Rechner, Ratgeber, Vergleiche und Produktinformationen von PassendPlanen.",
  path: "/nutzungshinweise/",
});

export default function NutzungshinweisePage() {
  return (
    <LegalPage
      title="Nutzungshinweise und Haftung"
      intro="Wofür du die Rechner, Ratgeber, Vergleiche und Produktinformationen nutzen kannst und was du vor einer Entscheidung selbst prüfen musst."
    >
      <section>
        <h2>Allgemeine Information und Vorplanung</h2>
        <p>PassendPlanen bietet allgemeine Informationen und unverbindliche Planungshilfen. Die Inhalte richten sich an einen unbestimmten Nutzerkreis und berücksichtigen nicht sämtliche Umstände eines konkreten Projekts. Sie sind keine individuelle Beratung, Fachplanung, Begutachtung, Genehmigung oder Ausführungsfreigabe.</p>
      </section>
      <section>
        <h2>Grundlage der Ergebnisse</h2>
        <p>Rechnerergebnisse entstehen aus deinen Eingaben, vereinfachten Rechenmodellen und den zum Prüfzeitpunkt verfügbaren Quellen, Herstellerangaben oder Händlerdaten. Unvollständige oder unzutreffende Eingaben können zu unpassenden Ergebnissen führen. Technische Daten, Preise, Verfügbarkeit sowie rechtliche und örtliche Anforderungen können sich nach der letzten Prüfung ändern.</p>
      </section>
      <section>
        <h2>Was du selbst prüfen musst</h2>
        <p>Prüfe vor einem Kauf, einer Bestellung, einer Montage oder einer anderen Entscheidung insbesondere Maße, Mengen, Eignung, Lieferumfang, aktuelle Produktdaten, Sicherheitsanweisungen, Montagehinweise und die am Standort geltenden Anforderungen. Bei baulichen, statischen, elektrischen, gesundheitlichen oder sonstigen sicherheitsrelevanten Fragen ist eine dafür qualifizierte Fachperson oder zuständige Stelle einzubeziehen.</p>
        <p>Eine Entscheidung sollte nie allein auf einem Rechnerergebnis, einer Produktauswahl oder einem Ratgeber von PassendPlanen beruhen.</p>
      </section>
      <section>
        <h2>Keine Garantie für den Einzelfall</h2>
        <p>Wir bemühen uns um sorgfältige, nachvollziehbare und aktuelle Inhalte. Eine Garantie für Richtigkeit, Vollständigkeit, Aktualität oder Eignung eines Ergebnisses für dein konkretes Projekt geben wir nicht. Herstellerunterlagen, vertragliche Produktangaben und verbindliche Auskünfte zuständiger Stellen haben Vorrang.</p>
      </section>
      <section>
        <h2>Haftungsrahmen</h2>
        <p>Für Schäden aus der Nutzung oder Nichtnutzung des Angebots sowie aus Entscheidungen, die allein auf Grundlage eines Rechnerergebnisses oder Inhalts getroffen werden, haften wir nach den gesetzlichen Vorschriften. Soweit eine Beschränkung gesetzlich zulässig ist, gilt die folgende Regelung.</p>
        <p>Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei schuldhafter Verletzung von Leben, Körper oder Gesundheit, aufgrund einer ausdrücklich übernommenen Garantie und nach dem Produkthaftungsgesetz. Bei leicht fahrlässiger Verletzung einer wesentlichen Pflicht, deren Erfüllung die ordnungsgemäße Nutzung des Angebots überhaupt ermöglicht und auf deren Einhaltung Nutzer regelmäßig vertrauen dürfen, ist eine etwaige Haftung auf den vorhersehbaren und typischen Schaden begrenzt. Im Übrigen ist die Haftung für leicht fahrlässig verursachte Schäden ausgeschlossen, soweit dies gesetzlich zulässig ist.</p>
      </section>
      <section>
        <h2>Produkte und externe Angebote</h2>
        <p>Produktinformationen können von Herstellern, Händlern oder Partnernetzwerken stammen. PassendPlanen ist nicht der Verkäufer der verlinkten Produkte. Für Kauf, Lieferung, Preis, Verfügbarkeit, Beschaffenheit und Gewährleistung gelten die Angaben und Bedingungen des jeweiligen Händlers. Mehr zur Auswahl und Vergütung steht in der <Link href="/affiliate-transparenz/">Affiliate Transparenz</Link>.</p>
      </section>
      <section>
        <h2>Aktualisierung und Kontakt</h2>
        <p>Diese Hinweise haben den Stand vom 30. August 2026. Wenn dir ein fachlicher oder redaktioneller Fehler auffällt, findest du den Kontakt im <Link href="/impressum/">Impressum</Link>.</p>
        <p className="legal-status">Diese allgemeinen Hinweise ersetzen keine auf den konkreten Betrieb und Einzelfall bezogene Rechtsberatung.</p>
      </section>
    </LegalPage>
  );
}
