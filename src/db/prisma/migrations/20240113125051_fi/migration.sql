/*
  Warnings:

  - You are about to drop the column `i18n` on the `Page` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Page" ("createdAt", "id", "uuid") SELECT "createdAt", "id", "uuid" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
CREATE UNIQUE INDEX "Page_uuid_key" ON "Page"("uuid");
CREATE INDEX "Page_uuid_idx" ON "Page"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
