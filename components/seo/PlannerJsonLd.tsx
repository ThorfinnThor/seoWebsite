import { SITE } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export function PlannerJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  const url = `${SITE.url.replace(/\/$/, "")}${path}`;
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
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        publisher: { "@type": "Person", name: "Schayan Yousefian" },
      }}
    />
  );
}
