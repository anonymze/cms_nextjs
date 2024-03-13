/*
  Warnings:

  - You are about to drop the column `description` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `conclusion` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Article` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Article_I18n" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "article" INTEGER NOT NULL,
    "i18n" TEXT NOT NULL DEFAULT 'en_US',
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "conclusion" TEXT,
    CONSTRAINT "Article_I18n_article_fkey" FOREIGN KEY ("article") REFERENCES "Article" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Page_I18n" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "page" INTEGER NOT NULL,
    "i18n" TEXT NOT NULL DEFAULT 'en_US',
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    CONSTRAINT "Page_I18n_page_fkey" FOREIGN KEY ("page") REFERENCES "Page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "i18n" INTEGER,
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
    "i18n" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Article" ("createdAt", "id", "uuid") SELECT "createdAt", "id", "uuid" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE UNIQUE INDEX "Article_uuid_key" ON "Article"("uuid");
CREATE INDEX "Article_uuid_idx" ON "Article"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "Article_I18n_i18n_idx" ON "Article_I18n"("i18n");

-- CreateIndex
CREATE INDEX "Page_I18n_i18n_idx" ON "Page_I18n"("i18n");
