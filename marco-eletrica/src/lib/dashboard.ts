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
  kpis: {
    newClientsThisMonth: number;
    revenueThisMonth: number;
    profitThisMonth: number;
    pendingQuotationsCount: number;
    pendingQuotationsValue: number;
  };
  monthly: MonthlyPoint[];
  categoryBreakdown: CategoryBreakdownPoint[];
  upcomingWarranties: WarrantyExpiration[];
};

function lastTwelveMonthKeys(): { key: string; year: number; month: number }[] {
  const now = new Date();
  const keys: { key: string; year: number; month: number }[] = [];
  for (let i = 11; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    keys.push({ key, year: d.getFullYear(), month: d.getMonth() });
  }
  return keys;
}

function monthLabel(year: number, month: number): string {
  return new Date(year, month, 1)
    .toLocaleDateString("pt-BR", { month: "short", year: "2-digit" })
    .replace(".", "");
}

export async function getDashboardData(): Promise<DashboardData> {
  const now = new Date();
  const monthKeys = lastTwelveMonthKeys();
  const earliestMonth = new Date(
    monthKeys[0].year,
    monthKeys[0].month,
    1,
  );

  const [revenueRows, expenseRows, clientRows, categoryItems, pendingQuotations, upcomingServices] =
    await Promise.all([
      prisma.$queryRaw<{ month: string; revenue: number; materialcost: number }[]>`
        SELECT to_char(date_trunc('month', "performedAt"), 'YYYY-MM') as month,
          COALESCE(SUM("laborValue"), 0)::float as revenue,
          COALESCE(SUM("materialCost"), 0)::float as materialcost
        FROM "Service"
        WHERE "performedAt" >= ${earliestMonth}
        GROUP BY 1
      `,
      prisma.$queryRaw<{ month: string; expenses: number }[]>`
        SELECT to_char(date_trunc('month', "date"), 'YYYY-MM') as month,
          COALESCE(SUM("amount"), 0)::float as expenses
        FROM "Expense"
        WHERE "date" >= ${earliestMonth}
        GROUP BY 1
      `,
      prisma.$queryRaw<{ month: string; count: number }[]>`
        SELECT to_char(date_trunc('month', "createdAt"), 'YYYY-MM') as month,
          COUNT(*)::int as count
        FROM "Client"
        WHERE "createdAt" >= ${earliestMonth}
        GROUP BY 1
      `,
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

  const revenueByMonth = new Map(
    revenueRows.map((r) => [r.month, { revenue: r.revenue, materialCost: r.materialcost }]),
  );
  const expensesByMonth = new Map(expenseRows.map((r) => [r.month, r.expenses]));
  const clientsByMonth = new Map(clientRows.map((r) => [r.month, r.count]));

  const monthly: MonthlyPoint[] = monthKeys.map(({ key, year, month }) => {
    const revenueData = revenueByMonth.get(key);
    const revenue = revenueData?.revenue ?? 0;
    const materialCost = revenueData?.materialCost ?? 0;
    const expenses = expensesByMonth.get(key) ?? 0;
    return {
      month: key,
      label: monthLabel(year, month),
      revenue,
      profit: revenue - materialCost - expenses,
    };
  });

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

  const currentMonthKey = monthKeys[monthKeys.length - 1].key;
  const revenueThisMonth = revenueByMonth.get(currentMonthKey)?.revenue ?? 0;
  const materialCostThisMonth =
    revenueByMonth.get(currentMonthKey)?.materialCost ?? 0;
  const expensesThisMonth = expensesByMonth.get(currentMonthKey) ?? 0;
  const newClientsThisMonth = clientsByMonth.get(currentMonthKey) ?? 0;

  return {
    kpis: {
      newClientsThisMonth,
      revenueThisMonth,
      profitThisMonth:
        revenueThisMonth - materialCostThisMonth - expensesThisMonth,
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
