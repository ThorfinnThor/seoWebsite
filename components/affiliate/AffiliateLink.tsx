import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { addAwinClickRefs, shortProductRef } from "@/lib/catalog/tracking";

interface AffiliateLinkProps extends PropsWithChildren, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  productId: string;
  pageSlug?: string;
  verticalRef?: string;
}

export function AffiliateLink({ href, productId, pageSlug, verticalRef = "gardenhouse", children, ...props }: AffiliateLinkProps) {
  const trackedUrl = addAwinClickRefs(href, {
    clickref: verticalRef,
    clickref2: "planner-result",
    clickref3: shortProductRef(productId),
    clickref4: pageSlug,
  });
  return (
    <a href={trackedUrl} rel="sponsored noopener noreferrer" target="_blank" {...props}>
      {children}
    </a>
  );
}
