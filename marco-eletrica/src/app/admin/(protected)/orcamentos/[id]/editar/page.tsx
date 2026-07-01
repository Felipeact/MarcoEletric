import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { QuotationBuilder } from "../../QuotationBuilder";

export default async function EditarOrcamentoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [quotation, clients, priceItems] = await Promise.all([
    prisma.quotation.findUnique({ where: { id }, include: { items: true } }),
    prisma.client.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, phone: true },
    }),
    prisma.priceItem.findMany({
      where: { active: true },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    }),
  ]);

  if (!quotation) notFound();

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
      <h1 className="text-2xl font-bold text-slate-900">Editar orçamento</h1>
      <div className="mt-6">
        <QuotationBuilder
          mode="edit"
          clients={clients}
          catalog={catalog}
          quotation={{
            id: quotation.id,
            clientId: quotation.clientId,
            clientNameSnapshot: quotation.clientNameSnapshot,
            notes: quotation.notes,
            discountPercent: quotation.discountPercent
              ? Number(quotation.discountPercent)
              : null,
            items: quotation.items.map((item) => ({
              priceItemId: item.priceItemId,
              descriptionSnapshot: item.descriptionSnapshot,
              unitSnapshot: item.unitSnapshot,
              unitPrice: Number(item.unitPrice),
              quantity: Number(item.quantity),
            })),
          }}
        />
      </div>
    </div>
  );
}
