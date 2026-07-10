"use server";

import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { beforeAfterDetailsSchema } from "@/lib/validation/beforeAfter";

export type BeforeAfterActionState = {
  error?: string;
};

function isImageFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0 && value.type.startsWith("image/");
}

export async function uploadBeforeAfterItem(
  _prevState: BeforeAfterActionState,
  formData: FormData,
): Promise<BeforeAfterActionState> {
  const parsed = beforeAfterDetailsSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const beforeFile = formData.get("beforeImage");
  const afterFile = formData.get("afterImage");
  if (!isImageFile(beforeFile) || !isImageFile(afterFile)) {
    return { error: "Selecione as duas imagens: antes e depois." };
  }

  const [beforeBlob, afterBlob] = await Promise.all([
    put(`antes-depois/${Date.now()}-antes-${beforeFile.name}`, beforeFile, {
      access: "public",
    }),
    put(`antes-depois/${Date.now()}-depois-${afterFile.name}`, afterFile, {
      access: "public",
    }),
  ]);

  await prisma.beforeAfterItem.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      beforeImageUrl: beforeBlob.url,
      afterImageUrl: afterBlob.url,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/galeria");
  return {};
}

export async function deleteBeforeAfterItem(
  id: string,
  beforeImageUrl: string,
  afterImageUrl: string,
) {
  await prisma.beforeAfterItem.delete({ where: { id } });
  await Promise.all(
    [beforeImageUrl, afterImageUrl]
      .filter((url) => url.includes("blob.vercel-storage.com"))
      .map((url) => del(url).catch(() => {})),
  );
  revalidatePath("/");
  revalidatePath("/admin/galeria");
}
