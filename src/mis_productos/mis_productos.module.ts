import { Module } from '@nestjs/common';
import { MisProductosService } from './mis_productos.service';
import { MisProductosController } from './mis_productos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MisProductosController],
  providers: [MisProductosService],
})
export class MisProductosModule {}
