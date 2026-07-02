import { prisma } from "@/lib/db";
import { computeQuotationTotals } from "@/lib/quotationTotals";
import { addDays } from "@/lib/format";

export type MonthlyPoint = {
  month: string;
  label: string;
  revenue: number;
  profit: number;
};

export type CategoryBreakdownPoint = {
  category: string;
  total: number;
};

export type WarrantyExpiration = {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  warrantyUntil: Date;
};

export type DashboardData = {
  selectedMonth: string;
  selectedYear: number;
  kpis: {
    newClientsInMonth: number;
    revenueInMonth: number;
    profitInMonth: number;
    pendingQuotationsCount: number;
    pendingQuotationsValue: number;
  };
  monthly: MonthlyPoint[];
  categoryBreakdown: CategoryBreakdownPoint[];
  upcomingWarranties: WarrantyExpiration[];
};

function monthLabel(year: number, month: number): string {
  return new Date(year, month, 1)
    .toLocaleDateString("pt-BR", { month: "short", year: "2-digit" })
    .replace(".", "");
}

export function monthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

/** Parses a "YYYY-MM" query param into {year, month(0-based)}; defaults to the current month. */
export function parseMonthParam(month?: string): {
  year: number;
  monthIndex: number;
} {
  if (month) {
    const match = /^(\d{4})-(\d{2})$/.exec(month);
    if (match) {
      const year = Number(match[1]);
      const monthIndex = Number(match[2]) - 1;
      if (monthIndex >= 0 && monthIndex <= 11) return { year, monthIndex };
    }
  }
  const now = new Date();
  return { year: now.getFullYear(), monthIndex: now.getMonth() };
}

export function shiftMonthParam(month: string, delta: number): string {
  const { year, monthIndex } = parseMonthParam(month);
  const d = new Date(year, monthIndex + delta, 1);
  return monthKey(d.getFullYear(), d.getMonth());
}

/** Parses a "YYYY" query param into a year number; defaults to the current year. */
export function parseYearParam(year?: string): number {
  const parsed = year ? Number(year) : NaN;
  return Number.isInteger(parsed) ? parsed : new Date().getFullYear();
}

function yearMonthKeys(year: number): { key: string; year: number; month: number }[] {
  return Array.from({ length: 12 }, (_, month) => ({
    key: monthKey(year, month),
    year,
    month,
  }));
}

export async function getDashboardData(
  params: { month?: string; year?: string } = {},
): Promise<DashboardData> {
  const now = new Date();
  const { year: selYear, monthIndex: selMonthIndex } = parseMonthParam(
    params.month,
  );
  const selectedMonth = monthKey(selYear, selMonthIndex);
  const selectedYear = parseYearParam(params.year);

  const selMonthStart = new Date(selYear, selMonthIndex, 1);
  const selMonthEnd = new Date(selYear, selMonthIndex + 1, 1);
  const chartYearStart = new Date(selectedYear, 0, 1);
  const chartYearEnd = new Date(selectedYear + 1, 0, 1);

  // Só serviços concluídos contam como receita realizada; "aberto"/"em
  // andamento"/"em revisão" ainda não geraram faturamento.
  const [
    revenueRows,
    expenseRows,
    revenueInMonthAgg,
    expensesInMonthAgg,
    newClientsInMonth,
    categoryItems,
    pendingQuotations,
    upcomingServices,
  ] = await Promise.all([
    prisma.$queryRaw<{ month: string; revenue: number }[]>`
      SELECT to_char(date_trunc('month', "performedAt"), 'YYYY-MM') as month,
        COALESCE(SUM("laborValue"), 0)::float as revenue
      FROM "Service"
      WHERE "performedAt" >= ${chartYearStart} AND "performedAt" < ${chartYearEnd} AND "status" = 'concluido'
      GROUP BY 1
    `,
    prisma.$queryRaw<{ month: string; expenses: number }[]>`
      SELECT to_char(date_trunc('month', "date"), 'YYYY-MM') as month,
        COALESCE(SUM("amount"), 0)::float as expenses
      FROM "Expense"
      WHERE "date" >= ${chartYearStart} AND "date" < ${chartYearEnd}
      GROUP BY 1
    `,
    prisma.service.aggregate({
      _sum: { laborValue: true },
      where: {
        status: "concluido",
        performedAt: { gte: selMonthStart, lt: selMonthEnd },
      },
    }),
    prisma.expense.aggregate({
      _sum: { amount: true },
      where: { date: { gte: selMonthStart, lt: selMonthEnd } },
    }),
    prisma.client.count({
      where: { createdAt: { gte: selMonthStart, lt: selMonthEnd } },
    }),
    prisma.quotationItem.findMany({
      where: { quotation: { status: "aprovado" } },
      include: { priceItem: true },
    }),
    prisma.quotation.findMany({
      where: { status: { in: ["rascunho", "enviado"] } },
      include: { items: true },
    }),
    prisma.service.findMany({
      where: {
        hasWarranty: true,
        warrantyUntil: { gte: now, lte: addDays(now, 30) },
      },
      include: { client: true },
      orderBy: { warrantyUntil: "asc" },
    }),
  ]);

  const revenueByMonth = new Map(revenueRows.map((r) => [r.month, r.revenue]));
  const expensesByMonth = new Map(
    expenseRows.map((r) => [r.month, r.expenses]),
  );

  const monthly: MonthlyPoint[] = yearMonthKeys(selectedYear).map(
    ({ key, year, month }) => {
      const revenue = revenueByMonth.get(key) ?? 0;
      const expenses = expensesByMonth.get(key) ?? 0;
      return {
        month: key,
        label: monthLabel(year, month),
        revenue,
        profit: revenue - expenses,
      };
    },
  );

  const categoryTotals = new Map<string, number>();
  for (const item of categoryItems) {
    const category = item.priceItem?.category ?? "Outros";
    categoryTotals.set(
      category,
      (categoryTotals.get(category) ?? 0) + Number(item.lineTotal),
    );
  }
  const categoryBreakdown: CategoryBreakdownPoint[] = Array.from(
    categoryTotals.entries(),
  )
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);

  const pendingQuotationsValue = pendingQuotations.reduce((sum, q) => {
    const { total } = computeQuotationTotals(
      q.items.map((i) => ({ lineTotal: Number(i.lineTotal) })),
      q.discountPercent ? Number(q.discountPercent) : null,
    );
    return sum + total;
  }, 0);

  const revenueInMonth = Number(revenueInMonthAgg._sum.laborValue ?? 0);
  const expensesInMonth = Number(expensesInMonthAgg._sum.amount ?? 0);

  return {
    selectedMonth,
    selectedYear,
    kpis: {
      newClientsInMonth,
      revenueInMonth,
      profitInMonth: revenueInMonth - expensesInMonth,
      pendingQuotationsCount: pendingQuotations.length,
      pendingQuotationsValue,
    },
    monthly,
    categoryBreakdown,
    upcomingWarranties: upcomingServices.map((service) => ({
      id: service.id,
      clientId: service.clientId,
      clientName: service.client.name,
      title: service.title,
      warrantyUntil: service.warrantyUntil!,
    })),
  };
}
