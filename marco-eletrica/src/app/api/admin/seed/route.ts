import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";
import { priceCatalogData } from "../../../../../prisma/priceCatalogData";
import { galleryData } from "../../../../../prisma/galleryData";

export async function GET() {
  const cookieStore = await cookies();
  const isValid = await verifySessionToken(
    cookieStore.get(SESSION_COOKIE)?.value,
  );
  if (!isValid) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let priceItemsCreated = 0;
  for (const item of priceCatalogData) {
    const existing = await prisma.priceItem.findFirst({
      where: { category: item.category, name: item.name },
    });
    if (!existing) {
      await prisma.priceItem.create({ data: item });
      priceItemsCreated += 1;
    }
  }

  let galleryItemsCreated = 0;
  for (const item of galleryData) {
    const existing = await prisma.galleryItem.findFirst({
      where: { imageUrl: item.imageUrl },
    });
    if (!existing) {
      await prisma.galleryItem.create({ data: item });
      galleryItemsCreated += 1;
    }
  }

  return NextResponse.json({
    priceItems: { total: priceCatalogData.length, created: priceItemsCreated },
    galleryItems: { total: galleryData.length, created: galleryItemsCreated },
    message: `Catálogo: ${priceItemsCreated} de ${priceCatalogData.length} itens criados. Galeria: ${galleryItemsCreated} de ${galleryData.length} imagens criadas (os demais já existiam).`,
  });
}
