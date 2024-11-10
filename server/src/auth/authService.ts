import { prisma } from '../../prisma/prisma'; // Importing the shared Prisma instance
import { hash } from '../utils/hash';
import { generateJWT } from '../utils/jwt';
import { LoginDto } from './loginDto';
import { RegisterDto } from './registerDto';
import bcryptjs from 'bcryptjs';

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
        const userRole = await prisma.role.findUnique({ where: { id: foundUser.roleId }, select: { name: true } });
        const token = await generateJWT(foundUser.uuid, userRole.name);
        return {
            ok: 1,
            token: `Bearer ${token}`,
        };
    }
}