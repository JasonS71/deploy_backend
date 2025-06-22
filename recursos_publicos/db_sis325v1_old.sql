-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-04-2025 a las 23:46:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_sis325v1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acciones_administrativas`
--

CREATE TABLE `acciones_administrativas` (
  `id` int(11) NOT NULL,
  `administrador_id` int(11) NOT NULL,
  `tipo_accion` varchar(50) NOT NULL,
  `entidad_afectada` varchar(50) NOT NULL,
  `id_entidad` int(11) NOT NULL,
  `detalles` varchar(191) DEFAULT NULL,
  `fecha_accion` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `descripcion`) VALUES
(1, 'celulares', 'categoria de celulares, tables, smartphones.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_orden`
--

CREATE TABLE `detalles_orden` (
  `orden_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadisticas_productos`
--

CREATE TABLE `estadisticas_productos` (
  `producto_id` int(11) NOT NULL,
  `fecha` datetime(3) NOT NULL,
  `vistas` int(11) NOT NULL DEFAULT 0,
  `clicks_contacto` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `estadisticas_productos`
--

INSERT INTO `estadisticas_productos` (`producto_id`, `fecha`, `vistas`, `clicks_contacto`) VALUES
(3, '2025-04-06 04:00:00.000', 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorito`
--

CREATE TABLE `favorito` (
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `fecha_agregado` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenproducto`
--

CREATE TABLE `imagenproducto` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `url_imagen` varchar(255) NOT NULL,
  `orden` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `imagenproducto`
--

INSERT INTO `imagenproducto` (`id`, `producto_id`, `url_imagen`, `orden`) VALUES
(1, 3, 'https://example.com/imagen1.jpg', 0),
(2, 3, 'https://example.com/imagen2.jpg', 1),
(3, 4, 'https://example.com/imagen1.jpg', 0),
(4, 4, 'https://example.com/imagen2.jpg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje`
--

CREATE TABLE `mensaje` (
  `id` int(11) NOT NULL,
  `remitente_id` int(11) NOT NULL,
  `destinatario_id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `asunto` varchar(100) DEFAULT NULL,
  `contenido` varchar(191) NOT NULL,
  `fecha_envio` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `leido` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

CREATE TABLE `orden` (
  `id` int(11) NOT NULL,
  `comprador_id` int(11) NOT NULL,
  `fecha_orden` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `estado` enum('pendiente','procesando','enviado','entregado','cancelado') NOT NULL DEFAULT 'pendiente',
  `total` decimal(10,2) NOT NULL,
  `direccion_envio` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(191) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `fecha_publicacion` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `vendedor_id`, `categoria_id`, `nombre`, `descripcion`, `precio`, `stock`, `fecha_publicacion`, `activo`) VALUES
(3, 1, 1, 'Smartphone XYZ', 'Smartphone de última generación con 8GB de RAM y 256GB de almacenamiento', 9999.99, 20, '2025-04-06 20:30:45.702', 1),
(4, 1, 1, 'Smartphone de Cesar', 'Smartphone de última generación con 8GB de RAM y 256GB de almacenamiento', 9999.99, 20, '2025-04-06 21:32:36.466', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promociones`
--

CREATE TABLE `promociones` (
  `id` int(11) NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `descripcion` varchar(191) NOT NULL,
  `descuento` decimal(5,2) NOT NULL,
  `fecha_inicio` datetime(3) NOT NULL,
  `fecha_fin` datetime(3) NOT NULL,
  `activa` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `id` int(11) NOT NULL,
  `administrador_id` int(11) NOT NULL,
  `tipo_reporte` varchar(50) NOT NULL,
  `parametros` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`parametros`)),
  `fecha_generacion` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `contenido` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reseñas`
--

CREATE TABLE `reseñas` (
  `id` int(11) NOT NULL,
  `orden_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `calificacion` int(11) NOT NULL,
  `comentario` varchar(191) DEFAULT NULL,
  `fecha_publicacion` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(191) DEFAULT NULL,
  `fecha_registro` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `ultimo_login` datetime(3) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `es_vendedor` tinyint(1) NOT NULL DEFAULT 0,
  `es_administrador` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `email`, `password_hash`, `nombre`, `apellido`, `telefono`, `direccion`, `fecha_registro`, `ultimo_login`, `activo`, `es_vendedor`, `es_administrador`) VALUES
(1, 'comprador@example.com', '$2b$10$3Tbk6yZPTf7AcjuQlvywO.ZevNjEQt653cvtRozdOO0Q4jD0ScOUK', 'Juan', 'Pérez', '1234567890', 'Calle Principal 123', '2025-04-06 20:24:02.278', '2025-04-06 21:28:53.458', 1, 1, 0),
(2, 'vos@example.com', '$2b$10$G2qD3kMLAHnpetIhTcqWnO49M7zzoBCkA0yO5ZQ/FrArtRfgiZhfa', 'Cesar', 'Pérez', '1234567890', 'Calle Principal 123', '2025-04-06 21:16:44.302', '2025-04-06 21:27:21.472', 1, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vendedor`
--

CREATE TABLE `vendedor` (
  `usuario_id` int(11) NOT NULL,
  `nombre_tienda` varchar(100) NOT NULL,
  `descripcion_tienda` varchar(191) DEFAULT NULL,
  `rfc` varchar(20) DEFAULT NULL,
  `cuenta_bancaria` varchar(50) DEFAULT NULL,
  `calificacion_promedio` decimal(3,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `vendedor`
--

INSERT INTO `vendedor` (`usuario_id`, `nombre_tienda`, `descripcion_tienda`, `rfc`, `cuenta_bancaria`, `calificacion_promedio`) VALUES
(1, 'Tienda de Juan', 'Venta de productos electrónicos y accesorios', 'XAXX010101000', '0123456789', 0.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('99de5858-6edb-4442-8ada-32a4e83dda0e', 'fbe9690798a910b75be23283bc721d2ea7b0f000418e6d35a1363d5817541e22', '2025-04-06 19:51:30.025', '20250406195128_init', NULL, NULL, '2025-04-06 19:51:28.247', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `acciones_administrativas`
--
ALTER TABLE `acciones_administrativas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `acciones_administrativas_administrador_id_fkey` (`administrador_id`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalles_orden`
--
ALTER TABLE `detalles_orden`
  ADD PRIMARY KEY (`orden_id`,`producto_id`),
  ADD KEY `detalles_orden_producto_id_fkey` (`producto_id`);

--
-- Indices de la tabla `estadisticas_productos`
--
ALTER TABLE `estadisticas_productos`
  ADD PRIMARY KEY (`producto_id`,`fecha`);

--
-- Indices de la tabla `favorito`
--
ALTER TABLE `favorito`
  ADD PRIMARY KEY (`usuario_id`,`producto_id`),
  ADD KEY `Favorito_producto_id_fkey` (`producto_id`);

--
-- Indices de la tabla `imagenproducto`
--
ALTER TABLE `imagenproducto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ImagenProducto_producto_id_fkey` (`producto_id`);

--
-- Indices de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Mensaje_remitente_id_fkey` (`remitente_id`),
  ADD KEY `Mensaje_destinatario_id_fkey` (`destinatario_id`),
  ADD KEY `Mensaje_producto_id_fkey` (`producto_id`);

--
-- Indices de la tabla `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Orden_comprador_id_fkey` (`comprador_id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Producto_vendedor_id_fkey` (`vendedor_id`),
  ADD KEY `Producto_categoria_id_fkey` (`categoria_id`);

--
-- Indices de la tabla `promociones`
--
ALTER TABLE `promociones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `promociones_vendedor_id_fkey` (`vendedor_id`),
  ADD KEY `promociones_producto_id_fkey` (`producto_id`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reportes_administrador_id_fkey` (`administrador_id`);

--
-- Indices de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reseñas_orden_id_fkey` (`orden_id`),
  ADD KEY `reseñas_producto_id_fkey` (`producto_id`),
  ADD KEY `reseñas_usuario_id_fkey` (`usuario_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Usuario_email_key` (`email`);

--
-- Indices de la tabla `vendedor`
--
ALTER TABLE `vendedor`
  ADD PRIMARY KEY (`usuario_id`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acciones_administrativas`
--
ALTER TABLE `acciones_administrativas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `imagenproducto`
--
ALTER TABLE `imagenproducto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orden`
--
ALTER TABLE `orden`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `promociones`
--
ALTER TABLE `promociones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `acciones_administrativas`
--
ALTER TABLE `acciones_administrativas`
  ADD CONSTRAINT `acciones_administrativas_administrador_id_fkey` FOREIGN KEY (`administrador_id`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalles_orden`
--
ALTER TABLE `detalles_orden`
  ADD CONSTRAINT `detalles_orden_orden_id_fkey` FOREIGN KEY (`orden_id`) REFERENCES `orden` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `detalles_orden_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `estadisticas_productos`
--
ALTER TABLE `estadisticas_productos`
  ADD CONSTRAINT `estadisticas_productos_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `favorito`
--
ALTER TABLE `favorito`
  ADD CONSTRAINT `Favorito_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Favorito_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `imagenproducto`
--
ALTER TABLE `imagenproducto`
  ADD CONSTRAINT `ImagenProducto_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD CONSTRAINT `Mensaje_destinatario_id_fkey` FOREIGN KEY (`destinatario_id`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Mensaje_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Mensaje_remitente_id_fkey` FOREIGN KEY (`remitente_id`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `Orden_comprador_id_fkey` FOREIGN KEY (`comprador_id`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `Producto_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Producto_vendedor_id_fkey` FOREIGN KEY (`vendedor_id`) REFERENCES `vendedor` (`usuario_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `promociones`
--
ALTER TABLE `promociones`
  ADD CONSTRAINT `promociones_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `promociones_vendedor_id_fkey` FOREIGN KEY (`vendedor_id`) REFERENCES `vendedor` (`usuario_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD CONSTRAINT `reportes_administrador_id_fkey` FOREIGN KEY (`administrador_id`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD CONSTRAINT `reseñas_orden_id_fkey` FOREIGN KEY (`orden_id`) REFERENCES `orden` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reseñas_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reseñas_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `vendedor`
--
ALTER TABLE `vendedor`
  ADD CONSTRAINT `Vendedor_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
