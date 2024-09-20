/*
  Warnings:

  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `repeatDays` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `repeatType` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Event` table. All the data in the column will be lost.
  - Added the required column `frequencyId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isHijri` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FrequencyType" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'HIJRI_MONTHLY', 'HIJRI_YEARLY');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "date",
DROP COLUMN "description",
DROP COLUMN "repeatDays",
DROP COLUMN "repeatType",
DROP COLUMN "title",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "frequencyId" INTEGER NOT NULL,
ADD COLUMN     "isCutiBersama" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isHijri" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "RepeatType";

-- CreateTable
CREATE TABLE "Frequency" (
    "id" SERIAL NOT NULL,
    "type" "FrequencyType" NOT NULL,
    "interval" INTEGER DEFAULT 1,
    "dayOfWeek" "DayOfWeek",
    "weekOfMonth" INTEGER,
    "monthOfYear" INTEGER,
    "monthOfHijriYear" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Frequency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_frequencyId_fkey" FOREIGN KEY ("frequencyId") REFERENCES "Frequency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
