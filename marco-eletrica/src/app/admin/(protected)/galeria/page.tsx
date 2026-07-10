import Image from "next/image";
import { prisma } from "@/lib/db";
import { deleteGalleryItem } from "@/lib/actions/gallery";
import { deleteBeforeAfterItem } from "@/lib/actions/beforeAfter";
import { cardClass, buttonDangerClass } from "@/components/admin/ui/formStyles";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { GalleryUploadForm } from "./GalleryUploadForm";
import { BeforeAfterUploadForm } from "./BeforeAfterUploadForm";

export default async function GaleriaPage() {
  const [items, beforeAfterItems] = await Promise.all([
    prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.beforeAfterItem.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Galeria do site</h1>
      <p className="mt-1 text-sm text-slate-500">
        As imagens enviadas aqui aparecem automaticamente no site público.
      </p>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">
          Galeria de serviços
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Aparece na seção &quot;Galeria de serviços&quot; do site.
        </p>

        <div className="mt-4 max-w-md">
          <GalleryUploadForm />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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

      <div className="mt-12 border-t border-slate-200 pt-8">
        <h2 className="text-lg font-semibold text-slate-900">
          Antes e depois
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Aparece na seção &quot;Antes e depois&quot; do site, com o
          comparador de arrastar.
        </p>

        <div className="mt-4 max-w-md">
          <BeforeAfterUploadForm />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {beforeAfterItems.map((item) => (
            <div key={item.id} className={`${cardClass} p-3`}>
              <div className="flex gap-2">
                <div className="relative aspect-[4/3] w-1/2 overflow-hidden rounded-lg">
                  <Image
                    src={item.beforeImageUrl}
                    alt={`Antes — ${item.title}`}
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] w-1/2 overflow-hidden rounded-lg">
                  <Image
                    src={item.afterImageUrl}
                    alt={`Depois — ${item.title}`}
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {item.title}
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                {item.description}
              </p>
              <form
                action={deleteBeforeAfterItem.bind(
                  null,
                  item.id,
                  item.beforeImageUrl,
                  item.afterImageUrl,
                )}
                className="mt-2"
              >
                <ConfirmSubmitButton
                  confirmMessage={`Excluir o projeto "${item.title}" do site?`}
                  className={`${buttonDangerClass} w-full`}
                >
                  Excluir
                </ConfirmSubmitButton>
              </form>
            </div>
          ))}
          {beforeAfterItems.length === 0 && (
            <p className="col-span-full text-sm text-slate-500">
              Nenhum projeto de antes e depois ainda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
