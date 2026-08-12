"use client";

import { useState } from "react";
import Link from "next/link";
import { PlannerIcon } from "@/components/icons/PlannerIcon";
import { PLANNERS } from "@/lib/planners";

type PlannerFilter = "all" | "garden" | "house";

const FILTERS: readonly { value: PlannerFilter; label: string }[] = [
  { value: "all", label: "Alle" },
  { value: "garden", label: "Garten" },
  { value: "house", label: "Haus" },
];

export function PlannerDirectory() {
  const [filter, setFilter] = useState<PlannerFilter>("all");
  const planners = filter === "all" ? PLANNERS : PLANNERS.filter((planner) => planner.area === filter);

  return (
    <section className="section tool-directory" aria-labelledby="planner-directory-heading">
      <div className="tool-directory-header">
        <div><p className="eyebrow">Direkt auswählen</p><h2 id="planner-directory-heading">Alle Rechner im Überblick</h2></div>
        <div className="tool-filters" aria-label="Rechner nach Bereich filtern">
          {FILTERS.map((item) => {
            const count = item.value === "all" ? PLANNERS.length : PLANNERS.filter((planner) => planner.area === item.value).length;
            return <button type="button" className="tool-filter" aria-pressed={filter === item.value} onClick={() => setFilter(item.value)} key={item.value}>{item.label} <span>{count}</span></button>;
          })}
        </div>
      </div>
      <p className="tool-filter-status" aria-live="polite">{planners.length} {planners.length === 1 ? "Rechner" : "Rechner"} angezeigt</p>
      <div className="tool-grid" aria-label="Verfügbare Planer">
        {planners.map((planner) => <article className="tool-card" key={planner.id}>
          <div className="tool-card-top"><span className="feature-icon" aria-hidden="true"><PlannerIcon name={planner.icon} /></span><span className="status-pill">{planner.category}</span></div>
          <h3>{planner.title}</h3>
          <p>{planner.description}</p>
          <p className="tool-card-results-label">Das Ergebnis:</p>
          <ul>{planner.outputs.map((output) => <li key={output}><span aria-hidden="true">✓</span>{output}</li>)}</ul>
          <Link className="button button--primary" href={planner.href}>{planner.cta} →</Link>
        </article>)}
      </div>
    </section>
  );
}
