import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Sicherheitskameras für Haus und Grundstück planen",
  description: "Vier fundierte Ratgeber zu Verbindung, Stromversorgung, Kamerazahl und Datenschutz bei privaten Sicherheitskameras.",
  path: "/ratgeber/sicherheitskameras/",
  modifiedTime: "2026-09-08",
});

const guides = [
  {
    href: "/ratgeber/sicherheitskameras/wlan-oder-poe/",
    eyebrow: "Verbindung",
    title: "WLAN Kamera oder PoE Kamera",
    text: "Die vorhandene Verkabelung, die Funkstrecke und der gewünschte Wartungsaufwand entscheiden mehr als ein pauschaler Technikvergleich.",
  },
  {
    href: "/ratgeber/sicherheitskameras/akku-solar-oder-netzstrom/",
    eyebrow: "Versorgung",
    title: "Akku, Solar oder Netzstrom",
    text: "Stromquelle, Montageort und Aufzeichnungsart werden gemeinsam betrachtet, einschließlich der Arbeit nach der Montage.",
  },
  {
    href: "/ratgeber/sicherheitskameras/wie-viele-kameras-einfamilienhaus/",
    eyebrow: "Blickwinkel",
    title: "Wie viele Kameras braucht ein Einfamilienhaus",
    text: "Eine Begehung entlang der Grundstücksgrenze führt zu einer belastbareren Zahl als die Wohnfläche oder die Länge des Hauses.",
  },
  {
    href: "/ratgeber/sicherheitskameras/private-videoueberwachung-datenschutz/",
    eyebrow: "Verantwortung",
    title: "Private Videoüberwachung und Datenschutz",
    text: "Bildbereich, Zweck, Information und Speicherdauer werden anhand offizieller deutscher Hinweise eingeordnet.",
  },
] as const;

export default function Page() {
  return <>
    <section className="page-hero camera-hub-hero">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Sicherheitskameras" }]} />
      <p className="eyebrow">Sicherheitskameras sinnvoll planen</p>
      <h1>Vier Fragen, die vor dem Produktvergleich geklärt gehören.</h1>
      <p>Eine Kamera kann technisch überzeugen und am vorgesehenen Ort trotzdem unpraktisch sein. Diese Ratgeber betrachten die Installation aus vier verschiedenen Richtungen und führen anschließend in den passenden Finder.</p>
    </section>
    <section className="directory-section camera-hub-directory">
      <div className="directory-grid camera-hub-grid">
        {guides.map((guide, index) => <article className="directory-card" key={guide.href}>
          <p className="eyebrow">{String(index + 1).padStart(2, "0")} {guide.eyebrow}</p>
          <h2>{guide.title}</h2>
          <p>{guide.text}</p>
          <Link className="text-link" href={guide.href}>Ratgeber lesen →</Link>
        </article>)}
      </div>
    </section>
    <section className="guide-cta">
      <div><p className="eyebrow">Konkrete Auswahl</p><h2>Die technischen Pflichtkriterien direkt anwenden.</h2><p>Der Finder vergleicht verfügbare Modelle mit deinem Einsatzort, der Verbindung und der gewünschten Versorgung.</p></div>
      <Link className="button button--light" href="/haus/sicherheit/sicherheitskamera-finder/">Kamera Finder öffnen →</Link>
    </section>
  </>;
}
