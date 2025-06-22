-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-04-2025 a las 02:04:11
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
(1, 'electronica', 'equipo y componentes electronicos.'),
(2, 'ropa', 'todo tipo de ropa'),
(3, 'zapatillas', 'toda variedad de zapatillas'),
(4, 'cocina', 'cualquier accesorio legal');

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
(3, '2025-04-06 04:00:00.000', 2, 0),
(3, '2025-04-20 04:00:00.000', 5, 0),
(3, '2025-04-22 04:00:00.000', 3, 0),
(6, '2025-04-21 04:00:00.000', 8, 0),
(6, '2025-04-22 04:00:00.000', 14, 0),
(7, '2025-04-22 04:00:00.000', 2, 0),
(8, '2025-04-22 04:00:00.000', 10, 0),
(11, '2025-04-22 04:00:00.000', 6, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorito`
--

CREATE TABLE `favorito` (
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `fecha_agregado` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `favorito`
--

INSERT INTO `favorito` (`usuario_id`, `producto_id`, `fecha_agregado`) VALUES
(5, 4, '2025-04-21 08:04:49.122'),
(5, 5, '2025-04-21 07:42:31.143'),
(5, 6, '2025-04-20 14:49:45.256'),
(5, 7, '2025-04-21 01:50:45.445'),
(5, 8, '2025-04-22 19:40:27.174'),
(5, 11, '2025-04-22 19:40:51.516');

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
(1, 3, 'https://imgs.search.brave.com/PlrkaxdUFQ206THO8myZy0osJadB_vZjOtDnxBzWlLg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFVRENRN0NteEwu/anBn', 0),
(2, 3, 'https://imgs.search.brave.com/oA27SerbXHDrlCOjxb8yjuy-MJ1GFviXrmiE3wpASGE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFKMlo2MHRVN0wu/anBn', 1),
(3, 4, 'https://imgs.search.brave.com/R4O3EsXy2vFUkLclSlXWUFzpRtZ8S1H6n7j-vxvsc_M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mZG4y/LmdzbWFyZW5hLmNv/bS92di9iaWdwaWMv/aHVhd2VpLW1hdGUt/eHQtdWx0aW1hdGUu/anBn', 0),
(4, 4, 'https://imgs.search.brave.com/tc4LzEDYoyvlN77OTHpk6rqyhAuPiO7ppKUqn2p1Yz0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YW5kcm9pZGF1dGhv/cml0eS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjQvMDkv/SHVhd2VpLU1hdGUt/WFQtMS5qcGc', 1),
(5, 5, 'https://imgs.search.brave.com/pf02I_fHSXV71Q4PVNS5ip_mcSzm27ssGvZmfWE_Ggw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuZGFmaXRpLmNs/L3AvdmVzdHVhLTAw/MDMtMzA1MzIwMi0x/LWNhcnQuanBn', 0),
(6, 5, 'https://imgs.search.brave.com/8QhQKW-hPItVt2DC02oUzW9VF2wI0VjO_xnu3Cn35go/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuZGFmaXRpLmNs/L3AvdmVzdHVhLTAw/MDMtMzA1MzIwMi0x/LXByb2R1Y3QuanBn', 1),
(7, 6, 'https://imgs.search.brave.com/92K0ve_EV0YZHM5IhhLqKjisDmEDdGnk0e02hZN-96A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTEyUHNrWkFuNEwu/anBn', 0),
(8, 6, 'https://imgs.search.brave.com/lP8PPd2n4Xpx4DLIXrDM_gAfbloJZYpJkBaCy0qgoek/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF85/MzQyMzYtTUxBNjk0/MDE5NTY1NDlfMDUy/MDIzLVcud2VicA', 1),
(9, 7, 'https://imgs.search.brave.com/Ul-VGmxxQnOs5ZKScd63sCal8bDb3-CDX-efRLZ2yx0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcx/MjI0NDY5L2VzL2Zv/dG8vemFwYXRvcy1k/ZS1sb25hLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1EcVdh/cUQ1czU0Vy1Ja29I/OU1fVW', 0),
(10, 7, 'https://imgs.search.brave.com/NprimQaQCoylWjpS4aVET4G9Wh5cIdfiWJRqE4LyobI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQ3LzZk/LzFkLzQ3NmQxZGY2/MzZmYjBkYjYzNmZi/OThkYTczMmUzZmZm/LmpwZw', 1),
(11, 8, 'https://imgs.search.brave.com/nGtfQr5qjL8VoNmtQt1JVMwWKTxSpQdr3feAE2wW790/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5h/Lmx5c3RpdC5jb20v/MzAwLzM3NS9uL3Bo/b3Rvcy9ndWNjaS9j/NDdlOTFiNC9ndWNj/aS1CZWlnZS1BY2Ut/U25lYWtlci1XaXRo/LVdlYi5qcGVn', 0),
(12, 8, 'https://imgs.search.brave.com/2VAtQsQCSz7Vjs8Z3Bq_xZtPVvlN66OfMV2QQTemPWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5h/Lmx5c3RpdC5jb20v/MzAwLzM3NS9uL3Bo/b3Rvcy9ndWNjaS9h/NGRkMWQ3Yy9ndWNj/aS1XaGl0ZS1TY3Jl/ZW5lci1MZWF0aGVy/LVNuZWFrZXIuanBl/Zw', 1),
(14, 9, 'https://imgs.search.brave.com/VgWA4y_JjdHwmYl267PxpvManC4GKyQvG6imj_IIGMQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFkdVRCRmxiREwu/anBn', 1),
(15, 9, 'https://imgs.search.brave.com/HA0tM-3lM91qs7GVPXZDq6nV7I7FeNUikzqoTumcH6w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MjFjd3FaRmNqbkwu/anBn', 1),
(16, 10, 'https://imgs.search.brave.com/kEKpLzMFkJw5qjFn-ZCRtv7jvtuemlVlntx6SqTQ_3g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuY2FycmVmb3Vy/LmVzL2hkXzM1MHhf/L2Nycy9jZG5fc3Rh/dGljL2NhdGFsb2cv/aGQvMzMzNzQ4XzAw/XzEuanBn', 1),
(17, 10, 'https://imgs.search.brave.com/g4ljPF29YWvwPZXISLnjMUKCjsq4LIC9GNyGdH4mrwk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hbWJp/ZW50ZWdvdXJtZXQu/dnRleGFzc2V0cy5j/b20vYXJxdWl2b3Mv/aWRzLzIwMDE2Ny04/MDAtYXV0bz92PTYz/NzQ5NjkyMDU1NjUw/MDAwMCZ3aWR0aD04/MDAmaGVpZ2h0PWF1/dG8mYX', 0),
(18, 11, 'https://imgs.search.brave.com/Rrk4cuX90kOmYU7yDXQkAGOhZAugDiqINZd7JRTRHI0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lbmNy/eXB0ZWQtdGJuMC5n/c3RhdGljLmNvbS9p/bWFnZXM_cT10Ym46/QU5kOUdjUzZIMVB0/eFVOMlU5ellWZVgw/RzZYNjhTTFBTYjJQ/SkhEaWpnJnM', 1),
(19, 11, 'https://imgs.search.brave.com/4u3SvRk-oDyCz_bLQ45Oh4y7OawaE7ditbhptHSrME8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXNv/dXJjZXMuY2xhcm9z/aG9wLmNvbS9tZWRp/b3MtcGxhemF2aXAv/dDEvMTcxOTk0MDg2/NEdZQ0RBRE0zanBn', 0);

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
(3, 5, 1, 'drone', 'drone full hd', 89.99, 20, '2025-04-01 10:07:08.000', 1),
(4, 5, 1, 'huawei mate TX', 'The Huawei Mate XT Ultimate Design is the world\'s first double-folding', 9999.99, 20, '2025-04-06 21:32:36.466', 1),
(5, 5, 2, 'polera negra', 'Polera negra gucci', 24.99, 12, '2025-04-07 02:19:46.118', 1),
(6, 5, 2, 'canguro', 'canguro amarillo', 56.99, 20, '2025-04-20 14:22:42.866', 1),
(7, 5, 3, 'sapato\r\n', 'zapato amarillo', 56.22, 20, '2025-04-21 01:49:07.707', 1),
(8, 5, 3, 'zapatilla', 'gucci', 99.99, 20, '2025-04-22 12:42:17.970', 1),
(9, 5, 4, 'cuchara', 'cuchara metalica', 2.45, 0, '2025-04-09 10:12:12.000', 1),
(10, 5, 4, 'sarten', 'sarten aluminio', 12.12, 12, '2025-04-15 10:12:23.000', 1),
(11, 6, 2, 'gorro', 'gorro azul', 13.65, 12, '2025-04-15 12:22:36.000', 1);

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
(1, 'comprador@example.com', '$2b$10$3Tbk6yZPTf7AcjuQlvywO.ZevNjEQt653cvtRozdOO0Q4jD0ScOUK', 'Juan', 'Pérez', '1234567890', 'Calle Principal 123', '2025-04-06 20:24:02.278', '2025-04-22 14:40:38.549', 1, 1, 0),
(2, 'vos@example.com', '$2b$10$G2qD3kMLAHnpetIhTcqWnO49M7zzoBCkA0yO5ZQ/FrArtRfgiZhfa', 'Cesar', 'Pérez', '1234567890', 'Calle Principal 123', '2025-04-06 21:16:44.302', '2025-04-06 21:27:21.472', 1, 0, 0),
(3, 'cesar@usfx.com', '$2b$10$ioOaVPUEWPhCtc0gNQK79udbt6OYkzxwNykVLnD0TnDbkgl.RU1aC', 'Cesar Alvaro', 'Miranda Gutierrez', '637769851', 'Barrio Japones', '2025-04-07 01:56:21.878', '2025-04-21 14:28:13.915', 1, 1, 0),
(4, 'alvaro@usfx.com', '$2b$10$P1mECPFij3XahJkFUwZ1D.5QDQqI5gasUxb3P7iV6wvIIo0/vFGRu', 'Cesar Alvaro', 'Miranda Gutierrez', '637769851', 'Barrio Japones', '2025-04-14 06:40:51.801', NULL, 1, 0, 0),
(5, 'a@a.com', '$2b$10$eaP8vxpSJeCB6ap5l9zS2OHHcWU8HlH/lT0nNUY6/OQyca3pfc9yC', 'Cesar', 'Alvaro', '1234567890', 'Calle Principal 123', '2025-04-22 12:36:34.022', '2025-04-22 19:40:19.698', 1, 1, 0),
(6, 'cesar@cesar.com', '$2b$10$zQE1ZQlvRkM2I3z8xFm06O0nFW0l4KjXxvXnyH5IsXJ/daDUS6V4C', 'Cesar', 'Alvaro', '1234567890', 'Calle Principal 123', '2025-04-22 16:16:14.484', '2025-04-22 16:29:09.090', 1, 1, 0);

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
(3, 'TIENDA YO S. R. L.', 'tienda de todo y para todos', '10005958382', '1000002978564', 0.00),
(5, 'TIENDA TODO S. R. L.', 'tienda de todo', 'XAXX010101000', '0123456789', 0.00),
(6, 'Tienda de Cesar', 'todo todo hay', 'X43490REH', '1000584838', 2.00);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `imagenproducto`
--
ALTER TABLE `imagenproducto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
