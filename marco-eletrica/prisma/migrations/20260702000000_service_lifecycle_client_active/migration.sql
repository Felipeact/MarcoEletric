-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "completionReport" TEXT,
ADD COLUMN     "marginPercent" DECIMAL(5,2),
ADD COLUMN     "serviceNumber" SERIAL NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'aberto';

-- CreateTable
CREATE TABLE "ServiceItem" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "ServiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServiceItem_serviceId_idx" ON "ServiceItem"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_serviceNumber_key" ON "Service"("serviceNumber");

-- CreateIndex
CREATE INDEX "Service_status_idx" ON "Service"("status");

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

