"use client";

import { useActionState, useMemo, useState } from "react";
import {
  createQuotation,
  updateQuotation,
  type QuotationActionState,
} from "@/lib/actions/quotations";
import { formatCurrencyBRL } from "@/lib/format";
import {
  buttonPrimaryClass,
  buttonSecondaryClass,
  cardClass,
  inputClass,
  labelClass,
} from "@/components/admin/ui/formStyles";

type ClientOption = { id: string; name: string; phone: string };
type CatalogItem = {
  id: string;
  category: string;
  name: string;
  unit: string;
  priceMin: number;
  priceAvg: number;
  priceMax: number;
};

type LineItem = {
  key: string;
  priceItemId?: string;
  description: string;
  unit: string;
  unitPrice: number;
  quantity: number;
};

type InitialQuotation = {
  id: string;
  clientId: string | null;
  clientNameSnapshot: string | null;
  notes: string | null;
  discountPercent: number | null;
  items: {
    priceItemId: string | null;
    descriptionSnapshot: string;
    unitSnapshot: string;
    unitPrice: number;
    quantity: number;
  }[];
};

const initialState: QuotationActionState = {};

let keyCounter = 0;
function newKey() {
  keyCounter += 1;
  return `item-${keyCounter}`;
}

export function QuotationBuilder({
  mode,
  clients,
  catalog,
  defaultClientId,
  quotation,
}: {
  mode: "create" | "edit";
  clients: ClientOption[];
  catalog: CatalogItem[];
  defaultClientId?: string;
  quotation?: InitialQuotation;
}) {
  const action =
    mode === "create" ? createQuotation : updateQuotation.bind(null, quotation!.id);
  const [state, formAction, isPending] = useActionState(action, initialState);

  const [clientId, setClientId] = useState(
    quotation?.clientId ?? defaultClientId ?? "",
  );
  const [clientNameSnapshot, setClientNameSnapshot] = useState(
    quotation?.clientNameSnapshot ?? "",
  );
  const [notes, setNotes] = useState(quotation?.notes ?? "");
  const [discountPercent, setDiscountPercent] = useState(
    quotation?.discountPercent != null ? String(quotation.discountPercent) : "",
  );
  const [items, setItems] = useState<LineItem[]>(
    quotation?.items.map((item) => ({
      key: newKey(),
      priceItemId: item.priceItemId ?? undefined,
      description: item.descriptionSnapshot,
      unit: item.unitSnapshot,
      unitPrice: Number(item.unitPrice),
      quantity: Number(item.quantity),
    })) ?? [],
  );
  const [catalogPick, setCatalogPick] = useState("");

  const categories = useMemo(() => {
    const map = new Map<string, CatalogItem[]>();
    for (const item of catalog) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return map;
  }, [catalog]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const discountAmount = discountPercent
    ? subtotal * (Number(discountPercent) / 100)
    : 0;
  const total = subtotal - discountAmount;

  function addCatalogItem(priceItemId: string) {
    const item = catalog.find((c) => c.id === priceItemId);
    if (!item) return;
    setItems((prev) => [
      ...prev,
      {
        key: newKey(),
        priceItemId: item.id,
        description: item.name,
        unit: item.unit,
        unitPrice: item.priceAvg,
        quantity: 1,
      },
    ]);
    setCatalogPick("");
  }

  function addManualItem() {
    setItems((prev) => [
      ...prev,
      {
        key: newKey(),
        description: "",
        unit: "unidade",
        unitPrice: 0,
        quantity: 1,
      },
    ]);
  }

  function updateItem(key: string, patch: Partial<LineItem>) {
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, ...patch } : item)),
    );
  }

  function removeItem(key: string) {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }

  const itemsJson = JSON.stringify(
    items.map((item) => ({
      priceItemId: item.priceItemId,
      description: item.description,
      unit: item.unit,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    })),
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="itemsJson" value={itemsJson} />

      <div className={`${cardClass} space-y-4`}>
        <h2 className="text-sm font-semibold uppercase text-slate-500">
          Cliente
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="clientId" className={labelClass}>
              Cliente cadastrado
            </label>
            <select
              id="clientId"
              name="clientId"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className={inputClass}
            >
              <option value="">Sem cliente cadastrado</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} — {client.phone}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="clientNameSnapshot" className={labelClass}>
              Nome (se sem cadastro)
            </label>
            <input
              id="clientNameSnapshot"
              name="clientNameSnapshot"
              type="text"
              value={clientNameSnapshot}
              onChange={(e) => setClientNameSnapshot(e.target.value)}
              disabled={!!clientId}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className={`${cardClass} space-y-4`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase text-slate-500">
            Itens
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={catalogPick}
              onChange={(e) => addCatalogItem(e.target.value)}
              className={`${inputClass} mt-0 w-64`}
            >
              <option value="">Adicionar do catálogo...</option>
              {Array.from(categories.entries()).map(([category, catalogItems]) => (
                <optgroup key={category} label={category}>
                  {catalogItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({formatCurrencyBRL(item.priceAvg)})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <button
              type="button"
              onClick={addManualItem}
              className={buttonSecondaryClass}
            >
              Item manual
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="py-2">Descrição</th>
                <th className="py-2">Unidade</th>
                <th className="py-2">Qtd.</th>
                <th className="py-2">Valor unit. (R$)</th>
                <th className="py-2">Total</th>
                <th className="py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.key}>
                  <td className="py-2 pr-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.key, { description: e.target.value })
                      }
                      className={`${inputClass} mt-0`}
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) =>
                        updateItem(item.key, { unit: e.target.value })
                      }
                      className={`${inputClass} mt-0 w-24`}
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.key, {
                          quantity: Number(e.target.value),
                        })
                      }
                      className={`${inputClass} mt-0 w-20`}
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateItem(item.key, {
                          unitPrice: Number(e.target.value),
                        })
                      }
                      className={`${inputClass} mt-0 w-28`}
                    />
                  </td>
                  <td className="py-2 pr-2 whitespace-nowrap font-medium text-slate-900">
                    {formatCurrencyBRL(item.unitPrice * item.quantity)}
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-500">
                    Nenhum item adicionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`${cardClass} space-y-4`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="notes" className={labelClass}>
              Observações (opcional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="discountPercent" className={labelClass}>
              Desconto (%)
            </label>
            <input
              id="discountPercent"
              name="discountPercent"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div className="border-t border-slate-100 pt-4 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatCurrencyBRL(subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Desconto</span>
              <span>-{formatCurrencyBRL(discountAmount)}</span>
            </div>
          )}
          <div className="mt-1 flex justify-between text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatCurrencyBRL(total)}</span>
          </div>
        </div>
      </div>

      {state.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}
      <button type="submit" disabled={isPending} className={buttonPrimaryClass}>
        {isPending ? "Salvando..." : "Salvar orçamento"}
      </button>
    </form>
  );
}
