import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og.js";
import { PlannerIcon } from "@/components/icons/PlannerIcon";
import { PLANNERS, type PlannerDirectoryItem } from "@/lib/planners";
import { SITE } from "@/lib/site";

const outputDirectory = path.join(process.cwd(), "public", "social");

await mkdir(outputDirectory, { recursive: true });

await Promise.all([
  renderCard({
    id: "passendplanen",
    title: "Haus und Garten passend planen",
    category: "Rechner und Ratgeber",
    description: "Konkrete Maße, Mengen und Auswahlkriterien für dein Projekt.",
  }),
  ...PLANNERS.map((planner) => renderCard({
    id: planner.id,
    title: planner.title,
    category: planner.category.replace(" · ", "  •  "),
    description: planner.homeDescription,
    planner,
  })),
]);

console.log(`Generated ${PLANNERS.length + 1} social preview images.`);

async function renderCard({ id, title, category, description, planner }: { id: string; title: string; category: string; description: string; planner?: PlannerDirectoryItem }) {
  const response = new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", padding: "62px 68px", color: "#17231d", background: "#f7f6f0", fontFamily: "sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", position: "absolute", width: "430px", height: "430px", right: "-90px", top: "-120px", borderRadius: "999px", background: "#d8f27a" }} />
      <div style={{ display: "flex", position: "absolute", width: "310px", height: "310px", right: "85px", bottom: "-155px", borderRadius: "999px", border: "2px solid rgba(23,77,58,.16)" }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "810px", height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "17px", fontSize: "27px", fontWeight: 800, color: "#174d3a" }}>
          <span style={{ display: "flex", width: "47px", height: "47px", alignItems: "center", justifyContent: "center", borderRadius: "13px", color: "#d8f27a", background: "#174d3a", fontSize: "23px" }}>P</span>
          {SITE.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", marginBottom: "18px", color: "#276f55", fontSize: "20px", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>{category}</div>
          <div style={{ display: "flex", maxWidth: "820px", fontSize: title.length > 29 ? "64px" : "76px", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-.045em" }}>{title}</div>
          <div style={{ display: "flex", maxWidth: "760px", marginTop: "24px", color: "#526059", fontSize: "26px", lineHeight: 1.35 }}>{description}</div>
        </div>
        <div style={{ display: "flex", color: "#276f55", fontSize: "20px", fontWeight: 750 }}>passendplanen.de</div>
      </div>
      <div style={{ display: "flex", position: "absolute", right: "82px", top: "115px", width: "230px", height: "230px", alignItems: "center", justifyContent: "center", borderRadius: "50px", color: "#d8f27a", background: "#174d3a", boxShadow: "0 30px 70px rgba(23,35,29,.18)" }}>
        {planner ? <PlannerIcon name={planner.icon} className="" style={{ width: 142, height: 142 }} /> : <svg viewBox="0 0 48 48" width="142" height="142" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 37h34M10 37V19l14-11 14 11v18M17 37V25h14v12" /><path d="M8 14h7M33 14h7M24 4v7" /></svg>}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
  const image = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(outputDirectory, `${id}.png`), image);
}
