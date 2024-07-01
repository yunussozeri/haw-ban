import z from "zod";
import db from "db/db";
import { courseToUser, courses, courses, user } from "db/schema";
import { serverSupabaseUser } from "#supabase/server";
import { eq, inArray } from "drizzle-orm";

const courseSchema = z.object({
  //courseId: z.coerce.number(),
  courseName: z.string(),
});

const courseArraySchema = z.array(courseSchema);

export default defineEventHandler(async (event) => {
  const currentUser = await serverSupabaseUser(event);

  // verify passed user
  if (!currentUser) {
    console.log("currentUser", currentUser);
    throw createError({ statusCode: 401, message: "annen" });
  }

  const request = await readValidatedBody(event, courseArraySchema.safeParse);

  if (!request.success) {
    throw createError({
      statusCode: 402,
      message: "annennnnn",
    });
  }

  const dbUser = await db
    .select()
    .from(user)
    .where(eq(user.authId, currentUser.id))
    .then((value) => {
      if (!value[0]) {
        return undefined;
      }
      return value[0];
    });

  if (!dbUser) {
    throw createError({
      statusCode: 403,
      message: "baban",
    });
  }

  const coursess = await db
    .select({ courseId: courses.id, courseName: courses.kuerzel })
    .from(courses)
    .where(
      inArray(
        courses.kuerzel,
        request.data.map((data) => data.courseName),
      ),
    );
  const dbObjects = coursess.map((course) => {
    return {
      userId: dbUser.id,
      courseId: course.courseId,
    };
  });

  await db.insert(courseToUser).values(dbObjects);

  return {
    success: true,
  };
});
