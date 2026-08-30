"use client";

import { useEffect, useRef, type PropsWithChildren, type ReactNode } from "react";
import Link from "next/link";
import { trackAnalyticsEvent } from "@/lib/analytics";
import type { PlannerId } from "@/lib/planners";

export function CalculatorShell({
  step,
  totalSteps,
  title,
  planner,
  intro,
  label = "Projektplaner",
  onReset,
  children,
}: PropsWithChildren<{ step: number; totalSteps: number; title: string; planner: PlannerId; intro?: ReactNode; label?: string; onReset?: () => void }>) {
  const progress = Math.round((step / totalSteps) * 100);
  const previousStep = useRef(step);

  useEffect(() => {
    const previous = previousStep.current;
    if (previous === 1 && step > 1) {
      trackAnalyticsEvent("planner_started", { planner, total_steps: totalSteps });
    }
    if (previous < totalSteps && step === totalSteps) {
      trackAnalyticsEvent("planner_completed", { planner, total_steps: totalSteps });
    }
    previousStep.current = step;
  }, [planner, step, totalSteps]);

  function reset() {
    trackAnalyticsEvent("planner_reset", { planner, step });
    onReset?.();
  }
  return (
    <section className="calculator-shell" aria-labelledby="calculator-heading">
      <div className="calculator-progress" role="progressbar" aria-label={`Schritt ${step} von ${totalSteps}`} aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={step}>
        <div className="progress-copy"><span>Schritt {step} von {totalSteps}</span><span>{progress}%</span></div>
        <div className="progress-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      </div>
      <div className="calculator-body">
        <p className="eyebrow">{label}</p>
        <h2 id="calculator-heading" className="focus-target" tabIndex={-1}>{title}</h2>
        {intro && <div className="calculator-intro">{intro}</div>}
        {onReset && <div className="session-note"><span>Eingaben bleiben nur in diesem Browser-Tab gespeichert.</span><button type="button" onClick={reset}>Zurücksetzen</button></div>}
        <div className="calculator-use-note" role="note">
          <strong>Unverbindliche Planungshilfe</strong>
          <p>Dieser Rechner dient der allgemeinen Information und Vorplanung. Prüfe Maße, Mengen, Eignung, Herstellerangaben und örtliche Vorgaben vor einem Kauf oder einer Ausführung selbst oder mit einer geeigneten Fachperson. Triff keine Entscheidung allein auf Grundlage des Ergebnisses.</p>
          <Link href="/nutzungshinweise/">Nutzungshinweise und Haftung</Link>
        </div>
        {children}
      </div>
    </section>
  );
}
