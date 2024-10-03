/*
  Warnings:

  - You are about to drop the `UserReportd` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserReportd" DROP CONSTRAINT "UserReportd_reportId_fkey";

-- DropForeignKey
ALTER TABLE "UserReportd" DROP CONSTRAINT "UserReportd_userId_fkey";

-- DropTable
DROP TABLE "UserReportd";

-- CreateTable
CREATE TABLE "UsersReport" (
    "userId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersReport_userId_reportId_key" ON "UsersReport"("userId", "reportId");

-- AddForeignKey
ALTER TABLE "UsersReport" ADD CONSTRAINT "UsersReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersReport" ADD CONSTRAINT "UsersReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
