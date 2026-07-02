import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome."),
  phone: z.string().trim().min(8, "Informe um telefone com DDD."),
  email: z.string().trim().optional(),
  address: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  isDemo: z.boolean(),
});

export type ClientInput = z.infer<typeof clientSchema>;
