import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryProductoDto {
  @ApiProperty({ required: false, description: 'ID de la categoría' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoria_id?: number;

  @ApiProperty({ required: false, description: 'Nombre o parte del nombre del producto' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ required: false, description: 'Precio mínimo' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  precio_min?: number;

  @ApiProperty({ required: false, description: 'Precio máximo' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  precio_max?: number;

  @ApiProperty({ required: false, description: 'ID del vendedor' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  vendedor_id?: number;

  @ApiProperty({ required: false, default: 1, description: 'Número de página' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiProperty({ required: false, default: 10, description: 'Límite de resultados por página' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}