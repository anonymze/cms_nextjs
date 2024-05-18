/*
  Warnings:

  - The required column `uuid` was added to the `Media_Details` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media_Details" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
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
CREATE UNIQUE INDEX "Media_Details_uuid_key" ON "Media_Details"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
