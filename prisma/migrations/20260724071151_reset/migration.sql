/*
  Warnings:

  - You are about to drop the column `image` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `products` table. All the data in the column will be lost.
  - Added the required column `name` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_userId_fkey";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "image",
DROP COLUMN "productId",
DROP COLUMN "title",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category",
DROP COLUMN "stock",
DROP COLUMN "thumbnail",
DROP COLUMN "title",
DROP COLUMN "userId",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;
