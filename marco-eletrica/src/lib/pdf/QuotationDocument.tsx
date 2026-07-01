import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { siteConfig } from "@/lib/site";
import { formatCurrencyBRL, formatDateBR } from "@/lib/format";
import { computeQuotationTotals } from "@/lib/quotationTotals";
import { QUOTATION_STATUS_LABELS } from "@/lib/validation/quotation";

const BRAND_COLOR = "#2563eb";
const ACCENT_COLOR = "#f59e0b";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#0f172a",
  },
  headerRule: {
    height: 3,
    backgroundColor: ACCENT_COLOR,
    marginBottom: 16,
  },
  wordmark: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: BRAND_COLOR,
  },
  headerInfoRow: {
    marginTop: 4,
    color: "#475569",
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#64748b",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 4,
    marginBottom: 4,
  },
  tableHeaderCell: {
    fontFamily: "Helvetica-Bold",
    color: "#64748b",
    fontSize: 9,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  colDescription: { width: "46%" },
  colQty: { width: "12%" },
  colUnitPrice: { width: "20%" },
  colTotal: { width: "22%", textAlign: "right" },
  totalsBox: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  totalsRow: {
    flexDirection: "row",
    width: 220,
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  totalsLabel: { color: "#475569" },
  grandTotalRow: {
    flexDirection: "row",
    width: 220,
    justifyContent: "space-between",
    paddingTop: 6,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: "#cbd5e1",
  },
  grandTotalLabel: { fontFamily: "Helvetica-Bold", fontSize: 12 },
  grandTotalValue: { fontFamily: "Helvetica-Bold", fontSize: 12 },
  disclaimer: {
    marginTop: 24,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
    fontSize: 9,
    color: "#475569",
  },
  footer: {
    marginTop: 24,
    fontSize: 9,
    color: "#94a3b8",
  },
});

export type QuotationPdfData = {
  id: string;
  status: string;
  createdAt: Date;
  notes: string | null;
  discountPercent: number | null;
  clientName: string;
  clientPhone: string | null;
  clientAddress: string | null;
  items: {
    descriptionSnapshot: string;
    unitSnapshot: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
  }[];
};

export function QuotationDocument({ quotation }: { quotation: QuotationPdfData }) {
  const { subtotal, discountAmount, total } = computeQuotationTotals(
    quotation.items,
    quotation.discountPercent,
  );

  return (
    <Document title={`Orçamento ${quotation.id}`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.wordmark}>{siteConfig.name.toUpperCase()}</Text>
        <View style={styles.headerRule} />
        <View style={styles.headerInfoRow}>
          <Text>{siteConfig.owner}</Text>
          <Text>{siteConfig.phoneDisplay}</Text>
          <Text>{siteConfig.serviceArea}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Orçamento</Text>
          <Text>Data de emissão: {formatDateBR(quotation.createdAt)}</Text>
          <Text>
            Status: {QUOTATION_STATUS_LABELS[quotation.status] ?? quotation.status}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cliente</Text>
          <Text>{quotation.clientName}</Text>
          {quotation.clientPhone && <Text>{quotation.clientPhone}</Text>}
          {quotation.clientAddress && <Text>{quotation.clientAddress}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Itens</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colDescription]}>
              Descrição
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colQty]}>Qtd.</Text>
            <Text style={[styles.tableHeaderCell, styles.colUnitPrice]}>
              Valor unit.
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colTotal]}>
              Total
            </Text>
          </View>
          {quotation.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.colDescription}>
                {item.descriptionSnapshot}
              </Text>
              <Text style={styles.colQty}>
                {item.quantity} {item.unitSnapshot}
              </Text>
              <Text style={styles.colUnitPrice}>
                {formatCurrencyBRL(item.unitPrice)}
              </Text>
              <Text style={styles.colTotal}>
                {formatCurrencyBRL(item.lineTotal)}
              </Text>
            </View>
          ))}

          <View style={styles.totalsBox}>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Subtotal</Text>
              <Text>{formatCurrencyBRL(subtotal)}</Text>
            </View>
            {discountAmount > 0 && (
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Desconto</Text>
                <Text>-{formatCurrencyBRL(discountAmount)}</Text>
              </View>
            )}
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total</Text>
              <Text style={styles.grandTotalValue}>
                {formatCurrencyBRL(total)}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          Os valores apresentados referem-se exclusivamente à mão de obra.
          Materiais e insumos não estão inclusos neste orçamento, salvo
          indicação em contrário.
        </Text>

        {quotation.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Observações</Text>
            <Text>{quotation.notes}</Text>
          </View>
        )}

        <Text style={styles.footer}>
          Orçamento gerado por {siteConfig.name} — {siteConfig.url}
        </Text>
      </Page>
    </Document>
  );
}
