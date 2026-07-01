import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ServiceForm } from "../../../ServiceForm";

export default async function EditarServicoPage({
  params,
}: {
  params: Promise<{ id: string; serviceId: string }>;
}) {
  const { id, serviceId } = await params;
  const [client, service] = await Promise.all([
    prisma.client.findUnique({ where: { id } }),
    prisma.service.findUnique({ where: { id: serviceId } }),
  ]);
  if (!client || !service || service.clientId !== client.id) notFound();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">
        Editar serviço — {client.name}
      </h1>
      <div className="mt-6">
        <ServiceForm clientId={client.id} mode="edit" service={service} />
      </div>
    </div>
  );
}
