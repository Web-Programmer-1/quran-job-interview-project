/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RevelationPlace" AS ENUM ('MAKKAH', 'MADINAH');

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";
