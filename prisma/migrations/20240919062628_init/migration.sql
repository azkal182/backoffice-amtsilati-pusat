-- CreateEnum
CREATE TYPE "RepeatType" AS ENUM ('daily', 'weekly', 'monthly', 'yearly', 'specificDays');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poster" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publish" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Poster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "firstPublished" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "maximumPurchase" INTEGER NOT NULL,
    "pageTotal" INTEGER NOT NULL,
    "isbn" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "publisher" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "repeatType" "RepeatType" NOT NULL,
    "repeatDays" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
