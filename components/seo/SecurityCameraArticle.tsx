import Link from "next/link";
import type { ReactNode } from "react";
import { absoluteUrl, SITE } from "@/lib/site";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";

export interface SecurityCameraSource {
  href: string;
  label: string;
  publisher: string;
  note: string;
}

interface SecurityCameraArticleProps {
  title: string;
  intro: string;
  path: string;
  summary: string;
  wordCount: number;
  sources: SecurityCameraSource[];
  children: ReactNode;
}

const UPDATED_AT = "2026-09-08";

const RELATED_GUIDES = [
  { href: "/ratgeber/sicherheitskameras/wlan-oder-poe/", label: "WLAN oder PoE" },
  { href: "/ratgeber/sicherheitskameras/akku-solar-oder-netzstrom/", label: "Akku, Solar oder Netzstrom" },
  { href: "/ratgeber/sicherheitskameras/wie-viele-kameras-einfamilienhaus/", label: "Kamerazahl am Einfamilienhaus" },
  { href: "/ratgeber/sicherheitskameras/private-videoueberwachung-datenschutz/", label: "Private Videoüberwachung" },
] as const;

export function SecurityCameraArticle({ title, intro, path, summary, wordCount, sources, children }: SecurityCameraArticleProps) {
  const url = absoluteUrl(path);
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      headline: title,
      description: intro,
      datePublished: UPDATED_AT,
      dateModified: UPDATED_AT,
      wordCount,
      inLanguage: "de-DE",
      citation: sources.map((source) => source.href),
      author: { "@type": "Person", "@id": `${SITE.url}/#author`, name: "Schayan Yousefian", url: absoluteUrl("/ueber-passendplanen/") },
      publisher: { "@type": "Organization", "@id": `${SITE.url}/#organization`, name: SITE.name, url: SITE.url },
    }} />
    <article className="camera-guide-page">
      <Breadcrumbs items={[
        { label: "Start", href: "/" },
        { label: "Ratgeber", href: "/ratgeber/" },
        { label: "Sicherheitskameras", href: "/ratgeber/sicherheitskameras/" },
        { label: title },
      ]} />
      <header className="camera-guide-header">
        <div>
          <p className="eyebrow">Sicherheitskameras verständlich planen</p>
          <p className="guide-meta">Von <Link href="/ueber-passendplanen/" rel="author">Schayan Yousefian</Link> · Geprüft am <time dateTime={UPDATED_AT}>8. September 2026</time></p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <aside aria-label="Einordnung">
          <strong>Unsere Einordnung</strong>
          <p>{summary}</p>
          <Link className="button button--primary" href="/haus/sicherheit/sicherheitskamera-finder/">Kameras passend filtern →</Link>
        </aside>
      </header>

      <div className="camera-guide-copy">{children}</div>

      <section className="camera-guide-sources" aria-labelledby="camera-guide-sources-title">
        <p className="eyebrow">Geprüfte Grundlagen</p>
        <h2 id="camera-guide-sources-title">Quellen für die Einordnung</h2>
        <div>{sources.map((source) => <article key={source.href}>
          <a href={source.href} rel="noopener noreferrer">{source.label}</a>
          <strong>{source.publisher}</strong>
          <p>{source.note}</p>
        </article>)}</div>
      </section>

      <nav className="camera-guide-related" aria-label="Weitere Ratgeber zu Sicherheitskameras">
        <h2>Weitere Fragen rund um die Kameraauswahl</h2>
        <div>{RELATED_GUIDES.filter((guide) => guide.href !== path).map((guide) => <Link key={guide.href} href={guide.href}>{guide.label}<span aria-hidden="true">→</span></Link>)}</div>
      </nav>

      <div className="camera-guide-limit">
        <strong>Wichtige Grenze</strong>
        <p>Die Inhalte dienen der allgemeinen Information. Technische Eignung, Montage, Netzwerksicherheit und die rechtliche Zulässigkeit müssen für den konkreten Ort selbst geprüft werden. Bei rechtlichen Zweifeln ist fachkundige Beratung sinnvoll.</p>
      </div>
    </article>
  </>;
}
