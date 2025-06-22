import { Controller, Get, Post, Body, Param, Query, UseGuards, Request, BadRequestException, ForbiddenException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { QueryProductoDto } from './dto/query-producto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiQuery,
  getSchemaPath 
} from '@nestjs/swagger';
import { Producto } from './entities/producto.entity';
import { PrismaService } from '../prisma/prisma.service';
import { ImagenDto } from './dto/imagen.dto';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productosService: ProductosService,
    private readonly prisma: PrismaService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: Producto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 403, description: 'Solo vendedores pueden crear productos' })
  async create(
    @Request() req, 
    @Body() createProductoDto: CreateProductoDto
  ) {
    try {
      console.log('Creando producto con imágenes:', 
        createProductoDto.imagenes ? 
        `${createProductoDto.imagenes.length} imágenes recibidas` : 
        'Sin imágenes');
      
      return await this.productosService.create(req.user.id, createProductoDto);
    } catch (error) {
      console.error('Error en controlador de productos (create):', error);
      if (error.status) {
        throw error; // Errores HTTP ya formateados
      }
      throw new InternalServerErrorException(`Error al crear producto: ${error.message}`);
    }
  }

  @Post(':id/imagen')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Añadir imagen a un producto existente' })
  @ApiResponse({ status: 201, description: 'Imagen añadida exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 403, description: 'No autorizado para modificar este producto' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async addImage(
    @Request() req,
    @Param('id') id: string,
    @Body() imagenDto: ImagenDto
  ) {
    try {
      const productoId = parseInt(id);
      if (isNaN(productoId)) {
        throw new BadRequestException('ID del producto debe ser un número');
      }
      
      console.log(`Añadiendo imagen al producto ${productoId}`);
      
      if (!imagenDto.imagen) {
        throw new BadRequestException('La imagen es obligatoria');
      }
      
      // Verificar que la imagen sea una cadena base64 válida
      if (!imagenDto.imagen.startsWith('data:image')) {
        throw new BadRequestException('La imagen debe estar en formato base64 válido');
      }
      
      // Verificar que el producto existe y pertenece al usuario
      const producto = await this.prisma.producto.findUnique({
        where: { id: productoId }
      });
      
      if (!producto) {
        throw new NotFoundException(`Producto con ID ${productoId} no encontrado`);
      }
      
      // Verificamos que el id del usuario es el mismo que vendedor_id en el producto
      if (producto.vendedor_id !== req.user.id) {
        throw new ForbiddenException('No tienes permiso para modificar este producto');
      }
      
      console.log('Producto encontrado:', producto.id);
      console.log('Usuario autenticado ID:', req.user.id);
      console.log('Tamaño de imagen:', imagenDto.imagen.length);
      
      // Obtener el último orden para esta imagen
      const imagenes = await this.prisma.imagenProducto.findMany({
        where: { producto_id: productoId },
        orderBy: { orden: 'desc' },
        take: 1
      });
      
      const orden = imagenes.length > 0 ? imagenes[0].orden + 1 : 0;
      
      console.log(`Creando imagen con orden ${orden}`);
      console.log(`Primeros caracteres de imagen: ${imagenDto.imagen.substring(0, 30)}...`);
      
      // Crear la imagen - acortamos un poco la URL si es demasiado larga
      let urlImagen = imagenDto.imagen;
      if (urlImagen.length > 200000) {
        console.log('La URL de la imagen es muy larga, truncando...');
        // Nos aseguramos de mantener el encabezado y parte del contenido
        const prefix = urlImagen.substring(0, urlImagen.indexOf(',') + 1);
        const content = urlImagen.substring(urlImagen.indexOf(',') + 1);
        // Truncar el contenido para que la longitud total sea menor a 200000
        urlImagen = prefix + content.substring(0, 190000);
      }
      
      try {
        // Crear la imagen
        const nuevaImagen = await this.prisma.imagenProducto.create({
          data: {
            producto_id: productoId,
            url_imagen: urlImagen,
            orden
          }
        });
        
        console.log('Imagen creada correctamente con ID:', nuevaImagen.id);
        
        return {
          mensaje: 'Imagen añadida con éxito',
          imagen: {
            id: nuevaImagen.id,
            producto_id: nuevaImagen.producto_id,
            orden: nuevaImagen.orden
          }
        };
      } catch (dbError) {
        console.error('Error de base de datos al crear la imagen:', dbError);
        throw new InternalServerErrorException('Error al guardar la imagen en la base de datos: ' + dbError.message);
      }
    } catch (error) {
      console.error(`Error añadiendo imagen al producto ${id}:`, error);
      if (error instanceof BadRequestException ||
          error instanceof NotFoundException ||
          error instanceof ForbiddenException ||
          error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error al añadir imagen: ${error.message}`);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener listado de productos' })
  @ApiQuery({ name: 'categoria_id', required: false, type: Number })
  @ApiQuery({ name: 'nombre', required: false })
  @ApiQuery({ name: 'precio_min', required: false, type: Number })
  @ApiQuery({ name: 'precio_max', required: false, type: Number })
  @ApiQuery({ name: 'vendedor_id', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de productos obtenido correctamente' })
  async findAll(@Query() queryParams: QueryProductoDto) {
    return this.productosService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener un producto por ID con productos relacionados', 
    description: 'Devuelve el producto solicitado y 5 productos de la misma categoría' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Producto obtenido correctamente con productos relacionados',
    schema: {
      type: 'object',
      properties: {
        producto: { $ref: getSchemaPath(Producto) },
        relacionados: { type: 'array', items: { $ref: getSchemaPath(Producto) } }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }
}