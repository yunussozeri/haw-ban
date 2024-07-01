import { eq } from "drizzle-orm";
import z from "zod";
import db from "~/server/db/db";
import { courses } from "~/server/db/schema";

const courseGetSchema = z.object({
  alias: z.string(),
});

export default defineEventHandler(async (event) => {
  const response = await getValidatedQuery(event, courseGetSchema.safeParse);

  if (!response.success) {
    return {
      success: false,
    };
  }

  const res = await db
    .selectDistinctOn([courses.kuerzel])
    .from(courses)
    .where(eq(courses.kuerzel, response.data.alias))
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
