"use client";

export function PrintResultAction() {
  return (
    <div className="print-action">
      <button className="button button--secondary" type="button" onClick={() => window.print()}>
        <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <path d="M6 14h12v7H6z" />
        </svg>
        Ergebnis drucken oder als PDF speichern
      </button>
    </div>
  );
}
