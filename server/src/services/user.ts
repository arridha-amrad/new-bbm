import { eq, like, or } from "drizzle-orm";
import db from "src/lib/drizzle/db";
import { users } from "src/lib/drizzle/schema";

export const findUserByEmailOrUsername = async (query: string) => {
  const user = await db
    .select()
    .from(users)
    .where(
      query.includes("@") ? eq(users.email, query) : eq(users.username, query)
    );
  return user.length !== 0 ? user[0] : null;
};

export const createUser = async (data: typeof users.$inferInsert) => {
  const result = await db.insert(users).values(data).$returningId();
  return result;
};

export const findUserById = async (userId: string) => {
  const [user] = await db.select().from(users).where(eq(users.id, userId));
  return user;
};

export const searchUsers = async (searchKey: string) => {
  const results = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      imageURL: users.imageURL,
    })
    .from(users)
    .where(
      or(
        like(users.username, `%${searchKey}%`),
        like(users.email, `%${searchKey}%`)
      )
    );
  return results;
};
