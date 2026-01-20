import { pgTable, timestamp, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const sessions = pgTable("sessions", {
  id: text().primaryKey(),
  userId: uuid()
    .references(() => users.id)
    .notNull(),
  lastVerifiedAt: timestamp().notNull(),
  expiresAt: timestamp().notNull(),
});

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
