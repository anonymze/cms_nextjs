/*
  Warnings:

  - A unique constraint covering the columns `[article,lang]` on the table `Article_I18n` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[page,lang]` on the table `Page_I18n` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Article_I18n_article_lang_key" ON "Article_I18n"("article", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "Page_I18n_page_lang_key" ON "Page_I18n"("page", "lang");
