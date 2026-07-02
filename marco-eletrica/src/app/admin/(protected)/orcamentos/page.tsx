import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatCurrencyBRL, formatDateBR } from "@/lib/format";
import { computeQuotationTotals } from "@/lib/quotationTotals";
import { QUOTATION_STATUS_LABELS } from "@/lib/validation/quotation";
import { buttonPrimaryClass, cardClass } from "@/components/admin/ui/formStyles";

const STATUS_BADGE_CLASS: Record<string, string> = {
  rascunho: "bg-slate-100 text-slate-600",
  enviado: "bg-amber-100 text-amber-700",
  aprovado: "bg-emerald-100 text-emerald-700",
  recusado: "bg-red-100 text-red-700",
};

export default async function OrcamentosPage() {
  const quotations = await prisma.quotation.findMany({
    orderBy: { createdAt: "desc" },
    include: { client: true, items: true },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Orçamentos</h1>
        <Link href="/admin/orcamentos/novo" className={buttonPrimaryClass}>
          Novo orçamento
        </Link>
      </div>

      <div className={`${cardClass} mt-6 overflow-x-auto p-0`}>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-6 py-3">Nº</th>
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quotations.map((quotation) => {
              const { total } = computeQuotationTotals(
                quotation.items.map((i) => ({ lineTotal: Number(i.lineTotal) })),
                quotation.discountPercent ? Number(quotation.discountPercent) : null,
              );
              const label =
                quotation.client?.name ??
                quotation.clientNameSnapshot ??
                "Sem cliente";
              return (
                <tr key={quotation.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-500">
                    #{String(quotation.quotationNumber).padStart(4, "0")}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orcamentos/${quotation.id}`}
                      className="font-medium text-slate-900 hover:text-brand-600"
                    >
                      {label}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {formatDateBR(quotation.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {formatCurrencyBRL(total)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        STATUS_BADGE_CLASS[quotation.status] ??
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {QUOTATION_STATUS_LABELS[quotation.status] ??
                        quotation.status}
                    </span>
                  </td>
                </tr>
              );
            })}
            {quotations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  Nenhum orçamento criado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
