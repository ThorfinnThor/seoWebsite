import { describe, expect, it } from "vitest";
import { createDataReportStructuredData, dataReportDatasetId } from "@/lib/data-report/structured-data";

describe("data report structured data", () => {
  it("connects an article to a stable, catalogued dataset", () => {
    const path = "/ratgeber/daten/beispiel/";
    const [article, dataset] = createDataReportStructuredData({
      path,
      title: "Beispielauswertung",
      description: "Eine nachvollziehbare Auswertung.",
      datasetName: "PassendPlanen Beispieldaten",
      datasetDescription: "Zehn geprüfte Produkte.",
      variables: ["Fläche", "Preis"],
      datasetSize: 10,
      updatedAt: "2026-09-16",
    });

    expect(article).toMatchObject({
      mainEntity: { "@id": dataReportDatasetId(path) },
      datePublished: "2026-09-16",
      dateModified: "2026-09-16",
      image: {
        "@type": "ImageObject",
        url: "https://www.passendplanen.de/social/passendplanen.png",
        width: 1200,
        height: 630,
      },
    });
    expect(dataset).toMatchObject({
      "@type": "Dataset",
      "@id": dataReportDatasetId(path),
      identifier: dataReportDatasetId(path),
      size: "10 geprüfte Produkte",
      isAccessibleForFree: true,
      includedInDataCatalog: { "@id": "https://www.passendplanen.de/ratgeber/daten/#catalog" },
    });
    expect((dataset as { variableMeasured: unknown }).variableMeasured).toEqual([
      { "@type": "PropertyValue", name: "Fläche" },
      { "@type": "PropertyValue", name: "Preis" },
    ]);
  });
});
