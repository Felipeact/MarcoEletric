import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().trim().min(1, "Informe o título do serviço."),
  description: z.string().trim().optional(),
  performedAt: z.coerce.date({ error: "Informe uma data válida." }),
  laborValue: z.coerce.number().min(0, "Informe um valor válido."),
  materialCost: z.coerce.number().min(0).optional(),
  hasWarranty: z.boolean(),
  warrantyMonths: z.coerce.number().int().min(1).optional(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
