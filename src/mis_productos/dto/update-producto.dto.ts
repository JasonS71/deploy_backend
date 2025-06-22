import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, IsInt } from 'class-validator';

export class UpdateProductoDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Smartphone Samsung Galaxy S21',
  })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Smartphone con pantalla AMOLED de 6.2", 8GB RAM, 128GB almacenamiento',
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 799.99,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  precio?: number;

  @ApiProperty({
    description: 'Cantidad disponible en inventario',
    example: 10,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el producto',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  categoria_id?: number;
} 