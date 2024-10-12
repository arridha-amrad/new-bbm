import { relations } from "drizzle-orm";
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 15 }).primaryKey(),
    username: varchar({ length: 50 }).unique().notNull(),
    email: varchar({ length: 100 }).unique().notNull(),
    password: text().notNull(),
    imageURL: text(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
export const tokens = mysqlTable("tokens", {
  id: varchar("id", { length: 15 }).primaryKey(),
  value: text().notNull(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => users.id),
});
export const tokenRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));
export const chats = mysqlTable("chats", {
  id: varchar("id", { length: 15 }).primaryKey(),
  name: varchar("name", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const messages = mysqlTable("messages", {
  id: int().primaryKey().autoincrement(),
  content: text().notNull(),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
  chatId: varchar("chat_id", { length: 15 })
    .notNull()
    .references(() => chats.id),
  userId: varchar("user_id", { length: 15 })
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
export const participants = mysqlTable(
  "participants",
  {
    chatId: varchar("chat_id", { length: 15 })
      .notNull()
      .references(() => chats.id),
    userId: varchar("user_id", { length: 15 })
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
