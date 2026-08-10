import Link from "next/link";
import type { ReactNode } from "react";
import {
  GUIDE_ENRICHMENTS,
  type GuideSource,
} from "@/lib/guide-enrichments";
import { CONTENT_UPDATED_AT } from "@/lib/metadata";
import { absoluteUrl, SITE } from "@/lib/site";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";

export interface GuideSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

interface GuidePageProps {
  title: string;
  intro: string;
  path: string;
  updated: string;
  updatedAt?: string;
  sections: GuideSection[];
  takeaway: string;
  breadcrumbs?: Crumb[];
  plannerHref?: string;
  plannerLabel?: string;
  limitation?: string;
  calculator?: ReactNode;
  sources?: GuideSource[];
}

export function GuidePage({
  title,
  intro,
  path,
  updated,
  updatedAt = CONTENT_UPDATED_AT,
  sections,
  takeaway,
  breadcrumbs,
  plannerHref = "/garten/gartenhaus-planer/",
  plannerLabel = "Gartenhaus planen",
  limitation = "Diese Einordnung ersetzt keine Prüfung von Baurecht, Abständen, Statik, Fundament oder Herstellerangaben für deinen konkreten Standort.",
  calculator,
  sources = [],
}: GuidePageProps) {
  const url = absoluteUrl(path);
  const siteRoot = SITE.url.replace(/\/$/, "");
  const enrichment = GUIDE_ENRICHMENTS[path];
  const resolvedSources = [...(enrichment?.sources ?? []), ...sources].filter(
    (source, index, allSources) =>
      allSources.findIndex((candidate) => candidate.href === source.href) === index,
  );
  const example = enrichment?.example;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${url}#article`,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          headline: title,
          description: intro,
          dateModified: updatedAt,
          inLanguage: "de-DE",
          author: {
            "@type": "Person",
            "@id": `${siteRoot}/#publisher`,
            name: "Schayan Yousefian",
            url: absoluteUrl("/ueber-machplan/"),
          },
          publisher: {
            "@type": "Person",
            "@id": `${siteRoot}/#publisher`,
            name: "Schayan Yousefian",
          },
          isPartOf: { "@type": "WebSite", "@id": `${siteRoot}/#website` },
          ...(resolvedSources.length > 0
            ? { citation: resolvedSources.map((source) => source.href) }
            : {}),
        }}
      />
      <article className="guide-page">
        <Breadcrumbs
          items={breadcrumbs ?? [
            { label: "Start", href: "/" },
            { label: "Garten", href: "/garten/" },
            { label: title },
          ]}
        />
        <header>
          <p className="eyebrow">MachPlan Ratgeber</p>
          <p className="guide-meta">
            Von <Link href="/ueber-machplan/" rel="author">Schayan Yousefian</Link>
            {" · zuletzt geprüft "}
            <time dateTime={updatedAt}>{updated}</time>
          </p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </header>

        {calculator && <div className="guide-calculator">{calculator}</div>}

        <div className="guide-layout">
          <aside aria-labelledby="guide-answer-title">
            <h2 id="guide-answer-title">Kurzantwort</h2>
            <p>{takeaway}</p>
            <Link className="button button--primary" href={plannerHref}>
              {plannerLabel} →
            </Link>
          </aside>

          <div className="guide-copy">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </section>
            ))}

            {example && (
              <section className="guide-example" aria-labelledby="guide-example-title">
                <p className="eyebrow">Nachvollziehbares Rechenbeispiel</p>
                <h2 id="guide-example-title">{example.title}</h2>
                <p>{example.intro}</p>
                <dl>
                  {example.steps.map((step) => (
                    <div key={step.label}>
                      <dt>{step.label}</dt>
                      <dd>{step.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="guide-example-result"><strong>Ergebnis:</strong> {example.result}</p>
                {example.note && <p className="guide-example-note">{example.note}</p>}
              </section>
            )}

            {resolvedSources.length > 0 && (
              <section className="guide-sources">
                <p className="eyebrow">Geprüfte Ausgangspunkte</p>
                <h2>Quellen und weiterführende Hinweise</h2>
                <ul>
                  {resolvedSources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} rel="noopener noreferrer">
                        {source.label}
                      </a>
                      <span>{source.publisher}</span>
                      <p>{source.note}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="guide-method">
              <strong>Nachvollziehbarkeit</strong>
              <p>
                Wie MachPlan rechnet, Annahmen kennzeichnet und Grenzen behandelt,
                erklären wir in der <Link href="/methodik/">Methodik</Link>.
              </p>
            </div>
            <div className="guide-limit">
              <strong>Wichtige Grenze</strong>
              <p>{limitation}</p>
            </div>
          </div>
        </div>
      </article>

      <section className="guide-cta">
        <div>
          <p className="eyebrow">Vom Wissen zur Auswahl</p>
          <h2>Berechne jetzt deinen Planungsrahmen.</h2>
          <p>Der Rechner übersetzt deinen Bedarf in transparente Auswahlkriterien.</p>
        </div>
        <Link className="button button--light" href={plannerHref}>
          Planer kostenlos starten →
        </Link>
      </section>
    </>
  );
}
