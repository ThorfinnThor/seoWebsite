import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Über PassendPlanen",
  description: "Wer PassendPlanen entwickelt, wie Rechner, Datenauswertungen und Ratgeber entstehen und welche Grenzen bei der Nutzung gelten.",
  path: "/ueber-passendplanen/",
  modifiedTime: "2026-09-16",
});

export default function UeberPage() {
  return (
    <article className="about-page">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": absoluteUrl("/ueber-passendplanen/"),
        url: absoluteUrl("/ueber-passendplanen/"),
        name: "Über PassendPlanen und Schayan Yousefian",
        dateModified: "2026-09-16",
        inLanguage: "de-DE",
        mainEntity: {
          "@type": "Person",
          "@id": `${absoluteUrl("/")}#author`,
          name: "Schayan Yousefian",
          url: absoluteUrl("/ueber-passendplanen/"),
          jobTitle: "Gründer und redaktionell Verantwortlicher",
          worksFor: { "@id": `${absoluteUrl("/")}#organization` },
          knowsAbout: ["Bedarfsermittlung für Haus und Garten", "Deterministische Planungsrechner", "Datenbasierte Produktvergleiche"],
        },
      }} />
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Über PassendPlanen" }]} />
      <header><p className="eyebrow">Wer hinter PassendPlanen steht</p><h1>Gute Entscheidungen beginnen <em>vor</em> dem Produktvergleich.</h1><p>Ich bin Schayan Yousefian und entwickle sowie betreue PassendPlanen redaktionell. Die Website übersetzt Projekte rund um Haus und Garten in nachvollziehbare Anforderungen. Eine mögliche Verkaufsprovision verändert weder Berechnungen noch fachliche Auswahlregeln.</p></header>
      <section className="about-statement"><p>„Nicht das Produkt mit der besten Vermarktung soll gewinnen, sondern das Produkt, das nach den verfügbaren Daten zum beschriebenen Bedarf passt.“</p></section>
      <section className="method-detail"><div><p className="eyebrow">Was heute verfügbar ist</p><h2>Rechner, Produktdaten und eigene Auswertungen greifen ineinander.</h2></div><div><p>PassendPlanen bietet zwölf kostenlose Planungswerkzeuge. Dazu gehören Rechner für Haus und Garten sowie die Auswahl und Speicherplanung von Sicherheitskameras. Geprüfte Produktdaten ergänzen die Berechnung dort, wo ein passendes Angebot belastbar eingeordnet werden kann.</p><p>In 21 Datenauswertungen werden Sortiment, technische Eigenschaften, Preise und Datenlücken sichtbar gemacht. Diese Seiten sind keine unabhängigen Labortests und bilden nicht den gesamten Markt ab.</p><Link className="text-link" href="/ratgeber/daten/">Datenauswertungen ansehen →</Link></div></section>
      <section className="method-detail"><div><p className="eyebrow">Redaktionelle Verantwortung</p><h2>Wie Inhalte entstehen und wer sie verantwortet.</h2></div><div><p>Ich entscheide über Themen, Berechnungslogik und Veröffentlichung. Technische Aussagen werden möglichst auf Herstellerunterlagen, amtliche Informationen oder anerkannte Fachquellen gestützt. Händlerdaten werden vor der öffentlichen Verwendung gegen Pflichtfelder und Plausibilitätsregeln geprüft.</p><p>Wo PassendPlanen eigene Reserven oder Klassengrenzen verwendet, werden diese als Heuristik kenntlich gemacht. Fehlende Daten bleiben unbekannt. Sie werden nicht durch Vermutungen ergänzt.</p><Link className="text-link" href="/methodik/">Methodik und Prüfregeln lesen →</Link></div></section>
      <section className="method-detail"><div><p className="eyebrow">Korrekturen</p><h2>Hinweise werden geprüft und nachvollziehbar eingearbeitet.</h2></div><div><p>Fachliche Inhalte tragen ein Prüfdatum. Ändert sich eine Berechnung, Quelle oder wesentliche Aussage, wird dieses Datum aktualisiert. Eine reine Layoutänderung erhält kein künstlich neues Inhaltsdatum.</p><p>Hinweise zu fehlerhaften Angaben oder veralteten Quellen können über den Kontakt im Impressum gemeldet werden.</p><Link className="text-link" href="/impressum/">Kontakt öffnen →</Link></div></section>
    </article>
  );
}
