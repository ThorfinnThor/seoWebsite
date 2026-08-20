import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { DECISION_GUIDE_COUNT, DECISION_GUIDE_DIRECTORIES } from "@/lib/decision-guides";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";
import { getSeoTopic } from "@/lib/seo-topics";

export const metadata = createPageMetadata({
  title: "1.000 direkte Vergleiche für Haus und Garten",
  description: "1.000 konkrete Vergleiche für Gartenhaus, Mähroboter, Terrasse, Bewässerung, Boden und Raumklima – mit Matrix, Quellen und Prüfschritten.",
  path: "/ratgeber/vergleiche/",
});

export default function Page() {
  const path = "/ratgeber/vergleiche/";
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${absoluteUrl(path)}#collection`,
      url: absoluteUrl(path),
      name: "1.000 direkte Vergleiche für Haus und Garten",
      description: "Kontextbezogene Entscheidungshilfen mit einheitlichen Kriterien, Gegenproben und Quellen.",
      inLanguage: "de-DE",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: DECISION_GUIDE_DIRECTORIES.length,
        itemListElement: DECISION_GUIDE_DIRECTORIES.map((directory, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: directory.title,
          url: absoluteUrl(`/ratgeber/vergleiche/${directory.topicSlug}/`),
        })),
      },
    }} />
    <section className="page-hero project-directory-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Direkte Vergleiche" }]} />
      <p className="eyebrow">{DECISION_GUIDE_COUNT.toLocaleString("de-DE")} konkrete Entscheidungssituationen</p>
      <h1>Direkt vergleichen – <em>konkret entscheiden.</em></h1>
      <p>Keine pauschalen Testsieger: Jede Seite vergleicht zwei Lösungswege für eine klar benannte Nutzung. Gewichtung, Gegenprobe, Quellen und Grenzen bleiben sichtbar.</p>
    </section>
    <section className="topic-method" aria-labelledby="comparison-method-title">
      <div><p className="eyebrow">Menschen zuerst</p><h2 id="comparison-method-title">Ein Vergleich muss eine echte Entscheidung lösen.</h2><p>Die Bibliothek kombiniert keine Ortsnamen und tauscht keine Synonyme aus. Jede URL besitzt einen eigenen Entscheidungskontext, dessen Prioritäten den Rechenwert tatsächlich verändern.</p></div>
      <ol>
        <li><span>01</span><strong>Zwei reale Lösungswege mit denselben Kriterien prüfen.</strong></li>
        <li><span>02</span><strong>Gewichte und Muss-Kriterien offenlegen.</strong></li>
        <li><span>03</span><strong>Ergebnis am Standort und Datenblatt verifizieren.</strong></li>
      </ol>
    </section>
    <section className="directory-section">
      <div className="section-heading"><div><p className="eyebrow">Zehn Themenwelten</p><h2>Wähle dein Projekt.</h2></div><p>Pro Themenbereich stehen 100 kontextbezogene Direktvergleiche und der passende Rechner bereit.</p></div>
      <div className="directory-grid">
        {DECISION_GUIDE_DIRECTORIES.map((directory) => {
          const topic = getSeoTopic(directory.topicSlug);
          if (!topic) return null;
          return <article className="directory-card topic-card" key={directory.topicSlug}>
            <p className="eyebrow">100 Direktvergleiche</p>
            <h2>{directory.title}</h2>
            <p>{directory.description}</p>
            <Link className="text-link" href={`/ratgeber/vergleiche/${directory.topicSlug}/`}>{topic.name} vergleichen →</Link>
          </article>;
        })}
      </div>
    </section>
  </>;
}
