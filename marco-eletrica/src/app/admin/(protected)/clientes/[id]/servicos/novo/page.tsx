import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ServiceForm } from "../../ServiceForm";

export default async function NovoServicoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) notFound();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">
        Registrar serviço — {client.name}
      </h1>
      <div className="mt-6">
        <ServiceForm clientId={client.id} mode="create" />
      </div>
    </div>
  );
}
