import { z } from "zod";

export const expenseSchema = z.object({
  description: z.string().trim().min(1, "Informe a descrição."),
  amount: z.coerce.number().min(0, "Informe um valor válido."),
  date: z.coerce.date({ error: "Informe uma data válida." }),
  category: z.string().trim().min(1, "Informe a categoria."),
  notes: z.string().trim().optional(),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
