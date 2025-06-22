import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'usuario@example.com', description: 'Correo electrónico del usuario' })
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @ApiProperty({ example: 'Contraseña123', description: 'Contraseña del usuario (mínimo 8 caracteres)' })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del usuario' })
  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  apellido: string;

  @ApiProperty({ example: '123456789', description: 'Número de teléfono (opcional)', required: false })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({ example: 'Calle Principal 123', description: 'Dirección (opcional)', required: false })
  @IsString()
  @IsOptional()
  direccion?: string;
  
  @ApiProperty({ example: true, description: 'Indica si el usuario es vendedor', required: false })
  @IsBoolean()
  @IsOptional()
  es_vendedor?: boolean;
  
  @ApiProperty({ example: 'Mi Tienda', description: 'Nombre de la tienda (solo para vendedores)', required: false })
  @IsString()
  @IsOptional()
  nombreTienda?: string;
  
  @ApiProperty({ example: 'Descripción de mi tienda', description: 'Descripción de la tienda (solo para vendedores)', required: false })
  @IsString()
  @IsOptional()
  descripcionTienda?: string;
}