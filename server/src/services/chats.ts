import db from "@/lib/drizzle/db";
import {
  chats,
  messageReaders,
  messages,
  participants,
  users,
} from "@/lib/drizzle/schema";
import { aliasedTable, and, eq, ne, sql } from "drizzle-orm";

// ok
export const findChats = async (userId: string) => {
  const p = aliasedTable(participants, "p");
  const query = await db
    .select({
      userId: p.userId,
      username: users.username,
      imageURL: users.imageURL,
      chatId: p.chatId,
      chatName: chats.name,
      lastMessage: messages.content,
      latestMessageDate: messages.sentAt,
    })
    .from(participants)
    .innerJoin(p, and(eq(participants.chatId, p.chatId), ne(p.userId, userId)))
    .innerJoin(users, eq(users.id, p.userId))
    .innerJoin(chats, eq(chats.id, participants.chatId))
    .leftJoin(
      messages,
      sql`
          ${messages.chatId} = ${p.chatId}
          AND ${messages.id} = (
            SELECT ${messages.id}
            FROM ${messages}
            WHERE ${messages.chatId} = ${p.chatId}
            ORDER BY ${messages.sentAt} DESC
            LIMIT 1
          )   
        `
    )
    .where(eq(participants.userId, userId));

  return query;
};

// ok
export const findMessages = async (chatId: string) => {
  const result = await db
    .select()
    .from(messages)
    .where(eq(messages.chatId, chatId));
  return result;
};

// ok
export const createChat = async () => {
  const [result] = await db.insert(chats).values({}).returning();
  return result;
};

// ok
type InsertParticipants = typeof participants.$inferInsert;
export const newParticipants = async (data: InsertParticipants[]) => {
  await db.insert(participants).values(data);
};

// ok
export const saveMessage = async (data: typeof messages.$inferInsert) => {
  const [result] = await db.insert(messages).values(data).returning();
  return result;
};

export const addNewMessageReaders = async () => { };
