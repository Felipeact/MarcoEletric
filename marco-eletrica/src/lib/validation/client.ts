import { z } from "zod";

export const CLIENT_TYPES = ["residencial", "comercial", "industrial"] as const;

export const CLIENT_TYPE_LABELS: Record<string, string> = {
  residencial: "Residencial",
  comercial: "Comercial",
  industrial: "Industrial",
};

export const clientSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome."),
  phone: z.string().trim().min(8, "Informe um telefone com DDD."),
  email: z.string().trim().optional(),
  address: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  type: z.enum(CLIENT_TYPES).default("residencial"),
  isDemo: z.boolean(),
});

export type ClientInput = z.infer<typeof clientSchema>;
