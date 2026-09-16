import { absoluteUrl, SITE } from "@/lib/site";
import { LEGAL } from "@/lib/legal";
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
            publisher: { "@id": `${siteRoot}/#organization` },
            about: { "@id": `${siteRoot}/#organization` },
          },
          {
            "@type": "Person",
            "@id": `${siteRoot}/#author`,
            name: "Schayan Yousefian",
            url: absoluteUrl("/ueber-passendplanen/"),
            description: "Gründer und redaktionell Verantwortlicher von PassendPlanen.",
            knowsAbout: [
              "Bedarfsermittlung für Haus und Garten",
              "Deterministische Planungsrechner",
              "Datenbasierte Produktvergleiche",
            ],
          },
          {
            "@type": "Organization",
            "@id": `${siteRoot}/#organization`,
            name: SITE.name,
            url: `${siteRoot}/`,
            description: SITE.description,
            logo: absoluteUrl("/brand/passendplanen-icon.png"),
            image: absoluteUrl("/brand/passendplanen-icon.png"),
            founder: { "@id": `${siteRoot}/#author` },
            publishingPrinciples: absoluteUrl("/methodik/"),
            areaServed: { "@type": "Country", name: "Deutschland" },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: LEGAL.email,
              availableLanguage: "German",
            },
          },
        ],
      }}
    />
  );
}
