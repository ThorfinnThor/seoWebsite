import { PlannerIcon } from "@/components/icons/PlannerIcon";
import { getPlanner, type PlannerId } from "@/lib/planners";

export function PlannerHeroSummary({ planner: plannerId }: { planner: PlannerId }) {
  const planner = getPlanner(plannerId);

  return (
    <aside className="planner-outcomes" aria-label={`Ergebnisse des ${planner.title}`}>
      <div className="planner-outcomes-heading">
        <span className="planner-outcomes-icon"><PlannerIcon name={planner.icon} /></span>
        <div><span>Der Rechner liefert</span><strong>Deinen konkreten Planungsrahmen</strong></div>
      </div>
      <ul>
        {planner.outputs.map((output) => <li key={output}><span aria-hidden="true">✓</span>{output}</li>)}
      </ul>
    </aside>
  );
}
