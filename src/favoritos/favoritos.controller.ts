import { Controller, Get, Post, Delete, Query, UseGuards, Request, Body, Param } from '@nestjs/common'; // Añade Body y Param aquí
import { FavoritosService } from './favoritos.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { QueryFavoritoDto } from './dto/query-favorito.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Favoritos')
@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Agregar producto a favoritos' })
  @ApiResponse({ status: 201, description: 'Producto agregado a favoritos' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async create(@Request() req, @Body() createFavoritoDto: CreateFavoritoDto) {
    return this.favoritosService.create(req.user.id, createFavoritoDto.producto_id);
  }

  @Post('verificar')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verificar si un producto está en favoritos' })
  @ApiResponse({ status: 200, description: 'Verificación exitosa' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async verificar(@Request() req, @Body() body: { producto_id: number }) {
    const esFavorito = await this.favoritosService.verificar(req.user.id, body.producto_id);
    return { esFavorito };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener listado de favoritos del usuario' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de favoritos obtenido correctamente' })
  async findAll(@Request() req, @Query() queryParams: QueryFavoritoDto) {
    return this.favoritosService.findAll(req.user.id, queryParams);
  }

  @Delete('eliminar')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar producto de favoritos' })
  @ApiResponse({ status: 200, description: 'Producto eliminado de favoritos' })
  @ApiResponse({ status: 404, description: 'Favorito no encontrado' })
  async removeByBody(@Request() req, @Body() body: { producto_id: number }) {
    return this.favoritosService.remove(req.user.id, body.producto_id);
  }

  @Delete(':productoId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar producto de favoritos' })
  @ApiResponse({ status: 200, description: 'Producto eliminado de favoritos' })
  @ApiResponse({ status: 404, description: 'Favorito no encontrado' })
  async remove(@Request() req, @Param('productoId') productoId: string) {
    return this.favoritosService.remove(req.user.id, +productoId);
  }
}