import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";
import { SEO_GUIDES } from "@/lib/seo-guides";
import { getGuidesForTopic, getSeoTopic, SEO_TOPICS } from "@/lib/seo-topics";
import { getProjectExampleDirectory } from "@/lib/project-examples";
import { getDecisionGuideDirectory } from "@/lib/decision-guides";
import { editorializeText } from "@/lib/editorial-style";
import { getDataReportsForTopic } from "@/lib/data-report/registry";

const FEATURED_MOWER_CASES = [
  {
    eyebrow: "Offene Fläche",
    title: "Mähroboter für 250 m² offenen Rasen",
    description: "Ein kompakter Rechenfall mit Flächenreserve, Gegenprobe und den Punkten, die am konkreten Modell offenbleiben.",
    href: "/ratgeber/projekte/maehroboter/maehroboter-250-qm-offen/",
  },
  {
    eyebrow: "Hindernisse",
    title: "500 m² mit Bäumen und Einbauten",
    description: "Wie Hindernisse den Arbeitsrahmen verändern und warum die reine Quadratmeterzahl nicht für die Auswahl reicht.",
    href: "/ratgeber/projekte/maehroboter/maehroboter-500-qm-hindernisse/",
  },
  {
    eyebrow: "Hang",
    title: "1.000 m² Rasen mit Steigung",
    description: "Flächenleistung und Steigungsgrenze werden getrennt bewertet und mit einer messbaren Gegenprobe verbunden.",
    href: "/ratgeber/projekte/maehroboter/maehroboter-1000-qm-hang/",
  },
  {
    eyebrow: "Redaktioneller Vergleich",
    title: "500 m² mit Begrenzungskabel oder RTK",
    description: "Ein vollständig geprüfter Direktvergleich für Empfang, Engstellen, Zonen, Installation und Folgekosten.",
    href: "/ratgeber/vergleiche/maehroboter/maehroboter-begrenzungskabel-oder-rtk-500-qm/",
  },
  {
    eyebrow: "Bäume",
    title: "RTK oder LiDAR bei vielen Bäumen",
    description: "Die Navigation wird an Baumkronen, Gebäuden, Kartenstabilität und dem Verhalten bei Störungen geprüft.",
    href: "/ratgeber/vergleiche/maehroboter/maehroboter-rtk-oder-lidar-viele-baeume/",
  },
  {
    eyebrow: "Engstellen",
    title: "Begrenzungskabel oder Hybrid für enge Passagen",
    description: "Ein Vergleich für schmale Verbindungen, sichere Grenzen und einen erreichbaren Weg zur Ladestation.",
    href: "/ratgeber/vergleiche/maehroboter/maehroboter-begrenzungskabel-oder-hybrid-enge-passagen/",
  },
] as const;

export function generateStaticParams() {
  return SEO_TOPICS.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const topic = getSeoTopic((await params).slug);
  return topic ? createPageMetadata({ title: `${topic.name}: Rechner und Ratgeber`, description: topic.description, path: `/ratgeber/thema/${topic.slug}/` }) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const topic = getSeoTopic((await params).slug);
  if (!topic) notFound();
  const guides = getGuidesForTopic(SEO_GUIDES, topic);
  const projectDirectory = getProjectExampleDirectory(topic.slug);
  const comparisonDirectory = getDecisionGuideDirectory(topic.slug);
  const dataReports = getDataReportsForTopic(topic.slug);
  const url = absoluteUrl(`/ratgeber/thema/${topic.slug}/`);

  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#collection`,
      url,
      name: topic.name,
      description: topic.description,
      inLanguage: "de-DE",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: guides.length,
        itemListElement: guides.map((guide, index) => ({ "@type": "ListItem", position: index + 1, name: guide.title, url: absoluteUrl(`/ratgeber/${guide.slug}/`) })),
      },
    }} />
    <section className="page-hero topic-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: topic.name }]} />
      <p className="eyebrow">{topic.eyebrow}</p>
      <h1>{topic.name} <em>klarer entscheiden.</em></h1>
      <p>{editorializeText(topic.intro)}</p>
      <div className="hero-actions"><Link className="button button--primary" href={topic.plannerHref}>{topic.plannerLabel} →</Link><a className="text-link" href="#ratgeber">{guides.length} Ratgeber ansehen ↓</a></div>
    </section>
    <section className="topic-method" aria-labelledby="topic-method-title">
      <div><p className="eyebrow">Planungslogik</p><h2 id="topic-method-title">Messen und passend vergleichen.</h2><p>{editorializeText(topic.method)}</p></div>
      <ol>{topic.questions.map((question, index) => <li key={question}><span>0{index + 1}</span><strong>{question}</strong></li>)}</ol>
    </section>
    {dataReports.length > 0 && <section className="directory-section data-topic-reports" aria-labelledby="topic-data-reports">
      <div className="section-heading"><div><p className="eyebrow">Aus geprüften Produktdaten</p><h2 id="topic-data-reports">Eigene Auswertungen für diesen Themenbereich</h2></div><p>Die Analysen zeigen Stichprobe, Berechnung und Datenlücken. Sie sind keine pauschalen Testsiegerlisten.</p></div>
      <div className="directory-grid">{dataReports.map((report) => <article className="directory-card" key={report.slug}><p className="eyebrow">{report.eyebrow}</p><h3>{report.title}</h3><p>{report.description}</p><Link className="text-link" href={report.path}>Datenauswertung lesen →</Link></article>)}</div>
    </section>}
    <section className="directory-section" id="ratgeber">
      <div className="section-heading"><div><p className="eyebrow">{topic.name}</p><h2>Alle Rechner, Szenarien und Vergleiche</h2></div><p>{editorializeText(topic.description)}</p></div>
      <div className="directory-grid">{guides.map((guide) => <article className="directory-card" key={guide.slug}><p className="eyebrow">Ratgeber & Entscheidungshilfe</p><h3>{guide.title}</h3><p>{guide.description}</p><Link className="text-link" href={`/ratgeber/${guide.slug}/`}>Ratgeber lesen →</Link></article>)}</div>
    </section>
    {projectDirectory && <section className="project-library-callout">
      <div><p className="eyebrow">Konkrete Größen und Nutzungen</p><h2>85 nachvollziehbare Projektbeispiele</h2><p>{projectDirectory.description} Jede Seite enthält eine vollständige Rechenkette, eine Gegenprobe, Prüfgrenzen und Quellen.</p></div>
      <Link className="button button--primary" href={`/ratgeber/projekte/${topic.slug}/`}>Projektbeispiele öffnen →</Link>
    </section>}
    {comparisonDirectory && <section className="project-library-callout">
      <div><p className="eyebrow">Zwei Optionen, ein konkreter Kontext</p><h2>100 gewichtete Direktvergleiche</h2><p>{comparisonDirectory.description} Jede Seite zeigt dieselben fünf Kriterien für beide Optionen und eine nachvollziehbare Gegenprobe.</p></div>
      <Link className="button button--primary" href={`/ratgeber/vergleiche/${topic.slug}/`}>Direktvergleiche öffnen →</Link>
    </section>}
    {topic.slug === "maehroboter" && <section className="directory-section" aria-labelledby="featured-mower-cases">
      <div className="section-heading">
        <div><p className="eyebrow">Ausgewählte Rechenfälle</p><h2 id="featured-mower-cases">Häufige Gartensituationen direkt öffnen</h2></div>
        <p>Diese Beispiele zeigen unterschiedliche Flächen, Hindernisse und Navigationsfragen. Sie sind als nachvollziehbare Gegenprobe gedacht und ersetzen keine Modellfreigabe.</p>
      </div>
      <div className="directory-grid">
        {FEATURED_MOWER_CASES.map((item) => <article className="directory-card" key={item.href}>
          <p className="eyebrow">{item.eyebrow}</p>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <Link className="text-link" href={item.href}>Beispiel ansehen →</Link>
        </article>)}
      </div>
    </section>}
    <section className="topic-boundary"><div><p className="eyebrow">Bewusst begrenzt</p><h2>Was der Themenbereich nicht verspricht</h2></div><p>{editorializeText(topic.boundary)}</p></section>
  </>;
}
