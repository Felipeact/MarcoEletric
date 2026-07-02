"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { CheckCircle2, ShieldCheck, ClipboardList } from "lucide-react";
import { updateServiceStatus } from "@/lib/actions/services";
import {
  SERVICE_STATUSES,
  SERVICE_STATUS_LABELS,
} from "@/lib/validation/service";
import {
  buttonPrimaryClass,
  buttonSecondaryClass,
  inputClass,
  labelClass,
} from "@/components/admin/ui/formStyles";

function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: typeof CheckCircle2;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-brand-600" />
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {children}
      </h3>
    </div>
  );
}

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
  const [needsFollowUpQuote, setNeedsFollowUpQuote] = useState(false);

  return (
    <form action={formAction} className="space-y-5">
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
        <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50">
          <div className="space-y-3 p-4">
            <SectionHeading icon={CheckCircle2}>
              Continuidade do trabalho
            </SectionHeading>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-5">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="followUp"
                  checked={!needsFollowUpQuote}
                  onChange={() => setNeedsFollowUpQuote(false)}
                  className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                Sim, está tudo concluído
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="followUp"
                  checked={needsFollowUpQuote}
                  onChange={() => setNeedsFollowUpQuote(true)}
                  className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                Não, será necessário um novo orçamento
              </label>
            </div>
            {needsFollowUpQuote && (
              <Link
                href={`/admin/orcamentos/novo?clientId=${clientId}&serviceId=${serviceId}`}
                className={`${buttonPrimaryClass} inline-flex`}
              >
                Criar novo orçamento
              </Link>
            )}
          </div>

          <div className="space-y-3 p-4">
            <SectionHeading icon={ShieldCheck}>Garantia</SectionHeading>
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
                  defaultValue={currentWarrantyMonths ?? 12}
                  className={inputClass}
                />
              </div>
            )}
          </div>

          <div className="space-y-3 p-4">
            <SectionHeading icon={ClipboardList}>
              Relatório de execução
            </SectionHeading>
            <textarea
              id="completionReport"
              name="completionReport"
              aria-label="Relatório de execução"
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
