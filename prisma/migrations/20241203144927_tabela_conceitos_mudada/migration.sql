/*
  Warnings:

  - You are about to drop the column `url` on the `Concept` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Concept` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Concept" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "av1" TEXT,
    "av2" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "creatorId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    CONSTRAINT "Concept_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Concept_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Concept_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Concept" ("createdAt", "creatorId", "id", "studentId", "updatedAt") SELECT "createdAt", "creatorId", "id", "studentId", "updatedAt" FROM "Concept";
DROP TABLE "Concept";
ALTER TABLE "new_Concept" RENAME TO "Concept";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
