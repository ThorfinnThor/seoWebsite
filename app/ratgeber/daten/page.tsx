import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { DATA_REPORTS } from "@/lib/data-report/registry";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

const PATH = "/ratgeber/daten/";

export const metadata = createPageMetadata({
  title: "PassendPlanen Datenauswertungen",
  description: "Eigene Auswertungen geprüfter Produktdaten für Haus und Garten mit transparenter Methodik, aktuellem Datenstand und sichtbaren Grenzen.",
  path: PATH,
});

export default function Page() {
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "PassendPlanen Datenauswertungen",
      url: absoluteUrl(PATH),
      hasPart: DATA_REPORTS.map((report) => ({ "@type": "Article", name: report.title, url: absoluteUrl(report.path) })),
    }} />
    <section className="page-hero data-directory-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Datenauswertungen" }]} />
      <p className="eyebrow">Eigene Auswertungen statt pauschaler Ranglisten</p>
      <h1>Was unsere geprüften Produktdaten <em>wirklich</em> zeigen.</h1>
      <p>PassendPlanen führt technische Angaben aus Händlerkatalogen zusammen, prüft sie und wertet sie für konkrete Entscheidungen aus. Jede Analyse nennt Stichprobe, Datenstand und fehlende Angaben.</p>
    </section>
    <section className="directory-section data-directory" aria-labelledby="data-report-list">
      <div className="section-heading"><div><p className="eyebrow">Aktuelle Analysen</p><h2 id="data-report-list">Jede Produktgruppe braucht eine eigene Fragestellung</h2></div><p>Die Berichte sind keine Produkttests. Sie zeigen, was sich aus den dokumentierten Eigenschaften und verfügbaren Angeboten belastbar ableiten lässt.</p></div>
      <div className="directory-grid">
        {DATA_REPORTS.map((report) => <article className="directory-card" key={report.slug}>
          <p className="eyebrow">{report.eyebrow}</p>
          <h2>{report.title}</h2>
          <p>{report.description}</p>
          <Link className="text-link" href={report.path}>Auswertung öffnen →</Link>
        </article>)}
      </div>
    </section>
    <section className="topic-boundary data-directory-boundary">
      <div><p className="eyebrow">Kein Marktversprechen</p><h2>Die Stichprobe ist transparent begrenzt.</h2></div>
      <p>Die Daten stammen aus den von PassendPlanen geprüften Händlerangeboten. Sie bilden nicht den gesamten deutschen Markt ab. Preise sind Momentaufnahmen, Lieferkosten können fehlen und eine nicht dokumentierte Eigenschaft gilt niemals automatisch als ungeeignet.</p>
    </section>
  </>;
}
