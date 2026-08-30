import { getPlanner, type PlannerId } from "@/lib/planners";

export function PlannerDiagram({ planner: plannerId }: { planner: PlannerId }) {
  const planner = getPlanner(plannerId);
  const descriptionId = `diagram-${plannerId}-description`;
  const patternId = `diagram-${plannerId}-grid`;

  return (
    <svg className="planner-diagram" viewBox="0 0 360 176" role="img" aria-label={`${planner.title} als Planungsskizze`} aria-describedby={descriptionId}>
      <desc id={descriptionId}>Eine eigens gezeichnete schematische Darstellung der wichtigsten Maße und Planungsbereiche.</desc>
      <defs>
        <pattern id={patternId} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="currentColor" strokeOpacity=".07" />
        </pattern>
      </defs>
      <rect width="360" height="176" rx="18" fill={`url(#${patternId})`} />
      <g className="planner-diagram__drawing">{drawingFor(plannerId)}</g>
    </svg>
  );
}

function drawingFor(planner: PlannerId) {
  switch (planner) {
    case "garden-house":
      return <><path d="M88 74l72-44 72 44v68H88z" /><path d="M137 142V96h46v46M74 151h172M74 151l8-5m-8 5 8 5m164-5-8-5m8 5-8 5" /><circle cx="202" cy="92" r="12" /><path d="M62 72v70m0-70-5 8m5-8 5 8m-5 62-5-8m5 8 5-8" /><text x="128" y="169">Stellfläche</text><text x="38" y="112" transform="rotate(-90 38 112)">Höhe</text></>;
    case "dehumidifier":
      return <><path d="M70 33h220v116H70zM95 126V72h56v54z" /><path d="M181 63c18 10 18 24 0 34s-18 24 0 34M218 57c18 10 18 24 0 34s-18 24 0 34" /><path d="M112 45c-10 15-13 21-13 28a13 13 0 0026 0c0-7-3-13-13-28z" /><circle cx="258" cy="76" r="13" /><path d="M258 63v13l8 7" /><text x="179" y="166">Luftweg und Raumvolumen</text></>;
    case "irrigation":
      return <><path d="M61 136h238M87 136V88h186v48M117 88V58m62 30V42m63 46V61" /><path d="M105 74l12-16 12 16M167 58l12-16 12 16M230 77l12-16 12 16" /><circle cx="87" cy="136" r="8" /><circle cx="273" cy="136" r="8" /><path d="M61 151h238" /><text x="119" y="169">Zonen und Leitungswege</text></>;
    case "terrace":
      return <><path d="M71 45h218v98H71zM71 62h218M71 79h218M71 96h218M71 113h218M71 130h218M112 45v98m68-98v98m68-98v98" /><path d="M71 155h218m-218 0 8-5m-8 5 8 5m210-5-8-5m8 5-8 5" /><text x="133" y="172">Dielen und Fugen</text></>;
    case "privacy-screen":
      return <><path d="M67 139h226M82 139V42m66 97V42m66 97V42m66 97V42M90 54h50v72H90zM156 54h50v72h-50zM222 54h50v72h-50z" /><path d="M82 153h198m-198 0 8-5m-8 5 8 5m190-5-8-5m8 5-8 5" /><text x="119" y="170">Felder und Pfosten</text></>;
    case "flooring":
      return <><path d="M66 38h228v105H66zM66 64h228M66 90h228M66 116h228M108 38v26m69 0v26m-42 0v26m86-78v26m38 26v26m-62 0v27" /><path d="M77 154h206" /><text x="115" y="170">Fläche und Verlegerichtung</text></>;
    case "greenhouse":
      return <><path d="M69 140h222M87 140V76l43-43h100l43 43v64M87 76h186M130 33v107m100-107v107M180 33v107M87 104h186" /><path d="M57 151h246" /><text x="116" y="169">Grundfläche und Wege</text></>;
    case "robot-mower":
      return <><path d="M68 45c41-23 86 6 119-5 36-13 91-6 104 37 13 45-22 71-62 69-38-2-58 12-101 3-44-9-77-64-60-104z" /><path d="M102 120c22-35 45-63 81-44 31 17 36 54 74 38" strokeDasharray="7 7" /><circle cx="105" cy="119" r="15" /><path d="M95 119h20m-10-10v20" /><path d="M72 157h216" /><text x="116" y="172">Fläche und Engstellen</text></>;
    case "carport":
      return <><path d="M67 65h226l-28-31H95zM84 65v82m192-82v82M130 65v82m100-82v82" /><path d="M108 128l14-31h89l25 31v12H108zM129 97l11-19h55l16 19" /><circle cx="137" cy="140" r="10" /><circle cx="211" cy="140" r="10" /><path d="M67 157h226" /><text x="117" y="173">Lichte Maße und Zufahrt</text></>;
    case "drywall":
      return <><path d="M72 36h216v111H72zM111 36v111m39-111v111m39-111v111m39-111v111m39-111v111M72 57h216M72 126h216" /><path d="M82 156h196" /><text x="113" y="172">Platten und Ständerwerk</text></>;
  }
}
