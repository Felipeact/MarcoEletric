import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";
import { QuotationDocument } from "@/lib/pdf/QuotationDocument";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const isValid = await verifySessionToken(
    cookieStore.get(SESSION_COOKIE)?.value,
  );
  if (!isValid) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const quotation = await prisma.quotation.findUnique({
    where: { id },
    include: { client: true, items: true },
  });

  if (!quotation) {
    return NextResponse.json(
      { error: "Orçamento não encontrado." },
      { status: 404 },
    );
  }

  const buffer = await renderToBuffer(
    QuotationDocument({
      quotation: {
        id: quotation.id,
        status: quotation.status,
        createdAt: quotation.createdAt,
        notes: quotation.notes,
        discountPercent: quotation.discountPercent
          ? Number(quotation.discountPercent)
          : null,
        clientName:
          quotation.client?.name ?? quotation.clientNameSnapshot ?? "Cliente",
        clientPhone: quotation.client?.phone ?? null,
        clientAddress: quotation.client?.address ?? null,
        items: quotation.items.map((item) => ({
          descriptionSnapshot: item.descriptionSnapshot,
          unitSnapshot: item.unitSnapshot,
          unitPrice: Number(item.unitPrice),
          quantity: Number(item.quantity),
          lineTotal: Number(item.lineTotal),
        })),
      },
    }),
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="orcamento-${quotation.id}.pdf"`,
    },
  });
}
