/*
  Warnings:

  - You are about to drop the column `article` on the `Article_I18n` table. All the data in the column will be lost.
  - You are about to drop the column `page` on the `Page_I18n` table. All the data in the column will be lost.
  - Added the required column `article_id` to the `Article_I18n` table without a default value. This is not possible if the table is not empty.
  - Added the required column `page_id` to the `Page_I18n` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article_I18n" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "article_id" INTEGER NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "conclusion" TEXT,
    CONSTRAINT "Article_I18n_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Article_I18n" ("conclusion", "content", "description", "id", "lang", "title") SELECT "conclusion", "content", "description", "id", "lang", "title" FROM "Article_I18n";
DROP TABLE "Article_I18n";
ALTER TABLE "new_Article_I18n" RENAME TO "Article_I18n";
CREATE INDEX "Article_I18n_lang_idx" ON "Article_I18n"("lang");
CREATE TABLE "new_Page_I18n" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "page_id" INTEGER NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    CONSTRAINT "Page_I18n_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Page_I18n" ("description", "id", "lang", "subtitle", "title") SELECT "description", "id", "lang", "subtitle", "title" FROM "Page_I18n";
DROP TABLE "Page_I18n";
ALTER TABLE "new_Page_I18n" RENAME TO "Page_I18n";
CREATE INDEX "Page_I18n_lang_idx" ON "Page_I18n"("lang");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
