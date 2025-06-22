import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { QueryProductoDto } from './dto/query-producto.dto';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  async create(usuarioId: number, createProductoDto: CreateProductoDto) {
    try {
      // Verificar si el usuario es vendedor
      const vendedor = await this.prisma.vendedor.findUnique({
        where: { usuario_id: usuarioId },
      });

      if (!vendedor) {
        throw new ForbiddenException('Solo los vendedores pueden crear productos');
      }

      // Sanitizar datos del producto
      const productoData = {
        vendedor_id: vendedor.usuario_id,
        categoria_id: Number(createProductoDto.categoria_id),
        nombre: String(createProductoDto.nombre).trim(),
        descripcion: String(createProductoDto.descripcion).trim(),
        precio: Number(createProductoDto.precio),
        stock: Number(createProductoDto.stock),
      };

      console.log('Datos del producto validados:', {
        ...productoData
      });
      
      // Crear el producto en la base de datos
      const producto = await this.prisma.producto.create({
        data: productoData,
        include: {
          vendedor: {
            select: {
              nombre_tienda: true,
              calificacion_promedio: true,
            },
          },
          categoria: true,
          imagenes: true,
        },
      });

      console.log(`Producto creado con ID: ${producto.id}`);
      
      // Si hay imágenes, las procesaremos en el endpoint separado
      
      return producto;
    } catch (error) {
      console.error('Error al crear producto:', error);
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  async findAll(queryParams: QueryProductoDto) {
    const { categoria_id, nombre, precio_min, precio_max, vendedor_id, page = 1, limit = 10 } = queryParams;
    
    const where = {
      activo: true,
      ...(categoria_id && { categoria_id: +categoria_id }),
      ...(nombre && { nombre: { contains: nombre } }),
      ...(precio_min && { precio: { gte: +precio_min } }),
      ...(precio_max && { precio: { lte: +precio_max } }),
      ...(vendedor_id && { vendedor_id: +vendedor_id }),
    };

    const skip = (page - 1) * limit;

    const [productos, total] = await Promise.all([
      this.prisma.producto.findMany({
        where,
        include: {
          vendedor: {
            select: {
              usuario_id: true,
              nombre_tienda: true,
              calificacion_promedio: true,
            },
          },
          categoria: true,
          imagenes: {
            orderBy: {
              orden: 'asc',
            },
          },
        },
        skip,
        take: +limit,
        orderBy: {
          fecha_publicacion: 'desc',
        },
      }),
      this.prisma.producto.count({ where }),
    ]);

    return {
      data: productos,
      meta: {
        total,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(total / +limit),
      },
    };
  }

  async findOne(id: number) {
    const producto = await this.prisma.producto.findUnique({
      where: { id },
      include: {
        vendedor: {
          select: {
            usuario_id: true,
            nombre_tienda: true,
            calificacion_promedio: true,
          },
        },
        categoria: true,
        imagenes: {
          orderBy: {
            orden: 'asc',
          },
        },
      },
    });

    if (!producto || !producto.activo) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }


    // Obtener productos relacionados (misma categoría, excluyendo el actual)
    const productosRelacionados = await this.prisma.producto.findMany({
      where: {
        categoria_id: producto.categoria_id,
        id: { not: id }, // Excluir el producto actual
        activo: true,
      },
      take: 5, // Limitar a 5 productos
      orderBy: {
        fecha_publicacion: 'desc', // Ordenar por los más recientes
      },
      include: {
        vendedor: {
          select: {
            nombre_tienda: true,
            calificacion_promedio: true,
          },
        },
        imagenes: {
          orderBy: {
            orden: 'asc',
          },
          take: 1, // Solo la primera imagen para los relacionados
        },
      },
    });


    // Registrar visualización en estadísticas
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      await this.prisma.estadisticaProducto.upsert({
        where: {
          producto_id_fecha: {
            producto_id: id,
            fecha: today,
          },
        },
        update: {
          vistas: { increment: 1 },
        },
        create: {
          producto_id: id,
          fecha: today,
          vistas: 1,
        },
      });
    } catch (error) {
      // Si hay error en estadísticas, no bloqueamos la obtención del producto
      console.error('Error al registrar estadística:', error);
    }

    return {
      producto,
      relacionados: productosRelacionados,
    };
  }
}