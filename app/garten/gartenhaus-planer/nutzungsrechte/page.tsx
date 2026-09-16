import type { Metadata } from "next";
import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Nutzungsrechte für den Gartenhaus-Planer",
    description: "Öffentliche Nutzungs- und Attributionserklärung für den Gartenhaus-Planer.",
    path: "/garten/gartenhaus-planer/nutzungsrechte/",
  }),
  robots: { index: false, follow: true },
};

export default function GardenHousePlannerRightsPage() {
  return (
    <section className="section legal-copy planner-rights-page">
      <p className="eyebrow">Öffentliche Nutzungserklärung</p>
      <h1>Nutzungsrechte für den Gartenhaus-Planer</h1>
      <p>
        Diese Erklärung gilt für den interaktiven Gartenhaus-Planer auf der
        <Link href="/garten/gartenhaus-planer/">Canonical-Seite</Link> und für die dazugehörige
        <a href="/embed/gartenhaus-planer/">Embed-Version</a>.
      </p>

      <section>
        <h2>Einbettung und kommerzielle Nutzung</h2>
        <p>
          PassendPlanen erlaubt die öffentliche Einbettung der Embed-Version in redaktionellen und
          kommerziellen Webseiten, Newslettern und Publikationen. Die Einbettung muss die
          unveränderte Funktion des Planers laden und darf nicht den Eindruck einer Partnerschaft,
          Empfehlung oder amtlichen Prüfung erwecken.
        </p>
      </section>

      <section>
        <h2>Vorschau und Darstellung</h2>
        <p>
          PassendPlanen erlaubt dem Publisher Asset Marketplace, die direkte Preview-PNG des
          Gartenhaus-Planers auf einer Asset-Seite als Vorschau anzuzeigen. Der Marketplace darf
          die Größe des iframe an sein Layout anpassen; die Berechnungslogik und die Hinweise des
          Planers bleiben unverändert.
        </p>
      </section>

      <section>
        <h2>Änderungen und Ausschlüsse</h2>
        <p>
          Publisher dürfen den iframe in Breite und Höhe an ihr Layout anpassen und ihn mit
          zugänglichem Umfeldtext versehen. Das Verändern, Extrahieren oder Weiterverkaufen der
          Berechnungslogik, der Produktdaten oder der Ergebnisse als eigenständiger Datensatz ist
          nicht erlaubt. Diese Erklärung gewährt kein Recht zur Weitergabe roher Daten und keine
          Markenlizenz über die nötige Quellenangabe hinaus.
        </p>
      </section>

      <section>
        <h2>Attribution</h2>
        <p>
          Jede Einbettung und jede Preview-Anzeige muss sichtbar auf
          <a href="https://www.passendplanen.de/" rel="noreferrer" target="_blank">
            PassendPlanen
          </a>{" "}
          verweisen. Empfohlener Text: <strong>Gartenhaus-Planer — PassendPlanen</strong>. Der
          Quelllink darf nicht als versteckter SEO-Link, als dofollow-Versprechen oder als
          Affiliate-Zusage dargestellt werden.
        </p>
      </section>

      <section>
        <h2>Gültigkeit</h2>
        <p>
          Diese Erklärung ist öffentlich und gilt bis zu ihrem Widerruf oder bis zu einer
          veröffentlichten Aktualisierung. Bei Fragen zur Nutzung: <a href="/impressum/">Impressum</a>.
        </p>
      </section>
    </section>
  );
}
