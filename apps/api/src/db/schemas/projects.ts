import { uuid } from "drizzle-orm/pg-core";
import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";
import { pgEnum } from "drizzle-orm/pg-core";
import { primaryKey } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  fingerprint: text().default("description").notNull(), // Will be moved to projectSettings in future
  createdAt: timestamp().defaultNow().notNull(),
});

const privileges = ["owner", "admin", "member"] as const;
export const privilege = pgEnum("privilege", privileges);

export const projectsPrivileges = pgTable(
  "projects_privileges",
  {
    userId: uuid()
      .references(() => users.id)
      .notNull(),
    projectId: uuid()
      .references(() => projects.id)
      .notNull(),
    privilege: privilege().default("member").notNull(),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (tb) => [primaryKey({ columns: [tb.userId, tb.projectId] })],
);

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Privilege = (typeof privileges)[number];
