import Link from "next/link";
import { getTopicLinkGroups } from "@/lib/internal-links";
import { getSeoTopic } from "@/lib/seo-topics";
import { editorializeText } from "@/lib/editorial-style";

type TopicLinksProps = {
  topicSlug: string;
  currentPath: string;
  /** Links that the page already shows prominently and that should not repeat. */
  exclude?: readonly string[];
  /** "section" renders a standalone page section, "inline" fits inside a guide article. */
  layout?: "section" | "inline";
};

export function TopicLinks({ topicSlug, currentPath, exclude = [], layout = "section" }: TopicLinksProps) {
  const topic = getSeoTopic(topicSlug);
  const excluded = new Set(exclude.map((href) => (href.endsWith("/") ? href : `${href}/`)));
  const groups = getTopicLinkGroups(topicSlug, currentPath)
    .map((group) => ({ ...group, links: group.links.filter((link) => !excluded.has(link.href)) }))
    .filter((group) => group.links.length > 0);
  if (!topic || groups.length === 0) return null;
  const titleId = `topic-links-${topicSlug}`;

  const body = <>
    <div className="section-heading">
      <p className="eyebrow">Mehr zum Thema</p>
      <h2 id={titleId}>{topic.name}. Alle passenden Inhalte</h2>
      <p>Rechner, Grundlagen, Szenarien und geprüfte Vergleiche zum selben Projekt. So lassen sich Annahmen gegenprüfen, bevor bestellt oder beauftragt wird.</p>
    </div>
    <div className="topic-links-groups">
      {groups.map((group) => <div className="topic-links-group" key={group.id}>
        <h3>{group.title}</h3>
        <ul>
          {group.links.map((link) => <li key={link.href}>
            <Link href={link.href}>{editorializeText(link.label)}</Link>
            {link.description && <span>{editorializeText(link.description)}</span>}
          </li>)}
        </ul>
      </div>)}
    </div>
  </>;

  return layout === "inline"
    ? <section className="topic-links topic-links--inline" aria-labelledby={titleId}>{body}</section>
    : <section className="section topic-links" aria-labelledby={titleId}>{body}</section>;
}
