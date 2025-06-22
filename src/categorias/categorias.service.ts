import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoriaDto) {
    return this.prisma.categoria.create({ data: dto });
  }

  async findAll() {
    return this.prisma.categoria.findMany({
      include: {
        productos: true, // Puedes quitar esto si no quieres retornar los productos
      },
    });
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
      include: {
        productos: true,
      },
    });

    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    await this.findOne(id); // Lanza error si no existe

    return this.prisma.categoria.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Lanza error si no existe

    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}
