import { Controller, Get, UseGuards, Request, Put, Delete, Param, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('admin-users')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getAdminUsers() {
    try {
      const users = await this.prisma.usuario.findMany({
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
      
      return users;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return { error: 'No se pudieron obtener los usuarios' };
    }
  }

  @Put('admin-users/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateUser(@Param('id') id: string, @Body() userData: any) {
    try {
      // Verificar si el usuario existe
      const userExists = await this.prisma.usuario.findUnique({
        where: { id: Number(id) }
      });

      if (!userExists) {
        return { error: `Usuario con ID ${id} no encontrado` };
      }

      // Actualizar el usuario
      const updatedUser = await this.prisma.usuario.update({
        where: { id: Number(id) },
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

      return updatedUser;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return { error: 'No se pudo actualizar el usuario' };
    }
  }

  @Post('admin-users/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateUserPost(@Param('id') id: string, @Body() userData: any) {
    // Redirigir al método PUT para compatibilidad
    return this.updateUser(id, userData);
  }

  @Delete('admin-users/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deleteUser(@Param('id') id: string) {
    try {
      // Verificar si el usuario existe
      const userExists = await this.prisma.usuario.findUnique({
        where: { id: Number(id) }
      });

      if (!userExists) {
        return { error: `Usuario con ID ${id} no encontrado` };
      }

      // Desactivar el usuario en lugar de eliminarlo
      const deletedUser = await this.prisma.usuario.update({
        where: { id: Number(id) },
        data: {
          activo: false
        },
        select: {
          id: true,
          activo: true
        }
      });

      return deletedUser;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      return { error: 'No se pudo eliminar el usuario' };
    }
  }

  @Post('admin-users/:id/delete')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deleteUserPost(@Param('id') id: string) {
    // Redirigir al método DELETE para compatibilidad
    return this.deleteUser(id);
  }
}