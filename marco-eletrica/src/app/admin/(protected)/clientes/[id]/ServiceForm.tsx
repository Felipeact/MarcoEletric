"use client";

import { useActionState, useState } from "react";
import {
  createService,
  updateService,
  type ServiceActionState,
} from "@/lib/actions/services";
import {
  buttonPrimaryClass,
  cardClass,
  inputClass,
  labelClass,
} from "@/components/admin/ui/formStyles";

type Service = {
  id: string;
  title: string;
  description: string | null;
  performedAt: Date;
  laborValue: unknown;
  materialCost: unknown;
  hasWarranty: boolean;
  warrantyMonths: number | null;
};

const initialState: ServiceActionState = {};

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function ServiceForm({
  clientId,
  mode,
  service,
}: {
  clientId: string;
  mode: "create" | "edit";
  service?: Service;
}) {
  const action =
    mode === "create"
      ? createService.bind(null, clientId)
      : updateService.bind(null, clientId, service!.id);
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [hasWarranty, setHasWarranty] = useState(service?.hasWarranty ?? false);

  return (
    <form action={formAction} className={`${cardClass} space-y-4`}>
      <div>
        <label htmlFor="title" className={labelClass}>
          Título do serviço
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Ex: Troca de quadro de distribuição"
          defaultValue={service?.title}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="description" className={labelClass}>
          Descrição (opcional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={service?.description ?? ""}
          className={inputClass}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="performedAt" className={labelClass}>
            Data do serviço
          </label>
          <input
            id="performedAt"
            name="performedAt"
            type="date"
            required
            defaultValue={
              service ? toDateInputValue(service.performedAt) : undefined
            }
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="laborValue" className={labelClass}>
            Valor de mão de obra (R$)
          </label>
          <input
            id="laborValue"
            name="laborValue"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={
              service ? Number(service.laborValue) : undefined
            }
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="materialCost" className={labelClass}>
          Custo de material (opcional)
        </label>
        <input
          id="materialCost"
          name="materialCost"
          type="number"
          step="0.01"
          min="0"
          defaultValue={
            service?.materialCost != null
              ? Number(service.materialCost)
              : undefined
          }
          className={inputClass}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="hasWarranty"
          name="hasWarranty"
          type="checkbox"
          checked={hasWarranty}
          onChange={(e) => setHasWarranty(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        <label htmlFor="hasWarranty" className="text-sm font-medium text-slate-700">
          Este serviço tem garantia
        </label>
      </div>
      {hasWarranty && (
        <div className="max-w-xs">
          <label htmlFor="warrantyMonths" className={labelClass}>
            Garantia (meses)
          </label>
          <input
            id="warrantyMonths"
            name="warrantyMonths"
            type="number"
            min="1"
            defaultValue={service?.warrantyMonths ?? 12}
            className={inputClass}
          />
        </div>
      )}
      {state.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}
      <button type="submit" disabled={isPending} className={buttonPrimaryClass}>
        {isPending ? "Salvando..." : "Salvar serviço"}
      </button>
    </form>
  );
}
