import { PrismaClient } from "@prisma/client";
import { priceCatalogData } from "./priceCatalogData";

const prisma = new PrismaClient();

async function main() {
  for (const item of priceCatalogData) {
    const existing = await prisma.priceItem.findFirst({
      where: { category: item.category, name: item.name },
    });
    if (!existing) {
      await prisma.priceItem.create({ data: item });
    }
  }
  console.log(`Catálogo de preços: ${priceCatalogData.length} itens verificados/criados.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
