"use client";

import { useActionState, useState } from "react";
import {
  uploadBeforeAfterItem,
  type BeforeAfterActionState,
} from "@/lib/actions/beforeAfter";
import {
  buttonPrimaryClass,
  cardClass,
  inputClass,
  labelClass,
} from "@/components/admin/ui/formStyles";

const initialState: BeforeAfterActionState = {};

function ImageField({
  id,
  name,
  label,
}: {
  id: string;
  name: string;
  label: string;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        accept="image/*"
        required
        onChange={(e) => {
          const file = e.target.files?.[0];
          setPreviewUrl(file ? URL.createObjectURL(file) : null);
        }}
        className={`${inputClass} cursor-pointer`}
      />
      {previewUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt="Pré-visualização"
          className="mt-2 h-32 w-full rounded-lg object-cover"
        />
      )}
    </div>
  );
}

export function BeforeAfterUploadForm() {
  const [state, formAction, isPending] = useActionState(
    uploadBeforeAfterItem,
    initialState,
  );

  return (
    <form action={formAction} className={`${cardClass} space-y-4`}>
      <div>
        <label htmlFor="title" className={labelClass}>
          Título do projeto
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Ex: Quadro de distribuição"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="description" className={labelClass}>
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          required
          placeholder="Descreva o que foi feito neste projeto..."
          className={inputClass}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageField id="beforeImage" name="beforeImage" label="Foto antes" />
        <ImageField id="afterImage" name="afterImage" label="Foto depois" />
      </div>
      {state.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}
      <button type="submit" disabled={isPending} className={buttonPrimaryClass}>
        {isPending ? "Enviando..." : "Enviar projeto"}
      </button>
    </form>
  );
}
