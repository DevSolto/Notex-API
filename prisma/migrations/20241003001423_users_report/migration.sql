/*
  Warnings:

  - Added the required column `CreatorId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "CreatorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_CreatorId_fkey" FOREIGN KEY ("CreatorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
