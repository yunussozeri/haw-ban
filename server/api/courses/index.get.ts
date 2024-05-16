import db from "db/db";
import { courses } from "db/schema";

export default defineEventHandler(async (event) => {
  const allCourses = await db
    .select({
      id: courses.id,
      studiengang: courses.studiengang,
      semester: courses.semester,
      kuerzel: courses.kuerzel,
    })
    .from(courses)
    .limit(10)
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

  return {
    result: allCourses,
    success: true,
  };
});
