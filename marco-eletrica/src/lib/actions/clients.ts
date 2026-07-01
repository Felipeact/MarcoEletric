"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { clientSchema } from "@/lib/validation/client";
import { emptyToUndefined } from "@/lib/validation/formData";

export type ClientActionState = {
  error?: string;
};

function parseClientFormData(formData: FormData) {
  return clientSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: emptyToUndefined(formData.get("email")),
    address: emptyToUndefined(formData.get("address")),
    notes: emptyToUndefined(formData.get("notes")),
  });
}

export async function createClient(
  _prevState: ClientActionState,
  formData: FormData,
): Promise<ClientActionState> {
  const parsed = parseClientFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const client = await prisma.client.create({ data: parsed.data });
  revalidatePath("/admin/clientes");
  redirect(`/admin/clientes/${client.id}`);
}

export async function updateClient(
  clientId: string,
  _prevState: ClientActionState,
  formData: FormData,
): Promise<ClientActionState> {
  const parsed = parseClientFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  await prisma.client.update({ where: { id: clientId }, data: parsed.data });
  revalidatePath("/admin/clientes");
  revalidatePath(`/admin/clientes/${clientId}`);
  redirect(`/admin/clientes/${clientId}`);
}

export async function deleteClient(clientId: string) {
  await prisma.client.delete({ where: { id: clientId } });
  revalidatePath("/admin/clientes");
  redirect("/admin/clientes");
}
