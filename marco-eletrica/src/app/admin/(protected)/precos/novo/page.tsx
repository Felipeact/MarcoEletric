import { PriceItemForm } from "../PriceItemForm";

export default function NovoPrecoPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Novo item de preço</h1>
      <div className="mt-6">
        <PriceItemForm mode="create" />
      </div>
    </div>
  );
}
