import { absoluteUrl, SITE } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export function SiteJsonLd() {
  const siteRoot = SITE.url.replace(/\/$/, "");
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${siteRoot}/#website`,
            url: `${siteRoot}/`,
            name: SITE.name,
            description: SITE.description,
            inLanguage: "de-DE",
            publisher: { "@id": `${siteRoot}/#publisher` },
          },
          {
            "@type": "Person",
            "@id": `${siteRoot}/#publisher`,
            name: "Schayan Yousefian",
            url: absoluteUrl("/ueber-passendplanen/"),
          },
        ],
      }}
    />
  );
}
