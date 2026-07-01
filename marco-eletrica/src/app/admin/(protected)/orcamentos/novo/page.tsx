import { prisma } from "@/lib/db";
import { QuotationBuilder } from "../QuotationBuilder";

export default async function NovoOrcamentoPage({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string }>;
}) {
  const { clientId } = await searchParams;

  const [clients, priceItems] = await Promise.all([
    prisma.client.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, phone: true },
    }),
    prisma.priceItem.findMany({
      where: { active: true },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    }),
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
          defaultClientId={clientId}
        />
      </div>
    </div>
  );
}
