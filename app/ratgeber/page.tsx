import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { SEO_GUIDES } from "@/lib/seo-guides";
import { getGuidesForTopic, SEO_TOPICS } from "@/lib/seo-topics";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getProjectExampleDirectory } from "@/lib/project-examples";

export const metadata = createPageMetadata({
  title: "Haus- und Garten-Ratgeber: Vergleiche und Kaufentscheidungen",
  description: "Vergleiche für Gartenhaus, Mähroboter, Terrasse, Bewässerung, Gewächshaus, Boden und Raumklima – nachvollziehbar statt pauschaler Testsieger.",
  path: "/ratgeber/",
});

export default function Page() {
  return <>
    <section className="page-hero"><Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber" }]} /><p className="eyebrow">PassendPlanen Ratgeber</p><h1>Vergleiche, die zum <em>Projekt</em> passen.</h1><p>Materialien, Systeme und Kaufkriterien verständlich einordnen – mit direktem Übergang zum passenden Rechner.</p></section>
    <section className="directory-section topic-directory"><div className="section-heading"><div><p className="eyebrow">Zehn Themenwelten</p><h2>Wähle zuerst dein Projekt.</h2></div><p>Jeder Themen-Hub bündelt den passenden Rechner, konkrete Szenarien, Vergleiche und die Grenzen der Planung.</p></div><div className="directory-grid">{SEO_TOPICS.map((topic) => { const count = getGuidesForTopic(SEO_GUIDES, topic).length; const examples = getProjectExampleDirectory(topic.slug)?.examples.length ?? 0; return <article className="directory-card topic-card" key={topic.slug}><p className="eyebrow">{topic.eyebrow}</p><h2>{topic.name}</h2><p>{topic.description}</p><span>{count} Ratgeber · {examples} Projektbeispiele</span><Link className="text-link" href={`/ratgeber/thema/${topic.slug}/`}>Themenbereich öffnen →</Link></article>; })}</div></section>
    {SEO_TOPICS.map((topic) => { const guides = getGuidesForTopic(SEO_GUIDES, topic); return <section className="directory-section directory-section--cluster" key={topic.slug}><div className="section-heading"><div><p className="eyebrow">{topic.eyebrow}</p><h2>{topic.name}</h2></div><Link className="text-link" href={`/ratgeber/thema/${topic.slug}/`}>Alle {guides.length} ansehen →</Link></div><div className="directory-grid">{guides.slice(0, 6).map((guide) => <article className="directory-card" key={guide.slug}><p className="eyebrow">Vergleich & Kaufhilfe</p><h3>{guide.title}</h3><p>{guide.description}</p><Link className="text-link" href={`/ratgeber/${guide.slug}/`}>Ratgeber lesen →</Link></article>)}</div></section>; })}
  </>;
}
