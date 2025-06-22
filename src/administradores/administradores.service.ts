import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdministradoresService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async findAllUsers() {
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
        activo: true
      },
      orderBy: {
        fecha_registro: 'desc'
      }
    });
  }

  async updateUser(id: number, userData: any) {
    // Verificar si el usuario existe
    const userExists = await this.prisma.usuario.findUnique({
      where: { id }
    });

    if (!userExists) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Actualizar el usuario
    return this.prisma.usuario.update({
      where: { id },
      data: {
        nombre: userData.nombre,
        apellido: userData.apellido,
        email: userData.email,
        telefono: userData.telefono,
        direccion: userData.direccion,
        es_vendedor: userData.es_vendedor,
        es_administrador: userData.es_administrador
      },
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
        activo: true
      }
    });
  }

  async deleteUser(id: number) {
    // Verificar si el usuario existe
    const userExists = await this.prisma.usuario.findUnique({
      where: { id }
    });

    if (!userExists) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Eliminar el usuario (o desactivarlo)
    return this.prisma.usuario.update({
      where: { id },
      data: {
        activo: false
      },
      select: {
        id: true,
        activo: true
      }
    });
  }

  async makeAdmin(usuarioId: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
    }

    if (usuario.es_administrador) {
      throw new ConflictException('El usuario ya es administrador');
    }

    const updatedUser = await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: { es_administrador: true },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        es_administrador: true
      }
    });

    return updatedUser;
  }

  async becomeAdminWithPassword(usuarioId: number, password: string) {
    // Verificar la contraseña maestra (en un caso real, esto debería estar en variables de entorno)
    const ADMIN_MASTER_PASSWORD = 'qwer';
    
    if (password !== ADMIN_MASTER_PASSWORD) {
      throw new UnauthorizedException('Contraseña de administrador incorrecta');
    }
    
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
    }

    let updatedUser;
    
    if (!usuario.es_administrador) {
      // Si no es administrador, convertirlo en uno
      updatedUser = await this.prisma.usuario.update({
        where: { id: usuarioId },
        data: { es_administrador: true },
        select: {
          id: true,
          email: true,
          nombre: true,
          apellido: true,
          es_administrador: true
        }
      });
    } else {
      // Si ya es administrador, simplemente devolver sus datos
      updatedUser = {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        es_administrador: usuario.es_administrador
      };
    }
    
    // Generar un nuevo token con los datos actualizados
    const payload = { 
      email: updatedUser.email,
      sub: updatedUser.id,
      nombre: updatedUser.nombre,
      apellido: updatedUser.apellido,
      es_administrador: updatedUser.es_administrador
    };
    
    const token = this.jwtService.sign(payload);
    
    return {
      user: updatedUser,
      token
    };
  }

  async removeAdmin(usuarioId: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
    }

    if (!usuario.es_administrador) {
      throw new ConflictException('El usuario no es administrador');
    }

    const updatedUser = await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: { es_administrador: false },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        es_administrador: true
      }
    });

    return updatedUser;
  }

  async findOne(usuarioId: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        es_administrador: true
      }
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
    }

    if (!usuario.es_administrador) {
      throw new NotFoundException(`El usuario con ID ${usuarioId} no es administrador`);
    }

    return usuario;
  }
} 