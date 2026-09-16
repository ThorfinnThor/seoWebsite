import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ReportMethod } from "./DataReportBlocks";
import { createDataReportStructuredData } from "@/lib/data-report/structured-data";

type ProjectReportFrameProps = {
  path: string;
  title: string;
  description: string;
  topicLabel: string;
  eyebrow: string;
  headline: React.ReactNode;
  introduction: string;
  takeawayTitle: string;
  takeaway: string;
  className: string;
  updated: string;
  datasetName: string;
  datasetDescription: string;
  datasetSize: number;
  variables: readonly string[];
  method: React.ReactNode;
  nextTitle: string;
  nextText: string;
  plannerHref: string;
  plannerLabel: string;
  children: React.ReactNode;
};

export function ProjectReportFrame(props: ProjectReportFrameProps) {
  return <main className={`data-report-page ${props.className}`}>
    <JsonLd data={createDataReportStructuredData({ path: props.path, title: props.title, description: props.description, datasetName: props.datasetName, datasetDescription: props.datasetDescription, datasetSize: props.datasetSize, variables: props.variables, updatedAt: "2026-09-16" })} />
    <header className={`data-report-hero ${props.className}-hero`}>
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, { label: "Datenauswertungen", href: "/ratgeber/daten/" }, { label: props.topicLabel }]} />
      <div className="data-report-hero-grid">
        <div><p className="eyebrow">{props.eyebrow}</p><h1>{props.headline}</h1><p>{props.introduction}</p></div>
        <aside><strong>{props.takeawayTitle}</strong><p>{props.takeaway}</p></aside>
      </div>
    </header>
    {props.children}
    <ReportMethod updated={props.updated}>{props.method}</ReportMethod>
    <section className="data-report-section data-next-step">
      <div><p className="eyebrow">Mit den eigenen Maßen weiterarbeiten</p><h2>{props.nextTitle}</h2><p>{props.nextText}</p></div>
      <Link className="button button--primary" href={props.plannerHref}>{props.plannerLabel} →</Link>
    </section>
  </main>;
}
