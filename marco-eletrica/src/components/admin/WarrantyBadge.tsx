import { formatDateBR, isWarrantyActive } from "@/lib/format";

export function WarrantyBadge({
  hasWarranty,
  warrantyUntil,
}: {
  hasWarranty: boolean;
  warrantyUntil: Date | null;
}) {
  if (!hasWarranty || !warrantyUntil) {
    return (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
        Sem garantia
      </span>
    );
  }

  const isActive = isWarrantyActive(warrantyUntil);

  if (isActive) {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
        Em garantia até {formatDateBR(warrantyUntil)}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
      Garantia expirada em {formatDateBR(warrantyUntil)}
    </span>
  );
}
