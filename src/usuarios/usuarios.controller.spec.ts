import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

describe('UsuariosController', () => {
    let controller: UsuariosController;
    let mockUsuariosService = {
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsuariosController],
            providers: [
                {
                    provide: UsuariosService,
                    useValue: mockUsuariosService,
                },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<UsuariosController>(UsuariosController);
    });

    describe('getProfile', () => {
        it('debería retornar el perfil del usuario', async () => {
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                nombre: 'Test',
            };

            mockUsuariosService.findOne.mockResolvedValue(mockUser);

            const req = { user: { id: 1 } };
            const result = await controller.getProfile(req);

            expect(result).toEqual(mockUser);
            expect(mockUsuariosService.findOne).toHaveBeenCalledWith(1);
        });
    });
});