import type { Metadata } from "next";
import Link from "next/link";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "MachPlan – Haus- und Gartenprojekte besser planen", template: "%s | MachPlan" },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE.name,
    title: "MachPlan – Haus- und Gartenprojekte besser planen",
    description: SITE.description,
  },
  twitter: { card: "summary", title: "MachPlan", description: SITE.description },
  category: "Haus und Garten",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <SiteJsonLd />
        <a className="skip-link" href="#main">Zum Inhalt springen</a>
        <header className="site-header">
          <div className="nav-wrap">
            <Link className="brand" href="/" aria-label="MachPlan Startseite"><span className="brand-mark" aria-hidden="true">M</span><span>MachPlan</span></Link>
            <nav aria-label="Hauptnavigation">
              <Link href="/garten/">Garten</Link>
              <Link href="/haus/">Haus</Link>
              <Link href="/rechner/">Alle Planer</Link>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="footer-grid">
            <div><Link className="brand brand--footer" href="/"><span className="brand-mark" aria-hidden="true">M</span><span>MachPlan</span></Link><p>Klare Entscheidungen für Haus und Garten – ohne versteckte Verkaufslogik.</p></div>
            <div><h2>Planen</h2><Link href="/rechner/">Alle Rechner & Planer</Link><Link href="/garten/gartenhaus-planer/">Gartenhaus-Planer</Link><Link href="/garten/gewaechshaus-planer/">Gewächshaus</Link><Link href="/garten/carport-planer/">Carport</Link><Link href="/garten/terrassen-dielen-rechner/">Terrassendielen</Link><Link href="/garten/sichtschutz-planer/">Sichtschutz</Link></div>
            <div><h2>Weitere Rechner</h2><Link href="/haus/boden/bodenbelag-rechner/">Bodenbelag</Link><Link href="/haus/innenausbau/trockenbau-rechner/">Trockenbau</Link><Link href="/haus/raumklima/luftentfeuchter-rechner/">Luftentfeuchter</Link><Link href="/garten/bewaesserungs-planer/">Bewässerung</Link><Link href="/garten/maehroboter-rechner/">Mähroboter</Link></div>
            <div><h2>MachPlan</h2><Link href="/ueber-machplan/">Über das Projekt</Link><Link href="/methodik/">Methodik</Link><Link href="/affiliate-transparenz/">Affiliate-Transparenz</Link></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} MachPlan · Arbeitsname</span><span className="footer-legal"><Link href="/impressum/">Impressum</Link><Link href="/datenschutz/">Datenschutz</Link></span></div>
        </footer>
      </body>
    </html>
  );
}
