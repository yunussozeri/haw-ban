import db from "db/db";
import { courses } from "db/schema";

export default defineEventHandler(async (event) => {
  const allCourses = await db
    .selectDistinct({
      id: courses.id,
      studiengang: courses.studiengang,
      semester: courses.semester,
      kuerzel: courses.kuerzel,
    })
    .from(courses)
    .orderBy(courses.semester, courses.kuerzel)
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
