import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { SEO_GUIDES } from "@/lib/seo-guides";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata = createPageMetadata({
  title: "Haus- und Garten-Ratgeber: Vergleiche und Kaufentscheidungen",
  description: "Vergleiche für Gartenhaus, Mähroboter, Terrasse, Bewässerung, Gewächshaus, Boden und Raumklima – nachvollziehbar statt pauschaler Testsieger.",
  path: "/ratgeber/",
});

export default function Page() {
  return <>
    <section className="page-hero"><Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber" }]} /><p className="eyebrow">PassendPlanen Ratgeber</p><h1>Vergleiche, die zum <em>Projekt</em> passen.</h1><p>Materialien, Systeme und Kaufkriterien verständlich einordnen – mit direktem Übergang zum passenden Rechner.</p></section>
    <section className="directory-section"><div className="directory-grid">{SEO_GUIDES.map((guide) => <article className="directory-card" key={guide.slug}><p className="eyebrow">Vergleich & Kaufhilfe</p><h2>{guide.title}</h2><p>{guide.description}</p><Link className="text-link" href={`/ratgeber/${guide.slug}/`}>Ratgeber lesen →</Link></article>)}</div></section>
  </>;
}
