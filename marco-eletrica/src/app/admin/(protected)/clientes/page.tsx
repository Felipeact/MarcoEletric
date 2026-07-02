import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDateBR } from "@/lib/format";
import { buttonPrimaryClass, cardClass, inputClass } from "@/components/admin/ui/formStyles";
import { WarrantyBadge } from "@/components/admin/WarrantyBadge";

export default async function ClientesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const clients = await prisma.client.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { phone: { contains: q } },
          ],
        }
      : undefined,
    orderBy: { name: "asc" },
    include: {
      services: { orderBy: { performedAt: "desc" }, take: 1 },
      _count: { select: { services: true } },
    },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Clientes</h1>
        <Link href="/admin/clientes/novo" className={buttonPrimaryClass}>
          Novo cliente
        </Link>
      </div>

      <form className="mt-6 max-w-sm">
        <input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Buscar por nome ou telefone..."
          className={inputClass}
        />
      </form>

      <div className={`${cardClass} mt-6 overflow-x-auto p-0`}>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Telefone</th>
              <th className="px-6 py-3">Serviços</th>
              <th className="px-6 py-3">Último serviço</th>
              <th className="px-6 py-3">Garantia (último serviço)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.map((client) => {
              const lastService = client.services[0];
              return (
                <tr
                  key={client.id}
                  className="cursor-pointer hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/clientes/${client.id}`}
                      className="font-medium text-slate-900 hover:text-brand-600"
                    >
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{client.phone}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {client._count.services}{" "}
                    {client._count.services === 1 ? "serviço" : "serviços"}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {lastService
                      ? formatDateBR(lastService.performedAt)
                      : "Sem serviços"}
                  </td>
                  <td className="px-6 py-4">
                    {lastService ? (
                      <WarrantyBadge
                        hasWarranty={lastService.hasWarranty}
                        warrantyUntil={lastService.warrantyUntil}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              );
            })}
            {clients.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
