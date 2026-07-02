import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatCurrencyBRL, formatDateBR } from "@/lib/format";
import { deleteService } from "@/lib/actions/services";
import {
  buttonSecondaryClass,
  cardClass,
} from "@/components/admin/ui/formStyles";
import { ServiceStatusBadge } from "@/components/admin/ServiceStatusBadge";
import { WarrantyBadge } from "@/components/admin/WarrantyBadge";
import { ServiceStatusForm } from "@/components/admin/ServiceStatusForm";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string; serviceId: string }>;
}) {
  const { id, serviceId } = await params;

  const [client, service] = await Promise.all([
    prisma.client.findUnique({ where: { id } }),
    prisma.service.findUnique({
      where: { id: serviceId },
      include: { items: true },
    }),
  ]);

  if (!client || !service || service.clientId !== client.id) notFound();

  const subtotal = service.items.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  return (
    <div className="max-w-2xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">
            <Link href={`/admin/clientes/${client.id}`} className="hover:text-brand-600">
              {client.name}
            </Link>
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            #{String(service.serviceNumber).padStart(4, "0")} — {service.title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {formatDateBR(service.performedAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/clientes/${client.id}/servicos/${service.id}/editar`}
            className={buttonSecondaryClass}
          >
            Editar
          </Link>
          <form action={deleteService.bind(null, client.id, service.id)}>
            <ConfirmSubmitButton
              confirmMessage={`Excluir o serviço #${String(service.serviceNumber).padStart(4, "0")}? Essa ação não pode ser desfeita.`}
              className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              Excluir
            </ConfirmSubmitButton>
          </form>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <ServiceStatusBadge status={service.status} />
        <WarrantyBadge
          hasWarranty={service.hasWarranty}
          warrantyUntil={service.warrantyUntil}
        />
      </div>

      <div className={`${cardClass} mt-6`}>
        <h2 className="text-sm font-semibold uppercase text-slate-500">
          Atualizar status
        </h2>
        <div className="mt-3">
          <ServiceStatusForm
            key={service.id}
            clientId={client.id}
            serviceId={service.id}
            currentStatus={service.status}
            currentHasWarranty={service.hasWarranty}
            currentWarrantyMonths={service.warrantyMonths}
            currentCompletionReport={service.completionReport}
          />
        </div>
      </div>

      {service.description && (
        <div className={`${cardClass} mt-6`}>
          <h2 className="text-sm font-semibold uppercase text-slate-500">
            Descrição
          </h2>
          <p className="mt-2 text-sm text-slate-700">{service.description}</p>
        </div>
      )}

      <div className={`${cardClass} mt-6`}>
        <h2 className="text-sm font-semibold uppercase text-slate-500">
          Itens do preço
        </h2>
        <table className="mt-3 w-full text-left text-sm">
          <thead className="text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="py-1.5">Item</th>
              <th className="py-1.5 text-right">Custo</th>
              <th className="py-1.5 text-right">Margem</th>
              <th className="py-1.5 text-right">Valor final</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {service.items.map((item) => {
              const margin = item.marginPercent != null ? Number(item.marginPercent) : 0;
              const itemFinal = Number(item.amount) * (1 + margin / 100);
              return (
                <tr key={item.id}>
                  <td className="py-1.5">{item.description}</td>
                  <td className="py-1.5 text-right">
                    {formatCurrencyBRL(Number(item.amount))}
                  </td>
                  <td className="py-1.5 text-right text-slate-500">
                    {margin > 0 ? `${margin}%` : "—"}
                  </td>
                  <td className="py-1.5 text-right font-medium text-slate-900">
                    {formatCurrencyBRL(itemFinal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal (custo)</span>
            <span>{formatCurrencyBRL(subtotal)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold text-slate-900">
            <span>Valor cobrado (mão de obra)</span>
            <span>{formatCurrencyBRL(Number(service.laborValue))}</span>
          </div>
        </div>
      </div>

      {service.completionReport && (
        <div className={`${cardClass} mt-6`}>
          <h2 className="text-sm font-semibold uppercase text-slate-500">
            Relatório do que foi feito
          </h2>
          <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
            {service.completionReport}
          </p>
        </div>
      )}
    </div>
  );
}
