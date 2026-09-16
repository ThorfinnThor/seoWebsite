import type { ReactNode } from "react";

export function ResultInterpretation({ title, children }: { title: string; children: ReactNode }) {
  return <section className="result-interpretation">
    <p className="eyebrow">Einordnung deines Ergebnisses</p>
    <h3>{title}</h3>
    <p>{children}</p>
  </section>;
}
