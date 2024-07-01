import db from "db/db";
import { courses } from "db/schema";
import { max } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const allCourses = await db
    .select({
      id: max(courses.id),
      studiengang: max(courses.studiengang),
      semester: max(courses.semester),
      kuerzel: courses.kuerzel,
    })
    .from(courses)
    .groupBy(courses.kuerzel)

    .orderBy(max(courses.semester), courses.kuerzel)
    .then((result) => {
      return result;
    });

  //console.table(allCourses);
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
