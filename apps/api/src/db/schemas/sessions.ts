import { pgTable, timestamp, text, uuid } from "drizzle-orm/pg-core";

export const sessions = pgTable("sessions", {
  id: text().primaryKey(),
  secretHash: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
