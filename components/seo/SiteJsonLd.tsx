import { SITE } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export function SiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${SITE.url}/#website`,
            url: SITE.url,
            name: SITE.name,
            description: SITE.description,
            inLanguage: "de-DE",
            publisher: { "@id": `${SITE.url}/#publisher` },
          },
          {
            "@type": "Person",
            "@id": `${SITE.url}/#publisher`,
            name: "Schayan Yousefian",
            url: SITE.url,
          },
        ],
      }}
    />
  );
}
