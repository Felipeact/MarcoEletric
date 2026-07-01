"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  quotationSchema,
  QUOTATION_STATUSES,
  type QuotationItemInput,
} from "@/lib/validation/quotation";
import { emptyToUndefined } from "@/lib/validation/formData";

export type QuotationActionState = {
  error?: string;
};

function parseQuotationFormData(formData: FormData) {
  const itemsRaw = formData.get("itemsJson");
  let items: unknown = [];
  try {
    items = itemsRaw ? JSON.parse(String(itemsRaw)) : [];
  } catch {
    items = [];
  }

  return quotationSchema.safeParse({
    clientId: emptyToUndefined(formData.get("clientId")),
    clientNameSnapshot: emptyToUndefined(formData.get("clientNameSnapshot")),
    notes: emptyToUndefined(formData.get("notes")),
    discountPercent: emptyToUndefined(formData.get("discountPercent")),
    items,
  });
}

function withLineTotals(items: QuotationItemInput[]) {
  return items.map((item) => ({
    priceItemId: item.priceItemId || null,
    descriptionSnapshot: item.description,
    unitSnapshot: item.unit,
    unitPrice: item.unitPrice,
    quantity: item.quantity,
    lineTotal: Math.round(item.unitPrice * item.quantity * 100) / 100,
  }));
}

export async function createQuotation(
  _prevState: QuotationActionState,
  formData: FormData,
): Promise<QuotationActionState> {
  const parsed = parseQuotationFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { clientId, clientNameSnapshot, notes, discountPercent, items } =
    parsed.data;

  const quotation = await prisma.quotation.create({
    data: {
      clientId,
      clientNameSnapshot,
      notes,
      discountPercent,
      items: { create: withLineTotals(items) },
    },
  });

  revalidatePath("/admin/orcamentos");
  redirect(`/admin/orcamentos/${quotation.id}`);
}

export async function updateQuotation(
  quotationId: string,
  _prevState: QuotationActionState,
  formData: FormData,
): Promise<QuotationActionState> {
  const parsed = parseQuotationFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { clientId, clientNameSnapshot, notes, discountPercent, items } =
    parsed.data;

  await prisma.$transaction([
    prisma.quotationItem.deleteMany({ where: { quotationId } }),
    prisma.quotation.update({
      where: { id: quotationId },
      data: {
        clientId: clientId ?? null,
        clientNameSnapshot: clientNameSnapshot ?? null,
        notes: notes ?? null,
        discountPercent: discountPercent ?? null,
        items: { create: withLineTotals(items) },
      },
    }),
  ]);

  revalidatePath("/admin/orcamentos");
  revalidatePath(`/admin/orcamentos/${quotationId}`);
  redirect(`/admin/orcamentos/${quotationId}`);
}

export async function updateQuotationStatus(
  quotationId: string,
  formData: FormData,
) {
  const status = String(formData.get("status") ?? "");
  if (!QUOTATION_STATUSES.includes(status as (typeof QUOTATION_STATUSES)[number])) {
    return;
  }

  await prisma.quotation.update({
    where: { id: quotationId },
    data: { status },
  });
  revalidatePath(`/admin/orcamentos/${quotationId}`);
  revalidatePath("/admin/orcamentos");
  revalidatePath("/admin");
}

export async function deleteQuotation(quotationId: string) {
  await prisma.quotation.delete({ where: { id: quotationId } });
  revalidatePath("/admin/orcamentos");
  redirect("/admin/orcamentos");
}
