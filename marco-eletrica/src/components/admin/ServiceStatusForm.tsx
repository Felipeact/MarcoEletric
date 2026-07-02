"use client";

import { useActionState, useState } from "react";
import { updateServiceStatus } from "@/lib/actions/services";
import {
  SERVICE_STATUSES,
  SERVICE_STATUS_LABELS,
} from "@/lib/validation/service";
import {
  buttonSecondaryClass,
  inputClass,
  labelClass,
} from "@/components/admin/ui/formStyles";

export function ServiceStatusForm({
  clientId,
  serviceId,
  currentStatus,
  currentHasWarranty,
  currentWarrantyMonths,
  currentCompletionReport,
}: {
  clientId: string;
  serviceId: string;
  currentStatus: string;
  currentHasWarranty: boolean;
  currentWarrantyMonths: number | null;
  currentCompletionReport: string | null;
}) {
  const action = updateServiceStatus.bind(null, clientId, serviceId);
  const [state, formAction, isPending] = useActionState(action, {});
  const [status, setStatus] = useState(currentStatus);
  const [hasWarranty, setHasWarranty] = useState(currentHasWarranty);

  return (
    <form action={formAction} className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="status" className={labelClass}>
            Status do serviço
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`${inputClass} w-48`}
          >
            {SERVICE_STATUSES.map((value) => (
              <option key={value} value={value}>
                {SERVICE_STATUS_LABELS[value]}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={isPending} className={buttonSecondaryClass}>
          {isPending ? "Atualizando..." : "Atualizar status"}
        </button>
      </div>

      {status === "concluido" && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">
            Serviço concluído — confirme a garantia e o relatório:
          </p>
          <div className="mt-3 flex items-center gap-2">
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
            <div className="mt-3 max-w-xs">
              <label htmlFor="warrantyMonths" className={labelClass}>
                Garantia (meses)
              </label>
              <input
                id="warrantyMonths"
                name="warrantyMonths"
                type="number"
                min="1"
                defaultValue={currentWarrantyMonths ?? 12}
                className={inputClass}
              />
            </div>
          )}
          <div className="mt-3">
            <label htmlFor="completionReport" className={labelClass}>
              Relatório do que foi feito
            </label>
            <textarea
              id="completionReport"
              name="completionReport"
              rows={4}
              placeholder="Descreva o que foi executado neste serviço..."
              defaultValue={currentCompletionReport ?? ""}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {state.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}
    </form>
  );
}
