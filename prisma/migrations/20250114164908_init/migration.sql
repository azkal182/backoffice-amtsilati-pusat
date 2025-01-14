/*
  Warnings:

  - You are about to drop the column `authorId` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Article` table. All the data in the column will be lost.
  - You are about to alter the column `content` on the `Article` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Article` DROP COLUMN `authorId`,
    DROP COLUMN `categories`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL DEFAULT 'uncategory',
    MODIFY `content` JSON NOT NULL;
