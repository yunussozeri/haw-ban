DO $$ BEGIN
 CREATE TYPE "kanbancolumn" AS ENUM('backlog', 'todo', 'progress', 'done');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "board" (
	"user_id" serial NOT NULL,
	"board_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "boards_to_user" (
	"user_id" integer,
	"board_id" integer,
	CONSTRAINT "boards_to_user_user_id_board_id_pk" PRIMARY KEY("user_id","board_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY DEFAULT 31 NOT NULL,
	"category_name" varchar(128)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"ticket_id" numeric NOT NULL,
	"comment_id" serial NOT NULL,
	"comment" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments_to_ticket" (
	"ticket_id" integer,
	"book_id" integer,
	CONSTRAINT "comments_to_ticket_ticket_id_book_id_pk" PRIMARY KEY("ticket_id","book_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "table" (
	"kanbancolumn" "kanbancolumn"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickets" (
	"board_id" serial NOT NULL,
	"ticket_id" serial NOT NULL,
	"ticket_name" text,
	"category_id" serial NOT NULL,
	"start" date,
	"deadline" date,
	"last_column" "kanbancolumn"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickets_to_board" (
	"book_id" integer,
	"ticket_id" integer,
	CONSTRAINT "tickets_to_board_book_id_ticket_id_pk" PRIMARY KEY("book_id","ticket_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" varchar(256)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ticket_name_idx" ON "tickets" ("ticket_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "user" ("full_name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "user" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board" ADD CONSTRAINT "board_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards_to_user" ADD CONSTRAINT "boards_to_user_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards_to_user" ADD CONSTRAINT "boards_to_user_board_id_board_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "board"("board_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_ticket_id_user_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments_to_ticket" ADD CONSTRAINT "comments_to_ticket_ticket_id_tickets_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("ticket_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments_to_ticket" ADD CONSTRAINT "comments_to_ticket_book_id_comments_comment_id_fk" FOREIGN KEY ("book_id") REFERENCES "comments"("comment_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_board_id_board_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "board"("board_id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "tickets_to_board" ADD CONSTRAINT "tickets_to_board_book_id_board_board_id_fk" FOREIGN KEY ("book_id") REFERENCES "board"("board_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets_to_board" ADD CONSTRAINT "tickets_to_board_ticket_id_tickets_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("ticket_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
