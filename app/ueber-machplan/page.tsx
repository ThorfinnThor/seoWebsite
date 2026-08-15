import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Über PassendPlanen",
  description: "Die Projektseite von PassendPlanen ist unter einer neuen Adresse erreichbar.",
  alternates: { canonical: "/ueber-passendplanen/" },
  robots: { index: false, follow: true },
};

export default function UeberPage() {
  return (
    <article className="about-page">
      <header><p className="eyebrow">Neue Adresse</p><h1>Die Projektseite ist <em>umgezogen</em>.</h1><p>Alle Informationen zu Autor, Anspruch und Arbeitsweise stehen jetzt auf der neuen Markenseite.</p></header>
      <Link className="button button--primary" href="/ueber-passendplanen/">Über PassendPlanen →</Link>
    </article>
  );
}
