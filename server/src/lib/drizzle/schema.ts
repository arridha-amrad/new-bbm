import { relations, sql } from "drizzle-orm";
import {
  index,
  sqliteTable,
  primaryKey,
  text,
  integer,
} from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const users = sqliteTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid(15)),
    username: text({ length: 50 }).unique().notNull(),
    email: text({ length: 100 }).unique().notNull(),
    password: text().notNull(),
    imageURL: text(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at")
      .default(sql`(CURRENT_TIMESTAMP)`)
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => ({
    uniqueUsername: index("index-username").on(table.username),
    uniqueEmail: index("index-email").on(table.email),
  })
);

export const userRelations = relations(users, ({ many }) => ({
  tokens: many(tokens),
  messages: many(messages),
}));

export const tokens = sqliteTable("tokens", {
  id: text("id").primaryKey(),
  value: text().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const tokenRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));

export const chats = sqliteTable("chats", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid(15)),
  name: text("name", { length: 100 }),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const messages = sqliteTable("messages", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  content: text().notNull(),
  sentAt: text("sent_at").default(sql`(CURRENT_TIMESTAMP)`),
  chatId: text("chat_id")
    .notNull()
    .references(() => chats.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const messageRelations = relations(messages, ({ one }) => ({
  chat: one(chats, {
    fields: [messages.chatId],
    references: [chats.id],
  }),
  user: one(users, {
    fields: [messages.userId],
    references: [users.id],
  }),
}));

export const participants = sqliteTable(
  "participants",
  {
    chatId: text("chat_id")
      .notNull()
      .references(() => chats.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.chatId, table.userId] }),
  })
);

export const participantRelation = relations(participants, ({ one }) => ({
  chat: one(chats, {
    fields: [participants.chatId],
    references: [chats.id],
  }),
  user: one(users, {
    fields: [participants.userId],
    references: [users.id],
  }),
}));
