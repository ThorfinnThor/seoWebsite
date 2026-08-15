import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata = createPageMetadata({
  title: "Über PassendPlanen",
  description: "Warum PassendPlanen Bedarfsermittlung und Produktauswahl voneinander trennt.",
  path: "/ueber-passendplanen/",
});

export default function UeberPage() {
  return (
    <article className="about-page">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Über PassendPlanen" }]} />
      <header><p className="eyebrow">Ein unabhängiges Aufbauprojekt</p><h1>Gute Entscheidungen beginnen <em>vor</em> dem Produktvergleich.</h1><p>PassendPlanen ist eine Website von Schayan Yousefian. Sie übersetzt Haus- und Gartenprojekte in verständliche Anforderungen – ohne Verkaufsprovision in die fachliche Logik einzubauen.</p></header>
      <section className="about-statement"><p>„Nicht das Produkt mit der besten Vermarktung soll gewinnen, sondern das Produkt, das nach den verfügbaren Daten zum beschriebenen Bedarf passt.“</p></section>
      <section className="method-detail"><div><p className="eyebrow">Im Aufbau</p><h2>Was heute bereits funktioniert.</h2></div><div><p>Zehn kostenlose, browserbasierte Planer; redaktionelle Ratgeber; deterministische Regeln; validierte statische Datenformate und ein sicherer Leerzustand ohne ungeprüfte Angebote.</p><p>Die Website ist unter passendplanen.de erreichbar. Als Nächstes folgen geprüfte Produktdaten und klar gekennzeichnete Partnerlinks.</p><Link className="text-link" href="/methodik/">Methodik im Detail →</Link></div></section>
    </article>
  );
}
