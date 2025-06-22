import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('UsuariosService', () => {
    let service: UsuariosService;
    let prisma: PrismaService;

    const fixedDate = new Date('2025-01-01T00:00:00.000Z');

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsuariosService,
                {
                    provide: PrismaService,
                    useValue: {
                        usuario: {
                            findUnique: jest.fn().mockImplementation(({ where }) => {
                                if (where.id === 999) return Promise.resolve(null);
                                return Promise.resolve({
                                    id: 1,
                                    email: 'test@example.com',
                                    nombre: 'Test',
                                    apellido: 'User',
                                    telefono: null,
                                    direccion: null,
                                    fecha_registro: fixedDate,
                                    ultimo_login: null,
                                    es_vendedor: false,
                                    es_administrador: false,
                                });
                            }),
                            update: jest.fn().mockImplementation(({ where, data, select }) => {
                                const updatedUser = {
                                    id: where.id,
                                    email: 'test@example.com',
                                    nombre: data.nombre || 'Test',
                                    apellido: 'User',
                                    telefono: null,
                                    direccion: null,
                                    es_vendedor: false,
                                };

                                // Aplicar el select como lo haría Prisma
                                if (select) {
                                    const result = {};
                                    Object.keys(select).forEach(key => {
                                        if (select[key] === true && updatedUser.hasOwnProperty(key)) {
                                            result[key] = updatedUser[key];
                                        }
                                    });
                                    return Promise.resolve(result);
                                }
                                return Promise.resolve(updatedUser);
                            }),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<UsuariosService>(UsuariosService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    describe('update', () => {
        it('debería actualizar un usuario existente', async () => {
            const updateData = { nombre: 'Updated Name' };
            const result = await service.update(1, updateData);

            expect(result).toEqual({
                id: 1,
                email: 'test@example.com',
                nombre: 'Updated Name',
                apellido: 'User',
                telefono: null,
                direccion: null,
                es_vendedor: false,
            });

            // Verificar que se llamó al método update con los parámetros correctos
            expect(prisma.usuario.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: updateData,
                select: {
                    id: true,
                    email: true,
                    nombre: true,
                    apellido: true,
                    telefono: true,
                    direccion: true,
                    es_vendedor: true,
                },
            });
        });
    });
});