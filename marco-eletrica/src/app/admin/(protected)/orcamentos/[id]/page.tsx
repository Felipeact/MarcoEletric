import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatCurrencyBRL, formatDateBR } from "@/lib/format";
import { computeQuotationTotals } from "@/lib/quotationTotals";
import {
  QUOTATION_STATUSES,
  QUOTATION_STATUS_LABELS,
} from "@/lib/validation/quotation";
import { deleteQuotation, updateQuotationStatus } from "@/lib/actions/quotations";
import {
  buttonPrimaryClass,
  buttonSecondaryClass,
  cardClass,
  inputClass,
} from "@/components/admin/ui/formStyles";

export default async function OrcamentoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const quotation = await prisma.quotation.findUnique({
    where: { id },
    include: { client: true, items: true, service: true },
  });
  if (!quotation) notFound();

  const { subtotal, discountAmount, total } = computeQuotationTotals(
    quotation.items.map((i) => ({ lineTotal: Number(i.lineTotal) })),
    quotation.discountPercent ? Number(quotation.discountPercent) : null,
  );

  const clientLabel =
    quotation.client?.name ?? quotation.clientNameSnapshot ?? "Sem cliente";

  return (
    <div className="max-w-2xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            #{String(quotation.quotationNumber).padStart(4, "0")} — {clientLabel}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Orçamento criado em {formatDateBR(quotation.createdAt)}
          </p>
          {quotation.service && (
            <p className="mt-1 text-sm text-slate-500">
              Referente ao serviço{" "}
              <Link
                href={`/admin/clientes/${quotation.service.clientId}/servicos/${quotation.service.id}`}
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                #{String(quotation.service.serviceNumber).padStart(4, "0")} —{" "}
                {quotation.service.title}
              </Link>
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <a
            href={`/api/admin/orcamentos/${quotation.id}/pdf`}
            className={buttonPrimaryClass}
          >
            Baixar PDF
          </a>
          <Link
            href={`/admin/orcamentos/${quotation.id}/editar`}
            className={buttonSecondaryClass}
          >
            Editar
          </Link>
        </div>
      </div>

      <div className={`${cardClass} mt-6`}>
        <h2 className="text-sm font-semibold uppercase text-slate-500">
          Status
        </h2>
        <form
          action={updateQuotationStatus.bind(null, quotation.id)}
          className="mt-3 flex items-center gap-3"
        >
          <select
            name="status"
            defaultValue={quotation.status}
            className={`${inputClass} mt-0 w-48`}
          >
            {QUOTATION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {QUOTATION_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
          <button type="submit" className={buttonSecondaryClass}>
            Atualizar
          </button>
        </form>
      </div>

      <div className={`${cardClass} mt-6 overflow-x-auto`}>
        <h2 className="text-sm font-semibold uppercase text-slate-500">
          Itens
        </h2>
        <table className="mt-3 w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="py-2">Descrição</th>
              <th className="py-2">Qtd.</th>
              <th className="py-2">Valor unit.</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quotation.items.map((item) => (
              <tr key={item.id}>
                <td className="py-2">{item.descriptionSnapshot}</td>
                <td className="py-2">
                  {Number(item.quantity)} {item.unitSnapshot}
                </td>
                <td className="py-2">
                  {formatCurrencyBRL(Number(item.unitPrice))}
                </td>
                <td className="py-2 font-medium text-slate-900">
                  {formatCurrencyBRL(Number(item.lineTotal))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 border-t border-slate-100 pt-4 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatCurrencyBRL(subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Desconto</span>
              <span>-{formatCurrencyBRL(discountAmount)}</span>
            </div>
          )}
          <div className="mt-1 flex justify-between text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatCurrencyBRL(total)}</span>
          </div>
        </div>
        {quotation.notes && (
          <p className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
            {quotation.notes}
          </p>
        )}
      </div>

      <form action={deleteQuotation.bind(null, quotation.id)} className="mt-6">
        <button
          type="submit"
          className="text-sm font-medium text-red-600 hover:text-red-700"
        >
          Excluir orçamento
        </button>
      </form>
    </div>
  );
}
