import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const keys = pgTable("keys", {
  key: text().notNull().primaryKey(),
  projectId: uuid()
    .references(() => projects.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
