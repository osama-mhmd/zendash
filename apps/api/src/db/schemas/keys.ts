import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { users } from "./users";

export const keys = pgTable("keys", {
  key: text().notNull().primaryKey(),
  projectId: uuid()
    .references(() => projects.id)
    .notNull(),
  userId: uuid()
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
