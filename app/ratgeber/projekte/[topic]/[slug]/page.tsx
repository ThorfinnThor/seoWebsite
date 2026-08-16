import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/seo/GuidePage";
import { createPageMetadata } from "@/lib/metadata";
import { getProjectExample, PROJECT_EXAMPLES } from "@/lib/project-examples";
import { getSeoTopic } from "@/lib/seo-topics";

export function generateStaticParams() {
  return PROJECT_EXAMPLES.map((example) => ({ topic: example.topicSlug, slug: example.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string; slug: string }> }): Promise<Metadata> {
  const { topic, slug } = await params;
  const example = getProjectExample(topic, slug);
  return example ? createPageMetadata({
    title: example.title,
    description: example.description,
    path: `/ratgeber/projekte/${example.topicSlug}/${example.slug}/`,
    kind: "article",
  }) : {};
}

export default async function Page({ params }: { params: Promise<{ topic: string; slug: string }> }) {
  const { topic: topicSlug, slug } = await params;
  const example = getProjectExample(topicSlug, slug);
  if (!example) notFound();
  const topic = getSeoTopic(example.topicSlug);
  if (!topic) notFound();
  return <GuidePage
    {...example}
    path={`/ratgeber/projekte/${example.topicSlug}/${example.slug}/`}
    updated="August 2026"
    breadcrumbs={[
      { label: "Start", href: "/" },
      { label: "Ratgeber", href: "/ratgeber/" },
      { label: topic.name, href: `/ratgeber/thema/${topic.slug}/` },
      { label: "Projektbeispiele", href: `/ratgeber/projekte/${topic.slug}/` },
      { label: example.heading },
    ]}
  />;
}

