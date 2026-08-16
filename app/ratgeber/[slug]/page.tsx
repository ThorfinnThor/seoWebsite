import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/seo/GuidePage";
import { createPageMetadata } from "@/lib/metadata";
import { getSeoGuide, SEO_GUIDES } from "@/lib/seo-guides";
import { getSeoTopicForGuide } from "@/lib/seo-topics";

export function generateStaticParams() {
  return SEO_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const guide = getSeoGuide(slug);
    return guide ? createPageMetadata({ title: guide.title, description: guide.description, path: `/ratgeber/${guide.slug}/`, kind: "article" }) : {};
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getSeoGuide((await params).slug);
  if (!guide) notFound();
  const topic = getSeoTopicForGuide(guide);
  return <GuidePage {...guide} path={`/ratgeber/${guide.slug}/`} updated="August 2026" breadcrumbs={[{ label: "Start", href: "/" }, { label: "Ratgeber", href: "/ratgeber/" }, ...(topic ? [{ label: topic.name, href: `/ratgeber/thema/${topic.slug}/` }] : []), { label: guide.heading }]} />;
}
