import z from "zod";
import db from "db/db";
import { courseToUser, user } from "db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "#auth";
import { authOptions } from "@/server/api/auth/[...]";

const courseSchema = z.object({
  courseId: z.coerce.number(),
});

const courseArraySchema = z.array(courseSchema);

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);
  // verify passed user
  if (!session) {
    throw createError({ statusCode: 401, message: "Unauthorized Session" });
  }

  const request = await readValidatedBody(event, courseArraySchema.safeParse);

  if (!request.success) {
    throw createError({
      statusCode: 400,
    });
  }

  const dbObjects = request.data.map((course) => {
    return {
      userId: session.user.id,
      courseId: course.courseId,
    };
  });

  await db.insert(courseToUser).values(dbObjects);

  return {
    success: true,
  };
});
