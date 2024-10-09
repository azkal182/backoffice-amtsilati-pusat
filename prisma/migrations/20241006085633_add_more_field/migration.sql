/*
  Warnings:

  - Added the required column `shortName` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PaymentMethod` ADD COLUMN `shortName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `expiryLink` VARCHAR(191) NULL,
    ADD COLUMN `redirecturl` VARCHAR(191) NULL,
    ADD COLUMN `stringQr` VARCHAR(191) NULL,
    MODIFY `paymentCode` VARCHAR(191) NULL;
