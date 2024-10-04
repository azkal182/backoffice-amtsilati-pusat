-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NULL DEFAULT 'USER',

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Poster` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NULL,
    `url` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `publish` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `firstPublished` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `maximumPurchase` INTEGER NOT NULL,
    `pageTotal` INTEGER NOT NULL,
    `isbn` VARCHAR(191) NULL,
    `width` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `cover` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `isHijri` BOOLEAN NOT NULL,
    `isCutiBersama` BOOLEAN NOT NULL DEFAULT false,
    `calculateAge` BOOLEAN NOT NULL DEFAULT false,
    `showYear` BOOLEAN NOT NULL DEFAULT false,
    `frequency` ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'HIJRI_MONTHLY', 'HIJRI_YEARLY') NOT NULL,
    `category` ENUM('HARI_LIBUR_NASIONAL', 'HARI_BESAR_ISLAM', 'HARI_BESAR_PPDF', 'HARI_SUNNAH') NOT NULL,
    `duration` INTEGER NULL,
    `endDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PriceSyahriyah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `priceAtHijri` VARCHAR(191) NOT NULL,
    `priceAtMasehi` DATETIME(3) NULL,
    `priceFull` INTEGER NOT NULL,
    `priceDisc` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengurus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nis` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `Pengurus_nis_key`(`nis`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PengurusStatusHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pengurusId` INTEGER NOT NULL,
    `categoryPrice` ENUM('FULL', 'DISC', 'FREE') NULL DEFAULT 'FULL',
    `startFormHijri` VARCHAR(191) NOT NULL,
    `startMasehiAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Province` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Regency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `code` VARCHAR(191) NOT NULL,
    `fullCode` VARCHAR(191) NOT NULL,
    `provinceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `District` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `fullCode` VARCHAR(191) NOT NULL,
    `regencyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Village` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `fullCode` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `districtId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` VARCHAR(191) NOT NULL,
    `nis` VARCHAR(191) NOT NULL,
    `noRek` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `transactionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `totalAmount` DOUBLE NOT NULL,
    `paymentCode` VARCHAR(191) NOT NULL,
    `paymentMethod` VARCHAR(191) NOT NULL,
    `status` ENUM('PAID', 'REFUNDED', 'CANCELLED', 'FAILURE', 'PENDING', 'EXPIRED') NOT NULL,
    `traceId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sandiId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `total` DOUBLE NOT NULL,
    `transactionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PengurusStatusHistory` ADD CONSTRAINT `PengurusStatusHistory_pengurusId_fkey` FOREIGN KEY (`pengurusId`) REFERENCES `Pengurus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Regency` ADD CONSTRAINT `Regency_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `Province`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `District` ADD CONSTRAINT `District_regencyId_fkey` FOREIGN KEY (`regencyId`) REFERENCES `Regency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Village` ADD CONSTRAINT `Village_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `District`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionDetail` ADD CONSTRAINT `TransactionDetail_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
