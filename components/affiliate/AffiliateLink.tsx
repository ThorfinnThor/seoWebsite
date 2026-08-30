"use client";

import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { addAwinClickRefs, shortProductRef } from "@/lib/catalog/tracking";

interface AffiliateLinkProps extends PropsWithChildren, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  productId: string;
  pageSlug?: string;
  verticalRef?: string;
  merchantName?: string;
}

export function AffiliateLink({ href, productId, pageSlug, verticalRef = "garden-house", merchantName, children, onClick, ...props }: AffiliateLinkProps) {
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
    <a href={trackedUrl} rel="sponsored noopener noreferrer" target="_blank" onClick={(event) => {
      trackAnalyticsEvent("affiliate_click", {
        planner: verticalRef,
        merchant: merchantName ?? "unknown",
        product_ref: shortProductRef(productId),
        network: isAwinUrl ? "awin" : "direct",
      });
      onClick?.(event);
    }} {...props}>
      {children}
    </a>
  );
}
