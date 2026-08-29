import Link from "next/link";
import type { ReactNode } from "react";
import {
  GUIDE_ENRICHMENTS,
  type GuideExample,
  type GuideSource,
} from "@/lib/guide-enrichments";
import { GUIDE_DEPTH_EXISTING } from "@/lib/guide-depth-existing";
import { CONTENT_UPDATED_AT } from "@/lib/metadata";
import { absoluteUrl, SITE } from "@/lib/site";
import { editorializeText } from "@/lib/editorial-style";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";

export interface GuideSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideComparison {
  caption: string;
  columns: [string, string, string];
  rows: Array<[string, string, string]>;
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideRelatedLink {
  label: string;
  href: string;
  description: string;
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
  example?: GuideExample;
  comparison?: GuideComparison;
  checklist?: string[];
  faqs?: GuideFaq[];
  relatedLinks?: GuideRelatedLink[];
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
  example,
  comparison,
  checklist = [],
  faqs = [],
  relatedLinks = [],
}: GuidePageProps) {
  const url = absoluteUrl(path);
  const siteRoot = SITE.url.replace(/\/$/, "");
  const enrichment = GUIDE_ENRICHMENTS[path];
  const depth = GUIDE_DEPTH_EXISTING[path];
  const resolvedComparison = comparison ?? depth?.comparison;
  const resolvedChecklist = checklist.length ? checklist : (depth?.checklist ?? []);
  const resolvedFaqs = faqs.length ? faqs : (depth?.faqs ?? []);
  const resolvedRelatedLinks = relatedLinks.length ? relatedLinks : (depth?.relatedLinks ?? []);
  const resolvedSources = [...(enrichment?.sources ?? []), ...sources].filter(
    (source, index, allSources) =>
      allSources.findIndex((candidate) => candidate.href === source.href) === index,
  );
  const resolvedExample = example ?? enrichment?.example;
  const displayTitle = editorializeText(title);
  const displayIntro = editorializeText(intro);
  const displayTakeaway = editorializeText(takeaway);
  const displayPlannerLabel = editorializeText(plannerLabel);
  const displayLimitation = editorializeText(limitation);
  const displaySections = sections.map((section) => ({
    ...section,
    title: editorializeText(section.title),
    paragraphs: section.paragraphs.map(editorializeText),
    bullets: section.bullets?.map(editorializeText),
  }));
  const displayComparison = resolvedComparison
    ? {
        ...resolvedComparison,
        caption: editorializeText(resolvedComparison.caption),
        columns: resolvedComparison.columns.map(editorializeText),
        rows: resolvedComparison.rows.map((row) => row.map(editorializeText)),
      }
    : undefined;
  const displayChecklist = resolvedChecklist.map(editorializeText);
  const displayFaqs = resolvedFaqs.map((faq) => ({
    question: editorializeText(faq.question),
    answer: editorializeText(faq.answer),
  }));
  const displayRelatedLinks = resolvedRelatedLinks.map((link) => ({
    ...link,
    label: editorializeText(link.label),
    description: editorializeText(link.description),
  }));
  const displaySources = resolvedSources.map((source) => ({
    ...source,
    label: editorializeText(source.label),
    publisher: editorializeText(source.publisher),
    note: editorializeText(source.note),
  }));
  const displayExample = resolvedExample
    ? {
        ...resolvedExample,
        title: editorializeText(resolvedExample.title),
        intro: editorializeText(resolvedExample.intro),
        steps: resolvedExample.steps.map((step) => ({
          label: editorializeText(step.label),
          value: editorializeText(step.value),
        })),
        result: editorializeText(resolvedExample.result),
        note: resolvedExample.note ? editorializeText(resolvedExample.note) : undefined,
      }
    : undefined;
  const displayBreadcrumbs = (breadcrumbs ?? [
    { label: "Start", href: "/" },
    { label: "Garten", href: "/garten/" },
    { label: displayTitle },
  ]).map((item) => ({ ...item, label: editorializeText(item.label) }));
  const articleWordCount = [
    displayTitle,
    displayIntro,
    displayTakeaway,
    ...displaySections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.bullets ?? [])]),
    ...(displayComparison ? [displayComparison.caption, ...displayComparison.columns, ...displayComparison.rows.flat()] : []),
    ...displayChecklist,
    ...displayFaqs.flatMap((faq) => [faq.question, faq.answer]),
    ...displayRelatedLinks.flatMap((link) => [link.label, link.description]),
    ...(displayExample ? [displayExample.title, displayExample.intro, ...displayExample.steps.flatMap((step) => [step.label, step.value]), displayExample.result, displayExample.note ?? ""] : []),
    displayLimitation,
  ].join(" ").trim().split(/\s+/).filter(Boolean).length;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${url}#article`,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          headline: displayTitle,
          description: displayIntro,
          abstract: displayTakeaway,
          articleSection: displaySections.map((section) => section.title),
          dateModified: updatedAt,
          wordCount: articleWordCount,
          inLanguage: "de-DE",
          author: {
            "@type": "Person",
            "@id": `${siteRoot}/#author`,
            name: "Schayan Yousefian",
            url: absoluteUrl("/ueber-passendplanen/"),
          },
          publisher: {
            "@type": "Organization",
            "@id": `${siteRoot}/#organization`,
            name: SITE.name,
            url: `${siteRoot}/`,
          },
          isPartOf: { "@type": "WebSite", "@id": `${siteRoot}/#website` },
          ...(displaySources.length > 0
            ? { citation: displaySources.map((source) => source.href) }
            : {}),
        }}
      />
      {displayFaqs.length > 0 && <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: displayFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} />}
      <article className="guide-page">
        <Breadcrumbs
          items={displayBreadcrumbs}
        />
        <header>
          <p className="eyebrow">PassendPlanen Ratgeber</p>
          <p className="guide-meta">
            Von <Link href="/ueber-passendplanen/" rel="author">Schayan Yousefian</Link>
            {" Zuletzt geprüft "}
            <time dateTime={updatedAt}>{updated}</time>
          </p>
          <h1>{displayTitle}</h1>
          <p>{displayIntro}</p>
        </header>

        {calculator && <div className="guide-calculator">{calculator}</div>}

        <div className="guide-layout">
          <aside aria-labelledby="guide-answer-title">
            <h2 id="guide-answer-title">Kurzantwort</h2>
            <p>{displayTakeaway}</p>
            <Link className="button button--primary" href={plannerHref}>
              {displayPlannerLabel} →
            </Link>
          </aside>

          <div className="guide-copy">
            {displaySections.map((section) => (
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

            {displayComparison && (
              <section className="guide-comparison" aria-labelledby="guide-comparison-title">
                <p className="eyebrow">Direkter Vergleich</p>
                <h2 id="guide-comparison-title">{displayComparison.caption}</h2>
                <div className="guide-table-wrap">
                  <table>
                    <thead><tr>{displayComparison.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
                    <tbody>{displayComparison.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              </section>
            )}

            {displayChecklist.length > 0 && (
              <section className="guide-checklist" aria-labelledby="guide-checklist-title">
                <p className="eyebrow">Vor dem Kauf prüfen</p>
                <h2 id="guide-checklist-title">Deine Projekt-Checkliste</h2>
                <ol>{displayChecklist.map((item) => <li key={item}>{item}</li>)}</ol>
              </section>
            )}

            {displayExample && (
              <section className="guide-example" aria-labelledby="guide-example-title">
                <p className="eyebrow">Nachvollziehbares Rechenbeispiel</p>
                <h2 id="guide-example-title">{displayExample.title}</h2>
                <p>{displayExample.intro}</p>
                <dl>
                  {displayExample.steps.map((step) => (
                    <div key={step.label}>
                      <dt>{step.label}</dt>
                      <dd>{step.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="guide-example-result"><strong>Ergebnis</strong> {displayExample.result}</p>
                {displayExample.note && <p className="guide-example-note">{displayExample.note}</p>}
              </section>
            )}

            {displaySources.length > 0 && (
              <section className="guide-sources">
                <p className="eyebrow">Geprüfte Ausgangspunkte</p>
                <h2>Quellen und weiterführende Hinweise</h2>
                <ul>
                  {displaySources.map((source) => (
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

            {displayFaqs.length > 0 && (
              <section className="guide-faq" aria-labelledby="guide-faq-title">
                <p className="eyebrow">Häufige Fragen</p>
                <h2 id="guide-faq-title">Kurz und konkret beantwortet</h2>
                <div>{displayFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
              </section>
            )}

            {displayRelatedLinks.length > 0 && (
              <section className="guide-related" aria-labelledby="guide-related-title">
                <p className="eyebrow">Passend weiterplanen</p>
                <h2 id="guide-related-title">Verwandte Rechner und Ratgeber</h2>
                <div>{displayRelatedLinks.map((link) => <Link key={link.href} href={link.href}><strong>{link.label}</strong><span>{link.description}</span></Link>)}</div>
              </section>
            )}

            <div className="guide-method">
              <strong>Nachvollziehbarkeit</strong>
              <p>
                Wie PassendPlanen rechnet, Annahmen kennzeichnet und Grenzen behandelt,
                erklären wir in der <Link href="/methodik/">Methodik</Link>.
              </p>
            </div>
            <div className="guide-limit">
              <strong>Wichtige Grenze</strong>
              <p>{displayLimitation}</p>
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
