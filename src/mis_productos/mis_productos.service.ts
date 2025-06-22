import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class MisProductosService {
  constructor(private prisma: PrismaService) {}

  async findByVendedorId(usuarioId: number) {
    // Verifica que el usuario sea un vendedor
    const vendedor = await this.prisma.vendedor.findUnique({
      where: { usuario_id: usuarioId },
    });

    if (!vendedor) {
      return []; // o lanza ForbiddenException si prefieres
    }

    return this.prisma.producto.findMany({
      where: {
        vendedor_id: usuarioId,
      },
      include: {
        imagenes: true,
        categoria: true,
        vendedor: {
          select: {
            nombre_tienda: true,
            calificacion_promedio: true,
          },
        },
      },
      orderBy: {
        fecha_publicacion: 'desc',
      },
    });
  }

  async updateProducto(usuarioId: number, productoId: number, updateProductoDto: UpdateProductoDto) {
    // Verificar que el producto existe y pertenece al vendedor
    const producto = await this.prisma.producto.findUnique({
      where: { id: productoId },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${productoId} no encontrado`);
    }

    if (producto.vendedor_id !== usuarioId) {
      throw new ForbiddenException('No tienes permiso para modificar este producto');
    }

    // Actualizar el producto
    const productoActualizado = await this.prisma.producto.update({
      where: { id: productoId },
      data: {
        ...updateProductoDto,
      },
      include: {
        imagenes: true,
        categoria: true,
        vendedor: {
          select: {
            nombre_tienda: true,
            calificacion_promedio: true,
          },
        },
      },
    });

    return {
      mensaje: 'Producto actualizado correctamente',
      producto: productoActualizado,
    };
  }

  async deleteProducto(usuarioId: number, productoId: number) {
    // Verificar que el producto existe y pertenece al vendedor
    const producto = await this.prisma.producto.findUnique({
      where: { id: productoId },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${productoId} no encontrado`);
    }

    if (producto.vendedor_id !== usuarioId) {
      throw new ForbiddenException('No tienes permiso para eliminar este producto');
    }

    // Eliminar primero las imágenes asociadas
    await this.prisma.imagenProducto.deleteMany({
      where: { producto_id: productoId },
    });

    // Eliminar el producto
    await this.prisma.producto.delete({
      where: { id: productoId },
    });

    return {
      mensaje: 'Producto eliminado correctamente',
      id: productoId,
    };
  }
}
