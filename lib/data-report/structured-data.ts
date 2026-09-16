import { absoluteUrl } from "@/lib/site";

type DataReportStructuredDataInput = {
  path: string;
  title: string;
  description: string;
  datasetName: string;
  datasetDescription: string;
  variables: readonly string[];
  updatedAt: string;
  publishedAt?: string;
  datasetSize?: number;
};

export function dataReportDatasetId(path: string) {
  return `${absoluteUrl(path)}#dataset`;
}

export function createDataReportStructuredData({
  path,
  title,
  description,
  datasetName,
  datasetDescription,
  variables,
  updatedAt,
  publishedAt = "2026-09-16",
  datasetSize,
}: DataReportStructuredDataInput) {
  const pageUrl = absoluteUrl(path);
  const datasetId = dataReportDatasetId(path);
  const siteRoot = absoluteUrl("/");

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: title,
      description,
      datePublished: publishedAt,
      dateModified: updatedAt,
      inLanguage: "de-DE",
      author: { "@type": "Person", "@id": `${siteRoot}#author`, name: "Schayan Yousefian", url: absoluteUrl("/ueber-passendplanen/") },
      publisher: { "@type": "Organization", "@id": `${siteRoot}#organization`, name: "PassendPlanen", url: siteRoot },
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      mainEntity: { "@id": datasetId },
      isAccessibleForFree: true,
    },
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "@id": datasetId,
      identifier: datasetId,
      url: pageUrl,
      name: datasetName,
      description: datasetDescription,
      datePublished: publishedAt,
      dateModified: updatedAt,
      temporalCoverage: updatedAt,
      version: updatedAt,
      inLanguage: "de-DE",
      isAccessibleForFree: true,
      conditionsOfAccess: "Die aggregierte Auswertung ist ohne Anmeldung auf der Datenseite zugänglich.",
      creator: { "@type": "Organization", "@id": `${siteRoot}#organization`, name: "PassendPlanen", url: siteRoot },
      publisher: { "@type": "Organization", "@id": `${siteRoot}#organization`, name: "PassendPlanen", url: siteRoot },
      includedInDataCatalog: { "@type": "DataCatalog", "@id": `${absoluteUrl("/ratgeber/daten/")}#catalog`, name: "PassendPlanen Datenauswertungen", url: absoluteUrl("/ratgeber/daten/") },
      measurementTechnique: "Validierte Aggregation strukturierter Händlerdaten mit Medianen, dokumentierten Stichprobengrößen und sichtbar erhaltenen Datenlücken.",
      variableMeasured: variables.map((name) => ({ "@type": "PropertyValue", name })),
      keywords: variables,
      usageInfo: absoluteUrl("/nutzungshinweise/"),
      ...(datasetSize !== undefined ? { size: `${datasetSize} geprüfte Produkte` } : {}),
    },
  ];
}
