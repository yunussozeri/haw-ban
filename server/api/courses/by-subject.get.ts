import { and, eq } from "drizzle-orm";
import z from "zod";
import db from "db/db";
import { courses } from "db/schema";

const courseGetBySemesterAndStudiengangSchema = z.object({
  studiengang: z.string(),
  semester: z.number(),
});

/**
 * Returns all courses for given studiengang and semester
 *
 * @returns courses of studiengang and semester
 *
 */

export default defineEventHandler(async (event) => {
  const response = await getValidatedQuery(
    event,
    courseGetBySemesterAndStudiengangSchema.safeParse,
  );

  if (!response.success) {
    return {
      success: false,
    };
  }

  const res = await db
    .selectDistinctOn([courses.studiengang])
    .from(courses)
    .where(
      and(
        eq(courses.studiengang, response.data.studiengang),
        eq(courses.semester, response.data.semester),
      ),
    )
    .then((result) => {
      return result[0];
    });

  //check valid result
  if (!res) {
    return {
      message: "Course does not exist",
      success: false,
    };
  }

  //return result
  return {
    res,
    success: true,
  };
});
