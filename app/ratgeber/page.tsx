import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { SEO_GUIDES } from "@/lib/seo-guides";
import { getGuidesForTopic, SEO_TOPICS } from "@/lib/seo-topics";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getProjectExampleDirectory } from "@/lib/project-examples";
import { getDecisionGuideDirectory } from "@/lib/decision-guides";
import { RatgeberSectionNav } from "@/components/seo/RatgeberSectionNav";

export const metadata = createPageMetadata({
  title: "Haus und Garten Ratgeber für Planung, Daten und Vergleiche",
  description: "Praxisratgeber, eigene Datenauswertungen und direkte Vergleiche für Haus und Garten. Nachvollziehbar planen statt pauschalen Testsiegern folgen.",
  path: "/ratgeber/",
});

export default function Page() {
  return <>
    <section className="page-hero"><Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber" }]} /><p className="eyebrow">Wissen für Haus und Garten</p><h1>Fundiert planen und <em>passend</em> entscheiden.</h1><p>Praxisratgeber erklären konkrete Vorhaben. Eigene Datenauswertungen zeigen, was der geprüfte Produktkatalog belastbar hergibt. Direkte Vergleiche helfen bei zwei klar benannten Lösungswegen.</p></section>
    <RatgeberSectionNav />
    <section className="directory-section topic-directory" id="themenbereiche"><div className="section-heading"><div><p className="eyebrow">Zehn Themenbereiche</p><h2>Alles zu deinem Projekt an einem Ort.</h2></div><p>Jeder Bereich bündelt Praxisratgeber, Rechner, Datenauswertungen, konkrete Szenarien und direkte Vergleiche.</p></div><div className="directory-grid">{SEO_TOPICS.map((topic) => { const count = getGuidesForTopic(SEO_GUIDES, topic).length; const examples = getProjectExampleDirectory(topic.slug)?.examples.length ?? 0; const comparisons = getDecisionGuideDirectory(topic.slug)?.guides.length ?? 0; return <article className="directory-card topic-card" key={topic.slug}><p className="eyebrow">{topic.eyebrow}</p><h2>{topic.name}</h2><p>{topic.description}</p><span>{count} Praxisratgeber, {examples} Beispiele und {comparisons} Vergleiche</span><Link className="text-link" href={`/ratgeber/thema/${topic.slug}/`}>Themenbereich öffnen →</Link></article>; })}</div></section>
    <section className="directory-section ratgeber-practice-intro" id="praxisratgeber"><div className="section-heading"><div><p className="eyebrow">Praxisratgeber</p><h2>Konkrete Fragen verständlich klären.</h2></div><p>Diese Artikel behandeln Auswahl, Material, Aufbau und Nutzung. Sie werden nach Themen geordnet und enthalten den passenden Rechner oder eine nachvollziehbare Prüfliste.</p></div><Link className="text-link" href="/ratgeber/sicherheitskameras/">Praxisratgeber zu Sicherheitskameras öffnen →</Link></section>
    {SEO_TOPICS.map((topic) => { const guides = getGuidesForTopic(SEO_GUIDES, topic); return <section className="directory-section directory-section--cluster" key={topic.slug}><div className="section-heading"><div><p className="eyebrow">{topic.eyebrow}</p><h2>{topic.name}</h2></div><Link className="text-link" href={`/ratgeber/thema/${topic.slug}/`}>Alle {guides.length} ansehen →</Link></div><div className="directory-grid">{guides.slice(0, 6).map((guide) => <article className="directory-card" key={guide.slug}><p className="eyebrow">Vergleich & Kaufhilfe</p><h3>{guide.title}</h3><p>{guide.description}</p><Link className="text-link" href={`/ratgeber/${guide.slug}/`}>Ratgeber lesen →</Link></article>)}</div></section>; })}
  </>;
}
