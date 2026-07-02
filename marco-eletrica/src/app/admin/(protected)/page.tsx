import Link from "next/link";
import {
  Users,
  Wallet,
  TrendingUp,
  FileClock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  getDashboardData,
  parseMonthParam,
  shiftMonthParam,
} from "@/lib/dashboard";
import { formatCurrencyBRL, formatDateBR } from "@/lib/format";
import { StatTile } from "@/components/admin/StatTile";
import {
  CategoryBreakdownChart,
  RevenueProfitChart,
} from "@/components/admin/DashboardCharts";
import { cardClass } from "@/components/admin/ui/formStyles";

function monthFullLabel(month: string): string {
  const { year, monthIndex } = parseMonthParam(month);
  const label = new Date(year, monthIndex, 1).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; year?: string }>;
}) {
  const { month, year } = await searchParams;
  const {
    selectedMonth,
    selectedYear,
    kpis,
    monthly,
    categoryBreakdown,
    upcomingWarranties,
  } = await getDashboardData({ month, year });

  const prevMonth = shiftMonthParam(selectedMonth, -1);
  const nextMonth = shiftMonthParam(selectedMonth, 1);
  const prevYear = selectedYear - 1;
  const nextYear = selectedYear + 1;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <Link
          href="/admin"
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          Ir para o mês atual
        </Link>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5">
        <Link
          href={`/admin?month=${prevMonth}&year=${selectedYear}`}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <p className="text-sm font-semibold capitalize text-slate-900">
          {monthFullLabel(selectedMonth)}
        </p>
        <Link
          href={`/admin?month=${nextMonth}&year=${selectedYear}`}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          aria-label="Próximo mês"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Novos clientes no mês"
          value={String(kpis.newClientsInMonth)}
          icon={Users}
          tone="brand"
        />
        <StatTile
          label="Receita no mês"
          value={formatCurrencyBRL(kpis.revenueInMonth)}
          icon={Wallet}
          tone="slate"
        />
        <StatTile
          label="Lucro no mês"
          value={formatCurrencyBRL(kpis.profitInMonth)}
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase text-slate-500">
            Receita e lucro por mês
          </h2>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin?month=${selectedMonth}&year=${prevYear}`}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Ano anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <p className="w-12 text-center text-sm font-semibold text-slate-900">
              {selectedYear}
            </p>
            <Link
              href={`/admin?month=${selectedMonth}&year=${nextYear}`}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Próximo ano"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
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
