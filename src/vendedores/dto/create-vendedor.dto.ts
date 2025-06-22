import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVendedorDto {
  @ApiProperty({ example: 'Mi Tienda Online', description: 'Nombre de la tienda' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la tienda es obligatorio' })
  nombre_tienda: string;

  @ApiProperty({ 
    example: 'Tienda especializada en productos tecnológicos', 
    description: 'Descripción de la tienda',
    required: false
  })
  @IsString()
  @IsOptional()
  descripcion_tienda?: string;

  @ApiProperty({ example: 'ABC123456XYZ', description: 'RFC del vendedor', required: false })
  @IsString()
  @IsOptional()
  rfc?: string;

  @ApiProperty({ example: '1234567890', description: 'Cuenta bancaria del vendedor', required: false })
  @IsString()
  @IsOptional()
  cuenta_bancaria?: string;
}