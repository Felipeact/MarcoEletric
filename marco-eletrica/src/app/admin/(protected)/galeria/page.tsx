import Image from "next/image";
import { prisma } from "@/lib/db";
import { deleteGalleryItem } from "@/lib/actions/gallery";
import { cardClass, buttonDangerClass } from "@/components/admin/ui/formStyles";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { GalleryUploadForm } from "./GalleryUploadForm";

export default async function GaleriaPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Galeria do site</h1>
      <p className="mt-1 text-sm text-slate-500">
        As imagens enviadas aqui aparecem automaticamente na seção
        &quot;Galeria de serviços&quot; do site público.
      </p>

      <div className="mt-6 max-w-md">
        <GalleryUploadForm />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className={`${cardClass} p-2`}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={item.imageUrl}
                alt={item.caption ?? "Foto da galeria"}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
            </div>
            {item.caption && (
              <p className="mt-2 line-clamp-2 text-xs text-slate-600">
                {item.caption}
              </p>
            )}
            <form
              action={deleteGalleryItem.bind(null, item.id, item.imageUrl)}
              className="mt-2"
            >
              <ConfirmSubmitButton
                confirmMessage="Excluir esta imagem da galeria do site?"
                className={`${buttonDangerClass} w-full`}
              >
                Excluir
              </ConfirmSubmitButton>
            </form>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full text-sm text-slate-500">
            Nenhuma imagem na galeria ainda.
          </p>
        )}
      </div>
    </div>
  );
}
