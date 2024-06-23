import { eq } from "drizzle-orm";
import db from "db/db";
import { courseToUser, courses, user } from "db/schema";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";

/**
 * Returns all the courses of a user via get request
 * @returning all the courses of a user
 *
 */
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

  // verify passed user
  if (!session) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const selected = await db
    .select({ courses: courses })
    .from(user)
    .leftJoin(courseToUser, eq(user.id, courseToUser.userId))
    .leftJoin(courses, eq(courses.id, courseToUser.courseId))
    .where(eq(user.id, session.user.id));

  return { courses: selected };
});
