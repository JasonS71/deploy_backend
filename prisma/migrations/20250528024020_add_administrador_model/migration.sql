-- CreateTable
CREATE TABLE `Administrador` (
    `usuario_id` INTEGER NOT NULL,
    `departamento` VARCHAR(100) NOT NULL,
    `nivel_acceso` VARCHAR(50) NOT NULL,
    `descripcion_responsabilidades` VARCHAR(191) NULL,
    `fecha_asignacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Administrador` ADD CONSTRAINT `Administrador_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
