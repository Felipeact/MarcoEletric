import { SERVICE_STATUS_LABELS } from "@/lib/validation/service";

const STATUS_CLASSES: Record<string, string> = {
  aberto: "bg-slate-100 text-slate-600",
  em_andamento: "bg-amber-100 text-amber-700",
  revisao: "bg-brand-100 text-brand-700",
  concluido: "bg-emerald-100 text-emerald-700",
};

export function ServiceStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        STATUS_CLASSES[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {SERVICE_STATUS_LABELS[status] ?? status}
    </span>
  );
}
