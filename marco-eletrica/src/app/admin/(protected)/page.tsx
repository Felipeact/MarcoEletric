import Link from "next/link";
import { Users, Wallet, TrendingUp, FileClock } from "lucide-react";
import { getDashboardData } from "@/lib/dashboard";
import { formatCurrencyBRL, formatDateBR } from "@/lib/format";
import { StatTile } from "@/components/admin/StatTile";
import {
  CategoryBreakdownChart,
  RevenueProfitChart,
} from "@/components/admin/DashboardCharts";
import { cardClass } from "@/components/admin/ui/formStyles";

export default async function AdminDashboardPage() {
  const { kpis, monthly, categoryBreakdown, upcomingWarranties } =
    await getDashboardData();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Novos clientes no mês"
          value={String(kpis.newClientsThisMonth)}
          icon={Users}
          tone="brand"
        />
        <StatTile
          label="Receita no mês"
          value={formatCurrencyBRL(kpis.revenueThisMonth)}
          icon={Wallet}
          tone="slate"
        />
        <StatTile
          label="Lucro no mês"
          value={formatCurrencyBRL(kpis.profitThisMonth)}
          icon={TrendingUp}
          tone="emerald"
        />
        <StatTile
          label="Orçamentos pendentes"
          value={`${kpis.pendingQuotationsCount} (${formatCurrencyBRL(
            kpis.pendingQuotationsValue,
          )})`}
          icon={FileClock}
          tone="amber"
        />
      </div>

      <div className={`${cardClass} mt-8`}>
        <h2 className="text-sm font-semibold uppercase text-slate-500">
          Receita e lucro — últimos 12 meses
        </h2>
        <div className="mt-4">
          <RevenueProfitChart data={monthly} />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className={cardClass}>
          <h2 className="text-sm font-semibold uppercase text-slate-500">
            Faturamento aprovado por categoria
          </h2>
          <div className="mt-4">
            <CategoryBreakdownChart data={categoryBreakdown} />
          </div>
        </div>

        <div className={cardClass}>
          <h2 className="text-sm font-semibold uppercase text-slate-500">
            Garantias vencendo em 30 dias
          </h2>
          <div className="mt-4 space-y-3">
            {upcomingWarranties.map((warranty) => (
              <Link
                key={warranty.id}
                href={`/admin/clientes/${warranty.clientId}`}
                className="block rounded-lg border border-slate-100 p-3 hover:border-brand-200 hover:bg-brand-50/40"
              >
                <p className="text-sm font-medium text-slate-900">
                  {warranty.clientName}
                </p>
                <p className="text-xs text-slate-500">
                  {warranty.title} — vence em{" "}
                  {formatDateBR(warranty.warrantyUntil)}
                </p>
              </Link>
            ))}
            {upcomingWarranties.length === 0 && (
              <p className="text-sm text-slate-500">
                Nenhuma garantia vencendo nos próximos 30 dias.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
