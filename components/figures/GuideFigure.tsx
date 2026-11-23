import type { ReactNode } from "react";

/**
 * Scale drawings for guides. Every figure is drawn from the numbers used in
 * the text next to it, so a changed calculation needs a changed drawing.
 */

type FigureProps = { title: string; caption: string; width: number; height: number; children: ReactNode };

function Figure({ title, caption, width, height, children }: FigureProps) {
  return (
    <figure className="guide-figure">
      <div className="guide-figure__canvas">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>{children}</svg>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** Horizontal dimension line with end ticks and a centred label. */
function DimX({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g className="dim">
      <path d={`M${x1} ${y}H${x2}M${x1} ${y - 6}v12M${x2} ${y - 6}v12`} />
      <text x={(x1 + x2) / 2} y={y - 8} textAnchor="middle">{label}</text>
    </g>
  );
}

function DimY({ x, y1, y2, label }: { x: number; y1: number; y2: number; label: string }) {
  const middle = (y1 + y2) / 2;
  return (
    <g className="dim">
      <path d={`M${x} ${y1}V${y2}M${x - 6} ${y1}h12M${x - 6} ${y2}h12`} />
      <text x={x - 10} y={middle} textAnchor="middle" transform={`rotate(-90 ${x - 10} ${middle})`}>{label}</text>
    </g>
  );
}

const range = (count: number) => Array.from({ length: count }, (_, index) => index);

function BikeShedFigure() {
  // 1 m = 110 px
  const m = 110;
  const left = 80;
  const top = 46;
  const width = 3.0 * m;
  const depth = 2.85 * m;
  return (
    <Figure title="Grundriss mit sechs Fahrrädern in einer Reihe" width={620} height={440} caption="Grundriss 3,00 × 2,85 m innen: sechs Räder mit 50 cm Abstand, jedes zweite Vorderrad angehoben. Der 1 m breite Gang bleibt frei.">
      <rect className="wall" x={left} y={top} width={width} height={depth} />
      <rect className="zone" x={left} y={top + 1.85 * m} width={width} height={1.0 * m} />
      <text className="label" x={left + width / 2} y={top + 2.35 * m + 5} textAnchor="middle">Gang</text>
      {range(6).map((index) => {
        const centre = left + (0.25 + index * 0.5) * m;
        const raised = index % 2 === 1;
        return (
          <g key={index} className={raised ? "part part--soft" : "part"}>
            <path d={`M${centre} ${top + 12}V${top + 1.85 * m - 8}`} strokeWidth={5} strokeLinecap="round" />
            <path d={`M${centre - 0.32 * m} ${top + (raised ? 0.42 : 0.62) * m}h${0.64 * m}`} strokeWidth={4} strokeLinecap="round" />
            <path d={`M${centre - 7} ${top + 1.2 * m}h14`} strokeWidth={7} strokeLinecap="round" />
          </g>
        );
      })}
      <path className="opening" d={`M${left + 0.6 * m} ${top + depth}h${1.8 * m}`} />
      <text className="label" x={left + width / 2} y={top + depth + 24} textAnchor="middle">Doppeltür</text>
      <DimX x1={left} x2={left + width} y={26} label="3,00 m" />
      <DimY x={56} y1={top} y2={top + 1.85 * m} label="1,85 m" />
      <DimY x={56} y1={top + 1.85 * m} y2={top + depth} label="1,00 m" />
      <g className="legend">
        <path className="part" d="M440 90h34" strokeWidth={5} /><text x={486} y={95}>am Boden</text>
        <path className="part part--soft" d="M440 122h34" strokeWidth={5} /><text x={486} y={127}>angehoben</text>
        <text x={440} y={166}>Lenker 64 cm breit</text>
        <text x={440} y={190}>50 cm je Rad</text>
      </g>
    </Figure>
  );
}

function BoardDirectionFigure() {
  const m = 44;
  const width = 6 * m;
  const height = 4 * m;
  const top = 64;
  const second = 350;
  return (
    <Figure title="Terrasse 6 mal 4 Meter mit Dielen in beiden Richtungen" width={660} height={320} caption="Gleiche Fläche, gleiche 4-m-Dielen. Links läuft jede Diele durch, rechts braucht jede der 27 Reihen einen Stoß (rot).">
      <text className="label label--strong" x={40} y={28}>Dielen laufen 4 m</text>
      <rect className="wall" x={40} y={top} width={width} height={height} />
      {range(39).map((index) => <path key={index} className="thin" d={`M${40 + ((index + 1) * width) / 40} ${top}v${height}`} />)}
      <text className="label label--strong" x={second} y={28}>Dielen laufen 6 m</text>
      <rect className="wall" x={second} y={top} width={width} height={height} />
      {range(26).map((index) => <path key={index} className="thin" d={`M${second} ${top + ((index + 1) * height) / 27}h${width}`} />)}
      {range(27).map((index) => {
        const y = top + (index * height) / 27;
        return <path key={index} className="alert" d={`M${second + (index % 2 ? 2 : 4) * m} ${y}v${height / 27}`} />;
      })}
      <DimX x1={40} x2={40 + width} y={top + height + 34} label="6,00 m" />
      <DimX x1={second} x2={second + width} y={top + height + 34} label="6,00 m" />
      <DimY x={24} y1={top} y2={top + height} label="4,00 m" />
      <text className="label" x={40} y={50}>40 Reihen, kein Stoß</text>
      <text className="label" x={second} y={50}>27 Reihen, 27 Stöße</text>
    </Figure>
  );
}

function WallThreeMetreFigure() {
  const m = 130;
  const left = 90;
  const top = 50;
  const studs = [0, 0.625, 1.25, 1.875, 2.5, 3.0];
  return (
    <Figure title="Ansicht einer Trockenbauwand mit drei Metern Länge" width={620} height={440} caption="Ansicht 3,00 × 2,50 m: sechs Ständer im 62,5-cm-Raster, das letzte Feld misst 50 cm. Gestrichelt die Plattenkanten der Vorderseite.">
      <rect className="wall" x={left} y={top} width={3 * m} height={2.5 * m} />
      <path className="part" strokeWidth={7} d={`M${left} ${top + 4}h${3 * m}M${left} ${top + 2.5 * m - 4}h${3 * m}`} />
      {studs.map((x) => <path key={x} className="part part--soft" strokeWidth={7} d={`M${left + Math.min(Math.max(x * m, 4), 3 * m - 4)} ${top + 8}v${2.5 * m - 16}`} />)}
      {[1.25, 2.5].map((x) => <path key={x} className="dash" d={`M${left + x * m} ${top}v${2.5 * m}`} />)}
      <DimX x1={left} x2={left + 3 * m} y={30} label="3,00 m" />
      <DimY x={62} y1={top} y2={top + 2.5 * m} label="2,50 m" />
      <DimX x1={left} x2={left + 0.625 * m} y={top + 2.5 * m + 34} label="62,5" />
      <DimX x1={left + 2.5 * m} x2={left + 3 * m} y={top + 2.5 * m + 34} label="50" />
      <g className="legend">
        <path className="part" d="M505 90h26" strokeWidth={7} /><text x={540} y={95}>UW</text>
        <path className="part part--soft" d="M505 122h26" strokeWidth={7} /><text x={540} y={127}>CW</text>
        <path className="dash" d="M505 154h26" /><text x={540} y={159}>Platte</text>
      </g>
    </Figure>
  );
}

function WallDoorFigure() {
  const m = 120;
  const left = 80;
  const top = 46;
  const doorLeft = 1.5;
  const doorWidth = 1.0;
  const bottom = top + 2.5 * m;
  const lintel = bottom - 2.1 * m;
  return (
    <Figure title="Ansicht einer Trockenbauwand mit Türöffnung" width={640} height={420} caption="Verstärkte Ständer neben der Tür, Sturzprofil darüber. Die Plattenfuge (gestrichelt) liegt über dem Sturz und nie auf der Linie der Türpfosten.">
      <rect className="wall" x={left} y={top} width={4 * m} height={2.5 * m} />
      {[0, 0.625, 1.25, 3.125, 3.75, 4].map((x) => <path key={x} className="part part--soft" strokeWidth={6} d={`M${left + Math.min(Math.max(x * m, 4), 4 * m - 4)} ${top}V${bottom}`} />)}
      {[doorLeft, doorLeft + doorWidth].map((x) => <path key={x} className="part" strokeWidth={9} d={`M${left + x * m} ${top}V${bottom}`} />)}
      <path className="part" strokeWidth={7} d={`M${left + doorLeft * m} ${lintel}h${doorWidth * m}`} />
      <path className="part part--soft" strokeWidth={6} d={`M${left + (doorLeft + 0.5) * m} ${top}V${lintel}`} />
      <rect className="void" x={left + doorLeft * m + 5} y={lintel + 5} width={doorWidth * m - 10} height={2.1 * m - 5} />
      <path className="dash" d={`M${left + (doorLeft + 0.5) * m} ${top}V${lintel}`} />
      <text className="label" x={left + 2 * m} y={lintel + 1.05 * m} textAnchor="middle">Türöffnung</text>
      <text className="label" x={left + 2 * m} y={lintel + 1.05 * m + 20} textAnchor="middle">1,0 × 2,1 m</text>
      <DimX x1={left} x2={left + 4 * m} y={28} label="4,00 m" />
      <DimY x={54} y1={top} y2={bottom} label="2,50 m" />
      <g className="legend">
        <path className="part" d={`M${left} ${bottom + 36}h26`} strokeWidth={9} /><text x={left + 36} y={bottom + 41}>Türständer und Sturz</text>
        <path className="part part--soft" d={`M${left + 220} ${bottom + 36}h26`} strokeWidth={6} /><text x={left + 256} y={bottom + 41}>CW-Ständer</text>
        <path className="dash" d={`M${left + 370} ${bottom + 36}h26`} /><text x={left + 406} y={bottom + 41}>Fuge</text>
      </g>
    </Figure>
  );
}

function FenceFigure() {
  const m = 56;
  const left = 30;
  const post = 0.09 * m;
  const rows = [
    { y: 62, title: "Fünf volle Elemente, 46 cm bleiben offen", fields: range(5).map(() => 1.8) },
    { y: 172, title: "Fünf volle plus ein Endfeld mit 37 cm", fields: [...range(5).map(() => 1.8), 0.37] },
    { y: 282, title: "Sechs gleich gekürzte Felder mit 1,56 m", fields: range(6).map(() => 9.37 / 6) },
  ];
  return (
    <Figure title="Drei Aufteilungen für zehn Meter Sichtschutz" width={620} height={390} caption="10 m in drei Varianten, Pfosten 9 cm (dunkel). Zum schmalen Endfeld gehört ein siebter Pfosten.">
      {rows.map((row) => {
        let x = left;
        const shapes: ReactNode[] = [<rect key="p0" className="solid" x={x} y={row.y} width={post} height={58} />];
        x += post;
        row.fields.forEach((field, index) => {
          shapes.push(<rect key={`f${index}`} className="panel" x={x} y={row.y + 4} width={field * m} height={50} />);
          x += field * m;
          shapes.push(<rect key={`p${index + 1}`} className="solid" x={x} y={row.y} width={post} height={58} />);
          x += post;
        });
        const end = left + 10 * m;
        return (
          <g key={row.title}>
            <text className="label label--strong" x={left} y={row.y - 12}>{row.title}</text>
            {shapes}
            {end - x > 4 && <rect className="gap" x={x} y={row.y + 4} width={end - x} height={50} />}
            <path className="ground" d={`M${left} ${row.y + 58}H${end}`} />
          </g>
        );
      })}
      <DimX x1={left} x2={left + 10 * m} y={372} label="10,00 m" />
    </Figure>
  );
}

function CarportFigure() {
  const m = 100;
  const left = 110;
  const ground = 330;
  const inner = 3.55 * m;
  const post = 0.12 * m;
  const carLeft = left + post + 0.75 * m;
  return (
    <Figure title="Querschnitt eines Carports für einen SUV" width={640} height={420} caption="Querschnitt: 2,05 m Spiegelbreite plus 75 cm Ausstieg je Seite ergeben 3,55 m zwischen den Pfosten. Dach und Außenmaß sind breiter.">
      <path className="ground" d={`M60 ${ground}H580`} />
      <path className="part" strokeWidth={10} d={`M${left - 34} ${ground - 2.62 * m}H${left + inner + 2 * post + 34}`} />
      <rect className="solid" x={left} y={ground - 2.55 * m} width={post} height={2.55 * m} />
      <rect className="solid" x={left + post + inner} y={ground - 2.55 * m} width={post} height={2.55 * m} />
      <g className="car">
        <rect x={carLeft + 0.12 * m} y={ground - 1.12 * m} width={1.81 * m} height={0.82 * m} rx={14} />
        <path d={`M${carLeft + 0.3 * m} ${ground - 1.12 * m}l${0.16 * m} ${-0.54 * m}h${1.13 * m}l${0.16 * m} ${0.54 * m}z`} />
        <rect x={carLeft} y={ground - 1.18 * m} width={0.14 * m} height={0.14 * m} rx={4} />
        <rect x={carLeft + 1.91 * m} y={ground - 1.18 * m} width={0.14 * m} height={0.14 * m} rx={4} />
        <rect x={carLeft + 0.24 * m} y={ground - 0.36 * m} width={0.28 * m} height={0.36 * m} rx={6} />
        <rect x={carLeft + 1.53 * m} y={ground - 0.36 * m} width={0.28 * m} height={0.36 * m} rx={6} />
        <rect className="soft" x={carLeft + 0.55 * m} y={ground - 2.18 * m} width={0.95 * m} height={0.42 * m} rx={10} />
      </g>
      <text className="label" x={carLeft + 1.02 * m} y={ground - 1.94 * m} textAnchor="middle">Dachbox</text>
      <DimX x1={left + post} x2={left + post + inner} y={ground + 70} label="3,55 m lichte Breite" />
      <DimX x1={left + post} x2={carLeft} y={ground + 34} label="0,75" />
      <DimX x1={carLeft} x2={carLeft + 2.05 * m} y={ground + 34} label="2,05 m" />
      <DimX x1={carLeft + 2.05 * m} x2={left + post + inner} y={ground + 34} label="0,75" />
      <DimY x={left - 46} y1={ground - 2.4 * m} y2={ground} label="2,40 m" />
      <path className="dash" d={`M${left - 46} ${ground - 2.4 * m}H${left + post + inner}`} />
    </Figure>
  );
}

function GreenhouseFigure() {
  const m = 120;
  const left = 100;
  const top = 50;
  return (
    <Figure title="Grundriss eines Gewächshauses mit zwei mal drei Metern" width={620} height={340} caption="Grundriss 2,0 × 3,0 m innen: zwei Beete mit 65 cm, dazwischen 70 cm Weg. Sechs Tomaten je Beet stehen 50 cm auseinander.">
      <rect className="wall" x={left} y={top} width={3 * m} height={2 * m} />
      <rect className="bed" x={left} y={top} width={3 * m} height={0.65 * m} />
      <rect className="bed" x={left} y={top + 1.35 * m} width={3 * m} height={0.65 * m} />
      {range(6).flatMap((index) => [0.325, 1.675].map((y) => <circle key={`${index}-${y}`} className="plant" cx={left + (0.25 + index * 0.5) * m} cy={top + y * m} r={15} />))}
      <text className="label" x={left + 1.5 * m} y={top + m + 5} textAnchor="middle">Weg 70 cm</text>
      <path className="opening" d={`M${left + 3 * m} ${top + 0.65 * m}v${0.7 * m}`} />
      <text className="label" x={left + 3 * m + 14} y={top + m + 5}>Tür</text>
      <DimX x1={left} x2={left + 3 * m} y={30} label="3,00 m" />
      <DimY x={72} y1={top} y2={top + 0.65 * m} label="0,65" />
      <DimY x={72} y1={top + 0.65 * m} y2={top + 1.35 * m} label="0,70" />
      <DimY x={72} y1={top + 1.35 * m} y2={top + 2 * m} label="0,65" />
    </Figure>
  );
}

function WallLayersFigure() {
  const layer = (x: number, y: number, height: number, className: string, key: string) => <rect key={key} className={className} x={x} y={y} width={470} height={height} />;
  const wall = (y: number, layers: number, title: string) => {
    const board = 16;
    const cavity = 64;
    const total = layers * 2 * board + cavity;
    return (
      <g>
        <text className="label label--strong" x={40} y={y - 14}>{title}</text>
        {range(layers).map((index) => layer(40, y + index * board, board, "board", `a${index}`))}
        {layer(40, y + layers * board, cavity, "insulation", "i")}
        {range(layers).map((index) => layer(40, y + layers * board + cavity + index * board, board, "board", `b${index}`))}
        {[0, 1, 2].map((index) => <path key={index} className="part" strokeWidth={5} fill="none" d={`M${70 + index * 200} ${y + layers * board + 3}h26M${70 + index * 200} ${y + layers * board + 3}v${cavity - 6}h26`} />)}
        {layers === 1
          ? <path className="alert" d={`M270 ${y}v${board}`} />
          : <path className="alert" d={`M270 ${y}v${board}M400 ${y + board}v${board}`} />}
        <text className="label" x={524} y={y + total / 2 + 5}>{layers === 1 ? "eine Lage" : "zwei Lagen"}</text>
      </g>
    );
  };
  return (
    <Figure title="Schnitt durch eine einfach und eine doppelt beplankte Wand" width={640} height={330} caption="Schnitt von oben. Bei zwei Lagen liegen die Fugen (rot) versetzt, deshalb bleibt die Fläche auch an der Fuge geschlossen. Schematisch, nicht maßstäblich.">
      {wall(50, 1, "Einfach beplankt")}
      {wall(190, 2, "Doppelt beplankt")}
    </Figure>
  );
}

function LaminateFigure() {
  const m = 96;
  const left = 80;
  const top = 44;
  const rows = 20;
  const rowHeight = (4 * m) / rows;
  const plank = 1.29;
  return (
    <Figure title="Verlegeplan für einen Raum mit fünf mal vier Metern" width={640} height={470} caption="Raum 5 × 4 m: Jede Reihe beginnt mit dem Reststück der vorigen. So bleibt wenig Verschnitt, und die Stöße liegen versetzt.">
      <rect className="wall" x={left} y={top} width={5 * m} height={4 * m} />
      {range(rows - 1).map((index) => <path key={index} className="thin" d={`M${left} ${top + (index + 1) * rowHeight}h${5 * m}`} />)}
      {range(rows).flatMap((row) => {
        const offset = (row * 0.42) % plank || plank;
        return range(5).map((index) => offset + index * plank).filter((x) => x > 0.05 && x < 4.95).map((x) => <path key={`${row}-${x}`} className="thin thin--strong" d={`M${left + x * m} ${top + row * rowHeight}v${rowHeight}`} />);
      })}
      <path className="opening" d={`M${left + 3.6 * m} ${top + 4 * m}h${0.9 * m}`} />
      <text className="label" x={left + 4.05 * m} y={top + 4 * m + 24} textAnchor="middle">Tür 0,9 m</text>
      <DimX x1={left} x2={left + 5 * m} y={26} label="5,00 m" />
      <DimY x={54} y1={top} y2={top + 4 * m} label="4,00 m" />
    </Figure>
  );
}

const FIGURES: Record<string, () => ReactNode> = {
  "/ratgeber/gartenhaus-fuer-sechs-fahrraeder/": BikeShedFigure,
  "/ratgeber/terrassendielen-laengs-oder-quer/": BoardDirectionFigure,
  "/ratgeber/trockenbauwand-3-meter/": WallThreeMetreFigure,
  "/ratgeber/trockenbauwand-mit-tuer/": WallDoorFigure,
  "/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/": WallLayersFigure,
  "/ratgeber/sichtschutz-10-meter-berechnen/": FenceFigure,
  "/ratgeber/carport-fuer-suv/": CarportFigure,
  "/ratgeber/gewaechshaus-klein-2x3-meter/": GreenhouseFigure,
  "/ratgeber/laminat-fuer-20-qm/": LaminateFigure,
};

export const GUIDE_FIGURE_PATHS = Object.keys(FIGURES);

export function guideFigureFor(path: string) {
  const Drawing = FIGURES[path];
  return Drawing ? <Drawing /> : null;
}
