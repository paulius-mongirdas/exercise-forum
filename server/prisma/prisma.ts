import { PrismaClient } from '@prisma/client';

// To prevent multiple instances during development with hot-reloading,
// attach PrismaClient to the global object.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
