import { notFound } from "next/navigation";
import { CarportReport } from "@/components/data-report/project/CarportReports";
import { DrywallReport } from "@/components/data-report/project/DrywallReports";
import { GreenhouseReport } from "@/components/data-report/project/GreenhouseReports";
import { PrivacyReport } from "@/components/data-report/project/PrivacyReports";
import { TerraceReport } from "@/components/data-report/project/TerraceReports";
import { DATA_REPORTS } from "@/lib/data-report/registry";
import { createPageMetadata } from "@/lib/metadata";

const PROJECT_TOPICS = new Set(["carport", "gewaechshaus", "sichtschutz", "terrasse", "trockenbau"]);
const projectReports = DATA_REPORTS.filter((report) => PROJECT_TOPICS.has(report.topic));

export const dynamicParams = false;

export function generateStaticParams() {
  return projectReports.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = projectReports.find((item) => item.slug === slug);
  if (!report) return {};
  return createPageMetadata({ title: report.title, description: report.description, path: report.path, kind: "article", modifiedTime: report.updatedAt });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = projectReports.find((item) => item.slug === slug);
  if (!report) notFound();

  const info = { slug: report.slug, path: report.path, title: report.title, description: report.description };
  if (report.topic === "carport") return <CarportReport info={info} />;
  if (report.topic === "gewaechshaus") return <GreenhouseReport info={info} />;
  if (report.topic === "sichtschutz") return <PrivacyReport info={info} />;
  if (report.topic === "terrasse") return <TerraceReport info={info} />;
  if (report.topic === "trockenbau") return <DrywallReport info={info} />;
  notFound();
}
