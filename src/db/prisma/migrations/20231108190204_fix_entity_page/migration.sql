/*
  Warnings:

  - You are about to drop the column `subtitle` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `conclusion` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Page` table. All the data in the column will be lost.
  - Added the required column `content` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Page` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "conclusion" TEXT
);
INSERT INTO "new_Article" ("description", "id", "title", "uuid") SELECT "description", "id", "title", "uuid" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE UNIQUE INDEX "Article_uuid_key" ON "Article"("uuid");
CREATE INDEX "Article_uuid_idx" ON "Article"("uuid");
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Page" ("description", "id", "title", "uuid") SELECT "description", "id", "title", "uuid" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
CREATE UNIQUE INDEX "Page_uuid_key" ON "Page"("uuid");
CREATE INDEX "Page_uuid_idx" ON "Page"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
