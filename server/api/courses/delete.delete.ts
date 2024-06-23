import z from "zod";
import db from "db/db";
import { courseToUser, user } from "db/schema";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";
import { and, eq, inArray } from "drizzle-orm";

const coursesSchema = z.array(z.object({ courseId: z.coerce.number() }));

/**
 * Deletes the course from given user
 *
 */
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

  // verify passed user
  if (!session) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const request = await readValidatedBody(event, coursesSchema.safeParse);

  if (!request.success) {
    throw createError({
      statusCode: 401,
    });
  }

  //delete course of user
  await db.delete(courseToUser).where(
    and(
      eq(courseToUser.userId, session.user.id),
      inArray(
        courseToUser.courseId,
        request.data.map((c) => c.courseId),
      ),
    ),
  );

  return {
    success: true,
  };
});
