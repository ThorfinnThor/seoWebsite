import type { PlannerIconName } from "@/lib/planners";
import type { CSSProperties } from "react";

type PlannerIconProps = {
  name: PlannerIconName;
  className?: string;
  style?: CSSProperties;
};

export function PlannerIcon({ name, className = "planner-icon-svg", style }: PlannerIconProps) {
  const common = {
    className,
    style,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "garden-house":
      return <svg {...common}><path d="M7 22 24 7l17 15v19H7Z" /><path d="M18 41V27h12v14M13 17V9h6v3" /></svg>;
    case "dehumidifier":
      return <svg {...common}><rect x="9" y="5" width="30" height="38" rx="5" /><path d="M15 12h18M15 17h18M24 23s-7 8-7 12a7 7 0 0 0 14 0c0-4-7-12-7-12Z" /></svg>;
    case "irrigation":
      return <svg {...common}><path d="M7 39h34M24 39V27M18 27h12M11 23c2-5 6-8 11-9M37 23c-2-5-6-8-11-9M7 30c3-7 8-12 15-14M41 30c-3-7-8-12-15-14" /><path d="M11 27v2M37 27v2M16 21v2M32 21v2" /></svg>;
    case "terrace":
      return <svg {...common}><path d="M6 11h36v9H6zM6 20h36v9H6zM6 29h36v9H6zM17 11v9M31 20v9M21 29v9" /></svg>;
    case "privacy-screen":
      return <svg {...common}><path d="M7 8v34M41 8v34M24 8v34M7 13h34M7 23h34M7 33h34" /><path d="M4 42h6M21 42h6M38 42h6" /></svg>;
    case "flooring":
      return <svg {...common}><path d="M6 8h21v10H6zM27 8h15v10H27zM6 18h12v11H6zM18 18h24v11H18zM6 29h23v11H6zM29 29h13v11H29z" /></svg>;
    case "greenhouse":
      return <svg {...common}><path d="M5 42h38M8 42V22L24 6l16 16v20M24 6v36M8 22h32M16 42V28h16v14" /><path d="M24 36c-5 0-8-3-8-7 5 0 8 3 8 7Zm0 0c5 0 8-3 8-7-5 0-8 3-8 7Z" /></svg>;
    case "robot-mower":
      return <svg {...common}><path d="M9 18h28l4 10v7a5 5 0 0 1-5 5H12a5 5 0 0 1-5-5v-7l2-10Z" /><path d="m17 18 3-7h8l3 7M14 40v3M34 40v3M14 30h20" /><circle cx="24" cy="30" r="5" /><path d="m21 33 6-6M27 33l-6-6" /></svg>;
    case "carport":
      return <svg {...common}><path d="M5 18 20 8h23M9 18h34M10 18v24M40 18v24" /><path d="M15 35h24l-3-8H21l-6 8Z" /><circle cx="21" cy="37" r="3" /><circle cx="34" cy="37" r="3" /></svg>;
    case "drywall":
      return <svg {...common}><path d="M7 6h34v36H7zM17 6v36M31 6v36M7 16h10M31 16h10M17 29h14" /><circle cx="11" cy="11" r="1" fill="currentColor" stroke="none" /><circle cx="36" cy="36" r="1" fill="currentColor" stroke="none" /></svg>;
  }
}
