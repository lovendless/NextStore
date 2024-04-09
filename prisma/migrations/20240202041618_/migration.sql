/*
  Warnings:

  - You are about to drop the column `current` on the `City` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "City" DROP COLUMN "current",
ADD COLUMN     "default" BOOLEAN NOT NULL DEFAULT false;
