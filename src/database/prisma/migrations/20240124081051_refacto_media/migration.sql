/*
  Warnings:

  - You are about to drop the `Upload` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Upload";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "filepath_public" TEXT NOT NULL,
    "filetype" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_uuid_key" ON "Media"("uuid");

-- CreateIndex
CREATE INDEX "Media_uuid_idx" ON "Media"("uuid");
