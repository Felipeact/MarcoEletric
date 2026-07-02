"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  serviceSchema,
  serviceStatusUpdateSchema,
  type ServiceItemInput,
} from "@/lib/validation/service";
import { emptyToUndefined } from "@/lib/validation/formData";
import { addMonths } from "@/lib/format";

export type ServiceActionState = {
  error?: string;
};

function parseServiceFormData(formData: FormData) {
  const itemsRaw = formData.get("itemsJson");
  let items: unknown = [];
  try {
    items = itemsRaw ? JSON.parse(String(itemsRaw)) : [];
  } catch {
    items = [];
  }

  return serviceSchema.safeParse({
    title: formData.get("title"),
    description: emptyToUndefined(formData.get("description")),
    performedAt: formData.get("performedAt"),
    status: formData.get("status") || "aberto",
    items,
    hasWarranty: formData.get("hasWarranty") === "on",
    warrantyMonths: emptyToUndefined(formData.get("warrantyMonths")),
    completionReport: emptyToUndefined(formData.get("completionReport")),
  });
}

function computeLaborValue(items: ServiceItemInput[]) {
  const total = items.reduce(
    (sum, item) => sum + item.amount * (1 + (item.marginPercent ?? 0) / 100),
    0,
  );
  return Math.round(total * 100) / 100;
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
  const laborValue = computeLaborValue(data.items);

  await prisma.service.create({
    data: {
      clientId,
      title: data.title,
      description: data.description,
      performedAt: data.performedAt,
      status: data.status,
      completionReport:
        data.status === "concluido" ? data.completionReport : undefined,
      laborValue,
      hasWarranty: data.hasWarranty,
      warrantyMonths: data.hasWarranty ? data.warrantyMonths : null,
      warrantyUntil,
      items: {
        create: data.items.map((item) => ({
          description: item.description,
          amount: item.amount,
          marginPercent: item.marginPercent,
        })),
      },
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
  const laborValue = computeLaborValue(data.items);

  await prisma.$transaction([
    prisma.serviceItem.deleteMany({ where: { serviceId } }),
    prisma.service.update({
      where: { id: serviceId },
      data: {
        title: data.title,
        description: data.description,
        performedAt: data.performedAt,
        status: data.status,
        completionReport:
          data.status === "concluido" ? data.completionReport : null,
        laborValue,
        hasWarranty: data.hasWarranty,
        warrantyMonths: data.hasWarranty ? data.warrantyMonths : null,
        warrantyUntil,
        items: {
          create: data.items.map((item) => ({
            description: item.description,
            amount: item.amount,
            marginPercent: item.marginPercent,
          })),
        },
      },
    }),
  ]);

  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath(`/admin/clientes/${clientId}/servicos/${serviceId}`);
  revalidatePath("/admin");
  redirect(`/admin/clientes/${clientId}/servicos/${serviceId}`);
}

export async function deleteService(clientId: string, serviceId: string) {
  await prisma.service.delete({ where: { id: serviceId } });
  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath("/admin");
  redirect(`/admin/clientes/${clientId}`);
}

export type ServiceStatusActionState = {
  error?: string;
};

export async function updateServiceStatus(
  clientId: string,
  serviceId: string,
  _prevState: ServiceStatusActionState,
  formData: FormData,
): Promise<ServiceStatusActionState> {
  const parsed = serviceStatusUpdateSchema.safeParse({
    status: formData.get("status"),
    hasWarranty: formData.get("hasWarranty") === "on",
    warrantyMonths: emptyToUndefined(formData.get("warrantyMonths")),
    completionReport: emptyToUndefined(formData.get("completionReport")),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { performedAt: true },
  });
  if (!service) {
    return { error: "Serviço não encontrado." };
  }

  const data = parsed.data;
  const warrantyUntil =
    data.hasWarranty && data.warrantyMonths
      ? addMonths(service.performedAt, data.warrantyMonths)
      : null;

  await prisma.service.update({
    where: { id: serviceId },
    data: {
      status: data.status,
      hasWarranty: data.hasWarranty,
      warrantyMonths: data.hasWarranty ? data.warrantyMonths : null,
      warrantyUntil,
      completionReport:
        data.status === "concluido" ? data.completionReport : null,
    },
  });

  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath(`/admin/clientes/${clientId}/servicos/${serviceId}`);
  revalidatePath("/admin");
  return {};
}
