CREATE TYPE "public"."privilege" AS ENUM('owner', 'admin', 'member');--> statement-breakpoint
CREATE TABLE "events" (
	"id" text NOT NULL,
	"projectId" uuid NOT NULL,
	"description" text NOT NULL,
	"handled" boolean DEFAULT false NOT NULL,
	"recievedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "events_id_projectId_pk" PRIMARY KEY("id","projectId")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects_privileges" (
	"userId" uuid NOT NULL,
	"projectId" uuid NOT NULL,
	"privilege" "privilege" DEFAULT 'member' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_privileges_userId_projectId_pk" PRIMARY KEY("userId","projectId")
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_projectId_projects_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_privileges" ADD CONSTRAINT "projects_privileges_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_privileges" ADD CONSTRAINT "projects_privileges_projectId_projects_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;