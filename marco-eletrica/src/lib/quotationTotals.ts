export function computeQuotationTotals(
  items: { lineTotal: number | string }[],
  discountPercent?: number | string | null,
) {
  const subtotal = items.reduce((sum, item) => sum + Number(item.lineTotal), 0);
  const discountAmount = discountPercent
    ? subtotal * (Number(discountPercent) / 100)
    : 0;
  const total = subtotal - discountAmount;
  return { subtotal, discountAmount, total };
}
