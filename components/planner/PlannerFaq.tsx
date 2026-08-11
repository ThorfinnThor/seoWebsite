import { getPlanner, type PlannerId } from "@/lib/planners";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

export function PlannerFaq({ planner: plannerId }: { planner: PlannerId }) {
  const planner = getPlanner(plannerId);

  return (
    <section className="section planner-faq" aria-labelledby={`${plannerId}-faq-title`}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${absoluteUrl(planner.href)}#faq`,
          mainEntity: planner.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <div className="section-heading">
        <p className="eyebrow">Direkt beantwortet</p>
        <h2 id={`${plannerId}-faq-title`}>Häufige Fragen vor der Planung.</h2>
        <p>Kurze Antworten auf die Punkte, die für ein belastbares Ergebnis entscheidend sind.</p>
      </div>
      <dl className="planner-faq-list">
        {planner.faqs.map((faq) => (
          <div key={faq.question}>
            <dt>{faq.question}</dt>
            <dd>{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
