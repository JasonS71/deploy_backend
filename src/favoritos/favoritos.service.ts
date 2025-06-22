import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryFavoritoDto } from './dto/query-favorito.dto';

@Injectable()
export class FavoritosService {
  constructor(private prisma: PrismaService) {}

  async create(usuarioId: number, productoId: number) {
    // Verificar si el producto existe
    const producto = await this.prisma.producto.findUnique({
      where: { id: productoId, activo: true },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${productoId} no encontrado`);
    }

    // Verificar si ya existe el favorito
    const existeFavorito = await this.prisma.favorito.findUnique({
      where: {
        usuario_id_producto_id: {
          usuario_id: usuarioId,
          producto_id: productoId,
        },
      },
    });

    if (existeFavorito) {
      throw new ConflictException('El producto ya está en favoritos');
    }

    // Crear el favorito
    return this.prisma.favorito.create({
      data: {
        usuario_id: usuarioId,
        producto_id: productoId,
      },
      include: {
        producto: {
          include: {
            imagenes: {
              orderBy: { orden: 'asc' },
              take: 1,
            },
          },
        },
      },
    });
  }

  async verificar(usuarioId: number, productoId: number): Promise<boolean> {
    const favorito = await this.prisma.favorito.findUnique({
      where: {
        usuario_id_producto_id: {
          usuario_id: usuarioId,
          producto_id: productoId,
        },
      },
    });
    
    return !!favorito; // Convertir a booleano
  }

  async findAll(usuarioId: number, queryParams: QueryFavoritoDto) {
    const { page = 1, limit = 10 } = queryParams;
    const skip = (page - 1) * limit;

    const [favoritos, total] = await Promise.all([
      this.prisma.favorito.findMany({
        where: { usuario_id: usuarioId },
        include: {
          producto: {
            include: {
              imagenes: {
                orderBy: { orden: 'asc' },
                take: 1,
              },
              vendedor: {
                select: {
                  nombre_tienda: true,
                  calificacion_promedio: true,
                },
              },
            },
          },
        },
        skip,
        take: +limit,
        orderBy: {
          fecha_agregado: 'desc',
        },
      }),
      this.prisma.favorito.count({
        where: { usuario_id: usuarioId },
      }),
    ]);

    return {
      data: favoritos.map(f => f.producto), // Solo devolvemos los productos
      meta: {
        total,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(total / +limit),
      },
    };
  }

  async remove(usuarioId: number, productoId: number) {
    try {
      return await this.prisma.favorito.delete({
        where: {
          usuario_id_producto_id: {
            usuario_id: usuarioId,
            producto_id: productoId,
          },
        },
      });
    } catch (error) {
      throw new NotFoundException('El producto no estaba en favoritos');
    }
  }
}