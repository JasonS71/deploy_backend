import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar si el email ya está registrado
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Verificar si el usuario es vendedor
    const esVendedor = registerDto.es_vendedor || false;

    // Crear el usuario
    const newUser = await this.prisma.usuario.create({
      data: {
        email: registerDto.email,
        password_hash: hashedPassword,
        nombre: registerDto.nombre,
        apellido: registerDto.apellido,
        telefono: registerDto.telefono,
        direccion: registerDto.direccion,
        es_vendedor: esVendedor,
        es_administrador: false,
      },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        es_vendedor: true,
        es_administrador: true,
      },
    });

    // Si es vendedor, crear también el registro en la tabla de vendedores
    if (esVendedor && registerDto.nombreTienda) {
      try {
        await this.prisma.vendedor.create({
          data: {
            usuario_id: newUser.id,
            nombre_tienda: registerDto.nombreTienda,
                        descripcion_tienda: registerDto.descripcionTienda || '',
              calificacion_promedio: 0,
          }
        });
      } catch (error) {
        // Si falla la creación del registro de vendedor, actualizar el usuario para que no sea vendedor
        console.error('Error al crear registro de vendedor:', error);
        await this.prisma.usuario.update({
          where: { id: newUser.id },
          data: { es_vendedor: false },
        });
      }
    }

    // Generar JWT
    const token = this.jwtService.sign({
      sub: newUser.id,
      email: newUser.email,
      isVendor: newUser.es_vendedor,
      isAdmin: newUser.es_administrador,
    });

    return {
      user: newUser,
      access_token: token,
    };
  }

  async login(loginDto: LoginDto) {
    // Buscar usuario por email
    const user = await this.prisma.usuario.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Actualizar último login
    await this.prisma.usuario.update({
      where: { id: user.id },
      data: { ultimo_login: new Date() },
    });

    // Obtener información de vendedor si aplica
    let vendorInfo: { 
        nombre_tienda: string; 
        calificacion_promedio: any; // O usa Prisma.Decimal si está disponible
      } | null = null;
    
      if (user.es_vendedor) {
        vendorInfo = await this.prisma.vendedor.findUnique({
          where: { usuario_id: user.id },
          select: {
            nombre_tienda: true,
            calificacion_promedio: true,
          },
        });
      }

    // Generar JWT
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      isVendor: user.es_vendedor,
      isAdmin: user.es_administrador,
    });

    return {
      token: token,
      user: {
        id: user.id,
        email: user.email,
        nombreCompleto: `${user.nombre} ${user.apellido}`,
        tipoUsuario: user.es_vendedor ? 'vendedor' : user.es_administrador ? 'administrador' : 'cliente',
        rol: {
          nombre: user.es_vendedor ? 'vendedor' : user.es_administrador ? 'administrador' : 'cliente',
          instrucciones_entrega: '',
          nombre_tienda: '',
          descripción_tienda: ''
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
    
  }

  async validateUserById(userId: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        es_vendedor: true,
        es_administrador: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return user;
  }
}