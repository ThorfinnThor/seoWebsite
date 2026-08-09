import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Seite nicht gefunden", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">Fehler 404</p>
      <h1>Diese Seite ist nicht im Plan.</h1>
      <p>Die Adresse ist veraltet oder falsch geschrieben. Auf der Startseite findest du alle verfügbaren Planer und Ratgeber.</p>
      <Link className="button button--primary" href="/">Zur Startseite →</Link>
    </section>
  );
}
