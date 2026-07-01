"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { serviceSchema } from "@/lib/validation/service";
import { emptyToUndefined } from "@/lib/validation/formData";
import { addMonths } from "@/lib/format";

export type ServiceActionState = {
  error?: string;
};

function parseServiceFormData(formData: FormData) {
  return serviceSchema.safeParse({
    title: formData.get("title"),
    description: emptyToUndefined(formData.get("description")),
    performedAt: formData.get("performedAt"),
    laborValue: formData.get("laborValue"),
    materialCost: emptyToUndefined(formData.get("materialCost")),
    hasWarranty: formData.get("hasWarranty") === "on",
    warrantyMonths: emptyToUndefined(formData.get("warrantyMonths")),
  });
}

export async function createService(
  clientId: string,
  _prevState: ServiceActionState,
  formData: FormData,
): Promise<ServiceActionState> {
  const parsed = parseServiceFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const data = parsed.data;
  const warrantyUntil =
    data.hasWarranty && data.warrantyMonths
      ? addMonths(data.performedAt, data.warrantyMonths)
      : null;

  await prisma.service.create({
    data: {
      clientId,
      title: data.title,
      description: data.description,
      performedAt: data.performedAt,
      laborValue: data.laborValue,
      materialCost: data.materialCost,
      hasWarranty: data.hasWarranty,
      warrantyMonths: data.hasWarranty ? data.warrantyMonths : null,
      warrantyUntil,
    },
  });

  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath("/admin");
  redirect(`/admin/clientes/${clientId}`);
}

export async function updateService(
  clientId: string,
  serviceId: string,
  _prevState: ServiceActionState,
  formData: FormData,
): Promise<ServiceActionState> {
  const parsed = parseServiceFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const data = parsed.data;
  const warrantyUntil =
    data.hasWarranty && data.warrantyMonths
      ? addMonths(data.performedAt, data.warrantyMonths)
      : null;

  await prisma.service.update({
    where: { id: serviceId },
    data: {
      title: data.title,
      description: data.description,
      performedAt: data.performedAt,
      laborValue: data.laborValue,
      materialCost: data.materialCost,
      hasWarranty: data.hasWarranty,
      warrantyMonths: data.hasWarranty ? data.warrantyMonths : null,
      warrantyUntil,
    },
  });

  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath("/admin");
  redirect(`/admin/clientes/${clientId}`);
}

export async function deleteService(clientId: string, serviceId: string) {
  await prisma.service.delete({ where: { id: serviceId } });
  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath("/admin");
  redirect(`/admin/clientes/${clientId}`);
}
