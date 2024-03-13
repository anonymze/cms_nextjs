/*
  Warnings:

  - The required column `uuid` was added to the `Upload` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Upload" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "filepath" TEXT NOT NULL,
    "filetype" TEXT NOT NULL
);
INSERT INTO "new_Upload" ("filepath", "filetype", "id") SELECT "filepath", "filetype", "id" FROM "Upload";
DROP TABLE "Upload";
ALTER TABLE "new_Upload" RENAME TO "Upload";
CREATE UNIQUE INDEX "Upload_uuid_key" ON "Upload"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
