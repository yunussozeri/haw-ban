import { eq } from "drizzle-orm";
import db from "db/db";
import { courseToUser, courses, user } from "db/schema";
import { serverSupabaseUser } from "#supabase/server";

/**
 * Returns all the courses of a user via get request
 * @returning all the courses of a user
 *
 */
export default defineEventHandler(async (event) => {
  const currentUser = await serverSupabaseUser(event);

  // verify passed user
  if (!currentUser) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
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
      statusCode: 401,
    });
  }

  const selected = await db
    .select({ courses: courses })
    .from(user)
    .leftJoin(courseToUser, eq(user.id, courseToUser.userId))
    .leftJoin(courses, eq(courses.id, courseToUser.courseId))
    .where(eq(user.authId, currentUser.id));

  return { courses: selected };
});
