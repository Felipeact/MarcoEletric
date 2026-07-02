import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDateBR } from "@/lib/format";
import { buttonPrimaryClass, cardClass, inputClass } from "@/components/admin/ui/formStyles";
import { toggleClientActive } from "@/lib/actions/clients";
import { ClientTypeBadge } from "@/components/admin/ClientTypeBadge";

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
              <th className="px-6 py-3">Tipo</th>
              <th className="px-6 py-3">Telefone</th>
              <th className="px-6 py-3">Serviços</th>
              <th className="px-6 py-3">Último serviço</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.map((client) => {
              const lastService = client.services[0];
              return (
                <tr
                  key={client.id}
                  className={!client.active ? "opacity-50" : undefined}
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/clientes/${client.id}`}
                      className="font-medium text-slate-900 hover:text-brand-600"
                    >
                      {client.name}
                    </Link>
                    {client.isDemo && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Demo
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <ClientTypeBadge type={client.type} />
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
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        client.active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {client.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <form
                      action={toggleClientActive.bind(
                        null,
                        client.id,
                        !client.active,
                      )}
                    >
                      <button
                        type="submit"
                        className="text-sm font-medium text-brand-600 hover:text-brand-700"
                      >
                        {client.active ? "Desativar" : "Ativar"}
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
            {clients.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
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
