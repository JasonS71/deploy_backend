import { Controller, Post, Get, Delete, Req, UseGuards, Body, Param, Put } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Administradores')
@Controller('administradores')
export class AdministradoresController {
  constructor(private readonly administradoresService: AdministradoresService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Convertir un usuario en administrador' })
  async makeAdmin(@Req() req) {
    return this.administradoresService.makeAdmin(req.user.id);
  }

  @Post('become')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Convertirse en administrador usando contraseña maestra' })
  async becomeAdmin(@Req() req, @Body() body: { password: string }) {
    return this.administradoresService.becomeAdminWithPassword(req.user.id, body.password);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Quitar permisos de administrador' })
  async removeAdmin(@Req() req) {
    return this.administradoresService.removeAdmin(req.user.id);
  }

  @Get('perfil')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil de administrador' })
  async getPerfil(@Req() req) {
    return this.administradoresService.findOne(req.user.id);
  }

  @Get('users')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los usuarios (solo administradores)' })
  async getAllUsers() {
    return this.administradoresService.findAllUsers();
  }

  @Put('users/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar información de un usuario' })
  async updateUser(@Param('id') id: string, @Body() userData: any) {
    return this.administradoresService.updateUser(+id, userData);
  }

  @Delete('users/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar o desactivar un usuario' })
  async deleteUser(@Param('id') id: string) {
    return this.administradoresService.deleteUser(+id);
  }
} 