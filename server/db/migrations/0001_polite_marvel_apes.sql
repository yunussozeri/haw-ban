DO $$ BEGIN
 CREATE TYPE "kanbancolumn" AS ENUM('backlog', 'todo', 'progress', 'done');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "board" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "boards_to_user" (
	"user_id" integer,
	"board_id" integer,
	CONSTRAINT "boards_to_user_pk" PRIMARY KEY("user_id","board_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_name" varchar(128)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"comment" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments_to_ticket" (
	"ticket_id" integer,
	"board_id" integer,
	CONSTRAINT "comments_to_ticket_pk" PRIMARY KEY("ticket_id","board_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"ticket_name" text,
	"category_id" integer,
	"start" date,
	"deadline" date,
	"current_column" "kanbancolumn" DEFAULT 'backlog'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickets_to_board" (
	"board_id" integer,
	"ticket_id" integer,
	CONSTRAINT "tickets_to_board_pk" PRIMARY KEY("board_id","ticket_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"auth_id" uuid NOT NULL,
	"full_name" text
);
--> statement-breakpoint
DROP TABLE "countries";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ticket_name_idx" ON "tickets" ("ticket_name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "auth_id_idx" ON "user" ("auth_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "user" ("full_name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards_to_user" ADD CONSTRAINT "boards_to_user_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards_to_user" ADD CONSTRAINT "boards_to_user_board_id_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments_to_ticket" ADD CONSTRAINT "comments_to_ticket_ticket_id_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments_to_ticket" ADD CONSTRAINT "comments_to_ticket_board_id_comments_id_fk" FOREIGN KEY ("board_id") REFERENCES "comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets_to_board" ADD CONSTRAINT "tickets_to_board_board_id_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets_to_board" ADD CONSTRAINT "tickets_to_board_ticket_id_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
