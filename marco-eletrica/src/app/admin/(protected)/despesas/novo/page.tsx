import { ExpenseForm } from "../ExpenseForm";

export default function NovaDespesaPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Nova despesa</h1>
      <div className="mt-6">
        <ExpenseForm mode="create" />
      </div>
    </div>
  );
}
