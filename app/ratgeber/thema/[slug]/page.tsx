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
    <section className="topic-boundary"><div><p className="eyebrow">Bewusst begrenzt</p><h2>Was der Themenbereich nicht verspricht</h2></div><p>{editorializeText(topic.boundary)}</p></section>
  </>;
}
