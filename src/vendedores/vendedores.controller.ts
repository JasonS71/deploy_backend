import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { VendedoresService } from './vendedores.service';
import { CreateVendedorDto } from './dto/create-vendedor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Vendedores')
@Controller('vendedores')
export class VendedoresController {
  constructor(private readonly vendedoresService: VendedoresService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear perfil de vendedor' })
  @ApiResponse({ status: 201, description: 'Perfil de vendedor creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'El usuario ya tiene un perfil de vendedor' })
  async create(@Request() req, @Body() createVendedorDto: CreateVendedorDto) {
    return this.vendedoresService.create(req.user.id, createVendedorDto);
  }

  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil de vendedor del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil de vendedor obtenido correctamente' })
  @ApiResponse({ status: 404, description: 'Perfil de vendedor no encontrado' })
  async getPerfil(@Request() req) {
    return this.vendedoresService.findOne(req.user.id);
  }
}