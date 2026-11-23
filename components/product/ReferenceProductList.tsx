import type { ReferenceProduct } from "@/lib/reference-products";

interface ReferenceProductListProps {
  items: readonly ReferenceProduct[];
}

/** Everything the project needs, with the calculated quantity where one exists. */
export function ReferenceProductList({ items }: ReferenceProductListProps) {
  return (
    <section className="shopping-list" aria-labelledby="shopping-list-title">
      <h3 id="shopping-list-title">Deine Einkaufsliste</h3>
      <table>
        <thead><tr><th scope="col">Was</th><th scope="col">Wie viel</th><th scope="col">Darauf achten</th></tr></thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.name}</th>
              <td>{item.quantity ?? "nach Auslegung"}</td>
              <td>{item.planningNote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
