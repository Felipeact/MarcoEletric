import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ExpenseForm } from "../../ExpenseForm";

export default async function EditarDespesaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const expense = await prisma.expense.findUnique({ where: { id } });
  if (!expense) notFound();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Editar despesa</h1>
      <div className="mt-6">
        <ExpenseForm mode="edit" expense={expense} />
      </div>
    </div>
  );
}
