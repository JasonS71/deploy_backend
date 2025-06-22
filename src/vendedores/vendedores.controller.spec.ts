import { Test, TestingModule } from '@nestjs/testing';
import { VendedoresController } from './vendedores.controller';
import { VendedoresService } from './vendedores.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateVendedorDto } from './dto/create-vendedor.dto';

describe('VendedoresController', () => {
    let controller: VendedoresController;
    let mockVendedoresService = {
        create: jest.fn(),
        findOne: jest.fn(),
    };

    // Mock user data
    const mockUser = {
        id: 1,
        email: 'test@example.com',
    };

    // Mock vendedor data
    const mockVendedor = {
        id: 1,
        usuario_id: mockUser.id,
        nombre_tienda: 'Tienda Test',
        descripcion: 'Descripción de prueba',
        calificacion_promedio: 4.5,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VendedoresController],
            providers: [
                {
                    provide: VendedoresService,
                    useValue: mockVendedoresService,
                },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({
                canActivate: jest.fn().mockImplementation(() => true),
            })
            .compile();

        controller = module.get<VendedoresController>(VendedoresController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create()', () => {
        it('debería crear un perfil de vendedor exitosamente', async () => {
            const createDto: CreateVendedorDto = {
                nombre_tienda: 'Tienda Test',
                descripcion_tienda: 'Descripción de prueba',
            };

            mockVendedoresService.create.mockResolvedValue(mockVendedor);

            const result = await controller.create(
                { user: mockUser } as any,
                createDto,
            );

            expect(result).toEqual(mockVendedor);
            expect(mockVendedoresService.create).toHaveBeenCalledWith(
                mockUser.id,
                createDto,
            );
        });

        it('debería llamar al servicio con los parámetros correctos', async () => {
            const createDto: CreateVendedorDto = {
                nombre_tienda: 'Otra Tienda',
                descripcion_tienda: 'Otra descripción',
            };

            mockVendedoresService.create.mockResolvedValue(mockVendedor);

            await controller.create({ user: mockUser } as any, createDto);

            expect(mockVendedoresService.create).toHaveBeenCalledWith(
                mockUser.id,
                createDto,
            );
        });
    });

    describe('getPerfil()', () => {
        it('debería retornar el perfil del vendedor', async () => {
            mockVendedoresService.findOne.mockResolvedValue(mockVendedor);

            const result = await controller.getPerfil({ user: mockUser } as any);

            expect(result).toEqual(mockVendedor);
            expect(mockVendedoresService.findOne).toHaveBeenCalledWith(mockUser.id);
        });

        it('debería llamar al servicio con el ID del usuario autenticado', async () => {
            mockVendedoresService.findOne.mockResolvedValue(mockVendedor);

            await controller.getPerfil({ user: mockUser } as any);

            expect(mockVendedoresService.findOne).toHaveBeenCalledWith(mockUser.id);
        });
    });
});