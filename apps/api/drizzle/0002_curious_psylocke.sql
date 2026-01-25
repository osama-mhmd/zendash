CREATE TYPE "public"."env" AS ENUM('prod', 'dev');--> statement-breakpoint
CREATE TYPE "public"."level" AS ENUM('error', 'warning');--> statement-breakpoint
DROP TABLE "keys" CASCADE;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "level" "level" NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "env" "env" NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "stack" text NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "file" text NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "platform" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "browser" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "occurredAt" timestamp NOT NULL;