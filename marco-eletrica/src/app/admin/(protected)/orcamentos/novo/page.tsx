import { prisma } from "@/lib/db";
import { QuotationBuilder } from "../QuotationBuilder";

export default async function NovoOrcamentoPage({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string; serviceId?: string }>;
}) {
  const { clientId, serviceId } = await searchParams;

  const [clients, priceItems, service] = await Promise.all([
    prisma.client.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, phone: true },
    }),
    prisma.priceItem.findMany({
      where: { active: true },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    }),
    serviceId
      ? prisma.service.findUnique({
          where: { id: serviceId },
          select: { id: true, serviceNumber: true, title: true, clientId: true },
        })
      : null,
  ]);

  const catalog = priceItems.map((item) => ({
    id: item.id,
    category: item.category,
    name: item.name,
    unit: item.unit,
    priceMin: Number(item.priceMin),
    priceAvg: Number(item.priceAvg),
    priceMax: Number(item.priceMax),
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Novo orçamento</h1>
      <div className="mt-6">
        <QuotationBuilder
          mode="create"
          clients={clients}
          catalog={catalog}
          defaultClientId={clientId ?? service?.clientId}
          linkedService={service ?? undefined}
        />
      </div>
    </div>
  );
}
