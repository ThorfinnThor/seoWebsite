/** Short way from the calculated numbers to the matching products below. */
export function ResultProductJump({ label }: { label: string }) {
  return (
    <div className="result-jump">
      <p>{label}</p>
      <a className="button button--offer" href="#angebote">Produkte ansehen <span aria-hidden="true">↓</span></a>
    </div>
  );
}
