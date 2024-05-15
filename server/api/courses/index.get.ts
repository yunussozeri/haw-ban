import db from "db/db";
import { courses } from "db/schema";
/**
 * Returns all courses
 * @returning all 908 courses in the database
 *
 */
export default defineEventHandler(async (event) => {
  const allCourses = await db
    .selectDistinctOn([courses.studiengang])
    .from(courses)
    .then((result) => {
      return result.slice(0, 100);
    });

  //check valid result
  if (!allCourses) {
    return {
      message: "Course does not exist",
      success: false,
    };
  }

  //return result
  return {
    allCourses,
    success: true,
  };
});
