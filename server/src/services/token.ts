import db from '@/lib/drizzle/db';
import { tokens } from '@/lib/drizzle/schema';
import { eq } from 'drizzle-orm';

export const saveToken = async (data: typeof tokens.$inferInsert) => {
	await db.insert(tokens).values(data);
};

export const removeToken = async (tokenId: string) => {
	await db.delete(tokens).where(eq(tokens.id, tokenId));
};

export const findToken = async (tokenId: string) => {
	const result = await db.select().from(tokens).where(eq(tokens.id, tokenId));
	return result.length === 0 ? null : result[0];
};

export const deleteTokensByUserId = async (userId: string) => {
	await db.delete(tokens).where(eq(tokens.userId, userId));
};

export const deleteTokenById = async (tokenId: string) => {
	await db.delete(tokens).where(eq(tokens.id, tokenId));
};
