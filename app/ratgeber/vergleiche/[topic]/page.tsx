import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";
import {
  DECISION_GUIDE_DIRECTORIES,
  getDecisionGuideDirectory,
} from "@/lib/decision-guides";
import { getSeoTopic } from "@/lib/seo-topics";

export function generateStaticParams() {
  return DECISION_GUIDE_DIRECTORIES.map((directory) => ({ topic: directory.topicSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const directory = getDecisionGuideDirectory((await params).topic);
  return directory ? createPageMetadata({
    title: directory.title,
    description: directory.description,
    path: `/ratgeber/vergleiche/${directory.topicSlug}/`,
  }) : {};
}

export default async function Page({ params }: { params: Promise<{ topic: string }> }) {
  const directory = getDecisionGuideDirectory((await params).topic);
  if (!directory) notFound();
  const topic = getSeoTopic(directory.topicSlug);
  if (!topic) notFound();
  const path = `/ratgeber/vergleiche/${directory.topicSlug}/`;
  const pairs = [...new Map(directory.guides.map((guide) => [guide.pairSlug, guide.pairLabel])).entries()];

  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${absoluteUrl(path)}#collection`,
      url: absoluteUrl(path),
      name: directory.title,
      description: directory.description,
      inLanguage: "de-DE",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: directory.guides.length,
        itemListElement: directory.guides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          url: absoluteUrl(`/ratgeber/vergleiche/${guide.topicSlug}/${guide.slug}/`),
        })),
      },
    }} />
    <section className="page-hero project-directory-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Direkte Vergleiche", href: "/ratgeber/vergleiche/" }, { label: topic.name }]} />
      <p className="eyebrow">10 Paare · 10 Nutzungssituationen · 100 Seiten</p>
      <h1>{directory.title}: <em>konkret gewichtet.</em></h1>
      <p>{directory.description} Jede Seite verwendet dieselben fünf Kriterien für beide Optionen und zeigt, wie der Nutzungskontext die Gewichtung verändert.</p>
      <div className="hero-actions"><Link className="button button--primary" href={topic.plannerHref}>{topic.plannerLabel} →</Link><a className="text-link" href="#vergleiche">Alle Vergleiche ansehen ↓</a></div>
    </section>
    <div id="vergleiche">
      {pairs.map(([pairSlug, pairLabel]) => {
        const guides = directory.guides.filter((guide) => guide.pairSlug === pairSlug);
        return <section className="directory-section directory-section--cluster project-example-group" key={pairSlug}>
          <div className="section-heading"><div><p className="eyebrow">Direkter Vergleich</p><h2>{pairLabel}</h2></div><p>Zehn konkrete Nutzungen mit eigener Gewichtung, Gegenprobe, Checkliste und Quellen.</p></div>
          <div className="project-example-grid">
            {guides.map((guide) => <article className="project-example-card" key={guide.slug}>
              <p className="eyebrow">{guide.contextLabel}</p>
              <h3>{guide.title}</h3>
              <p>{guide.takeaway}</p>
              <Link className="text-link" href={`/ratgeber/vergleiche/${guide.topicSlug}/${guide.slug}/`}>Vergleich öffnen →</Link>
            </article>)}
          </div>
        </section>;
      })}
    </div>
    <section className="topic-boundary"><div><p className="eyebrow">Keine Scheingenauigkeit</p><h2>Die Matrix sortiert – sie gibt nicht frei.</h2></div><p>{topic.boundary} Ein höherer Orientierungswert darf kein nicht erfülltes Muss-Kriterium überstimmen.</p></section>
  </>;
}
