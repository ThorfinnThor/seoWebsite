import { describe, expect, it } from "vitest";
import { getTopicLinkGroups, resolveTopicForPage, TOPIC_CLUSTERS } from "./internal-links";
import { ALL_SITEMAP_ENTRIES } from "./sitemap-entries";
import { SEO_TOPICS } from "./seo-topics";
import { SITE } from "./site";

const sitemapPaths = new Set(ALL_SITEMAP_ENTRIES.map((entry) => entry.url.replace(SITE.url.replace(/\/$/, ""), "")));

describe("topic internal links", () => {
  it("defines a cluster for every topic", () => {
    for (const topic of SEO_TOPICS) expect(TOPIC_CLUSTERS[topic.slug]).toBeDefined();
  });

  it("only promotes indexable sitemap URLs", () => {
    for (const topic of SEO_TOPICS) {
      for (const group of getTopicLinkGroups(topic.slug, topic.plannerHref)) {
        for (const link of group.links) expect(sitemapPaths.has(link.href), `${topic.slug}: ${link.href}`).toBe(true);
      }
    }
  });

  it("never links a page to itself", () => {
    for (const topic of SEO_TOPICS) {
      const hrefs = getTopicLinkGroups(topic.slug, topic.plannerHref).flatMap((group) => group.links.map((link) => link.href));
      expect(hrefs).not.toContain(topic.plannerHref);
      expect(new Set(hrefs).size).toBe(hrefs.length);
    }
  });

  it("resolves topics for calculators, cluster guides, Ratgeber and directories", () => {
    expect(resolveTopicForPage("/haus/innenausbau/trockenbau-rechner/")?.slug).toBe("trockenbau");
    expect(resolveTopicForPage("/garten/carport-groesse/")?.slug).toBe("carport");
    expect(resolveTopicForPage("/ratgeber/trockenbau-schallschutzwand/")?.slug).toBe("trockenbau");
    expect(resolveTopicForPage("/ratgeber/vergleiche/terrasse/")?.slug).toBe("terrasse");
    expect(resolveTopicForPage("/ratgeber/gartenhaus-mit-boden-worauf-achten/", "/garten/gartenhaus-boden/")?.slug).toBe("gartenhaus");
    expect(resolveTopicForPage("/ratgeber/sicherheitskameras/wlan-oder-poe/")).toBeUndefined();
  });
});
