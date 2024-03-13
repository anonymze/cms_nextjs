/*
  Warnings:

  - Added the required column `i18n` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `i18n` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "i18n" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Page" ("createdAt", "id", "uuid") SELECT "createdAt", "id", "uuid" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
CREATE UNIQUE INDEX "Page_uuid_key" ON "Page"("uuid");
CREATE INDEX "Page_uuid_idx" ON "Page"("uuid");
CREATE TABLE "new_Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "i18n" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Article" ("createdAt", "id", "uuid") SELECT "createdAt", "id", "uuid" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE UNIQUE INDEX "Article_uuid_key" ON "Article"("uuid");
CREATE INDEX "Article_uuid_idx" ON "Article"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
