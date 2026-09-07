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
import { editorializeText } from "@/lib/editorial-style";

const MOWER_PAIR_INTROS: Record<string, string> = {
  "begrenzungskabel-oder-rtk": "Hier entscheidet vor allem, ob virtuelle Grenzen am gesamten Grundstück stabil arbeiten und wie häufig sich die Rasenaufteilung verändert.",
  "begrenzungskabel-oder-lidar": "Dieser Vergleich ist interessant, wenn Satellitensicht schwierig ist und du zwischen einer physischen Grenze und umgebungsbasierter Kartierung abwägst.",
  "begrenzungskabel-oder-kamera": "Klare Rasenkanten, wechselndes Licht und kleine Hindernisse machen den Unterschied zwischen einer festen Drahtgrenze und visueller Erkennung sichtbar.",
  "begrenzungskabel-oder-hybrid": "Ein bewährter Kabelweg trifft auf Systeme mit mehreren Sensorquellen. Mehr Technik lohnt sich nur, wenn der Garten sie wirklich braucht.",
  "rtk-oder-lidar": "Freie Himmelsicht und erkennbare Umgebungsmerkmale sind zwei sehr unterschiedliche Voraussetzungen. Prüfe beide dort, wo der Garten am schwierigsten ist.",
  "rtk-oder-kamera": "Satellitenposition und visuelle Erkennung reagieren unterschiedlich auf Bäume, Mauern, Schatten und veränderliche Gartensituationen.",
  "rtk-oder-hybrid": "Die Frage ist nicht, welches System mehr Technik besitzt. Entscheidend ist, ob zusätzliche Sensoren genau die Schwächen deines Standorts abfangen.",
  "lidar-oder-kamera": "Beide Systeme arbeiten ohne umlaufenden Draht und beurteilen die Umgebung verschieden. Vegetation, Licht und kleine Objekte gehören in die Gegenprobe.",
  "lidar-oder-hybrid": "Eine reine Umgebungskartierung kann für strukturreiche Gärten passen. Ein Hybridsystem wird erst sinnvoll, wenn mehrere Navigationsquellen einen belegbaren Vorteil bringen.",
  "kamera-oder-hybrid": "Visuelle Orientierung hält die Einrichtung oft kompakt. Zusätzliche Sensorik kann helfen, erhöht aber auch Aufwand, Preis und mögliche Fehlerquellen.",
};

const MOWER_ENTRY_POINTS = [
  {
    label: "500 m² Rasen",
    title: "Kabel oder RTK auf mittlerer Fläche",
    description: "Eine klare Einordnung für offene Bereiche, Bäume, Engstellen und spätere Änderungen.",
    href: "/ratgeber/vergleiche/maehroboter/maehroboter-begrenzungskabel-oder-rtk-500-qm/",
  },
  {
    label: "Viele Bäume",
    title: "RTK und LiDAR unter schwieriger Sicht",
    description: "Satellitenempfang und Umgebungsnavigation am kritischsten Gartenpunkt prüfen.",
    href: "/ratgeber/vergleiche/maehroboter/maehroboter-rtk-oder-lidar-viele-baeume/",
  },
  {
    label: "Enge Passagen",
    title: "Kabel und Hybrid in schmalen Wegen",
    description: "Nutzbare Breite, Korridorführung und sichere Rückkehr zur Station vergleichen.",
    href: "/ratgeber/vergleiche/maehroboter/maehroboter-begrenzungskabel-oder-hybrid-enge-passagen/",
  },
  {
    label: "Häufige Änderungen",
    title: "RTK und Kamera bei beweglichen Grenzen",
    description: "Beete, Spielbereiche und saisonale Sperrzonen ohne unnötige Umbauten planen.",
    href: "/ratgeber/vergleiche/maehroboter/maehroboter-rtk-oder-kamera-haeufige-aenderungen/",
  },
] as const;

export function generateStaticParams() {
  return DECISION_GUIDE_DIRECTORIES.map((directory) => ({ topic: directory.topicSlug }));
}

const score = (value: number) => value.toLocaleString("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

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
  const isMowerDirectory = directory.topicSlug === "maehroboter";

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
      <p className="eyebrow">{isMowerDirectory ? "Navigation nach Gartenform" : "10 Paare, 10 Nutzungssituationen, 100 Seiten"}</p>
      {isMowerDirectory
        ? <h1>Welche Navigation passt zu <em>deinem Garten?</em></h1>
        : <h1>{editorializeText(directory.title)} <em>konkret gewichtet.</em></h1>}
      <p>{editorializeText(directory.description)} {isMowerDirectory ? "Beginne bei der Stelle, an der der Roboter am ehesten scheitern könnte. Das ist häufig eine schmale Verbindung, dichter Baumbestand oder ein Bereich nah am Haus." : "Jede Seite verwendet dieselben fünf Kriterien für beide Optionen und zeigt, wie der Nutzungskontext die Gewichtung verändert."}</p>
      <div className="hero-actions"><Link className="button button--primary" href={topic.plannerHref}>{topic.plannerLabel} →</Link><a className="text-link" href="#vergleiche">{isMowerDirectory ? "Passenden Vergleich finden" : "Alle Vergleiche ansehen"} ↓</a></div>
    </section>
    {isMowerDirectory && <section className="section related-guides">
      <div className="section-heading">
        <p className="eyebrow">Einstieg nach Gartenproblem</p>
        <h2>Vier Situationen, bei denen die Technik wirklich zählt</h2>
        <p>Diese Auswahl führt direkt zu den Vergleichen, die typische offene Fragen beantworten. Die übrigen Kombinationen bleiben weiter unten vollständig zugänglich.</p>
      </div>
      <div className="guide-grid">
        {MOWER_ENTRY_POINTS.map((entry) => <Link className="guide-card" href={entry.href} key={entry.href}>
          <span className="guide-number">{entry.label}</span>
          <h2>{entry.title}</h2>
          <p>{entry.description}</p>
          <span className="card-link">Vergleich lesen →</span>
        </Link>)}
      </div>
    </section>}
    <div id="vergleiche">
      {pairs.map(([pairSlug, pairLabel]) => {
        const guides = directory.guides.filter((guide) => guide.pairSlug === pairSlug);
        return <section className="directory-section directory-section--cluster project-example-group" key={pairSlug}>
          <div className="section-heading"><div><p className="eyebrow">Direkter Vergleich</p><h2>{pairLabel}</h2></div><p>{isMowerDirectory ? MOWER_PAIR_INTROS[pairSlug] : "Zehn konkrete Nutzungen mit eigener Gewichtung, Gegenprobe, Checkliste und Quellen."}</p></div>
          <div className="project-example-grid">
            {guides.map((guide) => <article className="project-example-card" key={guide.slug}>
              <h3>{guide.contextLabel}</h3>
              <div className="project-example-card__facts">
                <p><span>{guide.optionA}</span>{score(guide.scoreA)} von 5</p>
                <p><span>{guide.optionB}</span>{score(guide.scoreB)} von 5</p>
              </div>
              <Link className="text-link" href={`/ratgeber/vergleiche/${guide.topicSlug}/${guide.slug}/`}>Vergleich öffnen →</Link>
            </article>)}
          </div>
        </section>;
      })}
    </div>
    <section className="topic-boundary"><div><p className="eyebrow">Keine Scheingenauigkeit</p><h2>{isMowerDirectory ? "Ein Empfangsrisiko wiegt mehr als ein Punktvorsprung" : "Die Matrix sortiert und gibt nicht frei."}</h2></div><p>{topic.boundary} Ein höherer Orientierungswert darf kein nicht erfülltes Muss-Kriterium überstimmen.</p></section>
  </>;
}
