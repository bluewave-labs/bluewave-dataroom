/*
  Warnings:

  - You are about to drop the column `name` on the `ArchivedUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ArchivedUser" DROP COLUMN "name",
ADD COLUMN     "first_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "last_name" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'ADMIN';
