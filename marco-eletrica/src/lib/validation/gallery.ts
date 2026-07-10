import { z } from "zod";

export const galleryCaptionSchema = z.object({
  caption: z.string().trim().max(200).optional(),
});
