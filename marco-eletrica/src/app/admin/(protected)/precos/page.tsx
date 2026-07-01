import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatCurrencyBRL } from "@/lib/format";
import { togglePriceItemActive } from "@/lib/actions/priceItems";
import { buttonPrimaryClass, cardClass } from "@/components/admin/ui/formStyles";

export default async function PrecosPage() {
  const items = await prisma.priceItem.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  const byCategory = new Map<string, typeof items>();
  for (const item of items) {
    const list = byCategory.get(item.category) ?? [];
    list.push(item);
    byCategory.set(item.category, list);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">
          Tabela de preços
        </h1>
        <Link href="/admin/precos/novo" className={buttonPrimaryClass}>
          Novo item
        </Link>
      </div>

      <div className="mt-6 space-y-8">
        {Array.from(byCategory.entries()).map(([category, categoryItems]) => (
          <div key={category}>
            <h2 className="text-sm font-semibold uppercase text-slate-500">
              {category}
            </h2>
            <div className={`${cardClass} mt-3 overflow-x-auto p-0`}>
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Item</th>
                    <th className="px-6 py-3">Unidade</th>
                    <th className="px-6 py-3">Mínimo</th>
                    <th className="px-6 py-3">Médio</th>
                    <th className="px-6 py-3">Máximo</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categoryItems.map((item) => (
                    <tr
                      key={item.id}
                      className={!item.active ? "opacity-50" : undefined}
                    >
                      <td className="px-6 py-3 font-medium text-slate-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-3 text-slate-600">
                        {item.unit}
                      </td>
                      <td className="px-6 py-3 text-slate-600">
                        {formatCurrencyBRL(Number(item.priceMin))}
                      </td>
                      <td className="px-6 py-3 text-slate-600">
                        {formatCurrencyBRL(Number(item.priceAvg))}
                      </td>
                      <td className="px-6 py-3 text-slate-600">
                        {formatCurrencyBRL(Number(item.priceMax))}
                      </td>
                      <td className="px-6 py-3">
                        <form
                          action={togglePriceItemActive.bind(
                            null,
                            item.id,
                            !item.active,
                          )}
                        >
                          <button
                            type="submit"
                            className="text-xs font-medium text-brand-600 hover:text-brand-700"
                          >
                            {item.active ? "Ativo" : "Inativo"}
                          </button>
                        </form>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <Link
                          href={`/admin/precos/${item.id}/editar`}
                          className="text-sm font-medium text-brand-600 hover:text-brand-700"
                        >
                          Editar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
