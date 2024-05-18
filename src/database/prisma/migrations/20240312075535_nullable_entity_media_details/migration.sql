/*
  Warnings:

  - You are about to drop the column `eventCreatedAt` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `eventFinishedAt` on the `Page` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media_Details" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "legend" TEXT,
    "tag" TEXT,
    "media" INTEGER NOT NULL,
    "page_i18n" INTEGER,
    "article_i18n" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Media_Details_media_fkey" FOREIGN KEY ("media") REFERENCES "Media" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Media_Details_page_i18n_fkey" FOREIGN KEY ("page_i18n") REFERENCES "Page_I18n" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Media_Details_article_i18n_fkey" FOREIGN KEY ("article_i18n") REFERENCES "Article_I18n" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Media_Details" ("article_i18n", "createdAt", "id", "legend", "media", "page_i18n", "tag", "title") SELECT "article_i18n", "createdAt", "id", "legend", "media", "page_i18n", "tag", "title" FROM "Media_Details";
DROP TABLE "Media_Details";
ALTER TABLE "new_Media_Details" RENAME TO "Media_Details";
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "tag" TEXT,
    "i18n" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Page" ("createdAt", "i18n", "id", "tag", "uuid") SELECT "createdAt", "i18n", "id", "tag", "uuid" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
CREATE UNIQUE INDEX "Page_uuid_key" ON "Page"("uuid");
CREATE INDEX "Page_uuid_idx" ON "Page"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
