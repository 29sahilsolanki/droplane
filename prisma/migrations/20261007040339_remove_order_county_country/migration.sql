/*
  Warnings:

  - You are about to drop the column `shipCountry` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shipCounty` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shipCountry",
DROP COLUMN "shipCounty";
