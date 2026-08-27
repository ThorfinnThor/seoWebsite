import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { addAwinClickRefs, shortProductRef } from "@/lib/catalog/tracking";

interface AffiliateLinkProps extends PropsWithChildren, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  productId: string;
  pageSlug?: string;
  verticalRef?: string;
}

export function AffiliateLink({ href, productId, pageSlug, verticalRef = "gardenhouse", children, ...props }: AffiliateLinkProps) {
  const isAwinUrl = (() => {
    try {
      const hostname = new URL(href).hostname.toLowerCase();
      return hostname === "awin1.com" || hostname.endsWith(".awin1.com") || hostname === "awin.com" || hostname.endsWith(".awin.com");
    } catch {
      return false;
    }
  })();
  const trackedUrl = isAwinUrl ? addAwinClickRefs(href, {
    clickref: verticalRef,
    clickref2: "planner-result",
    clickref3: shortProductRef(productId),
    clickref4: pageSlug,
  }) : href;
  return (
    <a href={trackedUrl} rel={`${isAwinUrl ? "sponsored " : ""}noopener noreferrer`} target="_blank" {...props}>
      {children}
    </a>
  );
}
