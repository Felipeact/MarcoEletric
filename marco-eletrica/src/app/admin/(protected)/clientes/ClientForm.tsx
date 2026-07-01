"use client";

import { useActionState } from "react";
import {
  createClient,
  updateClient,
  type ClientActionState,
} from "@/lib/actions/clients";
import {
  buttonPrimaryClass,
  cardClass,
  inputClass,
  labelClass,
} from "@/components/admin/ui/formStyles";

type Client = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
  notes: string | null;
};

const initialState: ClientActionState = {};

export function ClientForm({
  mode,
  client,
}: {
  mode: "create" | "edit";
  client?: Client;
}) {
  const action =
    mode === "create"
      ? createClient
      : updateClient.bind(null, client!.id);
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className={`${cardClass} space-y-4`}>
      <div>
        <label htmlFor="name" className={labelClass}>
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={client?.name}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>
          Telefone
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          required
          placeholder="(11) 91234-5678"
          defaultValue={client?.phone}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>
          E-mail (opcional)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={client?.email ?? ""}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="address" className={labelClass}>
          Endereço (opcional)
        </label>
        <input
          id="address"
          name="address"
          type="text"
          defaultValue={client?.address ?? ""}
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
          defaultValue={client?.notes ?? ""}
          className={inputClass}
        />
      </div>
      {state.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className={buttonPrimaryClass}
      >
        {isPending ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
