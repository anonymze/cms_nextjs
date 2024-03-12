-- AlterTable
ALTER TABLE "Article" ADD COLUMN "eventCreatedAt" DATETIME;
ALTER TABLE "Article" ADD COLUMN "eventFinishedAt" DATETIME;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN "eventCreatedAt" DATETIME;
ALTER TABLE "Page" ADD COLUMN "eventFinishedAt" DATETIME;
