import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";
import { priceCatalogData } from "../../../../../prisma/priceCatalogData";

export async function GET() {
  const cookieStore = await cookies();
  const isValid = await verifySessionToken(
    cookieStore.get(SESSION_COOKIE)?.value,
  );
  if (!isValid) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let created = 0;

  for (const item of priceCatalogData) {
    const existing = await prisma.priceItem.findFirst({
      where: { category: item.category, name: item.name },
    });
    if (!existing) {
      await prisma.priceItem.create({ data: item });
      created += 1;
    }
  }

  return NextResponse.json({
    total: priceCatalogData.length,
    created,
    message: `Catálogo verificado: ${created} de ${priceCatalogData.length} itens criados (os demais já existiam).`,
  });
}
