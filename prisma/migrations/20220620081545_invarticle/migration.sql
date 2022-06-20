/*
  Warnings:

  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_userId_fkey";

-- DropTable
DROP TABLE "bookmarks";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "invarticle" (
    "articlecode" TEXT NOT NULL,
    "articlename" TEXT NOT NULL,
    "vendorkey" TEXT NOT NULL,
    "vendorname" TEXT NOT NULL,
    "categoryinit" TEXT NOT NULL,
    "categoryname" TEXT NOT NULL,
    "typeinit" TEXT NOT NULL,
    "typename" TEXT NOT NULL,
    "startdate" TIMESTAMP(3) NOT NULL,
    "expiredate" TIMESTAMP(3) NOT NULL,
    "colourinit" TEXT NOT NULL,
    "colourname" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "baseprice" INTEGER NOT NULL,
    "saleprice" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "logdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invarticle_pkey" PRIMARY KEY ("articlecode")
);
