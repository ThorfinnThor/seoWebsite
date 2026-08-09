import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { legalContactComplete } from "@/lib/legal";

export function LegalPage({ title, intro, children, requiresContact = true }: { title: string; intro: string; children: ReactNode; requiresContact?: boolean }) {
  return (
    <article className="legal-page">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: title }]} />
      <header>
        <p className="eyebrow">MachPlan · Rechtliches</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      {requiresContact && !legalContactComplete && (
        <div className="legal-draft" role="note">
          <strong>Entwurf – Kontaktangabe noch unvollständig</strong>
          <p>Vor dem öffentlichen Betrieb muss hier eine erreichbare E-Mail-Adresse ergänzt und der Text rechtlich geprüft werden.</p>
        </div>
      )}
      <div className="legal-copy">{children}</div>
    </article>
  );
}
