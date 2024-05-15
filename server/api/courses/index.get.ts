import db from "db/db";
import { courses } from "db/schema";

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
});
