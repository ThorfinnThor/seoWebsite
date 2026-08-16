import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import {
  getProjectExampleDirectory,
  PROJECT_EXAMPLE_DIRECTORIES,
} from "@/lib/project-examples";
import { absoluteUrl } from "@/lib/site";
import { getSeoTopic } from "@/lib/seo-topics";

export function generateStaticParams() {
  return PROJECT_EXAMPLE_DIRECTORIES.map((directory) => ({ topic: directory.topicSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const directory = getProjectExampleDirectory((await params).topic);
  return directory ? createPageMetadata({
    title: directory.title,
    description: directory.description,
    path: `/ratgeber/projekte/${directory.topicSlug}/`,
  }) : {};
}

export default async function Page({ params }: { params: Promise<{ topic: string }> }) {
  const directory = getProjectExampleDirectory((await params).topic);
  if (!directory) notFound();
  const topic = getSeoTopic(directory.topicSlug);
  if (!topic) notFound();
  const path = `/ratgeber/projekte/${directory.topicSlug}/`;
  const variants = [...new Map(directory.examples.map((example) => [example.variantSlug, {
    slug: example.variantSlug,
    label: example.variantLabel,
  }])).values()];

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
        numberOfItems: directory.examples.length,
        itemListElement: directory.examples.map((example, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: example.title,
          url: absoluteUrl(`/ratgeber/projekte/${example.topicSlug}/${example.slug}/`),
        })),
      },
    }} />
    <section className="page-hero project-directory-hero">
      <Breadcrumbs items={[
        { label: "Start", href: "/" },
        { label: "Ratgeber", href: "/ratgeber/" },
        { label: topic.name, href: `/ratgeber/thema/${topic.slug}/` },
        { label: "Projektbeispiele" },
      ]} />
      <p className="eyebrow">85 nachvollziehbare Rechenprofile</p>
      <h1>{directory.title}: <em>konkret gerechnet.</em></h1>
      <p>{directory.intro}</p>
      <div className="hero-actions">
        <Link className="button button--primary" href={topic.plannerHref}>{topic.plannerLabel} →</Link>
        <a className="text-link" href="#beispiele">Alle Beispiele ansehen ↓</a>
      </div>
    </section>
    <section className="topic-method" aria-labelledby="project-directory-method">
      <div>
        <p className="eyebrow">So nutzt du die Bibliothek</p>
        <h2 id="project-directory-method">Passendes Beispiel finden, eigene Werte einsetzen.</h2>
        <p>Wähle zuerst die Größe, die deinem Projekt am nächsten kommt. Öffne danach das passende Nutzungsszenario und ersetze die sichtbaren Eingaben durch deine Messwerte. Jede Seite zeigt außerdem, welche Angaben vor einer Auswahl noch verifiziert werden müssen.</p>
      </div>
      <ol>
        <li><span>01</span><strong>Größe und Nutzung gemeinsam auswählen.</strong></li>
        <li><span>02</span><strong>Rechenweg mit eigenen Messwerten wiederholen.</strong></li>
        <li><span>03</span><strong>Grenzen am Standort und Produktdatenblatt prüfen.</strong></li>
      </ol>
    </section>
    <div id="beispiele">
      {variants.map((variant) => {
        const examples = directory.examples.filter((example) => example.variantSlug === variant.slug);
        return <section className="directory-section directory-section--cluster project-example-group" key={variant.slug}>
          <div className="section-heading">
            <div><p className="eyebrow">17 Größenprofile</p><h2>{topic.name} {variant.label}</h2></div>
            <p>Alle Beispiele enthalten Eingabe, Berechnung, Gegenprobe, Checkliste, FAQ, Quellen und den direkten Rechner-Einstieg.</p>
          </div>
          <div className="project-example-grid">
            {examples.map((example) => <article className="project-example-card" key={example.slug}>
              <p className="eyebrow">Konkretes Rechenprofil</p>
              <h3>{example.title.split(":")[0]}</h3>
              <p>{example.takeaway}</p>
              <Link className="text-link" href={`/ratgeber/projekte/${example.topicSlug}/${example.slug}/`}>Beispiel öffnen →</Link>
            </article>)}
          </div>
        </section>;
      })}
    </div>
    <section className="topic-boundary">
      <div><p className="eyebrow">Qualitätsgrenze</p><h2>Rechenreferenz statt Scheingenauigkeit</h2></div>
      <p>{topic.boundary} Die Beispiele nennen ihre Annahmen sichtbar und ersetzen weder Herstellerunterlagen noch eine notwendige Fachplanung.</p>
    </section>
  </>;
}
