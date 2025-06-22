import { Test, TestingModule } from '@nestjs/testing';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductoDto } from './dto/create-producto.dto';
import { QueryProductoDto } from './dto/query-producto.dto';

describe('ProductosController', () => {
    let controller: ProductosController;
    let mockProductosService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductosController],
            providers: [
                {
                    provide: ProductosService,
                    useValue: mockProductosService,
                },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<ProductosController>(ProductosController);
    });

    describe('create', () => {
        it('debería llamar al servicio para crear producto', async () => {
            const createDto: CreateProductoDto = {
                categoria_id: 1,
                nombre: 'Producto Test',
                descripcion: 'Descripción',
                precio: 100,
                stock: 10,
            };

            mockProductosService.create.mockResolvedValue({ id: 1, ...createDto });

            const req = { user: { id: 1 } };
            const result = await controller.create(req, createDto);
            expect(result).toBeDefined();
            expect(mockProductosService.create).toHaveBeenCalledWith(1, createDto);
        });
    });

    describe('findAll', () => {
        it('debería llamar al servicio para obtener productos', async () => {
            const queryParams: QueryProductoDto = { page: 1, limit: 10 };
            const mockResponse = {
                data: [{ id: 1, nombre: 'Producto Test' }],
                meta: { total: 1, page: 1, limit: 10 },
            };

            mockProductosService.findAll.mockResolvedValue(mockResponse);
            const result = await controller.findAll(queryParams);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('findOne', () => {
        it('debería llamar al servicio para obtener un producto', async () => {
            const mockResponse = {
                producto: { id: 1, nombre: 'Producto Test' },
                relacionados: [{ id: 2, nombre: 'Relacionado' }],
            };

            mockProductosService.findOne.mockResolvedValue(mockResponse);
            const result = await controller.findOne('1');
            expect(result).toEqual(mockResponse);
            expect(mockProductosService.findOne).toHaveBeenCalledWith(1);
        });
    });
});