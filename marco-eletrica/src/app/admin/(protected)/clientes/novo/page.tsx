import { ClientForm } from "../ClientForm";

export default function NovoClientePage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Novo cliente</h1>
      <div className="mt-6">
        <ClientForm mode="create" />
      </div>
    </div>
  );
}
