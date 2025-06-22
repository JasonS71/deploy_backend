import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ImagenDto {
  @ApiProperty({
    description: 'URL de imagen en formato base64',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgAB...',
  })
  @IsString()
  @IsNotEmpty({ message: 'La imagen es obligatoria' })
  imagen: string;
} 