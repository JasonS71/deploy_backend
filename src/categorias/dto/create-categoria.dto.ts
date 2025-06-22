import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Electrónica', description: 'Nombre de la categoría' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Productos electrónicos como celulares, laptops, etc.', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
