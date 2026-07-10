import { z } from "zod";

export const beforeAfterDetailsSchema = z.object({
  title: z.string().trim().min(1, "Informe o título do projeto."),
  description: z.string().trim().min(1, "Informe a descrição do projeto."),
});
