/*
  Warnings:

  - You are about to drop the `Studing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Studing" DROP CONSTRAINT "Studing_classId_fkey";

-- DropForeignKey
ALTER TABLE "Studing" DROP CONSTRAINT "Studing_userId_fkey";

-- DropTable
DROP TABLE "Studing";

-- CreateTable
CREATE TABLE "Studying" (
    "userId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Studying_userId_classId_key" ON "Studying"("userId", "classId");

-- AddForeignKey
ALTER TABLE "Studying" ADD CONSTRAINT "Studying_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Studying" ADD CONSTRAINT "Studying_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
