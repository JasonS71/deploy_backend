import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, IsArray, Min, IsInt, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductoDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Teléfono Móvil XYZ' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ description: 'Descripción detallada del producto', example: 'Teléfono con 8GB RAM, 128GB almacenamiento' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  descripcion: string;

  @ApiProperty({ description: 'Precio del producto', example: 299.99 })
  @IsNumber()
  @IsPositive()
  precio: number;

  @ApiProperty({ description: 'Cantidad disponible del producto', example: 10 })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ description: 'ID de la categoría a la que pertenece el producto', example: 1 })
  @IsInt()
  @IsPositive()
  categoria_id: number;

  @ApiProperty({
    description: 'Array de URLs de imágenes en formato base64',
    example: ['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAA...'],
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imagenes?: string[];
}