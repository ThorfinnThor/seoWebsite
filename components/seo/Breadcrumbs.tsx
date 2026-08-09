import Link from "next/link";

export interface Crumb { label: string; href?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
      <ol>
        {items.map((item, index) => <li key={item.label}>{index > 0 && <span aria-hidden="true">/</span>}{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}
      </ol>
    </nav>
  );
}
