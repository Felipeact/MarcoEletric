import { CLIENT_TYPE_LABELS } from "@/lib/validation/client";

const TYPE_CLASSES: Record<string, string> = {
  residencial: "bg-brand-100 text-brand-700",
  comercial: "bg-violet-100 text-violet-700",
  industrial: "bg-slate-200 text-slate-700",
};

export function ClientTypeBadge({ type }: { type: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        TYPE_CLASSES[type] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {CLIENT_TYPE_LABELS[type] ?? type}
    </span>
  );
}
