/*
  Warnings:

  - You are about to drop the `administrador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `administrador` DROP FOREIGN KEY `Administrador_usuario_id_fkey`;

-- DropTable
DROP TABLE `administrador`;
