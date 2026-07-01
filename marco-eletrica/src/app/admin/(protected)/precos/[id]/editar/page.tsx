import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PriceItemForm } from "../../PriceItemForm";

export default async function EditarPrecoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.priceItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">
        Editar item de preço
      </h1>
      <div className="mt-6">
        <PriceItemForm mode="edit" item={item} />
      </div>
    </div>
  );
}
