import Link from "next/link";

export function AffiliateDisclosure() {
  return (
    <p className="affiliate-disclosure">
      <span className="ad-label">Anzeige</span> Links zu den Händlern sind Partnerlinks. Kaufst du darüber ein, erhalten wir eine
      Provision, dein Preis bleibt gleich. Die Reihenfolge richtet sich nach deinen Angaben, <Link href="/affiliate-transparenz/">nicht nach der Provision</Link>.
    </p>
  );
}
