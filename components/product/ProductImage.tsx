"use client";

import { useState } from "react";

export function ProductImage({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(!src);
  if (failed) return <div className="product-image product-image--fallback" role="img" aria-label={`Kein Produktbild für ${alt}`}><span aria-hidden="true">⌂</span></div>;
  return <img className="product-image" src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}
