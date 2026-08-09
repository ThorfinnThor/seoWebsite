import type { MatchReason } from "@/lib/catalog/types";

export function ProductReasons({ reasons }: { reasons: MatchReason[] }) {
  return (
    <div className="product-reasons">
      <h4>Warum passt das?</h4>
      <ul>
        {reasons.map((reason) => (
          <li key={reason.code} className={`reason reason--${reason.strength}`}>
            <span aria-hidden="true">{reason.strength === "warning" ? "!" : "✓"}</span>{reason.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
