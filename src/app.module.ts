import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VendedoresModule } from './vendedores/vendedores.module';
import { ProductosModule } from './productos/productos.module';
import { FavoritosModule } from './favoritos/favoritos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { MisProductosModule } from './mis_productos/mis_productos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdministradoresModule } from './administradores/administradores.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsuariosModule,
    VendedoresModule,
    ProductosModule,
    FavoritosModule,
    CategoriasModule,
    MisProductosModule,
    AdministradoresModule,
  ],
})
export class AppModule { }