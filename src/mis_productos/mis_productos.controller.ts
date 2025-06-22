import { Controller, Get, Put, Delete, Param, Body, UseGuards, Request, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MisProductosService } from './mis_productos.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProductoDto } from './dto/update-producto.dto';

@ApiTags('Mis Productos')
@Controller('mis-productos')
export class MisProductosController {
  constructor(private readonly misProductosService: MisProductosService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener productos del vendedor autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de productos del vendedor' })
  async findMisProductos(@Request() req) {
    return this.misProductosService.findByVendedorId(req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un producto del vendedor' })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente' })
  @ApiResponse({ status: 403, description: 'No autorizado para modificar este producto' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async updateProducto(
    @Request() req,
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto
  ) {
    const productoId = parseInt(id);
    if (isNaN(productoId)) {
      throw new BadRequestException('ID del producto debe ser un número');
    }
    
    return this.misProductosService.updateProducto(req.user.id, productoId, updateProductoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un producto del vendedor' })
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente' })
  @ApiResponse({ status: 403, description: 'No autorizado para eliminar este producto' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async deleteProducto(
    @Request() req,
    @Param('id') id: string
  ) {
    const productoId = parseInt(id);
    if (isNaN(productoId)) {
      throw new BadRequestException('ID del producto debe ser un número');
    }
    
    return this.misProductosService.deleteProducto(req.user.id, productoId);
  }
}
