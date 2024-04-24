CREATE TABLE IF NOT EXISTS "boards_to_user" (
	"user_id" integer,
	"board_id" integer,
	CONSTRAINT "boards_to_user_user_id_board_id_pk" PRIMARY KEY("user_id","board_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments_to_ticket" (
	"ticket_id" integer,
	"book_id" integer,
	CONSTRAINT "comments_to_ticket_ticket_id_book_id_pk" PRIMARY KEY("ticket_id","book_id")
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
DROP TABLE "users";--> statement-breakpoint
ALTER TABLE "board" DROP CONSTRAINT "board_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_board_id_board_id_fk";
--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "board_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "owner_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "ticket_id" numeric NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "user" ("full_name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "user" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ticket_name_idx" ON "tickets" ("ticket_name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board" ADD CONSTRAINT "board_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_board_id_board_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "board"("board_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "board" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN IF EXISTS "owner_id";--> statement-breakpoint
ALTER TABLE "tickets" DROP COLUMN IF EXISTS "owner_id";