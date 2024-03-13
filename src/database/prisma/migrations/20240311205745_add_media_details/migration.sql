-- AlterTable
ALTER TABLE "Article_I18n" ADD COLUMN "media_details" INTEGER;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN "media_details" INTEGER;

-- AlterTable
ALTER TABLE "Page_I18n" ADD COLUMN "media_details" INTEGER;

-- CreateTable
CREATE TABLE "Media_Details" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "legend" TEXT,
    "tag" TEXT,
    "media" INTEGER NOT NULL,
    "page_i18n" INTEGER NOT NULL,
    "article_i18n" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Media_Details_media_fkey" FOREIGN KEY ("media") REFERENCES "Media" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Media_Details_page_i18n_fkey" FOREIGN KEY ("page_i18n") REFERENCES "Page_I18n" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Media_Details_article_i18n_fkey" FOREIGN KEY ("article_i18n") REFERENCES "Article_I18n" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
