import { uuid } from "drizzle-orm/pg-core";
import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";
import { pgEnum } from "drizzle-orm/pg-core";
import { primaryKey } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const privilege = pgEnum("privilege", ["owner", "admin", "member"]);

export const projectsPrivileges = pgTable(
  "projects_privileges",
  {
    userId: uuid().references(() => users.id),
    projectId: uuid().references(() => projects.id),
    privilege: privilege().default("member").notNull(),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (tb) => [primaryKey({ columns: [tb.userId, tb.projectId] })],
);
