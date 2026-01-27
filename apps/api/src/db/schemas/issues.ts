import {
  pgTable,
  timestamp,
  pgEnum,
  text,
  uuid,
  integer,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { users } from "./users";

export const status = pgEnum("status", ["open", "ignored", "resolved"]);

export const issues = pgTable("issues", {
  id: uuid().defaultRandom().notNull(),
  projectId: uuid()
    .references(() => projects.id)
    .notNull(),
  fingerprintValue: text().notNull().unique(), // based on the project's fingerprint type
  status: status().default("open").notNull(),
  lastSeen: timestamp().notNull(),
  firstSeen: timestamp().defaultNow().notNull(),

  priority: integer().$type<0 | 1 | 2 | 3>(),
  assignee: uuid().references(() => users.id),
});

export type Issue = typeof issues.$inferSelect;
