CREATE TABLE IF NOT EXISTS "course_to_user" (
	"user_id" integer,
	"course_id" integer,
	CONSTRAINT "course_to_user_pk" PRIMARY KEY("user_id","course_id")
);
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
