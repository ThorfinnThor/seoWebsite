import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "MachPlan – Haus- und Gartenprojekte besser planen", template: "%s | MachPlan" },
  description: SITE.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <a className="skip-link" href="#main">Zum Inhalt springen</a>
        <header className="site-header">
          <div className="nav-wrap">
            <Link className="brand" href="/" aria-label="MachPlan Startseite"><span className="brand-mark" aria-hidden="true">M</span><span>MachPlan</span></Link>
            <nav aria-label="Hauptnavigation">
              <Link href="/garten/">Garten</Link>
              <Link href="/haus/raumklima/">Raumklima</Link>
              <Link href="/garten/gartenhaus-planer/">Planer starten</Link>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="footer-grid">
            <div><Link className="brand brand--footer" href="/"><span className="brand-mark" aria-hidden="true">M</span><span>MachPlan</span></Link><p>Klare Entscheidungen für Haus und Garten – ohne versteckte Verkaufslogik.</p></div>
            <div><h2>Planen</h2><Link href="/garten/gartenhaus-planer/">Gartenhaus-Planer</Link><Link href="/garten/gartenhaus-groesse/">Größe bestimmen</Link><Link href="/garten/gartenhaus-kosten/">Kosten verstehen</Link></div>
            <div><h2>Weitere Rechner</h2><Link href="/haus/raumklima/luftentfeuchter-rechner/">Luftentfeuchter</Link><Link href="/garten/bewaesserungs-planer/">Bewässerung</Link></div>
            <div><h2>Wichtig</h2><p>MachPlan ersetzt keine Genehmigungs-, Statik-, Gesundheits- oder Fachplanung. Prüfe örtliche Vorgaben und Herstellerangaben.</p></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} MachPlan · Arbeitsname</span><span>Transparent · Deterministisch · Statisch</span></div>
        </footer>
      </body>
    </html>
  );
}
