import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}

export const db = globalThis.print || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.print = db;
