"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Bar as HBar,
  BarChart,
  CartesianGrid as HGrid,
  Cell,
  Tooltip as HTooltip,
  XAxis as HXAxis,
  YAxis as HYAxis,
} from "recharts";
import { formatCurrencyBRL } from "@/lib/format";

const BRAND_BLUE = "#2563eb";
const ACCENT_AMBER = "#f59e0b";
const CATEGORY_COLORS = [
  "#2a78d6",
  "#1baf7a",
  "#eda100",
  "#008300",
  "#4a3aa7",
];

export function RevenueProfitChart({
  data,
}: {
  data: { label: string; revenue: number; profit: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#e2e8f0" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={{ stroke: "#e2e8f0" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => formatCurrencyBRL(value)}
          width={90}
        />
        <Tooltip formatter={(value) => formatCurrencyBRL(Number(value))} />
        <Legend />
        <Bar
          dataKey="revenue"
          name="Receita"
          fill={BRAND_BLUE}
          radius={[4, 4, 0, 0]}
          maxBarSize={24}
        />
        <Line
          dataKey="profit"
          name="Lucro"
          stroke={ACCENT_AMBER}
          strokeWidth={2}
          dot={{ r: 4, fill: ACCENT_AMBER, strokeWidth: 0 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export function CategoryBreakdownChart({
  data,
}: {
  data: { category: string; total: number }[];
}) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Sem orçamentos aprovados no período para compor a distribuição.
      </p>
    );
  }

  const total = data.reduce((sum, d) => sum + d.total, 0);

  return (
    <div>
      <ResponsiveContainer width="100%" height={Math.max(200, data.length * 48)}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 24, left: 8, bottom: 0 }}
        >
          <HGrid horizontal={false} stroke="#e2e8f0" />
          <HXAxis
            type="number"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatCurrencyBRL(value)}
          />
          <HYAxis
            type="category"
            dataKey="category"
            tick={{ fontSize: 12, fill: "#334155" }}
            axisLine={false}
            tickLine={false}
            width={180}
          />
          <HTooltip formatter={(value) => formatCurrencyBRL(Number(value))} />
          <HBar dataKey="total" radius={[0, 4, 4, 0]} maxBarSize={24}>
            {data.map((entry, index) => (
              <Cell
                key={entry.category}
                fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
              />
            ))}
          </HBar>
        </BarChart>
      </ResponsiveContainer>
      <table className="mt-4 w-full text-left text-sm">
        <thead className="text-xs font-semibold uppercase text-slate-500">
          <tr>
            <th className="py-1">Categoria</th>
            <th className="py-1">Total</th>
            <th className="py-1">% do total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((entry, index) => (
            <tr key={entry.category}>
              <td className="flex items-center gap-2 py-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                  }}
                />
                {entry.category}
              </td>
              <td className="py-1.5">{formatCurrencyBRL(entry.total)}</td>
              <td className="py-1.5">
                {total > 0 ? ((entry.total / total) * 100).toFixed(1) : "0"}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
