import db from "@/lib/drizzle/db";
import { chats, messages, participants, users } from "@/lib/drizzle/schema";
import { aliasedTable, and, eq, ne } from "drizzle-orm";

export const findChats = async (userId: string) => {
  const p = aliasedTable(participants, "p");
  const r2 = await db
    .select({
      chatId: chats.id,
      chatName: chats.name,
      receiverId: users.id,
      receiverUsername: users.username,
    })
    .from(participants)
    .leftJoin(p, and(eq(p.chatId, participants.chatId), ne(p.userId, userId)))
    .leftJoin(chats, eq(chats.id, participants.chatId))
    .leftJoin(users, eq(users.id, p.userId))
    .where(eq(participants.userId, userId));
  return r2;
};

export const findMessages = async (chatId: string) => {
  const result = await db
    .select()
    .from(messages)
    .where(eq(messages.chatId, chatId));
  return result;
};

export const newChat = async (data: typeof chats.$inferInsert) => {
  await db.insert(chats).values(data);
};

type InsertParticipants = typeof participants.$inferInsert;
export const newParticipants = async (data: InsertParticipants[]) => {
  await db.insert(participants).values(data);
};

export const saveMessage = async (data: typeof messages.$inferInsert) => {
  const [result] = await db.insert(messages).values(data).$returningId();
  const [message] = await db
    .select()
    .from(messages)
    .where(eq(messages.id, result.id));
  return message;
};
