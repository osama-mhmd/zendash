import { pgTable, timestamp, text, uuid, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  fullname: text().notNull(),
  username: text().notNull(),
  email: text().notNull(),
  hashedPassword: text().notNull(),
  isVerified: boolean().default(false),
  createdAt: timestamp().defaultNow(),
});

export type User = Prettify<Omit<typeof users.$inferSelect, "hashedPassword">>;
export type NewUser = typeof users.$inferInsert;
