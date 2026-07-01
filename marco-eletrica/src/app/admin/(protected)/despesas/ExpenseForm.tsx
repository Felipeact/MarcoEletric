"use client";

import { useActionState } from "react";
import {
  createExpense,
  updateExpense,
  type ExpenseActionState,
} from "@/lib/actions/expenses";
import {
  buttonPrimaryClass,
  cardClass,
  inputClass,
  labelClass,
} from "@/components/admin/ui/formStyles";

type Expense = {
  id: string;
  description: string;
  amount: unknown;
  date: Date;
  category: string;
  notes: string | null;
};

const initialState: ExpenseActionState = {};

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function ExpenseForm({
  mode,
  expense,
}: {
  mode: "create" | "edit";
  expense?: Expense;
}) {
  const action =
    mode === "create" ? createExpense : updateExpense.bind(null, expense!.id);
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className={`${cardClass} space-y-4`}>
      <div>
        <label htmlFor="description" className={labelClass}>
          Descrição
        </label>
        <input
          id="description"
          name="description"
          type="text"
          required
          defaultValue={expense?.description}
          className={inputClass}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClass}>
            Categoria
          </label>
          <input
            id="category"
            name="category"
            type="text"
            placeholder="Combustível, Ferramentas, Aluguel..."
            required
            defaultValue={expense?.category}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="amount" className={labelClass}>
            Valor (R$)
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={expense ? Number(expense.amount) : undefined}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="date" className={labelClass}>
          Data
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={
            expense ? toDateInputValue(expense.date) : undefined
          }
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="notes" className={labelClass}>
          Observações (opcional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={expense?.notes ?? ""}
          className={inputClass}
        />
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
