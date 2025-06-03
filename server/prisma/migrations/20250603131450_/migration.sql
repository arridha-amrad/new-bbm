/*
  Warnings:

  - Added the required column `unified` to the `message_reactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `message_reactions` ADD COLUMN `unified` VARCHAR(191) NOT NULL;
