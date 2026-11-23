import Link from "next/link";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { getGuideProducts } from "@/lib/guide-products";

interface GuideProductsProps {
  topicSlug: string | undefined;
  path: string;
  plannerHref: string;
  placement: "guide" | "topic";
}

/**
 * Partner products inside an article. Deliberately without price and stock:
 * the page is static and both change daily, so the shop shows them.
 */
export function GuideProducts({ topicSlug, path, plannerHref, placement }: GuideProductsProps) {
  const selection = getGuideProducts(topicSlug, path);
  if (!selection) return null;

  return (
    <section className="guide-products" id="produkte" aria-labelledby="guide-products-title">
      <div className="guide-products__head">
        <h2 id="guide-products-title">{selection.heading}</h2>
        <span className="ad-label">Anzeige</span>
      </div>
      <p className="guide-products__basis">{selection.basis}</p>
      <ul className="guide-products__list">
        {selection.products.map((product) => (
          <li key={product.id}>
            <div>
              <h3>{product.name}</h3>
              {product.facts.length > 0 && <ul className="guide-products__facts">{product.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>}
            </div>
            <AffiliateLink
              className="button button--offer"
              href={product.url}
              productId={product.id}
              verticalRef={selection.verticalRef}
              merchantName={product.merchantName}
              placement={placement}
            >
              Preis bei {product.merchantName} <span aria-hidden="true">↗</span>
            </AffiliateLink>
          </li>
        ))}
      </ul>
      <p className="guide-products__note">
        Links zu den Händlern sind Partnerlinks. Kaufst du darüber ein, erhalten wir eine Provision, dein Preis bleibt gleich.
        Auf Auswahl und Reihenfolge hat sie <Link href="/affiliate-transparenz/">keinen Einfluss</Link>.
        {" "}<Link href={plannerHref}>Mehr Modelle im Planer nach deinen Maßen filtern</Link>.
      </p>
    </section>
  );
}
