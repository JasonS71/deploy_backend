import { ApiProperty } from '@nestjs/swagger';
import { Producto } from '../entities/producto.entity';

export class ProductoConRelacionadosDto {
  @ApiProperty({ type: Producto })
  producto: Producto;

  @ApiProperty({ type: [Producto], description: '5 productos de la misma categoría' })
  relacionados: Producto[];
}