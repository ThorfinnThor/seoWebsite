import Link from "next/link";

export type ReportMetric = {
  value: string;
  label: string;
  note?: string;
};

export function ReportMetricGrid({ items, ariaLabel }: { items: readonly ReportMetric[]; ariaLabel: string }) {
  return <dl className="data-metric-grid" aria-label={ariaLabel}>
    {items.map((item) => <div key={item.label}>
      <dd>{item.value}</dd>
      <dt>{item.label}</dt>
      {item.note ? <p>{item.note}</p> : null}
    </div>)}
  </dl>;
}

export type ReportBar = {
  label: string;
  value: number;
  displayValue: string;
  detail?: string;
};

export function ReportBarList({ items, maxValue, ariaLabel }: { items: readonly ReportBar[]; maxValue?: number; ariaLabel: string }) {
  const scale = maxValue ?? Math.max(...items.map((item) => item.value), 1);
  return <ul className="data-bar-list" aria-label={ariaLabel}>
    {items.map((item) => <li key={item.label}>
      <div><strong>{item.label}</strong><span>{item.displayValue}</span></div>
      <div className="data-bar-track" aria-hidden="true"><span style={{ width: `${Math.max(2, (item.value / scale) * 100)}%` }} /></div>
      {item.detail ? <p>{item.detail}</p> : null}
    </li>)}
  </ul>;
}

export function ReportMethod({ updated, children }: { updated: string; children: React.ReactNode }) {
  return <aside className="data-method" aria-label="Methodik der Datenauswertung">
    <p className="eyebrow">So wurde ausgewertet</p>
    <h2>Stand und Grenzen der Daten</h2>
    <div>{children}</div>
    <p className="data-method-date">Datenstand {updated}</p>
  </aside>;
}

export function DataReportLinks({ items }: { items: readonly { href: string; label: string; description: string }[] }) {
  return <nav className="data-report-links" aria-label="Passende Rechner und Ratgeber">
    {items.map((item) => <Link href={item.href} key={item.href}><strong>{item.label}</strong><span>{item.description}</span></Link>)}
  </nav>;
}
