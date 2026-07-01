"use client";

import { useActionState } from "react";
import {
  createPriceItem,
  updatePriceItem,
  type PriceItemActionState,
} from "@/lib/actions/priceItems";
import {
  buttonPrimaryClass,
  cardClass,
  inputClass,
  labelClass,
} from "@/components/admin/ui/formStyles";

type PriceItem = {
  id: string;
  category: string;
  name: string;
  unit: string;
  priceMin: unknown;
  priceAvg: unknown;
  priceMax: unknown;
};

const initialState: PriceItemActionState = {};

export function PriceItemForm({
  mode,
  item,
}: {
  mode: "create" | "edit";
  item?: PriceItem;
}) {
  const action =
    mode === "create" ? createPriceItem : updatePriceItem.bind(null, item!.id);
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className={`${cardClass} space-y-4`}>
      <div>
        <label htmlFor="category" className={labelClass}>
          Categoria
        </label>
        <input
          id="category"
          name="category"
          type="text"
          required
          defaultValue={item?.category}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="name" className={labelClass}>
          Nome do item
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={item?.name}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="unit" className={labelClass}>
          Unidade
        </label>
        <input
          id="unit"
          name="unit"
          type="text"
          placeholder="unidade, metro, visita..."
          required
          defaultValue={item?.unit}
          className={inputClass}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="priceMin" className={labelClass}>
            Preço mínimo
          </label>
          <input
            id="priceMin"
            name="priceMin"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={item ? Number(item.priceMin) : undefined}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="priceAvg" className={labelClass}>
            Preço médio
          </label>
          <input
            id="priceAvg"
            name="priceAvg"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={item ? Number(item.priceAvg) : undefined}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="priceMax" className={labelClass}>
            Preço máximo
          </label>
          <input
            id="priceMax"
            name="priceMax"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={item ? Number(item.priceMax) : undefined}
            className={inputClass}
          />
        </div>
      </div>
      {state.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}
      <button type="submit" disabled={isPending} className={buttonPrimaryClass}>
        {isPending ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
