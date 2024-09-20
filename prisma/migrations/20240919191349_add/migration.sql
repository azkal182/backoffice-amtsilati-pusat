/*
  Warnings:

  - You are about to drop the column `frequencyId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Frequency` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `frequency` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_frequencyId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "frequencyId",
ADD COLUMN     "frequency" "FrequencyType" NOT NULL;

-- DropTable
DROP TABLE "Frequency";

-- DropEnum
DROP TYPE "DayOfWeek";
