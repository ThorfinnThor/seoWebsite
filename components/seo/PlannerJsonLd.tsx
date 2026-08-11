import { SITE } from "@/lib/site";
import { CONTENT_UPDATED_AT } from "@/lib/metadata";
import { PLANNERS } from "@/lib/planners";
import { JsonLd } from "./JsonLd";

export function PlannerJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  const url = `${SITE.url.replace(/\/$/, "")}${path}`;
  const planner = PLANNERS.find((candidate) => candidate.href === path);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description,
        url,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        inLanguage: "de-DE",
        dateModified: CONTENT_UPDATED_AT,
        isAccessibleForFree: true,
        ...(planner ? { featureList: planner.outputs } : {}),
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        publisher: { "@type": "Person", "@id": `${SITE.url.replace(/\/$/, "")}/#publisher`, name: "Schayan Yousefian" },
        isPartOf: { "@type": "WebSite", "@id": `${SITE.url.replace(/\/$/, "")}/#website` },
      }}
    />
  );
}
