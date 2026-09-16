import Link from "next/link";
import type { GuideDataInsight } from "@/lib/guide-data-insights";

export function GuideDataInsightBlock({ insight }: { insight: GuideDataInsight }) {
  const maxMagnitude = Math.max(...insight.rows.map((row) => row.magnitude ?? 0), 1);

  return <section className={`guide-data guide-data--${insight.layout}`} aria-labelledby={`guide-data-${insight.topic}`}>
    <div className="guide-data-heading">
      <div>
        <p className="eyebrow">{insight.eyebrow}</p>
        <h2 id={`guide-data-${insight.topic}`}>{insight.title}</h2>
      </div>
      <p>{insight.intro}</p>
    </div>

    <dl className="guide-data-metrics">
      {insight.metrics.map((metric) => <div key={metric.label}>
        <dd>{metric.value}</dd>
        <dt>{metric.label}</dt>
        {metric.note ? <p>{metric.note}</p> : null}
      </div>)}
    </dl>

    {insight.layout === "mix" || insight.layout === "coverage" ? (
      <div className="guide-data-bars">
        {insight.rows.map((row) => <article key={row.label}>
          <div><strong>{row.label}</strong><span>{row.values.join("  ·  ")}</span></div>
          <div aria-hidden="true"><span style={{ width: `${Math.max(2, ((row.magnitude ?? 0) / maxMagnitude) * 100)}%` }} /></div>
          {row.note ? <p>{row.note}</p> : null}
        </article>)}
      </div>
    ) : insight.layout === "duel" ? (
      <div className="guide-data-duel">
        {insight.rows.map((row) => <article key={row.label}>
          <h3>{row.label}</h3>
          <dl>{row.values.map((value, index) => <div key={`${row.label}-${insight.columns?.[index] ?? index}`}><dt>{insight.columns?.[index]}</dt><dd>{value}</dd></div>)}</dl>
          {row.note ? <p>{row.note}</p> : null}
        </article>)}
      </div>
    ) : (
      <div className="guide-table-wrap guide-data-table">
        <table>
          <thead><tr><th scope="col">Einordnung</th>{insight.columns?.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
          <tbody>{insight.rows.map((row) => <tr key={row.label}>
            <th scope="row"><strong>{row.label}</strong>{row.note ? <span>{row.note}</span> : null}</th>
            {row.values.map((value, index) => <td key={`${row.label}-${insight.columns?.[index] ?? index}`}>{value}</td>)}
          </tr>)}</tbody>
        </table>
      </div>
    )}

    <div className="guide-data-reading">
      <div><strong>Was sich daraus ableiten lässt</strong><p>{insight.conclusion}</p></div>
      <div><strong>Grenze der Auswertung</strong><p>{insight.caveat}</p></div>
    </div>
    <p className="guide-data-source">Datenstand {insight.updatedLabel}. <Link href={insight.reportHref}>{insight.reportLabel} →</Link></p>
  </section>;
}
