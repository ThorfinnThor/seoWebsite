import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://machplan.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "MachPlan – Haus- und Gartenprojekte besser planen", template: "%s | MachPlan" },
  description: "Deterministische Planer für Haus und Garten: Bedarf berechnen, Anforderungen verstehen und passende Produkte finden.",
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
              <Link href="/garten/gartenhaus-planer/">Planer starten</Link>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="footer-grid">
            <div><Link className="brand brand--footer" href="/"><span className="brand-mark" aria-hidden="true">M</span><span>MachPlan</span></Link><p>Klare Entscheidungen für Haus und Garten – ohne versteckte Verkaufslogik.</p></div>
            <div><h2>Planen</h2><Link href="/garten/gartenhaus-planer/">Gartenhaus-Planer</Link><Link href="/garten/gartenhaus-groesse/">Größe bestimmen</Link><Link href="/garten/gartenhaus-kosten/">Kosten verstehen</Link></div>
            <div><h2>Wichtig</h2><p>MachPlan ersetzt keine Genehmigungs-, Statik- oder Fundamentberatung. Prüfe örtliche Vorgaben und Herstellerangaben.</p></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} MachPlan · Arbeitsname</span><span>Transparent · Deterministisch · Statisch</span></div>
        </footer>
      </body>
    </html>
  );
}
