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

    expect(article.mainEntity).toEqual({ "@id": dataReportDatasetId(path) });
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
