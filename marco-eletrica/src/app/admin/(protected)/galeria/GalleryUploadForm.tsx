"use client";

import { useActionState, useState } from "react";
import { uploadGalleryItem, type GalleryActionState } from "@/lib/actions/gallery";
import {
  buttonPrimaryClass,
  cardClass,
  inputClass,
  labelClass,
} from "@/components/admin/ui/formStyles";

const initialState: GalleryActionState = {};

export function GalleryUploadForm() {
  const [state, formAction, isPending] = useActionState(
    uploadGalleryItem,
    initialState,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <form action={formAction} className={`${cardClass} space-y-4`}>
      <div>
        <label htmlFor="image" className={labelClass}>
          Imagem
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          required
          onChange={(e) => {
            const file = e.target.files?.[0];
            setPreviewUrl(file ? URL.createObjectURL(file) : null);
          }}
          className={`${inputClass} cursor-pointer`}
        />
      </div>
      {previewUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt="Pré-visualização"
          className="h-40 w-full rounded-lg object-cover"
        />
      )}
      <div>
        <label htmlFor="caption" className={labelClass}>
          Legenda (opcional)
        </label>
        <input
          id="caption"
          name="caption"
          type="text"
          placeholder="Ex: Troca de quadro de distribuição"
          className={inputClass}
        />
      </div>
      {state.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}
      <button type="submit" disabled={isPending} className={buttonPrimaryClass}>
        {isPending ? "Enviando..." : "Enviar imagem"}
      </button>
    </form>
  );
}
