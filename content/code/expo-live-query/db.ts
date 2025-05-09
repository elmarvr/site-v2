import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
//---cut---
const expo = openDatabaseSync("cool-message-app.db", {
  enableChangeListener: true,
});

export const MessagesTable = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content"),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdate(() => new Date()),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const db = drizzle(expo, {
  schema: {
    messages: MessagesTable,
  },
});
