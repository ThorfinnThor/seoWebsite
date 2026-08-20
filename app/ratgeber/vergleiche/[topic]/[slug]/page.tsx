import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/seo/GuidePage";
import { DECISION_GUIDES, getDecisionGuide } from "@/lib/decision-guides";
import { createPageMetadata } from "@/lib/metadata";
import { getSeoTopic } from "@/lib/seo-topics";

export function generateStaticParams() {
  return DECISION_GUIDES.map((guide) => ({ topic: guide.topicSlug, slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string; slug: string }> }): Promise<Metadata> {
  const { topic, slug } = await params;
  const guide = getDecisionGuide(topic, slug);
  return guide ? createPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/ratgeber/vergleiche/${guide.topicSlug}/${guide.slug}/`,
    kind: "article",
  }) : {};
}

export default async function Page({ params }: { params: Promise<{ topic: string; slug: string }> }) {
  const { topic: topicSlug, slug } = await params;
  const guide = getDecisionGuide(topicSlug, slug);
  if (!guide) notFound();
  const topic = getSeoTopic(guide.topicSlug);
  if (!topic) notFound();
  return <GuidePage
    {...guide}
    path={`/ratgeber/vergleiche/${guide.topicSlug}/${guide.slug}/`}
    updated="August 2026"
    breadcrumbs={[
      { label: "Start", href: "/" },
      { label: "Ratgeber", href: "/ratgeber/" },
      { label: "Direkte Vergleiche", href: "/ratgeber/vergleiche/" },
      { label: topic.name, href: `/ratgeber/vergleiche/${topic.slug}/` },
      { label: guide.title },
    ]}
  />;
}
