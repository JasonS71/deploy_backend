// src/productos/entities/producto.entity.ts
import { ApiProperty } from '@nestjs/swagger';

// Primero definimos las clases embebidas
class VendedorEmbedded {
  @ApiProperty({ description: 'ID del vendedor', example: 1 })
  usuario_id: number;

  @ApiProperty({ 
    description: 'Nombre de la tienda', 
    example: 'TechShop',
    maxLength: 100 
  })
  nombre_tienda: string;

  @ApiProperty({ 
    description: 'Calificación promedio del vendedor',
    example: 4.5,
    type: 'number',
    format: 'decimal' 
  })
  calificacion_promedio: number;
}

class CategoriaEmbedded {
  @ApiProperty({ description: 'ID de la categoría', example: 1 })
  id: number;

  @ApiProperty({ 
    description: 'Nombre de la categoría', 
    example: 'Electrónicos',
    maxLength: 50 
  })
  nombre: string;

  @ApiProperty({ 
    description: 'Descripción de la categoría',
    example: 'Productos electrónicos y dispositivos',
    required: false 
  })
  descripcion?: string;
}

class ImagenProductoEmbedded {
  @ApiProperty({ description: 'ID de la imagen', example: 1 })
  id: number;

  @ApiProperty({ 
    description: 'URL de la imagen', 
    example: 'https://example.com/image1.jpg',
    maxLength: 255 
  })
  url_imagen: string;

  @ApiProperty({ 
    description: 'Orden de visualización de la imagen',
    example: 0,
    default: 0 
  })
  orden: number;
}

// Luego definimos la clase principal Producto que usa las clases embebidas
export class Producto {
  @ApiProperty({ description: 'ID del producto', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID del vendedor', example: 1 })
  vendedor_id: number;

  @ApiProperty({ 
    description: 'ID de la categoría', 
    example: 1,
    required: false 
  })
  categoria_id?: number;

  @ApiProperty({ 
    description: 'Nombre del producto', 
    example: 'Smartphone Premium',
    maxLength: 100 
  })
  nombre: string;

  @ApiProperty({ 
    description: 'Descripción detallada del producto',
    example: 'Smartphone de última generación con 128GB de almacenamiento'
  })
  descripcion: string;

  @ApiProperty({ 
    description: 'Precio del producto', 
    example: 999.99,
    type: 'number',
    format: 'decimal'
  })
  precio: number;

  @ApiProperty({ 
    description: 'Cantidad disponible en stock', 
    example: 10,
    default: 0 
  })
  stock: number;

  @ApiProperty({ 
    description: 'Fecha de publicación del producto',
    example: '2023-05-15T10:00:00Z' 
  })
  fecha_publicacion: Date;

  @ApiProperty({ 
    description: 'Indica si el producto está activo',
    example: true,
    default: true 
  })
  activo: boolean;

  @ApiProperty({ 
    description: 'Información del vendedor',
    type: () => VendedorEmbedded 
  })
  vendedor?: VendedorEmbedded;

  @ApiProperty({ 
    description: 'Información de la categoría',
    type: () => CategoriaEmbedded,
    required: false
  })
  categoria?: CategoriaEmbedded;

  @ApiProperty({ 
    description: 'Imágenes del producto',
    type: () => [ImagenProductoEmbedded] 
  })
  imagenes?: ImagenProductoEmbedded[];
}