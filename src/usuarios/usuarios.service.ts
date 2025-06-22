import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        telefono: true,
        direccion: true,
        fecha_registro: true,
        ultimo_login: true,
        es_vendedor: true,
        es_administrador: true,
        activo: true,
      },
      orderBy: {
        fecha_registro: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        telefono: true,
        direccion: true,
        fecha_registro: true,
        ultimo_login: true,
        es_vendedor: true,
        es_administrador: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateData: any) {
    // Asegurarse de que el usuario existe
    await this.findOne(id);

    return this.prisma.usuario.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        telefono: true,
        direccion: true,
        es_vendedor: true,
      },
    });
  }
}