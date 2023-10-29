/*
  Warnings:

  - You are about to drop the column `filepath` on the `Upload` table. All the data in the column will be lost.
  - Added the required column `filepath_public` to the `Upload` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Upload" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "filepath_public" TEXT NOT NULL,
    "filetype" TEXT NOT NULL
);
INSERT INTO "new_Upload" ("filetype", "id", "uuid") SELECT "filetype", "id", "uuid" FROM "Upload";
DROP TABLE "Upload";
ALTER TABLE "new_Upload" RENAME TO "Upload";
CREATE UNIQUE INDEX "Upload_uuid_key" ON "Upload"("uuid");
CREATE INDEX "Upload_uuid_idx" ON "Upload"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
