import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Prisma conectado a la base de datos');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // async cleanDatabase() {
  //   if (process.env.NODE_ENV === 'test') {
  //     // Limpieza segura solo en entorno de pruebas
  //     const models = Reflect.ownKeys(this).filter(key => 
  //       key[0] !== '_' && 
  //       key[0] !== '$' && 
  //       typeof this[key] === 'object' && 
  //       this[key] !== null
  //     );
      
  //     return Promise.all(
  //       models.map(modelKey => this[modelKey].deleteMany())
  //     );
  //   }
  // }
}