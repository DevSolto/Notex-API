/*
  Warnings:

  - You are about to drop the column `CreatorId` on the `Report` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_CreatorId_fkey";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "CreatorId",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
