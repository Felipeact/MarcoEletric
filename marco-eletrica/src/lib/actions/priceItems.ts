"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { priceItemSchema } from "@/lib/validation/priceItem";

export type PriceItemActionState = {
  error?: string;
};

function parsePriceItemFormData(formData: FormData) {
  return priceItemSchema.safeParse({
    category: formData.get("category"),
    name: formData.get("name"),
    unit: formData.get("unit"),
    priceMin: formData.get("priceMin"),
    priceAvg: formData.get("priceAvg"),
    priceMax: formData.get("priceMax"),
  });
}

export async function createPriceItem(
  _prevState: PriceItemActionState,
  formData: FormData,
): Promise<PriceItemActionState> {
  const parsed = parsePriceItemFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  await prisma.priceItem.create({ data: parsed.data });
  revalidatePath("/admin/precos");
  redirect("/admin/precos");
}

export async function updatePriceItem(
  priceItemId: string,
  _prevState: PriceItemActionState,
  formData: FormData,
): Promise<PriceItemActionState> {
  const parsed = parsePriceItemFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  await prisma.priceItem.update({
    where: { id: priceItemId },
    data: parsed.data,
  });
  revalidatePath("/admin/precos");
  redirect("/admin/precos");
}

export async function togglePriceItemActive(
  priceItemId: string,
  active: boolean,
) {
  await prisma.priceItem.update({
    where: { id: priceItemId },
    data: { active },
  });
  revalidatePath("/admin/precos");
}
