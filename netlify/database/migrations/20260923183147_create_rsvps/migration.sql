CREATE TABLE "rsvps" (
	"id" serial PRIMARY KEY,
	"full_name" text NOT NULL,
	"email" text,
	"phone" text,
	"attending" text NOT NULL,
	"events" text NOT NULL,
	"guest_count" integer DEFAULT 1 NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now()
);
