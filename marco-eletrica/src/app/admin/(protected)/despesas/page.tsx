import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatCurrencyBRL, formatDateBR } from "@/lib/format";
import { deleteExpense } from "@/lib/actions/expenses";
import {
  buttonPrimaryClass,
  cardClass,
} from "@/components/admin/ui/formStyles";

export default async function DespesasPage() {
  const expenses = await prisma.expense.findMany({
    orderBy: { date: "desc" },
  });

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Despesas</h1>
          <p className="mt-1 text-sm text-slate-500">
            Total registrado: {formatCurrencyBRL(total)}
          </p>
        </div>
        <Link href="/admin/despesas/novo" className={buttonPrimaryClass}>
          Nova despesa
        </Link>
      </div>

      <div className={`${cardClass} mt-6 overflow-x-auto p-0`}>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-6 py-3">Descrição</th>
              <th className="px-6 py-3">Categoria</th>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">Valor</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-6 py-3 font-medium text-slate-900">
                  {expense.description}
                </td>
                <td className="px-6 py-3 text-slate-600">
                  {expense.category}
                </td>
                <td className="px-6 py-3 text-slate-600">
                  {formatDateBR(expense.date)}
                </td>
                <td className="px-6 py-3 text-slate-600">
                  {formatCurrencyBRL(Number(expense.amount))}
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/despesas/${expense.id}/editar`}
                      className="text-sm font-medium text-brand-600 hover:text-brand-700"
                    >
                      Editar
                    </Link>
                    <form action={deleteExpense.bind(null, expense.id)}>
                      <button
                        type="submit"
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Excluir
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  Nenhuma despesa registrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
