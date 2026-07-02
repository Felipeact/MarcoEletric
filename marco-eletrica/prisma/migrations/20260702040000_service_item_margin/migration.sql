-- AlterTable
ALTER TABLE "Service" DROP COLUMN "marginPercent";

-- AlterTable
ALTER TABLE "ServiceItem" ADD COLUMN     "marginPercent" DECIMAL(5,2);

