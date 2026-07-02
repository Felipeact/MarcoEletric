"use client";

import { useActionState, useState } from "react";
import {
  createService,
  updateService,
  type ServiceActionState,
} from "@/lib/actions/services";
import {
  SERVICE_STATUSES,
  SERVICE_STATUS_LABELS,
} from "@/lib/validation/service";
import { formatCurrencyBRL } from "@/lib/format";
import {
  buttonPrimaryClass,
  buttonSecondaryClass,
  cardClass,
  inputClass,
  labelClass,
} from "@/components/admin/ui/formStyles";

type ServiceItem = { description: string; amount: unknown };

type Service = {
  id: string;
  title: string;
  description: string | null;
  performedAt: Date;
  status: string;
  marginPercent: unknown;
  hasWarranty: boolean;
  warrantyMonths: number | null;
  completionReport: string | null;
  items: ServiceItem[];
};

const initialState: ServiceActionState = {};

let keyCounter = 0;
function newKey() {
  keyCounter += 1;
  return `service-item-${keyCounter}`;
}

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
  const [status, setStatus] = useState(service?.status ?? "aberto");
  const [marginPercent, setMarginPercent] = useState(
    service?.marginPercent != null ? String(service.marginPercent) : "",
  );
  const [items, setItems] = useState(
    () =>
      service?.items.map((item) => ({
        key: newKey(),
        description: item.description,
        amount: Number(item.amount),
      })) ?? [{ key: newKey(), description: "Mão de obra", amount: 0 }],
  );

  const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const finalPrice = subtotal * (1 + (Number(marginPercent) || 0) / 100);

  function addItem() {
    setItems((prev) => [...prev, { key: newKey(), description: "", amount: 0 }]);
  }

  function updateItem(key: string, patch: Partial<{ description: string; amount: number }>) {
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, ...patch } : item)),
    );
  }

  function removeItem(key: string) {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }

  const itemsJson = JSON.stringify(
    items.map((item) => ({ description: item.description, amount: item.amount })),
  );

  return (
    <form action={formAction} className={`${cardClass} space-y-6`}>
      <input type="hidden" name="itemsJson" value={itemsJson} />

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
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={inputClass}
          >
            {SERVICE_STATUSES.map((value) => (
              <option key={value} value={value}>
                {SERVICE_STATUS_LABELS[value]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className={labelClass}>Itens do preço</h3>
          <button type="button" onClick={addItem} className={buttonSecondaryClass}>
            Adicionar item
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Ex: mão de obra, taxa de deslocamento, taxa de combustível...
        </p>

        <div className="mt-3 space-y-2">
          {items.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(item.key, { description: e.target.value })}
                placeholder="Descrição do item"
                className={`${inputClass} mt-0`}
              />
              <input
                type="number"
                min="0"
                step="0.01"
                value={item.amount}
                onChange={(e) =>
                  updateItem(item.key, { amount: Number(e.target.value) })
                }
                className={`${inputClass} mt-0 w-32`}
              />
              <button
                type="button"
                onClick={() => removeItem(item.key)}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 max-w-xs">
          <label htmlFor="marginPercent" className={labelClass}>
            Margem de lucro (%)
          </label>
          <input
            id="marginPercent"
            name="marginPercent"
            type="number"
            min="0"
            step="0.1"
            value={marginPercent}
            onChange={(e) => setMarginPercent(e.target.value)}
            placeholder="0"
            className={inputClass}
          />
        </div>

        <div className="mt-4 space-y-1 border-t border-slate-100 pt-4 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal dos itens</span>
            <span>{formatCurrencyBRL(subtotal)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold text-slate-900">
            <span>Valor final (mão de obra)</span>
            <span>{formatCurrencyBRL(finalPrice)}</span>
          </div>
        </div>
      </div>

      {status === "concluido" && (
        <div className="space-y-4 border-t border-slate-100 pt-4">
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

          <div>
            <label htmlFor="completionReport" className={labelClass}>
              Relatório do que foi feito
            </label>
            <textarea
              id="completionReport"
              name="completionReport"
              rows={4}
              placeholder="Descreva o que foi executado neste serviço..."
              defaultValue={service?.completionReport ?? ""}
              className={inputClass}
            />
            {mode === "edit" && service && (
              <p className="mt-3 text-sm text-slate-600">
                Se ainda faltar trabalho a fazer,{" "}
                <a
                  href={`/admin/orcamentos/novo?clientId=${clientId}&serviceId=${service.id}`}
                  className="font-medium text-brand-600 hover:text-brand-700"
                >
                  crie um novo orçamento referente a este serviço
                </a>
                .
              </p>
            )}
          </div>
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
