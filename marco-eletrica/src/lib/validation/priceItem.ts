import { z } from "zod";

export const priceItemSchema = z.object({
  category: z.string().trim().min(1, "Informe a categoria."),
  name: z.string().trim().min(1, "Informe o nome do item."),
  unit: z.string().trim().min(1, "Informe a unidade."),
  priceMin: z.coerce.number().min(0, "Informe um valor válido."),
  priceAvg: z.coerce.number().min(0, "Informe um valor válido."),
  priceMax: z.coerce.number().min(0, "Informe um valor válido."),
});

export type PriceItemInput = z.infer<typeof priceItemSchema>;
