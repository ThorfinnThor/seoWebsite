import Link from "next/link";
import { PlannerIcon } from "@/components/icons/PlannerIcon";
import { PLANNERS } from "@/lib/planners";

export default function HomePage() {
  return (
    <>
      <section className="hero hero--home">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Haus & Garten, klar geplant</p>
            <h1>Erst verstehen, was du brauchst. <em>Dann</em> Produkte vergleichen.</h1>
            <p className="hero-copy">MachPlan übersetzt dein Projekt in nachvollziehbare Anforderungen und filtert nur Produkte, die wirklich dazu passen.</p>
            <div className="hero-actions">
              <Link className="button button--primary" href="/rechner/">Alle 10 Rechner ansehen <span aria-hidden="true">→</span></Link>
              <Link className="text-link" href="#rechner">Direkt auswählen</Link>
            </div>
          </div>
          <div className="hero-visual" aria-label="Vom Vorhaben zur passenden Auswahl">
            <div className="plan-card plan-card--one"><span>01</span><strong>Dein Projekt</strong><small>Platz, Nutzung, Budget</small></div>
            <div className="plan-line" aria-hidden="true" />
            <div className="plan-card plan-card--two"><span>02</span><strong>Klare Anforderungen</strong><small>Berechnet & erklärt</small></div>
            <div className="plan-line" aria-hidden="true" />
            <div className="plan-card plan-card--three"><span>03</span><strong>Passende Produkte</strong><small>Geprüft & vergleichbar</small></div>
          </div>
        </div>
      </section>
      <section className="trust-strip" aria-label="MachPlan Prinzipien"><div><strong>Keine Blackbox</strong><span>Jede Empfehlung wird begründet.</span></div><div><strong>Keine Provision im Score</strong><span>Dein Bedarf entscheidet.</span></div><div><strong>Keine falsche Präzision</strong><span>Grenzen werden klar benannt.</span></div></section>
      <section className="section projects-section" id="rechner">
        <div className="section-heading"><p className="eyebrow">Zehn Planungswerkzeuge</p><h2>Wähle direkt deinen Rechner.</h2><p>Berechne den Bedarf zuerst. Produktangebote werden später nur dort ergänzt, wo Daten und Kompatibilität geprüft sind.</p></div>
        <div className="feature-grid">
          {PLANNERS.map((planner) => (
            <Link className="feature-card" href={planner.href} key={planner.id}>
              <div className="feature-icon" aria-hidden="true"><PlannerIcon name={planner.icon} /></div>
              <div><span className="status-pill">{planner.shortCategory}</span><h3>{planner.title}</h3><p>{planner.homeDescription}</p><span className="card-link">{planner.cta} →</span></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section method"><div><p className="eyebrow">So funktioniert es</p><h2>Ein guter Kauf beginnt mit harten Kriterien.</h2></div><ol><li><span>1</span><div><h3>Bedarf erfassen</h3><p>5–10 Fragen statt endloser Filterlisten.</p></div></li><li><span>2</span><div><h3>Anforderungen berechnen</h3><p>Transparente Planungsheuristiken, klar als solche markiert.</p></div></li><li><span>3</span><div><h3>Kompatibilität prüfen</h3><p>Unpassende Produkte werden vor der Bewertung ausgeschlossen.</p></div></li></ol></section>
    </>
  );
}
