import { User } from '@prisma/client';
import { prisma } from '../../prisma/prisma'; // Importing the shared Prisma instance
import { NotFoundError } from '../errors';

export class UserService {
    public async getUser(uuid: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                uuid: uuid
            }
        });
        if (!user) {
            throw new NotFoundError(`User with uuid ${uuid} not found`);
        }
        return user;
    }
}