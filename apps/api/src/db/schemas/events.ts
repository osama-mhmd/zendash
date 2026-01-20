import { uuid, pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { primaryKey } from "drizzle-orm/pg-core";

// const level = pgEnum("level", ["error", "warning"]);
// const env = pgEnum("env", ["prod", "dev"]);

export const events = pgTable(
  "events",
  {
    id: text().notNull(),
    projectId: uuid().references(() => projects.id),
    // level: level().notNull(),
    // env: env().notNull(),
    // url: text().notNull(),

    handled: boolean().notNull(),

    recievedAt: timestamp().notNull(),
    // occurredAt: timestamp().defaultNow().notNull(),
  },
  (tb) => [primaryKey({ columns: [tb.id, tb.projectId] })],
);
