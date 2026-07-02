import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDateBR } from "@/lib/format";
import { cardClass, inputClass } from "@/components/admin/ui/formStyles";
import { ServiceStatusBadge } from "@/components/admin/ServiceStatusBadge";
import { WarrantyBadge } from "@/components/admin/WarrantyBadge";

export default async function ServicosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const numericQuery = q ? Number(q.replace(/\D/g, "")) : NaN;

  const services = await prisma.service.findMany({
    where: q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { client: { name: { contains: q, mode: "insensitive" } } },
            ...(Number.isInteger(numericQuery) && numericQuery > 0
              ? [{ serviceNumber: numericQuery }]
              : []),
          ],
        }
      : undefined,
    orderBy: { performedAt: "desc" },
    include: { client: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Serviços</h1>
      <p className="mt-1 text-sm text-slate-500">
        Todos os serviços registrados, de todos os clientes.
      </p>

      <form className="mt-6 max-w-sm">
        <input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Buscar por cliente, título ou número..."
          className={inputClass}
        />
      </form>

      {services.length === 0 && (
        <p className="mt-6 text-sm text-slate-500">
          Nenhum serviço encontrado{q ? ` para "${q}"` : ""}.
        </p>
      )}

      <div className={`${cardClass} mt-6 overflow-x-auto p-0`}>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-6 py-3">Nº</th>
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3">Título</th>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Garantia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-500">
                  #{String(service.serviceNumber).padStart(4, "0")}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/clientes/${service.clientId}/servicos/${service.id}`}
                    className="font-medium text-slate-900 hover:text-brand-600"
                  >
                    {service.client.name}
                  </Link>
                  {service.client.isDemo && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                      Demo
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">{service.title}</td>
                <td className="px-6 py-4 text-slate-600">
                  {formatDateBR(service.performedAt)}
                </td>
                <td className="px-6 py-4">
                  <ServiceStatusBadge status={service.status} />
                </td>
                <td className="px-6 py-4">
                  <WarrantyBadge
                    hasWarranty={service.hasWarranty}
                    warrantyUntil={service.warrantyUntil}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
