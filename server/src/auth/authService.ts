import { prisma } from '../../prisma/prisma'; // Importing the shared Prisma instance
import { UnauthorizedError } from '../errors';
import { hash } from '../utils/hash';
import { generateJWT, generateRefreshJWT } from '../utils/jwt';
import { verifyRefreshToken } from '../utils/verifyToken';
import { LoginDto } from './loginDto';
import { RegisterDto } from './registerDto';
import bcryptjs from 'bcryptjs';
import { LocalStorage } from 'node-localstorage';
import store from 'store';

export class AuthService {
    public async register(user: RegisterDto) {
        if (await prisma.user.findUnique({ where: { email: user.email } })) {
            throw new SyntaxError('User with this email already exists');
        }
        const passwd = await hash(user.password);
        return await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: passwd,
            },
        });
    }
    public async login(user: LoginDto) {
        const foundUser = await prisma.user.findUnique({ where: { email: user.email } });
        if (!foundUser || !bcryptjs.compareSync(user.password, foundUser.password)) {
            throw new SyntaxError('Invalid credentials');  // TODO : return 401 instead
        }

        if (store.get('refreshToken')) {
            const checkRefreshToken = await prisma.refreshToken.findUnique({ where: { token: store.get('refreshToken') } });

            if (!checkRefreshToken || checkRefreshToken.userId !== foundUser.uuid) {
                await prisma.refreshToken.deleteMany({ where: { userId : foundUser.uuid } });
            }
            else {
                await prisma.refreshToken.delete({where : { token: store.get('refreshToken') } });
            }

            store.remove('refreshToken');
        }

        const userRole = await prisma.role.findUnique({ where: { id: foundUser.roleId }, select: { name: true } });
        const token = await generateJWT(foundUser.uuid, userRole.name);

        const refreshToken = await generateRefreshJWT(foundUser.uuid, userRole.name);
        store.set('refreshToken', refreshToken);
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: foundUser.uuid,
            },
        });
        return {
            ok: 1,
            token: `Bearer ${token}`,
        };
    }

    public async refresh() {
        const localToken = store.get('refreshToken');

        if (!localToken) {
                throw new UnauthorizedError('Unauthorized');
        }
        
        store.remove('refreshToken');

        const dbToken = await prisma.refreshToken.findUnique({ where: { token: localToken } });

        // detected refresh token reuse
        if (!dbToken) {
            const decodedStolenToken = await verifyRefreshToken(localToken);

            await prisma.refreshToken.deleteMany({ where: { userId: decodedStolenToken.userId } });

            throw new UnauthorizedError('Unauthorized');
        }

        await prisma.refreshToken.delete({ where: { token: localToken } });

        const decodedToken = await verifyRefreshToken(localToken);

        if (decodedToken.userId !== dbToken.userId) {
            throw new UnauthorizedError('Unauthorized');
        }

        const accessToken = await generateJWT(decodedToken.userId, decodedToken.scopes[0]); // might need to change this
        const newRefreshToken = await generateRefreshJWT(decodedToken.userId, decodedToken.scopes[0]);

        await prisma.refreshToken.create({
            data: {
                token: newRefreshToken,
                userId: decodedToken.userId,
            },
        });

        store.set('refreshToken', newRefreshToken);

        return {
            ok: 1,
            token: `Bearer ${accessToken}`,
        }
    }

    public async logout() {
        const localToken = store.get('refreshToken');

        if (!localToken) {
            throw new UnauthorizedError('Unauthorized');
        }

        store.remove('refreshToken');

        const dbToken = await prisma.refreshToken.findUnique({ where: { token: localToken } });

        if (!dbToken) {
            throw new UnauthorizedError('Unauthorized');
        }

        await prisma.refreshToken.delete({ where: { token: localToken } });

        return {
            ok: 1,
        }
    }
}