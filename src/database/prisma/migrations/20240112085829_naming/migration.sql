/*
  Warnings:

  - You are about to drop the column `i18n` on the `Article_I18n` table. All the data in the column will be lost.
  - You are about to drop the column `i18n` on the `Page_I18n` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article_I18n" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "article" INTEGER NOT NULL,
    "lang" TEXT NOT NULL DEFAULT 'en_US',
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "conclusion" TEXT,
    CONSTRAINT "Article_I18n_article_fkey" FOREIGN KEY ("article") REFERENCES "Article" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Article_I18n" ("article", "conclusion", "content", "description", "id", "title") SELECT "article", "conclusion", "content", "description", "id", "title" FROM "Article_I18n";
DROP TABLE "Article_I18n";
ALTER TABLE "new_Article_I18n" RENAME TO "Article_I18n";
CREATE INDEX "Article_I18n_lang_idx" ON "Article_I18n"("lang");
CREATE TABLE "new_Page_I18n" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "page" INTEGER NOT NULL,
    "lang" TEXT NOT NULL DEFAULT 'en_US',
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    CONSTRAINT "Page_I18n_page_fkey" FOREIGN KEY ("page") REFERENCES "Page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Page_I18n" ("description", "id", "page", "subtitle", "title") SELECT "description", "id", "page", "subtitle", "title" FROM "Page_I18n";
DROP TABLE "Page_I18n";
ALTER TABLE "new_Page_I18n" RENAME TO "Page_I18n";
CREATE INDEX "Page_I18n_lang_idx" ON "Page_I18n"("lang");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
