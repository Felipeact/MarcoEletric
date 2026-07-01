import { z } from "zod";

export const quotationItemInputSchema = z.object({
  priceItemId: z.string().optional(),
  description: z.string().trim().min(1),
  unit: z.string().trim().min(1),
  unitPrice: z.coerce.number().min(0),
  quantity: z.coerce.number().min(0.01),
});

export const quotationSchema = z.object({
  clientId: z.string().optional(),
  clientNameSnapshot: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  discountPercent: z.coerce.number().min(0).max(100).optional(),
  items: z
    .array(quotationItemInputSchema)
    .min(1, "Adicione ao menos um item ao orçamento."),
});

export type QuotationInput = z.infer<typeof quotationSchema>;
export type QuotationItemInput = z.infer<typeof quotationItemInputSchema>;

export const QUOTATION_STATUSES = [
  "rascunho",
  "enviado",
  "aprovado",
  "recusado",
] as const;

export const QUOTATION_STATUS_LABELS: Record<string, string> = {
  rascunho: "Rascunho",
  enviado: "Enviado",
  aprovado: "Aprovado",
  recusado: "Recusado",
};
