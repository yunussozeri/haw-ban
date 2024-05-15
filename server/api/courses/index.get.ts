import db from "db/db";
import { courses } from "db/schema";
/**
 * Returns all courses
 * @returning all 100 courses in the database
 *
 */
export default defineEventHandler(async (event) => {
  const allCourses = await db
    .selectDistinctOn([courses.studiengang])
    .from(courses)
    .limit(100)
    .then((result) => {
      return result;
    });

  console.table(allCourses);
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
