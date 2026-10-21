import Link from "next/link";
import { getPlannerGuide } from "@/lib/planner-guides";
import type { PlannerId } from "@/lib/planners";

export function PlannerGuide({ planner }: { planner: PlannerId }) {
  const guide = getPlannerGuide(planner);
  if (!guide) return null;
  const titleId = `${planner}-guide-title`;

  return (
    <section className="section planner-guide" aria-labelledby={titleId}>
      <div className="section-heading">
        <p className="eyebrow">{guide.eyebrow}</p>
        <h2 id={titleId}>{guide.title}</h2>
        <p>{guide.intro}</p>
      </div>
      <div className="planner-guide-body">
        {guide.sections.map((section) => (
          <article key={section.title}>
            <h3>{section.title}</h3>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            {section.table && (
              <div className="planner-guide-table-wrap">
                <table className="planner-guide-table">
                  <caption className="planner-guide-caption">{section.table.caption}</caption>
                  <thead><tr>{section.table.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
                  <tbody>{section.table.rows.map((row) => <tr key={row.join("|")}>{row.map((cell, index) => index === 0 ? <th scope="row" key={index}>{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
            )}
            {section.links && <p>{section.links.map((link, index) => <span key={link.href}>{index > 0 && " · "}<Link className="text-link" href={link.href}>{link.label} →</Link></span>)}</p>}
          </article>
        ))}
        <p className="planner-guide-note">{guide.note}</p>
      </div>
    </section>
  );
}
