import z from "zod";
import db from "db/db";
import { courseToUser, user } from "db/schema";
import { serverSupabaseUser } from "#supabase/server";
import { and, eq, inArray } from "drizzle-orm";

const courseSchema = z.object({
  courseId: z.coerce.number(),
});

/**
 * Deletes the course from given user
 *
 */
export default defineEventHandler(async (event) => {
  const currentUser = await serverSupabaseUser(event);

  // verify passed user
  if (!currentUser) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const request = await readValidatedBody(event, courseSchema.safeParse);

  if (!request.success) {
    throw createError({
      statusCode: 401,
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
      statusCode: 401,
    });
  }

  //delete course of user
  await db
    .delete(courseToUser)
    .where(
      and(
        eq(courseToUser.userId, dbUser.id),
        eq(courseToUser.courseId, request.data.courseId),
      ),
    );

  return {
    success: true,
  };
});
