/*
  Warnings:

  - You are about to drop the column `userId` on the `Veichle` table. All the data in the column will be lost.
  - Added the required column `Ticketid` to the `Veichle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Veichle" DROP COLUMN "userId",
ADD COLUMN     "Ticketid" TEXT NOT NULL;
