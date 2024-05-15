import db from "db/db";
import { courses } from "db/schema";

export default defineEventHandler(async (event) => {
  try {
    const allCourses = await db
      .selectDistinctOn([courses.studiengang])
      .from(courses)
      .limit(100); // Limit directly in the query

    // Return the courses directly (no nested object)
    return allCourses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw createError({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});
