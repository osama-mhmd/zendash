CREATE TYPE "public"."status" AS ENUM('open', 'ignored', 'resolved');--> statement-breakpoint
CREATE TABLE "issues" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"fingerprintValue" text NOT NULL,
	"status" "status" DEFAULT 'open' NOT NULL,
	"lastSeen" timestamp NOT NULL,
	"firstSeen" timestamp DEFAULT now() NOT NULL,
	"priority" integer,
	"assignee" uuid,
	CONSTRAINT "issues_fingerprintValue_unique" UNIQUE("fingerprintValue")
);
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "fingerprint" text DEFAULT 'description' NOT NULL;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_projectId_projects_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_assignee_users_id_fk" FOREIGN KEY ("assignee") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;