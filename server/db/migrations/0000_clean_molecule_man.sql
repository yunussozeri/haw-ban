DO $$ BEGIN
 CREATE TYPE "public"."categories" AS ENUM('uni', 'freizeit', 'hobby', 'sport', 'default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."kanbancolumn" AS ENUM('backlog', 'todo', 'progress', 'done');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "board" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	CONSTRAINT "board_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "boards_to_user" (
	"user_id" integer,
	"board_id" integer,
	CONSTRAINT "boards_to_user_pk" PRIMARY KEY("user_id","board_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"comment" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments_to_ticket" (
	"ticket_id" integer,
	"comment_id" integer,
	CONSTRAINT "comments_to_ticket_pk" PRIMARY KEY("ticket_id","comment_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_to_user" (
	"user_id" integer,
	"course_id" integer,
	CONSTRAINT "course_to_user_pk" PRIMARY KEY("user_id","course_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"kuerzel" varchar(30),
	"studiengang" varchar(8),
	"semester" smallint,
	"deadline" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"ticket_name" text,
	"cat" "categories" DEFAULT 'default',
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
	"name" text NOT NULL,
	"surname" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards_to_user" ADD CONSTRAINT "boards_to_user_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards_to_user" ADD CONSTRAINT "boards_to_user_board_id_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments_to_ticket" ADD CONSTRAINT "comments_to_ticket_ticket_id_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments_to_ticket" ADD CONSTRAINT "comments_to_ticket_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_to_user" ADD CONSTRAINT "course_to_user_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_to_user" ADD CONSTRAINT "course_to_user_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets_to_board" ADD CONSTRAINT "tickets_to_board_board_id_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets_to_board" ADD CONSTRAINT "tickets_to_board_ticket_id_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ticket_name_idx" ON "tickets" ("ticket_name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "auth_id_idx" ON "user" ("auth_id");