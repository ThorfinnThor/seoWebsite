import type { PropsWithChildren, ReactNode } from "react";

export function CalculatorShell({
  step,
  totalSteps,
  title,
  intro,
  label = "Projektplaner",
  onReset,
  children,
}: PropsWithChildren<{ step: number; totalSteps: number; title: string; intro?: ReactNode; label?: string; onReset?: () => void }>) {
  const progress = Math.round((step / totalSteps) * 100);
  return (
    <section className="calculator-shell" aria-labelledby="calculator-heading">
      <div className="calculator-progress" aria-label={`Schritt ${step} von ${totalSteps}`}>
        <div className="progress-copy"><span>Schritt {step} von {totalSteps}</span><span>{progress}%</span></div>
        <div className="progress-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      </div>
      <div className="calculator-body">
        <p className="eyebrow">{label}</p>
        <h2 id="calculator-heading" className="focus-target" tabIndex={-1}>{title}</h2>
        {intro && <div className="calculator-intro">{intro}</div>}
        {onReset && <div className="session-note"><span>Eingaben bleiben nur in diesem Browser-Tab gespeichert.</span><button type="button" onClick={onReset}>Zurücksetzen</button></div>}
        {children}
      </div>
    </section>
  );
}
