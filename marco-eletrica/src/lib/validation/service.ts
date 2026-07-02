import { z } from "zod";

export const SERVICE_STATUSES = [
  "aberto",
  "em_andamento",
  "revisao",
  "concluido",
] as const;

export const SERVICE_STATUS_LABELS: Record<string, string> = {
  aberto: "Aberto",
  em_andamento: "Em andamento",
  revisao: "Em revisão",
  concluido: "Concluído",
};

export const serviceItemInputSchema = z.object({
  description: z.string().trim().min(1),
  amount: z.coerce.number().min(0),
});

export const serviceSchema = z.object({
  title: z.string().trim().min(1, "Informe o título do serviço."),
  description: z.string().trim().optional(),
  performedAt: z.coerce.date({ error: "Informe uma data válida." }),
  status: z.enum(SERVICE_STATUSES).default("aberto"),
  items: z
    .array(serviceItemInputSchema)
    .min(1, "Adicione ao menos um item ao valor do serviço."),
  marginPercent: z.coerce.number().min(0).max(1000).optional(),
  materialCost: z.coerce.number().min(0).optional(),
  hasWarranty: z.boolean(),
  warrantyMonths: z.coerce.number().int().min(1).optional(),
  completionReport: z.string().trim().optional(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
export type ServiceItemInput = z.infer<typeof serviceItemInputSchema>;

export const serviceStatusUpdateSchema = z.object({
  status: z.enum(SERVICE_STATUSES),
  hasWarranty: z.boolean(),
  warrantyMonths: z.coerce.number().int().min(1).optional(),
  completionReport: z.string().trim().optional(),
});
