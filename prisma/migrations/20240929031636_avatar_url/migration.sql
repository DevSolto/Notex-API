/*
  Warnings:

  - Added the required column `avatarUrl` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "avatarUrl" TEXT NOT NULL;
