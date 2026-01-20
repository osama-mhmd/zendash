CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"secretHash" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fullname" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"hashedPassword" text NOT NULL,
	"isVerified" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
