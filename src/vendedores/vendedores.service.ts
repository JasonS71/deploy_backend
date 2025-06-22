import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVendedorDto } from './dto/create-vendedor.dto';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class VendedoresService {
  constructor(
    private prisma: PrismaService,
    private usuariosService: UsuariosService,
  ) {}

  async create(usuarioId: number, createVendedorDto: CreateVendedorDto) {
    // Verificar si el usuario existe
    const usuario = await this.usuariosService.findOne(usuarioId);

    // Verificar si el usuario ya es un vendedor
    if (usuario.es_vendedor) {
      throw new ConflictException('El usuario ya tiene un perfil de vendedor');
    }

    // Iniciar transacción para crear el vendedor y actualizar el usuario
    return this.prisma.$transaction(async (prisma) => {
      // Actualizar el usuario para marcar como vendedor
      await prisma.usuario.update({
        where: { id: usuarioId },
        data: { es_vendedor: true },
      });

      // Crear el perfil de vendedor
      const vendedor = await prisma.vendedor.create({
        data: {
          usuario_id: usuarioId,
          nombre_tienda: createVendedorDto.nombre_tienda,
          descripcion_tienda: createVendedorDto.descripcion_tienda,
          rfc: createVendedorDto.rfc,
          cuenta_bancaria: createVendedorDto.cuenta_bancaria,
        },
        include: {
          usuario: {
            select: {
              nombre: true,
              apellido: true,
              email: true,
            },
          },
        },
      });

      return vendedor;
    });
  }

  async findOne(usuarioId: number) {
    const vendedor = await this.prisma.vendedor.findUnique({
      where: { usuario_id: usuarioId },
      include: {
        usuario: {
          select: {
            nombre: true,
            apellido: true,
            email: true,
          },
        },
      },
    });

    if (!vendedor) {
      throw new NotFoundException(`Perfil de vendedor para el usuario con ID ${usuarioId} no encontrado`);
    }

    return vendedor;
  }
}