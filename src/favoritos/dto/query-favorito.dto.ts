import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryFavoritoDto {
  @ApiProperty({
    required: false,
    description: 'ID del usuario para filtrar favoritos',
    example: 1
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  usuario_id?: number;

  @ApiProperty({
    required: false,
    description: 'ID del producto para filtrar favoritos',
    example: 1
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  producto_id?: number;

  @ApiProperty({
    required: false,
    description: 'Número de página',
    default: 1
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    required: false,
    description: 'Límite de resultados por página',
    default: 10
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number = 10;
}