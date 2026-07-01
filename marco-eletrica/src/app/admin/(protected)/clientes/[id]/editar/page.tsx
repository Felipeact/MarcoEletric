import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ClientForm } from "../../ClientForm";

export default async function EditarClientePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) notFound();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Editar cliente</h1>
      <div className="mt-6">
        <ClientForm mode="edit" client={client} />
      </div>
    </div>
  );
}
