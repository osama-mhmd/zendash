import {
  uuid,
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { primaryKey } from "drizzle-orm/pg-core";

export const level = pgEnum("level", ["error", "warning"]);
export const env = pgEnum("env", ["prod", "dev"]);

export const events = pgTable(
  "events",
  {
    id: text().notNull(),
    projectId: uuid()
      .references(() => projects.id)
      .notNull(),
    description: text().notNull(),
    level: level().notNull(),
    env: env().notNull(),
    stack: text().notNull(),
    file: text().notNull(),

    // Contexts
    platform: text(),
    browser: text(),
    source: text(),
    // url: text().notNull(),

    handled: boolean().default(false).notNull(),

    recievedAt: timestamp().defaultNow().notNull(),
    occurredAt: timestamp().notNull(),
  },
  (tb) => [primaryKey({ columns: [tb.id, tb.projectId] })],
);
