/*
  Warnings:

  - You are about to drop the `ExpenseByCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpenseSummary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseSummary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesSummary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpenseByCategory" DROP CONSTRAINT "ExpenseByCategory_expenseSummaryId_fkey";

-- DropForeignKey
ALTER TABLE "Purchases" DROP CONSTRAINT "Purchases_productId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_productId_fkey";

-- DropTable
DROP TABLE "ExpenseByCategory";

-- DropTable
DROP TABLE "ExpenseSummary";

-- DropTable
DROP TABLE "Expenses";

-- DropTable
DROP TABLE "Products";

-- DropTable
DROP TABLE "PurchaseSummary";

-- DropTable
DROP TABLE "Purchases";

-- DropTable
DROP TABLE "Sales";

-- DropTable
DROP TABLE "SalesSummary";

-- CreateTable
CREATE TABLE "Cards" (
    "cardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "num" TEXT NOT NULL,
    "set" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "rarity" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("cardId")
);

-- CreateTable
CREATE TABLE "SoldCards" (
    "saleId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "dateSold" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cardPrice" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,

    CONSTRAINT "SoldCards_pkey" PRIMARY KEY ("saleId")
);

-- CreateTable
CREATE TABLE "BoughtCards" (
    "purchaseId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cardCost" INTEGER NOT NULL,
    "totalCost" INTEGER NOT NULL,

    CONSTRAINT "BoughtCards_pkey" PRIMARY KEY ("purchaseId")
);

-- CreateTable
CREATE TABLE "Collection" (
    "collectionId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("collectionId")
);

-- CreateTable
CREATE TABLE "SoldCardSummary" (
    "soldCardSummaryId" TEXT NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "changePercentage" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SoldCardSummary_pkey" PRIMARY KEY ("soldCardSummaryId")
);

-- CreateTable
CREATE TABLE "BoughtCardSummary" (
    "boughtCardSummaryId" TEXT NOT NULL,
    "totalPurchased" DOUBLE PRECISION NOT NULL,
    "changePercentage" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoughtCardSummary_pkey" PRIMARY KEY ("boughtCardSummaryId")
);

-- CreateTable
CREATE TABLE "CollectionSummary" (
    "collectionSummaryId" TEXT NOT NULL,
    "totalExpenses" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectionSummary_pkey" PRIMARY KEY ("collectionSummaryId")
);

-- CreateTable
CREATE TABLE "CollectionByCategory" (
    "collectionByCategoryId" TEXT NOT NULL,
    "collectionSummaryId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectionByCategory_pkey" PRIMARY KEY ("collectionByCategoryId")
);

-- AddForeignKey
ALTER TABLE "SoldCards" ADD CONSTRAINT "SoldCards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Cards"("cardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoughtCards" ADD CONSTRAINT "BoughtCards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Cards"("cardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionByCategory" ADD CONSTRAINT "CollectionByCategory_collectionSummaryId_fkey" FOREIGN KEY ("collectionSummaryId") REFERENCES "CollectionSummary"("collectionSummaryId") ON DELETE RESTRICT ON UPDATE CASCADE;
