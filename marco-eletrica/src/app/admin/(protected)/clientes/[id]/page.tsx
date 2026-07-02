import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatCurrencyBRL, formatDateBR } from "@/lib/format";
import {
  buttonPrimaryClass,
  buttonSecondaryClass,
  cardClass,
} from "@/components/admin/ui/formStyles";
import { toggleClientActive } from "@/lib/actions/clients";
import { ServiceStatusBadge } from "@/components/admin/ServiceStatusBadge";
import { WarrantyBadge } from "@/components/admin/WarrantyBadge";

export default async function ClienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      services: { orderBy: { performedAt: "desc" } },
    },
  });

  if (!client) notFound();

  const lastService = client.services[0];

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{client.name}</h1>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                client.active
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {client.active ? "Ativo" : "Inativo"}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{client.phone}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin/clientes/${client.id}/servicos/novo`}
            className={buttonPrimaryClass}
          >
            Registrar serviço
          </Link>
          <Link
            href={`/admin/orcamentos/novo?clientId=${client.id}`}
            className={buttonSecondaryClass}
          >
            Novo orçamento
          </Link>
          <Link
            href={`/admin/clientes/${client.id}/editar`}
            className={buttonSecondaryClass}
          >
            Editar
          </Link>
          <form action={toggleClientActive.bind(null, client.id, !client.active)}>
            <button type="submit" className={buttonSecondaryClass}>
              {client.active ? "Desativar" : "Ativar"}
            </button>
          </form>
        </div>
      </div>

      <div className={`${cardClass} mt-6`}>
        <h2 className="text-sm font-semibold uppercase text-slate-500">
          Situação atual
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-6">
          <div>
            <p className="text-xs text-slate-500">Serviços registrados</p>
            <p className="text-sm font-medium text-slate-900">
              {client.services.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Último serviço</p>
            <p className="text-sm font-medium text-slate-900">
              {lastService ? formatDateBR(lastService.performedAt) : "—"}
            </p>
          </div>
        </div>
        {(client.email || client.address || client.notes) && (
          <dl className="mt-4 grid gap-2 border-t border-slate-100 pt-4 text-sm sm:grid-cols-2">
            {client.email && (
              <div>
                <dt className="text-xs text-slate-500">E-mail</dt>
                <dd className="text-slate-900">{client.email}</dd>
              </div>
            )}
            {client.address && (
              <div>
                <dt className="text-xs text-slate-500">Endereço</dt>
                <dd className="text-slate-900">{client.address}</dd>
              </div>
            )}
            {client.notes && (
              <div className="sm:col-span-2">
                <dt className="text-xs text-slate-500">Observações</dt>
                <dd className="text-slate-900">{client.notes}</dd>
              </div>
            )}
          </dl>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">
          Histórico de serviços ({client.services.length})
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Cada serviço tem seu próprio status e garantia, independente dos demais.
        </p>
        <div className="mt-4 space-y-3">
          {client.services.map((service) => (
            <Link
              key={service.id}
              href={`/admin/clientes/${client.id}/servicos/${service.id}`}
              className={`${cardClass} block transition-shadow hover:shadow-md`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-slate-900">
                    #{String(service.serviceNumber).padStart(4, "0")} —{" "}
                    {service.title}
                  </p>
                  <p className="text-sm text-slate-500">
                    {formatDateBR(service.performedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ServiceStatusBadge status={service.status} />
                  <WarrantyBadge
                    hasWarranty={service.hasWarranty}
                    warrantyUntil={service.warrantyUntil}
                  />
                </div>
              </div>
              <div className="mt-3 flex gap-6 border-t border-slate-100 pt-3 text-sm">
                <div>
                  <span className="text-slate-500">Mão de obra: </span>
                  <span className="font-medium text-slate-900">
                    {formatCurrencyBRL(Number(service.laborValue))}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {client.services.length === 0 && (
            <p className="text-sm text-slate-500">
              Nenhum serviço registrado ainda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
