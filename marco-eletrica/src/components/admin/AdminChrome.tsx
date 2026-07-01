import Link from "next/link";
import { siteConfig } from "@/lib/site";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/orcamentos", label: "Orçamentos" },
  { href: "/admin/precos", label: "Tabela de preços" },
  { href: "/admin/despesas", label: "Despesas" },
];

export function AdminChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white px-4 py-6 sm:flex">
          <div className="px-2 text-lg font-bold text-slate-900">
            {siteConfig.shortName}
            <span className="ml-1 text-brand-600">Admin</span>
          </div>
          <nav className="mt-8 flex flex-1 flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              Sair
            </button>
          </form>
        </aside>

        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:hidden">
            <div className="text-base font-bold text-slate-900">
              {siteConfig.shortName}
              <span className="ml-1 text-brand-600">Admin</span>
            </div>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="text-sm font-medium text-slate-500"
              >
                Sair
              </button>
            </form>
          </header>
          <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2 sm:hidden">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <main className="p-4 sm:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
