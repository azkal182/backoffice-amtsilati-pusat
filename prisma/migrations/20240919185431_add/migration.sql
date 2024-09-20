/*
  Warnings:

  - Added the required column `category` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('HARI_LIBUR_NASIONAL', 'HARI_BESAR_ISLAM', 'HARI_BESAR_PPDF', 'HARI_SUNNAH');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "category" "Category" NOT NULL;
