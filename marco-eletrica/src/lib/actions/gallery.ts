"use server";

import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { galleryCaptionSchema } from "@/lib/validation/gallery";

export type GalleryActionState = {
  error?: string;
};

export async function uploadGalleryItem(
  _prevState: GalleryActionState,
  formData: FormData,
): Promise<GalleryActionState> {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Selecione uma imagem para enviar." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "O arquivo precisa ser uma imagem (JPG, PNG, etc.)." };
  }

  const parsed = galleryCaptionSchema.safeParse({
    caption: formData.get("caption") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const blob = await put(`galeria/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  await prisma.galleryItem.create({
    data: {
      imageUrl: blob.url,
      caption: parsed.data.caption ?? null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/galeria");
  return {};
}

export async function deleteGalleryItem(id: string, imageUrl: string) {
  await prisma.galleryItem.delete({ where: { id } });
  if (imageUrl.includes("blob.vercel-storage.com")) {
    await del(imageUrl).catch(() => {});
  }
  revalidatePath("/");
  revalidatePath("/admin/galeria");
}
