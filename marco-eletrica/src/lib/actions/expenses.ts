"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { expenseSchema } from "@/lib/validation/expense";
import { emptyToUndefined } from "@/lib/validation/formData";

export type ExpenseActionState = {
  error?: string;
};

function parseExpenseFormData(formData: FormData) {
  return expenseSchema.safeParse({
    description: formData.get("description"),
    amount: formData.get("amount"),
    date: formData.get("date"),
    category: formData.get("category"),
    notes: emptyToUndefined(formData.get("notes")),
  });
}

export async function createExpense(
  _prevState: ExpenseActionState,
  formData: FormData,
): Promise<ExpenseActionState> {
  const parsed = parseExpenseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  await prisma.expense.create({ data: parsed.data });
  revalidatePath("/admin/despesas");
  revalidatePath("/admin");
  redirect("/admin/despesas");
}

export async function updateExpense(
  expenseId: string,
  _prevState: ExpenseActionState,
  formData: FormData,
): Promise<ExpenseActionState> {
  const parsed = parseExpenseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  await prisma.expense.update({
    where: { id: expenseId },
    data: parsed.data,
  });
  revalidatePath("/admin/despesas");
  revalidatePath("/admin");
  redirect("/admin/despesas");
}

export async function deleteExpense(expenseId: string) {
  await prisma.expense.delete({ where: { id: expenseId } });
  revalidatePath("/admin/despesas");
  revalidatePath("/admin");
  redirect("/admin/despesas");
}
