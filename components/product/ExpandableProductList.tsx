"use client";

import { useId, useState, type ReactNode } from "react";

const INITIAL_VISIBLE_PRODUCTS = 5;

export function visibleProductItems<T>(items: T[], expanded: boolean): T[] {
  return expanded ? items : items.slice(0, INITIAL_VISIBLE_PRODUCTS);
}

export function ExpandableProductList<T>({
  items,
  renderItem,
  ariaLabel = "Passende geprüfte Angebote",
}: {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  ariaLabel?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const visibleItems = visibleProductItems(items, expanded);
  const hiddenCount = Math.max(0, items.length - INITIAL_VISIBLE_PRODUCTS);

  return <>
    <div className="product-list" id={listId} aria-label={ariaLabel}>
      {visibleItems.map(renderItem)}
    </div>
    {hiddenCount > 0 && <div className="product-list-toggle">
      <button
        type="button"
        className="button button--secondary"
        aria-controls={listId}
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
      >
        {expanded ? "Weniger Produkte anzeigen" : `Weitere passende Produkte anzeigen (${hiddenCount})`}
      </button>
    </div>}
  </>;
}
