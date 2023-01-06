/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `todos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "todos_userId_key" ON "todos"("userId");
