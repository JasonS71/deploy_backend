import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateFavoritoDto {
  @ApiProperty({
    description: 'ID del producto a marcar como favorito',
    example: 1
  })
  @IsInt()
  producto_id: number;
}