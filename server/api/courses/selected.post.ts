import z from "zod";
import db from "db/db";
import { courseToUser, user } from "db/schema";
import { serverSupabaseUser } from "#supabase/server";
import { eq } from "drizzle-orm";

const courseSchema = z.object({
  courseId: z.coerce.number(),
});

const courseArraySchema = z.array(courseSchema);

export default defineEventHandler(async (event) => {
  const currentUser = await serverSupabaseUser(event);

  // verify passed user
  if (!currentUser) {
    throw createError({
      statusCode: 401,
    });
  }

  const request = await readValidatedBody(event, courseArraySchema.safeParse);

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

  const dbObjects = request.data.map((course) => {
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
