/*
  Warnings:

  - You are about to drop the column `userId` on the `properties` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_userId_fkey";

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "userId";
